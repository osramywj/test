
import json
import os
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

DEFAULT_FLOWS = [
    'authorize_continue',
    'username_password_create',
    'password_verify',
    'oauth_create_account',
]

OUT = Path(os.environ.get('OUT', '/tmp/sentinel_multi_helper_out.json'))
PROXY = os.environ.get('PROXY_SERVER', 'http://127.0.0.1:7890').strip()
SDK_URL = os.environ.get(
    'SDK_URL', 'https://sentinel.openai.com/sentinel/20260219f9f6/sdk.js').strip()
UA = os.environ.get(
    'UA', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36').strip()
FRAME_URL = os.environ.get(
    'FRAME_URL', 'https://sentinel.openai.com/backend-api/sentinel/frame.html?sv=20260219f9f6').strip()
flows_raw = os.environ.get('FLOWS', '').strip()
FLOWS = [f.strip() for f in flows_raw.split(',') if f.strip()] or DEFAULT_FLOWS

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, proxy={'server': PROXY})
    context = browser.new_context(
        user_agent=UA, locale='en-US', viewport={'width': 1920, 'height': 1080})
    page = context.new_page()
    page.goto(FRAME_URL, wait_until='load', timeout=120000)
    page.wait_for_timeout(8000)
    page.wait_for_function('() => !!window.SentinelSDK', timeout=30000)
    result = page.evaluate(
        """async (flows) => {
            const out = {
                source: 'playwright_sentinel_multi_helper',
                generatedAt: new Date().toISOString(),
                frameUrl: location.href,
                sdkUrl: document.currentScript?.src || null,
                userAgent: navigator.userAgent,
                userAgentData: navigator.userAgentData ? navigator.userAgentData.toJSON() : null,
                cookieBefore: document.cookie,
                flows: {},
            };
            if (!window.SentinelSDK) throw new Error('SentinelSDK missing');
            for (const flow of flows) {
                await window.SentinelSDK.init(flow);
                const tok = await window.SentinelSDK.token(flow);
                let soTok = null;
                try {
                    soTok = await window.SentinelSDK.sessionObserverToken(flow);
                } catch (e) {
                    soTok = null;
                }
                out.flows[flow] = {
                    flow,
                    token: tok ? JSON.parse(tok) : null,
                    soToken: soTok ? JSON.parse(soTok) : null,
                    cookieAfter: document.cookie,
                };
            }
            return out;
        }""",
        FLOWS,
    )
    OUT.write_text(json.dumps(result, ensure_ascii=False,
                   indent=2), encoding='utf-8')
    print(str(OUT))
    browser.close()
