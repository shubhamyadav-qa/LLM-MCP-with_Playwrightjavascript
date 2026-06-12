const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const LeadsPage = require('../pages/leadsPage');
const ContactsPage = require('../pages/contactsPage');
const AccountsPage = require('../pages/accountsPage');
const ActivitiesPage = require('../pages/activitiesPage');
const loginData = require('../test-data/loginData');
const BaseTest = require('../utils/baseTest');

test.describe('VTiger CRM Smoke Tests', () => {
  let loginPage;
  let homePage;
  let leadsPage;
  let contactsPage;
  let accountsPage;
  let activitiesPage;
  let baseTest;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    leadsPage = new LeadsPage(page);
    contactsPage = new ContactsPage(page);
    accountsPage = new AccountsPage(page);
    activitiesPage = new ActivitiesPage(page);
    baseTest = new BaseTest(page);
    await baseTest.navigateToHome();
  });

  test.afterEach(async ({ page }) => {
    // Close current page to avoid browser reuse between tests
    if (page && !page.isClosed()) {
      await page.close();
    }
  });

  test('SMOKE-001: User can login successfully', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await expect(page).toHaveURL(/.*action=index.*module=Home/);
  });

  test('SMOKE-002: Dashboard is accessible after login', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    const dashboardVisible = await baseTest.verifyDashboardVisible();
    await expect(dashboardVisible).toBeTruthy();
  });

  test('SMOKE-003: Leads module is accessible', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await baseTest.navigateToModule('Leads');
    await expect(page).toHaveURL(/.*module=Leads/);
  });

  test('SMOKE-004: Contacts module is accessible', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await baseTest.navigateToModule('Contacts');
    await expect(page).toHaveURL(/.*module=Contacts/);
  });

  test('SMOKE-005: Accounts module is accessible', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await baseTest.navigateToModule('Accounts');
    await expect(page).toHaveURL(/.*module=Accounts/);
  });

  test('SMOKE-006: Activities module is accessible', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await baseTest.navigateToModule('Activities');
    await expect(page).toHaveURL(/.*module=Activities/);
  });

  test('SMOKE-007: Reports module is accessible', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await baseTest.navigateToModule('Reports');
    await expect(page).toHaveURL(/.*module=Reports/);
  });

  test('SMOKE-008: User can logout successfully', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    await homePage.logout();
    await expect(page).toHaveURL(/.*module=Users/);
  });

  test('SMOKE-009: Application is responsive and fully loaded', async ({ page }) => {
    await loginPage.login(loginData.valid.username, loginData.valid.password);
    // Verify key UI elements are loaded
    await baseTest.verifyDashboardURL();
    await baseTest.verifyDashboardVisible();
    // Check page is interactive
    const isReady = await page.evaluate(() => document.readyState === 'complete');
    await expect(isReady).toBeTruthy();
  });
});
