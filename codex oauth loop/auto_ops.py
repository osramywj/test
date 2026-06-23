#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动运营脚本 (Auto Operations)
==============================
每 4 小时自动循环：
  1. 检查 CPA 面板，清理 401 失效账号
  2. 删了多少号就补充注册多少新号，保持账号总数稳定
  3. 清理本地生成的临时文件

用法：
  python auto_ops.py              # 完整循环：清理失效 → 补充新号 → 清理本地
  python auto_ops.py --register   # 仅注册（使用 config.json 的 total_accounts）
  python auto_ops.py --refresh    # 仅刷新 token
  python auto_ops.py --check      # 仅检查清理 CPA 401 账号
  python auto_ops.py --clean      # 仅清理本地生成的文件
  python auto_ops.py --loop       # 持续循环模式（每 4 小时）
"""

import argparse
import glob
import json
import os
import subprocess
import sys
import time
from datetime import datetime


# =================== 路径 & 配置 ===================

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(SCRIPT_DIR, "config.json")
OPS_LOG = os.path.join(SCRIPT_DIR, "ops_log.txt")
INVALID_ACCOUNTS_FILE = os.path.join(SCRIPT_DIR, "invalid_codex_accounts.json")


def load_config():
    """加载 config.json"""
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_config(config):
    """保存 config.json"""
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(config, f, ensure_ascii=False, indent=4)


def log(msg):
    """带时间戳的日志，同时输出到控制台和 ops_log.txt（自动轮转，防止无限增长）"""
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    try:
        # 日志超过 5MB 自动轮转：旧日志重命名为 .old，重新开始
        if os.path.exists(OPS_LOG) and os.path.getsize(OPS_LOG) > 5 * 1024 * 1024:
            old_log = OPS_LOG + ".old"
            if os.path.exists(old_log):
                os.remove(old_log)
            os.rename(OPS_LOG, old_log)
        with open(OPS_LOG, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


# =================== 子任务 ===================

def run_script(script_name, extra_args=None):
    """运行同目录下的 Python 脚本，实时输出日志"""
    script_path = os.path.join(SCRIPT_DIR, script_name)
    if not os.path.exists(script_path):
        log(f"❌ 脚本不存在: {script_name}")
        return False

    cmd = [sys.executable, script_path]
    if extra_args:
        cmd.extend(extra_args)

    log(f"▶️  启动 {script_name} {' '.join(extra_args or [])}")
    t_start = time.time()

    try:
        proc = subprocess.Popen(
            cmd,
            cwd=SCRIPT_DIR,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        for line in proc.stdout:
            print(line, end="", flush=True)
        proc.wait()

        elapsed = time.time() - t_start
        if proc.returncode == 0:
            log(f"✅ {script_name} 完成 ({elapsed:.1f}s)")
            return True
        else:
            log(f"⚠️  {script_name} 退出码 {proc.returncode} ({elapsed:.1f}s)")
            return False
    except Exception as e:
        log(f"❌ {script_name} 执行异常: {e}")
        return False


def step_check_and_clean_cpa():
    """
    检查 CPA 中 401 失效账号并删除。
    返回被删除的账号数量。
    """
    log("🔍 === 开始检查清理 CPA 失效账号 ===")
    config = load_config()
    base_url = config.get("cli_proxy_api_base", "")
    token = config.get("cli_proxy_password", "") or config.get("upload_api_token", "")

    if not base_url or not token:
        log("⚠️  CPA 地址或密码未配置，跳过 CPA 检查")
        return 0

    # 清除上次的结果文件
    if os.path.exists(INVALID_ACCOUNTS_FILE):
        os.remove(INVALID_ACCOUNTS_FILE)

    success = run_script("check_code.py", [
        "--base-url", base_url,
        "--token", token,
        "--delete",
        "--yes",
    ])

    # 读取 invalid_codex_accounts.json 统计删除数量
    # 注意：此文件记录的是「探测到的失效账号」，如果删除部分失败，
    # 可能会多注册几个号，但下一轮循环会自动修正。
    deleted_count = 0
    if os.path.exists(INVALID_ACCOUNTS_FILE):
        try:
            with open(INVALID_ACCOUNTS_FILE, "r", encoding="utf-8") as f:
                invalid_list = json.load(f)
            if isinstance(invalid_list, list):
                deleted_count = len(invalid_list)
                n401 = sum(1 for r in invalid_list if r.get("invalid_401"))
                n429 = sum(1 for r in invalid_list if r.get("rate_limited_429"))
                nqe = sum(1 for r in invalid_list if r.get("quota_exhausted"))
                log(f"🗑️  CPA 清理完成，删除了 {deleted_count} 个无效账号（401失效={n401}，429限流={n429}，额度耗尽={nqe}）")
        except Exception:
            pass

    if deleted_count == 0:
        log("🗑️  CPA 清理完成，无需删除")
    return deleted_count


def step_quota_report():
    """读取 quota_report.json 并输出额度摘要"""
    report_path = os.path.join(SCRIPT_DIR, "quota_report.json")
    if not os.path.exists(report_path):
        return
    try:
        with open(report_path, "r", encoding="utf-8") as f:
            report = json.load(f)
        total = report.get("total", 0)
        ok = report.get("ok_200", 0)
        r401 = report.get("invalid_401", 0)
        r429 = report.get("rate_limited_429", 0)
        qe = report.get("quota_exhausted", 0)
        err = report.get("probe_error", 0)
        log(f"📊 额度报告: 总{total} | 正常{ok} | 401失效{r401} | 429限流{r429} | 额度耗尽{qe} | 异常{err}")
        rl_list = report.get("quota_exhausted_accounts", [])
        if rl_list:
            names = ", ".join(r.get("account", "?") for r in rl_list[:5])
            extra = f" ...等{len(rl_list)}个" if len(rl_list) > 5 else ""
            log(f"  ⚠️  额度耗尽账号: {names}{extra}")
    except Exception as e:
        log(f"  ⚠️  读取额度报告失败: {e}")


def step_register(count=None):
    """
    批量注册。
    如果指定 count，则临时修改 config.json 的 total_accounts，完成后恢复。
    使用备份文件确保崩溃时也能恢复。
    """
    if count is not None and count <= 0:
        log("✅ 无需补充新号（没有失效账号被删除）")
        return True

    config = load_config()
    original_total = config.get("total_accounts", 20)
    backup_path = CONFIG_PATH + ".bak"

    if count is not None:
        log(f"📝 === 删了 {count} 个失效号，补充注册 {count} 个新号 ===")
        # 先备份原始 config，防止崩溃后无法恢复
        import shutil
        shutil.copy2(CONFIG_PATH, backup_path)
        config["total_accounts"] = count
        save_config(config)
    else:
        log(f"📝 === 开始批量注册（{original_total} 个）===")

    try:
        result = run_script("protocol_keygen.py")
    finally:
        # 恢复原始 total_accounts
        if count is not None:
            if os.path.exists(backup_path):
                # 从备份恢复（最安全）
                import shutil
                shutil.copy2(backup_path, CONFIG_PATH)
                os.remove(backup_path)
            else:
                # 备份丢失，手动恢复
                config["total_accounts"] = original_total
                save_config(config)

    return result


def step_refresh():
    """批量刷新 token"""
    log("🔄 === 开始批量刷新 Token ===")
    return run_script("refresh_tokens.py")


def step_clean_local():
    """清理本地生成的临时文件"""
    log("🧹 === 开始清理本地文件 ===")

    config = load_config()
    accounts_file = config.get("accounts_file", "accounts.txt")
    csv_file = config.get("csv_file", "registered_accounts.csv")
    ak_file = config.get("ak_file", "ak.txt")
    rk_file = config.get("rk_file", "rk.txt")

    files_to_clean = [
        accounts_file,
        csv_file,
        ak_file,
        rk_file,
        "ak_refreshed.txt",
        "rk_refreshed.txt",
        "invalid_codex_accounts.json",
        "quota_report.json",
        "config.json.bak",
    ]

    cleaned = 0

    for fname in files_to_clean:
        fpath = os.path.join(SCRIPT_DIR, fname)
        if os.path.exists(fpath):
            try:
                os.remove(fpath)
                log(f"  🗑️  已删除 {fname}")
                cleaned += 1
            except Exception as e:
                log(f"  ⚠️  删除 {fname} 失败: {e}")

    # 清理 {email}.json token 文件（排除 config.json）
    protected = {"config.json", "invalid_codex_accounts.json", "package.json", "package-lock.json"}
    for fpath in glob.glob(os.path.join(SCRIPT_DIR, "*.json")):
        basename = os.path.basename(fpath)
        if basename not in protected:
            try:
                os.remove(fpath)
                log(f"  🗑️  已删除 {basename}")
                cleaned += 1
            except Exception as e:
                log(f"  ⚠️  删除 {basename} 失败: {e}")
    log(f"🧹 清理完成，共删除 {cleaned} 项")
    return True


# =================== 主入口 ===================

def full_cycle():
    """
    完整运营循环：
      1. 检查 CPA，清理 401 失效账号
      2. 删了多少号就补充注册多少新号
      3. 清理本地临时文件
    """
    log("🚀 ======== 开始完整运营循环 ========")
    t_start = time.time()

    # 1. 先检查清理 CPA
    deleted_count = step_check_and_clean_cpa()

    # 1.5 输出额度报告
    step_quota_report()

    # 2. 删了多少号就补多少号
    if deleted_count > 0:
        step_register(count=deleted_count)
    else:
        log("✅ CPA 无失效账号，无需补充新号")

    # 3. 清理本地文件
    step_clean_local()

    elapsed = time.time() - t_start
    log(f"🏁 ======== 运营循环完成 ({elapsed:.1f}s) ========\n")


def main():
    parser = argparse.ArgumentParser(
        description="自动运营：检查清理 CPA → 删多少补多少 → 清理本地",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  python auto_ops.py              # 完整循环（检查清理 → 补号 → 清理本地）
  python auto_ops.py --register   # 仅注册（用 config.json 的 total_accounts）
  python auto_ops.py --refresh    # 仅刷新 token
  python auto_ops.py --check      # 仅检查清理 CPA
  python auto_ops.py --clean      # 仅清理本地文件
  python auto_ops.py --loop       # 持续循环（每 4 小时）

部署到服务器:
  nohup python auto_ops.py --loop > /var/log/codex_ops.log 2>&1 &
        """,
    )
    parser.add_argument("--register", action="store_true", help="仅执行批量注册")
    parser.add_argument("--refresh", action="store_true", help="仅执行批量刷新 Token")
    parser.add_argument("--check", action="store_true", help="仅检查清理 CPA 失效账号")
    parser.add_argument("--clean", action="store_true", help="仅清理本地生成的文件")
    parser.add_argument("--loop", action="store_true", help="持续循环模式")
    parser.add_argument("--quota", action="store_true", help="仅检查额度（不删除）")
    args = parser.parse_args()

    has_specific = args.register or args.refresh or args.check or args.clean or args.quota

    if args.loop:
        config = load_config()
        interval_hours = config.get("ops_interval_hours", 4)
        log(f"🔁 进入持续循环模式，间隔 {interval_hours} 小时")
        while True:
            try:
                full_cycle()
            except Exception as e:
                log(f"❌ 运营循环异常: {e}（将在下一轮重试）")
            log(f"💤 等待 {interval_hours} 小时后执行下一轮...")
            time.sleep(interval_hours * 3600)
    elif has_specific:
        if args.register:
            step_register()
        if args.refresh:
            step_refresh()
        if args.check:
            step_check_and_clean_cpa()
            step_quota_report()
        if args.quota:
            log("📊 === 仅检查额度（不删除） ===")
            config = load_config()
            base_url = config.get("cli_proxy_api_base", "")
            token = config.get("cli_proxy_password", "") or config.get("upload_api_token", "")
            if base_url and token:
                run_script("check_code.py", ["--base-url", base_url, "--token", token, "--check-only"])
                step_quota_report()
            else:
                log("⚠️  CPA 地址或密码未配置")
        if args.clean:
            step_clean_local()
    else:
        full_cycle()


if __name__ == "__main__":
    main()
