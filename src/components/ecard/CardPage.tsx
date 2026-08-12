import { notFound } from "next/navigation";
import { clientConfig, siteUrl } from "@config";
import JsonLd from "@/components/seo/JsonLd";
import SectionRenderer from "@/components/SectionRenderer";
import { getShop, getStaffBySlug, type MedusaShop, type MedusaStaff } from "@/lib/medusa";
import { buildShopCardSections, buildStaffCardSections } from "@/lib/ecard";
import { zaloLink, formatVnAddress } from "@/lib/links";

/**
 * View eCard dùng chung cho /card, /card/[slug] và homepage khi ecard.standalone.
 * Server components — dữ liệu Medusa qua ISR (lib/medusa), JSON-LD theo chuẩn
 * ProfilePage/Person (Google doc chính thức) cho thẻ cá nhân, Organization cho thẻ shop.
 */

function shopJsonLd(shop: MedusaShop) {
  const social = Object.values(shop.metadata?.social ?? {});
  const zalo = shop.metadata?.zalo ?? shop.phone;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: shop.name,
      url: `${siteUrl}/card`,
      ...(shop.description ? { description: shop.description } : {}),
      ...(shop.phone ? { telephone: shop.phone } : {}),
      ...(shop.email ? { email: shop.email } : {}),
      ...(shop.avatar_url ? { image: shop.avatar_url, logo: shop.avatar_url } : {}),
      ...(shop.tax_code ? { taxID: shop.tax_code } : {}),
      ...(shop.metadata?.address
        ? {
            address: {
              "@type": "PostalAddress",
              streetAddress: formatVnAddress(shop.metadata.address),
              addressCountry: "VN",
            },
          }
        : {}),
      ...(social.length || zalo
        ? { sameAs: [...social, ...(zalo ? [zaloLink(zalo)] : [])] }
        : {}),
    },
  ];
}

function staffJsonLd(staff: MedusaStaff, shop: MedusaShop | null, path: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: `${siteUrl}${path}`,
      mainEntity: {
        "@type": "Person",
        name: staff.name,
        ...(staff.specialty ? { jobTitle: staff.specialty } : {}),
        ...(staff.phone ? { telephone: staff.phone } : {}),
        ...(staff.avatar_url ? { image: staff.avatar_url } : {}),
        ...(shop?.name
          ? { worksFor: { "@type": "Organization", name: shop.name } }
          : {}),
        ...(staff.phone ? { sameAs: [zaloLink(staff.phone)] } : {}),
      },
    },
  ];
}

// Thẻ CÔNG TY (shop) — gate enabled ở route gọi vào.
export async function ShopCardPage() {
  const { ecard } = clientConfig;
  if (!ecard.enabled || !ecard.shopId) notFound();
  const shop = await getShop(ecard.shopId);
  if (!shop) notFound(); // BE sập lần build đầu: 404 thay vì trang rỗng — ISR sẽ thử lại
  const sections = await buildShopCardSections(shop);
  return (
    <>
      <JsonLd data={shopJsonLd(shop)} />
      <main>
        {sections.map((s) => (
          <SectionRenderer key={s.id} section={s} />
        ))}
      </main>
    </>
  );
}

// Thẻ CÁ NHÂN (staff) theo slug (fallback id khi chưa migration slug).
export async function StaffCardPage({ slug }: { slug: string }) {
  const { ecard } = clientConfig;
  if (!ecard.enabled || !ecard.shopId) notFound();
  const [shop, staff] = await Promise.all([
    getShop(ecard.shopId),
    getStaffBySlug(ecard.shopId, slug),
  ]);
  if (!staff) notFound();
  const sections = await buildStaffCardSections(staff, shop);
  return (
    <>
      <JsonLd data={staffJsonLd(staff, shop, `/card/${slug}`)} />
      <main>
        {sections.map((s) => (
          <SectionRenderer key={s.id} section={s} />
        ))}
      </main>
    </>
  );
}
