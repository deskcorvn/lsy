import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog } from "@catalog";
import { content } from "@content";
import JsonLd from "@/components/seo/JsonLd";
import SectionRenderer from "@/components/SectionRenderer";
import {
  webPageSchema,
  breadcrumbSchema,
  faqPageSchema,
  catalogItemListSchema,
} from "@/lib/seo/schema";
import type { SectionOf } from "@/content/schema";
import type { CatalogItem } from "@/content/catalog-schema";

/**
 * Route /{slug} tự sinh, resolve theo thứ tự:
 * 1. Catalog collection (catalog.config.ts) -> MediaGrid + ItemList JSON-LD.
 * 2. Content page (content.config.ts `pages`) -> render sections như trang chủ.
 * dynamicParams=false: slug lạ -> 404, không render mò.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...catalog.collections.map((c) => ({ collection: c.slug })),
    ...content.pages.map((p) => ({ collection: p.slug })),
  ];
}

function find(slug: string) {
  return catalog.collections.find((c) => c.slug === slug);
}

function findPage(slug: string) {
  return content.pages.find((p) => p.slug === slug);
}

// Card link: có trang con (bio đạt ngưỡng) -> link nội bộ; không thì link nền tảng ngoài.
function itemHref(collectionSlug: string, item: CatalogItem): string | undefined {
  if (item.bio) return `/${collectionSlug}/${item.slug}`;
  return item.links.spotify ?? Object.values(item.links)[0];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const meta = find(collection) ?? findPage(collection);
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${collection}` },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection } = await params;
  const page = findPage(collection);
  if (page) {
    const faq = page.sections.find(
      (s): s is SectionOf<"faq"> => s.type === "faq",
    );
    return (
      <>
        <JsonLd
          data={[
            webPageSchema({
              title: page.title,
              description: page.description,
              path: `/${page.slug}`,
              datePublished: page.datePublished,
              dateModified: page.dateModified,
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: page.title, path: `/${page.slug}` },
            ]),
            ...(faq ? [faqPageSchema(faq.items)] : []),
          ]}
        />
        <main>
          {page.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </main>
      </>
    );
  }

  const c = find(collection);
  if (!c) notFound();

  const grid: SectionOf<"mediaGrid"> = {
    id: `${c.slug}-grid`,
    type: "mediaGrid",
    columns: c.columns,
    aspect: c.aspect,
    shape: c.shape,
    filterByTag: c.filterByTag,
    ...(c.batchSize ? { batchSize: c.batchSize } : {}),
    items: c.items.map((item) => ({
      image: item.image,
      title: item.title,
      ...(item.subtitle ? { subtitle: item.subtitle } : {}),
      ...(itemHref(c.slug, item) ? { href: itemHref(c.slug, item) } : {}),
      tags: item.tags,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ title: c.title, description: c.description, path: `/${c.slug}` }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: c.title, path: `/${c.slug}` },
          ]),
          catalogItemListSchema(c),
        ]}
      />
      <main>
        <header
          className="px-6 pb-2 pt-16 text-center md:pt-24"
          style={{
            background: "var(--p-surface-image, var(--p-surface))",
            color: "var(--p-ink)",
          }}
        >
          <h1
            className="font-display text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "var(--brand-primary)" }}
          >
            {c.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl" style={{ color: "var(--p-muted)" }}>
            {c.description}
          </p>
        </header>
        <SectionRenderer section={grid} />
      </main>
    </>
  );
}
