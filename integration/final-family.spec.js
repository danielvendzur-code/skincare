import { expect, test } from '@playwright/test';

const routes = [
  { slug: 'mylo', name: 'MYLO', selector: '.mylo-site' },
  { slug: 'ponio', name: 'PONIO', selector: '.ponio-page' },
  { slug: 'two', name: 'TWO COSMETICS', selector: '.two-storefront' },
  { slug: 'bellcoria', name: 'BELLCORIA', selector: '.bellcoria-storefront' },
  { slug: 'biofy', name: 'BIOFY', selector: '.biofy-storefront' },
  { slug: 'anemone', name: 'ANEMONE', selector: '.an-store' },
];

for (const item of routes) {
  test(`${item.name} final route renders its branded storefront without browser errors`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const errors = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/ukazka/${item.slug}`);
    await expect(page.locator(item.selector)).toBeVisible();
    await expect(page).toHaveTitle(new RegExp(item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    expect(errors).toEqual([]);
  });
}

test('all six routes coexist in one build and preserve their own launchers/widgets', async ({ page }) => {
  for (const item of routes) {
    await page.goto(`/ukazka/${item.slug}`);
    if (item.slug === 'ponio') {
      const launcher = page.getByRole('button', { name: /Otvoriť poradcu PONIO/i });
      await launcher.click();
      await expect(page.getByRole('dialog', { name: /PONIO/i })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog', { name: /PONIO/i })).toHaveCount(0);
    } else {
      const launcher = page.getByRole('button', { name: new RegExp(`Otvoriť poradcu ${item.name}`, 'i') });
      await launcher.click();
      await expect(page.locator('.widget')).toBeVisible();
      await expect(page.getByRole('tab', { name: 'Chat' })).toBeVisible();
      await expect(page.getByRole('tab', { name: /Výber starostlivosti/i })).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('.widget')).toHaveCount(0);
    }
  }
});

for (const viewport of [{ width: 390, height: 844 }, { width: 360, height: 800 }]) {
  test(`final family has no horizontal overflow at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const item of routes) {
      await page.goto(`/ukazka/${item.slug}`);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
  });
}
