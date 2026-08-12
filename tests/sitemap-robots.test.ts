import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteUrl } from "@config";

describe("sitemap", () => {
  const entries = sitemap();
  it("không rỗng", () => expect(entries.length).toBeGreaterThan(0));
  it("mọi url tuyệt đối dưới siteUrl", () => {
    for (const e of entries) expect(String(e.url).startsWith(siteUrl)).toBe(true);
  });
});

describe("robots", () => {
  const r = robots();
  const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
  it("không chặn toàn bộ", () => {
    const star = rules.find((x) => x.userAgent === "*");
    const disallow = star?.disallow;
    const list = Array.isArray(disallow) ? disallow : disallow ? [disallow] : [];
    expect(list).not.toContain("/");
  });
  it("khai báo sitemap", () => {
    expect(r.sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });
});
