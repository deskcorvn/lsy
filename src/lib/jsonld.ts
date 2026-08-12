/**
 * Gom toàn bộ JSON-LD của trang chủ từ clientConfig + content thành 1 mảng (@graph),
 * inject 1 lần ở page.tsx qua <JsonLd>. Builders nằm ở src/lib/seo/schema.ts (DRY).
 */
import { clientConfig } from "@config";
import { content } from "@content";
import type { SectionOf } from "@/content/schema";
import {
  organizationSchema,
  websiteSchema,
  webPageSchema,
  faqPageSchema,
  eventSchema,
  localBusinessSchema,
} from "@/lib/seo/schema";

type JsonLdObject = Record<string, unknown>;

export function buildPageGraph(): JsonLdObject[] {
  const graph: JsonLdObject[] = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema({
      title: content.page.title ?? clientConfig.brand.name,
      description: content.page.description ?? clientConfig.brand.description,
      path: "/",
      datePublished: content.page.datePublished,
      dateModified: content.page.dateModified,
    }),
  ];

  const faq = content.sections.find(
    (s): s is SectionOf<"faq"> => s.type === "faq",
  );
  if (faq) graph.push(faqPageSchema(faq.items));

  const events = content.sections.find(
    (s): s is SectionOf<"events"> => s.type === "events",
  );
  if (events) {
    for (const e of events.items) {
      // Chỉ phát Event JSON-LD khi có ISO datetime thật (tránh đánh dấu sai).
      if (e.startDate) {
        graph.push(
          eventSchema({
            name: e.title,
            startDate: e.startDate,
            description: e.description,
            location: e.locationName,
          }),
        );
      }
    }
  }

  const lb = localBusinessSchema();
  if (lb) graph.push(lb);

  return graph;
}
