class OpportunitiesPage {
  constructor(page) {
    this.page = page;
    this.opportunitiesTab = page.locator('a[href*="module=Potentials"]');
    this.createOpportunityButton = page.locator('input[value="New Potential"]');
    this.potentialNameInput = page.locator('input[name="potentialname"]');
    this.accountNameInput = page.locator('input[name="account_name"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.saveButton = page.locator('input[name="button"]');
    this.successMessage = page.locator('font[color="green"]');
    this.opportunitiesTable = page.locator('.lvt');
    this.editButton = page.locator('input[value="Edit"]');
    this.deleteButton = page.locator('input[value="Delete"]');
  }

  async navigateToOpportunities() {
    await this.opportunitiesTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createOpportunity(potentialName, accountName, amount) {
    await this.createOpportunityButton.click();
    await this.potentialNameInput.fill(potentialName);
    await this.accountNameInput.fill(accountName);
    await this.amountInput.fill(amount);
    await this.saveButton.click();
  }

  async editOpportunity(newPotentialName) {
    await this.editButton.click();
    await this.potentialNameInput.fill(newPotentialName);
    await this.saveButton.click();
  }

  async deleteOpportunity() {
    await this.deleteButton.click();
    await this.page.locator('text=OK').click();
  }

  async verifyOpportunityCreated(opportunityName) {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.page.locator(`text=${opportunityName}`).isVisible();
  }

  async verifyOpportunityDeleted(opportunityName) {
    return !(await this.page.locator(`text=${opportunityName}`).isVisible());
  }

  async getOpportunitiesCount() {
    return await this.opportunitiesTable.locator('tr').count() - 1;
  }
}

module.exports = OpportunitiesPage;