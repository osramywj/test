# ChatGPT Codex 批量注册 & 管理工具

> 纯 HTTP + Playwright 混合模式，批量注册 ChatGPT 账号、获取/刷新 Codex OAuth Token、检查清理失效账号。

## 环境要求

```bash
pip install curl_cffi aiohttp playwright
playwright install chromium
```

- `curl_cffi`：`protocol_keygen.py` / `refresh_tokens.py` 使用，模拟 Chrome TLS 指纹
- `aiohttp`：`check_code.py` 使用，异步高并发探测账号状态
- `playwright`：`sentinel_browser.py` 使用，解决 Sentinel Turnstile 挑战

## 配置 (config.json)

所有脚本共用同一份 `config.json`。示例：

```json
{
    "total_accounts": 20,
    "concurrent_workers": 8,
    "headless": false,
    "proxy": "",
    "cf_worker_domain": "mail.example.com",
    "cf_email_domain": "example.com",
    "cf_admin_password": "你的 Worker 管理密码",
    "oauth_issuer": "https://auth.openai.com",
    "oauth_client_id": "app_EMoamEEZ73f0CkXaXp7hrann",
    "oauth_redirect_uri": "http://localhost:1455/auth/callback",
    "upload_api_url": "https://你的CPA地址/v0/management/auth-files",
    "upload_api_token": "你的CPA密码",
    "cli_proxy_api_base": "http://你的CPA地址:8080",
    "cli_proxy_management_url": "http://你的CPA地址:8080/management.html#/oauth",
    "cli_proxy_password": "你的CPA密码",
    "accounts_file": "accounts.txt",
    "csv_file": "registered_accounts.csv",
    "ak_file": "ak.txt",
    "rk_file": "rk.txt",
    "ops_interval_hours": 4
}
```

### 配置项说明

| 配置项 | 必填 | 说明 |
|--------|------|------|
| `total_accounts` | 否 | 注册数量，默认 30 |
| `concurrent_workers` | 否 | 注册/刷新并发数，默认 1 |
| `proxy` | **是** | HTTP 代理地址（服务器部署必填，如 `http://127.0.0.1:7901`） |
| `cf_worker_domain` | **是** | Cloudflare Worker 自定义域名（如 `mail.example.com`） |
| `cf_email_domain` | **是** | 邮箱域名（如 `example.com`） |
| `cf_admin_password` | **是** | Worker 管理密码（ADMIN_PASSWORDS） |
| `upload_api_url` | 否 | CPA 面板上传 API 地址 |
| `upload_api_token` | 否 | CPA 面板密码 |
| `ops_interval_hours` | 否 | `--loop` 模式循环间隔（小时），默认 4 |

### 前置：搭建 Cloudflare Worker 临时邮箱

基于 [cloudflare_temp_email](https://github.com/dreamhunter2333/cloudflare_temp_email) 项目。

需要：
1. Cloudflare 账号 + 托管域名
2. 开启 Email Routing
3. 创建 D1 数据库 + 部署 Worker
4. 绑定自定义域名（`mail.你的域名.com`）
5. 设置 Catch-All 路由到 Worker

> ⚠️ **注意**：请将示例域名替换为你自己的域名

---

## 功能模块

### 1. 批量注册 (protocol_keygen.py)

全流程纯 HTTP 协议注册，使用 `curl_cffi` 随机模拟 Chrome 131/133/136/142 TLS 指纹。

```bash
python protocol_keygen.py
```

**注册流程**（10 步纯 HTTP）：

```
1. Cloudflare Worker API 创建临时邮箱 (@example.com)
2. OAuth 会话初始化 (PKCE + GET /oauth/authorize + screen_hint=signup)
3. POST /api/accounts/authorize/continue → 提交邮箱（需 sentinel token）
4. POST /api/accounts/user/register → 提交密码注册
5. GET /api/accounts/email-otp/send → 触发验证码
6. 轮询 Cloudflare Worker API 获取验证码邮件
7. POST /api/accounts/email-otp/validate → 提交验证码
8. POST /api/accounts/create_account → 填写姓名+生日
9. OAuth Token 交换 → 获取 Access/Refresh Token
10. 保存 Token JSON + 自动上传 CPA 面板
```

**输出文件**：

| 文件 | 内容 |
|------|------|
| `ak.txt` | Access Token（每行一个） |
| `rk.txt` | Refresh Token（每行一个） |
| `accounts.txt` | 账号信息（`email:password` 每行一个） |
| `registered_accounts.csv` | CSV 格式注册结果（email, password, timestamp） |
| `{email}.json` | 每个账号的完整 Token JSON（含 proxy_url，自动上传 CPA） |

---

### 2. Token 批量刷新 (refresh_tokens.py)

读取 `accounts.txt` 中已注册的账号，重新执行 Codex OAuth 纯 HTTP 登录获取全新 Token。复用 `protocol_keygen.py` 的核心函数。

```bash
python refresh_tokens.py                  # 刷新所有账号
python refresh_tokens.py 5                # 只刷新前 5 个
python refresh_tokens.py 3 8              # 刷新第 3~8 个（1-indexed）
```

刷新后输出 `ak_refreshed.txt` / `rk_refreshed.txt`，并自动保存 JSON + 上传 CPA。

> **注意**：配置的 `cf_email_domain` 域名的账号会通过 admin API 模式读取 OTP 邮件；其他域名的账号若需邮箱 OTP 验证则会失败。

---

### 3. 批量检查 / 清理失效账号 (check_code.py)

通过 CPA 管理 API 批量异步探测 codex 类型账号，找出 HTTP 401 失效账号并可选删除。

**运行**：

```bash
# 交互式菜单（推荐，会提示输入 CPA 地址和密码）
python check_code.py

# 命令行指定参数
python check_code.py --base-url http://你的CPA地址:8080 --token 你的CPA密码

# 检查 + 自动删除
python check_code.py --base-url http://你的CPA地址:8080 --token 你的CPA密码 --delete --yes

# 从上次导出结果直接删除
python check_code.py --delete-from-output --yes
```

> `check_code.py` 可从 config.json 读取 `base_url` / `cpa_password` 字段，也可通过 `--base-url` / `--token` 命令行参数传入，或通过 `--har` 从浏览器抓包文件自动提取。

**交互式菜单**：

```
1) 仅检查 401 并导出
2) 检查 401 并立即删除
3) 直接删除 output 文件中的账号
0) 退出
```

**输出**：`invalid_codex_accounts.json`（所有 401 失效账号详情）

---

### 4. 自动运营 (auto_ops.py)

每 4 小时自动循环：**检查清理 CPA 失效账号 → 删了多少号就补充注册多少新号 → 清理本地文件**。

```bash
python auto_ops.py              # 完整循环（清理失效 → 补充新号 → 清理本地）
python auto_ops.py --register   # 仅注册（用 config.json 的 total_accounts）
python auto_ops.py --refresh    # 仅刷新 token
python auto_ops.py --check      # 仅检查清理 CPA 401 账号
python auto_ops.py --clean      # 仅清理本地生成的文件
python auto_ops.py --loop       # 持续循环模式（默认每 4 小时）
```

**完整循环流程**：

```
1. 检查 CPA 面板，找出 401 失效账号 → 删除
2. 删了 N 个失效号 → 自动补充注册 N 个新号
3. 清理本地生成的临时文件（accounts.txt / ak.txt / *.json 等）
```

**本地文件清理范围**：

| 清理目标 | 说明 |
|----------|------|
| `accounts.txt` | 注册生成的账号列表 |
| `ak.txt` / `rk.txt` | Access / Refresh Token 文件 |
| `registered_accounts.csv` | CSV 格式注册结果 |
| `{email}.json` | Token JSON 文件（排除 `config.json`） |
| `ak_refreshed.txt` / `rk_refreshed.txt` | 刷新后的 Token 文件 |
| `invalid_codex_accounts.json` | 检查导出的失效账号 |

> `ops_log.txt` 运营日志超过 5MB 自动轮转，不会无限增长。

**代理策略**：每个 worker 自动分配一个固定端口代理（`proxy_base:proxy_ports[i]`，默认 `http://172.17.0.1:7901~7910`），确保单个账号注册全流程 IP 不变，不同账号分散到不同出口 IP。无需设置全局 `proxy` 字段。

**服务器部署**：

```bash
# 使用 screen 后台运行（推荐）
screen -dmS codex-ops bash -c 'cd /path/to/codex-auto-ops && python3 auto_ops.py --loop 2>&1 | tee /var/log/codex_ops.log'

# 查看运行状态
screen -ls

# 查看日志
tail -f /var/log/codex_ops.log

# 重新连接 screen 会话
screen -r codex-ops

# 停止运营
screen -X -S codex-ops quit
```

---

## 目录结构

```
codex fingerip 1 auto/
├── protocol_keygen.py          # 主程序（批量注册 + OAuth 登录）
├── refresh_tokens.py           # Token 批量刷新（复用 protocol_keygen）
├── check_code.py               # 批量检查/清理失效账号（aiohttp 异步）
├── auto_ops.py                 # 自动运营（注册 → 清理 CPA → 清理本地）
├── config.json                 # 全局配置
└── README.md                   # 本文档
```

## 技术细节

- 全流程纯 HTTP，零浏览器依赖
- `curl_cffi` 随机模拟 Chrome 131/133/136/142 TLS 指纹，规避风控
- Sentinel Token 通过纯 Python 逆向 PoW 算法生成（FNV-1a 哈希 + xorshift 混合）
- OAuth 使用 PKCE (S256) 验证流程
- `check_code.py` 使用 `aiohttp` 异步高并发探测，支持 200+ 并发
- 代理端口自动轮询分配（默认 7901~7910），每个账号固定独立 IP
- 并发注册/刷新使用 `ThreadPoolExecutor` + 线程锁保证文件写入安全
- Token JSON 自动上传 CPA 管理平台（通过 `CurlMime` multipart 上传）

## 注意事项

- 部署到海外服务器后，通过 per-worker 代理（Mihomo 7901~7910）分散出口 IP
- 需要先搭建好 Cloudflare Worker 临时邮箱服务
- CPA 面板集成需要先部署好 CPA 服务

## 更新日志

### 2026-04-03 v7.1 — 隐私清理
- 清除 `protocol_keygen.py` 中硬编码的真实域名默认值（`tuxixilax.cfd` → `example.com`）
- 确认所有配置文件使用占位符（`YOUR_*`），无真实密码/Token/服务器IP泄露

### 2026-04-02 v7 — Sentinel Turnstile 适配
- 更新 Sentinel SDK 适配（`20260124ceb8` → `20260219f9f6`），config 数组 19→25 元素
- 修正 register flow 名称为 `username_password_create`
- 新增 `sentinel_browser.py`：Playwright 无头浏览器解决 Turnstile 挑战
- `create_account` 步骤优先 Playwright 获取完整 sentinel token（p+t+c），失败回退纯 HTTP
