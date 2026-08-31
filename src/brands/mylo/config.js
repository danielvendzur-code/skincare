const asset = (name) => `/assets/brands/mylo/${name}`;

export const myloProducts = [
  {
    id: 'inovat',
    name: 'Hydratačné sérum INOVAŤ',
    shortName: 'INOVAŤ',
    aliases: ['inovat', 'inovať'],
    category: 'Hydratačné sérum',
    role: 'serum',
    price: '19,00 €',
    url: 'https://www.mylo.sk/starostlivost-o-tvar/inovat/',
    image: asset('product-1.jpg'),
    features: ['ľahké hydrogélové sérum', 'niacínamid, morské riasy, prebiotiká a kyselina hyalurónová', 'MYLO ho odporúča na normálnu až mastnú pleť'],
    storefrontNote: 'Ľahký hydratačný krok pre normálnu až mastnejšiu pleť.',
    chatSummary: 'INOVAŤ je ľahké hydrogélové sérum za 19,00 €. MYLO ho odporúča na normálnu až mastnú pleť a na každodenné použitie ráno aj večer.',
    traits: ['hydration', 'oily', 'mixed', 'light', 'serum', 'morning', 'evening', 'layering'],
  },
  {
    id: 'moissanit',
    name: 'Čistiace a odličovacie mlieko MOISSANIT',
    shortName: 'MOISSANIT',
    aliases: ['moissanit'],
    category: 'Čistenie',
    role: 'cleanser',
    price: '20,00 €',
    url: 'https://www.mylo.sk/starostlivost-o-tvar/moissanit/',
    image: asset('product-2.jpg'),
    features: ['čistiace a odličovacie mlieko', 'na tvár aj oči', 'pre všetky typy pleti vrátane citlivej'],
    storefrontNote: 'Jemný čistiaci a odličovací krok aj pre citlivú pleť.',
    chatSummary: 'MOISSANIT je čistiace a odličovacie mlieko za 20,00 €. MYLO ho uvádza pre všetky typy pleti vrátane citlivej a aj na odlíčenie očí.',
    traits: ['cleanse', 'gentle', 'sensitive', 'dry', 'dehydrated', 'all-skin', 'milk', 'simple'],
  },
  {
    id: 'flora',
    name: 'Pleťový olej FLÓRA',
    shortName: 'FLÓRA',
    aliases: ['flora', 'flóra'],
    category: 'Pleťový olej',
    role: 'oil',
    price: 'od 2,50 €',
    url: 'https://www.mylo.sk/starostlivost-o-tvar/flora/',
    image: asset('product-3.jpg'),
    features: ['olejové sérum', 'pre suchú a citlivú pleť', 'MYLO uvádza použitie 1 až 2-krát denne'],
    storefrontNote: 'Výživnejší olejový krok pre suchú a citlivú pleť.',
    chatSummary: 'FLÓRA je olejové sérum pre suchú a citlivú pleť. MYLO uvádza viac veľkostí od 2,50 € a použitie 1 až 2-krát denne.',
    traits: ['dry', 'sensitive', 'comfort', 'nourish', 'oil', 'rich', 'morning', 'evening'],
  },
  {
    id: 'kvetova-rosa',
    name: 'Pleťová voda KVETOVÁ ROSA',
    shortName: 'KVETOVÁ ROSA',
    aliases: ['kvetova rosa', 'kvetová rosa'],
    category: 'Pleťová voda',
    role: 'toner',
    price: '22,00 €',
    url: 'https://www.mylo.sk/starostlivost-o-tvar/kvetova-rosa/',
    image: asset('product-4.jpg'),
    features: ['tonikum', 'podpora hydratácie', 'MYLO ho používa tesne pred pleťovým olejom'],
    storefrontNote: 'Ľahký hydratačný medzikrok pred pleťovým olejom.',
    chatSummary: 'KVETOVÁ ROSA je tonikum za 22,00 €. MYLO ho opisuje ako krok na podporu hydratácie a odporúča ho aplikovať tesne pred pleťovým olejom.',
    traits: ['hydration', 'dry', 'sensitive', 'all-skin', 'light', 'toner', 'layering', 'pre-oil'],
  },
  {
    id: 'radost',
    name: 'Ceramidový krém s vitamínmi RADOSŤ',
    shortName: 'RADOSŤ',
    aliases: ['radost', 'radosť'],
    category: 'Pleťový krém',
    role: 'cream',
    price: '14,75 €',
    url: 'https://www.mylo.sk/starostlivost-o-tvar/ceramidovy-krem-s-vitaminmi-radost/',
    image: asset('product-5.jpg'),
    features: ['ceramidový krém', 'hydratácia a komfort', 'MYLO ho uvádza na ráno aj večer'],
    storefrontNote: 'Krémový hydratačný krok s ceramidmi na ráno aj večer.',
    chatSummary: 'RADOSŤ je ceramidový krém za 14,75 €. MYLO ho opisuje cez hydratáciu a regeneráciu a uvádza použitie ráno aj večer.',
    traits: ['hydration', 'dehydrated', 'all-skin', 'barrier', 'comfort', 'cream', 'medium-rich', 'morning', 'evening', 'simple'],
  },
];

const images = Object.fromEntries(myloProducts.map((product) => [product.id, product.image]));

export const myloQuestions = [
  {
    key: 'skin',
    label: 'Pleť',
    title: 'Ako sa vaša pleť najčastejšie cíti?',
    hint: 'Vyberte opis, ktorý je vášmu bežnému pocitu pleti najbližší.',
    options: [
      { value: 'dry', label: 'Suchá alebo napnutá', description: 'Chcem viac komfortu', image: images.flora, weights: { dry: 9, hydration: 5, comfort: 4 } },
      { value: 'dehydrated', label: 'Dehydrovaná', description: 'Chýba jej hydratácia', image: images.radost, weights: { dehydrated: 10, hydration: 7, barrier: 3 } },
      { value: 'oily', label: 'Mastnejšia / T-zóna', description: 'Preferujem ľahší pocit', image: images.inovat, weights: { oily: 9, mixed: 7, light: 4 } },
      { value: 'sensitive', label: 'Citlivá', description: 'Chcem jemný prístup', image: images.moissanit, weights: { sensitive: 10, gentle: 6, comfort: 3 } },
    ],
  },
  {
    key: 'goal',
    label: 'Priorita',
    title: 'Ktorý krok chcete vyriešiť ako prvý?',
    hint: 'Vyberte krok, ktorý chcete v rutine vyriešiť prednostne.',
    options: [
      { value: 'cleanse', label: 'Jemné čistenie', description: 'Čistenie a odlíčenie', image: images.moissanit, weights: { cleanse: 11, gentle: 5 }, rolePreference: { role: 'cleanser', bonus: 18, mismatch: -9 } },
      { value: 'hydrate', label: 'Hydratáciu', description: 'Ľahší alebo krémový krok', image: images.inovat, weights: { hydration: 12, dehydrated: 4 } },
      { value: 'comfort', label: 'Viac komfortu', description: 'Krém alebo olej', image: images.radost, weights: { comfort: 10, barrier: 7, nourish: 4 } },
      { value: 'simple', label: 'Jednoduchšiu rutinu', description: 'Jeden zrozumiteľný krok', image: images['kvetova-rosa'], weights: { simple: 10, layering: 4 } },
    ],
  },
  {
    key: 'format',
    label: 'Textúra',
    title: 'Po akej textúre siahate najradšej?',
    hint: 'Ak neviete, nechajte rozhodnúť ostatné odpovede.',
    options: [
      { value: 'serum', label: 'Ľahké sérum', description: 'Gélový, ľahký krok', image: images.inovat, weights: { serum: 10, light: 5 }, rolePreference: { role: 'serum', bonus: 12, mismatch: -4 } },
      { value: 'cream', label: 'Krém', description: 'Krémový komfort', image: images.radost, weights: { cream: 10, comfort: 4 }, rolePreference: { role: 'cream', bonus: 12, mismatch: -4 } },
      { value: 'oil', label: 'Olej', description: 'Výživnejší olejový krok', image: images.flora, weights: { oil: 10, rich: 5, nourish: 4 }, rolePreference: { role: 'oil', bonus: 12, mismatch: -4 } },
      { value: 'neutral', label: 'Bez preferencie', description: 'Rozhodne pleť a priorita', image: images['kvetova-rosa'], weights: {} },
    ],
  },
  {
    key: 'routine',
    label: 'Rutina',
    title: 'Kam má produkt zapadnúť?',
    hint: 'Posledná odpoveď pomôže doladiť praktické použitie.',
    options: [
      { value: 'morning', label: 'Najmä ráno', description: 'Rýchly denný krok', image: images.inovat, weights: { morning: 7, light: 2 } },
      { value: 'evening', label: 'Najmä večer', description: 'Pokojnejšia večerná rutina', image: images.flora, weights: { evening: 7, comfort: 2 } },
      { value: 'both', label: 'Ráno aj večer', description: 'Univerzálne použitie', image: images.radost, weights: { morning: 5, evening: 5, simple: 3 } },
      { value: 'minimal', label: 'Čo najjednoduchšie', description: 'Minimum krokov navyše', image: images.moissanit, weights: { simple: 9 } },
    ],
  },
];

const TRAIT_LABELS = {
  dry: 'suchšiu pleť',
  dehydrated: 'dehydratovaný pocit',
  oily: 'mastnejšiu pleť',
  mixed: 'zmiešanú pleť / T-zónu',
  sensitive: 'citlivejšiu pleť',
  gentle: 'jemný prístup',
  cleanse: 'jemné čistenie',
  hydration: 'hydratáciu',
  comfort: 'väčší komfort',
  barrier: 'krémový bariérový krok',
  nourish: 'výživnejší krok',
  light: 'ľahšiu textúru',
  serum: 'sérum',
  cream: 'krém',
  oil: 'olej',
  rich: 'bohatšiu textúru',
  morning: 'rannú rutinu',
  evening: 'večernú rutinu',
  simple: 'jednoduchú rutinu',
  layering: 'vrstvenie starostlivosti',
};

function selectedOptions(answers) {
  return myloQuestions.flatMap((question) => {
    const option = question.options.find((candidate) => candidate.value === answers?.[question.key]);
    return option ? [{ question, option }] : [];
  });
}

export function rankMyloProducts(answers) {
  const selected = selectedOptions(answers);
  const ranked = myloProducts.map((product, index) => {
    let score = 0;
    const matches = new Map();

    for (const { option } of selected) {
      for (const [trait, weight] of Object.entries(option.weights || {})) {
        if (product.traits.includes(trait)) {
          score += weight;
          const current = matches.get(trait) || 0;
          matches.set(trait, Math.max(current, weight));
        }
      }

      if (option.rolePreference) {
        score += product.role === option.rolePreference.role
          ? option.rolePreference.bonus
          : option.rolePreference.mismatch;
      }
    }

    const matchedTraits = [...matches.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'sk'))
      .map(([trait]) => trait);

    return { product, index, score, matchedTraits };
  }).sort((a, b) => b.score - a.score || a.index - b.index);

  const primary = ranked[0];
  const complementaryRoles = {
    cleanser: ['serum', 'cream', 'toner'],
    serum: ['cream', 'toner'],
    cream: ['serum', 'oil', 'toner'],
    oil: ['toner', 'cream'],
    toner: ['oil', 'cream', 'serum'],
  };
  const threshold = Math.max(0, primary.score * 0.45);
  const alternatives = ranked
    .filter((candidate) => candidate.product.id !== primary.product.id && candidate.score >= threshold)
    .map((candidate) => ({
      ...candidate,
      alternativeScore: candidate.score + (complementaryRoles[primary.product.role]?.includes(candidate.product.role) ? 3 : 0),
    }))
    .sort((a, b) => b.alternativeScore - a.alternativeScore || b.score - a.score || a.index - b.index);
  const alternative = alternatives[0] || ranked.find((candidate) => candidate.product.id !== primary.product.id);

  const reasonLabels = primary.matchedTraits
    .map((trait) => TRAIT_LABELS[trait])
    .filter(Boolean)
    .slice(0, 3);
  const reason = reasonLabels.length
    ? `Najlepšie sedí k vašim odpovediam podľa: ${reasonLabels.join(', ')}.`
    : primary.product.storefrontNote;

  return {
    product: primary.product,
    alternative: alternative?.product || myloProducts[1],
    reason,
    matchedTraits: reasonLabels,
    score: primary.score,
    ranked,
  };
}

function normalize(text) {
  return String(text || '').toLocaleLowerCase('sk').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function mentionedProducts(text) {
  const value = normalize(text);
  return myloProducts.filter((product) => product.aliases.some((alias) => value.includes(normalize(alias))));
}

export function myloFallback(message, history = []) {
  const historyText = [...history.slice(-6).map((item) => item?.content || item?.text || ''), message].join(' ');
  const query = normalize(message);
  const mentioned = mentionedProducts(historyText);

  if (/diagno|ekzem|dermatit|psori|rosace|infek|alerg|hnis|krvac|liec|vyliec|terapi|dermatol|lekar/.test(query)) {
    return 'S diagnózou ani liečbou vám produktový poradca nepomôže. Môžem zúžiť výber kozmetiky podľa textúry a rutiny; pri výrazných, pretrvávajúcich alebo zhoršujúcich sa ťažkostiach je vhodné obrátiť sa na lekára alebo dermatológa.';
  }

  if (/porovn|rozdiel|versus|\bvs\b/.test(query) && mentioned.length >= 2) {
    const [first, second] = mentioned.slice(-2);
    return `${first.shortName}: ${first.chatSummary} ${second.shortName}: ${second.chatSummary} Nie sú automaticky zameniteľné — rozhodujúci je typ kroku (${first.category.toLocaleLowerCase('sk')} vs. ${second.category.toLocaleLowerCase('sk')}).`;
  }

  if (/rann|rano|rannej/.test(query)) {
    return 'Ak chcete jednoduchú rannú rutinu iba z tohto výberu MYLO, začnite čistením podľa potreby a potom zvoľte ľahké INOVAŤ alebo krém RADOSŤ podľa preferovanej textúry. MYLO pri oboch uvádza použitie ráno.';
  }

  if (/vecer|vecern/.test(query)) {
    return 'Na večer sa z tohto výberu dá postaviť krátka rutina: MOISSANIT ako čistiaci krok, potom podľa potreby RADOSŤ alebo FLÓRA. KVETOVÁ ROSA je na stránke MYLO popísaná ako tonikum tesne pred pleťovým olejom.';
  }

  if (/citliv/.test(query)) {
    return 'Pri citlivej pleti sú v tomto výbere najjasnejšie možnosti MOISSANIT na jemné čistenie a FLÓRA ako olejový krok pre suchú a citlivú pleť. KVETOVÚ ROSU MYLO tiež uvádza medzi typmi pleti pre citlivú pokožku.';
  }

  if (/such|dehydrat|hydrat/.test(query)) {
    return 'Ak je prioritou hydratácia, INOVAŤ je ľahké hydrogélové sérum a RADOSŤ krémový ceramidový krok. Pri suchej a citlivej pleti je z tohto výberu relevantná aj FLÓRA; Výber starostlivosti zohľadní aj textúru a čas rutiny.';
  }

  if (/cist|odlic|mlieko/.test(query)) return myloProducts[1].chatSummary;
  if (/serum|inovat/.test(query)) return myloProducts[0].chatSummary;
  if (/olej|flora/.test(query)) return myloProducts[2].chatSummary;
  if (/tonik|pletov.*vod|kvetov/.test(query)) return myloProducts[3].chatSummary;
  if (/krem|radost|ceramid/.test(query)) return myloProducts[4].chatSummary;

  return 'Pomôžem vám vybrať produkt MYLO podľa toho, ako sa pleť cíti, aký krok chcete riešiť a akú textúru preferujete. Môžete sa opýtať napríklad na jemné čistenie, hydratáciu, rannú či večernú rutinu alebo porovnať dva konkrétne produkty.';
}

export const myloConfig = {
  slug: 'mylo',
  name: 'MYLO',
  logo: asset('logo.png'),
  hero: asset('hero.jpg'),
  teaserTitle: 'Neviete, čo zaradiť do rutiny?',
  teaser: '4 krátke otázky · produkt z ponuky MYLO',
  welcome: 'Dobrý deň. Napíšte mi, čo chcete v rutine vyriešiť, alebo názov produktu MYLO. Pomôžem porovnať možnosti a zúžiť výber.',
  chips: ['Mám suchú pleť', 'Jemné čistenie pre citlivú pleť', 'Čo použiť ráno?', 'INOVAŤ alebo RADOSŤ?'],
  products: myloProducts,
  questions: myloQuestions,
  fallback: myloFallback,
  rankProducts: rankMyloProducts,
};
