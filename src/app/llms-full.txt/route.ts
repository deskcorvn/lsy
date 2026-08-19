import { clientConfig, siteUrl } from "@config";
import { content } from "@content";
import { catalog } from "@catalog";
import type { SectionOf } from "@/content/schema";

export const dynamic = "force-static";

export function GET() {
  const { brand, contact, geo } = clientConfig;

  const lines: string[] = [
    `# ${brand.name} — Hồ sơ đầy đủ`,
    "",
    `> ${brand.description}`,
    "",
    `Last-Updated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "## Tổ chức",
    `- Tên: ${brand.name} (${brand.legalName})`,
    ...(brand.foundingDate ? [`- Thành lập: ${brand.foundingDate}`] : []),
    ...(brand.taxId ? [`- Mã số thuế/định danh: ${brand.taxId}`] : []),
    `- Website: ${siteUrl}`,
    `- Email: ${contact.email}`,
    ...(contact.phoneDisplay ? [`- Điện thoại: ${contact.phoneDisplay}`] : []),
    ...(contact.address
      ? [`- Địa chỉ: ${contact.address.street}, ${contact.address.locality}`]
      : []),
  ];

  const about = content.sections.find(
    (s): s is SectionOf<"about"> => s.type === "about",
  );
  if (about) lines.push("", `## ${about.heading}`, ...about.body);

  const values = content.sections.filter(
    (s): s is SectionOf<"valueHighlights"> => s.type === "valueHighlights",
  );
  for (const value of values) {
    lines.push("", `## ${value.heading ?? value.eyebrow ?? "Thông tin nổi bật"}`);
    for (const it of value.items) lines.push(`- ${it.title}: ${it.description}`);
  }

  const faq = content.sections.find(
    (s): s is SectionOf<"faq"> => s.type === "faq",
  );
  if (faq) {
    lines.push("", "## Câu hỏi thường gặp");
    for (const item of faq.items) {
      lines.push(`### ${item.question}`, item.answer);
      if (item.sourceUrl) lines.push(`Nguồn: ${item.sourceUrl}`);
      lines.push("");
    }
  }

  if (geo.localBusiness) {
    const lb = geo.localBusiness;
    lines.push("## Phạm vi phục vụ");
    if (lb.areaServed.length) lines.push(`- Khu vực: ${lb.areaServed.join(", ")}`);
    if (lb.priceRange) lines.push(`- Khoảng giá: ${lb.priceRange}`);
    if (lb.openingHours.length)
      lines.push(`- Giờ mở cửa: ${lb.openingHours.join("; ")}`);
    lines.push("");
  }

  // Catalog đầy đủ: roster/release/danh mục — kèm link nền tảng ngoài (sameAs).
  for (const c of catalog.collections) {
    lines.push(`## ${c.title} (${c.items.length})`, c.description, "");
    for (const item of c.items) {
      const links = Object.values(item.links).join(" · ");
      lines.push(
        `- ${item.title}${item.subtitle ? ` — ${item.subtitle}` : ""}${links ? ` (${links})` : ""}`,
      );
    }
    lines.push("");
  }

  if (geo.mentions.length) {
    lines.push("## Được nhắc đến");
    for (const m of geo.mentions) lines.push(`- ${m.label}: ${m.url}`);
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
