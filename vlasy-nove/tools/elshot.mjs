// Screenshot one element of a live page with a transparent background:
// node tools/elshot.mjs URL SELECTOR OUT.png [scale]
import { chromium } from '@playwright/test';
const [url, selector, out, scale = '4'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: Number(scale) });
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
await p.waitForTimeout(3000);
const el = p.locator(selector).first();
await el.evaluate((n) => { for (let e = n; e; e = e.parentElement) e.style.setProperty('background', 'transparent', 'important'); document.documentElement.style.background = 'transparent'; document.body.style.background = 'transparent'; });
await el.screenshot({ path: out, omitBackground: true });
await b.close();
