const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const LeadsPage = require('../pages/leadsPage');
const loginData = require('../test-data/loginData');
const leadsData = require('../test-data/leadsData');

test.describe('VTiger CRM Leads Module Tests', () => {
  let loginPage;
  let leadsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    leadsPage = new LeadsPage(page);
    await page.goto('/');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
  });

  test.afterEach(async ({ page }) => {
    // Close current page to avoid browser reuse between tests
    if (page && !page.isClosed()) {
      await page.close();
    }
  });

  test('Navigate to Leads module', async ({ page }) => {
    await leadsPage.navigateToLeads();
    await expect(page).toHaveURL(/.*module=Leads.*action=index/);
    expect(await leadsPage.leadsTab.isVisible()).toBe(true);
  });

  test('Create new Lead', async () => {
    const uniqueSuffix = Date.now();
    const leadName = `${leadsData.firstName}${uniqueSuffix} ${leadsData.lastName}${uniqueSuffix}`;

    await leadsPage.navigateToLeads();
    await leadsPage.createLead(`${leadsData.firstName}${uniqueSuffix}`, `${leadsData.lastName}${uniqueSuffix}`, leadsData.company);

    const created = await leadsPage.verifyLeadCreated(leadName);
    expect(created).toBe(true);
  });

  test('Verify Lead created successfully', async () => {
    const uniqueSuffix = Date.now();
    const leadName = `${leadsData.firstName}${uniqueSuffix} ${leadsData.lastName}${uniqueSuffix}`;

    await leadsPage.navigateToLeads();
    await leadsPage.createLead(`${leadsData.firstName}${uniqueSuffix}`, `${leadsData.lastName}${uniqueSuffix}`, leadsData.company);
    await leadsPage.searchLead(leadName);

    const found = await leadsPage.verifyLeadCreated(leadName);
    expect(found).toBe(true);
  });

  test('Edit Lead', async () => {
    const uniqueSuffix = Date.now();
    const leadName = `${leadsData.firstName}${uniqueSuffix} ${leadsData.lastName}${uniqueSuffix}`;
    const updatedName = `${leadsData.updatedFirstName}${uniqueSuffix} ${leadsData.updatedLastName}${uniqueSuffix}`;

    await leadsPage.navigateToLeads();
    await leadsPage.createLead(`${leadsData.firstName}${uniqueSuffix}`, `${leadsData.lastName}${uniqueSuffix}`, leadsData.company);
    await leadsPage.editLead(leadName, `${leadsData.updatedFirstName}${uniqueSuffix}`, `${leadsData.updatedLastName}${uniqueSuffix}`);

    const updated = await leadsPage.verifyLeadCreated(updatedName);
    expect(updated).toBe(true);
  });

  test('Delete Lead', async () => {
    const uniqueSuffix = Date.now();
    const leadName = `${leadsData.firstName}${uniqueSuffix} ${leadsData.lastName}${uniqueSuffix}`;

    await leadsPage.navigateToLeads();
    await leadsPage.createLead(`${leadsData.firstName}${uniqueSuffix}`, `${leadsData.lastName}${uniqueSuffix}`, leadsData.company);
    await leadsPage.deleteLead(leadName);

    const deleted = await leadsPage.verifyLeadDeleted(leadName);
    expect(deleted).toBe(true);
  });
});