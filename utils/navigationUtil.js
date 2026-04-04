class NavigationUtil {
  constructor(page) {
    this.page = page;
  }

  async navigateToModule(moduleName) {
    const moduleLink = this.page.locator(`a[href*="module=${moduleName}"]`);
    await moduleLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToHome() {
    await this.navigateToModule('Home');
  }

  async navigateToLeads() {
    await this.navigateToModule('Leads');
  }

  async navigateToAccounts() {
    await this.navigateToModule('Accounts');
  }

  async navigateToContacts() {
    await this.navigateToModule('Contacts');
  }

  async navigateToOpportunities() {
    await this.navigateToModule('Potentials');
  }

  async navigateToActivities() {
    await this.navigateToModule('Activities');
  }

  async navigateToCalendar() {
    await this.navigateToModule('Calendar');
  }

  async navigateToReports() {
    await this.navigateToModule('Reports');
  }

  async navigateToSettings() {
    await this.navigateToModule('Settings');
  }
}

module.exports = NavigationUtil;