const fold=v=>String(v||'').normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
// Product type precedes the species mentioned in its purpose. A fertiliser
// for orchids is a care product, while a plant bundled with soil stays a plant.
export function nonLivingKind(name,source={}){
  const title=fold(name);
  if(/^(epipremnum|monstera|philodendron)\b/.test(title)&&/\s\+\s/.test(title))return null;
  if(/substrat|vermikulit/.test(title))return 'substrates';
  if(/vyziv|elixir|hnojiv|\bbio?stimulator|stimulator|insekticid|fungicid|pesticid|postrek|postrik/.test(title))return 'accessories';
  if(/substrat/.test(fold(source.category))&&/substrat/.test(fold(source.factText).slice(0,160)))return 'substrates';
  return null;
}

// A named living plant sold in a pot remains a plant. These are botanical
// genera, not words anywhere in the description of an empty decorative pot.
const CACTI=/^(?:puna|astrophytum|asrophytum|lophophora|ariocarpus|geohintonia|echinocactus|tephrocactus|pygmaeocereus|cintia|coryphantha|thelocactus|leuchtenbergia|ferobergia|neobesseya|chamaecereus|hildewinteria|ferocactus|lobivia|aylostera|parodia|echinofossulocactus|thelocephala|eriocactus|eulychnia|trichocereus|melocactus|escobaria|eriocereus|acanthocalycium|gymnocalycium|mammillaria|echinopsis|rebutia|opuntia|echinocereus)\b/;
export function livingKind(name,slug=''){
 const title=fold(name);
 if(CACTI.test(title))return 'cacti';
 if(/^(?:echeveria|haworthia|crassula|aloe|agave|kalanchoe|cotyledon|senecio|portulacaria|graptosedum|cremnosedum|sedum|lithops|trichodiadema|gasteria|titanopsis|anacampseros|aeonium|lapidaria)\b/.test(title))return 'succulents';
 if(slug==='dubenkaktus'&&/^euphorbia\s+(?:stelaespina|x\s+obesa|enopla|horida)\b/.test(title))return 'succulents';
 if(/^(?:albuca|plectranthus)\b/.test(title)&&slug==='dubenkaktus')return 'plants';
 if(/^tillandsia\b/.test(title))return 'airplants';
 if(/^(?:phalaenopsis|dendrobium|paphiopedilum)\b/.test(title))return 'orchids';
 if(/^(?:epipremnum|philodendron|monstera|dracaena|ficus|anthurium|alocasia|calathea|maranta|syngonium|peperomia|pilea|hoya|scindapsus|zamioculcas|begonia|aglaonema|spathiphyllum|stromanthe|sansevieria|codiaeum)\b/.test(title))return 'plants';
 if(/^(?:jablon|hruska|hrusen|slivka|svestka|ringlota|broskyna|marhula|merunka|ceresna|visna|malina|ribezla|egres|mandlovnik)\b/.test(title))return 'fruits';
 if(slug==='abies'&&/\|\s*(?:[a-z]+)\s+[a-z]/.test(title))return 'outdoor';
 return null;
}
