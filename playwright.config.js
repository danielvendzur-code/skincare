import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4173', channel: 'msedge', headless: true },
  webServer: { command: 'pnpm dev --host 127.0.0.1 --port 4173', url: 'http://127.0.0.1:4173/ukazka/mylo', reuseExistingServer: true, timeout: 60_000 }
});
