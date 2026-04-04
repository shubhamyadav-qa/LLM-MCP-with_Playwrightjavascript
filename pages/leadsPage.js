class LeadsPage {
  constructor(page) {
    this.page = page;
    this.leadsTab = page.getByRole('link', { name: 'Leads' });
    this.leadsPageURL = 'http://localhost:8888/index.php?module=Leads&action=index';
    this.createLeadButton = page.locator('input[value="New Lead"], button:has-text("New Lead")');
    this.firstNameInput = page.locator('input[name="firstname"]');
    this.lastNameInput = page.locator('input[name="lastname"]');
    this.companyInput = page.locator('input[name="company"]');
    this.saveButton = page.locator('input[name="button"], button:has-text("Save")');
    this.searchField = page.locator('input[name="search_text"]');
    this.searchButton = page.locator('input[name="submit"], button:has-text("Search")');
    this.successMessage = page.locator('font[color="green"]');
    this.leadsTable = page.locator('.lvt');
  }

  async navigateToLeads() {
    await this.page.goto(this.leadsPageURL);
    await this.page.waitForURL(/.*module=Leads.*action=index/);
  }

  async clickCreateLead() {
    await this.createLeadButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createLead(firstName, lastName, company) {
    await this.clickCreateLead();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.companyInput.fill(company);
    await this.saveButton.click();
  }

  async searchLead(leadName) {
    await this.searchField.fill(leadName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async editLead(leadName, newFirstName, newLastName) {
    await this.searchLead(leadName);
    const leadRow = this.leadsTable.locator('tr', { hasText: leadName }).first();
    const editButton = leadRow.locator('a:has-text("Edit"), input[value="Edit"]');
    await editButton.click();
    await this.firstNameInput.fill(newFirstName);
    await this.lastNameInput.fill(newLastName);
    await this.saveButton.click();
  }

  async deleteLead(leadName) {
    await this.searchLead(leadName);
    const leadRow = this.leadsTable.locator('tr', { hasText: leadName }).first();
    const deleteButton = leadRow.locator('a:has-text("Delete"), input[value="Delete"]');
    this.page.once('dialog', dialog => dialog.accept());
    await deleteButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLeadCreated(leadName) {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.leadsTable.locator('tr', { hasText: leadName }).first().isVisible();
  }

  async verifyLeadDeleted(leadName) {
    await this.searchLead(leadName);
    return (await this.leadsTable.locator('tr', { hasText: leadName }).count()) === 0;
  }
}

module.exports = LeadsPage;