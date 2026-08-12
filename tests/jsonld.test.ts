import { describe, it, expect } from "vitest";
import { buildPageGraph } from "@/lib/jsonld";
import { siteUrl } from "@config";

describe("buildPageGraph", () => {
  const graph = buildPageGraph();
  it("có Organization + WebSite", () => {
    const types = graph.map((g) => g["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("WebSite");
  });
  it("Organization.url === siteUrl", () => {
    const org = graph.find((g) => g["@type"] === "Organization");
    expect(org?.url).toBe(siteUrl);
  });
});
