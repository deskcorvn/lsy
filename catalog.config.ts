import { CatalogConfigSchema, type CatalogConfig } from "@/content/catalog-schema";

/**
 * NGUỒN-SỰ-THẬT #3: dữ liệu catalog (roster/release/portfolio/menu…).
 * Mỗi collection → route /{slug} tự sinh (generateStaticParams), render MediaGrid + ItemList JSON-LD.
 * Template mặc định RỖNG — tenant nào cần catalog thì điền (xem docs dự án tenant).
 * Sai schema -> build FAIL (Zod parse ngay khi import).
 */
const raw = {
  collections: [],
} satisfies CatalogConfig | Record<string, unknown>;

export const catalog: CatalogConfig = CatalogConfigSchema.parse(raw);
