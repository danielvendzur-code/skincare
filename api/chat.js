const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CHAT_MODEL || 'claude-haiku-4-5';
const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_CHARS = 700;
const PROVIDER_TIMEOUT_MS = 5500;

const MYLO_DETAILS = [
  {
    id: 'inovat', aliases: ['inovat', 'inovať'], name: 'Hydratačné sérum INOVAŤ', role: 'hydratačné sérum',
    summary: 'ľahké hydrogélové sérum za 19,00 €; MYLO ho odporúča na normálnu až mastnú pleť a na každodenné použitie ráno aj večer'
  },
  {
    id: 'moissanit', aliases: ['moissanit'], name: 'Čistiace a odličovacie mlieko MOISSANIT', role: 'čistenie',
    summary: 'čistiace a odličovacie mlieko za 20,00 € pre všetky typy pleti vrátane citlivej a aj na oči'
  },
  {
    id: 'flora', aliases: ['flora', 'flóra'], name: 'Pleťový olej FLÓRA', role: 'olejové sérum',
    summary: 'olejové sérum pre suchú a citlivú pleť; v katalógu má viac veľkostí od 2,50 € a MYLO uvádza použitie 1 až 2-krát denne'
  },
  {
    id: 'kvetova-rosa', aliases: ['kvetova rosa', 'kvetová rosa', 'rosa'], name: 'Pleťová voda KVETOVÁ ROSA', role: 'tonikum',
    summary: 'tonikum za 22,00 € na podporu hydratácie; MYLO ho odporúča aplikovať tesne pred pleťovým olejom'
  },
  {
    id: 'radost', aliases: ['radost', 'radosť'], name: 'Ceramidový krém s vitamínmi RADOSŤ', role: 'pleťový krém',
    summary: 'ceramidový krém za 14,75 €; MYLO ho opisuje cez hydratáciu a regeneráciu a uvádza použitie ráno aj večer'
  }
];

const BRANDS = {
  mylo: {
    name: 'MYLO',
    products: MYLO_DETAILS.map((product) => product.name),
    context: [
      'INOVAŤ je ľahké hydrogélové sérum na normálnu až mastnú pleť, ráno aj večer.',
      'MOISSANIT je čistiace a odličovacie mlieko pre všetky typy pleti vrátane citlivej a oči.',
      'FLÓRA je olejové sérum pre suchú a citlivú pleť.',
      'KVETOVÁ ROSA je tonikum, ktoré MYLO odporúča tesne pred pleťovým olejom.',
      'RADOSŤ je ceramidový krém, ktorý MYLO uvádza na ráno aj večer.'
    ].join(' '),
    fallback: {
      hydration: 'Ak hľadáte hydratáciu, v aktuálnom výbere MYLO je prirodzeným smerom sérum INOVAŤ alebo krém RADOSŤ podľa toho, či chcete ľahší krok alebo krémovú starostlivosť.',
      cleanse: 'Na jemný čistiaci krok je v tomto výbere MYLO čistiace a odličovacie mlieko MOISSANIT. MYLO ho uvádza pre všetky typy pleti vrátane citlivej a aj na oči.',
      oil: 'Ak preferujete olejovú textúru a máte suchú alebo citlivú pleť, v aktuálnom výbere je pleťový olej FLÓRA. KVETOVÁ ROSA je samostatný tonizačný krok tesne pred olejom.',
      serum: 'INOVAŤ je ľahké hydrogélové sérum. Ak namiesto séra chcete krémovú textúru, porovnajte ho s ceramidovým krémom RADOSŤ.',
      default: 'Pri MYLO vieme výber zúžiť podľa typu produktu, textúry a toho, čo chcete zaradiť do rutiny. Môžete sa opýtať na čistenie, hydratáciu, citlivú pleť, rannú či večernú rutinu alebo porovnať dva konkrétne produkty.'
    }
  },
  ponio: {
    name: 'PONIO',
    products: [
      'Lumina shield — denný ochranný pleťový krém',
      'Healthy aging — pleťový krém pre zrelú pleť',
      'Mint — suchý šampón',
      'Banán & kokos — suchý šampón',
      'Dvojitá levanduľa — žihľavový šampúch'
    ],
    fallback: {
      hair: 'Pri vlasoch záleží, či chcete rýchle osvieženie medzi umytiami alebo produkt na samotné umývanie. V aktuálnom výbere PONIO sú suché šampóny Mint a Banán & kokos a tuhý šampúch Dvojitá levanduľa.',
      face: 'Pri pleťovej starostlivosti sú v aktuálnom výbere PONIO napríklad Lumina shield a Healthy aging. Výber starostlivosti ich zúži podľa toho, aký typ krému a rutiny hľadáte.',
      default: 'PONIO má v tomto deme pleťovú aj vlasovú starostlivosť. Najprv vyberte oblasť a potom formát, aby odporúčanie zostalo v správnej časti katalógu.'
    }
  },
  two: {
    name: 'TWO COSMETICS',
    products: [
      'HA⁶ HYDRATATION BOOSTER SERUM',
      'BAKUCHIOL 1 % ANTI-AGE SERUM',
      'Hydratačný krém',
      'Krém pre problematickú pleť',
      'AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID'
    ],
    fallback: {
      hydration: 'Ak je prioritou hydratácia, v aktuálnom výbere TWO COSMETICS sú HA⁶ HYDRATATION BOOSTER SERUM a Hydratačný krém. Rozdiel je najmä vo formáte — sérum verzus krém.',
      cleanse: 'Na čistiaci krok je v aktuálnom výbere AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID. Pri otázkach o tolerancii alebo zdravotnom stave nebudem robiť diagnózu; poradím len v rámci výberu kozmetiky.',
      serum: 'Ak chcete sérum, aktuálny výber obsahuje HA⁶ hydratačné sérum a BAKUCHIOL 1 % sérum. Výber starostlivosti ich rozlíši podľa preferovaného cieľa a rutiny.',
      default: 'Pri TWO COSMETICS vieme výber zúžiť podľa úlohy produktu, textúry a preferencie rutiny. Odporúčanie zostane iba medzi produktmi overenými v aktuálnom katalógu dema.'
    }
  },
  bellcoria: {
    name: 'BELLCORIA',
    products: [
      'Organický opunciový olej',
      'Elixír proti vráskam s bakuchiolom',
      'Pleťový čistiaci gél',
      'Nočný elixír s vitamínom C a brusnicovým olejom',
      'Telový olej s astaxantínom'
    ],
    fallback: {
      cleanse: 'Ak hľadáte ľahký čistiaci krok, v aktuálnom výbere Bellcoria je Pleťový čistiaci gél. Oleje a elixíry patria do iného typu starostlivosti, preto ich poradca od čistenia oddeľuje.',
      oil: 'Pri olejovej starostlivosti vieme rozlíšiť pleťový olej, večerný elixír a telový olej podľa oblasti a preferovanej rutiny. Výber starostlivosti potom zostane v správnej kategórii.',
      default: 'Bellcoria má v tomto deme čistenie, pleťové oleje, elixíry aj telový olej. Najprv vyberieme oblasť a typ produktu, potom konkrétnu textúru alebo rutinu.'
    }
  },
  biofy: {
    name: 'BIOFY',
    products: [
      'Hydratačný krém na suchú a citlivú pleť 60 ml',
      'Výživný krém na normálnu a zmiešanú pleť 60 ml',
      'Konopný krém na suchú a problematickú pleť 50 ml',
      'Vlasové tonikum na rast vlasov s rozmarínom 100 ml',
      'Ošetrujúci olejček na vlasy — 9 vzácnych olejov 50 ml'
    ],
    fallback: {
      hair: 'Pri vlasovej starostlivosti sú v aktuálnom výbere BIOFY vlasové tonikum s rozmarínom a ošetrujúci olejček. Neviem garantovať zdravotný ani rastový účinok; môžem pomôcť iba s výberom podľa formátu a rutiny.',
      face: 'Pri pleti vieme v BIOFY rozlíšiť krémy podľa overeného určenia pre suchú/citlivú alebo normálnu/zmiešanú pleť. Výber starostlivosti udrží odporúčanie iba medzi pleťovými produktmi.',
      default: 'BIOFY v tomto deme kombinuje pleťovú a vlasovú starostlivosť. Najprv vyberieme oblasť, aby sa pleťový produkt nikdy nemiešal s vlasovým odporúčaním.'
    }
  },
  anemone: {
    name: 'ANEMONE',
    products: [
      'Kvetová voda Ruža damascénska',
      'Kvetová voda Harmanček',
      'Pleťový olej na zrelú pleť',
      'Balzam na pery Mandarínka & grep',
      'Tuhý šampón Šalvia & levanduľa'
    ],
    fallback: {
      hair: 'Na vlasovú starostlivosť je v aktuálnom výbere ANEMONE tuhý šampón Šalvia & levanduľa. Kvetové vody, pleťový olej a balzam patria do iných produktových rolí.',
      oil: 'Ak preferujete olejový pleťový krok, v aktuálnom výbere ANEMONE je Pleťový olej na zrelú pleť. Pri ľahšom vodnom formáte sú v deme kvetové vody.',
      default: 'ANEMONE má v tomto deme kvetové vody, pleťový olej, balzam na pery a tuhý šampón. Výber starostlivosti najprv rozlíši produktovú rolu a až potom konkrétnu preferenciu.'
    }
  }
};

const MEDICAL_PATTERN = /diagn[oó]z|ekz[eé]m|dermatit|psori|rosace|infek|alergi|opuch|krvác|hnis|siln.{0,12}boles|vyr[aá]žk|lie[cč]i|vylie[cč]|terapi|lek[aá]r|dermatol/i;

function setCors(request, response) {
  const origin = request.headers?.origin || '';
  const allowed = origin === '' || /(^https:\/\/([a-z0-9-]+\.)?mojchatbot\.sk$)|(^https:\/\/.*\.vercel\.app$)|(^http:\/\/localhost:\d+$)|(^http:\/\/127\.0\.0\.1:\d+$)/i.test(origin);
  response.setHeader('Access-Control-Allow-Origin', allowed && origin ? origin : 'https://mojchatbot.sk');
  response.setHeader('Vary', 'Origin');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function parseBody(request) {
  if (typeof request.body === 'string') return JSON.parse(request.body);
  if (request.body && typeof request.body === 'object') return request.body;
  return {};
}

function normalizeMessages(body) {
  if (Array.isArray(body.messages)) {
    return body.messages
      .filter((message) => message && (message.role === 'user' || message.role === 'assistant'))
      .slice(-MAX_HISTORY_MESSAGES)
      .map((message) => ({
        role: message.role,
        content: String(message.content || '').slice(0, MAX_MESSAGE_CHARS).trim()
      }))
      .filter((message) => message.content.length > 0);
  }

  const legacyMessage = String(body.message || '').slice(0, MAX_MESSAGE_CHARS).trim();
  return legacyMessage ? [{ role: 'user', content: legacyMessage }] : [];
}

function normalizeSearchText(text) {
  return String(text || '').toLocaleLowerCase('sk').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function myloDeterministicReply(latestMessage, messages) {
  const query = normalizeSearchText(latestMessage);
  const conversation = normalizeSearchText(messages.filter((message) => message.role === 'user').slice(-6).map((message) => message.content).join(' '));
  const mentioned = MYLO_DETAILS.filter((product) => product.aliases.some((alias) => conversation.includes(normalizeSearchText(alias))));

  if (/porovn|rozdiel|versus|\bvs\b/.test(query) && mentioned.length >= 2) {
    const [first, second] = mentioned.slice(-2);
    return `${first.name}: ${first.summary}. ${second.name}: ${second.summary}. Nie sú automaticky zameniteľné — jeden je ${first.role}, druhý ${second.role}; vyberte podľa toho, ktorý krok rutiny chcete riešiť.`;
  }

  if (/rann|rano/.test(query)) {
    return 'Ak chcete jednoduchú rannú rutinu iba z tohto výberu MYLO, čistiaci krok môže tvoriť MOISSANIT a potom si podľa textúry vyberte ľahké INOVAŤ alebo krém RADOSŤ. MYLO pri INOVAŤ aj RADOSŤ uvádza ranné použitie.';
  }

  if (/vecer|vecern/.test(query)) {
    return 'Na večer sa z tohto výberu dá zostaviť krátka rutina: MOISSANIT na čistenie a potom podľa preferencie RADOSŤ alebo FLÓRA. KVETOVÁ ROSA je podľa MYLO tonikum tesne pred pleťovým olejom.';
  }

  if (/citliv/.test(query)) {
    return 'Pri citlivej pleti sú v tomto výbere najjasnejšie katalógové zhody MOISSANIT na jemné čistenie a FLÓRA ako olejový krok pre suchú a citlivú pleť. KVETOVÚ ROSU MYLO tiež uvádza medzi vhodnými typmi pleti pre citlivú pokožku.';
  }

  if (/čist|cist|odli[cč]|mlieko/.test(query)) return BRANDS.mylo.fallback.cleanse;
  if (/hydrat|such.{0,8}ple|dehydrat/.test(query)) return BRANDS.mylo.fallback.hydration;
  if (/s[eé]rum|serum|inovat|inovať/.test(query)) return BRANDS.mylo.fallback.serum;
  if (/olej|flora|flóra/.test(query)) return BRANDS.mylo.fallback.oil;
  if (/kvetov|tonik|ple[ťt]ov.{0,8}vod/.test(query)) return MYLO_DETAILS[3].summary + '.';
  if (/radost|radosť|ceramid|kr[eé]m/.test(query)) return MYLO_DETAILS[4].summary + '.';

  return BRANDS.mylo.fallback.default;
}

function deterministicReply(brand, latestMessage, messages) {
  const query = String(latestMessage || '').toLocaleLowerCase('sk');

  if (MEDICAL_PATTERN.test(query)) {
    return 'S diagnózou ani liečbou vám cez produktový chatbot nepomôžem. Môžem zúžiť výber kozmetiky podľa formátu a preferencií; pri výrazných, pretrvávajúcich alebo zhoršujúcich sa ťažkostiach je vhodné obrátiť sa na lekára alebo dermatológa.';
  }

  if (brand.name === 'MYLO') return myloDeterministicReply(latestMessage, messages);

  if (/porovn|rozdiel|versus| vs\.? /.test(query)) {
    return `Môžem porovnať produkty ${brand.name} podľa ich overeného typu, textúry a úlohy v rutine. Napíšte názvy dvoch produktov, ktoré chcete porovnať, a zostanem iba pri údajoch z aktuálneho katalógu.`;
  }

  if (/vlas|šamp[oó]n|sampon|tonik|olej[cč]ek/.test(query) && brand.fallback.hair) return brand.fallback.hair;
  if (/čist|cist|odli[cč]|gel/.test(query) && brand.fallback.cleanse) return brand.fallback.cleanse;
  if (/hydrat|such.{0,8}ple|dehydrat/.test(query) && brand.fallback.hydration) return brand.fallback.hydration;
  if (/s[eé]rum|serum/.test(query) && brand.fallback.serum) return brand.fallback.serum;
  if (/olej|elix[ií]r/.test(query) && brand.fallback.oil) return brand.fallback.oil;
  if (/ple[ťt]|kr[eé]m|tvar/.test(query) && brand.fallback.face) return brand.fallback.face;

  return brand.fallback.default;
}

function buildSystemPrompt(brand) {
  return [
    `Ste stručný produktový poradca pre kozmetickú značku ${brand.name}.`,
    `Produkty, ktoré smiete v tomto deme odporúčať: ${brand.products.join('; ')}.`,
    brand.context ? `Overený katalógový kontext: ${brand.context}` : '',
    'Odpovedajte prirodzenou, jednoduchou a gramaticky správnou slovenčinou, zvyčajne v 2 až 4 krátkych vetách.',
    'Nevymýšľajte produkty, ceny, dostupnosť, zloženie, certifikácie, účinky ani tvrdenia, ktoré nemáte v poskytnutom katalógovom kontexte.',
    'Nevykonávajte zdravotnú diagnózu a netvrďte, že kozmetika lieči alebo vylieči zdravotný stav.',
    'Ak používateľ opisuje výrazný, pretrvávajúci alebo zdravotný problém, jasne oddeľte kozmetický výber od zdravotnej rady a odporučte odbornú zdravotnú konzultáciu.',
    'Pri nejasnej požiadavke položte najviac jednu krátku doplňujúcu otázku alebo odporučte Výber starostlivosti.',
    'Pri porovnaní nadväzujte na predchádzajúce správy v konverzácii a porovnávajte iba produkty z povoleného zoznamu.'
  ].filter(Boolean).join('\n');
}

export default async function handler(request, response) {
  setCors(request, response);
  response.setHeader('Cache-Control', 'no-store');

  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  let body;
  try {
    body = parseBody(request);
  } catch {
    return response.status(400).json({ error: 'Invalid JSON body' });
  }

  const slug = String(body.brand || '').toLocaleLowerCase('en').trim();
  const brand = BRANDS[slug];
  if (!brand) return response.status(400).json({ error: 'Unknown brand' });

  const messages = normalizeMessages(body);
  const latestMessage = [...messages].reverse().find((message) => message.role === 'user')?.content || '';
  if (!latestMessage) return response.status(400).json({ error: 'Missing user message' });

  const fallback = () => response.status(200).json({
    reply: deterministicReply(brand, latestMessage, messages),
    fallback: true
  });

  if (!ANTHROPIC_API_KEY) return fallback();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 260,
        system: buildSystemPrompt(brand),
        messages
      })
    });

    if (!upstream.ok) return fallback();

    const data = await upstream.json();
    const reply = Array.isArray(data.content)
      ? data.content.find((block) => block?.type === 'text' && typeof block.text === 'string')?.text?.trim()
      : '';

    if (!reply) return fallback();
    return response.status(200).json({ reply, fallback: false });
  } catch {
    return fallback();
  } finally {
    clearTimeout(timeout);
  }
}
