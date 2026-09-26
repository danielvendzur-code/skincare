// Shoptet "simple variants" (radio labels): click each and read the final price
// and stock. node tools/radio_variants.mjs URL [URL...]
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
for (const url of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await p.waitForTimeout(2500);
  const labels = await p.$$('#simple-variants label');
  for (const l of labels) {
    await l.click({ force: true }).catch(() => {});
    await p.waitForTimeout(700);
    const r = await p.evaluate(() => {
      const t = s => (document.querySelector(s)?.innerText || '').replace(/\s+/g, ' ').trim();
      return { price: t('.p-final-price-wrapper .price-final-holder:not(.noDisplay)') || t('.price-final'), stock: t('.p-detail-inner .availability-label') || t('.availability-value') };
    });
    console.log(url.split('/').slice(-2)[0], '|', (await l.innerText()).replace(/\s+/g, ' ').trim(), '|', r.price, '|', r.stock);
  }
  await p.close();
}
await b.close();
