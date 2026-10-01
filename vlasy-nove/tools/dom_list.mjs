// List product cards of a rendered category page: name | price | url.
// node tools/dom_list.mjs URL [URL...]
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
for (const url of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await p.waitForTimeout(3500);
  const rows = await p.evaluate(() => {
    const out = new Map();
    for (const a of document.querySelectorAll('a[href]')) {
      let card = a;
      for (let i = 0; i < 6 && card; i++, card = card.parentElement) {
        const t = card.innerText || '';
        if (/\d[\d\s]*(,\d{2})?\s?(Kč|€)/.test(t) && t.length < 600) break;
      }
      if (!card) continue;
      const t = card.innerText.replace(/\s+/g, ' ').trim();
      const price = (t.match(/(od\s)?\d[\d\s]*(,\d{2})?\s?(Kč|€)/) || [''])[0];
      const name = (a.innerText || a.title || '').replace(/\s+/g, ' ').trim();
      if (name.length > 5 && !out.has(a.href)) out.set(a.href, `${name.slice(0, 90)} | ${price} | ${a.href}`);
    }
    return [...out.values()];
  });
  console.log(`== ${url}\n${rows.join('\n')}`);
  await p.close();
}
await b.close();
