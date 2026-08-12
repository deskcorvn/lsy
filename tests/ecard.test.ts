import { describe, it, expect } from "vitest";
import { ClientConfigSchema } from "@config";
import { buildVCard } from "@/lib/vcard";
import { zaloLink, formatVnAddress, mapsLink, vietqrImage } from "@/lib/links";
import { SectionSchema } from "@/content/schema";

const base = {
  brand: {
    name: "X",
    legalName: "X",
    shortName: "X",
    description: "Mô tả đủ dài cho SEO hai mươi ký tự.",
    domain: "x.vn",
    logo: "/logo.svg",
  },
  theme: { primary: "#111111", accent: "#222222" },
  contact: { email: "a@x.vn" },
};

describe("ecard config", () => {
  it("mặc định tắt; enabled cần shopId", () => {
    const parsed = ClientConfigSchema.parse(base);
    expect(parsed.ecard.enabled).toBe(false);
    expect(() =>
      ClientConfigSchema.parse({ ...base, ecard: { enabled: true } }),
    ).toThrow();
    expect(() =>
      ClientConfigSchema.parse({
        ...base,
        ecard: { enabled: true, shopId: "shop_01K6MN", standalone: true },
      }),
    ).not.toThrow();
  });
});

describe("vCard 4.0 (RFC 6350)", () => {
  const card = buildVCard({
    fullName: "Nguyễn Mạnh Hùng",
    org: "Gian hàng Gifty Tech",
    title: "Founder / CEO",
    phone: "0913 332 282",
    email: "hotro.giftytech@gmail.com",
    url: "https://card.giftytech.com/card",
    zaloUrl: "https://zalo.me/0913332282",
    address: "1 Ngõ 13 Hoàng Diệu, P. Cẩm Thượng, TP. Hải Dương",
  });
  it("đúng khung + CRLF + version 4.0", () => {
    expect(card.startsWith("BEGIN:VCARD\r\nVERSION:4.0")).toBe(true);
    expect(card.endsWith("END:VCARD\r\n")).toBe(true);
  });
  it("tên VN: N family=token đầu, given=phần còn lại", () => {
    expect(card).toContain("N:Nguyễn;Mạnh Hùng;;;");
    expect(card).toContain("FN:Nguyễn Mạnh Hùng");
  });
  it("TEL chuẩn uri không khoảng trắng + Zalo có nhãn", () => {
    expect(card).toContain("TEL;TYPE=cell,voice;VALUE=uri:tel:0913332282");
    expect(card).toContain("item1.X-ABLabel:Zalo");
  });
  it("escape dấu phẩy trong ADR", () => {
    expect(card).toContain("ADR;TYPE=work:;;1 Ngõ 13 Hoàng Diệu\\, P. Cẩm Thượng\\, TP. Hải Dương;;;;");
  });
});

describe("links bản địa", () => {
  it("zalo.me bỏ ký tự thừa", () => {
    expect(zaloLink("0913 332 282")).toBe("https://zalo.me/0913332282");
  });
  it("địa chỉ VN từ metadata + fallback Google Maps khi location_link trống", () => {
    const a = {
      address_detail: "1 Ngõ 13 Hoàng Diệu",
      ward: "P. Cẩm Thượng",
      district: "TP. Hải Dương",
      province: "Tỉnh Hải Dương",
      location_link: "",
    };
    expect(formatVnAddress(a)).toBe(
      "1 Ngõ 13 Hoàng Diệu, P. Cẩm Thượng, TP. Hải Dương, Tỉnh Hải Dương",
    );
    expect(mapsLink(a)).toContain("https://maps.google.com/?q=");
    expect(mapsLink({ ...a, location_link: "https://maps.app.goo.gl/x" })).toBe(
      "https://maps.app.goo.gl/x",
    );
  });
  it("vietqr image đúng chuẩn img.vietqr.io", () => {
    expect(
      vietqrImage({ bankBin: "970436", accountNo: "12345678", accountName: "GIFTY TECH" }),
    ).toBe(
      "https://img.vietqr.io/image/970436-12345678-compact2.png?accountName=GIFTY%20TECH",
    );
  });
});

describe("section eCard trong registry", () => {
  it("profileHeader/contactBar/socialLinks/qrPanel parse được", () => {
    expect(() =>
      SectionSchema.parse({
        id: "h",
        type: "profileHeader",
        name: "Gian hàng Gifty Tech",
        avatar: "https://api.giftyid.vn/static/logo.webp",
      }),
    ).not.toThrow();
    expect(() =>
      SectionSchema.parse({
        id: "c",
        type: "contactBar",
        items: [
          { kind: "tel", label: "Gọi điện", href: "tel:0913332282" },
          { kind: "vcard", label: "Lưu danh bạ", href: "/card/vcard.vcf" },
        ],
      }),
    ).not.toThrow();
    expect(() =>
      SectionSchema.parse({ id: "q", type: "qrPanel", svg: "<svg/>" }),
    ).not.toThrow();
  });
});
