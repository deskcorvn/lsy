/**
 * Data layer Medusa (BE-GiftyID) — LẦN ĐẦU chassis nói chuyện với Medusa.
 * - Env đọc LƯỜI (không import src/env.ts vốn parse háo hức cả REVALIDATE_SECRET):
 *   tenant không bật eCard thì build không cần MEDUSA_*.
 * - Chỉ Store API đọc-only với publishable key (header x-publishable-api-key).
 * - ISR: cache theo tag để /api/revalidate bắn revalidateTag khi BE đổi dữ liệu (P2).
 * - Lỗi mạng/BE sập -> trả null, KHÔNG ném: trang card phải sống bằng bản cache.
 */

export type MedusaShop = {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  description?: string | null;
  business_type?: string | null;
  tax_code?: string | null;
  avatar_url?: string | null;
  cover_url?: string | null;
  is_active?: boolean;
  types?: string[];
  metadata?: {
    address?: {
      address_detail?: string;
      ward?: string;
      district?: string;
      province?: string;
      location_link?: string;
    };
    zalo?: string;
    owner_name?: string;
    owner_title?: string;
    social?: Record<string, string>;
    [k: string]: unknown;
  } | null;
};

export type MedusaStaff = {
  id: string;
  name: string;
  specialty?: string | null;
  phone?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  shop_id?: string | null;
  slug?: string | null;
  metadata?: Record<string, unknown> | null;
};

function medusaEnv(): { url: string; key: string } {
  const url = process.env.MEDUSA_URL;
  const key = process.env.MEDUSA_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "eCard cần MEDUSA_URL + MEDUSA_PUBLISHABLE_KEY trong env (xem .env.example)",
    );
  }
  return { url: url.replace(/\/$/, ""), key };
}

async function medusaGet<T>(path: string, tag: string): Promise<T | null> {
  const { url, key } = medusaEnv();
  try {
    const res = await fetch(`${url}${path}`, {
      headers: { "x-publishable-api-key": key },
      // ISR: cache 5 phút + tag để revalidate theo sự kiện (webhook P2).
      next: { revalidate: 300, tags: [tag] },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null; // BE sập -> card serve bản cache/null, không vỡ trang
  }
}

export async function getShop(shopId: string): Promise<MedusaShop | null> {
  const data = await medusaGet<{ shop?: MedusaShop } | MedusaShop>(
    `/store/shops/${shopId}`,
    `ecard-shop-${shopId}`,
  );
  if (!data) return null;
  // Route BE-GiftyID trả { shop: {...} }; phòng cả dạng trả thẳng object.
  return (data as { shop?: MedusaShop }).shop ?? (data as MedusaShop);
}

export async function getStaffList(shopId: string): Promise<MedusaStaff[]> {
  const data = await medusaGet<{ staff?: MedusaStaff[] } | MedusaStaff[]>(
    `/store/staff?shop_id=${encodeURIComponent(shopId)}&limit=100`,
    `ecard-staff-${shopId}`,
  );
  if (!data) return [];
  return Array.isArray(data) ? data : (data.staff ?? []);
}

// Tìm staff theo slug (cột slug — migration P2) với fallback id (URL /card/{id} vẫn chạy).
export async function getStaffBySlug(
  shopId: string,
  slug: string,
): Promise<MedusaStaff | null> {
  const list = await getStaffList(shopId);
  return (
    list.find((s) => s.slug === slug) ??
    list.find((s) => s.id === slug) ??
    null
  );
}
