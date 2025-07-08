const {test, expect} = require('@playwright/test');

test.describe('Sauce Demo Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Sauce Demo login page before each test
    await page.goto('https://www.saucedemo.com/');
    });
  });

  test('should display error message for invalid credentials', async ({ page }) => {
     await page.goto('https://www.saucedemo.com/');
    // Enter invalid username and password
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'invalid_password');
    await page.click('#login-button');

    // Check for error message
    const errorMessage = await page.locator('.error-message-container').textContent();
    expect(errorMessage).toContain('Username and password do not match any user in this service');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
     await page.goto('https://www.saucedemo.com/');
    // Enter valid username and password
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Check if the inventory page is displayed
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('should display locked out message for locked out user', async ({ page }) => {
     await page.goto('https://www.saucedemo.com/');
    // Enter locked out user credentials
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Check for locked out message
    const errorMessage = await page.locator('.error-message-container').textContent();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should display error message for empty username or password', async ({ page }) => {
     await page.goto('https://www.saucedemo.com/');
    // Attempt to login with empty username
    await page.fill('#user-name', '');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    let errorMessage = await page.locator('.error-message-container').textContent();
    expect(errorMessage).toContain('Epic sadface: Username is required');

    // Attempt to login with empty password
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', '');
    await page.click('#login-button');

    errorMessage = await page.locator('.error-message-container').textContent();
    expect(errorMessage).toContain('Epic sadface: Password is required');
  });