class AccountsPage {
  constructor(page) {
    this.page = page;
    this.accountsTab = page.locator('a[href*="module=Accounts"]');
    this.createAccountButton = page.locator('input[value="New Account"]');
    this.accountNameInput = page.locator('input[name="accountname"]');
    this.websiteInput = page.locator('input[name="website"]');
    this.saveButton = page.locator('input[name="button"]');
    this.successMessage = page.locator('font[color="green"]');
    this.accountsTable = page.locator('.lvt');
    this.editButton = page.locator('input[value="Edit"]');
    this.deleteButton = page.locator('input[value="Delete"]');
  }


  async navigateToAccounts() {
    await this.accountsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createAccount(accountName, website) {
    await this.createAccountButton.click();
    await this.accountNameInput.fill(accountName);
    await this.websiteInput.fill(website);
    await this.saveButton.click();
  }

  async editAccount(newAccountName) {
    await this.editButton.click();
    await this.accountNameInput.fill(newAccountName);
    await this.saveButton.click();
  }

  async deleteAccount() {
    await this.deleteButton.click();
    await this.page.locator('text=OK').click();
  }

  async verifyAccountCreated(accountName) {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.page.locator(`text=${accountName}`).isVisible();
  }

  async verifyAccountDeleted(accountName) {
    return !(await this.page.locator(`text=${accountName}`).isVisible());
  }

  async getAccountsCount() {
    return await this.accountsTable.locator('tr').count() - 1;
  }
}

module.exports = AccountsPage;