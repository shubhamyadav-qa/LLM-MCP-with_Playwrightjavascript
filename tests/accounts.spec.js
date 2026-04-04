const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const AccountsPage = require('../pages/accountsPage');
const loginData = require('../test-data/loginData');
const moduleData = require('../test-data/moduleData');

test.describe('VTiger CRM Accounts Module Tests', () => {
  let loginPage;
  let accountsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    accountsPage = new AccountsPage(page);
    await page.goto('/');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
  });

  test('Navigate to Accounts module', async ({ page }) => {
    await accountsPage.navigateToAccounts();
    await expect(page).toHaveURL(/.*module=Accounts/);
  });

  test('Create a new account', async () => {
    await accountsPage.navigateToAccounts();
    const initialCount = await accountsPage.getAccountsCount();
    await accountsPage.createAccount(moduleData.accounts.accountName, moduleData.accounts.website);
    const isCreated = await accountsPage.verifyAccountCreated(moduleData.accounts.accountName);
    expect(isCreated).toBe(true);
    const finalCount = await accountsPage.getAccountsCount();
    expect(finalCount).toBe(initialCount + 1);
  });

  test('Edit an existing account', async () => {
    await accountsPage.navigateToAccounts();
    await accountsPage.editAccount('Updated Account Name');
    const isUpdated = await accountsPage.verifyAccountCreated('Updated Account Name');
    expect(isUpdated).toBe(true);
  });

  test('Delete an account', async () => {
    await accountsPage.navigateToAccounts();
    const initialCount = await accountsPage.getAccountsCount();
    await accountsPage.deleteAccount();
    const finalCount = await accountsPage.getAccountsCount();
    expect(finalCount).toBe(initialCount - 1);
  });
});