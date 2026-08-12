import type { Metadata } from "next";
import { clientConfig } from "@config";
import { absoluteUrl } from "./absolute-url";

/** Helper Metadata cho route phụ (canonical + OpenGraph + Twitter), fallback từ clientConfig. */
export function pageMetadata(input: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
  type?: "website" | "article";
}): Metadata {
  const description = input.description ?? clientConfig.brand.description;
  const path = input.path ?? "/";
  const url = absoluteUrl(path);
  const image = absoluteUrl(input.image ?? clientConfig.brand.ogImage);
  return {
    title: input.title,
    description,
    ...(input.keywords ? { keywords: input.keywords } : {}),
    alternates: { canonical: path },
    ...(input.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: input.type ?? "website",
      siteName: clientConfig.brand.name,
      locale: clientConfig.brand.locale,
      url,
      title: input.title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description,
      images: [image],
    },
  };
}
