import type { MetadataRoute } from "next";
import { clientConfig } from "@config";
import { content } from "@content";
import { catalog } from "@catalog";
import { absoluteUrl } from "@/lib/seo/absolute-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Route thật ("/" + nav "/..." + trang catalog); nav dạng anchor (#...) không phải route.
  const routes = [
    "/",
    ...clientConfig.nav.map((n) => n.href).filter((h) => h.startsWith("/")),
    ...content.pages.map((p) => `/${p.slug}`),
    ...catalog.collections.flatMap((c) => [
      `/${c.slug}`,
      // Trang con chỉ tồn tại khi item có bio đạt ngưỡng (xem [collection]/[slug]).
      ...c.items.filter((i) => i.bio).map((i) => `/${c.slug}/${i.slug}`),
    ]),
  ];
  const unique = [...new Set(routes)];
  return unique.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1.0 : 0.7,
  }));
}
