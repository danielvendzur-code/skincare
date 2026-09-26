// Browser QA for one demo: screenshots every state and fails on anything a
// client would notice. node tools/qa.mjs SLUG OUT_DIR [BASE]
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const [slug, out, base = 'http://127.0.0.1:8790'] = process.argv.slice(2);
await fs.mkdir(out, { recursive: true });
const problems = [];
const fail = (msg) => problems.push(msg);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium' });

const imagesOk = (page, sel) => page.evaluate((s) => [...document.querySelectorAll(s)]
  .filter((i) => i.offsetParent !== null || getComputedStyle(i).position === 'fixed')
  .filter((i) => !(i.complete && i.naturalWidth > 1)).map((i) => i.getAttribute('src')?.slice(0, 80)), sel);

for (const vp of [{ n: 'desktop', width: 1440, height: 900 }, { n: 'mobile', width: 390, height: 844 }, { n: 'small', width: 360, height: 800 }]) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.n === 'desktop' ? 1 : 2 });
  page.on('pageerror', (e) => fail(`${vp.n} pageerror ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error' && !/404|501|cosmetics-chat/.test(m.text())) fail(`${vp.n} console ${m.text()}`); });
  page.on('requestfailed', (r) => { if (!/cosmetics-chat/.test(r.url())) fail(`${vp.n} requestfailed ${r.url()}`); });
  page.on('response', (r) => { if (r.status() >= 400 && !/cosmetics-chat/.test(r.url())) fail(`${vp.n} ${r.status()} ${r.url()}`); });
  const shot = (name) => page.screenshot({ path: `${out}/${slug}-${vp.n}-${name}.png` });
  const overflow = async (where) => { const o = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) fail(`${vp.n} ${where} horizontal overflow ${o}px`); };

  await page.goto(`${base}/cosmetics.html?demo=${slug}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  if ((await page.evaluate(() => document.body.dataset.cosmeticsDemo)) !== slug) fail(`${vp.n} wrong brand rendered`);
  const bad = await imagesOk(page, '#cosmetics-root img'); if (bad.length) fail(`${vp.n} owner images not loaded ${bad}`);
  await overflow('owner');
  await shot('1-owner');

  // Offer sheet and both contact CTAs carry the brand into the contact form.
  if (vp.n !== 'small') {
    await page.locator('[data-cx-offer="open"]').click(); await page.waitForTimeout(450);
    await shot('2-offer');
    const hrefs = await page.$$eval('a[href*="mojchatbot.sk/kontakt"]', (a) => a.map((x) => x.href));
    if (hrefs.length < 2) fail(`${vp.n} expected 2 contact CTAs, got ${hrefs.length}`);
    for (const h of hrefs) {
      const q = new URL(h).searchParams;
      if (q.get('source') !== `skincare-demo-${slug}` || !q.get('company') || !/^https:\/\//.test(q.get('web') || '') || !q.get('demo')) fail(`${vp.n} contact link incomplete ${h}`);
    }
    await page.locator('[data-cx-offer="close"]').click(); await page.waitForTimeout(300);
  }

  // Chat: opens from launcher, chip answers with a real product of this brand.
  if (await page.locator('#cx-open').isVisible()) await page.locator('#cx-open').click(); else await page.locator('[data-open="chat"]').first().click();
  await page.waitForTimeout(600);
  await shot('3-chat');
  const av = await page.$$eval('.cx-message-avatar img', (i) => i.filter((x) => !(x.complete && x.naturalWidth > 1)).length);
  if (av) fail(`${vp.n} avatar image not loaded`);
  const names = await page.evaluate((s) => window.COSMETICS_DEMOS.brands[s].products.map((p) => p.name), slug);
  await page.locator('.cx-chip').first().click(); await page.waitForTimeout(900);
  const reply = await page.locator('.cx-message--assistant .cx-bubble').last().textContent();
  if (!names.some((n) => reply.includes(n))) fail(`${vp.n} chat reply names no product: ${reply}`);
  await shot('4-chat-answer');

  // Advisor: four photo steps without internal scroll, then a result.
  await page.locator('.cx-mode button[data-mode="advisor"]').click(); await page.waitForTimeout(700);
  for (let step = 0; step < 4; step += 1) {
    await page.waitForTimeout(350);
    // Questions show the shared thematic photographs (set in CSS), packshots only in the result.
    const bgs = await page.$$eval('.cx-option .cx-option-photo', (n) => n.map((x) => getComputedStyle(x).backgroundImage));
    if (bgs.length !== 4 || bgs.some((b) => !b.includes('url('))) fail(`${vp.n} step ${step + 1} option photos ${bgs}`);
    if (new Set(bgs).size < bgs.length) fail(`${vp.n} step ${step + 1} repeats a photo`);
    const scroll = await page.evaluate(() => { const n = document.querySelector('.cx-advisor-body') || document.querySelector('.cx-advisor'); return n ? n.scrollHeight - n.clientHeight : 0; });
    if (scroll > 2) fail(`${vp.n} step ${step + 1} scrolls ${scroll}px`);
    if (step === 0 || vp.n === 'desktop') await shot(`5-step${step + 1}`);
    await page.locator('.cx-option').nth([0, 2, 1, 3][step]).click(); await page.waitForTimeout(1100);
  }
  await page.waitForTimeout(700);
  const title = await page.locator('.cx-product-copy h2').first().textContent();
  if (!names.includes(title.trim())) fail(`${vp.n} result is not a catalogue product: ${title}`);
  const missing = await imagesOk(page, '.cx-result img'); if (missing.length) fail(`${vp.n} result images ${missing}`);
  const link = await page.locator('.cx-product-price a').first().getAttribute('href');
  const site = await page.evaluate((s) => new URL(window.COSMETICS_DEMOS.brands[s].website).hostname.replace(/^www\.|^eshop\./, ''), slug);
  if (!link.includes(site)) fail(`${vp.n} product link leaves the brand shop: ${link}`);
  await overflow('result');
  await shot('6-result');
  const qa = await page.evaluate(() => window.__SKINCARE_RUNTIME_QA__);
  if (!qa || qa.criticalRecommendationFailures) fail(`${vp.n} recommendation guard ${JSON.stringify(qa)}`);
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  await page.close();
}
await browser.close();
console.log(problems.length ? `FAIL ${slug}\n- ${[...new Set(problems)].join('\n- ')}` : `PASS ${slug}`);
process.exit(problems.length ? 1 : 0);
