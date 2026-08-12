import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clientConfig, siteUrl } from "@config";
import { getShop, getStaffBySlug, getStaffList } from "@/lib/medusa";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { StaffCardPage } from "@/components/ecard/CardPage";

// Thẻ eCard từng nhân viên: /card/{slug} (fallback /card/{staff_id} khi chưa có slug).
// dynamicParams=true: staff mới trên Medusa có thẻ ngay không cần rebuild (ISR).
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const { ecard } = clientConfig;
  if (!ecard.enabled || !ecard.shopId) return [];
  const staff = await getStaffList(ecard.shopId);
  return staff.map((s) => ({ slug: s.slug ?? s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { ecard } = clientConfig;
  if (!ecard.enabled || !ecard.shopId) return {};
  const { slug } = await params;
  const [shop, staff] = await Promise.all([
    getShop(ecard.shopId),
    getStaffBySlug(ecard.shopId, slug),
  ]);
  if (!staff) return {};
  const title = `${staff.name}${staff.specialty ? ` — ${staff.specialty}` : ""}`;
  const shareTitle = `${title}${shop ? ` | ${shop.name}` : ""}`;
  const description = staff.specialty
    ? `${staff.specialty}${shop ? ` tại ${shop.name}` : ""}`
    : `Danh thiếp điện tử của ${staff.name}`;
  const ogImage =
    typeof staff.metadata?.og_image === "string"
      ? staff.metadata.og_image
      : typeof staff.metadata?.ogImage === "string"
        ? staff.metadata.ogImage
        : (ecard.shareImage ??
          shop?.cover_url ??
          staff.avatar_url ??
          shop?.avatar_url ??
          clientConfig.brand.ogImage);
  const image = absoluteUrl(ogImage);
  const path = `/card/${slug}`;
  return {
    title: `${title} | Danh thiếp điện tử`,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: clientConfig.brand.locale,
      siteName: clientConfig.brand.name,
      url: `${siteUrl}${path}`,
      title: `${shareTitle} | Danh thiếp điện tử`,
      description,
      images: [{ url: image, alt: shareTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${shareTitle} | Danh thiếp điện tử`,
      description,
      images: [image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if (!clientConfig.ecard.enabled) notFound();
  const { slug } = await params;
  return <StaffCardPage slug={slug} />;
}
