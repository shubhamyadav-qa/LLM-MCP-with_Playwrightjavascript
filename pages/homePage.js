class HomePage {
  constructor(page) {
    this.page = page;
    this.dashboardTitle = page.locator('text=Dashboard');
    this.homeTab = page.locator('a[href*="module=Home"]');
    this.quickCreateButton = page.locator('img[title="Quick Create"]');
    this.recentActivities = page.locator('.recentActivities');
  }

  async navigateToHome() {
    await this.homeTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyDashboardLoaded() {
    await this.dashboardTitle.waitFor({ state: 'visible' });
    return await this.dashboardTitle.isVisible();
  }

  async getDashboardTitle() {
    return await this.dashboardTitle.textContent();
  }

  async clickQuickCreate() {
    await this.quickCreateButton.click();
  }

  async verifyRecentActivitiesVisible() {
    return await this.recentActivities.isVisible();
  }
}

module.exports = HomePage;