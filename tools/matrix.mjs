// Recommendation matrix for every brand of this project.
//   node tools/matrix.mjs [BASE] [slug,slug…]   (serve the folder first)
// Per brand:
//  * the page's own exhaustive audits (all 4×4×4×4 = 256 answer combinations,
//    skincare-final-fix.js and skincare-routine-enhancer.js) report 0 failures:
//    every combination ends in a product, of the asked colour / skin type
//    when the catalogue has one, and routines are never cut short;
//  * every product has a name, a price, a link into the brand's own shop and a
//    photo that loads;
//  * four answer paths clicked through in the browser end in a result whose
//    alternative is not the main product and whose link is a real product.
import { chromium } from '@playwright/test';

const [base = 'http://127.0.0.1:8791', only] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${base}/cosmetics.html`, { waitUntil: 'load' });
const all = await page.evaluate(() => Object.keys(window.COSMETICS_DEMOS.brands));
const slugs = only ? only.split(',') : all;
const problems = [];
const host = (u) => { try { return new URL(u).hostname.replace(/^(www|eshop|shop)\./, ''); } catch { return ''; } };

for (const slug of slugs) {
  await page.goto(`${base}/cosmetics.html?demo=${slug}`, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const got = await page.evaluate(() => document.body.dataset.cosmeticsDemo);
  if (got !== slug) { problems.push(`${slug}: page renders ${got}`); continue; }
  const qa = await page.evaluate(() => [window.__SKINCARE_RUNTIME_QA__, window.__SKINCARE_ROUTINE_QA__]);
  if (!qa[0] || qa[0].criticalRecommendationFailures) problems.push(`${slug}: final guard ${JSON.stringify(qa[0])}`);
  if (!qa[1] || qa[1].failures) problems.push(`${slug}: routine audit ${JSON.stringify(qa[1])}`);

  const brand = await page.evaluate((s) => { const b = window.COSMETICS_DEMOS.brands[s]; return { website: b.website, products: b.products }; }, slug);
  const shop = host(brand.website);
  for (const p of brand.products) {
    if (!p.name || !p.price) problems.push(`${slug}/${p.id}: missing name or price`);
    if (!p.url || !host(p.url).endsWith(shop.split('.').slice(-2).join('.'))) problems.push(`${slug}/${p.id}: link outside the shop ${p.url}`);
    const ok = await page.evaluate(async (src) => { try { const r = await fetch(src, { method: 'HEAD' }); return r.ok; } catch { return false; } }, p.photo);
    if (!ok) problems.push(`${slug}/${p.id}: photo missing ${p.photo}`);
  }

  for (const path of [[0, 0, 0, 0], [1, 1, 1, 1], [2, 3, 0, 2], [3, 2, 3, 1]]) {
    await page.goto(`${base}/cosmetics.html?demo=${slug}`, { waitUntil: 'load' });
    await page.waitForTimeout(400);
    await page.locator('[data-open="advisor"]').first().click();
    await page.waitForTimeout(600);
    for (const pick of path) {
      await page.locator('.cx-option').nth(pick).click();
      await page.waitForTimeout(1050);
    }
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => ({
      main: document.querySelector('.cx-product-copy h2')?.textContent?.trim(),
      link: document.querySelector('.cx-product-price a')?.href,
      alt: document.querySelector('.cx-alt:not([hidden]) b')?.textContent?.trim() || null
    }));
    const names = brand.products.map((p) => p.name);
    if (!r.main || !names.includes(r.main)) problems.push(`${slug} ${path}: no catalogue result (${r.main})`);
    if (!r.link || !brand.products.some((p) => p.url === r.link)) problems.push(`${slug} ${path}: result link ${r.link}`);
    if (r.alt && r.alt === r.main) problems.push(`${slug} ${path}: alternative equals the main product`);
  }
  process.stdout.write('.');
}
await browser.close();
console.log(`\n${slugs.length} brands`);
if (problems.length) { console.log('FAIL\n ' + problems.join('\n ')); process.exit(1); }
console.log('PASS');
