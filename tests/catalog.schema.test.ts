import { describe, it, expect } from "vitest";
import { CatalogConfigSchema, CatalogItemSchema } from "@/content/catalog-schema";
import { catalog } from "@catalog";

const item = {
  slug: "big-rice-piano",
  title: "Big Rice Piano",
  image: "/images/artists/big-rice-piano.webp",
  links: { spotify: "https://open.spotify.com/artist/6NZehyzoXBTOmvFzJyp6RV" },
};
const collection = {
  slug: "artists",
  title: "Artists",
  description: "Pianists and composers on the label roster.",
  items: [item],
};

describe("CatalogConfigSchema (nguồn-sự-thật #3)", () => {
  it("catalog.config.ts của template parse được (mặc định rỗng)", () => {
    expect(Array.isArray(catalog.collections)).toBe(true);
  });
  it("parse collection hợp lệ", () => {
    expect(() =>
      CatalogConfigSchema.parse({ collections: [collection] }),
    ).not.toThrow();
  });
  it("từ chối slug collection trùng", () => {
    expect(() =>
      CatalogConfigSchema.parse({ collections: [collection, collection] }),
    ).toThrow();
  });
  it("từ chối slug item trùng trong 1 collection", () => {
    expect(() =>
      CatalogConfigSchema.parse({
        collections: [{ ...collection, items: [item, item] }],
      }),
    ).toThrow();
  });
  it("từ chối image không bắt đầu bằng /", () => {
    expect(() =>
      CatalogItemSchema.parse({ ...item, image: "images/x.webp" }),
    ).toThrow();
  });
  it("bio ngắn hơn ngưỡng 800 ký tự bị từ chối (chống thin content)", () => {
    expect(() =>
      CatalogItemSchema.parse({ ...item, bio: "too short bio" }),
    ).toThrow();
    expect(() =>
      CatalogItemSchema.parse({ ...item, bio: "x".repeat(800) }),
    ).not.toThrow();
  });
  it("itemSchemaType nhận MusicGroup/MusicAlbum", () => {
    expect(() =>
      CatalogConfigSchema.parse({
        collections: [{ ...collection, itemSchemaType: "MusicGroup" }],
      }),
    ).not.toThrow();
  });
});
