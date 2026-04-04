class ElementUtil {
  constructor(page) {
    this.page = page;
  }

  async clickElement(locator) {
    await locator.click();
  }

  async fillInput(locator, value) {
    await locator.fill(value);
  }

  async selectDropdown(locator, value) {
    await locator.selectOption(value);
  }

  async getText(locator) {
    return await locator.textContent();
  }

  async isElementVisible(locator) {
    return await locator.isVisible();
  }

  async waitForElement(locator, timeout = 10000) {
    await locator.waitFor({ state: 'visible', timeout });
  }
}

module.exports = ElementUtil;