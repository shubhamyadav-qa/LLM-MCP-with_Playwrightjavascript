class BrowserManager {
  constructor(page) {
    this.page = page;
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }

  async scrollToElement(locator) {
    await locator.scrollIntoViewIfNeeded();
  }
}

module.exports = BrowserManager;