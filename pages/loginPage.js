class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="user_name"]');
    this.passwordInput = page.locator('input[name="user_password"]');
    this.loginButton = page.locator('input[id="submitButton"], input[type="submit"], button[type="submit"]');
    this.errorMessage = page.locator('font[color="red"], .error, .alert');
  }

  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getErrorMessage() {
    try {
      await this.errorMessage.first().waitFor({ state: 'visible', timeout: 5000 });
      return this.errorMessage;
    } catch (error) {
      const fallbackMessage = this.page.locator('text=/You must specify|Username or Password|Login failed|Invalid username/');
      await fallbackMessage.first().waitFor({ state: 'visible', timeout: 5000 });
      return fallbackMessage;
    }
  }
}

module.exports = LoginPage;
