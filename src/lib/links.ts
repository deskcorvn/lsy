/**
 * Deep-link bản địa — WRAP MỘT CHỖ (luật design-ecard): zalo.me/{sđt} là CONVENTION
 * không phải API chính thức; Zalo đổi thì sửa đúng file này, mọi nơi khác không đau.
 */

export function zaloLink(phone: string): string {
  // zalo.me nhận số bỏ số 0 đầu hoặc giữ — giữ nguyên dạng người dùng nhập, bỏ khoảng trắng.
  return `https://zalo.me/${phone.replace(/[^0-9+]/g, "")}`;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

export function mailLink(email: string): string {
  return `mailto:${email}`;
}

// Địa chỉ Medusa shop.metadata.address (đơn vị hành chính VN) -> chuỗi + link chỉ đường.
export type VnAddress = {
  address_detail?: string;
  ward?: string;
  district?: string;
  province?: string;
  location_link?: string;
};

export function formatVnAddress(a?: VnAddress | null): string {
  if (!a) return "";
  return [a.address_detail, a.ward, a.district, a.province]
    .filter(Boolean)
    .join(", ");
}

export function mapsLink(a?: VnAddress | null): string | null {
  if (!a) return null;
  if (a.location_link) return a.location_link; // chủ shop tự dán link Google Maps
  const q = formatVnAddress(a);
  return q ? `https://maps.google.com/?q=${encodeURIComponent(q)}` : null;
}

// Ảnh VietQR theo chuẩn img.vietqr.io (không cần API key cho ảnh tĩnh).
export function vietqrImage(v: {
  bankBin: string;
  accountNo: string;
  accountName: string;
}): string {
  return `https://img.vietqr.io/image/${v.bankBin}-${v.accountNo}-compact2.png?accountName=${encodeURIComponent(v.accountName)}`;
}
