class ActivitiesPage {
  constructor(page) {
    this.page = page;
    this.activitiesTab = page.locator('a[href*="module=Activities"]');
    this.createTaskButton = page.locator('input[value="New Task"]');
    this.createEventButton = page.locator('input[value="New Event"]');
    this.subjectInput = page.locator('input[name="subject"]');
    this.saveButton = page.locator('input[name="button"]');
    this.successMessage = page.locator('font[color="green"]');
    this.activitiesTable = page.locator('.lvt');
    this.editButton = page.locator('input[value="Edit"]');
    this.deleteButton = page.locator('input[value="Delete"]');
  }

  async navigateToActivities() {
    await this.activitiesTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createTask(subject) {
    await this.createTaskButton.click();
    await this.subjectInput.fill(subject);
    await this.saveButton.click();
  }

  async createEvent(subject) {
    await this.createEventButton.click();
    await this.subjectInput.fill(subject);
    await this.saveButton.click();
  }

  async editActivity(newSubject) {
    await this.editButton.click();
    await this.subjectInput.fill(newSubject);
    await this.saveButton.click();
  }

  async deleteActivity() {
    await this.deleteButton.click();
    await this.page.locator('text=OK').click();
  }

  async verifyActivityCreated(activityName) {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.page.locator(`text=${activityName}`).isVisible();
  }

  async verifyActivityDeleted(activityName) {
    return !(await this.page.locator(`text=${activityName}`).isVisible());
  }

  async getActivitiesCount() {
    return await this.activitiesTable.locator('tr').count() - 1;
  }
}

module.exports = ActivitiesPage;