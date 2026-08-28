const localAsset = (name) => `/assets/brands/two/${name}`;

const option = (value, label, description, image) => ({ value, label, description, image });

export const TWO_PRODUCTS = [
  {
    id: 'ha6',
    name: 'HA⁶ HYDRATATION BOOSTER SERUM',
    shortName: 'HA⁶ Booster Serum',
    price: '722 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/ha6-hydratation-booster-serum',
    image: 'https://www.lakrem.sk/assets/images/produkty/full/48289-two-ha6-serum.jpg',
    fallbackImage: localAsset('product-1.jpeg'),
    eyebrow: 'HYDRATATION / SERUM',
    subtitle: '6 foriem kyseliny hyalurónovej · 50 ml',
    features: ['6 foriem kyseliny hyalurónovej', 'gélová textúra', 'bez pridanej parfumácie'],
    role: 'serum',
    priorities: ['hydration', 'simple'],
    textures: ['gel'],
    routines: ['am', 'pm'],
    sensitiveVerified: true,
    activeCare: false,
    reasonBase: 'Oficiálny popis ho uvádza ako hydratačné sérum s gélovou textúrou pre všetky typy pleti.'
  },
  {
    id: 'bakuchiol',
    name: 'BAKUCHIOL 1 % ANTI-AGE SERUM',
    shortName: 'Bakuchiol 1 % Serum',
    price: '722 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/bakuchiol-1-anti-age-serum',
    image: 'https://twocosmetics.s14.cdn-upgates.com/_cache/d/7/d7d1eab7fcc81a85650af9a547aefe12-hydratation-1a-1.jpeg',
    fallbackImage: localAsset('product-2.jpeg'),
    eyebrow: 'ACTIVE / SERUM',
    subtitle: '1 % bakuchiol · olejová textúra · 50 ml',
    features: ['bakuchiol 1 %', 'olejová textúra', 'ráno aj večer podľa návodu'],
    role: 'serum',
    priorities: ['active'],
    textures: ['oil'],
    routines: ['am', 'pm'],
    sensitiveVerified: true,
    activeCare: true,
    reasonBase: 'Oficiálny popis potvrdzuje 1 % bakuchiol, olejovú textúru a použitie ráno aj večer; uvádza ho aj pre citlivú pleť.'
  },
  {
    id: 'hydration-cream',
    name: 'Hydratačný krém',
    shortName: 'Hydratačný krém',
    price: '407 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/hydratacny-krem-s-vitaminom-e-a-bisabololom',
    image: 'https://i.makeup.sk/2/2u/2uqfqvm5bfcq.jpg',
    fallbackImage: localAsset('product-3.jpeg'),
    eyebrow: 'HYDRATATION / CREAM',
    subtitle: 'vitamín E · bisabolol · 50 ml',
    features: ['vitamín E a bisabolol', 'krémová textúra', 'oficiálne pre všetky typy pleti'],
    role: 'cream',
    priorities: ['hydration', 'simple'],
    textures: ['cream'],
    routines: [],
    sensitiveVerified: true,
    activeCare: false,
    reasonBase: 'Je to priamo hydratačný krém; oficiálna stránka potvrdzuje krémovú textúru a určenie pre všetky typy pleti.'
  },
  {
    id: 'problem-cream',
    name: 'Krém pre problematickú pleť',
    shortName: 'Krém pre problematickú pleť',
    price: '431 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/krem-pre-problematicku-plet-s-tea-tree-a-kyselinou-hyaluronovou',
    image: 'https://cdn.notinoimg.com/social/two_cosmetics/8588007693200_01-o/problem-skin___230224.jpg',
    fallbackImage: localAsset('product-4.jpeg'),
    eyebrow: 'TARGETED / CREAM',
    subtitle: 'tea tree · kyselina hyalurónová · 50 ml',
    features: ['tea tree', 'kyselina hyalurónová', 'krémová textúra'],
    role: 'cream',
    priorities: ['active'],
    textures: ['cream'],
    routines: [],
    sensitiveVerified: false,
    activeCare: true,
    reasonBase: 'Názov a oficiálny katalóg ho radia k problematickej pleti; potvrdená je krémová textúra a tea tree.'
  },
  {
    id: 'salicylic-cleanser',
    name: 'AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID',
    shortName: 'AM/PM Cleansing Gel',
    price: '552 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/am-pm-routine-cleansing-gel-salicylic-acid-cistiaci-gel',
    image: 'https://www.hebe.pl/on/demandware.static/-/Sites-PL_Master_Catalog/default/dwb2e61ee6/images/hi-res/76247150_zel_oczyszczajacy_do_twarzy_z_kwasem_salicylowym_2__200_ml_1_1270827_MP_p.png',
    fallbackImage: localAsset('product-5.jpeg'),
    eyebrow: 'AM/PM / CLEANSE',
    subtitle: '2 % kyselina salicylová · 200 ml',
    features: ['čistiaci gél', '2 % kyselina salicylová', 'gélová textúra'],
    role: 'cleanse',
    priorities: ['simple', 'active'],
    textures: ['gel'],
    routines: ['am', 'pm'],
    sensitiveVerified: false,
    activeCare: true,
    reasonBase: 'Je to čistiaci gél s potvrdenou 2 % kyselinou salicylovou a gélovou textúrou; názov ho priamo radí do AM/PM rutiny.'
  }
];

const pickImage = (id) => TWO_PRODUCTS.find((product) => product.id === id)?.fallbackImage ?? localAsset('product-1.jpeg');

export const TWO_QUESTIONS = [
  {
    key: 'role',
    label: 'Krok rutiny',
    title: 'Čo chcete zaradiť do rutiny?',
    hint: 'Najprv zúžime produktovú rolu. Ak neviete, nechajte výber otvorený.',
    options: [
      option('cleanse', 'Čistenie', 'Gél ako prvý krok', pickImage('salicylic-cleanser')),
      option('serum', 'Sérum', 'Koncentrovanejší krok', pickImage('ha6')),
      option('cream', 'Krém', 'Krémová záverečná vrstva', pickImage('hydration-cream')),
      option('any', 'Nechám si poradiť', 'Rolu nechám otvorenú', localAsset('hero.jpg'))
    ]
  },
  {
    key: 'priority',
    label: 'Priorita',
    title: 'Čo je pre vás teraz najdôležitejšie?',
    hint: 'Poradca používa iba vlastnosti potvrdené v produktových zdrojoch.',
    options: [
      option('hydration', 'Hydratácia', 'Sérum alebo krém s hydratačným zameraním', pickImage('ha6')),
      option('simple', 'Jednoduchá rutina', 'Čo najjasnejšia produktová rola', pickImage('hydration-cream')),
      option('active', 'Aktívna starostlivosť', 'Bakuchiol alebo salicylová kyselina podľa kroku', pickImage('bakuchiol')),
      option('sensitive', 'Potvrdené pre citlivú pleť', 'Len tam, kde to zdroj výslovne uvádza', pickImage('ha6'))
    ]
  },
  {
    key: 'texture',
    label: 'Textúra',
    title: 'Aká textúra vám vyhovuje?',
    hint: 'Textúra je samostatný signál; nenahrádza typ produktu.',
    options: [
      option('gel', 'Gélová', 'Ľahší gélový formát', pickImage('ha6')),
      option('cream', 'Krémová', 'Klasický krém', pickImage('hydration-cream')),
      option('oil', 'Olejová', 'Olejové sérum', pickImage('bakuchiol')),
      option('any', 'Bez preferencie', 'Textúru nechám otvorenú', localAsset('hero.jpg'))
    ]
  },
  {
    key: 'routine',
    label: 'Čas',
    title: 'Kedy ho chcete používať?',
    hint: 'Ak produkt nemá čas použitia v zdroji potvrdený, poradca si ho nevymyslí.',
    options: [
      option('am', 'Ráno', 'AM rutina', pickImage('ha6')),
      option('pm', 'Večer', 'PM rutina', pickImage('bakuchiol')),
      option('both', 'Ráno aj večer', 'AM/PM', pickImage('salicylic-cleanser')),
      option('any', 'Je mi to jedno', 'Bez časovej preferencie', localAsset('hero.jpg'))
    ]
  }
];

const WEIGHTS = Object.freeze({ role: 30, hydration: 18, simple: 10, active: 18, sensitive: 22, texture: 12, routine: 8 });

const answerMap = (answers) => Object.fromEntries(TWO_QUESTIONS.map((question, index) => [question.key, answers[index]]));

export function scoreTwoProduct(product, answers) {
  const selected = Array.isArray(answers) ? answerMap(answers) : answers;
  const hardReasons = [];
  if (selected.role && selected.role !== 'any' && product.role !== selected.role) hardReasons.push('role');
  if (selected.priority === 'sensitive' && !product.sensitiveVerified) hardReasons.push('sensitivity-unverified');
  if (hardReasons.length) return { eligible: false, score: Number.NEGATIVE_INFINITY, matched: [], hardReasons };

  let score = 0;
  const matched = [];
  if (selected.role && selected.role !== 'any' && product.role === selected.role) { score += WEIGHTS.role; matched.push(selected.role); }
  if (selected.priority === 'hydration' && product.priorities.includes('hydration')) { score += WEIGHTS.hydration; matched.push('hydration'); }
  if (selected.priority === 'simple' && product.priorities.includes('simple')) { score += WEIGHTS.simple; matched.push('simple'); }
  if (selected.priority === 'active' && product.activeCare) { score += WEIGHTS.active; matched.push('active'); }
  if (selected.priority === 'sensitive' && product.sensitiveVerified) { score += WEIGHTS.sensitive; matched.push('sensitive'); }
  if (selected.texture && selected.texture !== 'any' && product.textures.includes(selected.texture)) { score += WEIGHTS.texture; matched.push(selected.texture); }
  if (selected.routine === 'both') {
    if (product.routines.includes('am') && product.routines.includes('pm')) { score += WEIGHTS.routine + 2; matched.push('am-pm'); }
  } else if (selected.routine && selected.routine !== 'any' && product.routines.includes(selected.routine)) {
    score += WEIGHTS.routine; matched.push(selected.routine);
  }
  return { eligible: true, score, matched, hardReasons };
}

const MATCH_LABELS = {
  cleanse: 'čistenie', serum: 'sérum', cream: 'krém', hydration: 'hydratáciu', simple: 'jednoduchú rutinu',
  active: 'aktívnu starostlivosť', sensitive: 'výslovne potvrdenú vhodnosť pre citlivú pleť', gel: 'gélovú textúru',
  oil: 'olejovú textúru', am: 'ranné použitie', pm: 'večerné použitie', 'am-pm': 'AM/PM použitie'
};

function explanation(product, matched) {
  const labels = [...new Set(matched)].map((key) => MATCH_LABELS[key]).filter(Boolean);
  const why = labels.length ? `Z vašich odpovedí sa zhoduje ${labels.slice(0, 3).join(', ')}.` : 'Pri otvorených preferenciách rozhodlo stabilné poradie kompatibilných produktov.';
  return `${why} ${product.reasonBase}`;
}

export function rankTwoProducts(answers) {
  return TWO_PRODUCTS.map((product, index) => ({ product, index, ...scoreTwoProduct(product, answers) }))
    .filter((entry) => entry.eligible)
    .sort((a, b) => b.score - a.score || a.index - b.index);
}

export function recommendTwo(answers) {
  const ranked = rankTwoProducts(answers);
  const winner = ranked[0] ?? { product: TWO_PRODUCTS[0], matched: [], score: 0 };
  const selected = Array.isArray(answers) ? answerMap(answers) : answers;
  let alternativeEntry = ranked.find((entry) => entry.product.id !== winner.product.id);
  if (selected.role === 'any' || !selected.role) {
    alternativeEntry = ranked.find((entry) => entry.product.id !== winner.product.id && entry.product.role !== winner.product.role) ?? alternativeEntry;
  }
  const alternative = alternativeEntry?.product ?? TWO_PRODUCTS.find((product) => product.id !== winner.product.id) ?? null;
  return {
    product: winner.product,
    alternative,
    score: winner.score,
    reason: explanation(winner.product, winner.matched),
    matched: winner.matched
  };
}

const normalized = (value) => String(value || '').toLocaleLowerCase('sk');

function namedFacts(text) {
  const q = normalized(text);
  const ids = [];
  if (/ha\s*⁶|ha\s*6|hydratation booster/.test(q)) ids.push('ha6');
  if (/bakuchiol/.test(q)) ids.push('bakuchiol');
  if (/salicyl|cleansing gel|čistiaci g[eé]l/.test(q)) ids.push('salicylic-cleanser');
  if (/problematick.{0,12}kr[eé]m|kr[eé]m.{0,12}problemat/.test(q)) ids.push('problem-cream');
  if (/hydrata[cč]n.{0,8}kr[eé]m/.test(q)) ids.push('hydration-cream');
  return [...new Set(ids)];
}

function compareLocal(a, b) {
  const first = TWO_PRODUCTS.find((product) => product.id === a);
  const second = TWO_PRODUCTS.find((product) => product.id === b);
  if (!first || !second) return null;
  return `${first.shortName} je ${first.role === 'serum' ? 'sérum' : first.role === 'cream' ? 'krém' : 'čistiaci krok'} s ${first.textures[0] === 'oil' ? 'olejovou' : first.textures[0] === 'cream' ? 'krémovou' : 'gélovou'} textúrou. ${second.shortName} je ${second.role === 'serum' ? 'sérum' : second.role === 'cream' ? 'krém' : 'čistiaci krok'} s ${second.textures[0] === 'oil' ? 'olejovou' : second.textures[0] === 'cream' ? 'krémovou' : 'gélovou'} textúrou. Vyberajte podľa kroku rutiny a textúry, nie podľa medicínskeho prísľubu.`;
}

export function twoLocalFallback(message, history = []) {
  const q = normalized(message);
  if (/diagn[oó]z|ekz[eé]m|psori|rosace|infek|alergi|lie[cč]i|vylie[cč]|terapi|dermatol|lek[aá]r/.test(q)) {
    return 'S diagnózou ani liečbou vám produktový poradca nepomôže. Viem porovnať iba kozmetické produkty a ich overené vlastnosti; pri zdravotnom probléme je vhodná konzultácia s lekárom alebo dermatológom.';
  }
  const current = namedFacts(message);
  if (current.length >= 2) return compareLocal(current[0], current[1]);
  if (/s[eé]rum.{0,18}kr[eé]m|kr[eé]m.{0,18}s[eé]rum/.test(q)) return compareLocal('ha6', 'hydration-cream');
  if (/hydrat/.test(q)) return 'Pri hydratácii sú najpriamejšie HA⁶ HYDRATATION BOOSTER SERUM a Hydratačný krém. HA⁶ je gélové sérum so 6 formami kyseliny hyalurónovej; krém má krémovú textúru a v zložení vitamín E a bisabolol.';
  if (/bakuchiol/.test(q)) return 'BAKUCHIOL 1 % ANTI-AGE SERUM je olejové sérum s 1 % bakuchiolom. Oficiálny návod uvádza použitie ráno aj večer a stránka ho výslovne uvádza aj pre citlivú pleť.';
  if (/ha\s*⁶|ha\s*6/.test(q)) return 'HA⁶ HYDRATATION BOOSTER SERUM je gélové hydratačné sérum so 6 formami kyseliny hyalurónovej. Oficiálna stránka ho uvádza pre všetky typy pleti a bez pridanej parfumácie.';
  if (/čist|salicyl|am\/pm/.test(q)) return 'AM/PM ROUTINE CLEANSING GEL je čistiaci gél s 2 % kyselinou salicylovou a gélovou textúrou. Poradca ho drží v kategórii čistenia; zdravotné tvrdenia ani liečbu z neho nevyvodzuje.';
  if (/r[aá]no|ve[cč]er|am|pm/.test(q)) return 'Z baseline produktov má Bakuchiol sérum v návode výslovne uvedené ráno aj večer; HA⁶ uvádza rannú aplikáciu a názov AM/PM čistiaceho gélu priamo deklaruje oba časy. Pri ostatných produktoch si čas použitia bez zdroja nevymýšľam.';
  const previous = [...history].reverse().map((entry) => namedFacts(entry.text || entry.content || '')).flat();
  if (current.length === 1 && previous.length && /a [cč]o|oproti|porovn|rozdiel/.test(q)) {
    const other = previous.find((id) => id !== current[0]);
    if (other) return compareLocal(other, current[0]);
  }
  return 'Môžem porovnať HA⁶, Bakuchiol 1 %, Hydratačný krém, Krém pre problematickú pleť a AM/PM čistiaci gél. Alebo prejdite štyri kroky Výberu starostlivosti.';
}

export const twoBrand = {
  slug: 'two',
  name: 'TWO COSMETICS',
  logo: localAsset('logo.svg'),
  hero: 'https://twocosmetics.s14.cdn-upgates.com/_cache/b/7/b7cea98fa30ed04b774961bcd9b7c9dd-podla-typu-pleti-final.jpg',
  heroFallback: localAsset('hero.jpg'),
  teaserTitle: 'Neviete, čo zaradiť do rutiny?',
  teaser: '4 krátke kroky · konkrétny produkt',
  welcome: 'Dobrý deň. Pýtajte sa na hydratáciu, HA⁶, bakuchiol, čistenie alebo rozdiel medzi dvoma produktmi TWO COSMETICS.',
  chips: ['HA⁶ alebo krém?', 'Čo je bakuchiol?', 'Ako funguje AM/PM gél?', 'Porovnať dve séra'],
  questions: TWO_QUESTIONS,
  products: TWO_PRODUCTS,
  recommend: recommendTwo,
  fallback: twoLocalFallback,
  chatEndpoint: '/api/two-chat'
};
