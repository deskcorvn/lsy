import type { SiteModel } from "./types";

type JsonLdObject = Record<string, unknown>;

/**
 * JSON-LD @graph cho 1 tenant — sinh TỪ dữ liệu site (param), không đọc global config.
 * Đây là bản multi-tenant của buildPageGraph: mỗi tenant có Org/WebSite/WebPage/FAQPage riêng.
 */
export function buildTenantGraph(site: SiteModel): JsonLdObject[] {
  const url = `https://${site.brand.domain}`;
  const orgId = `${url}/#organization`;
  const graph: JsonLdObject[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": orgId,
      name: site.brand.name,
      url,
      description: site.brand.description,
      ...(site.brand.email ? { email: site.brand.email } : {}),
      ...(site.brand.phone ? { telephone: site.brand.phone } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url,
      name: site.brand.name,
      publisher: { "@id": orgId },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url,
      name: site.content.page.title ?? site.brand.name,
      description: site.content.page.description ?? site.brand.description,
      ...(site.content.page.dateModified ? { dateModified: site.content.page.dateModified } : {}),
      publisher: { "@id": orgId },
    },
  ];

  const faq = site.content.sections.find((s) => s.type === "faq");
  if (faq && faq.type === "faq") {
    graph.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((it) => ({
        "@type": "Question",
        name: it.question,
        acceptedAnswer: { "@type": "Answer", text: it.answer },
      })),
    });
  }
  return graph;
}
