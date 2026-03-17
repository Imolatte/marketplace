import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the marketplace title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('SecondHand Marketplace')).toBeVisible();
  });

  test('should have a browse button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: /view all|browse/i })).toBeVisible();
  });

  test('should navigate to listings page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /view all/i }).click();
    await expect(page).toHaveURL(/\/listings/);
  });
});
