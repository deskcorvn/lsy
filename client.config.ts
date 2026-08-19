import { z } from "zod";
import { VIBES } from "@/design/profile";

/**
 * NGUỒN-SỰ-THẬT DUY NHẤT cho mỗi website khách.
 * Nhân bản site = sửa đúng file này. Sai/thiếu field → build FAIL ngay (Zod),
 * không để lọt ra production. (Guardrail #1)
 */

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
// domain: bỏ scheme, bỏ dấu chấm cuối, có ít nhất 1 dấu chấm (vd "brandx.vn")
const DOMAIN = /^(?!-)[a-z0-9-]+(\.[a-z0-9-]+)+$/;

export const ClientConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    shortName: z.string().min(1),
    description: z.string().min(20, "description nên ≥ 20 ký tự cho SEO"),
    domain: z
      .string()
      .regex(DOMAIN, "domain không hợp lệ (bỏ http://, bỏ dấu chấm cuối)"),
    logo: z
      .string()
      .startsWith("/", "logo là đường dẫn trong /public, bắt đầu bằng /"),
    ogImage: z
      .string()
      .startsWith("/", "ogImage là đường dẫn trong /public, bắt đầu bằng /")
      .default("/og.png"),
    locale: z.string().default("vi-VN"),
    lang: z.string().default("vi"),
    // SEO/Organization (tùy chọn) — dùng cho JSON-LD Organization + llms-full.
    taxId: z.string().optional(),
    foundingDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "foundingDate dạng ISO YYYY-MM-DD")
      .optional(),
    legalEntityType: z.string().optional(),
  }),
  theme: z.object({
    primary: z.string().regex(HEX_COLOR, "màu primary phải dạng #RRGGBB"),
    accent: z.string().regex(HEX_COLOR, "màu accent phải dạng #RRGGBB"),
    // Design persona — đổi "diện mạo" (font/surface/shape) mà không sửa src/. Nguồn: skill frontend-design.
    vibe: z.enum(VIBES).default("swiss"),
  }),
  contact: z.object({
    // phone/address TÙY CHỌN: tenant quốc tế/online-only có thể chỉ có email —
    // KHÔNG điền số/địa chỉ giả cho qua schema (luật no-placeholder).
    phone: z.string().min(8).optional(),
    phoneDisplay: z.string().min(8).optional(),
    email: z.string().email(),
    // SXO: chat nhanh (tùy chọn) — chỉ điền số, dùng dựng link zalo.me / wa.me.
    zalo: z.string().optional(),
    whatsapp: z.string().optional(),
    address: z
      .object({
        street: z.string().min(1),
        locality: z.string().min(1),
        region: z.string().optional(),
        country: z.string().default("VN"),
      })
      .optional(),
  }),
  social: z.array(z.string().url()).default([]),
  nav: z
    .array(z.object({ label: z.string().min(1), href: z.string().min(1) }))
    .default([]),
  // Nút CTA nổi bật bên phải header (vd "Submit Your Music") — tách khỏi nav thường.
  navCta: z
    .object({ label: z.string().min(1), href: z.string().min(1) })
    .optional(),
  // Footer: link phụ (legal /terms /privacy, social nổi bật…) — có link -> render Footer.
  footerLinks: z
    .array(z.object({ label: z.string().min(1), href: z.string().min(1) }))
    .default([]),
  catalog: z
    .object({
      productCategoryHandles: z.array(z.string()).default([]),
      serviceCategoryHandles: z.array(z.string()).default([]),
    })
    .default({ productCategoryHandles: [], serviceCategoryHandles: [] }),
  // GEO: tín hiệu thực thể cho AI — mention bên thứ 3 + LocalBusiness địa lý (tùy chọn).
  geo: z
    .object({
      mentions: z
        .array(z.object({ label: z.string().min(1), url: z.string().url() }))
        .default([]),
      localBusiness: z
        .object({
          areaServed: z.array(z.string()).default([]),
          priceRange: z.string().optional(),
          openingHours: z.array(z.string()).default([]), // vd "Mo-Fr 08:00-17:00"
        })
        .optional(),
    })
    .default({}),
  // eCard (danh thiếp điện tử): bật nhóm route /card đọc dữ liệu shop/staff từ Medusa
  // (BE-GiftyID). Medusa admin là "builder" — dữ liệu nhập ở đó; đây chỉ giữ trình bày.
  ecard: z
    .object({
      enabled: z.boolean().default(false),
      // ID shop trên Medusa (vd "shop_01K6MN..."); bắt buộc khi enabled.
      shopId: z.string().optional(),
      // standalone: khách CHỈ dùng eCard — route "/" render thẳng thẻ, ẩn nav website.
      standalone: z.boolean().default(false),
      // Ảnh share riêng cho eCard (OpenGraph/Twitter). Nếu không điền sẽ fallback cover/avatar từ Medusa.
      shareImage: z
        .string()
        .startsWith("/", "shareImage là đường dẫn trong /public, bắt đầu bằng /")
        .optional(),
      // VietQR chuyển khoản: MẶC ĐỊNH TẮT (số TK công khai = rủi ro mạo danh).
      // Bật sau khi xác minh chủ thẻ; cấu hình theo chuẩn img.vietqr.io.
      vietqr: z
        .object({
          bankBin: z.string().min(6), // mã BIN ngân hàng (vd 970436 Vietcombank)
          accountNo: z.string().min(4),
          accountName: z.string().min(1),
        })
        .optional(),
    })
    .refine((e) => !e.enabled || !!e.shopId, {
      message: "ecard.enabled cần kèm ecard.shopId",
    })
    .default({ enabled: false }),
  // SXO: đo chuyển đổi (GA4) — tùy chọn.
  sxo: z
    .object({
      gaMeasurementId: z
        .string()
        .regex(/^G-[A-Z0-9]+$/, "GA4 ID dạng G-XXXXXXX")
        .optional(),
    })
    .default({}),
});

export type ClientConfig = z.infer<typeof ClientConfigSchema>;

// Cấu hình thương hiệu LSY. Các trường pháp nhân được đối chiếu từ nguồn công khai
// và lưu vết tại CODEX_GEO_HANDOFF.md; email tên miền cần được provision khi deploy.
// === SITE_CONFIG_START (scripts/setup.mjs ghi vùng này; sửa tay cũng được) ===
const config = {
  brand: {
    name: "Máy lọc nước LSY",
    legalName: "CÔNG TY TNHH LSY",
    shortName: "LSY",
    description:
      "Máy lọc nước LSY và nền tảng hỗ trợ theo dõi, chăm sóc thiết bị cho gia đình.",
    // Vercel currently serves www.lsy.vn as the final host (lsy.vn -> 308 www).
    // Keep generated canonical, sitemap and JSON-LD on the non-redirecting host.
    domain: "www.lsy.vn",
    logo: "/logo.png",
    ogImage: "/og.png",
    taxId: "0801321580",
    foundingDate: "2020-04-21",
    legalEntityType: "Công ty trách nhiệm hữu hạn",
  },
  theme: { primary: "#079ACB", accent: "#B91C2B", vibe: "swiss" },
  contact: {
    phone: "0966817188",
    phoneDisplay: "0966 817 188",
    email: "info@lsy.vn",
    address: {
      street: "Đội 8, thôn An Điềm",
      locality: "Xã Cẩm Giang",
      region: "Thành phố Hải Phòng",
      country: "VN",
    },
  },
  social: ["https://www.facebook.com/198754154014260/"],
  nav: [
    { label: "Sản phẩm", href: "#san-pham" },
    { label: "Về LSY", href: "#gioi-thieu" },
    { label: "Câu hỏi", href: "#cau-hoi" },
  ],
  navCta: { label: "Nhận tư vấn", href: "#lien-he" },
  footerLinks: [
    { label: "Facebook", href: "https://www.facebook.com/198754154014260/" },
  ],
  geo: {
    mentions: [
      {
        label: "Hồ sơ sản phẩm Máy lọc nước LSY trên iCheck",
        url: "https://icheck.vn/san-pham/may-loc-nuoc-lsy-8938535347005",
      },
      {
        label: "Hồ sơ doanh nghiệp CÔNG TY TNHH LSY",
        url: "https://thuvienphapluat.vn/ma-so-thue/cong-ty-tnhh-lsy-mst-0801321580.html",
      },
    ],
  },
} satisfies z.input<typeof ClientConfigSchema>;
// === SITE_CONFIG_END ===

export const clientConfig: ClientConfig = ClientConfigSchema.parse(config);
export const siteUrl = `https://${clientConfig.brand.domain}`;

// Raw (chưa parse) — cho test bất biến config.invariant.test.ts.
export { config as rawConfig };
