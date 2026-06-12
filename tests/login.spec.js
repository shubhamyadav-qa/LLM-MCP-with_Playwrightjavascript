const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const loginData = require('../test-data/loginData');
const BaseTest = require('../utils/baseTest');

test.describe('VTiger CRM Login Tests', () => {
  let loginPage;
  let baseTest;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    baseTest = new BaseTest(page);
    await baseTest.navigateToHome();
  });

  test.afterEach(async ({ page }) => {
    // Close current page to avoid browser reuse between tests
    if (page && !page.isClosed()) {
      await page.close();
    }
  });

  test('Valid Login should navigate to dashboard', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await baseTest.verifyDashboardURL();
    await baseTest.verifyDashboardVisible();
    await expect(page).toHaveURL(/.*action=index.*module=Home/);
  });
});
   