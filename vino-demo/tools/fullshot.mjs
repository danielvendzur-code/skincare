import { chromium } from '@playwright/test';
const [url, out, h] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: { server: process.env.HTTPS_PROXY } });
const p = await b.newPage({ viewport: { width: 1440, height: Number(h || 2400) } });
await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 }).catch(e => console.log(e.message.slice(0, 80)));
await p.waitForTimeout(4000);
for (const sel of ['text=Súhlasím', 'text=Souhlasím', 'text=Prijať všetko', 'text=Přijmout vše', 'text=Accept all', 'text=Rozumiem', 'text=Povoliť všetky']) { const l = p.locator(sel).first(); if (await l.count()) { await l.click({ timeout: 2000 }).catch(() => {}); break; } }
await p.waitForTimeout(800);
await p.screenshot({ path: out });
await b.close();
