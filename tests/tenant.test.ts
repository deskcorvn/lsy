import { describe, it, expect } from "vitest";
// Test bám thẳng store-file để hermetic (không phụ thuộc DATABASE_URL của môi trường).
import { getTenant, listTenantSlugs } from "@/lib/tenant/store-file";
import { buildTenantGraph } from "@/lib/tenant/graph";

describe("multi-tenant runtime content (file store, hermetic)", () => {
  it("liệt kê được tenant từ store", async () => {
    expect((await listTenantSlugs()).length).toBeGreaterThan(0);
  });
  it("load + Zod-validate tenant hợp lệ (hero ở index 0)", async () => {
    const slug = (await listTenantSlugs())[0];
    const site = await getTenant(slug);
    expect(site).toBeTruthy();
    expect(site?.content.sections[0].type).toBe("hero");
  });
  it("slug không tồn tại → null (không vỡ)", async () => {
    expect(await getTenant("khong-co-slug-nay-dau")).toBeNull();
  });
  it("buildTenantGraph có Organization + WebPage per-tenant", async () => {
    const site = await getTenant((await listTenantSlugs())[0]);
    const types = buildTenantGraph(site!).map((g) => g["@type"]);
    expect(types).toContain("Organization");
    expect(types).toContain("WebPage");
  });
});
