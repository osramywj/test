#!/usr/bin/env python3
"""Upload local cli-proxy-api credential files to sub2api."""

import json
import glob
import os
import sys
import urllib.request
import urllib.error

SUB2API_BASE = "http://163.192.26.178:8080"
CPA_DIR = os.path.expanduser("~/.cli-proxy-api")
ADMIN_EMAIL = "admin@sub2api.local"
ADMIN_PASSWORD = "WENju115588"


def _post_json(url: str, payload: dict, headers: dict | None = None, timeout: int = 30) -> dict:
    data = json.dumps(payload).encode()
    hdrs = {"Content-Type": "application/json"}
    if headers:
        hdrs.update(headers)
    req = urllib.request.Request(url, data=data, headers=hdrs, method="POST")
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode())


def _get_json(url: str, headers: dict | None = None, timeout: int = 15) -> dict:
    hdrs = {}
    if headers:
        hdrs.update(headers)
    req = urllib.request.Request(url, headers=hdrs)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode())


def login() -> str:
    data = _post_json(
        f"{SUB2API_BASE}/api/v1/auth/login",
        {"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
    )
    return data["data"]["access_token"]


def _parse_tier(filename: str) -> str:
    """Determine account tier from filename: 'team' if filename contains 'team', else 'free'."""
    lower = filename.lower()
    if "-team" in lower or "_team" in lower or lower.endswith("team.json"):
        return "team"
    return "free"


def load_credential_files():
    pattern = os.path.join(CPA_DIR, "*.json")
    files = sorted(glob.glob(pattern))
    accounts = []
    for f in files:
        basename = os.path.basename(f)
        if basename == "accounts.json":
            continue
        with open(f) as fh:
            try:
                cred = json.load(fh)
            except json.JSONDecodeError:
                print(f"  [SKIP] invalid JSON: {basename}")
                continue
        # Must have refresh_token to be useful
        if not cred.get("refresh_token"):
            print(f"  [SKIP] no refresh_token: {basename}")
            continue
        email = cred.get("email", basename.replace(".json", ""))
        tier = _parse_tier(basename)
        accounts.append({"file": f, "email": email, "cred": cred, "tier": tier})
    return accounts


def get_existing_account_names(token: str) -> set:
    """Fetch all account names from sub2api to support incremental upload."""
    headers = {"Authorization": f"Bearer {token}"}
    names = set()
    page = 1
    while True:
        data = _get_json(
            f"{SUB2API_BASE}/api/v1/admin/accounts?page={page}&page_size=100",
            headers=headers,
        )
        items = data.get("data", {}).get("items", [])
        if not items:
            break
        for item in items:
            names.add(item.get("name", ""))
        total = data.get("data", {}).get("total", 0)
        if page * 100 >= total:
            break
        page += 1
    return names


def _make_account_name(email: str, tier: str) -> str:
    """Derive account name from email prefix + tier suffix."""
    name = email.split("@")[0] if "@" in email else email
    return f"{name}-{tier}"


def build_create_request(email: str, cred: dict, tier: str = "free") -> dict:
    """Build a sub2api CreateAccountRequest from a CPA credential."""
    credentials = {
        "refresh_token": cred.get("refresh_token", ""),
    }
    if cred.get("access_token"):
        credentials["access_token"] = cred["access_token"]
    if cred.get("account_id"):
        credentials["account_uuid"] = cred["account_id"]

    name = _make_account_name(email, tier)

    return {
        "name": name,
        "platform": "openai",
        "type": "oauth",
        "credentials": credentials,
        "concurrency": 1,
        "priority": 0,
    }


def upload_accounts(token: str, accounts: list):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    # Use batch create API for efficiency
    batch_size = 20
    total_success = 0
    total_failed = 0

    for i in range(0, len(accounts), batch_size):
        batch = accounts[i: i + batch_size]
        batch_requests = []
        for acc in batch:
            req = build_create_request(acc["email"], acc["cred"], acc.get("tier", "free"))
            batch_requests.append(req)

        payload = {"accounts": batch_requests}
        try:
            result_resp = _post_json(
                f"{SUB2API_BASE}/api/v1/admin/accounts/batch",
                payload,
                headers=headers,
                timeout=60,
            )
            result = result_resp.get("data", {})
        except urllib.error.HTTPError as e:
            body = e.read().decode() if e.fp else ""
            print(f"  [ERROR] batch {i // batch_size + 1}: HTTP {e.code}")
            print(f"    {body[:500]}")
            total_failed += len(batch)
            continue

        success = result.get("success", 0)
        failed = result.get("failed", 0)
        total_success += success
        total_failed += failed

        results = result.get("results", [])
        for r in results:
            status = "OK" if r.get(
                "success") else f"FAIL: {r.get('error', '?')}"
            print(f"  [{status}] {r.get('name', '?')}")

        print(f"  Batch {i // batch_size + 1}: {success} ok, {failed} failed")

    return total_success, total_failed


def main():
    print("=== Upload CPA credentials to Sub2API (incremental) ===")
    print(f"Source: {CPA_DIR}")
    print(f"Target: {SUB2API_BASE}")
    print()

    print("[1/4] Logging in...")
    token = login()
    print("  Logged in successfully.")

    print("[2/4] Loading credential files...")
    accounts = load_credential_files()
    print(f"  Found {len(accounts)} credential files.")

    print("[3/4] Checking existing accounts...")
    existing = get_existing_account_names(token)
    print(f"  {len(existing)} accounts already in sub2api.")

    # Filter out already uploaded accounts (match by name+tier)
    new_accounts = []
    for acc in accounts:
        name = _make_account_name(acc["email"], acc["tier"])
        if name in existing:
            print(f"  [SKIP] already exists: {name}")
        else:
            new_accounts.append(acc)

    if not new_accounts:
        print("\nAll accounts already uploaded. Nothing to do.")
        return

    print(f"[4/4] Uploading {len(new_accounts)} new accounts...")
    success, failed = upload_accounts(token, new_accounts)
    print()
    print(
        f"=== Done: {success} uploaded, {failed} failed (skipped {len(accounts) - len(new_accounts)} existing) ===")


if __name__ == "__main__":
    main()
