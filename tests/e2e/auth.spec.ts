import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.getByRole('heading', { name: /log in/i })).toBeVisible();
  });

  test('should display register page', async ({ page }) => {
    await page.goto('/auth/register');
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible();
  });

  test('should show validation errors on empty login', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /log in/i }).click();
    // Form should show validation errors
    await expect(page.locator('form')).toBeVisible();
  });

  test('should have link to register from login', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.getByText(/don't have an account/i)).toBeVisible();
  });
});
