import { defineConfig } from '@playwright/test';

const browserUse = process.env.CI
  ? { baseURL: 'http://127.0.0.1:4173', headless: true }
  : { baseURL: 'http://127.0.0.1:4173', channel: 'msedge', headless: true };

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  use: browserUse,
  webServer: {
    command: 'pnpm dev --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173/ukazka/mylo',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
