const { test, expect } = require('@playwright/test');

test('Positive - login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Enter valid username and password
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');

  // Click login button
  await page.click('#login-button');

  // Verify navigation to products page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Optional: Verify product page elements
  await expect(page.locator('.title')).toHaveText('Products');
});

// Invalid username
test('Negative - login with invalid username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'invalid_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  // Verify error message
  await expect(page.locator('.error-message-container')).toContainText('Username and password do not match any user in this service');
});

// Invalid password
test('Negative - login with invalid password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'wrong_password');
  await page.click('#login-button');
  // Verify error message
  await expect(page.locator('.error-message-container')).toContainText('Username and password do not match any user in this service');
});

// Empty username
test('Negative - login with empty username', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', '');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  // Verify error message
  await expect(page.locator('.error-message-container')).toContainText('Epic sadface: Username is required');
});

// Empty password
test('Negative - login with empty password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', '');
  await page.click('#login-button');
  // Verify error message
  await expect(page.locator('.error-message-container')).toContainText('Epic sadface: Password is required');
});

// Both username and password empty
test('Negative - login with empty username and password', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', '');
  await page.fill('#password', '');
  await page.click('#login-button');
  // Verify error message
  await expect(page.locator('.error-message-container')).toContainText('Epic sadface: Username is required');
});