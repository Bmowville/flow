import { describe, expect, it } from "vitest";
import { filterByQuery } from "@/lib/filter";

type Item = { title: string; detail: string };

describe("filterByQuery", () => {
  it("filters by title and detail", () => {
    const items: Item[] = [
      { title: "Alpha", detail: "First item" },
      { title: "Beta", detail: "Second" },
    ];

    const result = filterByQuery(items, "second", ["title", "detail"]);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Beta");
  });
});
