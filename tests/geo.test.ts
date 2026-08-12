import { describe, it, expect } from "vitest";
import { ClientConfigSchema, clientConfig } from "@config";
import { localBusinessSchema, organizationSchema } from "@/lib/seo/schema";
import { buildPageGraph } from "@/lib/jsonld";

const base = {
  brand: {
    name: "X",
    legalName: "X Co",
    shortName: "X",
    description: "Mô tả đủ dài cho SEO trong bài test này.",
    domain: "x.vn",
    logo: "/logo.svg",
  },
  theme: { primary: "#112233", accent: "#445566" },
  contact: {
    phone: "0900000000",
    phoneDisplay: "0900 000 000",
    email: "a@x.vn",
    address: { street: "—", locality: "Hải Phòng" },
  },
};

describe("GEO config (client.config)", () => {
  it("mặc định: geo.mentions = [] và không có localBusiness", () => {
    const c = ClientConfigSchema.parse(base);
    expect(c.geo.mentions).toEqual([]);
    expect(c.geo.localBusiness).toBeUndefined();
  });
  it("nhận mentions + localBusiness hợp lệ", () => {
    const c = ClientConfigSchema.parse({
      ...base,
      geo: {
        mentions: [{ label: "Báo X", url: "https://baox.vn/abc" }],
        localBusiness: { areaServed: ["Hải Phòng"], priceRange: "$$" },
      },
    });
    expect(c.geo.mentions).toHaveLength(1);
    expect(c.geo.localBusiness?.areaServed).toContain("Hải Phòng");
  });
  it("từ chối mention thiếu url hợp lệ", () => {
    expect(() =>
      ClientConfigSchema.parse({
        ...base,
        geo: { mentions: [{ label: "X", url: "not-a-url" }] },
      }),
    ).toThrow();
  });
});

// Builder phải KHỚP client.config hiện tại (đúng cho cả demo rỗng lẫn clone có geo).
describe("GEO builders (khớp client.config)", () => {
  const hasLB = !!clientConfig.geo.localBusiness;
  const hasMentions = clientConfig.geo.mentions.length > 0;

  it("localBusinessSchema null ⟺ chưa cấu hình localBusiness", () => {
    if (hasLB) expect(localBusinessSchema()).not.toBeNull();
    else expect(localBusinessSchema()).toBeNull();
  });
  it("organizationSchema.subjectOf có ⟺ có mention", () => {
    if (hasMentions) expect(organizationSchema().subjectOf).toBeDefined();
    else expect(organizationSchema().subjectOf).toBeUndefined();
  });
  it("buildPageGraph chứa LocalBusiness ⟺ có cấu hình", () => {
    const types = buildPageGraph().map((g) => g["@type"]);
    if (hasLB) expect(types).toContain("LocalBusiness");
    else expect(types).not.toContain("LocalBusiness");
  });
});
