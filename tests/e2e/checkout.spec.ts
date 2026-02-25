import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {
  test('should display checkout success page', async ({ page }) => {
    await page.goto('/checkout/test-order?success=true');
    await expect(page.getByText(/payment successful/i)).toBeVisible();
  });

  test('should show order links on success page', async ({ page }) => {
    await page.goto('/checkout/test-order?success=true');
    await expect(page.getByRole('link', { name: /view orders|continue/i }).first()).toBeVisible();
  });
});
