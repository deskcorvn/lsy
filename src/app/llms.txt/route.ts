import { clientConfig, siteUrl } from "@config";
import { content } from "@content";
import { catalog } from "@catalog";
import type { SectionOf } from "@/content/schema";

export const dynamic = "force-static";

export function GET() {
  const { brand, contact, geo } = clientConfig;
  const faq = content.sections.find(
    (s): s is SectionOf<"faq"> => s.type === "faq",
  );

  const lines: string[] = [
    `# ${brand.name}`,
    "",
    `> ${brand.description}`,
    "",
    `Last-Updated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    "## Thông tin",
    `- Website: ${siteUrl}`,
    `- Email: ${contact.email}`,
    ...(contact.phoneDisplay ? [`- Điện thoại: ${contact.phoneDisplay}`] : []),
    ...(contact.address
      ? [`- Địa chỉ: ${contact.address.street}, ${contact.address.locality}`]
      : []),
  ];

  // Catalog: danh mục nội bộ để AI điều hướng (mỗi collection = 1 trang).
  if (catalog.collections.length) {
    lines.push("", "## Danh mục");
    for (const c of catalog.collections) {
      lines.push(`- [${c.title}](${siteUrl}/${c.slug}) — ${c.items.length} mục. ${c.description}`);
    }
  }

  if (faq) {
    lines.push("", "## Câu hỏi thường gặp");
    for (const item of faq.items) lines.push(`- ${item.question}`);
  }

  if (geo.mentions.length) {
    lines.push("", "## Được nhắc đến");
    for (const m of geo.mentions) lines.push(`- ${m.label}: ${m.url}`);
  }

  lines.push("");
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
