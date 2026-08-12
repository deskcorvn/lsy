import type { Metadata } from "next";
import { content } from "@content";
import { clientConfig } from "@config";
import JsonLd from "@/components/seo/JsonLd";
import { buildPageGraph } from "@/lib/jsonld";
import SectionRenderer from "@/components/SectionRenderer";
import { ShopCardPage } from "@/components/ecard/CardPage";

export const metadata: Metadata = {
  ...(content.page.title ? { title: { absolute: content.page.title } } : {}),
  ...(content.page.description ? { description: content.page.description } : {}),
};

export default function HomePage() {
  // eCard standalone: khách CHỈ dùng danh thiếp — "/" chính là thẻ (PLAN eCard §8).
  if (clientConfig.ecard.enabled && clientConfig.ecard.standalone) {
    return <ShopCardPage />;
  }
  return (
    <>
      <JsonLd data={buildPageGraph()} />
      <main>
        {content.sections.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </main>
    </>
  );
}
