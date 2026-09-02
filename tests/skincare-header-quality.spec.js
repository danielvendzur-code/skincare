import { expect, test } from '@playwright/test';

function gridTracks(value) {
  return String(value).trim().split(/\s+/).filter(Boolean);
}

const genericBrands = ['mylo', 'two', 'bellcoria', 'biofy', 'anemone'];
const productImageSelectors = {
  mylo: '.mylo-product__image img',
  ponio: '.ponio-product-image img',
  two: '.two-product-card__image img',
  bellcoria: '.bellcoria-product__image img',
  biofy: '.biofy-product__image img',
  anemone: '.an-product__image img',
};

test.describe('Skincare repeated UI regression guard', () => {
  test('MYLO uses a calm header and keeps the existing 2x2 advisor layout', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ukazka/mylo');

    const siteHeader = page.locator('.mylo-header');
    await expect(siteHeader).toBeVisible();
    expect(await siteHeader.evaluate((node) => getComputedStyle(node).borderBottomWidth)).toBe('0px');

    await page.getByRole('button', { name: /Nájsť starostlivosť/i }).first().click();
    const header = page.locator('.widget__header');
    await expect(header).toBeVisible();
    expect(await header.evaluate((node) => getComputedStyle(node).borderBottomWidth)).toBe('0px');
    expect(await header.evaluate((node) => getComputedStyle(node, '::after').content)).toContain('Online');

    const grid = page.locator('.choice-grid');
    await expect(grid.locator('button')).toHaveCount(4);
    const tracks = await grid.evaluate((node) => {
      const style = getComputedStyle(node);
      return { columns: style.gridTemplateColumns, rows: style.gridTemplateRows };
    });
    expect(gridTracks(tracks.columns)).toHaveLength(2);
    expect(gridTracks(tracks.rows)).toHaveLength(2);
  });

  test('PONIO removes duplicate identity/dividers and keeps its existing 2x2 chooser', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/ukazka/ponio');

    const siteHeader = page.locator('.ponio-site-header');
    await expect(siteHeader).toBeVisible();
    expect(await siteHeader.evaluate((node) => getComputedStyle(node).borderBottomWidth)).toBe('0px');

    await page.getByRole('button', { name: /Opýtať sa v Chate/i }).first().click();
    const header = page.locator('.ponio-widget-header');
    await expect(header).toBeVisible();
    expect(await header.evaluate((node) => getComputedStyle(node).borderBottomWidth)).toBe('0px');
    expect(await page.locator('.ponio-widget-brand strong').evaluate((node) => getComputedStyle(node).display)).toBe('none');

    const logo = page.locator('.ponio-widget-brand > .ponio-mark');
    const status = page.locator('.ponio-widget-brand small');
    await expect(status).toContainText('Online poradca');
    const [logoBox, statusBox] = await Promise.all([logo.boundingBox(), status.boundingBox()]);
    expect(statusBox.x).toBeGreaterThanOrEqual(logoBox.x + logoBox.width - 1);

    const chip = page.locator('.ponio-quick-questions button').first();
    await expect(chip).toBeVisible();
    await chip.hover();
    const chipStyle = await chip.evaluate((node) => {
      const style = getComputedStyle(node);
      return { background: style.backgroundColor, backgroundImage: style.backgroundImage, color: style.color };
    });
    expect(chipStyle.backgroundImage).toBe('none');
    expect(chipStyle.background).not.toBe('rgb(37, 73, 45)');
    expect(chipStyle.color).not.toBe('rgb(255, 255, 255)');

    await page.getByRole('tab', { name: /Výber starostlivosti/i }).click();
    const grid = page.locator('.ponio-choice-grid');
    await expect(grid.locator('button')).toHaveCount(4);
    const tracks = await grid.evaluate((node) => {
      const style = getComputedStyle(node);
      return { columns: style.gridTemplateColumns, rows: style.gridTemplateRows };
    });
    expect(gridTracks(tracks.columns)).toHaveLength(2);
    expect(gridTracks(tracks.rows)).toHaveLength(2);
  });

  for (const brand of genericBrands) {
    test(`${brand} widget has no divider, no dark chip fill and no blurred chooser label`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/ukazka/${brand}`);
      await page.locator('.launcher').click();

      const header = page.locator('.widget__header');
      await expect(header).toBeVisible();
      expect(await header.evaluate((node) => getComputedStyle(node).borderBottomWidth)).toBe('0px');

      const chip = page.locator('.quick-chips button').first();
      await expect(chip).toBeVisible();
      await chip.hover();
      const chipStyle = await chip.evaluate((node) => {
        const style = getComputedStyle(node);
        return { backgroundImage: style.backgroundImage, color: style.color };
      });
      expect(chipStyle.backgroundImage).toBe('none');
      expect(chipStyle.color).not.toBe('rgb(255, 255, 255)');

      await page.getByRole('tab', { name: /Výber starostlivosti/i }).click();
      const label = page.locator('.choice-grid button > span:last-child').first();
      await expect(label).toBeVisible();
      const blur = await label.evaluate((node) => {
        const style = getComputedStyle(node);
        return { backdrop: style.backdropFilter, webkitBackdrop: style.webkitBackdropFilter };
      });
      expect(blur.backdrop === 'none' || blur.backdrop === '').toBeTruthy();
      expect(blur.webkitBackdrop === 'none' || blur.webkitBackdrop === '').toBeTruthy();
    });
  }

  for (const [brand, selector] of Object.entries(productImageSelectors)) {
    test(`${brand} product image does not resample or jump on hover`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/ukazka/${brand}`);
      const image = page.locator(selector).first();
      await expect(image).toBeVisible();
      const before = await image.evaluate((node) => getComputedStyle(node).transform);
      await image.hover();
      await page.waitForTimeout(120);
      const after = await image.evaluate((node) => getComputedStyle(node).transform);
      expect(before).toBe('none');
      expect(after).toBe('none');
    });
  }
});
