import { clientConfig } from "@config";
import { getShop, getStaffBySlug } from "@/lib/medusa";
import { staffVCard } from "@/lib/ecard";

// vCard 4.0 của nhân viên.
export const revalidate = 300;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { ecard } = clientConfig;
  if (!ecard.enabled || !ecard.shopId) return new Response(null, { status: 404 });
  const { slug } = await params;
  const [shop, staff] = await Promise.all([
    getShop(ecard.shopId),
    getStaffBySlug(ecard.shopId, slug),
  ]);
  if (!staff) return new Response(null, { status: 404 });
  return new Response(staffVCard(staff, shop), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(staff.name)}.vcf"`,
    },
  });
}
