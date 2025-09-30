import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  await page.getByTestId('email-input').fill('admin@local');
  await page.getByTestId('password').fill('admin');
  await page.getByTestId('login-btn').click();
  await expect(page).toHaveURL('http://localhost:4200/');
});
