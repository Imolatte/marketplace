import { test, expect } from '@playwright/test';

test.describe('Listing Flow', () => {
  test('should display listings page', async ({ page }) => {
    await page.goto('/listings');
    await expect(page.getByText(/search/i)).toBeVisible();
  });

  test('should show filters on listings page', async ({ page }) => {
    await page.goto('/listings');
    // Check for filter elements
    await expect(page.locator('form, [role="group"]').first()).toBeVisible();
  });
});
