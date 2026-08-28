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
    reason: 'Je to kvetová voda s ružou damascénskou — rovnaká produktová rola, ktorú ste vybrali v prvom kroku.',
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
    reason: 'Je to harmančeková kvetová voda — zostáva v ľahkej vodnej časti pleťovej rutiny.',
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
    reason: 'Vybrali ste pleťový olej. V overenom katalógu dema je tento olej samostatný olejový krok určený pre zrelú pleť.',
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
    reason: 'Vybrali ste starostlivosť o pery. Tento výsledok preto zostáva výhradne v kategórii balzamov na pery.',
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
    reason: 'Vybrali ste vlasovú starostlivosť a tuhý formát na umývanie, preto výsledok ostáva vo vlasovej kategórii.',
  }),
];

const question = (title, hint, options) => ({ title, hint, options });
const option = (label, value, image) => ({ label, value, image });

export const anemoneQuestions = [
  question('Čo dnes vyberáte?', 'Najprv oddelíme produktovú rolu. Táto voľba je pre výsledok záväzná.', [
    option('Kvetová voda', 'water', asset('product-1.jpg')),
    option('Pleťový olej', 'oil', asset('product-3.jpg')),
    option('Balzam na pery', 'balm', asset('product-4.jpg')),
    option('Tuhý šampón', 'hair', asset('product-5.jpg')),
  ]),
  question('Aký formát vám sedí?', 'Formát spresní poradie iba medzi produktmi v správnej kategórii.', [
    option('Vodný sprej', 'water', asset('product-2.jpg')),
    option('Olejové kvapky', 'oil', asset('product-3.jpg')),
    option('Tuhý balzam', 'balm', asset('product-4.jpg')),
    option('Tuhé umývanie', 'solid', asset('product-5.jpg')),
  ]),
  question('Kde ho chcete v rutine?', 'Vyberte miesto, kde má produkt reálne fungovať ako krok rutiny.', [
    option('Po čistení pleti', 'prep', asset('product-1.jpg')),
    option('Záverečný pleťový krok', 'finish', asset('product-3.jpg')),
    option('Pery podľa potreby', 'lips', asset('product-4.jpg')),
    option('Umývanie vlasov', 'wash', asset('product-5.jpg')),
  ]),
  question('Čo má rozhodnúť pri zhode?', 'Toto je jemné doladenie. Ak nemáte preferenciu, výsledok zostane stabilný.', [
    option('Ruža damascénska', 'rose', asset('product-1.jpg')),
    option('Harmanček', 'chamomile', asset('product-2.jpg')),
    option('Flexibilná rutina', 'flexible', asset('product-3.jpg')),
    option('Bez preferencie', 'neutral', asset('product-4.jpg')),
  ]),
];

const roleCopy = {
  water: 'kvetovú vodu',
  oil: 'pleťový olej',
  balm: 'balzam na pery',
  hair: 'vlasovú starostlivosť',
};

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
  if (botanical && botanical !== 'neutral' && primary.botanical.includes(botanical)) matched.push('botanická voľba');
  const suffix = matched.length ? ` Zhoduje sa aj ${matched.join(' a ')}.` : '';

  return {
    product: primary,
    alternative,
    reason: `${primary.reason}${suffix}`,
    explanation: `Tvrdá podmienka: ${roleCopy[role] ?? 'zvolená produktová rola'}. Skóre potom zoradilo iba produkty v tejto roli.`,
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
    return 'Obe sú kvetové vody, teda ľahký vodný krok po čistení. Ruža damascénska a Harmanček sa líšia použitou rastlinou; ak neviete, ktorú chcete, vo Výbere starostlivosti vieme túto voľbu spraviť explicitne bez miešania s olejom.';
  }
  if ((water && oil) || (asksComparison && oil)) {
    return 'Kvetová voda a pleťový olej nie sú zameniteľné formáty. Kvetová voda je ľahký vodný krok; Pleťový olej na zrelú pleť je 30 ml olej s pipetou a výrobca ho uvádza na čistú, jemne vlhkú pleť — pokojne po kvetovej vode.';
  }
  if (lip) {
    return 'Balzam na pery Mandarínka & grep je v tomto katalógu samostatná starostlivosť o pery za 3,70 €. Poradca ho pri voľbe „balzam na pery“ nebude zamieňať za pleťový olej ani kvetovú vodu.';
  }
  if (hair) {
    return 'Tuhý šampón Šalvia & levanduľa je vlasový produkt za 7,00 €. Je to tuhý formát na umývanie vlasov; kvetové vody ani pleťový olej sa pri vlasovej voľbe do odporúčania nedostanú.';
  }
  if (routine) {
    return 'Pre jednoduchú pleťovú dvojicu môžete mať kvetovú vodu ako ľahký krok po čistení a následne pleťový olej, ak vám sedí jeho určenie pre zrelú pleť. Balzam ostáva na pery a tuhý šampón vo vlasovej rutine.';
  }
  if (rose) return 'Kvetová voda Ruža damascénska patrí medzi kvetové vody ANEMONE a aktuálne je na oficiálnom webe za 5,30 €. Ak ju chcete porovnať s Harmančekom, môžem ich oddeliť podľa formátu a rastlinnej voľby bez vymýšľania účinkov.';
  if (chamomile) return 'Kvetová voda Harmanček je kvetová voda v 100 ml balení; na oficiálnom webe je aktuálne uvedená za 4,00 € v akcii. Pri porovnaní ju budem držať v rovnakej produktovej roli ako Ružu.';
  if (oil) return 'Pleťový olej na zrelú pleť je 30 ml olej s pipetou za 8,90 €. Je to samostatný pleťový olejový krok, nie náhrada balzamu na pery ani vlasového produktu.';
  return 'Môžem porovnať dve kvetové vody, vysvetliť rozdiel medzi kvetovou vodou a olejom, alebo zúžiť výber medzi balzamom na pery a vlasovým produktom. Odporúčanie zostane iba pri overených produktoch ANEMONE.';
}

export const anemoneBrand = {
  slug: 'anemone',
  name: 'ANEMONE',
  localAssets: true,
  logo: asset('logo.jpg'),
  hero: asset('hero.jpg'),
  teaserTitle: 'Neviete, čo zaradiť do rutiny?',
  teaser: '4 krátke kroky · iba produkty ANEMONE',
  welcome: 'Dobrý deň. Môžem porovnať kvetové vody, vysvetliť kvetovú vodu verzus olej alebo pomôcť s perami a vlasmi. Čo vyberáte?',
  chips: ['Ruža vs. Harmanček', 'Kvetová voda vs. olej', 'Balzam na pery', 'Tuhý šampón'],
  fallback: anemoneFallback,
  questions: anemoneQuestions,
  products: anemoneProducts,
  recommend: recommendAnemone,
};
