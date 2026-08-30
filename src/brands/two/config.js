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
    image: localAsset('product-1-full.jpg'),
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
    reasonBase: 'Je to hydratačné sérum s gélovou textúrou; oficiálny popis ho uvádza pre všetky typy pleti.'
  },
  {
    id: 'bakuchiol',
    name: 'BAKUCHIOL 1 % ANTI-AGE SERUM',
    shortName: 'Bakuchiol 1 % Serum',
    price: '722 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/bakuchiol-1-anti-age-serum',
    image: localAsset('product-2-full.jpeg'),
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
    reasonBase: 'Má 1 % bakuchiolu, olejovú textúru a oficiálny návod uvádza použitie ráno aj večer.'
  },
  {
    id: 'hydration-cream',
    name: 'Hydratačný krém',
    shortName: 'Hydratačný krém',
    price: '407 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/hydratacny-krem-s-vitaminom-e-a-bisabololom',
    image: localAsset('product-3-full.jpg'),
    fallbackImage: localAsset('product-3.jpeg'),
    eyebrow: 'HYDRATATION / CREAM',
    subtitle: 'vitamín E · bisabolol · 50 ml',
    features: ['vitamín E a bisabolol', 'krémová textúra', 'pre všetky typy pleti'],
    role: 'cream',
    priorities: ['hydration', 'simple'],
    textures: ['cream'],
    routines: [],
    sensitiveVerified: true,
    activeCare: false,
    reasonBase: 'Je to hydratačný krém s krémovou textúrou; oficiálna stránka ho uvádza pre všetky typy pleti.'
  },
  {
    id: 'problem-cream',
    name: 'Krém pre problematickú pleť',
    shortName: 'Krém pre problematickú pleť',
    price: '431 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/krem-pre-problematicku-plet-s-tea-tree-a-kyselinou-hyaluronovou',
    image: localAsset('product-4-full.jpg'),
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
    reasonBase: 'Je to krém určený pre problematickú pleť s tea tree a kyselinou hyalurónovou.'
  },
  {
    id: 'salicylic-cleanser',
    name: 'AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID',
    shortName: 'AM/PM Cleansing Gel',
    price: '552 Kč',
    priceCaptured: '28. 8. 2026',
    url: 'https://www.twocosmetics.cz/p/am-pm-routine-cleansing-gel-salicylic-acid-cistiaci-gel',
    image: localAsset('product-5-full.png'),
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
    reasonBase: 'Je to čistiaci gél s 2 % kyselinou salicylovou a gélovou textúrou; názov ho priamo radí do AM/PM rutiny.'
  }
];

const pickImage = (id) => TWO_PRODUCTS.find((product) => product.id === id)?.image ?? localAsset('product-1-full.jpg');

export const TWO_QUESTIONS = [
  {
    key: 'role',
    label: 'Krok rutiny',
    title: 'Čo chcete zaradiť do rutiny?',
    hint: 'Začnite čistením, sérom alebo krémom. Ak si nie ste istí, nechajte voľbu otvorenú.',
    options: [
      option('cleanse', 'Čistenie', 'Gél ako prvý krok', pickImage('salicylic-cleanser')),
      option('serum', 'Sérum', 'Ľahší alebo olejový sérový krok', pickImage('ha6')),
      option('cream', 'Krém', 'Krémová starostlivosť', pickImage('hydration-cream')),
      option('any', 'Nechám si poradiť', 'Krok nechám otvorený', localAsset('hero-full.jpg'))
    ]
  },
  {
    key: 'priority',
    label: 'Priorita',
    title: 'Čo je pre vás teraz najdôležitejšie?',
    hint: 'Vyberte hydratáciu, jednoduchú rutinu, aktívnu starostlivosť alebo citlivú pleť.',
    options: [
      option('hydration', 'Hydratácia', 'Sérum alebo krém s hydratačným zameraním', pickImage('ha6')),
      option('simple', 'Jednoduchá rutina', 'Jednoduchý, jasný produktový krok', pickImage('hydration-cream')),
      option('active', 'Aktívna starostlivosť', 'Bakuchiol alebo salicylová kyselina podľa kroku', pickImage('bakuchiol')),
      option('sensitive', 'Citlivá pleť', 'Produkty, pri ktorých je toto určenie potvrdené', pickImage('ha6'))
    ]
  },
  {
    key: 'texture',
    label: 'Textúra',
    title: 'Aká textúra vám vyhovuje?',
    hint: 'Vyberte gélovú, krémovú, olejovú alebo nechajte textúru otvorenú.',
    options: [
      option('gel', 'Gélová', 'Ľahší gélový formát', pickImage('ha6')),
      option('cream', 'Krémová', 'Klasický krém', pickImage('hydration-cream')),
      option('oil', 'Olejová', 'Olejové sérum', pickImage('bakuchiol')),
      option('any', 'Bez preferencie', 'Textúru nechám otvorenú', localAsset('hero-full.jpg'))
    ]
  },
  {
    key: 'routine',
    label: 'Čas',
    title: 'Kedy ho chcete používať?',
    hint: 'Vyberte ráno, večer, oboje alebo nechajte čas otvorený.',
    options: [
      option('am', 'Ráno', 'AM rutina', pickImage('ha6')),
      option('pm', 'Večer', 'PM rutina', pickImage('bakuchiol')),
      option('both', 'Ráno aj večer', 'AM/PM', pickImage('salicylic-cleanser')),
      option('any', 'Je mi to jedno', 'Bez časovej preferencie', localAsset('hero-full.jpg'))
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
    score += WEIGHTS.routine;
    matched.push(selected.routine);
  }
  return { eligible: true, score, matched, hardReasons };
}

const MATCH_LABELS = {
  cleanse: 'čistenie', serum: 'sérum', cream: 'krém', hydration: 'hydratácia', simple: 'jednoduchá rutina',
  active: 'aktívna starostlivosť', sensitive: 'určenie pre citlivú pleť', gel: 'gélová textúra',
  oil: 'olejová textúra', am: 'ranné použitie', pm: 'večerné použitie', 'am-pm': 'AM/PM použitie'
};

function explanation(product, matched) {
  const labels = [...new Set(matched)].map((key) => MATCH_LABELS[key]).filter(Boolean);
  const why = labels.length ? `Najlepšie sedí k vašim odpovediam podľa: ${labels.slice(0, 3).join(', ')}.` : 'Pri otvorených odpovediach sme vybrali prvú vhodnú možnosť z dostupného sortimentu.';
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
  return `${first.shortName} je ${first.role === 'serum' ? 'sérum' : first.role === 'cream' ? 'krém' : 'čistiaci krok'} s ${first.textures[0] === 'oil' ? 'olejovou' : first.textures[0] === 'cream' ? 'krémovou' : 'gélovou'} textúrou. ${second.shortName} je ${second.role === 'serum' ? 'sérum' : second.role === 'cream' ? 'krém' : 'čistiaci krok'} s ${second.textures[0] === 'oil' ? 'olejovou' : second.textures[0] === 'cream' ? 'krémovou' : 'gélovou'} textúrou. Vyberte podľa kroku rutiny a textúry, ktorá vám viac vyhovuje.`;
}

export function twoLocalFallback(message, history = []) {
  const q = normalized(message);
  if (/diagn[oó]z|ekz[eé]m|psori|rosace|infek|alergi|lie[cč]i|vylie[cč]|terapi|dermatol|lek[aá]r/.test(q)) {
    return 'S diagnózou ani liečbou vám produktový poradca nepomôže. Môžem porovnať kozmetické produkty a ich popísané vlastnosti; pri zdravotnom probléme je vhodná konzultácia s lekárom alebo dermatológom.';
  }
  const current = namedFacts(message);
  if (current.length >= 2) return compareLocal(current[0], current[1]);
  if (/s[eé]rum.{0,18}kr[eé]m|kr[eé]m.{0,18}s[eé]rum/.test(q)) return compareLocal('ha6', 'hydration-cream');
  if (/hydrat/.test(q)) return 'Ak hľadáte hydratáciu, porovnajte HA⁶ HYDRATATION BOOSTER SERUM a Hydratačný krém. HA⁶ je gélové sérum so 6 formami kyseliny hyalurónovej; krém má krémovú textúru, vitamín E a bisabolol.';
  if (/bakuchiol/.test(q)) return 'BAKUCHIOL 1 % ANTI-AGE SERUM je olejové sérum s 1 % bakuchiolom. Oficiálny návod uvádza použitie ráno aj večer a stránka ho uvádza aj pre citlivú pleť.';
  if (/ha\s*⁶|ha\s*6/.test(q)) return 'HA⁶ HYDRATATION BOOSTER SERUM je gélové hydratačné sérum so 6 formami kyseliny hyalurónovej. Oficiálna stránka ho uvádza pre všetky typy pleti a bez pridanej parfumácie.';
  if (/čist|salicyl|am\/pm/.test(q)) return 'AM/PM ROUTINE CLEANSING GEL je čistiaci gél s 2 % kyselinou salicylovou a gélovou textúrou. Ak chcete, môžem ho porovnať so sérom alebo krémom podľa miesta v rutine.';
  if (/r[aá]no|ve[cč]er|am|pm/.test(q)) return 'Bakuchiol sérum má v návode uvedené použitie ráno aj večer; HA⁶ uvádza rannú aplikáciu a AM/PM čistiaci gél je určený do oboch častí rutiny. Pri ďalších produktoch sa držím informácií z ich produktových stránok.';
  const previous = [...history].reverse().map((entry) => namedFacts(entry.text || entry.content || '')).flat();
  if (current.length === 1 && previous.length && /a [cč]o|oproti|porovn|rozdiel/.test(q)) {
    const other = previous.find((id) => id !== current[0]);
    if (other) return compareLocal(other, current[0]);
  }
  return 'Môžem porovnať HA⁶, Bakuchiol 1 %, Hydratačný krém, Krém pre problematickú pleť a AM/PM čistiaci gél. Alebo prejdite štyri krátke otázky vo Výbere starostlivosti.';
}

export const twoBrand = {
  slug: 'two',
  name: 'TWO COSMETICS',
  logo: localAsset('logo.svg'),
  hero: localAsset('hero-full.jpg'),
  heroFallback: localAsset('hero.jpg'),
  teaserTitle: 'Neviete, čo zaradiť do rutiny?',
  teaser: '4 krátke otázky · konkrétny produkt',
  welcome: 'Dobrý deň. Môžete sa opýtať na hydratáciu, HA⁶, bakuchiol, čistenie alebo rozdiel medzi dvoma produktmi TWO COSMETICS.',
  chips: ['HA⁶ alebo krém?', 'Čo je bakuchiol?', 'Ako funguje AM/PM gél?', 'Porovnať dve séra'],
  questions: TWO_QUESTIONS,
  products: TWO_PRODUCTS,
  recommend: recommendTwo,
  fallback: twoLocalFallback,
  chatEndpoint: '/api/two-chat'
};
