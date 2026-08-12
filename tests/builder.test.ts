import { describe, it, expect } from "vitest";
import { buildSiteFromBrief, BuilderInputSchema, slugify } from "@/lib/tenant/builder";
import { TenantSchema } from "@/lib/tenant/types";

describe("builder: form brief → site hợp lệ", () => {
  it("brief tối thiểu → SiteModel pass Zod (có hero + contactForm)", () => {
    const input = BuilderInputSchema.parse({
      brandName: "Tiệm Bánh An",
      description: "Tiệm bánh thủ công tại Hải Phòng, làm bánh tươi mỗi ngày từ nguyên liệu chọn lọc.",
      vibe: "organic",
    });
    const site = buildSiteFromBrief(input);
    expect(TenantSchema.safeParse(site).success).toBe(true);
    expect(site.content.sections[0].type).toBe("hero");
    expect(site.content.sections.some((s) => s.type === "contactForm")).toBe(true);
  });

  it("slugify bỏ dấu tiếng Việt", () => {
    expect(slugify("Cà Phê Mộc")).toBe("ca-phe-moc");
    expect(slugify("Đặc Sản Hải Phòng")).toBe("dac-san-hai-phong");
  });

  it("brief đầy đủ (values + faqs custom) → giữ nội dung người dùng", () => {
    const input = BuilderInputSchema.parse({
      brandName: "Stack Lab",
      description: "Đội kỹ thuật dựng web và app cho doanh nghiệp, giao đúng hẹn.",
      vibe: "industrial",
      values: [{ title: "Nhanh", description: "Bàn giao đúng hẹn với quy trình rõ ràng và minh bạch." }],
      faqs: [{ question: "Làm dự án gì?", answer: "Website, web app và API cho doanh nghiệp vừa và nhỏ tại Việt Nam." }],
    });
    const site = buildSiteFromBrief(input);
    const values = site.content.sections.find((s) => s.type === "valueHighlights");
    expect(values && values.type === "valueHighlights" && values.items[0].title).toBe("Nhanh");
  });
});
