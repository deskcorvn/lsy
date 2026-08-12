import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTenant, listTenantSlugs } from "@/lib/tenant/store";
import { buildTenantGraph } from "@/lib/tenant/graph";
import { resolveProfile, profileVars } from "@/design/profile";
import SectionRenderer from "@/components/SectionRenderer";
import JsonLd from "@/components/seo/JsonLd";

// Prebuild tenant đã có; site tạo SAU vẫn render nhờ dynamicParams. Lỗi nguồn (DB) → [] để build không vỡ.
export async function generateStaticParams() {
  try {
    return (await listTenantSlugs()).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const site = await getTenant(slug);
  if (!site) return {};
  return {
    title: site.content.page.title ?? site.brand.name,
    description: site.content.page.description ?? site.brand.description,
  };
}

export default async function TenantSite({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const site = await getTenant(slug);
  if (!site) notFound();

  // Vibe + màu thương hiệu của tenant → CSS vars trên 1 wrapper (cascade xuống section).
  const profile = resolveProfile(site.branding.vibe);
  const vars = {
    "--brand-primary": site.branding.primary,
    "--brand-accent": site.branding.accent,
    ...profileVars(profile),
    fontFamily: "var(--font-body)",
  } as CSSProperties;

  return (
    <>
      {/* React 19 hoist <link> lên <head>; nạp font theo vibe (không next/font/google) */}
      <link rel="stylesheet" href={profile.googleFonts} />
      <JsonLd data={buildTenantGraph(site)} />
      <div style={vars}>
        <main>
          {site.content.sections.map((section) => (
            <SectionRenderer key={section.id} section={section} />
          ))}
        </main>
      </div>
    </>
  );
}
