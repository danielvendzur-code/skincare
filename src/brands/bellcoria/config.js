const local = (name) => `/assets/brands/bellcoria/${name}`;

const option = (label, value, image, description) => ({ label, value, image: local(image), description });

export const bellcoriaProducts = [
  {
    id: 'opuntia',
    rank: 0,
    name: 'Organický opunciový olej',
    price: '30,90 €',
    url: 'https://bellcoria.sk/produkty/organicky-opunciovy-olej/',
    image: local('product-1.jpg'),
    area: ['face'],
    role: 'oil',
    texture: ['oil'],
    routine: ['daily', 'evening'],
    features: ['pleťový olej', '100 % organický', '30 ml']
  },
  {
    id: 'bakuchiol',
    rank: 1,
    name: 'Elixír proti vráskam s bakuchiolom',
    price: '27,90 €',
    url: 'https://bellcoria.sk/produkty/elixir-proti-vraskam-s-bakuchiolom/',
    image: local('product-2.jpg'),
    area: ['face'],
    role: 'elixir',
    texture: ['oil'],
    routine: ['daily'],
    features: ['pleťový elixír', 'bakuchiol', 'olejová starostlivosť']
  },
  {
    id: 'cleanser',
    rank: 2,
    name: 'Pleťový čistiaci gél',
    price: '9,90 €',
    url: 'https://bellcoria.sk/produkty/pletovy-cistiaci-gel/',
    image: local('product-3.jpg'),
    area: ['face'],
    role: 'cleanse',
    texture: ['gel', 'light'],
    routine: ['cleansing', 'daily'],
    features: ['čistiaci gél', 'každodenné čistenie', 'ľahká textúra']
  },
  {
    id: 'night-elixir',
    rank: 3,
    name: 'Nočný elixír s vitamínom C a brusnicovým olejom',
    price: '27,90 €',
    url: 'https://bellcoria.sk/produkty/nocny-elixir-proti-vraskam-so-stabilizovanym-vitaminom-c-a-brusnicovym-olejom/',
    image: local('product-4.jpg'),
    area: ['face'],
    role: 'elixir',
    texture: ['oil'],
    routine: ['evening'],
    features: ['nočný elixír', 'vitamín C', 'brusnicový olej']
  },
  {
    id: 'body-astaxanthin',
    rank: 4,
    name: 'Telový olej s astaxantínom',
    price: '10,90 €',
    url: 'https://bellcoria.sk/produkty/telovy-olej-na-podporu-opalenia-s-astaxantinom/',
    image: local('product-5.jpg'),
    area: ['body'],
    role: 'body-oil',
    texture: ['oil'],
    routine: ['body', 'daily'],
    features: ['telový olej', 'astaxantín', 'olejová textúra']
  }
];

export const bellcoriaQuestions = [
  {
    key: 'area',
    title: 'Kam starostlivosť vyberáte?',
    hint: 'Najprv vyberte, či hľadáte produkt na tvár alebo telo.',
    options: [
      option('Tvár', 'face', 'product-1.jpg', 'Pleťová starostlivosť'),
      option('Telo', 'body', 'product-5.jpg', 'Telová starostlivosť'),
      option('Tvár + krk', 'face-neck', 'product-4.jpg', 'Pleťový rituál'),
      option('Ešte neviem', 'any', 'hero.jpg', 'Nechajte výber otvorený')
    ]
  },
  {
    key: 'role',
    title: 'Aký krok hľadáte?',
    hint: 'Vyberte čistenie, pleťový olej, elixír alebo telový olej.',
    options: [
      option('Čistenie', 'cleanse', 'product-3.jpg', 'Prvý krok rutiny'),
      option('Pleťový olej', 'oil', 'product-1.jpg', 'Olejová pleťová starostlivosť'),
      option('Elixír', 'elixir', 'product-2.jpg', 'Pleťový krok po čistení'),
      option('Telový olej', 'body-oil', 'product-5.jpg', 'Olej na telo')
    ]
  },
  {
    key: 'texture',
    title: 'Aká textúra vám vyhovuje?',
    hint: 'Zvoľte ľahší gélový pocit, olej alebo nechajte textúru otvorenú.',
    options: [
      option('Gél', 'gel', 'product-3.jpg', 'Ľahký čistiaci formát'),
      option('Olej', 'oil', 'product-1.jpg', 'Olejová textúra'),
      option('Čo najľahšia', 'light', 'product-3.jpg', 'Minimum olejového pocitu'),
      option('Bez preferencie', 'any', 'hero.jpg', 'Rozhodne ďalšia odpoveď')
    ]
  },
  {
    key: 'routine',
    title: 'Kedy ho chcete zaradiť?',
    hint: 'Vyberte čistenie, bežné denné použitie, večer alebo starostlivosť o telo.',
    options: [
      option('Pri čistení', 'cleansing', 'product-3.jpg', 'Prvý krok'),
      option('Denne', 'daily', 'product-2.jpg', 'Pravidelná rutina'),
      option('Večer', 'evening', 'product-4.jpg', 'Večerný rituál'),
      option('Na telo', 'body', 'product-5.jpg', 'Telová rutina')
    ]
  }
];

const labels = {
  area: { face: 'tvár', 'face-neck': 'tvár a krk', body: 'telo', any: 'oblasť bez preferencie' },
  role: { cleanse: 'čistenie', oil: 'pleťový olej', elixir: 'elixír', 'body-oil': 'telový olej' },
  texture: { gel: 'gélová textúra', oil: 'olejová textúra', light: 'ľahká textúra', any: 'textúra bez preferencie' },
  routine: { cleansing: 'čistiaca rutina', daily: 'denná rutina', evening: 'večerná rutina', body: 'telová rutina' }
};

const hardArea = (value) => {
  if (value === 'body') return 'body';
  if (value === 'face' || value === 'face-neck') return 'face';
  return null;
};

const normalizeAnswers = (answers) => {
  if (Array.isArray(answers)) {
    return Object.fromEntries(bellcoriaQuestions.map((question, index) => [question.key, answers[index]]));
  }
  return answers && typeof answers === 'object' ? answers : {};
};

const scoreProduct = (product, answers) => {
  const weights = { role: 9, texture: 5, routine: 7 };
  let score = 0;
  const matched = [];

  for (const [key, weight] of Object.entries(weights)) {
    const answer = answers[key];
    if (!answer || answer === 'any') continue;
    const values = Array.isArray(product[key]) ? product[key] : [product[key]];
    if (values.includes(answer)) {
      score += weight;
      matched.push(labels[key]?.[answer] ?? answer);
    } else {
      score -= key === 'role' ? 4 : 2;
    }
  }

  const requestedArea = hardArea(answers.area);
  if (requestedArea && product.area.includes(requestedArea)) {
    score += 12;
    matched.unshift(labels.area[answers.area]);
  }

  return { score, matched };
};

export function recommendBellcoria(inputAnswers) {
  const answers = normalizeAnswers(inputAnswers);
  const requestedArea = hardArea(answers.area);
  const eligible = bellcoriaProducts.filter((product) => !requestedArea || product.area.includes(requestedArea));
  const pool = eligible.length ? eligible : bellcoriaProducts;

  const ranked = pool
    .map((product) => ({ product, ...scoreProduct(product, answers) }))
    .sort((a, b) => b.score - a.score || a.product.rank - b.product.rank);

  const winner = ranked[0];
  const explicitRole = answers.role && answers.role !== 'any';
  const remaining = ranked.slice(1);
  const alternativeEntry = explicitRole
    ? remaining.find((entry) => entry.product.role === winner.product.role) ?? remaining[0]
    : remaining.find((entry) => entry.product.role !== winner.product.role) ?? remaining[0];

  const matchedText = winner.matched.length
    ? winner.matched.join(', ')
    : 'vaše odpovede a dostupný výber';

  return {
    product: winner.product,
    alternative: alternativeEntry?.product ?? null,
    score: winner.score,
    matchedTraits: winner.matched,
    reason: `Najlepšie sedí k tomu, čo ste zvolili: ${matchedText}.`,
    answers
  };
}

const compact = (text) => String(text || '').toLocaleLowerCase('sk');

export function bellcoriaFallback(message) {
  const q = compact(message);
  if (/bakuch/.test(q)) return 'Elixír proti vráskam s bakuchiolom je v tejto ukážke pleťový elixír s bakuchiolom a olejovou textúrou. Ak hľadáte čistiaci krok, pozrite Pleťový čistiaci gél; ak chcete pleťový olej, porovnajte ho s Organickým opunciovým olejom.';
  if (/večer|vecer|noč|nocn/.test(q)) return 'Na večerný elixírový krok je v tejto ponuke Nočný elixír s vitamínom C a brusnicovým olejom. Ak chcete namiesto elixíru pleťový olej, porovnajte ho s Organickým opunciovým olejom.';
  if (/telo|telov|astax/.test(q)) return 'Ak hľadáte produkt na telo, v tejto ukážke je Telový olej s astaxantínom. Pri výbere na tvár sa poradca sústredí iba na pleťový čistiaci gél, pleťový olej a elixíry.';
  if (/čist|cist|g[eé]l/.test(q) && /olej|elix/.test(q)) return 'Pleťový čistiaci gél je čistiaci krok. Organický opunciový olej a oba elixíry patria do následnej pleťovej starostlivosti, takže nejde o zameniteľné produkty v jednej fáze rutiny.';
  if (/olej/.test(q) && /elix/.test(q)) return 'Organický opunciový olej je pleťový olej. Bakuchiolový a nočný produkt sú elixíry; nočný elixír je pritom v tejto ponuke určený na večerný krok. Ak napíšete dva konkrétne názvy, porovnám ich stručne vedľa seba.';
  if (/porovn|rozdiel|vs\.?/.test(q)) return 'Napíšte názvy dvoch Bellcoria produktov. Porovnám ich podľa overeného typu produktu, oblasti použitia, textúry a miesta v rutine.';
  return 'Výber Bellcoria môžeme zúžiť podľa toho, či hľadáte produkt na tvár alebo telo, aký typ produktu chcete a kedy ho chcete používať. Ak chcete konkrétny výsledok, prejdite štyri krátke otázky vo Výbere starostlivosti.';
}

export const bellcoriaBrand = {
  slug: 'bellcoria',
  name: 'BELLCORIA',
  logo: local('logo.png'),
  hero: local('hero.jpg'),
  teaserTitle: 'Olej, elixír alebo čistenie?',
  teaser: 'Štyri krátke otázky zúžia výber.',
  welcome: 'Dobrý deň. Môžem porovnať pleťový olej, elixír a čistiaci gél alebo vám pomôcť oddeliť starostlivosť o tvár a telo.',
  chips: ['Olej vs. elixír vs. gél', 'Čo zaradiť večer?', 'Čo je bakuchiolový elixír?', 'Tvár alebo telo?'],
  fallback: bellcoriaFallback,
  products: bellcoriaProducts,
  questions: bellcoriaQuestions,
  recommend: recommendBellcoria
};
