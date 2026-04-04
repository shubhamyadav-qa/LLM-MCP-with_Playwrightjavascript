const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const loginData = require('../test-data/loginData');
const moduleData = require('../test-data/moduleData');

test.describe('VTiger CRM Home Module Tests', () => {
  let loginPage;
  let homePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    await page.goto('/');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
  });

  test('Navigate to Home module', async ({ page }) => {
    await homePage.navigateToHome();
    await expect(page).toHaveURL(/.*action=index.*module=Home/);
    const isDashboardLoaded = await homePage.verifyDashboardLoaded();
    expect(isDashboardLoaded).toBe(true);
  });

  test('Verify dashboard elements are visible', async () => {
    const dashboardTitle = await homePage.getDashboardTitle();
    expect(dashboardTitle).toContain('Dashboard');
    const recentActivitiesVisible = await homePage.verifyRecentActivitiesVisible();
    expect(recentActivitiesVisible).toBe(true);
  });

  test('Click Quick Create button', async () => {
    await homePage.clickQuickCreate();
    // Verify quick create menu appears
    await expect(page.locator('.quickCreateMenu')).toBeVisible();
  });
});