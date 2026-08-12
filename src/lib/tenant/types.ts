import { z } from "zod";
import { ContentConfigSchema } from "@/content/schema";
import { VIBES } from "@/design/profile";

/**
 * Mô hình SITE đa-tenant: 1 bản ghi = 1 site khách (brand + branding/vibe + content).
 * `content` TÁI DÙNG nguyên ContentConfigSchema (cùng "hợp đồng" Zod với single-site).
 * Đây là lõi "nguồn nội dung runtime": file JSON (demo) hoặc DB (giftycare) đều parse qua schema này.
 */
const HEX = /^#[0-9a-fA-F]{6}$/;

export const TenantSchema = z.object({
  slug: z.string().min(1),
  brand: z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    domain: z.string().min(1),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    locality: z.string().optional(),
  }),
  branding: z.object({
    vibe: z.enum(VIBES).default("swiss"),
    primary: z.string().regex(HEX).default("#1e5f86"),
    accent: z.string().regex(HEX).default("#e08a2b"),
  }),
  content: ContentConfigSchema,
});

export type SiteModel = z.infer<typeof TenantSchema>;
