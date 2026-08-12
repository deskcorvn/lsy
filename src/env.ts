import { z } from "zod";

/**
 * Biến môi trường — SERVER-ONLY (không NEXT_PUBLIC_ → publishable key KHÔNG lộ ra bundle).
 * Parse ngay khi import: thiếu/sai là FAIL ngay. (Guardrail #2)
 * CHỈ được import từ code chạy phía server (lib/medusa, route handlers) — không import vào client component.
 */
const EnvSchema = z.object({
  MEDUSA_URL: z.string().url("MEDUSA_URL phải là URL hợp lệ"),
  MEDUSA_PUBLISHABLE_KEY: z.string().min(1, "thiếu MEDUSA_PUBLISHABLE_KEY"),
  REVALIDATE_SECRET: z.string().min(8, "REVALIDATE_SECRET nên ≥ 8 ký tự"),
});

export const env = EnvSchema.parse({
  MEDUSA_URL: process.env.MEDUSA_URL,
  MEDUSA_PUBLISHABLE_KEY: process.env.MEDUSA_PUBLISHABLE_KEY,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
});
