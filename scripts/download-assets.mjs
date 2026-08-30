import fs from 'node:fs/promises';
import path from 'node:path';
import { brands } from '../src/brands.js';

const extensionFor = (url) => {
  const pathname = new URL(url).pathname;
  return pathname.match(/\.(svg|png|jpe?g|webp)$/i)?.[0].toLowerCase() ?? '.jpg';
};

const jobs = [];
for (const [slug, brand] of Object.entries(brands)) {
  jobs.push({ url: brand.remoteLogo, target: `${slug}/logo${extensionFor(brand.remoteLogo)}` });
  jobs.push({ url: brand.remoteHero, target: `${slug}/hero${extensionFor(brand.remoteHero)}` });
  brand.products.forEach((item, index) => {
    jobs.push({ url: item.remoteImage, target: `${slug}/product-${index + 1}${extensionFor(item.remoteImage)}` });
  });
}

const root = path.resolve('public/assets/brands');
await Promise.all(jobs.map(async ({ url, target }) => {
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 skincare-demo-asset-localizer' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const destination = path.join(root, target);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
  process.stdout.write(`${target}\n`);
}));

process.stdout.write(`Localized ${jobs.length} official assets.\n`);
