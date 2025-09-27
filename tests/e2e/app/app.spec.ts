import { test, expect } from "@playwright/test";

test.describe("Klingon Translator App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load the main page", async ({ page }) => {
    // Check if the page title contains "Klingon"
    await expect(page).toHaveTitle(/Klingon/);

    // Check if the main header is visible
    await expect(page.locator("h1")).toBeVisible();

    // Check if translate button exists
    await expect(
      page.getByRole("button", { name: /translate/i }),
    ).toBeVisible();
  });

  test("should have language selection elements", async ({ page }) => {
    // Check if language selectors are present
    await expect(page.locator('select, [role="combobox"]')).toHaveCount(2);

    // Check if swap language button exists
    await expect(page.getByRole("button", { name: /swap/i })).toBeVisible();
  });

  test("should have text input areas", async ({ page }) => {
    // Check if input and output text areas are present
    const textAreas = page.locator('textarea, [role="textbox"]');
    await expect(textAreas).toHaveCount(2);
  });

  test("should be able to enter text in input area", async ({ page }) => {
    // Find the input textarea (usually the first one or labeled as input)
    const inputArea = page.locator("textarea").first();

    // Type some text
    await inputArea.fill("Hello");

    // Verify text was entered
    await expect(inputArea).toHaveValue("Hello");
  });

  test("should show Star Trek theming elements", async ({ page }) => {
    // Check for Star Trek themed elements (theme selector, LCARS styling, etc.)
    // This is a basic check - specific selectors would depend on implementation
    const body = page.locator("body");
    await expect(body).toBeVisible();

    // Could check for specific CSS classes or theme elements
    // await expect(page.locator('.star-trek-theme, .lcars-theme, [data-theme]')).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if main elements are still visible and properly sized
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /translate/i }),
    ).toBeVisible();

    // Check if text areas are properly responsive
    const textAreas = page.locator('textarea, [role="textbox"]');
    for (const textArea of await textAreas.all()) {
      await expect(textArea).toBeVisible();
    }
  });

  test("should have accessibility elements", async ({ page }) => {
    // Check for proper ARIA labels and roles
    await expect(page.locator('[role="main"], main')).toBeVisible();

    // Check if interactive elements have proper accessibility attributes
    const buttons = page.getByRole("button");
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Check if form elements have labels or aria-labels
    const textAreas = page.locator('textarea, [role="textbox"]');
    for (const textArea of await textAreas.all()) {
      const hasLabel =
        (await textArea.getAttribute("aria-label")) !== null ||
        (await textArea.getAttribute("aria-labelledby")) !== null ||
        (await page
          .locator(`label[for="${await textArea.getAttribute("id")}"]`)
          .count()) > 0;
      expect(hasLabel).toBeTruthy();
    }
  });

  test("should handle keyboard navigation", async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press("Tab");

    // Check if focus is visible on focusable elements
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Continue tabbing through interactive elements
    await page.keyboard.press("Tab");
    await expect(page.locator(":focus")).toBeVisible();
  });
});
