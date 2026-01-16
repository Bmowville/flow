import { describe, expect, it } from "vitest";
import { formatRelativeTime } from "@/lib/utils";

describe("formatRelativeTime", () => {
  it("returns minutes ago for recent past", () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatRelativeTime(date)).toContain("m ago");
  });

  it("returns hours from now for future times", () => {
    const date = new Date(Date.now() + 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(date)).toContain("h from now");
  });
});
