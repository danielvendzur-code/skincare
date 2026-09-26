// All 256 answer combinations of one demo, as the final result shows them
// (primary + routine steps), for reading through: node tools/matrix.mjs SLUG
import { chromium } from '@playwright/test';
const [slug, base = 'http://127.0.0.1:8790'] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage();
await p.goto(`${base}/cosmetics.html?demo=${slug}`, { waitUntil: 'networkidle' });
const rows = await p.evaluate(() => {
  const d = window.COSMETICS_DEMOS; const brand = d.brands[document.body.dataset.cosmeticsDemo];
  const score = (pr, s) => (pr.tags.includes(s.goal) ? 18 : 0) + (pr.tags.includes(s.skin) ? 15 : 0) + (s.texture !== 'any' && pr.tags.includes(s.texture) ? 7 : 0) + (pr.tags.includes(s.routine) ? 4 : 0);
  const role = (pr) => pr.tags.includes('serum') ? 'serum' : pr.tags.includes('oil') ? 'oil' : pr.tags.includes('cream') ? 'cream' : /mask/i.test(pr.name) ? 'mask' : 'care';
  const v = Object.fromEntries(d.questions.map((q) => [q.key, q.options.map((o) => o.value)]));
  const out = [];
  for (const skin of v.skin) for (const goal of v.goal) for (const routine of v.routine) for (const texture of v.texture) {
    const s = { skin, goal, routine, texture };
    const all = brand.products.map((pr, i) => ({ pr, i, sc: score(pr, s) })).sort((a, b) => b.sc - a.sc || a.i - b.i);
    const prim = all.filter(({ pr }) => pr.tags.includes(skin) || pr.tags.includes(goal));
    const ord = [...prim, ...all.filter((x) => !prim.includes(x))];
    const n = routine === 'basic' ? 3 : routine === 'full' ? 4 : 1;
    const ch = [ord[0].pr]; const used = new Set([role(ord[0].pr)]);
    for (const x of ord.slice(1)) { if (ch.length >= n) break; if (!used.has(role(x.pr))) { ch.push(x.pr); used.add(role(x.pr)); } }
    for (const x of ord.slice(1)) { if (ch.length >= n) break; if (!ch.includes(x.pr)) ch.push(x.pr); }
    out.push(`${skin}/${goal}/${routine}/${texture}: ${ch.map((x) => x.id).join(' + ')}`);
  }
  const wins = {}; out.forEach((r) => { const id = r.split(': ')[1].split(' + ')[0]; wins[id] = (wins[id] || 0) + 1; });
  return [...out, 'first-step wins: ' + JSON.stringify(wins), 'never first: ' + brand.products.filter((p) => !wins[p.id]).map((p) => p.id).join(',')];
});
console.log(rows.join('\n'));
await b.close();
