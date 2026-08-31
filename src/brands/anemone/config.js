const asset = (name) => `/assets/brands/anemone/${name}`;

const product = ({ id, name, price, url, image, role, format, routine, botanical, features, reason }) => ({
  id, name, price, url, image, role, format, routine, botanical, features, reason,
});

export const anemoneProducts = [
  product({
    id: 'rose-water',
    name: 'Kvetová voda Ruža damascénska',
    price: '5,30 €',
    url: 'https://anemone.sk/kvetinove-vody/kvetinova-voda-ruza-damascenska.html',
    image: asset('product-1.jpg'),
    role: 'water',
    format: ['water'],
    routine: ['prep', 'flexible'],
    botanical: ['rose', 'neutral'],
    features: ['kvetová voda', 'ruža damascénska', 'ľahký vodný krok'],
    reason: 'Je to kvetová voda s ružou damascénskou, takže zostáva pri ľahkom vodnom kroku, ktorý ste vybrali.',
  }),
  product({
    id: 'chamomile-water',
    name: 'Kvetová voda Harmanček',
    price: '4,00 €',
    url: 'https://anemone.sk/kvetinove-vody/kvetinova-voda-harmancek.html',
    image: asset('product-2.jpg'),
    role: 'water',
    format: ['water'],
    routine: ['prep', 'flexible'],
    botanical: ['chamomile', 'neutral'],
    features: ['kvetová voda', 'harmanček', '100 ml'],
    reason: 'Je to harmančeková kvetová voda, teda ľahký vodný krok po čistení pleti.',
  }),
  product({
    id: 'mature-oil',
    name: 'Pleťový olej na zrelú pleť',
    price: '8,90 €',
    url: 'https://anemone.sk/pletove-oleje-a-sera/pletovy-olej-na-zrelu-plet.html',
    image: asset('product-3.jpg'),
    role: 'oil',
    format: ['oil'],
    routine: ['finish', 'flexible'],
    botanical: ['neutral'],
    features: ['pleťový olej', '30 ml', 'sklenená fľaška s pipetou'],
    reason: 'Hľadáte pleťový olej; z tohto výberu je to olejový krok určený pre zrelú pleť.',
  }),
  product({
    id: 'citrus-lip-balm',
    name: 'Balzam na pery Mandarínka & grep',
    price: '3,70 €',
    url: 'https://anemone.sk/balzamy-na-pery/balzam-na-pery-mandarinka-grep.html',
    image: asset('product-4.jpg'),
    role: 'balm',
    format: ['balm'],
    routine: ['lips'],
    botanical: ['neutral'],
    features: ['balzam na pery', 'mandarínka & grep', 'tuhý balzamový formát'],
    reason: 'Hľadáte starostlivosť o pery, preto výber zostáva pri balzame na pery.',
  }),
  product({
    id: 'sage-lavender-shampoo',
    name: 'Tuhý šampón Šalvia & levanduľa',
    price: '7,00 €',
    url: 'https://anemone.sk/starostlivost-o-vlasy/tuhy-sampon-salvia-levandula.html',
    image: asset('product-5.jpg'),
    role: 'hair',
    format: ['solid'],
    routine: ['wash'],
    botanical: ['neutral'],
    features: ['tuhý šampón', 'šalvia & levanduľa', 'vlasová starostlivosť'],
    reason: 'Hľadáte vlasovú starostlivosť a tuhý formát na umývanie, preto najlepšie sedí tento šampón.',
  }),
];

const question = (title, hint, options) => ({ title, hint, options });
const option = (label, value, image) => ({ label, value, image });

export const anemoneQuestions = [
  question('Čo dnes vyberáte?', 'Začnite typom produktu, ktorý chcete zaradiť do rutiny.', [
    option('Kvetová voda', 'water', asset('product-1.jpg')),
    option('Pleťový olej', 'oil', asset('product-3.jpg')),
    option('Balzam na pery', 'balm', asset('product-4.jpg')),
    option('Tuhý šampón', 'hair', asset('product-5.jpg')),
  ]),
  question('Aký formát vám sedí?', 'Vyberte formát, po ktorom by ste siahli najradšej.', [
    option('Vodný sprej', 'water', asset('product-2.jpg')),
    option('Olejové kvapky', 'oil', asset('product-3.jpg')),
    option('Tuhý balzam', 'balm', asset('product-4.jpg')),
    option('Tuhé umývanie', 'solid', asset('product-5.jpg')),
  ]),
  question('Kde ho chcete v rutine?', 'Zvoľte moment, v ktorom má produkt zapadnúť do vašej starostlivosti.', [
    option('Po čistení pleti', 'prep', asset('product-1.jpg')),
    option('Záverečný pleťový krok', 'finish', asset('product-3.jpg')),
    option('Pery podľa potreby', 'lips', asset('product-4.jpg')),
    option('Umývanie vlasov', 'wash', asset('product-5.jpg')),
  ]),
  question('Čo má rozhodnúť pri výbere?', 'Pri kvetovej vode môžete zvoliť rastlinu; inak pokojne nechajte preferenciu otvorenú.', [
    option('Ruža damascénska', 'rose', asset('product-1.jpg')),
    option('Harmanček', 'chamomile', asset('product-2.jpg')),
    option('Flexibilná rutina', 'flexible', asset('product-3.jpg')),
    option('Bez preferencie', 'neutral', asset('product-4.jpg')),
  ]),
];

export function recommendAnemone(answers) {
  const [role, format, routine, botanical] = answers;
  const eligible = anemoneProducts.filter((item) => item.role === role);
  const candidates = eligible.length ? eligible : anemoneProducts;
  const ranked = candidates
    .map((item, index) => {
      let score = 0;
      if (format && item.format.includes(format)) score += 7;
      if (routine && item.routine.includes(routine)) score += 9;
      if (botanical && botanical !== 'neutral' && item.botanical.includes(botanical)) score += 5;
      if (botanical === 'neutral' && item.botanical.includes('neutral')) score += 1;
      return { item, score, index };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const primary = ranked[0]?.item ?? anemoneProducts[0];
  const alternative = ranked.find(({ item }) => item.id !== primary.id)?.item ?? null;
  const matched = [];
  if (format && primary.format.includes(format)) matched.push('formát');
  if (routine && primary.routine.includes(routine)) matched.push('miesto v rutine');
  if (botanical && botanical !== 'neutral' && primary.botanical.includes(botanical)) matched.push('rastlinná voľba');
  const suffix = matched.length ? ` Sedí aj podľa: ${matched.join(', ')}.` : '';

  return {
    product: primary,
    alternative,
    reason: `${primary.reason}${suffix}`,
  };
}

function includesAny(query, words) {
  return words.some((word) => query.includes(word));
}

export function anemoneFallback(message) {
  const query = String(message || '').toLocaleLowerCase('sk');
  const asksComparison = /porovn|rozdiel|versus|\bvs\b/.test(query);
  const rose = includesAny(query, ['ruža', 'ruza', 'damasc']);
  const chamomile = includesAny(query, ['harman', 'chamom']);
  const water = includesAny(query, ['kvetov', 'hydrol', 'voda']);
  const oil = includesAny(query, ['pleťový olej', 'pletovy olej', 'olej na zrel', 'olej']);
  const lip = includesAny(query, ['balzam', 'pery', 'mandar', 'grep']);
  const hair = includesAny(query, ['šampón', 'sampon', 'šalvia', 'salvia', 'levandu', 'vlas']);
  const routine = includesAny(query, ['rutina', 'poradie', 'najprv', 'potom', 'použiť spolu', 'pouzit spolu']);

  if ((rose && chamomile) || (asksComparison && water)) {
    return 'Obe sú kvetové vody, teda ľahký vodný krok po čistení. Líšia sa použitou rastlinou: jedna je Ruža damascénska, druhá Harmanček. Ak neviete, ktorú chcete, Výber starostlivosti vám dovolí zvoliť práve túto preferenciu.';
  }
  if ((water && oil) || (asksComparison && oil)) {
    return 'Kvetová voda a pleťový olej nie sú zameniteľné formáty. Kvetová voda je ľahký vodný krok; Pleťový olej na zrelú pleť je 30 ml olej s pipetou a výrobca ho uvádza na čistú, jemne vlhkú pleť — pokojne po kvetovej vode.';
  }
  if (lip) {
    return 'Balzam na pery Mandarínka & grep je samostatná starostlivosť o pery za 3,70 €. Ak hľadáte produkt na pery, poradca zostane pri tejto kategórii.';
  }
  if (hair) {
    return 'Tuhý šampón Šalvia & levanduľa je vlasový produkt za 7,00 €. Je to tuhý formát určený na umývanie vlasov.';
  }
  if (routine) {
    return 'Pre jednoduchú pleťovú dvojicu môžete zaradiť kvetovú vodu ako ľahký krok po čistení a následne pleťový olej, ak vám sedí jeho určenie pre zrelú pleť. Balzam patrí na pery a tuhý šampón do vlasovej rutiny.';
  }
  if (rose) return 'Kvetová voda Ruža damascénska patrí medzi kvetové vody ANEMONE a na zachytenej produktovej stránke bola uvedená za 5,30 €. Ak ju chcete porovnať s Harmančekom, porovnám ich podľa formátu a použitej rastliny bez vymýšľania účinkov.';
  if (chamomile) return 'Kvetová voda Harmanček je kvetová voda v 100 ml balení; na zachytenej produktovej stránke bola uvedená za 4,00 €. Pri porovnaní s Ružou ostávame pri rovnakom type produktu.';
  if (oil) return 'Pleťový olej na zrelú pleť je 30 ml olej s pipetou za 8,90 €. Je to samostatný olejový krok v pleťovej rutine.';
  return 'Môžem porovnať dve kvetové vody, vysvetliť rozdiel medzi kvetovou vodou a olejom alebo pomôcť s výberom produktu na pery či vlasy. Ak chcete konkrétny výsledok, prejdite štyri krátke otázky.';
}

export const anemoneBrand = {
  slug: 'anemone',
  name: 'ANEMONE',
  localAssets: true,
  logo: asset('logo.jpg'),
  hero: asset('hero.jpg'),
  teaserTitle: 'Neviete, čo zaradiť do rutiny?',
  teaser: '4 krátke otázky · konkrétny produkt',
  welcome: 'Dobrý deň. Môžem porovnať kvetové vody, vysvetliť rozdiel medzi kvetovou vodou a olejom alebo pomôcť s výberom na pery či vlasy. Čo hľadáte?',
  chips: ['Ruža vs. Harmanček', 'Kvetová voda vs. olej', 'Balzam na pery', 'Tuhý šampón'],
  fallback: anemoneFallback,
  questions: anemoneQuestions,
  products: anemoneProducts,
  recommend: recommendAnemone,
};
