// Price line and buy button on a rendered product page: node tools/buy_check.mjs URL...
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: { server: process.env.HTTPS_PROXY } });
for (const u of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  await p.goto(u, { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
  await p.waitForTimeout(2500);
  const t = await p.evaluate(() => document.body.innerText.replace(/\s+/g,' '));
  const m = t.match(/Cena \(včetně DPH\):[^A-Z]{0,40}/); const s = t.match(/(vyprodáno|není skladem|skladem|dočasně nedostupn\w*|připravujeme|brzy)/ig);
  const buy = await p.evaluate(() => [...document.querySelectorAll('button,a')].filter(x => /KOUPIT|DO KOŠÍKU/i.test(x.innerText)).map(x => x.innerText.trim()+(x.disabled?'(disabled)':'')));
  console.log(u.split('/').slice(-3,-1).join('/'), '|', m && m[0], '|', s && [...new Set(s)].join(','), '|', buy.join(','));
  await p.close();
}
await b.close();
