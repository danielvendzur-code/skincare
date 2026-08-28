export const ponioCategories = [
  { id: 'face', label: 'Pleť', detail: 'Krémy, pleťové vody a čistenie', url: 'https://ponio.sk/collections/plet-pletove-kremy' },
  { id: 'hair', label: 'Vlasy', detail: 'Šampúchy, suché šampóny a kondicionéry', url: 'https://ponio.sk/collections/sampuchy' },
  { id: 'body', label: 'Telo', detail: 'Mydlá, deodoranty a masážne kocky', url: 'https://ponio.sk/collections/deodoranty-so-sodou-a-kaolinom' },
  { id: 'lips', label: 'Pery', detail: 'Rúže a balzamy na pery', url: 'https://ponio.sk/products/ruz-na-pery-v-ceruzke' },
];

const local = (name) => `/assets/brands/ponio/${name}`;

export const ponioProducts = [
  {
    id: 'lumina-shield', area: 'face', name: 'Lumina shield', subtitle: 'Denný ochranný pleťový krém', price: '25,30 €',
    url: 'https://ponio.sk/products/lumina-shield-pletovy-krem', image: local('product-1.jpg'),
    goals: ['protect', 'hydration'], formats: ['daily-cream', 'cream'], timings: ['morning', 'daily'], sensitivity: [],
    features: ['pleťový krém', 'denná starostlivosť', 'vhodný pod SPF alebo make-up'],
    verifiedSummary: 'Denný pleťový krém pre každodennú rannú starostlivosť. PONIO ho uvádza pre všetky typy pleti a ako krém vhodný pod SPF alebo make-up.',
  },
  {
    id: 'healthy-aging', area: 'face', name: 'Healthy aging', subtitle: 'Pleťový krém pre zrelú pleť', price: '25,30 €',
    url: 'https://ponio.sk/products/healthy-aging-pletovy-krem', image: local('product-2.jpg'),
    goals: ['mature', 'hydration'], formats: ['rich-cream', 'cream'], timings: ['morning', 'evening', 'daily'], sensitivity: [],
    features: ['pleťový krém', 'zrelá pleť', 'denná aj večerná rutina'],
    verifiedSummary: 'Krém zameraný na zrelú pleť, ktorý PONIO uvádza na dennú aj večernú starostlivosť.',
  },
  {
    id: 'vanilla-coconut', area: 'face', name: 'Vanilka & kokos', subtitle: 'Výživný univerzálny pleťový krém', price: '13,00 €',
    url: 'https://ponio.sk/products/vanilka-a-kokos-pletovy-krem', image: 'https://ponio.sk/cdn/shop/files/P1200306.jpg?v=1700644929&width=600',
    goals: ['hydration', 'sensitive'], formats: ['sensitive-cream', 'rich-cream', 'cream'], timings: ['morning', 'evening', 'daily'], sensitivity: ['sensitive'],
    features: ['pleťový krém', 'citlivá, normálna až suchšia pleť', 'pantenol'],
    verifiedSummary: 'PONIO ho výslovne uvádza ako vhodný pre citlivú, normálnu až suchšiu pleť.',
  },
  {
    id: 'mint-dry', area: 'hair', name: 'Mint', subtitle: 'Suchý šampón', price: '7,70 €',
    url: 'https://ponio.sk/products/suchy-sampon-mint', image: local('product-3.jpg'),
    goals: ['refresh'], formats: ['dry-shampoo', 'powder'], timings: ['as-needed', 'travel'], sensitivity: [],
    features: ['suchý šampón', 'práškový formát', 'osvieženie medzi umytiami'],
    verifiedSummary: 'Suchý šampón na rýchle osvieženie vlasov medzi umytiami. PONIO pri ňom priamo uvádza aj použitie na cestách.',
  },
  {
    id: 'banana-dry', area: 'hair', name: 'Banán & kokos', subtitle: 'Suchý šampón', price: '7,70 €',
    url: 'https://ponio.sk/products/banan-kokos-suchy-sampon', image: local('product-4.jpg'),
    goals: ['refresh'], formats: ['dry-shampoo', 'powder'], timings: ['as-needed'], sensitivity: [],
    features: ['suchý šampón', 'práškový formát', 'použitie medzi umytiami'],
    verifiedSummary: 'Práškový suchý šampón určený na osvieženie vlasov medzi klasickým umývaním.',
  },
  {
    id: 'double-lavender', area: 'hair', name: 'Dvojitá levanduľa', subtitle: 'Žihľavový šampúch', price: 'od 4,70 €',
    url: 'https://ponio.sk/products/dvojita-levandula-zihlavovy-sampuch-30g-60g', image: local('product-5.jpg'),
    goals: ['wash', 'solid'], formats: ['solid-shampoo'], timings: ['wash-day', 'travel'], sensitivity: [],
    features: ['tuhý šampón', 'produkt na umývanie vlasov', 'kompaktný formát'],
    verifiedSummary: 'Tuhý šampón na samotné umývanie vlasov. PONIO pri šampúchu uvádza kompaktnosť a praktické použitie na cestách.',
  },
  {
    id: 'fresh-air', area: 'body', name: 'Fresh air', subtitle: 'Prírodný deodorant', price: '9,30 €',
    url: 'https://ponio.sk/products/fresh-air-prirodny-deodorant', image: 'https://ponio.sk/cdn/shop/products/P1130396.JPG?v=1444655355&width=600',
    goals: ['freshness', 'deodorant', 'paper-packaging'], formats: ['solid-deodorant', 'natural-deodorant', 'paper-packaging', 'fresh-scent'], timings: ['morning', 'daily', 'as-needed'], sensitivity: [],
    features: ['prírodný deodorant', 'nie antiperspirant', 'papierový obal'],
    verifiedSummary: 'Prírodný deodorant, nie antiperspirant. PONIO ho uvádza ako sviežu deodorantovú starostlivosť pre telo.',
  },
  {
    id: 'lip-pencil', area: 'lips', name: 'Rúž na pery v ceruzke', subtitle: 'Prírodný rúž · 6 odtieňov', price: '8,30 €',
    url: 'https://ponio.sk/products/ruz-na-pery-v-ceruzke', image: 'https://ponio.sk/cdn/shop/files/P1200606.jpg?v=1709818979&width=600',
    goals: ['color', 'hydration', 'matte'], formats: ['lip-pencil', 'matte', 'six-shades', 'hydrating-lip'], timings: ['daily', 'as-needed', 'occasional'], sensitivity: [],
    features: ['rúž v ceruzke', '6 odtieňov', 'matný vzhľad'],
    verifiedSummary: 'Rúž v ceruzke v šiestich odtieňoch. PONIO pri ňom uvádza hydratáciu a matný vzhľad.',
  },
];

const areaOptions = [
  ['face', 'Pleť', 'Krémy a každodenná pleťová rutina'],
  ['hair', 'Vlasy', 'Umývanie alebo osvieženie medzi umytiami'],
  ['body', 'Telo', 'Deodorant a telová starostlivosť'],
  ['lips', 'Pery', 'Farba a starostlivosť o pery'],
];

const goalsByArea = {
  face: [['protect', 'Denná ochrana', 'Krém do rannej rutiny'], ['mature', 'Zrelá pleť', 'Cielená krémová starostlivosť'], ['sensitive', 'Citlivá pleť', 'Iba produkty s overeným určením'], ['hydration', 'Hydratácia', 'Komfort a hydratácia pleti']],
  hair: [['refresh', 'Osviežiť medzi umytiami', 'Suchý šampón bez klasického umývania'], ['wash', 'Umyť vlasy', 'Produkt na samotné umývanie'], ['solid', 'Chcem tuhý formát', 'Kompaktný šampúch'], ['flexible', 'Nemám preferenciu', 'Rozhodne ďalší krok']],
  body: [['freshness', 'Sviežosť', 'Každodenná deodorantová starostlivosť'], ['deodorant', 'Deodorant', 'Nie antiperspirant'], ['paper-packaging', 'Papierový obal', 'Overená vlastnosť produktu'], ['flexible', 'Nemám preferenciu', 'Stačí základná voľba']],
  lips: [['color', 'Farba', 'Rúž ako hlavný cieľ'], ['hydration', 'Hydratácia', 'Komfort pier počas dňa'], ['matte', 'Matný vzhľad', 'Matnejšie prevedenie'], ['flexible', 'Nemám preferenciu', 'Stačí univerzálna voľba']],
};

const formatsByArea = {
  face: [['daily-cream', 'Denný krém', 'Najmä do rannej rutiny'], ['rich-cream', 'Výživnejší krém', 'Plnšia krémová starostlivosť'], ['sensitive-cream', 'Pre citlivú pleť', 'Len overené určenie pre citlivú pleť'], ['cream', 'Krém bez preferencie', 'Nech rozhodne hlavný cieľ']],
  hair: [['dry-shampoo', 'Suchý šampón', 'Osvieženie bez umývania'], ['solid-shampoo', 'Tuhý šampúch', 'Na samotné umytie vlasov'], ['powder', 'Práškový formát', 'Suchý šampón v prášku'], ['flexible', 'Bez preferencie', 'Nech rozhodne účel']],
  body: [['natural-deodorant', 'Prírodný deodorant', 'Deodorant, nie antiperspirant'], ['paper-packaging', 'Papierový obal', 'Overený papierový obal produktu'], ['fresh-scent', 'Svieža vôňa', 'Sviežejší profil produktu'], ['flexible', 'Bez preferencie', 'Nech rozhodne hlavný cieľ']],
  lips: [['lip-pencil', 'Ceruzka', 'Presná aplikácia'], ['matte', 'Matný vzhľad', 'Matnejšie prevedenie'], ['six-shades', 'Viac odtieňov', 'Produkt je v šiestich odtieňoch'], ['hydrating-lip', 'Komfort pier', 'Hydratácia je súčasťou popisu produktu']],
};

const timingsByArea = {
  face: [['morning', 'Ráno', 'Súčasť rannej rutiny'], ['evening', 'Večer', 'Večerná krémová starostlivosť'], ['daily', 'Ráno aj večer', 'Pravidelná rutina'], ['as-needed', 'Podľa potreby', 'Bez pevného času']],
  hair: [['as-needed', 'Medzi umytiami', 'Rýchle osvieženie'], ['wash-day', 'Pri umývaní', 'Klasické umytie vlasov'], ['travel', 'Na cesty', 'Len produkty s podloženým travel použitím'], ['flexible', 'Je mi to jedno', 'Nech rozhodne formát']],
  body: [['morning', 'Ráno', 'Začiatok dňa'], ['daily', 'Každý deň', 'Pravidelná rutina'], ['as-needed', 'Podľa potreby', 'Flexibilné použitie'], ['flexible', 'Je mi to jedno', 'Nech rozhodne účel']],
  lips: [['daily', 'Počas dňa', 'Bežné denné použitie'], ['as-needed', 'Podľa potreby', 'Keď chcete farbu alebo komfort'], ['occasional', 'Príležitostne', 'Nie každý deň'], ['flexible', 'Je mi to jedno', 'Nech rozhodne cieľ']],
};

const toOptions = (rows) => rows.map(([value, label, detail]) => ({ value, label, detail }));

export function getPonioQuestion(step, answers = {}) {
  const area = answers.area || 'face';
  if (step === 0) return { key: 'area', title: 'Čo dnes vyberáte?', hint: 'Najprv oddelíme časť katalógu. Ostatné oblasti sa do výsledku nedostanú.', options: toOptions(areaOptions) };
  if (step === 1) return { key: 'goal', title: 'Čo je pre vás najdôležitejšie?', hint: 'Možnosti sa menia podľa zvolenej oblasti.', options: toOptions(goalsByArea[area] || goalsByArea.face) };
  if (step === 2) return { key: 'format', title: area === 'face' || area === 'hair' ? 'Aký formát vám dáva zmysel?' : 'Čo je pre vás pri produkte dôležité?', hint: area === 'hair' ? 'Rozlišujeme suchý šampón od šampúchu na umývanie.' : 'Používame iba vlastnosti uvedené pri overenom produkte.', options: toOptions(formatsByArea[area] || formatsByArea.face) };
  return { key: 'timing', title: 'Kedy ho chcete používať?', hint: area === 'hair' ? 'Cestovanie zohľadníme iba pri produktoch, kde ho PONIO uvádza.' : 'Posledný krok pomôže zoradiť produkty v rovnakej oblasti.', options: toOptions(timingsByArea[area] || timingsByArea.face) };
}

const WEIGHTS = { goal: 10, format: 8, timing: 5, sensitivity: 12 };
const AREA_LABELS = { face: 'pleť', hair: 'vlasy', body: 'telo', lips: 'pery' };
const TRAIT_LABELS = {
  protect: 'denná ochrana', hydration: 'hydratácia', mature: 'zrelá pleť', sensitive: 'citlivá pleť',
  refresh: 'osvieženie medzi umytiami', wash: 'umývanie vlasov', solid: 'tuhý formát', freshness: 'sviežosť', deodorant: 'deodorant', color: 'farba', matte: 'matný vzhľad',
  'daily-cream': 'denný krém', 'rich-cream': 'výživnejší krém', 'sensitive-cream': 'krém pre citlivú pleť', cream: 'krém',
  'dry-shampoo': 'suchý šampón', 'solid-shampoo': 'tuhý šampúch', powder: 'práškový formát', 'solid-deodorant': 'prírodný deodorant', 'natural-deodorant': 'prírodný deodorant', 'paper-packaging': 'papierový obal', 'fresh-scent': 'svieža vôňa',
  'lip-pencil': 'rúž v ceruzke', 'six-shades': 'šesť odtieňov', 'hydrating-lip': 'komfort a hydratácia pier',
  morning: 'ranné použitie', evening: 'večerné použitie', daily: 'každodenné použitie', 'as-needed': 'použitie podľa potreby', 'wash-day': 'použitie pri umývaní', travel: 'použitie na cestách', occasional: 'príležitostné použitie',
};

function matches(product, key, value) {
  if (!value || value === 'flexible') return false;
  if (key === 'goal') return product.goals.includes(value);
  if (key === 'format') return product.formats.includes(value);
  if (key === 'timing') return product.timings.includes(value);
  return false;
}

export function rankPonioProducts(answers, products = ponioProducts) {
  const area = answers?.area;
  if (!area) return [];
  const eligible = products.filter((product) => product.area === area);
  return eligible.map((product, index) => {
    let score = 0;
    const matched = [];
    for (const key of ['goal', 'format', 'timing']) {
      const value = answers[key];
      if (!value || value === 'flexible') continue;
      if (matches(product, key, value)) {
        score += WEIGHTS[key];
        matched.push(value);
      } else {
        score -= key === 'goal' ? 2 : 1;
      }
    }
    if (answers.goal === 'sensitive') {
      if (product.sensitivity.includes('sensitive')) { score += WEIGHTS.sensitivity; if (!matched.includes('sensitive')) matched.push('sensitive'); }
      else score -= WEIGHTS.sensitivity;
    }
    return { product, score, matched, order: index };
  }).sort((a, b) => b.score - a.score || a.order - b.order || a.product.id.localeCompare(b.product.id));
}

export function choosePonioRecommendation(answers) {
  const ranked = rankPonioProducts(answers);
  if (!ranked.length) return null;
  const primary = ranked[0];
  const alternative = ranked.find(({ product }) => product.id !== primary.product.id) || null;
  const areaLabel = AREA_LABELS[answers.area] || 'zvolená oblasť';
  const matchLabels = primary.matched.map((value) => TRAIT_LABELS[value]).filter(Boolean);
  const reason = matchLabels.length
    ? `Zostáva presne v oblasti ${areaLabel} a najviac sa zhoduje s tým, čo ste vybrali: ${matchLabels.join(', ')}.`
    : `Zostáva presne v oblasti ${areaLabel}. Z overených produktov PONIO v tejto oblasti je pri vašich neutrálnych voľbách najvyššie v stabilnom poradí katalógu.`;
  return { product: primary.product, alternative: alternative?.product || null, reason, score: primary.score, matched: primary.matched };
}

export const ponioQuickQuestions = [
  'Aký je rozdiel medzi suchým šampónom a šampúchom?',
  'Čo z PONIO na citlivú pleť?',
  'Lumina shield alebo Healthy aging?',
  'Čo je vhodné na cesty?',
];

function normalize(text) {
  return String(text || '').toLocaleLowerCase('sk').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function ponioFallbackReply(messagesOrText) {
  const messages = Array.isArray(messagesOrText) ? messagesOrText : [{ role: 'user', content: String(messagesOrText || '') }];
  const userMessages = messages.filter((message) => message.role === 'user').map((message) => message.content || message.text || '');
  const latest = normalize(userMessages.at(-1));
  const context = normalize(userMessages.slice(-4).join(' '));

  if (/diagn|ekzem|dermatit|psoria|rosace|infek|alerg|liec|vylie[cč]|terapi|lekar|dermatol/.test(latest)) return 'Pri zdravotnom probléme nebudem robiť diagnózu ani sľubovať liečbu. Viem pomôcť iba s výberom kozmetiky podľa overeného určenia produktu; pri pretrvávajúcich alebo výrazných ťažkostiach je vhodná konzultácia s lekárom alebo dermatológom.';
  if (/suchy sampon|suchym sampon|sampuch|tuhy sampon|rozdiel/.test(context) && /rozdiel|such|sampuch|tuh/.test(latest)) return 'Suchý šampón Mint alebo Banán & kokos je práškový produkt na osvieženie vlasov medzi umytiami. Dvojitá levanduľa je tuhý šampúch na samotné umývanie vlasov — teda nenahrádza ten istý krok rutiny.';
  if (/lumina/.test(latest) && /healthy|aging/.test(context)) return 'Lumina shield je denný ochranný pleťový krém do rannej rutiny. Healthy aging je krém pre zrelú pleť a PONIO ho uvádza na dennú aj večernú starostlivosť.';
  if (/lumina/.test(latest)) return 'Lumina shield je denný ochranný pleťový krém za 25,30 €. PONIO ho uvádza pre všetky typy pleti a do rannej rutiny, aj pod SPF alebo make-up.';
  if (/healthy|aging|zrel/.test(latest)) return 'Healthy aging je pleťový krém pre zrelú pleť za 25,30 €. PONIO ho uvádza pre pravidelnú dennú aj večernú starostlivosť.';
  if (/vanilk|citliv/.test(latest)) return 'Ak je dôležitá citlivá pleť, v overenom katalógu je Vanilka & kokos za 13,00 €, ktorý PONIO výslovne uvádza pre citlivú, normálnu až suchšiu pleť. Pri alergii alebo zdravotnom probléme však produktový chatbot nenahrádza odbornú radu.';
  if (/mint/.test(latest)) return 'Mint je suchý šampón za 7,70 € na osvieženie vlasov medzi umytiami. Pri tomto produkte PONIO priamo uvádza aj praktické použitie na cestách.';
  if (/banan|kokos/.test(latest) && /sampon|vlas|such/.test(context)) return 'Banán & kokos je suchý šampón za 7,70 € — prášková vlasová starostlivosť medzi klasickými umytiami.';
  if (/dvojit|levand|zihlav|sampuch/.test(latest)) return 'Dvojitá levanduľa je žihľavový šampúch od 4,70 €. Je to tuhý produkt na samotné umývanie vlasov; PONIO pri šampúchu uvádza kompaktnosť a praktické použitie na cestách.';
  if (/cest|travel/.test(latest)) return 'Travel použitie nechcem pripisovať celému sortimentu. PONIO ho priamo uvádza pri suchom šampóne Mint a pri kompaktnom tuhom šampúchu Dvojitá levanduľa.';
  if (/pery|ruz|balzam/.test(latest)) return 'PONIO má samostatnú kategóriu pier. V tomto overenom výbere je Rúž na pery v ceruzke za 8,30 € v šiestich odtieňoch; PONIO pri ňom uvádza hydratáciu a matný vzhľad.';
  if (/telo|deodor|dezodor/.test(latest)) return 'V telovej starostlivosti je napríklad Fresh air za 9,30 €. Je to prírodný deodorant, nie antiperspirant; patrí do kategórie Telo, nie do pleťovej ani vlasovej rutiny.';
  if (/vlas|sampon|sampuch/.test(latest)) return 'Pri vlasoch najprv rozlíšte účel: suchý šampón Mint alebo Banán & kokos osviežuje medzi umytiami, kým Dvojitá levanduľa je tuhý šampúch na samotné umytie.';
  if (/plet|krem|tvar/.test(latest)) return 'Pri pleti viem porovnať Lumina shield, Healthy aging a Vanilka & kokos podľa cieľa rutiny. Ak mi poviete, či riešite dennú ochranu, zrelú alebo citlivú pleť, zúžim výber bez miešania vlasových produktov.';
  return 'PONIO má oddelenú starostlivosť o pleť, vlasy, telo a pery. Napíšte oblasť alebo konkrétny názov produktu; prípadne použite Výber starostlivosti, ktorý najprv uzamkne správnu časť katalógu.';
}
