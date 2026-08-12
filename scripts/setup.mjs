// Generator nhân bản: hỏi-đáp -> ghi client.config.ts + logo.svg + og.png.
// Chạy sau khi degit/clone: node scripts/setup.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const rl = createInterface({ input, output });
const ask = async (q, def) => {
  const a = (await rl.question(`${q}${def ? ` [${def}]` : ""}: `)).trim();
  return a || def || "";
};

console.log("\n— Tạo site mới từ template —\n");
const name = await ask("Tên thương hiệu");
const shortName = await ask("Tên ngắn (cho logo)", name);
const legalName = await ask("Tên đầy đủ/pháp lý", name);
const description = await ask("Mô tả (≥20 ký tự, cho SEO)");
const domain = await ask("Domain (vd brandx.vn — không kèm http)");
const primary = await ask("Màu chính #RRGGBB", "#1e5f86");
const accent = await ask("Màu nhấn #RRGGBB", "#e08a2b");
const phone = await ask("SĐT");
const email = await ask("Email");
const street = await ask("Địa chỉ (số/đường)");
const locality = await ask("Khu vực (phường, tỉnh/TP)");
rl.close();

const config = {
  brand: { name, legalName, shortName, description, domain, logo: "/logo.svg" },
  theme: { primary, accent },
  contact: {
    phone,
    phoneDisplay: phone,
    email,
    address: { street, locality, country: "VN" },
  },
  social: [],
  nav: [
    { label: "Giới thiệu", href: "#gioi-thieu" },
    { label: "Liên hệ", href: "#lien-he" },
  ],
};

const block =
  "// === SITE_CONFIG_START (scripts/setup.mjs ghi vùng này; sửa tay cũng được) ===\n" +
  `const config = ${JSON.stringify(config, null, 2)} satisfies z.input<typeof ClientConfigSchema>;\n` +
  "// === SITE_CONFIG_END ===";

const cfgPath = fileURLToPath(new URL("../client.config.ts", import.meta.url));
let src = readFileSync(cfgPath, "utf8");
if (!/SITE_CONFIG_START[\s\S]*?SITE_CONFIG_END ===/.test(src)) {
  console.error("✗ Không thấy marker SITE_CONFIG trong client.config.ts");
  process.exit(1);
}
src = src.replace(
  /\/\/ === SITE_CONFIG_START[\s\S]*?\/\/ === SITE_CONFIG_END ===/,
  block,
);
writeFileSync(cfgPath, src);

// logo wordmark theo shortName + màu chính
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const w = Math.max(80, shortName.length * 15);
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} 32" height="32" role="img" aria-label="${esc(shortName)}">\n  <text x="0" y="23" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="${primary}">${esc(shortName)}</text>\n</svg>\n`;
writeFileSync(fileURLToPath(new URL("../public/logo.svg", import.meta.url)), logo);

// og.png theo màu chính
try {
  execSync(`node scripts/make-og.mjs ${primary}`, { cwd: root, stdio: "inherit" });
} catch {
  console.warn("(bỏ qua og.png — chạy lại: node scripts/make-og.mjs)");
}

console.log("\n✅ Đã ghi client.config.ts + logo.svg + og.png.");
console.log("Tiếp theo:");
console.log("  1. Sửa content.config.ts (nội dung các section).");
console.log("  2. pnpm install && pnpm verify   (phải XANH).");
console.log("  3. Deploy Vercel + gắn domain.\n");
