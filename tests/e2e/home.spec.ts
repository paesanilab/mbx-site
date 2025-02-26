import { expect, test } from "@playwright/test";

test("Navigates to home page and checks if heading is visible", async ({ page }) => {
    await page.goto("/");
    // Make sure that the 'Advancing Molecular Dynamics' heading is on screen
    await expect(page.getByTestId("home_heading")).toBeVisible();
});
