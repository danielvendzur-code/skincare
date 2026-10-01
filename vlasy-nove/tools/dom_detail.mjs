// Rendered product detail: h1, prices near it, variant labels, stock text,
// og:image, description. node tools/dom_detail.mjs URL [URL...]
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
for (const url of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  try {
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await p.waitForTimeout(2500);
    const info = await p.evaluate(() => {
      const h1 = document.querySelector('h1');
      let box = h1; for (let i = 0; i < 6 && box && !/Kč|€/.test(box.innerText); i++) box = box.parentElement;
      const text = (box?.innerText || '').replace(/\s+/g, ' ');
      return {
        h1: h1?.innerText.trim(),
        prices: [...new Set(text.match(/\d[\d\s]*(,\d{2})?\s?(Kč|€)/g) || [])].slice(0, 6),
        variants: [...document.querySelectorAll('select option, [class*="variant"] label, [class*="variant"] button')].map((o) => o.innerText.trim()).filter(Boolean).slice(0, 8),
        stock: (text.match(/(Skladem|Skladom|Na skladě|Na sklade|Vyprodáno|Nedostupn\S*|Již brzy|Momentálně nedostupné)[^.]{0,20}/g) || []).slice(0, 3),
        image: document.querySelector('meta[property="og:image"]')?.content,
        desc: document.querySelector('meta[name="description"]')?.content?.slice(0, 240),
      };
    });
    console.log(url, JSON.stringify(info, null, 0));
  } catch (e) { console.log(url, 'ERR', e.message.slice(0, 80)); }
  await p.close();
}
await b.close();
