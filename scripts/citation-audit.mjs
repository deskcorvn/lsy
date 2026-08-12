/**
 * Citation Audit (OFF-SITE GEO) — đo AI có NHẮC/TRÍCH brand không.
 * Theo phương pháp agent "AI Citation Strategist": prompt set × engine → scorecard
 * + prompt mất điểm + fix pack. Bổ sung cho geo-audit (on-site).
 *
 * Dùng:
 *   node scripts/citation-audit.mjs --config citation-audit.config.json          # DRY-RUN: in kế hoạch
 *   node scripts/citation-audit.mjs --config citation-audit.config.json --run     # gọi API thật
 *
 * Engine tự bật theo API key trong env:
 *   - Perplexity : PERPLEXITY_API_KEY  (model sonar — có web search, sát citation nhất)
 *   - Claude     : ANTHROPIC_API_KEY   (phản ánh kiến-thức-mô-hình)
 *   (OpenAI / Gemini có thể thêm adapter tương tự.)
 */
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const argOf = (k, d) => {
  const i = args.indexOf(k);
  return i >= 0 && args[i + 1] ? args[i + 1] : d;
};
const cfgPath = argOf("--config", "citation-audit.config.json");
const outPath = argOf("--out", "citation-audit-report.md");
const doRun = args.includes("--run");

// Adapter trả về { text, sources }: text = câu trả lời; sources = URL thật engine đã DẪN.
// Phân biệt "được NHẮC" (tên brand trong text) với "được DẪN LINK" (domain brand trong sources)
// là mục tiêu chính của bản này — engine substring cũ gộp chung hai thứ, nên 3/3 nhắc mà 1/3
// dẫn link vẫn bị chấm "cited" hết.
async function perplexityQuery(prompt, key) {
  const r = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: "sonar",
      messages: [{ role: "user", content: prompt }],
      return_citations: true,
    }),
  });
  if (!r.ok) throw new Error(`Perplexity ${r.status}`);
  const d = await r.json();
  const text = d?.choices?.[0]?.message?.content ?? "";
  // Perplexity trả URL nguồn ở `citations` (mảng string) hoặc `search_results[].url`.
  const sources = [
    ...(Array.isArray(d?.citations) ? d.citations : []),
    ...(Array.isArray(d?.search_results) ? d.search_results.map((s) => s?.url).filter(Boolean) : []),
  ];
  return { text, sources };
}

async function claudeQuery(prompt, key) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!r.ok) throw new Error(`Claude ${r.status}`);
  const d = await r.json();
  const text = d?.content?.[0]?.text ?? "";
  // Claude không có web-search mặc định → không có nguồn cấu trúc; chỉ bóc URL lộ trong text.
  const sources = text.match(/https?:\/\/[^\s)\]}"'>]+/g) ?? [];
  return { text, sources };
}

const ENGINES = [
  { name: "Perplexity", env: "PERPLEXITY_API_KEY", run: perplexityQuery },
  { name: "Claude", env: "ANTHROPIC_API_KEY", run: claudeQuery },
];

const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
const brandTerms = [cfg.brand, ...(cfg.aliases || [])].filter(Boolean);
const competitors = cfg.competitors || [];
const prompts = cfg.prompts || [];
const active = ENGINES.filter((e) => process.env[e.env]);

// Domain của brand để đo "được DẪN LINK" (khác "được nhắc"). Ưu tiên cfg.domains;
// nếu thiếu, tự bóc alias trông giống domain (vd "giftytech.com").
const domainRe = /\b([a-z0-9-]+\.)+[a-z]{2,}\b/i;
const bareDomain = (u) => String(u).toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split(/[/?#]/)[0];
const brandDomains = (
  cfg.domains?.length ? cfg.domains : brandTerms.filter((t) => domainRe.test(t) && !t.includes(" "))
).map(bareDomain).filter(Boolean);
// Map domain đối thủ (nếu cfg.competitorDomains có) để biết "nguồn về tay ai".
const competitorDomains = Object.fromEntries(
  Object.entries(cfg.competitorDomains || {}).map(([k, v]) => [k, bareDomain(v)]),
);

if (!doRun) {
  console.log("=== DRY-RUN — thêm --run để gọi API thật ===");
  console.log(`Brand: ${cfg.brand} (+${(cfg.aliases || []).length} alias)`);
  console.log(`Domain brand (đo dẫn-link): ${brandDomains.join(", ") || "(CHƯA khai — thêm cfg.domains để đo 'được dẫn link')"}`);
  console.log(`Đối thủ: ${competitors.join(", ") || "(chưa khai báo)"}`);
  console.log(`Prompt: ${prompts.length} câu`);
  console.log(
    `Engine sẽ chạy (theo API key có): ${active.map((e) => e.name).join(", ") || "(KHÔNG có key — set PERPLEXITY_API_KEY / ANTHROPIC_API_KEY)"}`,
  );
  console.log(`Tổng lượt gọi: ${prompts.length * active.length}`);
  process.exit(0);
}

if (!active.length) {
  console.error("✗ Không có API key (PERPLEXITY_API_KEY / ANTHROPIC_API_KEY).");
  process.exit(1);
}

const hasTerm = (text, terms) => {
  const t = (text || "").toLowerCase();
  return terms.some((x) => t.includes(String(x).toLowerCase()));
};
// "được dẫn link" = một trong các domain có mặt trong danh sách URL nguồn engine trả về.
const domainInSources = (sources, domains) => {
  const bare = sources.map(bareDomain);
  return domains.some((d) => bare.some((s) => s === d || s.endsWith("." + d)));
};

const rows = [];
const lost = [];      // brand được NHẮC nhưng KHÔNG được dẫn link, mà đối thủ thì có link
const details = [];   // 1 dòng / (engine, prompt) để soi nguồn
for (const e of active) {
  let mentioned = 0, linked = 0;
  for (const p of prompts) {
    let res;
    try {
      res = await e.run(p, process.env[e.env]);
    } catch (err) {
      console.error(`  ! ${e.name} lỗi ở "${p.slice(0, 40)}": ${err.message}`);
      continue;
    }
    const { text, sources = [] } = res;
    const brandMentioned = hasTerm(text, brandTerms);
    const brandLinked = brandDomains.length > 0 && domainInSources(sources, brandDomains);
    // Đối thủ nào được DẪN LINK (không chỉ nhắc) — cần competitorDomains mới đo được link.
    const compLinked = Object.entries(competitorDomains)
      .filter(([, dom]) => domainInSources(sources, [dom]))
      .map(([name]) => name);
    const compMentioned = competitors.filter((c) => hasTerm(text, [c]));

    if (brandMentioned) mentioned++;
    if (brandLinked) linked++;
    // "mất điểm" thật sự: ta chỉ được nhắc (hoặc vắng) trong khi đối thủ chiếm được LINK nguồn.
    if (!brandLinked && compLinked.length) {
      lost.push({ prompt: p, engine: e.name, competitor: compLinked.join(", "), brandMentioned });
    }
    const tier = brandLinked ? "✓ dẫn-link" : brandMentioned ? "~ chỉ nhắc" : "·  vắng";
    details.push({
      engine: e.name, prompt: p, brandMentioned, brandLinked,
      compMentioned, compLinked, sources: sources.slice(0, 6),
    });
    console.log(`  [${e.name}] ${tier}  ${p.slice(0, 58)}`);
  }
  rows.push({
    engine: e.name,
    n: prompts.length,
    mentioned,
    linked,
    mentionRate: prompts.length ? Math.round((mentioned / prompts.length) * 100) : 0,
    linkRate: prompts.length ? Math.round((linked / prompts.length) * 100) : 0,
  });
}

const date = new Date().toISOString().slice(0, 10);
let md = `# Citation Audit: ${cfg.brand}\n## Ngày: ${date}\n\n`;
if (!brandDomains.length) {
  md += `> ⚠️ Chưa khai \`domains\` trong config → chỉ đo được "nhắc", KHÔNG đo được "dẫn link".\n`;
  md += `> Thêm \`"domains": ["${bareDomain(cfg.aliases?.find((a) => domainRe.test(a)) || "brand.com")}"]\` để đo đủ 2 tầng.\n\n`;
}
md += `Đo brand: ${brandTerms.join(", ")} · domain: ${brandDomains.join(", ") || "(chưa khai)"}\n\n`;
md += `## Tầng 1+2 — được NHẮC vs được DẪN LINK\n\n`;
md += `| Engine | Prompt | Nhắc | Dẫn link | % nhắc | % dẫn link |\n|---|---|---|---|---|---|\n`;
for (const r of rows) md += `| ${r.engine} | ${r.n} | ${r.mentioned} | ${r.linked} | ${r.mentionRate}% | **${r.linkRate}%** |\n`;
const avgMention = rows.length ? Math.round(rows.reduce((s, r) => s + r.mentionRate, 0) / rows.length) : 0;
const avgLink = rows.length ? Math.round(rows.reduce((s, r) => s + r.linkRate, 0) / rows.length) : 0;
md += `\n**Trung bình: nhắc ${avgMention}% · dẫn link ${avgLink}%** — khoảng cách giữa hai số này chính là "Google biết brand" vs "Google chọn brand làm nguồn".\n`;

if (lost.length) {
  md += `\n## Prompt mất điểm THẬT (ta không được dẫn link, đối thủ thì có)\n\n`;
  md += `| Prompt | Engine | Ta được nhắc? | Đối thủ chiếm link |\n|---|---|---|---|\n`;
  for (const l of lost) md += `| ${l.prompt.slice(0, 70)} | ${l.engine} | ${l.brandMentioned ? "có (nhưng thua)" : "không"} | ${l.competitor} |\n`;
}

md += `\n## Nguồn được dẫn theo từng prompt (ai chiếm thẻ nguồn)\n\n`;
md += `<details><summary>Mở bảng chi tiết ${details.length} lượt</summary>\n\n`;
md += `| Engine | Prompt | Tầng | Nguồn engine đã dẫn |\n|---|---|---|---|\n`;
for (const d of details) {
  const tier = d.brandLinked ? "dẫn-link" : d.brandMentioned ? "chỉ nhắc" : "vắng";
  const src = d.sources.length ? d.sources.map(bareDomain).join(", ") : "(engine không trả nguồn)";
  md += `| ${d.engine} | ${d.prompt.slice(0, 50)} | ${tier} | ${src} |\n`;
}
md += `\n</details>\n`;

md += `\n## Fix pack gợi ý (ưu tiên theo impact)\n`;
md += `- **Ưu tiên "chỉ nhắc → dẫn link"**: prompt nào brand được nhắc mà không được dẫn link là gần đích nhất — thường thiếu trang đích rõ ràng + tín hiệu thực thể để engine tin mà link.\n`;
md += `- Tạo trang so sánh "${cfg.brand} vs đối thủ" + Product/Service schema cho các prompt dạng so sánh.\n`;
md += `- Bổ sung FAQ khớp ĐÚNG mẫu câu prompt mất điểm + FAQPage schema.\n`;
md += `- Củng cố tín hiệu thực thể: Google Business Profile + review thật, mention bên thứ 3, sameAs đầy đủ, NAP nhất quán.\n`;
md += `- Cập nhật nội dung (freshness) + llms.txt Last-Updated.\n`;
md += `- Recheck sau 14 ngày bằng ĐÚNG prompt set để đo cải thiện (so % dẫn link, không chỉ % nhắc).\n`;
md += `\n> ⚠️ Công cụ này đo Perplexity + Claude (có API). **Google AI Overview KHÔNG có API công khai** — phải đo tay hoặc qua Search Console "Generative AI performance" (nếu tài khoản đã bật). Đừng suy ra AI Overview từ số ở đây.\n`;

writeFileSync(outPath, md, "utf8");
console.log(`\n✓ Đã ghi báo cáo: ${outPath} (nhắc ${avgMention}% · dẫn link ${avgLink}%)`);
