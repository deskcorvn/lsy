/**
 * Preflight: cổng nghiệm thu SAU build (đọc .next + filesystem). Chạy: pnpm preflight.
 * Mỗi "thứ-có-thể-quên" -> một check. FAIL -> exit 1 (chặn deploy trong `pnpm verify`/CI).
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const root = process.cwd();
let failed = 0;
const ok = (m) => console.log(`  ✓ ${m}`);
const fail = (m) => {
  console.error(`  ✗ ${m}`);
  failed++;
};

// --- locate trang chủ đã build ---
function findIndexHtml() {
  const direct = join(root, ".next/server/app/index.html");
  if (existsSync(direct)) return direct;
  const base = join(root, ".next/server/app");
  if (!existsSync(base)) return null;
  const stack = [base];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      const st = statSync(p);
      if (st.isDirectory()) stack.push(p);
      else if (name === "index.html") return p;
    }
  }
  return null;
}

// 1. build output
const htmlPath = findIndexHtml();
let html = "";
if (htmlPath) {
  html = readFileSync(htmlPath, "utf8");
  ok("build: trang chủ đã prerender");
} else {
  fail("build: không thấy index.html — chạy `pnpm build` trước");
}

// 2. đúng 1 <h1>
if (html) {
  const count = (html.match(/<h1[\s>]/g) || []).length;
  if (count === 1) ok("đúng 1 <h1> trên trang chủ");
  else fail(`phải đúng 1 <h1>, đang có ${count}`);
}

// 3. JSON-LD bắt buộc
if (html) {
  const hasLd = html.includes("application/ld+json");
  const hasOrg = html.includes('"Organization"');
  const hasSite = html.includes('"WebSite"');
  if (hasLd && hasOrg && hasSite) ok("JSON-LD có Organization + WebSite");
  else fail(`JSON-LD thiếu (ld+json:${hasLd} Organization:${hasOrg} WebSite:${hasSite})`);
}

// 4. không còn placeholder (src/** + content.config.ts; LOẠI TRỪ *.bni.ts fixture)
const PLACEHOLDER = /CẦN ĐIỀN|CAN DIEN|lorem ipsum|\[\.\.\.\]|\[…\]/i;
function walk(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      out = out.concat(walk(p));
    } else if (
      [".ts", ".tsx"].includes(extname(name)) &&
      !name.endsWith(".bni.ts")
    ) {
      out.push(p);
    }
  }
  return out;
}
const scanFiles = [
  ...(existsSync(join(root, "src")) ? walk(join(root, "src")) : []),
  join(root, "content.config.ts"),
].filter(existsSync);
const offenders = scanFiles.filter((f) => PLACEHOLDER.test(readFileSync(f, "utf8")));
if (offenders.length === 0) ok("không còn placeholder («CẦN ĐIỀN» / lorem)");
else fail(`còn placeholder ở: ${offenders.map((f) => f.replace(root, ".")).join(", ")}`);

// 5. asset tồn tại
for (const asset of ["public/og.png", "public/logo.svg"]) {
  if (existsSync(join(root, asset))) ok(`asset: ${asset}`);
  else fail(`thiếu asset: ${asset}`);
}

// 6. chỉ Hero.tsx + ProfileHeader.tsx (đầu thẻ eCard) được chứa <h1> (chống nhân thêm H1)
const H1_WHITELIST = ["Hero.tsx", "ProfileHeader.tsx"];
const sectionsDir = join(root, "src/components/sections");
if (existsSync(sectionsDir)) {
  const h1files = readdirSync(sectionsDir).filter(
    (n) => n.endsWith(".tsx") && /<h1[\s>]/.test(readFileSync(join(sectionsDir, n), "utf8")),
  );
  const bad = h1files.filter((n) => !H1_WHITELIST.includes(n));
  if (bad.length === 0 && h1files.length > 0) ok("h1 chỉ ở Hero/ProfileHeader");
  else fail(`<h1> chỉ được ở ${H1_WHITELIST.join("/")}, đang ở: ${bad.join(", ") || "(không có)"}`);
}

// 7. AEO answer-first: không còn <details> gập (answer-engine đọc HTML tĩnh)
if (html) {
  if (!/<details[\s>]/.test(html)) ok("answer-first: không có <details> gập");
  else fail("còn <details> gập trong HTML — đổi answer-first cho AEO");
}

// 8. SEO/a11y: mọi <img> phải có alt
if (html) {
  const imgs = html.match(/<img\b[^>]*>/gi) || [];
  const noAlt = imgs.filter((t) => !/\salt\s*=/i.test(t));
  if (noAlt.length === 0) ok(`ảnh: ${imgs.length} <img> đều có alt`);
  else fail(`${noAlt.length}/${imgs.length} <img> thiếu alt`);
}

// 9. SXO: route /api/contact tồn tại (form liên hệ có backend)
if (existsSync(join(root, "src/app/api/contact/route.ts")))
  ok("SXO: có /api/contact");
else fail("thiếu src/app/api/contact/route.ts");

// 10. SXO: trang chủ phải có form thu lead (section contactForm) — lý do tồn tại của landing.
//     NGOẠI LỆ: eCard standalone ("/" là danh thiếp — lead đi qua contactBar/vCard, không form).
const isEcardStandalone = /standalone:\s*true/.test(
  readFileSync(join(root, "client.config.ts"), "utf8"),
);
if (html) {
  if (isEcardStandalone) ok("SXO: eCard standalone — bỏ qua yêu cầu form trang chủ");
  else if (/<form[\s>]/.test(html)) ok("SXO: trang chủ có form thu lead");
  else fail("trang chủ KHÔNG có form — thêm section contactForm (đừng để mất lead)");
}

// 11. anchor sống: mọi href="#x" phải có section id="x" (chống nút bấm không nhảy)
if (html) {
  const anchors = [...html.matchAll(/href="#([^"]+)"/g)]
    .map((m) => m[1])
    .filter((a) => a && a !== "");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const dead = [...new Set(anchors)].filter((a) => !ids.has(a));
  if (dead.length === 0) ok("anchor: mọi #link đều có section khớp");
  else fail(`anchor chết (không có section id khớp): ${dead.join(", ")}`);
}

// 12. Theming (luật impeccable): section KHÔNG hardcode màu slate — phải dùng token --p-*
//     (chống "đồng phục" tái phát + giữ kỷ luật design persona).
{
  const sd = join(root, "src/components/sections");
  if (existsSync(sd)) {
    const SLATE = /(bg|text|border|divide)-slate-/;
    const bad = readdirSync(sd).filter(
      (n) =>
        n.endsWith(".tsx") &&
        SLATE.test(readFileSync(join(sd, n), "utf8")),
    );
    if (bad.length === 0) ok("design token: section không hardcode slate (dùng --p-*)");
    else fail(`section hardcode slate (nên dùng --p-* token): ${bad.join(", ")}`);
  }
}

// 13. Ảnh khai trong config phải tồn tại trong public/ (chặn ảnh gãy khi đổ catalog).
//     Quét chuỗi "/..." có đuôi ảnh trong content.config.ts + catalog.config.ts + client.config.ts.
{
  const IMG_RE = /["'](\/[^"']+\.(?:png|jpe?g|webp|avif|svg|gif))["']/g;
  const configFiles = ["content.config.ts", "catalog.config.ts", "client.config.ts"]
    .map((f) => join(root, f))
    .filter(existsSync);
  const missing = [];
  for (const f of configFiles) {
    const src = readFileSync(f, "utf8");
    for (const m of src.matchAll(IMG_RE)) {
      const rel = m[1];
      if (!existsSync(join(root, "public", rel))) missing.push(`${rel} (${f.replace(root, ".")})`);
    }
  }
  if (missing.length === 0) ok("ảnh config đều tồn tại trong public/");
  else fail(`ảnh khai trong config nhưng KHÔNG có trong public/: ${[...new Set(missing)].join(", ")}`);
}

// 14. Cấm font không có license production (bẫy thật từ repo the-soul-of-wind cũ).
{
  const BAD_FONT = /fontspring-?demo|personal[ _-]?use/i;
  const offendersFont = [];
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of readdirSync(dir)) {
      if (["node_modules", ".next", ".git"].includes(name)) continue;
      const p = join(dir, name);
      const st = statSync(p);
      if (st.isDirectory()) stack.push(p);
      else if (BAD_FONT.test(name)) offendersFont.push(p.replace(root, "."));
    }
  }
  if (offendersFont.length === 0) ok("font: không có file DEMO/Personal-Use trong repo");
  else fail(`font vi phạm license (xóa và thay bằng Google Fonts): ${offendersFont.join(", ")}`);
}

console.log("");
if (failed) {
  console.error(`✗ preflight FAIL (${failed} lỗi)`);
  process.exit(1);
}
console.log("✓ preflight OK");
