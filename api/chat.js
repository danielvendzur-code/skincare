const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CHAT_MODEL || 'claude-haiku-4-5';
const MAX_HISTORY_MESSAGES = 10;
const MAX_MESSAGE_CHARS = 700;
const PROVIDER_TIMEOUT_MS = 5500;

const BRANDS = {
  mylo: {
    name: 'MYLO',
    products: ['Hydratačné sérum INOVAŤ','Čistiace a odličovacie mlieko MOISSANIT','Pleťový olej FLÓRA','Pleťová voda KVETOVÁ ROSA','Ceramidový krém s vitamínmi RADOSŤ'],
    fallback: {
      hydration: 'Ak hľadáte hydratáciu, v aktuálnom výbere MYLO je prirodzeným smerom sérum INOVAŤ alebo krém RADOSŤ podľa toho, či chcete ľahší krok alebo krémovú starostlivosť.',
      cleanse: 'Na jemný čistiaci krok je v tomto výbere MYLO čistiace a odličovacie mlieko MOISSANIT. Ak chcete potom doplniť ďalší krok rutiny, Výber starostlivosti ho zúži podľa textúry.',
      oil: 'Ak preferujete olejovú textúru, v aktuálnom výbere je pleťový olej FLÓRA. Pri ľahšej textúre má väčší zmysel sérum alebo pleťová voda.',
      default: 'Pri MYLO vieme výber zúžiť podľa typu produktu, textúry a toho, čo chcete zaradiť do rutiny. Výber starostlivosti potom odporučí konkrétny produkt z aktuálneho katalógu.'
    }
  },
  ponio: {
    name: 'PONIO',
    products: ['Lumina shield — denný ochranný pleťový krém','Healthy aging — pleťový krém pre zrelú pleť','Mint — suchý šampón','Banán & kokos — suchý šampón','Dvojitá levanduľa — žihľavový šampúch'],
    fallback: {
      hair: 'Pri vlasoch záleží, či chcete rýchle osvieženie medzi umytiami alebo produkt na samotné umývanie. V aktuálnom výbere PONIO sú suché šampóny Mint a Banán & kokos a tuhý šampúch Dvojitá levanduľa.',
      face: 'Pri pleťovej starostlivosti sú v aktuálnom výbere PONIO napríklad Lumina shield a Healthy aging. Výber starostlivosti ich zúži podľa toho, aký typ krému a rutiny hľadáte.',
      default: 'PONIO má v tomto deme pleťovú aj vlasovú starostlivosť. Najprv vyberte oblasť a potom formát, aby odporúčanie zostalo v správnej časti katalógu.'
    }
  },
  two: {
    name: 'TWO COSMETICS',
    products: ['HA⁶ HYDRATATION BOOSTER SERUM','BAKUCHIOL 1 % ANTI-AGE SERUM','Hydratačný krém','Krém pre problematickú pleť','AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID'],
    fallback: {
      hydration: 'Ak je prioritou hydratácia, v aktuálnom výbere TWO COSMETICS sú HA⁶ HYDRATATION BOOSTER SERUM a Hydratačný krém. Rozdiel je najmä vo formáte — sérum verzus krém.',
      cleanse: 'Na čistiaci krok je v aktuálnom výbere AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID. Pri otázkach o tolerancii alebo zdravotnom stave nebudem robiť diagnózu; poradím len v rámci výberu kozmetiky.',
      serum: 'Ak chcete sérum, aktuálny výber obsahuje HA⁶ hydratačné sérum a BAKUCHIOL 1 % sérum. Výber starostlivosti ich rozlíši podľa preferovaného cieľa a rutiny.',
      default: 'Pri TWO COSMETICS vieme výber zúžiť podľa úlohy produktu, textúry a preferencie rutiny. Odporúčanie zostane iba medzi produktmi overenými v aktuálnom katalógu dema.'
    }
  },
  bellcoria: {
    name: 'BELLCORIA',
    products: ['Organický opunciový olej','Elixír proti vráskam s bakuchiolom','Pleťový čistiaci gél','Nočný elixír s vitamínom C a brusnicovým olejom','Telový olej s astaxantínom'],
    fallback: {
      cleanse: 'Ak hľadáte ľahký čistiaci krok, v aktuálnom výbere Bellcoria je Pleťový čistiaci gél. Oleje a elixíry patria do iného typu starostlivosti, preto ich poradca od čistenia oddeľuje.',
      oil: 'Pri olejovej starostlivosti vieme rozlíšiť pleťový olej, večerný elixír a telový olej podľa oblasti a preferovanej rutiny. Výber starostlivosti potom zostane v správnej kategórii.',
      default: 'Bellcoria má v tomto deme čistenie, pleťové oleje, elixíry aj telový olej. Najprv vyberieme oblasť a typ produktu, potom konkrétnu textúru alebo rutinu.'
    }
  },
  biofy: {
    name: 'BIOFY',
    products: ['Hydratačný krém na suchú a citlivú pleť 60 ml','Výživný krém na normálnu a zmiešanú pleť 60 ml','Konopný krém na suchú a problematickú pleť 50 ml','Vlasové tonikum na rast vlasov s rozmarínom 100 ml','Ošetrujúci olejček na vlasy — 9 vzácnych olejov 50 ml'],
    fallback: {
      hair: 'Pri vlasovej starostlivosti sú v aktuálnom výbere BIOFY vlasové tonikum s rozmarínom a ošetrujúci olejček. Neviem garantovať zdravotný ani rastový účinok; môžem pomôcť iba s výberom podľa formátu a rutiny.',
      face: 'Pri pleti vieme v BIOFY rozlíšiť krémy podľa overeného určenia pre suchú/citlivú alebo normálnu/zmiešanú pleť. Výber starostlivosti udrží odporúčanie iba medzi pleťovými produktmi.',
      default: 'BIOFY v tomto deme kombinuje pleťovú a vlasovú starostlivosť. Najprv vyberieme oblasť, aby sa pleťový produkt nikdy nemiešal s vlasovým odporúčaním.'
    }
  },
  anemone: {
    name: 'ANEMONE',
    products: ['Kvetová voda Ruža damascénska','Kvetová voda Harmanček','Pleťový olej na zrelú pleť','Balzam na pery Mandarínka & grep','Tuhý šampón Šalvia & levanduľa'],
    catalogContext: [
      'Kvetová voda Ruža damascénska: kvetová voda, cena 5,30 €.',
      'Kvetová voda Harmanček: kvetová voda, 100 ml; na oficiálnom webe je zachytená akciová cena 4,00 € z 5,00 €.',
      'Pleťový olej na zrelú pleť: pleťový olej, 30 ml, sklenená fľaška s pipetou, cena 8,90 €; výrobca uvádza aplikáciu na čistú a jemne vlhkú pleť a kombináciu s kvetovou vodou.',
      'Balzam na pery Mandarínka & grep: balzam na pery, cena 3,70 €.',
      'Tuhý šampón Šalvia & levanduľa: tuhý vlasový produkt na umývanie vlasov, cena 7,00 €.'
    ].join(' '),
    fallback: {
      hair: 'Tuhý šampón Šalvia & levanduľa je vlasový produkt za 7,00 €. Je to tuhý formát na umývanie vlasov; kvetové vody ani pleťový olej sa pri vlasovej voľbe do odporúčania nedostanú.',
      oil: 'Pleťový olej na zrelú pleť je 30 ml olej s pipetou za 8,90 €. Výrobca ho uvádza na čistú, jemne vlhkú pleť a ako vhodnú kombináciu spomína kvetovú vodu.',
      lip: 'Balzam na pery Mandarínka & grep je samostatná starostlivosť o pery za 3,70 €. Pri voľbe balzamu poradca nevráti pleťový olej ani kvetovú vodu.',
      water: 'Ruža damascénska a Harmanček sú v tomto katalógu dve samostatné kvetové vody. Porovnávam ich ako rovnakú produktovú rolu, nie ako náhradu pleťového oleja.',
      routine: 'Pre jednoduchú pleťovú dvojicu môžete zaradiť kvetovú vodu po čistení a následne pleťový olej, ak vám sedí jeho určenie pre zrelú pleť. Balzam ostáva na pery a tuhý šampón vo vlasovej rutine.',
      default: 'ANEMONE má v tomto deme dve kvetové vody, pleťový olej, balzam na pery a tuhý šampón. Výber starostlivosti najprv uzamkne produktovú rolu a až potom zohľadní formát a miesto v rutine.'
    }
  }
};

const MEDICAL_PATTERN = /diagn[oó]z|ekz[eé]m|dermatit|psori|rosace|infek|alergi|opuch|krvác|hnis|siln.{0,12}boles|vyr[aá]žk|lie[cč]i|vylie[cč]|terapi|lek[aá]r|dermatol/i;

function setCors(request, response) {
  const origin = request.headers?.origin || '';
  const allowed = origin === '' || /(^https:\/\/([a-z0-9-]+\.)?mojchatbot\.sk$)|(^https:\/\/.*\.vercel\.app$)|(^http:\/\/localhost:\d+$)|(^http:\/\/127\.0\.0\.1:\d+$)/i.test(origin);
  response.setHeader?.('Access-Control-Allow-Origin', allowed && origin ? origin : 'https://mojchatbot.sk');
  response.setHeader?.('Vary', 'Origin');
  response.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');
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
      .map((message) => ({ role: message.role, content: String(message.content || '').slice(0, MAX_MESSAGE_CHARS).trim() }))
      .filter((message) => message.content.length > 0);
  }
  const legacyMessage = String(body.message || '').slice(0, MAX_MESSAGE_CHARS).trim();
  return legacyMessage ? [{ role: 'user', content: legacyMessage }] : [];
}

function anemoneReply(query) {
  const rose = /ru[žz]a|damasc/.test(query);
  const chamomile = /harman|chamom/.test(query);
  const water = /kvetov|hydrol|\bvoda/.test(query);
  const oil = /ple[ťt]ov.{0,8}olej|olej na zrel|\bolej/.test(query);
  const lip = /balzam|pery|mandar|grep/.test(query);
  const hair = /vlas|[šs]amp[oó]n|salvia|[šs]alvia|levandu/.test(query);
  const routine = /rutina|poradie|najprv|potom|pou[žz]i.{0,10}spolu/.test(query);
  const comparison = /porovn|rozdiel|versus|\bvs\b/.test(query);

  if ((rose && chamomile) || (comparison && water && !oil)) {
    return 'Obe sú kvetové vody, teda ľahký vodný krok po čistení. Ruža damascénska a Harmanček sa líšia použitou rastlinou; v odporúčaní ich držím v rovnakej produktovej roli a nerozširujem rozdiel o neoverené botanické účinky.';
  }
  if ((water && oil) || (comparison && oil)) {
    return 'Kvetová voda a pleťový olej nie sú zameniteľné formáty. Kvetová voda je ľahký vodný krok; Pleťový olej na zrelú pleť je 30 ml olej s pipetou a výrobca ho uvádza na čistú, jemne vlhkú pleť — pokojne po kvetovej vode.';
  }
  if (lip) return BRANDS.anemone.fallback.lip;
  if (hair) return BRANDS.anemone.fallback.hair;
  if (routine) return BRANDS.anemone.fallback.routine;
  if (rose) return 'Kvetová voda Ruža damascénska patrí medzi kvetové vody ANEMONE a na oficiálnom webe je zachytená za 5,30 €. Ak chcete, porovnám ju s Harmančekom iba podľa overených rozdielov.';
  if (chamomile) return 'Kvetová voda Harmanček je 100 ml kvetová voda; na oficiálnom webe je zachytená akciová cena 4,00 € z 5,00 €. Pri porovnaní ju držím v rovnakej produktovej roli ako Ružu.';
  if (oil) return BRANDS.anemone.fallback.oil;
  if (water) return BRANDS.anemone.fallback.water;
  return BRANDS.anemone.fallback.default;
}

function deterministicReply(brand, latestMessage, messages = []) {
  const context = messages.slice(-6).map((message) => message.content).join(' ').toLocaleLowerCase('sk');
  const query = `${context} ${String(latestMessage || '').toLocaleLowerCase('sk')}`.trim();

  if (MEDICAL_PATTERN.test(query)) {
    return 'S diagnózou ani liečbou vám cez produktový chatbot nepomôžem. Môžem zúžiť výber kozmetiky podľa formátu a preferencií; pri výrazných, pretrvávajúcich alebo zhoršujúcich sa ťažkostiach je vhodné obrátiť sa na lekára alebo dermatológa.';
  }
  if (brand.name === 'ANEMONE') return anemoneReply(query);
  if (/porovn|rozdiel|versus| vs\.? /.test(query)) return `Môžem porovnať produkty ${brand.name} podľa ich overeného typu, textúry a úlohy v rutine. Napíšte názvy dvoch produktov, ktoré chcete porovnať, a zostanem iba pri údajoch z aktuálneho katalógu.`;
  if (/vlas|šamp[oó]n|sampon|tonik|olej[cč]ek/.test(query) && brand.fallback.hair) return brand.fallback.hair;
  if (/čist|odli[cč]|gel/.test(query) && brand.fallback.cleanse) return brand.fallback.cleanse;
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
    brand.catalogContext ? `Overený katalógový kontext: ${brand.catalogContext}` : '',
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
  response.setHeader?.('Cache-Control', 'no-store');
  if (request.method === 'OPTIONS') return response.status(204).end();
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  let body;
  try { body = parseBody(request); }
  catch { return response.status(400).json({ error: 'Invalid JSON body' }); }

  const slug = String(body.brand || '').toLocaleLowerCase('en').trim();
  const brand = BRANDS[slug];
  if (!brand) return response.status(400).json({ error: 'Unknown brand' });

  const messages = normalizeMessages(body);
  const latestMessage = [...messages].reverse().find((message) => message.role === 'user')?.content || '';
  if (!latestMessage) return response.status(400).json({ error: 'Missing user message' });

  const fallback = () => response.status(200).json({ reply: deterministicReply(brand, latestMessage, messages), fallback: true });
  if (!ANTHROPIC_API_KEY) return fallback();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);
  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', signal: controller.signal,
      headers: { 'content-type': 'application/json', 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL, max_tokens: 260, system: buildSystemPrompt(brand), messages })
    });
    if (!upstream.ok) return fallback();
    const data = await upstream.json();
    const reply = Array.isArray(data.content) ? data.content.find((block) => block?.type === 'text' && typeof block.text === 'string')?.text?.trim() : '';
    if (!reply) return fallback();
    return response.status(200).json({ reply, fallback: false });
  } catch {
    return fallback();
  } finally {
    clearTimeout(timeout);
  }
}
