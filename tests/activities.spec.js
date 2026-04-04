const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const ActivitiesPage = require('../pages/activitiesPage');
const loginData = require('../test-data/loginData');
const moduleData = require('../test-data/moduleData');

test.describe('VTiger CRM Activities Module Tests', () => {
  let loginPage;
  let activitiesPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    activitiesPage = new ActivitiesPage(page);
    await page.goto('/');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
  });

  test('Navigate to Activities module', async ({ page }) => {
    await activitiesPage.navigateToActivities();
    await expect(page).toHaveURL(/.*module=Activities/);
  });

  test('Create a new task', async () => {
    await activitiesPage.navigateToActivities();
    const initialCount = await activitiesPage.getActivitiesCount();
    await activitiesPage.createTask(moduleData.activities.taskSubject);
    const isCreated = await activitiesPage.verifyActivityCreated(moduleData.activities.taskSubject);
    expect(isCreated).toBe(true);
    const finalCount = await activitiesPage.getActivitiesCount();
    expect(finalCount).toBe(initialCount + 1);
  });

  test('Create a new event', async () => {
    await activitiesPage.navigateToActivities();
    const initialCount = await activitiesPage.getActivitiesCount();
    await activitiesPage.createEvent(moduleData.activities.eventSubject);
    const isCreated = await activitiesPage.verifyActivityCreated(moduleData.activities.eventSubject);
    expect(isCreated).toBe(true);
    const finalCount = await activitiesPage.getActivitiesCount();
    expect(finalCount).toBe(initialCount + 1);
  });

  test('Edit an existing activity', async () => {
    await activitiesPage.navigateToActivities();
    await activitiesPage.editActivity('Updated Activity Subject');
    const isUpdated = await activitiesPage.verifyActivityCreated('Updated Activity Subject');
    expect(isUpdated).toBe(true);
  });

  test('Delete an activity', async () => {
    await activitiesPage.navigateToActivities();
    const initialCount = await activitiesPage.getActivitiesCount();
    await activitiesPage.deleteActivity();
    const finalCount = await activitiesPage.getActivitiesCount();
    expect(finalCount).toBe(initialCount - 1);
  });
});