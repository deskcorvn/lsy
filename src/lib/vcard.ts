/**
 * vCard 4.0 (RFC 6350, UTF-8) — sinh server-side cho route /card/vcard.vcf.
 * Test tải vào danh bạ CẢ iOS lẫn Android trước khi nhận "xong" (luật design-ecard).
 * Tên VN trong Medusa: last_name + first_name ("Nguyễn" + "Mạnh Hùng") —
 * N: family=token đầu của full name; phần còn lại là given.
 */
export type VCardInput = {
  fullName: string;
  org?: string | null;
  title?: string | null;
  phone?: string | null;
  email?: string | null;
  url?: string | null;
  photoUrl?: string | null;
  address?: string | null;
  zaloUrl?: string | null;
};

// RFC 6350 §3.4: escape backslash, dấu phẩy, chấm phẩy, xuống dòng.
function esc(v: string): string {
  return v
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\r?\n/g, "\\n");
}

export function buildVCard(v: VCardInput): string {
  const name = v.fullName.trim();
  const [family, ...given] = name.split(/\s+/);
  const lines: string[] = [
    "BEGIN:VCARD",
    "VERSION:4.0",
    `FN:${esc(name)}`,
    `N:${esc(family ?? "")};${esc(given.join(" "))};;;`,
  ];
  if (v.org) lines.push(`ORG:${esc(v.org)}`);
  if (v.title) lines.push(`TITLE:${esc(v.title)}`);
  if (v.phone) lines.push(`TEL;TYPE=cell,voice;VALUE=uri:tel:${v.phone.replace(/[^0-9+]/g, "")}`);
  if (v.email) lines.push(`EMAIL:${esc(v.email)}`);
  if (v.url) lines.push(`URL:${esc(v.url)}`);
  if (v.photoUrl) lines.push(`PHOTO;VALUE=uri:${v.photoUrl}`);
  if (v.address) lines.push(`ADR;TYPE=work:;;${esc(v.address)};;;;`);
  // Zalo: không có IMPP scheme chuẩn — dùng URL kèm nhãn (X-ABLabel được iOS đọc).
  if (v.zaloUrl) {
    lines.push(`item1.URL:${esc(v.zaloUrl)}`);
    lines.push("item1.X-ABLabel:Zalo");
  }
  lines.push(`REV:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`);
  lines.push("END:VCARD");
  return lines.join("\r\n") + "\r\n"; // RFC: CRLF
}
