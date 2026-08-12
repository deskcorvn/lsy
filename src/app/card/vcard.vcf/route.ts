import { clientConfig } from "@config";
import { getShop } from "@/lib/medusa";
import { shopVCard } from "@/lib/ecard";

// vCard 4.0 của shop — server-side, tải thẳng vào danh bạ.
export const revalidate = 300;

export async function GET() {
  const { ecard } = clientConfig;
  if (!ecard.enabled || !ecard.shopId) return new Response(null, { status: 404 });
  const shop = await getShop(ecard.shopId);
  if (!shop) return new Response(null, { status: 404 });
  return new Response(shopVCard(shop), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(shop.name)}.vcf"`,
    },
  });
}
