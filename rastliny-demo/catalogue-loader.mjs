import {BRANDS} from './catalog-index.mjs';
import {readFile} from 'node:fs/promises';
import {applyCatalogueCorrections} from './catalogue-corrections.mjs';
const loaded=new Map();
export async function getBrand(slug){if(!BRANDS[slug])return null;if(!loaded.has(slug))loaded.set(slug,readFile(new URL('./data/'+slug+'.json',import.meta.url),'utf8').then(JSON.parse).then(brand=>applyCatalogueCorrections(brand,slug)));return loaded.get(slug);}
