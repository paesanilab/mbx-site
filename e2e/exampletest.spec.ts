import { expect, test } from "@playwright/test";

test("Navigates to index page and makes sure that the page exists", async ({ page }) => {
    await page.goto("/");
    expect(page).toBeDefined();
});
