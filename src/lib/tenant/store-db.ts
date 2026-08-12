import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { TenantSchema, type SiteModel } from "./types";

/**
 * Store nền POSTGRES (Neon) — bảng `sites(slug pk, data jsonb)`.
 * Dùng khi có DATABASE_URL → "form → site tức thì" chạy được trên Vercel (fs read-only).
 * Client tạo LAZY để import an toàn cả khi không có DATABASE_URL (selector nạp cả 2 store).
 */
let _sql: NeonQueryFunction<false, false> | null = null;
function db(): NeonQueryFunction<false, false> {
  if (!_sql) _sql = neon(process.env.DATABASE_URL!);
  return _sql;
}

let ready: Promise<unknown> | null = null;
function ensureTable(): Promise<unknown> {
  if (!ready) {
    ready = db()`
      CREATE TABLE IF NOT EXISTS sites (
        slug text PRIMARY KEY,
        data jsonb NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )`;
  }
  return ready;
}

export async function getTenant(slug: string): Promise<SiteModel | null> {
  await ensureTable();
  const rows = (await db()`SELECT data FROM sites WHERE slug = ${slug} LIMIT 1`) as { data: unknown }[];
  if (rows.length === 0) return null;
  const parsed = TenantSchema.safeParse(rows[0].data);
  return parsed.success ? parsed.data : null;
}

export async function listTenantSlugs(): Promise<string[]> {
  await ensureTable();
  const rows = (await db()`SELECT slug FROM sites ORDER BY created_at`) as { slug: string }[];
  return rows.map((r) => r.slug);
}

export async function createSite(site: SiteModel): Promise<SiteModel> {
  await ensureTable();
  const validated = TenantSchema.parse(site);
  await db()`INSERT INTO sites (slug, data) VALUES (${validated.slug}, ${JSON.stringify(validated)}::jsonb)`;
  return validated;
}
