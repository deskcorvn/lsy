/**
 * JSON-LD (schema.org) builders — hàm thuần, trả object. CONFIG-DRIVEN: đọc từ
 * clientConfig (@config), không hardcode. Org & WebSite dùng @id chung để các
 * schema khác tham chiếu (cách search/AI engine dedupe thực thể).
 */
import { clientConfig, siteUrl } from "@config";
import { absoluteUrl } from "./absolute-url";

type JsonLdObject = Record<string, unknown>;

const { brand, contact, social, geo } = clientConfig;

export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: brand.name,
    legalName: brand.legalName,
    alternateName: brand.shortName,
    url: siteUrl,
    logo: absoluteUrl(brand.logo),
    image: absoluteUrl(brand.ogImage),
    description: brand.description,
    email: contact.email,
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(brand.taxId ? { taxID: brand.taxId } : {}),
    ...(brand.foundingDate ? { foundingDate: brand.foundingDate } : {}),
    ...(contact.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.address.street,
            addressLocality: contact.address.locality,
            ...(contact.address.region ? { addressRegion: contact.address.region } : {}),
            addressCountry: contact.address.country,
          },
        }
      : {}),
    contactPoint: {
      "@type": "ContactPoint",
      ...(contact.phone ? { telephone: contact.phone } : {}),
      email: contact.email,
      contactType: "customer support",
      ...(contact.address ? { areaServed: contact.address.country } : {}),
      availableLanguage: [brand.lang],
    },
    ...(social.length ? { sameAs: social } : {}),
    // GEO: bài/báo bên thứ 3 nói về tổ chức -> tăng độ tin thực thể cho AI.
    ...(geo.mentions.length
      ? {
          subjectOf: geo.mentions.map((m) => ({
            "@type": "WebPage",
            name: m.label,
            url: m.url,
          })),
        }
      : {}),
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: brand.name,
    url: siteUrl,
    description: brand.description,
    inLanguage: brand.lang,
    publisher: { "@id": ORG_ID },
  };
}

export function webPageSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: brand.lang,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    inLanguage: brand.lang,
  };
}

export function faqPageSchema(
  questions: { question: string; answer: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  path: string;
  steps: { name: string; text: string }[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: brand.lang,
    publisher: { "@id": ORG_ID },
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function eventSchema(input: {
  name: string;
  startDate: string;
  description: string;
  endDate?: string;
  location?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    startDate: input.startDate,
    ...(input.endDate ? { endDate: input.endDate } : {}),
    description: input.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(input.location
      ? { location: { "@type": "Place", name: input.location } }
      : {}),
    organizer: { "@id": ORG_ID },
    inLanguage: brand.lang,
  };
}

export function itemListSchema(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLdObject {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url,
    inLanguage: brand.lang,
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

/* ---------- Catalog (collection) & âm nhạc ---------- */

import type { CatalogCollection, CatalogItem } from "@/content/catalog-schema";

// Entity cho 1 item catalog theo itemSchemaType của collection.
// Luật quan trọng: `url` là TRANG CỦA MÌNH (nếu có trang con), link nền tảng ngoài
// (Spotify/Apple…) vào `sameAs` — url trỏ thẳng Spotify là rò entity sang nền tảng.
export function catalogItemEntity(
  collection: CatalogCollection,
  item: CatalogItem,
): JsonLdObject | null {
  if (!collection.itemSchemaType) return null;
  const links = Object.values(item.links);
  const ownPath = item.bio ? `/${collection.slug}/${item.slug}` : undefined;
  const base: JsonLdObject = {
    "@type": collection.itemSchemaType,
    name: item.title,
    image: absoluteUrl(item.image),
    ...(ownPath ? { url: absoluteUrl(ownPath) } : {}),
    ...(links.length ? { sameAs: links } : {}),
  };
  switch (collection.itemSchemaType) {
    case "MusicGroup":
      // Nghệ sĩ label = project alias -> MusicGroup (subtype Organization), KHÔNG phải Person.
      return {
        ...base,
        ...(item.subtitle ? { genre: item.subtitle } : {}),
        parentOrganization: { "@id": ORG_ID },
      };
    case "MusicAlbum":
      return {
        ...base,
        ...(item.subtitle
          ? { byArtist: { "@type": "MusicGroup", name: item.subtitle } }
          : {}),
      };
    case "MusicPlaylist":
      return { ...base, creator: { "@id": ORG_ID } };
    default:
      return base;
  }
}

// ItemList của trang collection — item mang entity đầy đủ khi có itemSchemaType.
export function catalogItemListSchema(collection: CatalogCollection): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: collection.title,
    numberOfItems: collection.items.length,
    itemListElement: collection.items.map((item, index) => {
      const entity = catalogItemEntity(collection, item);
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        ...(entity ? { item: entity } : {}),
      };
    }),
  };
}

export function videoObjectSchema(input: {
  name: string;
  description: string;
  embedId: string; // YouTube video id
  uploadDate: string; // ISO — bắt buộc theo Google
  thumbnailUrl?: string;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.name,
    description: input.description,
    uploadDate: input.uploadDate,
    // hqdefault luôn tồn tại; maxres 404 với video cũ.
    thumbnailUrl:
      input.thumbnailUrl ?? `https://i.ytimg.com/vi/${input.embedId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.embedId}`,
    contentUrl: `https://www.youtube.com/watch?v=${input.embedId}`,
    publisher: { "@id": ORG_ID },
  };
}

// Service mở rộng: hasOfferCatalog (danh mục dịch vụ con) + offers (mô tả điều khoản
// dạng text — schema.org không có field revenue-share, KHÔNG nhét tỉ lệ vào price).
export function serviceWithOffersSchema(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  offerDescription?: string;
  offerCatalog?: { name: string; description: string }[];
}): JsonLdObject {
  return {
    ...serviceSchema(input),
    ...(input.offerDescription
      ? {
          offers: {
            "@type": "Offer",
            description: input.offerDescription,
          },
        }
      : {}),
    ...(input.offerCatalog?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: input.name,
            itemListElement: input.offerCatalog.map((o) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: o.name,
                description: o.description,
              },
            })),
          },
        }
      : {}),
  };
}

// GEO: doanh nghiệp địa phương (chỉ phát khi cấu hình geo.localBusiness).
export function localBusinessSchema(): JsonLdObject | null {
  const lb = geo.localBusiness;
  // LocalBusiness không có địa chỉ vật lý thì vô nghĩa với search — bỏ phát.
  if (!lb || !contact.address) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: brand.name,
    url: siteUrl,
    telephone: contact.phone,
    image: absoluteUrl(brand.ogImage),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      ...(contact.address.region ? { addressRegion: contact.address.region } : {}),
      addressCountry: contact.address.country,
    },
    ...(lb.priceRange ? { priceRange: lb.priceRange } : {}),
    ...(lb.areaServed.length ? { areaServed: lb.areaServed } : {}),
    ...(lb.openingHours.length ? { openingHours: lb.openingHours } : {}),
    parentOrganization: { "@id": ORG_ID },
    ...(social.length ? { sameAs: social } : {}),
  };
}
