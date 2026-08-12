import { z } from "zod";

/**
 * Catalog data (roster/release/portfolio…) — NGUỒN-SỰ-THẬT #3, tách khỏi content.config
 * (bố cục trang) để file sections không phình nghìn dòng. Nhân bản: sửa catalog.config.ts
 * ở root, KHÔNG đụng src/. Mỗi collection → 1 route /{slug} render bằng MediaGrid + ItemList JSON-LD.
 */

export const CatalogItemSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "slug chỉ gồm a-z, 0-9 và dấu gạch ngang"),
  title: z.string().min(1),
  image: z
    .string()
    .startsWith("/", "image là đường dẫn trong /public, bắt đầu bằng /"),
  subtitle: z.string().optional(), // nghệ sĩ: genre; release: tên nghệ sĩ + năm
  links: z.record(z.string().url()).default({}), // { spotify, appleMusic, youtube… }
  tags: z.array(z.string()).default([]),
  // Trang con /{collection}/{slug} CHỈ mở khi có bio đạt ngưỡng (chống thin content).
  // Ngưỡng: ≥ 800 ký tự (~150 từ EN) viết từ facts thật — không AI-padding.
  bio: z.string().min(800, "bio ≥ 800 ký tự (~150 từ) mới đủ mở trang con").optional(),
});
export type CatalogItem = z.infer<typeof CatalogItemSchema>;

export const CatalogCollectionSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "slug collection chỉ gồm a-z, 0-9 và dấu gạch ngang"),
  title: z.string().min(1),
  description: z.string().min(20, "description dùng làm meta + intro, nên ≥ 20 ký tự"),
  // Cấu hình hiển thị MediaGrid của trang collection.
  columns: z.union([z.literal(2), z.literal(3), z.literal(4), z.literal(6)]).default(4),
  aspect: z.enum(["square", "portrait", "video"]).default("square"),
  shape: z.enum(["rounded", "circle", "arch"]).default("rounded"),
  filterByTag: z.boolean().default(false),
  batchSize: z.number().int().positive().optional(),
  // Loại thực thể schema.org cho item (JSON-LD ItemList + trang con). Không set = ListItem thường.
  itemSchemaType: z
    .enum(["MusicGroup", "MusicAlbum", "MusicPlaylist", "Person", "Product", "CreativeWork"])
    .optional(),
  items: z.array(CatalogItemSchema).min(1),
});
export type CatalogCollection = z.infer<typeof CatalogCollectionSchema>;

export const CatalogConfigSchema = z
  .object({
    collections: z.array(CatalogCollectionSchema).default([]),
  })
  .superRefine((data, ctx) => {
    const slugs = data.collections.map((c) => c.slug);
    const dup = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
    if (dup.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `slug collection bị trùng: ${dup.join(", ")}`,
        path: ["collections"],
      });
    }
    for (const c of data.collections) {
      const ids = c.items.map((i) => i.slug);
      const d = [...new Set(ids.filter((s, i) => ids.indexOf(s) !== i))];
      if (d.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `slug item bị trùng trong "${c.slug}": ${d.join(", ")}`,
          path: ["collections"],
        });
      }
    }
  });
export type CatalogConfig = z.infer<typeof CatalogConfigSchema>;
