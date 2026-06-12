const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const ReportsPage = require('../pages/reportsPage');
const loginData = require('../test-data/loginData');
const moduleData = require('../test-data/moduleData');

test.describe('VTiger CRM Reports Module Tests', () => {
  let loginPage;
  let reportsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    reportsPage = new ReportsPage(page);
    await page.goto('/');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
  });

  test.afterEach(async ({ page }) => {
    // Close current page to avoid browser reuse between tests
    if (page && !page.isClosed()) {
      await page.close();
    }
  });

  test('Navigate to Reports module', async ({ page }) => {
    await reportsPage.navigateToReports();
    await expect(page).toHaveURL(/.*module=Reports/);
  });

  test('Create a new report', async () => {
    await reportsPage.navigateToReports();
    const initialCount = await reportsPage.getReportsCount();
    await reportsPage.createReport(moduleData.reports.reportName);
    const isCreated = await reportsPage.verifyReportCreated(moduleData.reports.reportName);
    expect(isCreated).toBe(true);
    const finalCount = await reportsPage.getReportsCount();
    expect(finalCount).toBe(initialCount + 1);
  });

  test('Edit an existing report', async () => {
    await reportsPage.navigateToReports();
    await reportsPage.editReport('Updated Report Name');
    const isUpdated = await reportsPage.verifyReportCreated('Updated Report Name');
    expect(isUpdated).toBe(true);
  });

  test('Delete a report', async () => {
    await reportsPage.navigateToReports();
    const initialCount = await reportsPage.getReportsCount();
    await reportsPage.deleteReport();
    const finalCount = await reportsPage.getReportsCount();
    expect(finalCount).toBe(initialCount - 1);
  });
});