const { expect } = require('@playwright/test');

class BaseTest {
  constructor(page) {
    this.page = page;
  }

  async navigateToHome() {
    await this.page.goto('/');
  }

  async verifyDashboardURL() {
    await expect(this.page).toHaveURL(/.*action=index.*module=Home/);
  }

  async verifyDashboardVisible() {
    await expect(this.page.locator('text=Dashboard')).toBeVisible();
  }

  async verifyErrorMessageVisible(errorLocator) {
    await expect(errorLocator).toBeVisible();
  }
}

module.exports = BaseTest;
