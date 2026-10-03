// Every brand subdomain must render that brand, and a link naming another
// brand must land on that brand's own subdomain. Simulates Vercel: files
// first, then vercel.json rewrites in order (host conditions included).
// node tools/routing-test.mjs vino-demo (PROBE=dixi for vlasy-nove)
import { chromium } from '@playwright/test';
import fs from 'node:fs'; import path from 'node:path';
const dir = path.resolve(process.argv[2]);
const cfg = JSON.parse(fs.readFileSync(path.join(dir, 'vercel.json'), 'utf8'));
const brands = (() => { const w = {}; const window = w; const location = { pathname: '/', search: '?demo=' + (process.env.PROBE || ''), hostname: '', replace() {} };
  for (const f of ['cosmetics-config.js', 'nove-znacky-config.js']) if (fs.existsSync(path.join(dir, f))) { try { eval(fs.readFileSync(path.join(dir, f), 'utf8')); } catch {} }
  return w.COSMETICS_DEMOS?.brands || w.TEA_DEMOS?.brands || {}; })();
const hostRule = cfg.rewrites.find((r) => r.has?.[0]?.type === 'host');
const hostRe = new RegExp(hostRule.has[0].value);
const slugs = Object.keys(brands).filter((s) => hostRe.test(`${s}.mojchatbot.sk`));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.avif': 'image/avif' };
const file = (p) => { let f = path.join(dir, decodeURIComponent(p)); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); return fs.existsSync(f) && fs.statSync(f).isFile() ? f : null; };
const resolve = (url) => {
  const u = new URL(url);
  let f = file(u.pathname); if (f) return f;
  for (const r of cfg.rewrites) {
    const re = new RegExp('^' + r.source.replace(/:\w+/g, '[^/]+') + '$');
    if (!re.test(u.pathname)) continue;
    if (r.has && !r.has.every((h) => h.type === 'host' && new RegExp(h.value).test(u.hostname))) continue;
    return file(r.destination);
  }
  return null;
};
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await b.newContext();
await ctx.route(/mojchatbot\.sk|vercel\.app/, async (route) => {
  const url = route.request().url();
  if (/\/api\//.test(url)) return route.fulfill({ status: 501, body: '' });
  if (!/\.mojchatbot\.sk|vercel\.app/.test(new URL(url).hostname) || new URL(url).hostname === 'mojchatbot.sk' || new URL(url).hostname === 'www.mojchatbot.sk') return route.fulfill({ status: 200, body: 'external' });
  const f = resolve(url);
  if (!f) return route.fulfill({ status: 404, body: 'not found' });
  route.fulfill({ status: 200, body: fs.readFileSync(f), contentType: types[path.extname(f)] || 'application/octet-stream' });
});
const page = await ctx.newPage();
const fails = [];
const brandOf = () => page.evaluate(() => document.body?.dataset?.cosmeticsDemo || document.body?.dataset?.teaDemo || '');
for (const s of slugs) {
  await page.goto(`https://${s}.mojchatbot.sk/`, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(150);
  const got = await brandOf();
  if (got !== s) fails.push(`${s}.mojchatbot.sk/ renders "${got}"`);
}
// Cross links: list entry and ?demo= of brand B opened on brand A's host.
const [a, c] = slugs;
for (const p of [`/${c}/`, `/cosmetics.html?demo=${c}`]) {
  await page.goto(`https://${a}.mojchatbot.sk${p}`, { waitUntil: 'domcontentloaded' }); await page.waitForURL(new RegExp(`${c}\\.mojchatbot\\.sk`), { timeout: 4000 }).catch(() => {}); await page.waitForTimeout(200);
  const host = new URL(page.url()).hostname; const got = await brandOf();
  if (host !== `${c}.mojchatbot.sk` || got !== c) fails.push(`${a} host + ${p} -> ${host} renders "${got}"`);
}
await page.goto('https://projekt.vercel.app/', { waitUntil: 'domcontentloaded' });
if (!/zoznam|Ukážky|ukážky/i.test(await page.title() + page.url())) fails.push('vercel.app root is not the list');
await b.close();
console.log(`${path.basename(dir)}: ${slugs.length} subdomains checked`);
if (fails.length) { console.log('FAIL\n ' + fails.join('\n ')); process.exit(1); } else console.log('PASS');
