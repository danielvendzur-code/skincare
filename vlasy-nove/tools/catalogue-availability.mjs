#!/usr/bin/env node
// Re-checks every product of the cosmetics catalogues against its live product page and reports, or
// with --write saves, which products the shop sells right now and at what price.
// Usage: node tools/catalogue-availability.mjs [slug,slug...] [--write]   (no slugs = every catalogue)
//
// - Shoptet shops publish every variant's price and stock in the page (necessaryVariantData).
// - Other shops (WooCommerce, PrestaShop, Upgates, custom) are read from the page's schema.org
//   Product offer (JSON-LD or microdata) or its product:price meta tag.
// A product is for sale when its offer is InStock, LimitedAvailability or OnlineOnly, or a pre-order or back-order
// the shop already takes into the cart; OutOfStock, SoldOut and Discontinued, or a sold-out notice next to the title, are not.
// A price change is reported only when the catalogue price is none of the prices the page offers,
// so a product listed in one of several sizes keeps its own size's price.
// A missing page (404/410) marks the product as gone.
// The product's own description from the shop (Store API, structured data or meta description) is saved with --write.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SELLING = /schema\.org\/(InStock|LimitedAvailability|OnlineOnly|InStoreOnly)$/i;
const NOT_SELLING = /schema\.org\/(PreOrder|PreSale|BackOrder|OutOfStock|SoldOut|Discontinued)$/i;
const NOT_SELLING_TEXT = /Vypredan|Vyprodáno|Nie je (?:na )?sklad|Není skladem|Momentálne nedostupn|Momentálně nedostupn|Dočasne nedostupn|Dočasně nedostupn|Out of stock/i;
const ORDERABLE = /data-testid="buttonAddToCart"|class="[^"]*add-to-cart-button[^"]*"(?![^>]*disabled)|data-button-action="add-to-cart"(?![^>]*disabled)|name="add-to-cart"(?![^>]*disabled)/i;
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const args = process.argv.slice(2);
const write = args.includes('--write');
// Pages fetched at once per shop; a shop that turns requests away under load needs fewer (PARALLEL=2).
const PARALLEL = Number(process.env.PARALLEL) || 8;
const only = args.find(a => !a.startsWith('--'));
const slugs = only ? only.split(',') : fs.readdirSync(path.join(ROOT, 'catalogues')).filter(f => f.endsWith('-refresh.js')).map(f => f.replace(/-refresh\.js$/, ''));

const money = (v, cur) => cur === 'CZK' ? (Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ',')).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Kč' : (Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ',')) + ' €';

function load(slug) {
  const file = path.join(ROOT, 'catalogues', slug + '-refresh.js');
  const sandbox = {};
  sandbox.globalThis = sandbox;
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox);
  return {file, catalogue: sandbox.CX_CATALOGUES[slug]};
}

function productNodes(node, out = []) {
  if (Array.isArray(node)) node.forEach(n => productNodes(n, out));
  else if (node && typeof node === 'object') {
    const type = [].concat(node['@type'] || []);
    if (type.includes('Product') || type.includes('ProductGroup')) out.push(node);
    for (const k of ['@graph', 'hasVariant', 'mainEntity']) if (node[k]) productNodes(node[k], out);
  }
  return out;
}
const offersOf = product => [].concat(product.offers || [], ...[].concat(product.hasVariant || []).map(v => [].concat(v.offers || []))).flatMap(o => [].concat(o.offers || o));

/* Shoptet: every variant's price and stock. */
function shoptetVariants(html) {
  const data = html.match(/necessaryVariantData = (\{[\s\S]*?\});\s*\n/);
  if (!data) return null;
  try {
    const list = Object.values(JSON.parse(data[1])).map(v => ({price: Math.round(v.priceUnformatted * 100) / 100, available: !!v.isNotSoldOut}));
    return list.length ? list : null;
  } catch { return null; }
}

const pause = ms => new Promise(r => setTimeout(r, ms));
async function get(url) {
  // A shop that limits requests (HTTP 429) or is briefly overloaded (503) is asked again after a pause.
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, {headers: {'user-agent': UA, 'accept-language': 'sk-SK,sk;q=0.9,cs;q=0.8'}, redirect: 'follow', signal: AbortSignal.timeout(30000)});
    if (res.status !== 429 && res.status !== 503) return res;
    await pause(4000 * (i + 1));
  }
  return fetch(url, {headers: {'user-agent': UA}, redirect: 'follow', signal: AbortSignal.timeout(30000)});
}
const pathOf = u => { try { return new URL(u).pathname.replace(/\/+$/, ''); } catch { return u; } };

/* WooCommerce: the public Store API has every product's price, stock and description by its slug. */
const wooHosts = new Map();
async function isWoo(origin) {
  if (!wooHosts.has(origin)) wooHosts.set(origin, get(`${origin}/wp-json/wc/store/v1/products?per_page=1`).then(async r => r.ok && Array.isArray(await r.json().catch(() => null))).catch(() => false));
  return wooHosts.get(origin);
}
async function wooProduct(p) {
  let u;
  try { u = new URL(p.url); } catch { return null; }
  if (!await isWoo(u.origin)) return null;
  const slug = u.pathname.split('/').filter(Boolean).pop();
  if (!slug) return null;
  try {
    const res = await get(`${u.origin}/wp-json/wc/store/v1/products?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    // A slug the Store API does not know, or one that names a single variation, is read from the page instead.
    const w = (await res.json()).find?.(x => x.type !== 'variation');
    if (!w) return null;
    const unit = 10 ** (w.prices?.currency_minor_unit ?? 2);
    const price = Number(w.prices?.price) / unit, low = Number(w.prices?.price_range?.min_amount) / unit, high = Number(w.prices?.price_range?.max_amount) / unit;
    const prices = [price, low, high].filter(v => Number.isFinite(v) && v > 0);
    const backorder = /backorder/.test(w.stock_availability?.class || '');
    return {available: !!w.is_purchasable && !!w.is_in_stock, preorder: backorder, prices, trusted: true, currency: w.prices?.currency_code, description: clean(w.short_description || w.description), why: 'store api ' + (backorder ? 'backorder' : w.is_in_stock ? 'in stock' : 'out of stock') + ' ' + prices.join('/')};
  } catch { return null; }
}

/* Plain text of an HTML fragment. */
const ENT = {amp: '&', nbsp: ' ', quot: '"', apos: "'", lt: '<', gt: '>', hellip: '…', ndash: '–', mdash: '—'};
// Meta descriptions sometimes go on into a customer review after a star; only the shop's own words are kept.
function clean(html) {
  const t = String(html || '').replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ').replace(/<br\s*\/?>|<\/p>|<\/li>/gi, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m)
    .replace(/\s+/g, ' ').replace(/\s*⭐[\s\S]*$/, '').trim();
  return t.length > 700 ? t.slice(0, 700).replace(/\s+\S*$/, '') + '…' : t;
}
/* "1,248.00", "1 248,00" and "19.90" are all prices. */
function amount(v) {
  let t = String(v).replace(/[\s\u00a0]/g, '');
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(t)) t = t.replace(/,/g, '');
  else if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(t)) t = t.replace(/\./g, '').replace(',', '.');
  else t = t.replace(',', '.');
  return Number(t);
}
/* A price the page shows to the customer, in any usual notation. */
function shown(text, v) {
  const whole = Math.floor(v), cents = Math.round((v - whole) * 100);
  const w = String(whole), ws = w.replace(/\B(?=(\d{3})+(?!\d))/g, '[\\s\u00a0.]?');
  const forms = cents ? [`${ws}[,.]${String(cents).padStart(2, '0')}`, ...(cents % 10 === 0 ? [`${ws}[,.]${cents / 10}(?!\\d)`] : [])] : [`${ws}(?:[,.](?:00|-|–))?(?![\\d,.]\\d)`];
  return forms.some(f => new RegExp(`(?<![\\d.,])${f}`).test(text));
}

async function check(p) {
  const woo = await wooProduct(p);
  if (woo) return woo;
  let res;
  try { res = await get(p.url); }
  catch (e) { return {available: null, why: 'fetch failed: ' + e.message}; }
  if (res.status === 404 || res.status === 410) return {available: false, gone: true, why: 'HTTP ' + res.status};
  if (!res.ok) return {available: null, why: 'HTTP ' + res.status};
  // A product page that now sends the visitor to a category or the home page no longer sells the product.
  if (res.redirected && pathOf(res.url) !== pathOf(p.url) && !pathOf(res.url).endsWith(pathOf(p.url).split('/').pop())) return {available: false, gone: true, why: 'redirected to ' + res.url};
  const html = await res.text();
  const variants = shoptetVariants(html);
  if (variants) {
    const live = variants.filter(v => v.available && v.price > 0);
    const meta = html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1];
    return {available: live.length > 0, prices: variants.map(v => v.price).filter(v => v > 0), livePrices: live.map(v => v.price), trusted: true, description: clean(meta), why: 'shoptet ' + variants.map(v => v.price + (v.available ? '' : '(nie)')).join(', ')};
  }
  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map(m => { try { return JSON.parse(m[1].trim()); } catch { return null; } }).filter(Boolean);
  const own = productNodes(blocks)[0];
  let states = own ? offersOf(own).map(o => String(o.availability || '')).filter(Boolean) : [];
  let prices = own ? offersOf(own).flatMap(o => [o.price, o.lowPrice, o.highPrice, o.priceSpecification?.price]).filter(v => v != null).map(amount).filter(v => Number.isFinite(v) && v > 0) : [];
  if (!states.length) {
    const starts = [...html.matchAll(/itemtype="https?:\/\/schema\.org\/Product"/gi)].map(m => m.index);
    const offer = html.search(/itemtype="https?:\/\/schema\.org\/Offer"/i);
    const part = starts.length ? html.slice(starts[0], starts[1] ?? html.length) : offer >= 0 ? html.slice(offer, offer + 4000) : '';
    states = [...part.matchAll(/itemprop="availability"[^>]*?(?:href|content)="([^"]+)"/gi)].map(m => m[1]);
    if (!prices.length) prices = [...part.matchAll(/itemprop="price"[^>]*?content="([^"]+)"/gi)].map(m => amount(m[1])).filter(v => Number.isFinite(v) && v > 0);
  }
  const currency = own ? offersOf(own).map(o => o.priceCurrency || o.priceSpecification?.priceCurrency).find(Boolean) : undefined;
  if (!prices.length) { const meta = html.match(/property="product:price:amount"\s+content="([\d.,\s]+)"/i); if (meta) prices = [amount(meta[1])]; }
  const h1 = html.search(/<h1[\s>]/i);
  const near = h1 >= 0 ? clean(html.slice(h1, h1 + 15000)).replace(/…$/, '') + ' ' + html.slice(h1, h1 + 15000).replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ') : '';
  const meta = name => html.match(new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`, 'i'))?.[1] || html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:name|property)="${name}"`, 'i'))?.[1];
  const description = clean(own?.description || meta('og:description') || meta('description'));
  // Structured-data prices may leave out VAT; only a price the page also shows counts.
  const visible = near.replace(/&nbsp;|\u00a0/g, ' ');
  const base = {prices, currency, description, visible};
  if (states.some(s => SELLING.test(s))) return {...base, available: true, why: states.join(' ')};
  // A pre-order or back-order the shop takes into the cart now ("Predobjednávka – odosielam od 20. 10.", PrestaShop's
  // orders when out of stock) is for sale; one without an active cart button is not.
  if (states.length && states.every(s => /PreOrder|PreSale|BackOrder/i.test(s)) && ORDERABLE.test(html)) return {...base, available: true, preorder: true, why: states.join(' ') + ' (orderable)'};
  if (states.length && states.every(s => NOT_SELLING.test(s))) return {...base, available: false, why: states.join(' ')};
  if (NOT_SELLING_TEXT.test(near)) return {...base, available: false, why: 'text: ' + near.match(NOT_SELLING_TEXT)[0]};
  return {...base, available: states.length ? null : prices.length ? true : null, why: states.length ? 'unknown offer: ' + states.join(' ') : prices.length ? 'price, no stock data' : 'no offer data'};
}

const near = (a, b) => Math.abs(a - b) < 0.006;
let total = 0;
for (const slug of slugs) {
  const {file, catalogue} = load(slug);
  if (!catalogue) { console.log(`?  ${slug}: no catalogue`); continue; }
  const list = catalogue.products.filter(p => p.url);
  const stock = [], price = [], unknown = [], texts = new Map();
  for (let i = 0; i < list.length; i += PARALLEL) {
    await Promise.all(list.slice(i, i + PARALLEL).map(async p => {
      const r = await check(p);
      if (r.description && r.description.length >= 25) texts.set(p, r.description);
      if (r.available === null) { unknown.push({p, r}); return; }
      if (r.available !== (p.available !== false) || !!r.gone !== !!p.gone) stock.push({p, r});
      // The catalogue price must be one of the prices the page offers; the page's lowest price on sale replaces it otherwise.
      // A page priced in another currency than the catalogue (e.g. Kč instead of €) replaces both.
      // Prices from structured data alone count only where the page shows them too (some leave out VAT).
      const currency = p.currency || catalogue.currency || 'EUR';
      const other = r.currency && r.currency !== currency ? r.currency : null;
      const confirmed = v => r.trusted || shown(r.visible || '', v);
      const listed = (r.prices || []).some(v => near(v, p.priceAmount)) || (!r.trusted && Number.isFinite(p.priceAmount) && shown(r.visible || '', p.priceAmount) && !other);
      const offered = (r.livePrices?.length ? r.livePrices : r.prices || []).filter(confirmed);
      if (offered.length && (other || r.available && !listed)) price.push({p, now: Math.min(...offered), currency: other || currency});
    }));
  }
  // A text the shop repeats on many pages is its general blurb, not the product's description.
  const seen = new Map();
  for (const t of texts.values()) seen.set(t, (seen.get(t) || 0) + 1);
  const described = [...texts].filter(([p, t]) => seen.get(t) <= 2 && t !== p.description && !/^(?:\s*)$/.test(t));
  for (const {p, r} of stock) console.log(`${r.available ? '+ ' : '- '} ${slug} ${p.name} — ${r.why}`);
  for (const {p, now, currency} of price) console.log(`€  ${slug} ${p.name} — ${p.price} → ${money(now, currency)}`);
  for (const {p, r} of unknown.slice(0, 5)) console.log(`?  ${slug} ${p.name} — ${r.why}`);
  console.log(`${slug}: ${list.length} checked, ${stock.length} stock, ${price.length} price change(s), ${unknown.length} unknown, ${described.length} description(s)`);
  total += stock.length + price.length;
  if (write && (stock.length || price.length || described.length)) {
    const now = new Date().toISOString();
    for (const {p, r} of stock) { p.available = r.available; if (r.gone) p.gone = true; else delete p.gone; if (p.source && typeof p.source === 'object') { p.source.stock = r.preorder ? 'PreOrder' : r.available ? 'InStock' : 'OutOfStock'; p.source.verifiedAt = now; } }
    catalogue.verifiedAt = now;
    for (const {p, now: v, currency} of price) { p.priceAmount = v; p.currency = currency; p.price = (/^od\s/i.test(p.price || '') ? 'od ' : '') + money(v, currency); if (p.source && typeof p.source === 'object') p.source.verifiedAt = now; }
    for (const [p, t] of described) p.description = t;
    const text = fs.readFileSync(file, 'utf8');
    const head = text.slice(0, text.indexOf('globalThis.CX_CATALOGUES[')).replace(/snapshot, .*?\.\s*\*\//, `snapshot, ${now}. */`);
    fs.writeFileSync(file, `${head}globalThis.CX_CATALOGUES[${JSON.stringify(slug)}] = ${JSON.stringify(catalogue)};\n`);
  }
}
console.log('changes', total);
