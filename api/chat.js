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
    products: [
      'Lumina shield — denný ochranný pleťový krém — 25,30 €',
      'Healthy aging — pleťový krém pre zrelú pleť — 25,30 €',
      'Vanilka & kokos — výživný univerzálny pleťový krém — 13,00 €',
      'Mint — suchý šampón — 7,70 €',
      'Banán & kokos — suchý šampón — 7,70 €',
      'Dvojitá levanduľa — žihľavový šampúch — od 4,70 €',
      'Fresh air — prírodný deodorant — 9,30 €',
      'Rúž na pery v ceruzke — 8,30 €'
    ],
    catalogContext: [
      'Katalóg je rozdelený na Pleť, Vlasy, Telo a Pery. Tieto oblasti nezamieňaj.',
      'Lumina shield: denný pleťový krém pre všetky typy pleti; PONIO ho uvádza do rannej rutiny a pod SPF alebo make-up.',
      'Healthy aging: pleťový krém pre zrelú pleť; vhodný do dennej aj večernej rutiny.',
      'Vanilka & kokos: pleťový krém, ktorý PONIO výslovne uvádza pre citlivú, normálnu až suchšiu pleť.',
      'Mint a Banán & kokos: práškové suché šampóny na osvieženie vlasov medzi klasickými umytiami. Pri Mint PONIO priamo uvádza použitie na cestách.',
      'Dvojitá levanduľa: tuhý žihľavový šampúch na samotné umývanie vlasov; nie je to suchý šampón. PONIO pri šampúchu uvádza kompaktnosť a praktickosť na cesty.',
      'Fresh air: prírodný deodorant pre telo, nie antiperspirant.',
      'Rúž na pery v ceruzke: šesť odtieňov; PONIO uvádza hydratáciu a matný vzhľad.',
      'Travel použitie nepripisuj ostatným produktom, pokiaľ nie je uvedené vyššie.'
    ].join(' '),
    fallback: {
      hair: 'Pri vlasoch najprv rozlíšte účel: Mint a Banán & kokos sú suché šampóny na osvieženie medzi umytiami, Dvojitá levanduľa je tuhý šampúch na samotné umývanie vlasov.',
      face: 'Pri pleti vieme rozlíšiť Lumina shield pre dennú rutinu, Healthy aging pre zrelú pleť a Vanilka & kokos, ktorý PONIO výslovne uvádza aj pre citlivú pleť.',
      default: 'PONIO má oddelenú starostlivosť o pleť, vlasy, telo a pery. Najprv vyberte oblasť, aby odporúčanie zostalo iba v správnej časti katalógu.'
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
      .map((message) => ({ role: message.role, content: String(message.content || '').slice(0, MAX_MESSAGE_CHARS).trim() }))
      .filter((message) => message.content.length > 0);
  }
  const legacyMessage = String(body.message || '').slice(0, MAX_MESSAGE_CHARS).trim();
  return legacyMessage ? [{ role: 'user', content: legacyMessage }] : [];
}

function plain(value) {
  return String(value || '').toLocaleLowerCase('sk').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function ponioDeterministicReply(messages) {
  const userMessages = messages.filter((message) => message.role === 'user').map((message) => message.content);
  const latest = plain(userMessages.at(-1));
  const context = plain(userMessages.slice(-4).join(' '));

  if (/lumina/.test(latest) && /healthy|aging/.test(context)) return 'Lumina shield je denný ochranný pleťový krém do rannej rutiny; Healthy aging je krém zameraný na zrelú pleť a PONIO ho uvádza na dennú aj večernú starostlivosť. Obe sú pleťové krémy za 25,30 €, ale riešia iný hlavný cieľ.';
  if (/suchy sampon|suchym sampon|sampuch|tuhy sampon|rozdiel/.test(context) && /rozdiel|such|sampuch|tuh/.test(latest)) return 'Mint a Banán & kokos sú práškové suché šampóny na osvieženie vlasov medzi umytiami. Dvojitá levanduľa je tuhý šampúch na samotné umývanie vlasov, takže ide o iný krok starostlivosti.';
  if (/lumina/.test(latest)) return 'Lumina shield je denný ochranný pleťový krém za 25,30 €. PONIO ho uvádza pre všetky typy pleti, do rannej rutiny a aj pod SPF alebo make-up.';
  if (/healthy|aging|zrel/.test(latest)) return 'Healthy aging je pleťový krém pre zrelú pleť za 25,30 €. PONIO ho uvádza na pravidelnú dennú aj večernú starostlivosť.';
  if (/vanilk|citliv/.test(latest)) return 'Pri citlivej pleti je v overenom katalógu Vanilka & kokos za 13,00 €, ktorý PONIO výslovne uvádza pre citlivú, normálnu až suchšiu pleť. Pri alergii alebo zdravotnom probléme však produktový chatbot nenahrádza odbornú radu.';
  if (/mint/.test(latest)) return 'Mint je suchý šampón za 7,70 € na osvieženie vlasov medzi umytiami. Pri tomto produkte PONIO priamo uvádza aj použitie na cestách.';
  if (/banan|kokos/.test(latest) && /sampon|vlas|such/.test(context)) return 'Banán & kokos je suchý šampón za 7,70 € — práškový produkt na osvieženie vlasov medzi klasickými umytiami.';
  if (/dvojit|levand|zihlav|sampuch/.test(latest)) return 'Dvojitá levanduľa je žihľavový šampúch od 4,70 €. Je to tuhý produkt na samotné umývanie vlasov, nie suchý šampón; PONIO pri ňom uvádza aj kompaktnosť vhodnú na cesty.';
  if (/cest|travel/.test(latest)) return 'Travel použitie nepripisujem celému sortimentu. PONIO ho priamo uvádza pri suchom šampóne Mint a pri kompaktnom šampúchu Dvojitá levanduľa.';
  if (/pery|ruz|balzam/.test(latest)) return 'PONIO má samostatnú kategóriu pier. Rúž na pery v ceruzke stojí 8,30 €, je v šiestich odtieňoch a PONIO pri ňom uvádza hydratáciu aj matný vzhľad.';
  if (/telo|deodor|dezodor/.test(latest)) return 'Fresh air patrí do telovej starostlivosti a stojí 9,30 €. Je to prírodný deodorant, nie antiperspirant; nejde o pleťový ani vlasový produkt.';
  if (/vlas|sampon|sampuch/.test(latest)) return 'Pri vlasoch najprv rozlíšte účel: Mint alebo Banán & kokos osviežujú medzi umytiami, kým Dvojitá levanduľa je tuhý šampúch na samotné umytie.';
  if (/plet|krem|tvar/.test(latest)) return 'Pri pleti viem rozlíšiť Lumina shield, Healthy aging a Vanilka & kokos podľa cieľa. Povedzte, či riešite dennú ochranu, zrelú alebo citlivú pleť a zostanem iba medzi pleťovými produktmi.';
  return 'PONIO má oddelenú starostlivosť o pleť, vlasy, telo a pery. Napíšte oblasť alebo konkrétny názov produktu; Výber starostlivosti najprv uzamkne správnu časť katalógu.';
}

function deterministicReply(brand, messages, latestMessage) {
  const query = String(latestMessage || '').toLocaleLowerCase('sk');
  if (MEDICAL_PATTERN.test(query)) return 'S diagnózou ani liečbou vám cez produktový chatbot nepomôžem. Môžem zúžiť výber kozmetiky podľa overeného určenia produktu; pri výrazných, pretrvávajúcich alebo zhoršujúcich sa ťažkostiach je vhodné obrátiť sa na lekára alebo dermatológa.';
  if (brand.name === 'PONIO') return ponioDeterministicReply(messages);
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
    'Nadväzujte na predchádzajúce správy. Ak používateľ povie „ten druhý“, „a čo tento“ alebo podobne, použite kontext konverzácie.',
    'Nevymýšľajte produkty, ceny, dostupnosť, zloženie, certifikácie, účinky ani tvrdenia, ktoré nemáte v poskytnutom katalógovom kontexte.',
    'Nevykonávajte zdravotnú diagnózu a netvrďte, že kozmetika lieči alebo vylieči zdravotný stav.',
    'Ak používateľ opisuje výrazný, pretrvávajúci alebo zdravotný problém, jasne oddeľte kozmetický výber od zdravotnej rady a odporučte odbornú zdravotnú konzultáciu.',
    'Pri nejasnej požiadavke položte najviac jednu krátku doplňujúcu otázku alebo odporučte Výber starostlivosti.',
    'Pri PONIO nikdy nezamieňajte pleť, vlasy, telo a pery a nikdy neprezentujte suchý šampón ako produkt na umývanie vlasov.'
  ].filter(Boolean).join('\n');
}

export default async function handler(request, response) {
  setCors(request, response);
  response.setHeader('Cache-Control', 'no-store');
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

  const fallback = () => response.status(200).json({ reply: deterministicReply(brand, messages, latestMessage), fallback: true });
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
