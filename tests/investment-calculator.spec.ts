import { test, expect } from '@playwright/test';

test.describe('Investment calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/Investment calculator/);
      });
      
    test('Calculate propere', async ({ page }) => {
        await page.getByLabel("Annual percentage rate:").fill("6");
        await page.getByLabel("Deposits within one year:").fill("4");
        await page.getByLabel("One-time deposit:").fill("1500");
        await page.getByLabel("Deposit fee:").fill("14");
        await page.getByLabel("Investment duration in years:").fill("15");
        await page.getByLabel("Initial deposit:").fill("0");

        await expect(page.getByText('Final balance:144 854,77 zł')).toBeVisible();
        await expect(page.getByText('Deposit:90 000,00 zł')).toBeVisible();
        await expect(page.getByText('Profit:43 592,36 zł')).toBeVisible();
        await expect(page.getByText('Tax (19%):10 422,41 zł')).toBeVisible();
        await expect(page.getByText('Fee:840,00 zł')).toBeVisible();
    });
});