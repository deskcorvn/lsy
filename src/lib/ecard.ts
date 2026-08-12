import { clientConfig, siteUrl } from "@config";
import type { AnySection } from "@/content/schema";
import type { MedusaShop, MedusaStaff } from "@/lib/medusa";
import { zaloLink, telLink, formatVnAddress, mapsLink, vietqrImage } from "@/lib/links";
import { qrSvg } from "@/lib/qr";
import { buildVCard } from "@/lib/vcard";

/**
 * Compose eCard từ dữ liệu Medusa thành section list (render qua SectionRenderer).
 * Medusa admin là builder — file này chỉ MAP dữ liệu -> section, không chứa nội dung bịa.
 * Label mặc định tiếng Việt (thị trường VN — design-ecard).
 */

type ContactItem = {
  kind: "tel" | "zalo" | "mail" | "map" | "vcard" | "share" | "link";
  label: string;
  href: string;
};

function shopContactItems(shop: MedusaShop, vcardPath: string, cardUrl: string): ContactItem[] {
  const items: ContactItem[] = [];
  if (shop.phone) items.push({ kind: "tel", label: "Gọi điện", href: telLink(shop.phone) });
  const zalo = shop.metadata?.zalo ?? shop.phone;
  if (zalo) items.push({ kind: "zalo", label: "Zalo", href: zaloLink(zalo) });
  items.push({ kind: "vcard", label: "Lưu danh bạ", href: vcardPath });
  const maps = mapsLink(shop.metadata?.address);
  if (maps) items.push({ kind: "map", label: "Chỉ đường", href: maps });
  items.push({ kind: "share", label: "Chia sẻ", href: cardUrl });
  return items.slice(0, 5);
}

export async function buildShopCardSections(shop: MedusaShop): Promise<AnySection[]> {
  const cardUrl = `${siteUrl}/card`;
  const sections: AnySection[] = [
    {
      id: "card-header",
      type: "profileHeader",
      name: shop.name,
      ...(shop.description && shop.description !== shop.name
        ? { tagline: shop.description }
        : {}),
      ...(shop.metadata?.owner_name
        ? { org: `Người đại diện: ${shop.metadata.owner_name}` }
        : {}),
      ...(shop.avatar_url ? { avatar: shop.avatar_url } : {}),
      ...(shop.cover_url ? { cover: shop.cover_url } : {}),
    },
    {
      id: "card-contact",
      type: "contactBar",
      sticky: true,
      items: shopContactItems(shop, "/card/vcard.vcf", cardUrl),
    },
  ];

  const social = shop.metadata?.social;
  if (social && Object.keys(social).length) {
    sections.push({
      id: "card-social",
      type: "socialLinks",
      heading: "Kết nối",
      links: Object.entries(social).map(([label, href]) => ({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        href: String(href),
      })),
    });
  }

  const addr = formatVnAddress(shop.metadata?.address);
  if (addr || shop.email || shop.tax_code) {
    sections.push({
      id: "card-info",
      type: "about",
      heading: "Thông tin",
      body: [
        ...(addr ? [`Địa chỉ: ${addr}`] : []),
        ...(shop.email ? [`Email: ${shop.email}`] : []),
        ...(shop.tax_code ? [`Mã số thuế: ${shop.tax_code}`] : []),
      ],
    });
  }

  sections.push({
    id: "card-qr",
    type: "qrPanel",
    heading: "Chia sẻ danh thiếp",
    caption: "Quét mã để mở danh thiếp này",
    svg: await qrSvg(cardUrl),
  });

  const vq = clientConfig.ecard.vietqr;
  if (vq) {
    sections.push({
      id: "card-vietqr",
      type: "qrPanel",
      heading: "Chuyển khoản VietQR",
      caption: vq.accountName,
      imageUrl: vietqrImage(vq),
    });
  }
  return sections;
}

export async function buildStaffCardSections(
  staff: MedusaStaff,
  shop: MedusaShop | null,
): Promise<AnySection[]> {
  const slug = staff.slug ?? staff.id;
  const cardUrl = `${siteUrl}/card/${slug}`;
  const items: ContactItem[] = [];
  if (staff.phone) {
    items.push({ kind: "tel", label: "Gọi điện", href: telLink(staff.phone) });
    items.push({ kind: "zalo", label: "Zalo", href: zaloLink(staff.phone) });
  }
  items.push({ kind: "vcard", label: "Lưu danh bạ", href: `/card/${slug}/vcard.vcf` });
  const maps = mapsLink(shop?.metadata?.address);
  if (maps) items.push({ kind: "map", label: "Chỉ đường", href: maps });
  items.push({ kind: "share", label: "Chia sẻ", href: cardUrl });

  return [
    {
      id: "card-header",
      type: "profileHeader",
      name: staff.name,
      ...(staff.specialty ? { tagline: staff.specialty } : {}),
      ...(shop?.name ? { org: shop.name } : {}),
      ...(staff.avatar_url || shop?.avatar_url
        ? { avatar: (staff.avatar_url ?? shop?.avatar_url) as string }
        : {}),
      ...(shop?.cover_url ? { cover: shop.cover_url } : {}),
    },
    { id: "card-contact", type: "contactBar", sticky: true, items },
    {
      id: "card-qr",
      type: "qrPanel",
      heading: "Chia sẻ danh thiếp",
      caption: "Quét mã để mở danh thiếp này",
      svg: await qrSvg(cardUrl),
    },
  ];
}

export function shopVCard(shop: MedusaShop): string {
  return buildVCard({
    fullName: shop.name,
    org: shop.name,
    title: shop.business_type === "company" ? "Doanh nghiệp" : undefined,
    phone: shop.phone,
    email: shop.email,
    url: `${siteUrl}/card`,
    photoUrl: shop.avatar_url,
    address: formatVnAddress(shop.metadata?.address) || undefined,
    zaloUrl: shop.metadata?.zalo || shop.phone ? zaloLink((shop.metadata?.zalo ?? shop.phone) as string) : undefined,
  });
}

export function staffVCard(staff: MedusaStaff, shop: MedusaShop | null): string {
  const slug = staff.slug ?? staff.id;
  return buildVCard({
    fullName: staff.name,
    org: shop?.name,
    title: staff.specialty,
    phone: staff.phone,
    email: staff.email,
    url: `${siteUrl}/card/${slug}`,
    photoUrl: staff.avatar_url ?? shop?.avatar_url,
    address: formatVnAddress(shop?.metadata?.address) || undefined,
    zaloUrl: staff.phone ? zaloLink(staff.phone) : undefined,
  });
}
