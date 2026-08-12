#!/usr/bin/env node
/**
 * Ghép N ảnh vuông thành banner "tường artwork" (nền cho cta.backgroundImage / OG / divider).
 * Artwork thật của tenant > ảnh stock. Đã dùng: khối "Submit Your Music" của the-soul-of-wind.
 *
 * Dùng:  node scripts/make-cover-wall.mjs <thư-mục-ảnh> <file-đích.webp> [--cols 7] [--rows 3] [--tile 276] [--overlay 0.3]
 * Ví dụ: node scripts/make-cover-wall.mjs public/images/releases public/images/brand/cover-wall.webp
 * Cần: devDependency `sharp` (pnpm add -D sharp).
 */
import { readdirSync } from "node:fs";
import sharp from "sharp";

const [srcDir, outFile] = process.argv.slice(2);
if (!srcDir || !outFile) {
  console.error("Dùng: node scripts/make-cover-wall.mjs <thư-mục-ảnh> <file-đích.webp> [--cols 7] [--rows 3] [--tile 276] [--overlay 0.3]");
  process.exit(1);
}
const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : def;
};
const COLS = arg("cols", 7);
const ROWS = arg("rows", 3);
const TILE = arg("tile", 276);
const OVERLAY = arg("overlay", 0.3); // độ phủ tối baked (component thường phủ thêm scrim khi có chữ)

const files = readdirSync(srcDir).filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f));
if (!files.length) {
  console.error(`Không có ảnh trong ${srcDir}`);
  process.exit(1);
}
const need = COLS * ROWS;
// Rải đều qua catalog (bước nhảy) thay vì lấy N ảnh đầu — đa dạng màu hơn.
const step = Math.max(1, Math.floor(files.length / need)) || 1;
const picks = Array.from({ length: need }, (_, i) => files[(i * step) % files.length]);

const tiles = await Promise.all(
  picks.map((f) => sharp(`${srcDir}/${f}`).resize(TILE, TILE, { fit: "cover" }).toBuffer()),
);
const composites = tiles.map((input, i) => ({
  input,
  left: (i % COLS) * TILE,
  top: Math.floor(i / COLS) * TILE,
}));
const W = TILE * COLS;
const H = TILE * ROWS;
composites.push({
  input: Buffer.from(
    `<svg width="${W}" height="${H}"><rect width="100%" height="100%" fill="#0F0C24" fill-opacity="${OVERLAY}"/></svg>`,
  ),
  left: 0,
  top: 0,
});
await sharp({ create: { width: W, height: H, channels: 3, background: "#0F0C24" } })
  .composite(composites)
  .webp({ quality: 74 })
  .toFile(outFile);
console.log(`✓ ${outFile}: ${W}x${H} — ${need} ảnh từ ${srcDir} (overlay ${OVERLAY})`);
