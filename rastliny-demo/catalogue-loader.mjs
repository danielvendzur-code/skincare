import {BRANDS} from './catalog-index.mjs';
import {readFile} from 'node:fs/promises';
const loaded=new Map();
export async function getBrand(slug){if(!BRANDS[slug])return null;if(!loaded.has(slug))loaded.set(slug,readFile(new URL('./data/'+slug+'.json',import.meta.url),'utf8').then(JSON.parse));return loaded.get(slug);}
