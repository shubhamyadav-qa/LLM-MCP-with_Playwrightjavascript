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

  test('Valid Login should navigate to dashboard', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await baseTest.verifyDashboardURL();
    await baseTest.verifyDashboardVisible();
    await expect(page).toHaveURL(/.*action=index.*module=Home/);
  });

  test('Invalid username + valid password shows error message', async () => {
    await loginPage.login(loginData.invalidUsername.username, loginData.invalidUsername.password);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
  });

  test('Valid username + invalid password shows error message', async () => {
    await loginPage.login(loginData.invalidPassword.username, loginData.invalidPassword.password);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
  });

  test('Invalid username + invalid password shows error message', async () => {
    await loginPage.login(loginData.invalidBoth.username, loginData.invalidBoth.password);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
  });

  test('Empty username shows error message', async () => {
    await loginPage.login(loginData.emptyUsername.username, loginData.emptyUsername.password);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
  });

  test('Empty password shows error message', async () => {
    await loginPage.login(loginData.emptyPassword.username, loginData.emptyPassword.password);
    const errorMessage = await loginPage.getErrorMessage();
    await expect(errorMessage).toBeVisible();
  });
});
