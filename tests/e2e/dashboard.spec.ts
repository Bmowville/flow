import { expect, test } from "@playwright/test";

test("dashboard renders hero content", async ({ page }) => {
  await page.goto("/signin");
  await page.getByLabel("Email").fill("demo@signalboard.ai");
  await page.getByLabel("Password").fill("signalboard");
  await page.getByRole("button", { name: "Enter demo workspace" }).click();

  await expect(
    page.getByRole("heading", { name: "Recruiter-ready productivity cockpit" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Activity timeline" })).toBeVisible();
});
