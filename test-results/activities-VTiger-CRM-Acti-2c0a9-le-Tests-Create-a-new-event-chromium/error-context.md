# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: activities.spec.js >> VTiger CRM Activities Module Tests >> Create a new event
- Location: tests\activities.spec.js:40:3

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('input[name="user_name"]')

```

# Test source

```ts
  1  | class LoginPage {
  2  |   constructor(page) {
  3  |     this.page = page;
  4  |     this.usernameInput = page.locator('input[name="user_name"]');
  5  |     this.passwordInput = page.locator('input[name="user_password"]');
  6  |     this.loginButton = page.locator('input[id="submitButton"], input[type="submit"], button[type="submit"]');
  7  |     this.errorMessage = page.locator('font[color="red"], .error, .alert');
  8  |   }
  9  | 
  10 |   async enterUsername(username) {
> 11 |     await this.usernameInput.fill(username);
     |                              ^ Error: locator.fill: Target page, context or browser has been closed
  12 |   }
  13 | 
  14 |   async enterPassword(password) {
  15 |     await this.passwordInput.fill(password);
  16 |   }
  17 | 
  18 |   async clickLogin() {
  19 |     await this.loginButton.click();
  20 |   }
  21 | 
  22 |   async login(username, password) {
  23 |     await this.enterUsername(username);
  24 |     await this.enterPassword(password);
  25 |     await this.clickLogin();
  26 |   }
  27 | 
  28 |   async getErrorMessage() {
  29 |     try {
  30 |       await this.errorMessage.first().waitFor({ state: 'visible', timeout: 5000 });
  31 |       return this.errorMessage;
  32 |     } catch (error) {
  33 |       const fallbackMessage = this.page.locator('text=/You must specify|Username or Password|Login failed|Invalid username/');
  34 |       await fallbackMessage.first().waitFor({ state: 'visible', timeout: 5000 });
  35 |       return fallbackMessage;
  36 |     }
  37 |   }
  38 | }
  39 | 
  40 | module.exports = LoginPage;
  41 | 
```