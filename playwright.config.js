const { defineConfig, devices } = require('@playwright/test');
const env = require('./config/env');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'reports/playwright-report', open: 'never' }]],
  use: {
    baseURL: env.baseURL,
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});
