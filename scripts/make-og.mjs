// Sinh public/og.png (1200x630, màu nền brand) bằng Node thuần (zlib) — KHÔNG cần sharp.
// Clone có thể thay bằng ảnh OG thật; preflight chỉ kiểm tra file tồn tại.
import { writeFileSync } from "node:fs";
import { deflateSync, crc32 } from "node:zlib";
import { fileURLToPath } from "node:url";

const W = 1200;
const H = 630;
// Màu nền lấy từ tham số: node scripts/make-og.mjs "#RRGGBB" (mặc định brand blue).
const hex = (process.argv[2] || "#1e5f86").replace(/^#/, "");
const n = /^[0-9a-fA-F]{6}$/.test(hex) ? parseInt(hex, 16) : 0x1e5f86;
const [R, G, B] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];

// Mỗi scanline = 1 byte filter (0) + W*3 bytes RGB.
const row = Buffer.alloc(1 + W * 3);
for (let x = 0; x < W; x++) {
  row[1 + x * 3] = R;
  row[1 + x * 3 + 1] = G;
  row[1 + x * 3 + 2] = B;
}
const raw = Buffer.concat(Array.from({ length: H }, () => row));
const idat = deflateSync(raw);

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0);
  return Buffer.concat([len, body, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 2; // color type: truecolor RGB

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", idat),
  chunk("IEND", Buffer.alloc(0)),
]);

const out = fileURLToPath(new URL("../public/og.png", import.meta.url));
writeFileSync(out, png);
console.log("og.png created:", out, png.length, "bytes");
