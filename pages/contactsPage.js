class ContactsPage {
  constructor(page) {
    this.page = page;
    this.contactsTab = page.locator('a[href*="module=Contacts"]');
    this.createContactButton = page.locator('input[value="New Contact"]');
    this.firstNameInput = page.locator('input[name="firstname"]');
    this.lastNameInput = page.locator('input[name="lastname"]');
    this.emailInput = page.locator('input[name="email"]');
    this.saveButton = page.locator('input[name="button"]');
    this.successMessage = page.locator('font[color="green"]');
    this.contactsTable = page.locator('.lvt');
    this.editButton = page.locator('input[value="Edit"]');
    this.deleteButton = page.locator('input[value="Delete"]');
  }

  async navigateToContacts() {
    await this.contactsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createContact(firstName, lastName, email) {
    await this.createContactButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.saveButton.click();
  }

  async editContact(newFirstName, newLastName) {
    await this.editButton.click();
    await this.firstNameInput.fill(newFirstName);
    await this.lastNameInput.fill(newLastName);
    await this.saveButton.click();
  }

  async deleteContact() {
    await this.deleteButton.click();
    await this.page.locator('text=OK').click();
  }

  async verifyContactCreated(contactName) {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.page.locator(`text=${contactName}`).isVisible();
  }

  async verifyContactDeleted(contactName) {
    return !(await this.page.locator(`text=${contactName}`).isVisible());
  }

  async getContactsCount() {
    return await this.contactsTable.locator('tr').count() - 1;
  }
}

module.exports = ContactsPage;