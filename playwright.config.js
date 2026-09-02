import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 35_000,
  expect: { timeout: 7_000 },
  fullyParallel: false,
  workers: 2,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    headless: true,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'pnpm dev --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173/ukazka/mylo',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
