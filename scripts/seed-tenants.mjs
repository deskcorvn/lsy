// Seed các file tenants/*.json vào Neon (bảng sites). Chạy: node --env-file=.env.local scripts/seed-tenants.mjs
import { neon } from "@neondatabase/serverless";
import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Thiếu DATABASE_URL (chạy với: node --env-file=.env.local scripts/seed-tenants.mjs)");
  process.exit(1);
}
const sql = neon(url);

await sql`CREATE TABLE IF NOT EXISTS sites (
  slug text PRIMARY KEY,
  data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
)`;

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "tenants");
for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
  const data = JSON.parse(readFileSync(join(dir, f), "utf8"));
  await sql`INSERT INTO sites (slug, data) VALUES (${data.slug}, ${JSON.stringify(data)}::jsonb)
            ON CONFLICT (slug) DO UPDATE SET data = EXCLUDED.data`;
  console.log("seeded:", data.slug);
}
const rows = await sql`SELECT slug FROM sites ORDER BY created_at`;
console.log("DB sites:", rows.map((r) => r.slug).join(", "));
