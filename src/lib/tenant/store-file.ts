import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { TenantSchema, type SiteModel } from "./types";

/**
 * Store nền FILE — `tenants/<slug>.json`. Dùng khi KHÔNG có DATABASE_URL (local/dev/test).
 * Cùng interface async với store-db để selector (store.ts) thay được trong suốt.
 */
const DIR = join(process.cwd(), "tenants");

export async function getTenant(slug: string): Promise<SiteModel | null> {
  const f = join(DIR, `${slug}.json`);
  if (!existsSync(f)) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(f, "utf8"));
  } catch {
    return null;
  }
  const parsed = TenantSchema.safeParse(raw);
  return parsed.success ? parsed.data : null;
}

export async function listTenantSlugs(): Promise<string[]> {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR)
    .filter((n) => n.endsWith(".json"))
    .map((n) => n.replace(/\.json$/, ""));
}

export async function createSite(site: SiteModel): Promise<SiteModel> {
  const validated = TenantSchema.parse(site);
  mkdirSync(DIR, { recursive: true });
  writeFileSync(join(DIR, `${validated.slug}.json`), JSON.stringify(validated, null, 2), "utf8");
  return validated;
}
