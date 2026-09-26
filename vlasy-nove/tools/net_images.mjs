// Images the page actually downloads (for JS shops whose <img> tags hide the source): node tools/net_images.mjs URL...
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: { server: process.env.HTTPS_PROXY } });
for (const u of process.argv.slice(2)) {
  const p = await b.newPage({ viewport: { width: 1440, height: 1200 } });
  const seen = new Set();
  p.on('response', r => { const t = r.headers()['content-type'] || ''; if (t.startsWith('image/')) seen.add(r.url()); });
  await p.goto(u, { waitUntil: 'networkidle', timeout: 60000 }).catch(()=>{});
  await p.waitForTimeout(2500);
  console.log('##', u); for (const s of seen) if (!/google|mailchimp|facebook|doubleclick/.test(s)) console.log(' ', s);
  await p.close();
}
await b.close();
