// Pick a variant by label in the first <select> and read the price shown
// next to the h1: node tools/variant_price.mjs "LABEL" URL [URL...]
import { chromium } from '@playwright/test';
const [label, ...urls] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
for (const url of urls) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await p.waitForTimeout(2000);
  const sel = p.locator('select').first();
  let picked = '';
  const exact = new RegExp(`^\\s*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`);
  const tile = p.locator('a.SelectAttributeVariant').filter({ hasText: exact }).first();
  if (await tile.count()) { await tile.click(); picked = 'tile ' + label; await p.waitForTimeout(2500); }
  else { try { await sel.selectOption({ label }); picked = label; await p.waitForTimeout(1500); } catch { picked = 'no-select'; } }
  const price = await p.evaluate(() => {
    const h1 = document.querySelector('h1');
    let box = h1; for (let i = 0; i < 6 && box && !/Kč|€/.test(box.innerText); i++) box = box.parentElement;
    return { h1: h1?.innerText.trim(), price: ((box?.innerText || '').match(/\d[\d\s]*(,\d{2})?\s?(Kč|€)/) || [''])[0] };
  });
  console.log(url.split('/').pop(), picked, JSON.stringify(price));
  await p.close();
}
await b.close();
