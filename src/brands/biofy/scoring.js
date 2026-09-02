const DIMENSION_WEIGHTS = Object.freeze({
  skin: 12,
  role: 10,
  format: 7,
  texture: 5,
  routine: 3,
});

const ANSWER_TRAITS = Object.freeze({
  'dry-sensitive': { skin: ['dry', 'sensitive'] },
  'normal-mixed': { skin: ['normal', 'mixed'] },
  'dry-problematic': { skin: ['dry', 'problematic'] },
  'face-unsure': {},
  scalp: { skin: ['scalp'] },
  lengths: { skin: ['lengths'] },
  'dry-ends': { skin: ['lengths', 'dry-ends'] },
  'hair-unsure': {},
  hydration: { role: ['hydration'] },
  nourishment: { role: ['nourishment'] },
  'hemp-care': { role: ['hemp-care'] },
  'face-simple': { routine: ['simple'] },
  tonic: { role: ['tonic'], format: ['tonic'] },
  conditioning: { role: ['conditioning'], format: ['oil'] },
  'hair-light': { texture: ['light'], routine: ['simple'] },
  'hair-rich': { texture: ['rich'], routine: ['simple'] },
  'light-cream': { format: ['cream'], texture: ['light'] },
  'rich-cream': { format: ['cream'], texture: ['rich'] },
  'hemp-cream': { role: ['hemp-care'], format: ['cream'] },
  'simple-routine': { routine: ['simple'] },
  'tonic-format': { format: ['tonic'], texture: ['light'] },
  'oil-format': { format: ['oil'], texture: ['rich'] },
  'light-routine': { texture: ['light'], routine: ['simple'] },
  'rich-routine': { texture: ['rich'], routine: ['simple'] },
});

const DIMENSION_LABELS = Object.freeze({
  skin: 'určenie produktu',
  role: 'typ produktu',
  format: 'formát',
  texture: 'textúra',
  routine: 'jednoduchosť rutiny',
});

function selectedArea(answers) {
  const area = answers?.[0];
  return area === 'face' || area === 'hair' ? area : null;
}

function desiredTraits(answers) {
  const desired = { skin: new Set(), role: new Set(), format: new Set(), texture: new Set(), routine: new Set() };
  for (const answer of answers ?? []) {
    const profile = ANSWER_TRAITS[answer];
    if (!profile) continue;
    for (const dimension of Object.keys(DIMENSION_WEIGHTS)) {
      for (const trait of profile[dimension] ?? []) desired[dimension].add(trait);
    }
  }
  return desired;
}

function scoreProduct(product, desired) {
  let score = 0;
  const matchedDimensions = [];
  const matchedTraits = {};

  for (const [dimension, weight] of Object.entries(DIMENSION_WEIGHTS)) {
    const wanted = desired[dimension];
    if (!wanted.size) continue;
    const available = new Set(product.traits?.[dimension] ?? []);
    const matches = [...wanted].filter((trait) => available.has(trait));
    if (!matches.length) continue;
    score += matches.length * weight;
    matchedDimensions.push(dimension);
    matchedTraits[dimension] = matches;
  }

  return { score, matchedDimensions, matchedTraits };
}

function reasonFor(area, matchedDimensions) {
  const areaLabel = area === 'face' ? 'pleťové produkty' : 'vlasové produkty';
  const labels = [...new Set(matchedDimensions)].map((dimension) => DIMENSION_LABELS[dimension]);
  if (!labels.length) return `Zostali sme pri kategórii ${areaLabel} a vybrali najbližšiu možnosť z dostupného výberu.`;
  const summary = labels.slice(0, 3).join(', ');
  return `Najlepšie sedí k vašim odpovediam podľa: ${summary}.`;
}

export function rankBiofyProducts(products, answers) {
  const area = selectedArea(answers);
  if (!area) throw new Error('BIOFY advisor requires an explicit face or hair area before scoring.');

  const desired = desiredTraits(answers);
  return products
    .filter((product) => product.area === area)
    .map((product, catalogIndex) => ({ product, catalogIndex, ...scoreProduct(product, desired) }))
    .sort((left, right) => right.score - left.score || left.catalogIndex - right.catalogIndex);
}

export function recommendBiofy(products, answers) {
  const area = selectedArea(answers);
  const ranked = rankBiofyProducts(products, answers);
  const first = ranked[0];
  if (!first) throw new Error(`BIOFY has no eligible products for area: ${area ?? 'unknown'}.`);

  const second = ranked.find((candidate) => candidate.product.id !== first.product.id) ?? null;
  return {
    product: first.product,
    alternative: second?.product ?? null,
    score: first.score,
    matches: first.matchedTraits,
    reason: reasonFor(area, first.matchedDimensions),
  };
}

export const biofyScoringContract = Object.freeze({
  weights: DIMENSION_WEIGHTS,
  hardConstraint: 'area',
  tieBreak: 'catalog-order',
});
