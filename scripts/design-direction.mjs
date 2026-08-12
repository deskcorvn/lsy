/**
 * AI Design Direction (AIO × design) — gợi ý `theme.vibe` + hero `variant` TỪ brand brief.
 * LLM chỉ chọn trong whitelist (5 vibe đã validate contrast AA ở test); validator coerce về whitelist.
 *
 *   node scripts/design-direction.mjs --brief brief.json          # DRY-RUN: in prompt
 *   node scripts/design-direction.mjs --brief brief.json --run     # gọi Claude (cần ANTHROPIC_API_KEY)
 *
 * brief.json = { "brand","industry","audience","values":[...],"notes"? }
 * (Contract chuẩn ở src/design/direction.ts — script này là runner, giữ guide đồng bộ.)
 */
import { readFileSync } from "node:fs";

const VIBES = ["swiss", "industrial", "organic", "aurora", "retro"];
const GUIDE = {
  swiss: "sạch/lưới/sans — tài chính, luật, B2B, cao cấp tối giản",
  industrial: "mono/tối/phẳng — công nghệ, dev-tools, kỹ thuật, crypto",
  organic: "ấm/serif/bo tròn — y tế, chăm sóc, F&B, giáo dục, bền vững",
  aurora: "gradient/glow/lớn — startup, SaaS, AI, sáng tạo",
  retro: "neon/scanline/bold — game, giải trí, gen-Z, sự kiện",
};
const coerce = (s) =>
  VIBES.includes(String(s).trim().toLowerCase()) ? String(s).trim().toLowerCase() : "swiss";

const args = process.argv.slice(2);
const argOf = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const briefPath = argOf("--brief", null);
const doRun = args.includes("--run");
const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

const brief = briefPath
  ? JSON.parse(readFileSync(briefPath, "utf8"))
  : { brand: "Thương hiệu mẫu", industry: "dịch vụ doanh nghiệp", audience: "SME", values: ["tin cậy", "chuyên nghiệp"] };

const guideText = VIBES.map((v) => `- ${v}: ${GUIDE[v]}`).join("\n");
const SYSTEM = `Bạn là design director. Chọn ĐÚNG 1 "vibe" + 1 hero "variant" (centered|split) hợp NHẤT với thương hiệu.
Vibe khả dụng:
${guideText}
Quy tắc "lean unexpected": ưu tiên lựa chọn có tension sáng tạo vẫn hợp ngành, tránh mặc định an toàn nhàm. CHỈ chọn trong danh sách trên.
Trả JSON DUY NHẤT: {"vibe":"...","variant":"centered|split","rationale":"1 câu vì sao hợp ngành + giá trị"}.`;
const USER = `Thương hiệu: ${brief.brand}
Ngành: ${brief.industry}
Khách: ${brief.audience}
Giá trị: ${(brief.values || []).join(", ")}
${brief.notes ? "Ghi chú: " + brief.notes : ""}`;

if (!doRun) {
  console.log("=== DRY-RUN — thêm --run để gọi Claude ===\n");
  console.log("[system]\n" + SYSTEM + "\n\n[user]\n" + USER);
  process.exit(0);
}
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("✗ Thiếu ANTHROPIC_API_KEY.");
  process.exit(1);
}

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({ model, max_tokens: 400, system: SYSTEM, messages: [{ role: "user", content: USER }] }),
});
if (!res.ok) {
  console.error(`✗ API ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const data = await res.json();
let text = data?.content?.[0]?.text ?? "";
const mm = text.match(/\{[\s\S]*\}/);
if (mm) text = mm[0];
let out;
try {
  out = JSON.parse(text);
} catch {
  console.error("✗ Không parse được JSON:\n" + text);
  process.exit(1);
}
const vibe = coerce(out.vibe);
const variant = ["centered", "split"].includes(out.variant) ? out.variant : "centered";
console.log("\n=== Đề xuất design direction ===");
console.log(`vibe    : ${vibe}${vibe !== String(out.vibe).trim().toLowerCase() ? ` (coerce từ "${out.vibe}")` : ""}`);
console.log(`variant : ${variant}`);
console.log(`vì sao  : ${out.rationale || "-"}`);
console.log(`\n→ client.config.ts:  theme: { primary, accent, vibe: "${vibe}" }`);
console.log(`→ content.config.ts hero:  { ..., variant: "${variant}" }`);
