/**
 * AIO: sinh NHÁP nội dung landing bằng Claude (Anthropic Messages API qua fetch).
 *
 * Dùng:
 *   node scripts/generate.mjs --brief brief.json           # DRY-RUN: in prompt, KHÔNG gọi API
 *   node scripts/generate.mjs --brief brief.json --run     # gọi API (cần ANTHROPIC_API_KEY)
 *   node scripts/generate.mjs --brief brief.json --run --out content.generated.json
 *
 * brief.json = { "brand","industry","audience","tone","points":[...] }
 *
 * An toàn: KHÔNG ghi đè content.config.ts — chỉ xuất NHÁP. Phải BIÊN TẬP + `pnpm verify`
 * (Zod + cổng auditContent) mới được ship. Mặc định dry-run để không lỡ tốn token.
 */
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const argOf = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const briefPath = argOf("--brief", null);
const outPath = argOf("--out", "content.generated.json");
const model = argOf("--model", process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6");
const doRun = args.includes("--run");

const brief = briefPath
  ? JSON.parse(readFileSync(briefPath, "utf8"))
  : {
      brand: "Thương hiệu mẫu",
      industry: "dịch vụ doanh nghiệp",
      audience: "doanh nghiệp SME",
      tone: "chuyên nghiệp, tin cậy",
      points: ["Tận tâm", "Hiệu quả", "Đồng hành dài hạn"],
    };

const SYSTEM = `Bạn là copywriter landing page tiếng Việt cho doanh nghiệp.
CHỈ trả về JSON hợp lệ (không markdown, không giải thích), đúng cấu trúc content.config:
{
  "page": { "title": string, "description": string },
  "sections": [
    { "id":"hero","type":"hero","heading":string,"subheading":string,"highlights":[3 chuỗi],"primaryCta":{"label":string,"href":"#lien-he"} },
    { "id":"gia-tri","type":"valueHighlights","heading":string,"columns":3,"items":[{ "title":string,"description":string }] (3-4) },
    { "id":"gioi-thieu","type":"about","heading":string,"body":[2 đoạn] },
    { "id":"faq","type":"faq","heading":"Câu hỏi thường gặp","items":[{ "question":string,"answer":string }] (4-6) },
    { "id":"lien-he","type":"contactForm","heading":string,"note":string }
  ]
}
RÀNG BUỘC BẮT BUỘC:
- Đúng 1 hero ở đầu; heading hero là H1 mạnh, rõ giá trị.
- FAQ: câu hỏi ≥10 ký tự; câu trả lời 30–500 ký tự, ANSWER-FIRST (trả lời thẳng, đủ ý, gọn).
- TUYỆT ĐỐI không dùng "Là một AI…", "Dưới đây là…", placeholder, lorem, số liệu bịa.
- Văn phong: ${brief.tone}.`;

const USER = `Sinh nội dung cho:
- Thương hiệu: ${brief.brand}
- Ngành: ${brief.industry}
- Khách hàng mục tiêu: ${brief.audience}
- Điểm nhấn: ${(brief.points || []).join("; ")}`;

if (!doRun) {
  console.log("=== DRY-RUN (không gọi API). Thêm --run để sinh thật. ===\n");
  console.log("[system]\n" + SYSTEM + "\n\n[user]\n" + USER);
  console.log(`\nModel: ${model} · Output dự kiến: ${outPath}`);
  process.exit(0);
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.error("✗ Thiếu ANTHROPIC_API_KEY — đặt biến môi trường rồi chạy lại --run.");
  process.exit(1);
}

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({
    model,
    max_tokens: 4000,
    system: SYSTEM,
    messages: [{ role: "user", content: USER }],
  }),
});

if (!res.ok) {
  console.error(`✗ API lỗi ${res.status}: ${await res.text()}`);
  process.exit(1);
}

const data = await res.json();
let text = data?.content?.[0]?.text ?? "";
const m = text.match(/\{[\s\S]*\}/); // lấy khối JSON phòng khi model bọc thêm chữ
if (m) text = m[0];

try {
  const parsed = JSON.parse(text);
  writeFileSync(outPath, JSON.stringify(parsed, null, 2), "utf8");
  console.log(`✓ Đã ghi nháp: ${outPath}`);
  console.log("→ Biên tập, dán vào content.config.ts (biến raw), rồi chạy `pnpm verify`.");
  console.log("  Zod + cổng auditContent sẽ chặn nếu còn lỗi/câu sinh-máy.");
} catch {
  writeFileSync(outPath + ".txt", text, "utf8");
  console.error(`✗ Model trả về không phải JSON sạch — đã lưu thô: ${outPath}.txt`);
  process.exit(1);
}
