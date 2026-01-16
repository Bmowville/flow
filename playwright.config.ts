import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: {
    command:
      "DATABASE_URL=\"file:./dev.db\" NEXTAUTH_SECRET=signalboard-dev-secret npm run dev",
    port: 3000,
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:3000",
  },
});
