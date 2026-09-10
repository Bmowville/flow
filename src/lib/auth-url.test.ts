import { describe, expect, it } from "vitest";

import { resolveAuthUrl } from "@/lib/auth-url";

describe("resolveAuthUrl", () => {
  it("uses Vercel's stable production domain for production deployments", () => {
    expect(
      resolveAuthUrl({
        NEXTAUTH_URL:
          "https://flow-generated-deployment-bryan-mowreys-projects.vercel.app",
        VERCEL_ENV: "production",
        VERCEL_PROJECT_PRODUCTION_URL: "flow-azure-beta.vercel.app",
      }),
    ).toBe("https://flow-azure-beta.vercel.app");
  });

  it("preserves the configured URL outside Vercel production", () => {
    expect(
      resolveAuthUrl({
        NEXTAUTH_URL: "http://127.0.0.1:3100",
        VERCEL_ENV: "development",
        VERCEL_PROJECT_PRODUCTION_URL: "flow-azure-beta.vercel.app",
      }),
    ).toBe("http://127.0.0.1:3100");
  });

  it("uses the public Flow URL if Vercel's production domain is unavailable", () => {
    expect(
      resolveAuthUrl({
        NEXTAUTH_URL: "https://stale-deployment.vercel.app",
        VERCEL_ENV: "production",
      }),
    ).toBe("https://flow-azure-beta.vercel.app");
  });
});
