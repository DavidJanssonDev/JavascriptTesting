import { test, expect, Page } from "@playwright/test";

/**
 * Helper: create todos via the UI.
 */
async function createTodos(page: Page, texts: string[]): Promise<void> {
    const input = page.locator("#todo-input");
    const addButton = page.getByRole("button", { name: "Add" });

    for (const text of texts) {
        await expect(input).toBeVisible();
        await input.fill(text);
        await addButton.click();
    }
}

test("user can add a todo", async ({ page }) => {
    await page.goto("/");

    await createTodos(page, ["Buy milk"]);

    const items = page.locator(".todo-item");
    await expect(items).toHaveCount(1);
    await expect(page.locator("#todo-count")).toHaveText("1 item left");
});

test("user can complete a todo", async ({ page }) => {
    await page.goto("/");

    await createTodos(page, ["Task 1", "Task 2"]);

    const items = page.locator(".todo-item");
    await expect(items).toHaveCount(2);

    // Use role-based locator (more robust than CSS-only)
    const firstCheckbox = items.nth(0).getByRole("checkbox");

    await firstCheckbox.check();

    // One completed, one active → 1 item left
    await expect(page.locator("#todo-count")).toHaveText("1 item left");

    // Extra: verify completed CSS class is applied
    await expect(items.nth(0)).toHaveClass("todo-item completed");
    await expect(items.nth(1)).not.toHaveClass("completed");
});

test("user can filter todos", async ({ page }) => {
    await page.goto("/");

    await createTodos(page, ["Active", "Done"]);

    const items = page.locator(".todo-item");
    await expect(items).toHaveCount(2);

    const secondCheckbox = items.nth(1).getByRole("checkbox");
    await secondCheckbox.check(); // "Done" is completed

    // Use data-filter for maximum reliability
    const activeButton = page.locator('button[data-filter="active"]');
    const completedButton = page.locator('button[data-filter="completed"]');

    await activeButton.click();
    const activeItems = page.locator(".todo-item");
    await expect(activeItems).toHaveCount(1);
    await expect(activeItems.nth(0).locator(".text")).toHaveText("Active");

    await completedButton.click();
    const completedItems = page.locator(".todo-item");
    await expect(completedItems).toHaveCount(1);
    await expect(completedItems.nth(0).locator(".text")).toHaveText("Done");
});
