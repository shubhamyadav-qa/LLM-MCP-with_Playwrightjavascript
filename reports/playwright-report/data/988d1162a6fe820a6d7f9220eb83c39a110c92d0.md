# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: activities.spec.js >> VTiger CRM Activities Module Tests >> Navigate to Activities module
- Location: tests\activities.spec.js:25:3

# Error details

```
Error: locator.click: Target page, context or browser has been closed
```

# Test source

```ts
  1  | class ActivitiesPage {
  2  |   constructor(page) {
  3  |     this.page = page;
  4  |     this.activitiesTab = page.locator('a[href*="module=Activities"]');
  5  |     this.createTaskButton = page.locator('input[value="New Task"]');
  6  |     this.createEventButton = page.locator('input[value="New Event"]');
  7  |     this.subjectInput = page.locator('input[name="subject"]');
  8  |     this.saveButton = page.locator('input[name="button"]');
  9  |     this.successMessage = page.locator('font[color="green"]');
  10 |     this.activitiesTable = page.locator('.lvt');
  11 |     this.editButton = page.locator('input[value="Edit"]');
  12 |     this.deleteButton = page.locator('input[value="Delete"]');
  13 |   }
  14 | 
  15 |   async navigateToActivities() {
> 16 |     await this.activitiesTab.click();
     |                              ^ Error: locator.click: Target page, context or browser has been closed
  17 |     await this.page.waitForLoadState('networkidle');
  18 |   }
  19 | 
  20 |   async createTask(subject) {
  21 |     await this.createTaskButton.click();
  22 |     await this.subjectInput.fill(subject);
  23 |     await this.saveButton.click();
  24 |   }
  25 | 
  26 |   async createEvent(subject) {
  27 |     await this.createEventButton.click();
  28 |     await this.subjectInput.fill(subject);
  29 |     await this.saveButton.click();
  30 |   }
  31 | 
  32 |   async editActivity(newSubject) {
  33 |     await this.editButton.click();
  34 |     await this.subjectInput.fill(newSubject);
  35 |     await this.saveButton.click();
  36 |   }
  37 | 
  38 |   async deleteActivity() {
  39 |     await this.deleteButton.click();
  40 |     await this.page.locator('text=OK').click();
  41 |   }
  42 | 
  43 |   async verifyActivityCreated(activityName) {
  44 |     await this.successMessage.waitFor({ state: 'visible' });
  45 |     return await this.page.locator(`text=${activityName}`).isVisible();
  46 |   }
  47 | 
  48 |   async verifyActivityDeleted(activityName) {
  49 |     return !(await this.page.locator(`text=${activityName}`).isVisible());
  50 |   }
  51 | 
  52 |   async getActivitiesCount() {
  53 |     return await this.activitiesTable.locator('tr').count() - 1;
  54 |   }
  55 | }
  56 | 
  57 | module.exports = ActivitiesPage;
```