const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const OpportunitiesPage = require('../pages/opportunitiesPage');
const loginData = require('../test-data/loginData');
const moduleData = require('../test-data/moduleData');

test.describe('VTiger CRM Opportunities Module Tests', () => {
  let loginPage;
  let opportunitiesPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    opportunitiesPage = new OpportunitiesPage(page);
    await page.goto('/');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
  });

  test('Navigate to Opportunities module', async ({ page }) => {
    await opportunitiesPage.navigateToOpportunities();
    await expect(page).toHaveURL(/.*module=Potentials/);
  });

  test('Create a new opportunity', async () => {
    await opportunitiesPage.navigateToOpportunities();
    const initialCount = await opportunitiesPage.getOpportunitiesCount();
    await opportunitiesPage.createOpportunity(moduleData.opportunities.potentialName, moduleData.opportunities.accountName, moduleData.opportunities.amount);
    const isCreated = await opportunitiesPage.verifyOpportunityCreated(moduleData.opportunities.potentialName);
    expect(isCreated).toBe(true);
    const finalCount = await opportunitiesPage.getOpportunitiesCount();
    expect(finalCount).toBe(initialCount + 1);
  });

  test('Edit an existing opportunity', async () => {
    await opportunitiesPage.navigateToOpportunities();
    await opportunitiesPage.editOpportunity('Updated Opportunity Name');
    const isUpdated = await opportunitiesPage.verifyOpportunityCreated('Updated Opportunity Name');
    expect(isUpdated).toBe(true);
  });

  test('Delete an opportunity', async () => {
    await opportunitiesPage.navigateToOpportunities();
    const initialCount = await opportunitiesPage.getOpportunitiesCount();
    await opportunitiesPage.deleteOpportunity();
    const finalCount = await opportunitiesPage.getOpportunitiesCount();
    expect(finalCount).toBe(initialCount - 1);
  });
});