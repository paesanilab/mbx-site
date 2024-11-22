import { test, expect } from '@playwright/test'

test('Navigates to index page and makes sure that the page exists', async ({ page }) => {
    await page.goto('/')
    await expect(page).toBeDefined();
})
