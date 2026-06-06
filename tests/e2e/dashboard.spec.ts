import { expect, test } from "@playwright/test";

test("dashboard renders hero content", async ({ page }) => {
  await page.goto("/signin");
  await page.getByLabel("Email").fill("ops@signalboard.local");
  await page.getByLabel("Password").fill("signalboard");
  await page.getByRole("button", { name: "Enter workspace" }).click();

  await expect(
    page.getByRole("heading", { name: "Full-stack productivity dashboard" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Activity timeline" })).toBeVisible();
});
