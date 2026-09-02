const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.CHAT_MODEL || 'claude-haiku-4-5';
const MAX_MESSAGES = 10;
const MAX_MESSAGE_LENGTH = 700;
const UPSTREAM_TIMEOUT_MS = 6500;

const CATALOGS = {
  mylo: {
    name: 'MYLO',
    products: ['Hydratačné sérum INOVAŤ', 'Čistiace a odličovacie mlieko MOISSANIT', 'Pleťový olej FLÓRA', 'Pleťová voda KVETOVÁ ROSA', 'Ceramidový krém s vitamínmi RADOSŤ'],
  },
  ponio: {
    name: 'PONIO',
    products: ['Lumina shield', 'Healthy aging', 'Mint suchý šampón', 'Banán & kokos suchý šampón', 'Dvojitá levanduľa — žihľavový šampúch'],
  },
  two: {
    name: 'TWO COSMETICS',
    products: ['HA⁶ HYDRATATION BOOSTER SERUM', 'BAKUCHIOL 1 % ANTI-AGE SERUM', 'Hydratačný krém', 'Krém pre problematickú pleť', 'AM/PM ROUTINE CLEANSING GEL 2% SALICYLIC ACID'],
  },
  bellcoria: {
    name: 'BELLCORIA',
    products: ['Organický opunciový olej', 'Elixír proti vráskam s bakuchiolom', 'Pleťový čistiaci gél', 'Nočný elixír s vitamínom C a brusnicovým olejom', 'Telový olej s astaxantínom'],
  },
  biofy: {
    name: 'BIOFY',
    products: ['Hydratačný krém na suchú a citlivú pleť', 'Výživný krém na normálnu a zmiešanú pleť', 'Konopný krém na suchú a problematickú pleť', 'Vlasové tonikum s rozmarínom', 'Ošetrujúci olejček na vlasy — 9 vzácnych olejov'],
  },
  anemone: {
    name: 'ANEMONE',
    products: ['Kvetová voda Ruža damascénska', 'Kvetová voda Harmanček', 'Pleťový olej na zrelú pleť', 'Balzam na pery Mandarínka & grep', 'Tuhý šampón Šalvia & levanduľa'],
  },
};

const MEDICAL_PATTERN = /diagn[oó]z|ekz[eé]m|dermatit|psori|rosace|infek|alergi|opuch|krvác|hnis|vyr[aá]žk|lie[cč]i|vylie[cč]|terapi|lek[aá]r|dermatol/i;
const normalize = (value) => String(value || '').toLocaleLowerCase('sk').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function setHeaders(request, response) {
  const origin = request.headers?.origin || '';
  const allowed = origin === '' || /(^https:\/\/([a-z0-9-]+\.)?mojchatbot\.sk$)|(^https:\/\/.*\.vercel\.app$)|(^http:\/\/(localhost|127\.0\.0\.1):\d+$)/i.test(origin);
  response.setHeader?.('Access-Control-Allow-Origin', allowed && origin ? origin : 'https://mojchatbot.sk');
  response.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader?.('Cache-Control', 'no-store');
  response.setHeader?.('Vary', 'Origin');
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
      .slice(-MAX_MESSAGES)
      .map((message) => ({ role: message.role, content: String(message.content || '').slice(0, MAX_MESSAGE_LENGTH).trim() }))
      .filter((message) => message.content);
  }
  const message = String(body.message || '').slice(0, MAX_MESSAGE_LENGTH).trim();
  return message ? [{ role: 'user', content: message }] : [];
}

function medicalReply() {
  return 'S diagnózou ani liečbou vám produktový poradca nepomôže. Môžem porovnať kozmetické produkty a ich popísané vlastnosti; pri zdravotnom probléme je vhodná konzultácia s lekárom alebo dermatológom.';
}

function biofyReply(query) {
  const q = normalize(query);
  const hydrating = /hydrat/.test(q);
  const nourishing = /vyziv/.test(q);
  const hemp = /konop/.test(q);
  const tonic = /tonik/.test(q);
  const hairOil = /olejcek|9\s*(vz|olej)/.test(q);
  const faceHair = /plet.{0,30}vlas|vlas.{0,30}plet/.test(q);
  if (faceHair) return 'Pleť a vlasy sú v BIOFY dve oddelené kategórie a poradca ich nikdy nemieša. Po voľbe Pleť zostane výsledok medzi tromi pleťovými krémami; po voľbe Vlasy iba medzi tonikom a ošetrujúcim olejčekom.';
  if (tonic && (hairOil || /olej/.test(q))) return 'Vlasové tonikum s rozmarínom je ľahší tekutý krok pre pokožku hlavy. Ošetrujúci olejček je olejový krok do dĺžok vlasov; poradca im nepripisuje garanciu rastu ani liečebný účinok.';
  if (hydrating && nourishing) return 'Hydratačný krém je určený pre suchú a citlivú pleť, kým Výživný krém pre normálnu a zmiešanú pleť. Rozhoduje teda najmä opis pleti a potom preferencia ľahšej alebo výživnejšej krémovej rutiny.';
  if (hydrating && hemp) return 'Hydratačný krém je určený pre suchú a citlivú pleť, kým Konopný krém pre suchú a problematickú pleť. Obe možnosti zostávajú v pleťovej kategórii.';
  if (hemp) return 'Konopný krém je v tomto BIOFY výbere určený pre suchú a problematickú pleť. Poradca ho porovnáva iba s ďalšími pleťovými krémami, nie s vlasovými produktmi.';
  if (/vlas|tonik|olejcek/.test(q)) return 'Pri vlasoch BIOFY porovnajte vlasové tonikum s rozmarínom a ošetrujúci olejček. Tonikum je ľahší krok pre pokožku hlavy, olejček patrí do dĺžok a výživnejšej rutiny.';
  return 'Pri BIOFY začnite voľbou Pleť alebo Vlasy. Pri pleti poradca porovná tri krémy podľa ich určenia, pri vlasoch tonikum s rozmarínom a ošetrujúci olejček podľa formátu a miesta v rutine.';
}

function anemoneReply(messages) {
  const userText = normalize(messages.filter((message) => message.role === 'user').map((message) => message.content).join(' '));
  const latest = normalize(messages.at(-1)?.content);
  const rose = /ruza|damasc/.test(userText);
  const chamomile = /harman|chamom/.test(userText);
  const water = /kvetov|hydrol|\bvoda/.test(userText);
  const oil = /olej/.test(userText);
  if ((rose && chamomile) || (/porovn|rozdiel|oproti/.test(latest) && water && !oil)) return 'Obe sú kvetové vody, teda ľahký vodný krok po čistení. Líšia sa použitou rastlinou: jedna je Ruža damascénska, druhá Harmanček; nebudem k nim pridávať neoverené botanické účinky.';
  if ((water && oil) || (/porovn|rozdiel|oproti/.test(latest) && oil)) return 'Kvetová voda a pleťový olej nie sú zameniteľné formáty. Kvetová voda je ľahký vodný krok; Pleťový olej na zrelú pleť je samostatný olejový krok na čistú, jemne vlhkú pleť.';
  if (/balzam|pery|mandar|grep/.test(latest)) return 'Balzam na pery Mandarínka & grep je samostatná starostlivosť o pery. Pri tejto voľbe poradca zostane v kategórii pier.';
  if (/vlas|sampon|salvia|levandu/.test(latest)) return 'Tuhý šampón Šalvia & levanduľa je vlasový produkt v tuhom formáte určený na umývanie vlasov.';
  if (rose) return 'Kvetová voda Ruža damascénska patrí medzi kvetové vody ANEMONE. Ak chcete, porovnám ju s Harmančekom iba podľa overených rozdielov.';
  if (chamomile) return 'Kvetová voda Harmanček je druhá kvetová voda v tomto výbere ANEMONE. Pri porovnaní s Ružou zostávame pri rovnakej produktovej roli.';
  return 'Môžem porovnať dve kvetové vody, vysvetliť rozdiel medzi kvetovou vodou a olejom alebo pomôcť s výberom produktu na pery či vlasy.';
}

function bellcoriaReply(query) {
  const q = normalize(query);
  if (/bakuch/.test(q)) return 'Elixír proti vráskam s bakuchiolom je v tomto výbere pleťový elixír s olejovou textúrou. Ak chcete čistiaci krok, pozrite Pleťový čistiaci gél; pri pleťovom oleji ho porovnajte s Organickým opunciovým olejom.';
  if (/vecer|nocn/.test(q)) return 'Na večerný elixírový krok je v tejto ponuke Nočný elixír s vitamínom C a brusnicovým olejom. Ak chcete namiesto elixíru pleťový olej, porovnajte ho s Organickým opunciovým olejom.';
  if (/telo|telov|astax/.test(q)) return 'Ak hľadáte produkt na telo, v tomto výbere je Telový olej s astaxantínom. Pri výbere na tvár poradca zostáva iba medzi pleťovými produktmi.';
  if (/cist|gel/.test(q) && /olej|elix/.test(q)) return 'Pleťový čistiaci gél je čistiaci krok. Organický opunciový olej a elixíry patria do následnej pleťovej starostlivosti, takže nejde o zameniteľné produkty.';
  if (/olej/.test(q) && /elix/.test(q)) return 'Organický opunciový olej je pleťový olej, kým bakuchiolový a nočný produkt sú elixíry. Nočný elixír je v tomto výbere určený na večerný krok.';
  return 'Bellcoria výber môžeme zúžiť podľa toho, či hľadáte produkt na tvár alebo telo, aký typ produktu chcete a kedy ho chcete používať.';
}

function myloReply(query) {
  const q = normalize(query);
  if (/inovat/.test(q) && /radost/.test(q)) return 'INOVAŤ je ľahké hydrogélové sérum, kým RADOSŤ je ceramidový krémový krok. Vyberte podľa toho, či chcete ľahšie sérum alebo krémovú starostlivosť.';
  if (/rann|rano/.test(q)) return 'Na jednoduchú rannú rutinu z tohto výberu MYLO môžete zaradiť jemné čistenie podľa potreby a potom INOVAŤ alebo RADOSŤ podľa preferovanej textúry.';
  if (/cist|odlic|moissanit/.test(q)) return 'MOISSANIT je čistiace a odličovacie mlieko; v tomto výbere predstavuje jemný čistiaci krok.';
  if (/such|citliv|flora/.test(q)) return 'Pri suchej alebo citlivej pleti je v tomto výbere relevantná FLÓRA ako olejový krok; pri hydratácii môžete porovnať aj INOVAŤ a RADOSŤ podľa textúry.';
  return 'Pri MYLO vieme výber zúžiť podľa toho, ako sa pleť cíti, aký krok rutiny chcete riešiť a akú textúru preferujete.';
}

function ponioReply(query) {
  const q = normalize(query);
  if (/suchy.*sampon|sampon.*suchy/.test(q) && /sampuch|tuh/.test(q)) return 'Suchý šampón Mint alebo Banán & kokos slúži na rýchle osvieženie medzi umytiami, kým Dvojitá levanduľa je tuhý šampúch na samotné umývanie vlasov.';
  if (/lumina/.test(q)) return 'Lumina shield je pleťový krém v dennej vetve PONIO. Ak riešite inú oblasť, poradca najprv oddelí pleť, vlasy, telo a pery.';
  if (/healthy|zrel/.test(q)) return 'Healthy aging je pleťový krém v ponuke PONIO zameranej na zrelú pleť. Výber ho neporovnáva s vlasovými produktmi.';
  if (/vlas|sampon|sampuch/.test(q)) return 'Pri vlasoch PONIO najprv rozlíšte rýchle osvieženie medzi umytiami a samotné umývanie. V tomto výbere sú suché šampóny Mint a Banán & kokos a tuhý šampúch Dvojitá levanduľa.';
  return 'PONIO má širší sortiment, preto poradca najprv oddelí pleť, vlasy, telo a pery a až potom odporúča konkrétny produkt.';
}

function deterministicReply(slug, messages) {
  const latest = messages.at(-1)?.content || '';
  if (MEDICAL_PATTERN.test(latest)) return medicalReply();
  if (slug === 'biofy') return biofyReply(latest);
  if (slug === 'anemone') return anemoneReply(messages);
  if (slug === 'bellcoria') return bellcoriaReply(latest);
  if (slug === 'mylo') return myloReply(latest);
  if (slug === 'ponio') return ponioReply(latest);
  return 'Pomôžem vám porovnať produkty z aktuálneho katalógu a zúžiť výber podľa toho, čo chcete zaradiť do rutiny.';
}

function systemPrompt(catalog) {
  return [
    `Ste produktový poradca značky ${catalog.name}.`,
    `Môžete pracovať iba s týmto katalógom: ${catalog.products.join('; ')}.`,
    'Odpovedajte po slovensky, stručne a prakticky, najviac 2–3 vetami.',
    'Nevymýšľajte produkty, ceny, zloženie, dostupnosť, recenzie ani účinky.',
    'Nediagnostikujte a nesľubujte liečbu alebo zdravotný výsledok.',
    'Ak si nie ste istý konkrétnym faktom, povedzte to a odporučte oficiálnu produktovú stránku.',
  ].join(' ');
}

async function anthropicReply(catalog, messages) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 260, temperature: 0.2, system: systemPrompt(catalog), messages }),
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const payload = await response.json();
    return payload.content?.filter((item) => item.type === 'text').map((item) => item.text).join('\n').trim() || null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(request, response) {
  setHeaders(request, response);
  if (request.method === 'OPTIONS') return response.status?.(204).end?.();
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });

  let body;
  try {
    body = parseBody(request);
  } catch {
    return response.status(400).json({ error: 'Invalid JSON body' });
  }

  const slug = String(body.brand || '').trim().toLowerCase();
  const catalog = CATALOGS[slug];
  if (!catalog) return response.status(400).json({ error: 'Unknown brand' });

  const messages = normalizeMessages(body);
  if (!messages.length || !messages.some((message) => message.role === 'user')) return response.status(400).json({ error: 'Missing user message' });

  const fallback = deterministicReply(slug, messages);
  if (!ANTHROPIC_API_KEY) return response.status(200).json({ reply: fallback, fallback: true });

  const live = await anthropicReply(catalog, messages);
  if (!live) return response.status(200).json({ reply: fallback, fallback: true });
  return response.status(200).json({ reply: live, fallback: false });
}
