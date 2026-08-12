import { describe, it, expect } from "vitest";
import { ClientConfigSchema, rawConfig, clientConfig, siteUrl } from "@config";

describe("client.config bất biến", () => {
  it("rawConfig hợp lệ với schema", () => {
    expect(ClientConfigSchema.safeParse(rawConfig).success).toBe(true);
  });
  it("siteUrl khớp domain", () => {
    expect(siteUrl).toBe(`https://${clientConfig.brand.domain}`);
  });
  it("logo & ogImage là path nội bộ", () => {
    expect(clientConfig.brand.logo.startsWith("/")).toBe(true);
    expect(clientConfig.brand.ogImage.startsWith("/")).toBe(true);
  });
});
