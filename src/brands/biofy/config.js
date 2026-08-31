import { recommendBiofy } from './scoring.js';

const image = (index, extension = 'png') => `/assets/brands/biofy/product-${index}.${extension}`;

export const biofyProducts = [
  {
    id: 'face-hydrating',
    area: 'face',
    name: 'Hydratačný krém na suchú a citlivú pleť 60 ml',
    shortName: 'Hydratačný krém',
    price: '15,90 €',
    regularPrice: '21,20 €',
    url: 'https://biofy.sk/produkt/hydratacny-krem-na-suchu-a-citlivu-plet-60ml-2/',
    image: image(1),
    features: ['suchá a citlivá pleť', 'ľahká textúra', '60 ml'],
    summary: 'Ľahší pleťový krém určený pre suchú a citlivú pleť.',
    traits: { skin: ['dry', 'sensitive'], role: ['hydration', 'everyday'], format: ['cream'], texture: ['light'], routine: ['simple'] },
  },
  {
    id: 'face-nourishing',
    area: 'face',
    name: 'Výživný krém na normálnu a zmiešanú pleť 60 ml',
    shortName: 'Výživný krém',
    price: '16,09 €',
    regularPrice: '21,45 €',
    url: 'https://biofy.sk/produkt/vyzivny-krem-na-normalnu-a-zmiesanu-plet-60ml/',
    image: image(2),
    features: ['normálna a zmiešaná pleť', 'výživný krém', '60 ml'],
    summary: 'Pleťový krém zameraný na normálnu a zmiešanú pleť.',
    traits: { skin: ['normal', 'mixed'], role: ['nourishment', 'everyday'], format: ['cream'], texture: ['rich'], routine: ['simple'] },
  },
  {
    id: 'face-hemp',
    area: 'face',
    name: 'Konopný krém na suchú a problematickú pleť 50 ml',
    shortName: 'Konopný krém',
    price: '13,35 €',
    regularPrice: '17,80 €',
    url: 'https://biofy.sk/produkt/konopny-krem-na-suchu-a-problematicku-plet-50ml/',
    image: image(3),
    features: ['suchá a problematická pleť', 'konopný krém', '50 ml'],
    summary: 'Konopný pleťový krém určený pre suchú a problematickú pleť.',
    traits: { skin: ['dry', 'problematic'], role: ['hemp-care', 'nourishment'], format: ['cream'], texture: ['rich'], routine: ['simple'] },
  },
  {
    id: 'hair-tonic',
    area: 'hair',
    name: 'Vlasové tonikum s rozmarínom 100 ml',
    officialName: 'Vlasové tonikum na rast vlasov – s rozmarínom, 100ml',
    shortName: 'Vlasové tonikum s rozmarínom',
    price: '12,67 €',
    regularPrice: '16,90 €',
    url: 'https://biofy.sk/produkt/tonikum-na-rast-vlasov-s-rozmarinom-100ml/',
    image: image(4, 'jpg'),
    features: ['vlasové tonikum', 'rozmarín', '100 ml'],
    summary: 'Tekutý vlasový krok s rozmarínom pre rutinu pokožky hlavy.',
    traits: { skin: ['scalp'], role: ['tonic'], format: ['tonic'], texture: ['light'], routine: ['simple'] },
  },
  {
    id: 'hair-oil',
    area: 'hair',
    name: 'Ošetrujúci olejček na vlasy — 9 vzácnych olejov 50 ml',
    shortName: 'Ošetrujúci olejček — 9 olejov',
    price: '11,93 €',
    regularPrice: '15,90 €',
    url: 'https://biofy.sk/produkt/osetrujuci-olejcek-na-vlasy-9-vzacnych-olejov-50ml/',
    image: image(5),
    features: ['9 olejov', 'olejový formát', '50 ml'],
    summary: 'Olejový vlasový krok určený do dĺžok a na výživnejšiu rutinu.',
    traits: { skin: ['lengths', 'dry-ends'], role: ['conditioning', 'nourishment'], format: ['oil'], texture: ['rich'], routine: ['simple'] },
  },
];

const face = biofyProducts.filter((product) => product.area === 'face');
const hair = biofyProducts.filter((product) => product.area === 'hair');
const option = (value, label, product) => ({ value, label, image: product.image });

const areaQuestion = {
  key: 'area',
  title: 'Vyberáte starostlivosť o pleť alebo vlasy?',
  hint: 'Začnite oblasťou, pre ktorú dnes hľadáte produkt.',
  options: [
    option('face', 'Pleť', face[0]),
    option('hair', 'Vlasy', hair[0]),
  ],
};

const faceQuestions = [
  {
    key: 'skin', title: 'Ktorý opis pleti je najbližší?', hint: 'Vyberte možnosť, ktorá najviac zodpovedá určeniu krémov BIOFY.',
    options: [
      option('dry-sensitive', 'Suchá a citlivá', face[0]),
      option('normal-mixed', 'Normálna a zmiešaná', face[1]),
      option('dry-problematic', 'Suchá a problematická', face[2]),
      option('face-unsure', 'Nie som si istý/á', face[0]),
    ],
  },
  {
    key: 'role', title: 'Aký typ krému hľadáte?', hint: 'Zvoľte hydratáciu, výživnejší krém alebo konopný krém.',
    options: [
      option('hydration', 'Hydratačný krém', face[0]),
      option('nourishment', 'Výživný krém', face[1]),
      option('hemp-care', 'Konopný krém', face[2]),
      option('face-simple', 'Jednoduchý denný krok', face[0]),
    ],
  },
  {
    key: 'preference', title: 'Čo má pri výbere rozhodnúť?', hint: 'Vyberte textúru alebo čo najjednoduchší každodenný krok.',
    options: [
      option('light-cream', 'Ľahšia textúra', face[0]),
      option('rich-cream', 'Výživnejšia textúra', face[1]),
      option('hemp-cream', 'Konopný krém', face[2]),
      option('simple-routine', 'Čo najjednoduchšia rutina', face[0]),
    ],
  },
];

const hairQuestions = [
  {
    key: 'hair-area', title: 'Kam chcete produkt zaradiť?', hint: 'Tonikum patrí k pokožke hlavy, olejček do dĺžok vlasov.',
    options: [
      option('scalp', 'Pokožka hlavy', hair[0]),
      option('lengths', 'Dĺžky vlasov', hair[1]),
      option('dry-ends', 'Suchšie dĺžky a končeky', hair[1]),
      option('hair-unsure', 'Nie som si istý/á', hair[0]),
    ],
  },
  {
    key: 'hair-role', title: 'Aký typ vlasového kroku chcete?', hint: 'Vyberte ľahšie tonikum alebo výživnejší olejček.',
    options: [
      option('tonic', 'Tonikum s rozmarínom', hair[0]),
      option('conditioning', 'Ošetrujúci olejček', hair[1]),
      option('hair-light', 'Ľahší krok', hair[0]),
      option('hair-rich', 'Výživnejší krok', hair[1]),
    ],
  },
  {
    key: 'hair-format', title: 'Ktorý formát vám sedí viac?', hint: 'Posledná otázka rozlíši tekuté tonikum a olejový formát.',
    options: [
      option('tonic-format', 'Tekuté tonikum', hair[0]),
      option('oil-format', 'Olej', hair[1]),
      option('light-routine', 'Ľahšia rutina', hair[0]),
      option('rich-routine', 'Výživnejšia rutina', hair[1]),
    ],
  },
];

export function getBiofyQuestion(step, answers = []) {
  if (step === 0) return areaQuestion;
  const area = answers[0];
  if (area === 'face') return faceQuestions[step - 1];
  if (area === 'hair') return hairQuestions[step - 1];
  return areaQuestion;
}

function localFallback(query = '') {
  const text = query.toLocaleLowerCase('sk');
  if (/tonik/.test(text) && /olej/.test(text)) return 'Vlasové tonikum s rozmarínom je ľahší tekutý krok pre pokožku hlavy. Ošetrujúci olejček je olejový krok do dĺžok vlasov. Ak chcete, môžem ich porovnať aj podľa textúry a miesta v rutine.';
  if (/konop/.test(text)) return 'Konopný krém je v ponuke určený pre suchú a problematickú pleť. Ak chcete porovnať všetky tri pleťové krémy, napíšte, ktorý opis pleti je vám najbližší, alebo otvorte Výber starostlivosti.';
  if (/vlas/.test(text)) return 'Pri vlasoch môžete porovnať tonikum s rozmarínom a ošetrujúci olejček. Tonikum je ľahší krok pre pokožku hlavy, olejček patrí do dĺžok a výživnejšej rutiny.';
  return 'Pri BIOFY môžeme začať pleťou alebo vlasmi. Pri pleti porovnám tri krémy podľa ich určenia a textúry, pri vlasoch tonikum s rozmarínom a ošetrujúci olejček podľa formátu a miesta v rutine.';
}

export const biofy = {
  slug: 'biofy',
  name: 'BIOFY',
  headline: 'Pleť a vlasy. Dve odlišné rutiny.',
  logo: '/assets/brands/biofy/logo.svg',
  hero: '/assets/brands/biofy/hero.jpg',
  teaserTitle: 'Pleť alebo vlasy?',
  teaser: 'Štyri krátke otázky zúžia výber.',
  welcome: 'Dobrý deň. Vyberáte dnes starostlivosť o pleť alebo vlasy? Môžem porovnať aj konkrétne BIOFY produkty.',
  chips: ['Ktorý pleťový krém?', 'Suchá vs. zmiešaná pleť', 'Konopný krém', 'Tonikum alebo olejček?'],
  products: biofyProducts,
  faceProducts: face,
  hairProducts: hair,
  advisorSteps: 4,
  getAdvisorQuestion: getBiofyQuestion,
  recommend: (answers) => recommendBiofy(biofyProducts, answers),
  fallback: localFallback,
};
