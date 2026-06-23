"""
Token 批量刷新脚本
=================
读取 accounts.txt 中已注册的账号（email:password），
重新执行 Codex OAuth 纯 HTTP 登录获取全新 token，
保存为 JSON 文件并自动上传到 CPA 管理平台（含 proxy_url 自动分配）。

用法：
  python refresh_tokens.py                  # 刷新所有账号
  python refresh_tokens.py 5                # 只刷新前 5 个
  python refresh_tokens.py 3 8              # 刷新第 3~8 个（1-indexed）

注意：
  - 复用同目录下 protocol_keygen.py 的函数，无需重复代码
  - 复用同目录下 config.json 的配置（proxy / upload_api / proxy_ports 等）
  - 并发数从 config.json 的 concurrent_workers 读取
"""

import json
import os
import sys
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed

# ============ 导入 protocol_keygen 中的核心函数 ============
from protocol_keygen import (
    perform_codex_oauth_login_http,   # 纯 HTTP OAuth 登录
    save_token_json,                   # 保存 JSON + 上传 CPA + 分配 proxy_url
    _file_lock,                        # 线程安全文件锁
    UPLOAD_API_URL,                    # CPA 上传地址
    CF_EMAIL_DOMAIN,                   # 邮箱域名（如 example.com）
)

# ============ 配置 ============
_config_path = os.path.join(os.path.dirname(__file__), "config.json")
with open(_config_path, "r", encoding="utf-8") as f:
    _config = json.load(f)

CONCURRENT_WORKERS = _config.get("concurrent_workers", 8)
ACCOUNTS_FILE = _config.get("accounts_file", "accounts.txt")


def get_cf_token_for_email(email):
    """
    判断邮箱是否为 CF_EMAIL_DOMAIN 域名，是则返回 'ADMIN' 标记。
    
    'ADMIN' 标记会让 protocol_keygen.fetch_emails 使用 admin API 模式
    （通过 /admin/mails?address=xxx 读取邮件），无需 per-mailbox JWT。
    
    返回:
        str: 'ADMIN'（匹配 CF_EMAIL_DOMAIN 域名），None（其他域名）
    """
    if "@" not in email:
        return None
    _, domain = email.rsplit("@", 1)
    if domain.lower() == CF_EMAIL_DOMAIN.lower():
        return "ADMIN"
    return None


def load_accounts(filepath=None):
    """读取 accounts.txt，返回 [(email, password), ...]"""
    filepath = filepath or ACCOUNTS_FILE
    accounts = []
    if not os.path.exists(filepath):
        print(f"❌ 账号文件不存在: {filepath}")
        return accounts
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or ":" not in line:
                continue
            parts = line.split(":", 1)
            if len(parts) == 2:
                accounts.append((parts[0].strip(), parts[1].strip()))
    print(f"📋 从 {filepath} 读取到 {len(accounts)} 个账号")
    return accounts


def refresh_one(email, password, index, total, worker_id=0):
    """对单个账号执行 OAuth 登录 → 获取新 token → 保存 JSON → 上传 CPA"""
    tag = f"[W{worker_id}]" if worker_id else ""
    print(f"\n{tag} 🔄 [{index}/{total}] 刷新: {email}")

    t_start = time.time()
    try:
        # 尝试为 CF_EMAIL_DOMAIN 邮箱获取 cf_token，用于可能的 OTP 邮箱验证
        cf_token = get_cf_token_for_email(email)
        tokens = perform_codex_oauth_login_http(email, password, cf_token=cf_token)

        elapsed = time.time() - t_start

        if not tokens or not tokens.get("access_token"):
            print(f"{tag} ❌ OAuth 登录失败: {email} ({elapsed:.1f}s)")
            return email, False, elapsed

        access_token = tokens.get("access_token", "")
        refresh_token = tokens.get("refresh_token", "")
        id_token = tokens.get("id_token", "")

        # save_token_json 会自动: 分配 proxy_url → 保存 JSON → 上传 CPA
        save_token_json(email, access_token, refresh_token, id_token)

        # 追加写入刷新后的 token 文件
        with _file_lock:
            with open("ak_refreshed.txt", "a", encoding="utf-8") as f:
                f.write(f"{access_token}\n")
            if refresh_token:
                with open("rk_refreshed.txt", "a", encoding="utf-8") as f:
                    f.write(f"{refresh_token}\n")

        print(f"{tag} ✅ {email} | 耗时 {elapsed:.1f}s")
        return email, True, elapsed

    except Exception as e:
        elapsed = time.time() - t_start
        print(f"{tag} ❌ 异常: {email} - {e}")
        return email, False, elapsed


def main():
    accounts = load_accounts()
    if not accounts:
        return

    # 解析命令行参数：范围选择
    start_idx = 0
    end_idx = len(accounts)

    if len(sys.argv) == 2:
        end_idx = min(int(sys.argv[1]), len(accounts))
    elif len(sys.argv) >= 3:
        start_idx = max(int(sys.argv[1]) - 1, 0)  # 转 0-indexed
        end_idx = min(int(sys.argv[2]), len(accounts))

    selected = accounts[start_idx:end_idx]
    total = len(selected)

    if total == 0:
        print("❌ 选定范围内没有账号")
        return

    workers = min(CONCURRENT_WORKERS, total)

    print(f"\n{'='*60}")
    print(f"🔄 Token 批量刷新")
    print(f"   账号: {total} 个 (第 {start_idx + 1} ~ {start_idx + total} 个)")
    print(f"   并发: {workers}")
    print(f"   CPA: {'✅ ' + UPLOAD_API_URL if UPLOAD_API_URL else '❌ 未配置'}")
    print(f"{'='*60}")

    batch_start = time.time()
    ok = 0
    fail = 0
    failed_list = []
    results_lock = threading.Lock()

    if workers <= 1:
        # 单线程模式
        for i, (email, password) in enumerate(selected):
            _, success, _ = refresh_one(email, password, i + 1, total)
            if success:
                ok += 1
            else:
                fail += 1
                failed_list.append(email)
            if i < total - 1:
                time.sleep(2)
    else:
        # 多线程并发模式
        print(f"\n🔀 启动 {workers} 个并发 worker...\n")

        def _worker(args):
            idx, email, password, wid = args
            if idx > 0:
                time.sleep(wid * 1.5)  # 错开启动避免瞬时并发
            return refresh_one(email, password, idx + 1, total, worker_id=wid)

        tasks = [
            (i, email, password, (i % workers) + 1)
            for i, (email, password) in enumerate(selected)
        ]

        with ThreadPoolExecutor(max_workers=workers) as executor:
            futures = {executor.submit(_worker, t): t for t in tasks}
            for future in as_completed(futures):
                task_args = futures[future]
                try:
                    email, success, _ = future.result()
                    with results_lock:
                        if success:
                            ok += 1
                        else:
                            fail += 1
                            failed_list.append(email)
                        done = ok + fail
                        wall = time.time() - batch_start
                        print(f"📊 {done}/{total} | ✅{ok} ❌{fail} | 已用 {wall:.0f}s")
                except Exception as e:
                    with results_lock:
                        fail += 1
                        failed_list.append(task_args[1])  # task_args = (idx, email, password, wid)
                    print(f"❌ 任务异常: {e}")

    elapsed = time.time() - batch_start
    print(f"\n{'='*60}")
    print(f"🏁 刷新完成: ✅{ok} ❌{fail} | 总耗时 {elapsed:.1f}s")
    if failed_list:
        print(f"\n❌ 失败账号:")
        for email in failed_list:
            print(f"   - {email}")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
