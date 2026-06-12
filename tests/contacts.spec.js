const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const ContactsPage = require('../pages/contactsPage');
const loginData = require('../test-data/loginData');
const moduleData = require('../test-data/moduleData');

test.describe('VTiger CRM Contacts Module Tests', () => {
  let loginPage;
  let contactsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    contactsPage = new ContactsPage(page);
    await page.goto('/');
    await loginPage.login(loginData.valid.username, loginData.valid.password);
  });

  test.afterEach(async ({ page }) => {
    // Close current page to avoid browser reuse between tests
    if (page && !page.isClosed()) {
      await page.close();
    }
  });

  test('Navigate to Contacts module', async ({ page }) => {
    await contactsPage.navigateToContacts();
    await expect(page).toHaveURL(/.*module=Contacts/);
  });

  test('Create a new contact', async () => {
    const contactName = `{moduleData.contacts.firstName} {moduleData.contacts.lastName}`;
    await contactsPage.navigateToContacts();
    const initialCount = await contactsPage.getContactsCount();
    await contactsPage.createContact(moduleData.contacts.firstName, moduleData.contacts.lastName, moduleData.contacts.email);
    const isCreated = await contactsPage.verifyContactCreated(contactName);
    expect(isCreated).toBe(true);
    const finalCount = await contactsPage.getContactsCount();
    expect(finalCount).toBe(initialCount + 1);
  });

  test('Verify that new Contact has Created', async()=>{
    const constactHasCreated =await contactsPage.getContactsCount();
    
  })

  test('Edit an existing contact', async () => {
    await contactsPage.navigateToContacts();
    await contactsPage.editContact('UpdatedFirst', 'UpdatedLast');
    const isUpdated = await contactsPage.verifyContactCreated('UpdatedFirst UpdatedLast');
    expect(isUpdated).toBe(true);
  });

  test('Delete a contact', async () => {
    await contactsPage.navigateToContacts();
    const initialCount = await contactsPage.getContactsCount();
    await contactsPage.deleteContact();
    const finalCount = await contactsPage.getContactsCount();
    expect(finalCount).toBe(initialCount - 1);
  });

});