# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leads.spec.js >> VTiger CRM Leads Module Tests >> Delete Lead
- Location: tests\leads.spec.js:60:3

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:8888/", waiting until "load"

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const LoginPage = require('../pages/loginPage');
  3  | const LeadsPage = require('../pages/leadsPage');
  4  | const loginData = require('../test-data/loginData');
  5  | const leadsData = require('../test-data/leadsData');
  6  | 
  7  | test.describe('VTiger CRM Leads Module Tests', () => {
  8  |   let loginPage;
  9  |   let leadsPage;
  10 | 
  11 |   test.beforeEach(async ({ page }) => {
  12 |     loginPage = new LoginPage(page);
  13 |     leadsPage = new LeadsPage(page);
> 14 |     await page.goto('/');
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  15 |     await loginPage.login(loginData.valid.username, loginData.valid.password);
  16 |   });
  17 | 
  18 |   test('Navigate to Leads module', async ({ page }) => {
  19 |     await leadsPage.navigateToLeads();
  20 |     await expect(page).toHaveURL(/.*module=Leads.*action=index/);
  21 |     expect(await leadsPage.leadsTab.isVisible()).toBe(true);
  22 |   });
  23 | 
  24 |   test('Create new Lead', async () => {
  25 |     const uniqueSuffix = Date.now();
  26 |     const leadName = `${leadsData.firstName}${uniqueSuffix} ${leadsData.lastName}${uniqueSuffix}`;
  27 | 
  28 |     await leadsPage.navigateToLeads();
  29 |     await leadsPage.createLead(`${leadsData.firstName}${uniqueSuffix}`, `${leadsData.lastName}${uniqueSuffix}`, leadsData.company);
  30 | 
  31 |     const created = await leadsPage.verifyLeadCreated(leadName);
  32 |     expect(created).toBe(true);
  33 |   });
  34 | 
  35 |   test('Verify Lead created successfully', async () => {
  36 |     const uniqueSuffix = Date.now();
  37 |     const leadName = `${leadsData.firstName}${uniqueSuffix} ${leadsData.lastName}${uniqueSuffix}`;
  38 | 
  39 |     await leadsPage.navigateToLeads();
  40 |     await leadsPage.createLead(`${leadsData.firstName}${uniqueSuffix}`, `${leadsData.lastName}${uniqueSuffix}`, leadsData.company);
  41 |     await leadsPage.searchLead(leadName);
  42 | 
  43 |     const found = await leadsPage.verifyLeadCreated(leadName);
  44 |     expect(found).toBe(true);
  45 |   });
  46 | 
  47 |   test('Edit Lead', async () => {
  48 |     const uniqueSuffix = Date.now();
  49 |     const leadName = `${leadsData.firstName}${uniqueSuffix} ${leadsData.lastName}${uniqueSuffix}`;
  50 |     const updatedName = `${leadsData.updatedFirstName}${uniqueSuffix} ${leadsData.updatedLastName}${uniqueSuffix}`;
  51 | 
  52 |     await leadsPage.navigateToLeads();
  53 |     await leadsPage.createLead(`${leadsData.firstName}${uniqueSuffix}`, `${leadsData.lastName}${uniqueSuffix}`, leadsData.company);
  54 |     await leadsPage.editLead(leadName, `${leadsData.updatedFirstName}${uniqueSuffix}`, `${leadsData.updatedLastName}${uniqueSuffix}`);
  55 | 
  56 |     const updated = await leadsPage.verifyLeadCreated(updatedName);
  57 |     expect(updated).toBe(true);
  58 |   });
  59 | 
  60 |   test('Delete Lead', async () => {
  61 |     const uniqueSuffix = Date.now();
  62 |     const leadName = `${leadsData.firstName}${uniqueSuffix} ${leadsData.lastName}${uniqueSuffix}`;
  63 | 
  64 |     await leadsPage.navigateToLeads();
  65 |     await leadsPage.createLead(`${leadsData.firstName}${uniqueSuffix}`, `${leadsData.lastName}${uniqueSuffix}`, leadsData.company);
  66 |     await leadsPage.deleteLead(leadName);
  67 | 
  68 |     const deleted = await leadsPage.verifyLeadDeleted(leadName);
  69 |     expect(deleted).toBe(true);
  70 |   });
  71 | });
```