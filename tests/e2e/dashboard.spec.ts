import { expect, test } from "@playwright/test";

test("dashboard renders hero content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("SignalBoard")).toBeVisible();
  await expect(
    page.getByText("Recruiter-ready productivity cockpit")
  ).toBeVisible();
  await expect(page.getByText("Activity timeline")).toBeVisible();
});
