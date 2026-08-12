// Liệt kê / xoá tenant trong Neon. Chạy: node --env-file=.env.local scripts/db-check.mjs [slug-cần-xoá]
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const del = process.argv[2];
if (del) {
  await sql`DELETE FROM sites WHERE slug = ${del}`;
  console.log("deleted:", del);
}
const rows = await sql`SELECT slug, created_at FROM sites ORDER BY created_at`;
console.log("DB sites:", rows.map((r) => r.slug).join(", ") || "(trống)");
