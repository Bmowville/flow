import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  webServer: {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1",
    env: {
      DATABASE_URL: process.env.DATABASE_URL ?? "file:./dev.db",
      NEXTAUTH_URL: "http://127.0.0.1:3100",
      PORT: "3100",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? "signalboard-dev-secret",
    },
    port: 3100,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL: "http://127.0.0.1:3100",
  },
});
