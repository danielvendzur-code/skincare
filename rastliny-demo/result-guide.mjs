import {tidy, tagsOf, productIdentity, LABELS} from './advisor.mjs?v=aff8db2fe3';

const norm = value => String(value || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
const generic = /konkretny produkt|uplne informacie|najdete v e.shope|z ponuky tohto|informacie z e.shop/;
const text = value => tidy(value).split(/(?<=\.)\s+/).filter(s => !generic.test(norm(s))).join(' ');
const living = new Set(['plants','rareplants','outdoor','fruits','shrubs','cacti','succulents','orchids','airplants','carnivorous','cuttings']);

export function productInfo(product) {
  const facts = [...new Set((product.facts || []).map(text).filter(Boolean))];
  const reason = text(product.reason);
  if (reason && !facts.some(f => reason.includes(f))) facts.push(reason);
  if (!facts.length) facts.push(LABELS[product.kind] || 'Doplnok na pestovanie rastlín.');
  return facts.slice(0, 4);
}

export function difference(product, alternative) {
  const own = tagsOf(alternative), main = tagsOf(product);
  const changed = own.filter(tag => !main.includes(tag) && LABELS[tag] && !/^(genus|species):/.test(tag));
  const facts = productInfo(alternative).filter(f => !productInfo(product).includes(f));
  return changed.length ? changed.map(t => LABELS[t]).slice(0, 2).join(' · ') : facts[0] || (alternative.priceValue < product.priceValue ? 'Nižšia cena pri zachovaní vašich podmienok.' : 'Ďalší produkt spĺňajúci vaše podmienky.');
}

export function followUp(brand, product, ranked, answers = {}) {
  const alternative = ranked.find(p => p.available !== false && productIdentity(p) !== productIdentity(product)) || null;
  // A substrate is a complement only when this exact plant's verified facts
  // explicitly name its use. Do not infer pot fit or substrate compatibility.
  const facts = norm((product.facts || []).join(' '));
  const use = /substrat[^.]*kaktus|kaktus[^.]*substrat/.test(facts) ? 'cactus-mix' : /substrat[^.]*orchide|orchide[^.]*substrat/.test(facts) ? 'orchid-mix' : /substrat[^.]*izbov|substrat[^.]*pokojov/.test(facts) ? 'indoor-mix' : null;
  const amount = p => p.sourcePriceFrom ? p.sourcePriceMax : p.priceValue;
  const budget = Number(answers.budget) > 0 ? Number(answers.budget) : Infinity;
  const complement = living.has(product.kind) && use ? brand.products.filter(p => p.kind === 'substrates' && p.available !== false && !p.priceUnavailable && p.currency === product.currency && tagsOf(p).includes(use) && Number.isFinite(amount(p)) && Number.isFinite(amount(product)) && amount(p) + amount(product) <= budget && (!alternative || amount(p) + amount(alternative) <= budget)).sort((a,b) => amount(a)-amount(b))[0] || null : null;
  const total = complement ? Math.round((amount(product) + amount(complement)) * 100) / 100 : null;
  return {alternative, complement, total, action: living.has(product.kind) ? 'Pred objednaním si pozrite dodávanú veľkosť a zvoľte miesto podľa uvedených nárokov na svetlo.' : product.kind === 'pots' ? 'Zmerajte vnútorný priemer obalu aj pestovateľský črepník; obal má poskytnúť miesto na jeho vloženie.' : product.kind === 'substrates' ? 'Vyberte objem balenia podľa veľkosti črepníka a počtu rastlín, ktoré chcete presadiť.' : 'Skontrolujte rozmery a variant, ktorý sa hodí k vášmu spôsobu pestovania.'};
}
