import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clientConfig, siteUrl } from "@config";
import { getShop } from "@/lib/medusa";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { ShopCardPage } from "@/components/ecard/CardPage";

// Thẻ eCard của shop — dữ liệu từ Medusa (admin là builder), ISR 5 phút.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { ecard } = clientConfig;
  if (!ecard.enabled || !ecard.shopId) return {};
  const shop = await getShop(ecard.shopId);
  if (!shop) return {};
  const title = `${shop.name} — Danh thiếp điện tử`;
  const shareTitle = `${title} | ${clientConfig.brand.name}`;
  const description = shop.description ?? `Danh thiếp điện tử của ${shop.name}`;
  const ogImage =
    typeof shop.metadata?.og_image === "string"
      ? shop.metadata.og_image
      : typeof shop.metadata?.ogImage === "string"
        ? shop.metadata.ogImage
        : (ecard.shareImage ?? shop.cover_url ?? shop.avatar_url ?? clientConfig.brand.ogImage);
  const image = absoluteUrl(ogImage);
  const url = `${siteUrl}/card`;
  return {
    title,
    description,
    alternates: { canonical: "/card" },
    openGraph: {
      type: "website",
      locale: clientConfig.brand.locale,
      siteName: clientConfig.brand.name,
      url,
      title: shareTitle,
      description,
      images: [{ url: image, alt: shareTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}

export default async function Page() {
  if (!clientConfig.ecard.enabled) notFound();
  return <ShopCardPage />;
}
