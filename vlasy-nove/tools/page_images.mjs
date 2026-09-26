// All large images on a rendered page (src, natural size): pick packshots from
// galleries that load with JS. node tools/page_images.mjs URL [URL...]
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
for (const url of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await p.waitForTimeout(3000);
  await p.evaluate(() => window.scrollTo(0, 1600)); await p.waitForTimeout(1200);
  const imgs = await p.evaluate(() => {
    const out = new Set();
    document.querySelectorAll('img').forEach(i => { if (i.naturalWidth >= 400) out.add(`${i.naturalWidth}x${i.naturalHeight} ${i.currentSrc || i.src}`); });
    document.querySelectorAll('a[href]').forEach(a => { if (/\.(jpe?g|png|webp)(\?|$)/i.test(a.href)) out.add(`link ${a.href}`); });
    return [...out];
  });
  console.log('== ' + url + '\n' + imgs.join('\n'));
  await p.close();
}
await b.close();
