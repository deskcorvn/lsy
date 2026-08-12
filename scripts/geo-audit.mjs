/**
 * GEO/AEO self-audit (ON-SITE) — mô hình 3 LỚP / 12 ĐIỂM (theo agent "AEO Foundations Architect").
 * Đọc HTML build + file nguồn → chấm theo lớp Discovery / Parsability / Authority. KHÔNG chặn (báo cáo).
 *
 * Lưu ý: đây là đo ON-SITE (nền đã sẵn sàng chưa). Đo OFF-SITE — AI có THỰC SỰ nhắc/trích brand —
 * cần audit đa-platform riêng (xem agent "AI Citation Strategist").
 *
 * Chạy sau `pnpm build`:  node scripts/geo-audit.mjs
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

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
      if (statSync(p).isDirectory()) stack.push(p);
      else if (name === "index.html") return p;
    }
  }
  return null;
}

const htmlPath = findIndexHtml();
const html = htmlPath ? readFileSync(htmlPath, "utf8") : "";
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), "utf8") : "");
const robots = read("src/app/robots.ts");
const llms = read("src/app/llms.txt/route.ts");
const llmsFull = read("src/app/llms-full.txt/route.ts");
const sitemap = read("src/app/sitemap.ts");

if (!html) {
  console.error("✗ Chưa thấy HTML build — chạy `pnpm build` trước.");
  process.exit(0);
}

// Ước lượng token NỘI DUNG (bỏ script/style, strip tag, ~4 ký tự/token).
function estTokens(h) {
  const text = h
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return Math.round(text.length / 4);
}
const tokens = estTokens(html);
const TOKEN_BUDGET = 8000; // landing page (AEO Foundations token worksheet)

// 3 lớp × tiêu chí: [nhãn, đạt?, gợi ý nếu chưa]
const layers = {
  "Discovery — AI tìm thấy": [
    ["robots.txt cho phép bot AI", /GPTBot|ClaudeBot|PerplexityBot|Google-Extended/i.test(robots), "allow bot AI trong robots.ts"],
    ["llms.txt published", llms.length > 0, "thêm route src/app/llms.txt"],
    ["llms-full.txt published", llmsFull.length > 0, "thêm route src/app/llms-full.txt"],
    ["sitemap.xml có", sitemap.length > 0, "thêm src/app/sitemap.ts"],
  ],
  "Parsability — AI đọc được": [
    ["JSON-LD Organization", html.includes('"Organization"'), "thêm Organization schema"],
    ["JSON-LD WebSite + WebPage", html.includes('"WebSite"') && html.includes('"WebPage"'), "thêm WebSite/WebPage schema"],
    ["FAQPage (AEO)", html.includes('"FAQPage"'), "thêm section faq"],
    ["1 H1 + answer-first (không <details>)", (html.match(/<h1[\s>]/g) || []).length === 1 && !/<details[\s>]/.test(html), "đúng 1 H1; FAQ lộ thiên"],
    [`Token nội dung ≤ ${TOKEN_BUDGET} (≈ ${tokens})`, tokens <= TOKEN_BUDGET, "rút gọn nội dung cho gọn context window"],
  ],
  "Authority & Freshness — AI tin & trích": [
    ["LocalBusiness (GEO địa lý)", html.includes('"LocalBusiness"'), "cấu hình geo.localBusiness"],
    ["Mention bên thứ 3 (subjectOf)", html.includes('"subjectOf"'), "thêm geo.mentions[]"],
    ["Freshness (Last-Updated / dateModified)", /Last-Updated/.test(llms) || /"date(Published|Modified)"/.test(html), "thêm Last-Updated / page.dateModified"],
  ],
};

console.log("\n  GEO/AEO self-audit (on-site) — 3 lớp / 12 điểm");
console.log("  ════════════════════════════════════════════");
let passed = 0;
let total = 0;
for (const [layer, checks] of Object.entries(layers)) {
  let lp = 0;
  console.log(`\n  ▸ ${layer}`);
  for (const [label, okFlag, tip] of checks) {
    total++;
    if (okFlag) {
      passed++;
      lp++;
      console.log(`    ✓ ${label}`);
    } else {
      console.log(`    ✗ ${label}  → ${tip}`);
    }
  }
  console.log(`    — lớp: ${lp}/${checks.length}`);
}
const score = Math.round((passed / total) * 100);
const target = Math.ceil(total * 0.75);
console.log(`\n  ► Foundation Score: ${passed}/${total} (${score}%)  |  mục tiêu 30 ngày: ≥ ${target}/${total}`);
console.log("  (Đo OFF-SITE — AI có thực sự nhắc brand — dùng agent 'AI Citation Strategist'.)\n");
