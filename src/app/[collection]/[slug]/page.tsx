import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@catalog";
import JsonLd from "@/components/seo/JsonLd";
import {
  webPageSchema,
  breadcrumbSchema,
  catalogItemEntity,
} from "@/lib/seo/schema";

/**
 * Trang con của item catalog — CHỈ tồn tại khi item có `bio` đạt ngưỡng schema
 * (chống thin content: card không bio thì chỉ nằm trên trang collection).
 * JSON-LD entity theo itemSchemaType (vd MusicGroup cho nghệ sĩ).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.collections.flatMap((c) =>
    c.items
      .filter((i) => i.bio)
      .map((i) => ({ collection: c.slug, slug: i.slug })),
  );
}

function find(collectionSlug: string, itemSlug: string) {
  const c = catalog.collections.find((x) => x.slug === collectionSlug);
  const item = c?.items.find((i) => i.slug === itemSlug && i.bio);
  return c && item ? { c, item } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}): Promise<Metadata> {
  const { collection, slug } = await params;
  const found = find(collection, slug);
  if (!found) return {};
  const { c, item } = found;
  return {
    title: item.title,
    description: item.bio!.slice(0, 160),
    alternates: { canonical: `/${c.slug}/${item.slug}` },
  };
}

const LINK_LABELS: Record<string, string> = {
  spotify: "Spotify",
  appleMusic: "Apple Music",
  youtube: "YouTube",
  youtubeMusic: "YouTube Music",
  amazonMusic: "Amazon Music",
  deezer: "Deezer",
  soundcloud: "SoundCloud",
  bandcamp: "Bandcamp",
};

export default async function CatalogItemPage({
  params,
}: {
  params: Promise<{ collection: string; slug: string }>;
}) {
  const { collection, slug } = await params;
  const found = find(collection, slug);
  if (!found) notFound();
  const { c, item } = found;
  const path = `/${c.slug}/${item.slug}`;
  const entity = catalogItemEntity(c, item);

  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: item.title,
            description: item.bio!.slice(0, 160),
            path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: c.title, path: `/${c.slug}` },
            { name: item.title, path },
          ]),
          ...(entity ? [entity] : []),
        ]}
      />
      <main
        style={{ background: "var(--p-surface)", color: "var(--p-ink)" }}
        className="min-h-[60vh]"
      >
        <article className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[280px_1fr] md:py-24">
          <div>
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: "1 / 1",
                borderRadius:
                  c.shape === "arch"
                    ? "999px 999px var(--p-radius) var(--p-radius)"
                    : c.shape === "circle"
                      ? "999px"
                      : "var(--p-radius)",
                border: "1px solid var(--p-line)",
                boxShadow: "var(--p-shadow)",
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 280px"
                priority
                className="object-cover"
              />
            </div>
            {Object.keys(item.links).length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" style={{ listStyle: "none", padding: 0 }}>
                {Object.entries(item.links).map(([key, url]) => (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1.5 text-sm transition hover:opacity-80"
                      style={{
                        border: "1px solid var(--p-line)",
                        borderRadius: "999px",
                        color: "var(--p-ink)",
                      }}
                    >
                      {LINK_LABELS[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <nav aria-label="Breadcrumb" className="text-sm" style={{ color: "var(--p-muted)" }}>
              <Link href={`/${c.slug}`} className="hover:underline">
                {c.title}
              </Link>
              {" / "}
              <span aria-current="page">{item.title}</span>
            </nav>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              {item.title}
            </h1>
            {item.subtitle && (
              <p className="mt-2 text-lg" style={{ color: "var(--p-muted)" }}>
                {item.subtitle}
              </p>
            )}
            <div className="mt-6 space-y-4 leading-relaxed">
              {item.bio!.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
