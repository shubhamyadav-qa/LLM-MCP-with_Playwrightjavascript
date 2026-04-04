class ReportsPage {
  constructor(page) {
    this.page = page;
    this.reportsTab = page.locator('a[href*="module=Reports"]');
    this.createReportButton = page.locator('input[value="New Report"]');
    this.reportNameInput = page.locator('input[name="reportname"]');
    this.saveButton = page.locator('input[name="button"]');
    this.successMessage = page.locator('font[color="green"]');
    this.reportsTable = page.locator('.lvt');
    this.editButton = page.locator('input[value="Edit"]');
    this.deleteButton = page.locator('input[value="Delete"]');
  }

  async navigateToReports() {
    await this.reportsTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createReport(reportName) {
    await this.createReportButton.click();
    await this.reportNameInput.fill(reportName);
    await this.saveButton.click();
  }

  async editReport(newReportName) {
    await this.editButton.click();
    await this.reportNameInput.fill(newReportName);
    await this.saveButton.click();
  }

  async deleteReport() {
    await this.deleteButton.click();
    await this.page.locator('text=OK').click();
  }

  async verifyReportCreated(reportName) {
    await this.successMessage.waitFor({ state: 'visible' });
    return await this.page.locator(`text=${reportName}`).isVisible();
  }

  async verifyReportDeleted(reportName) {
    return !(await this.page.locator(`text=${reportName}`).isVisible());
  }

  async getReportsCount() {
    return await this.reportsTable.locator('tr').count() - 1;
  }
}

module.exports = ReportsPage;