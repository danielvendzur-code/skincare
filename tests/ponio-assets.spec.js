import { expect, test } from '@playwright/test';
import { ponioProducts } from '../src/brands/ponio/config.js';

test('PONIO catalog uses only localized product imagery', () => {
  expect(ponioProducts).toHaveLength(8);
  for (const product of ponioProducts) {
    expect(product.image, `${product.name} must use a local asset`).toMatch(/^\/assets\/brands\/ponio\/product-\d+\.jpg$/);
    expect(product.image).not.toMatch(/^https?:\/\//);
  }
});

test('all PONIO catalog images load from the demo itself', async ({ page }) => {
  await page.goto('/ukazka/ponio');
  for (const product of ponioProducts) {
    const result = await page.evaluate(async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      return { width: image.naturalWidth, height: image.naturalHeight };
    }, product.image);
    expect(result.width, `${product.name} image width`).toBeGreaterThan(0);
    expect(result.height, `${product.name} image height`).toBeGreaterThan(0);
  }
});
