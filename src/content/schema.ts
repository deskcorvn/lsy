import { z } from "zod";

/**
 * He SECTION config-driven. Nhan ban landing = sua content.config.ts (noi dung),
 * khong dung code. Sai/thieu field -> build FAIL (Zod). (Guardrail content)
 *
 * Bat bien: dung 1 section "hero" o index 0 (1 the <h1> duy nhat), id section unique.
 */

const CtaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});
export type Cta = z.infer<typeof CtaSchema>;

const SectionBase = z.object({ id: z.string().min(1) });

const Hero = SectionBase.extend({
  type: z.literal("hero"),
  heading: z.string().min(1),
  subheading: z.string().min(1),
  highlights: z.array(z.string().min(1)).default([]),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema.optional(),
  // Bố cục hero: centered (mặc định) | split (chữ trái + panel phải). Xem Hero.tsx.
  variant: z.enum(["centered", "split"]).default("centered"),
  // Artwork-first (pattern Lofi Girl): ảnh tenant trong /public làm nền full-bleed,
  // component tự phủ scrim theo mode của vibe để chữ đạt AA. KHÔNG nhét ảnh vào vibe token.
  backgroundImage: z
    .string()
    .startsWith("/", "backgroundImage là đường dẫn trong /public, bắt đầu bằng /")
    .optional(),
  // Dòng chứng thực hairline dưới CTA (vd "2.84M SUBSCRIBERS · 1B+ LISTENS · SINCE 2014").
  proofLine: z.string().optional(),
  // 1 từ script mờ sau headline (dùng --font-script nếu vibe có) — chữ ký, không phải nội dung.
  scriptAccent: z.string().optional(),
  // Gói trang trí cảnh (scene decor pack) phủ lên hero artwork — layer sống + 1 easter egg
  // âm thanh (delight, impeccable). Hiện có: "night-piano" (sao + đom đóm + piano chơi được).
  decor: z.enum(["night-piano"]).optional(),
});

const ValueHighlights = SectionBase.extend({
  type: z.literal("valueHighlights"),
  heading: z.string().optional(),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
  items: z
    .array(
      z.object({
        icon: z.string().optional(),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .min(1),
});

const About = SectionBase.extend({
  type: z.literal("about"),
  heading: z.string().min(1),
  body: z.array(z.string().min(1)).min(1), // moi phan tu = 1 doan <p>
  media: z.string().optional(),
});

const Leadership = SectionBase.extend({
  type: z.literal("leadership"),
  heading: z.string().optional(),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(4),
  people: z
    .array(
      z.object({
        name: z.string().min(1),
        role: z.string().min(1),
        bio: z.string().optional(),
        avatar: z.string().optional(),
      }),
    )
    .min(1),
});

const Events = SectionBase.extend({
  type: z.literal("events"),
  heading: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string().min(1),
        // ISO datetime co offset -> CHI khi co se phat Event JSON-LD.
        startDate: z.string().datetime({ offset: true }).optional(),
        // Free-text khi chua co ngay gio chuan (vd "Thu Tu hang tuan, 6:00").
        scheduleText: z.string().optional(),
        locationName: z.string().optional(),
        description: z.string().min(1),
      }),
    )
    .min(1),
});

const Testimonials = SectionBase.extend({
  type: z.literal("testimonials"),
  heading: z.string().optional(),
  items: z
    .array(
      z.object({
        quote: z.string().min(1),
        author: z.string().min(1),
        role: z.string().optional(),
      }),
    )
    .min(1),
});

const Faq = SectionBase.extend({
  type: z.literal("faq"),
  heading: z.string().optional(),
  items: z
    .array(
      z.object({
        // AEO: câu hỏi rõ ý, câu trả lời đủ-mà-gọn (30–500) để làm featured snippet.
        question: z.string().min(10, "câu hỏi FAQ nên ≥ 10 ký tự"),
        answer: z
          .string()
          .min(30, "câu trả lời FAQ nên ≥ 30 ký tự (đủ ý cho AEO)")
          .max(750, "câu trả lời FAQ nên ≤ 750 ký tự (ngắn gọn cho đoạn trích)"),
        // GEO: nguồn dẫn chứng cho câu trả lời (tùy chọn) -> tăng độ tin để AI trích.
        sourceUrl: z.string().url().optional(),
      }),
    )
    .min(1),
});

const CtaSection = SectionBase.extend({
  type: z.literal("cta"),
  heading: z.string().min(1),
  body: z.string().optional(),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema.optional(),
  // Pattern "promo trên artwork" (Lofi Girl): tranh cảnh full-bleed + headline + nút giữa tranh.
  backgroundImage: z
    .string()
    .startsWith("/", "backgroundImage là đường dẫn trong /public, bắt đầu bằng /")
    .optional(),
});

// Dải số liệu tin cậy (social proof dạng số: năm kinh nghiệm, khách hàng, quốc gia…).
const StatsBar = SectionBase.extend({
  type: z.literal("statsBar"),
  heading: z.string().optional(),
  items: z
    .array(
      z.object({
        value: z.string().min(1), // "2.84M" — string để giữ format
        label: z.string().min(1), // "YouTube subscribers"
        href: z.string().optional(), // link kiểm chứng (GEO: claim có nguồn)
      }),
    )
    .min(2)
    .max(6),
});

// Lưới card ảnh có link — catalog card grid dùng chung (sản phẩm/portfolio/đội ngũ/album…).
const MediaGrid = SectionBase.extend({
  type: z.literal("mediaGrid"),
  heading: z.string().optional(),
  description: z.string().optional(),
  columns: z
    .union([z.literal(2), z.literal(3), z.literal(4), z.literal(6)])
    .default(4),
  aspect: z.enum(["square", "portrait", "video"]).default("square"),
  // arch = khung vòm (chân dung); circle = tròn; rounded = bo góc theo vibe.
  shape: z.enum(["rounded", "circle", "arch"]).default("rounded"),
  // Chip lọc theo tag đầu tiên của item + hé lộ theo lô (reveal CSS/JS — DOM vẫn render đủ cho SEO).
  filterByTag: z.boolean().default(false),
  batchSize: z.number().int().positive().optional(),
  items: z
    .array(
      z.object({
        image: z.string().min(1), // path trong /public
        title: z.string().min(1),
        subtitle: z.string().optional(),
        href: z.string().optional(),
        badge: z.string().optional(),
        tags: z.array(z.string()).default([]),
      }),
    )
    .min(1),
  viewAll: CtaSchema.optional(),
});

// Tường media nhúng bên thứ ba — LUÔN render facade (0 iframe khi first load, click mới mount).
const EmbedWall = SectionBase.extend({
  type: z.literal("embedWall"),
  heading: z.string().optional(),
  columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(2),
  // grid = lưới facade; playerRail = 1 player lớn + rail thumbnail hoán đổi.
  variant: z.enum(["grid", "playerRail"]).default("grid"),
  items: z
    .array(
      z.object({
        provider: z.enum(["youtube", "spotify"]),
        kind: z.enum(["video", "playlist", "album", "artist", "track"]),
        embedId: z.string().min(1),
        title: z.string().min(1), // a11y + label facade
        thumbnail: z.string().optional(), // override; youtube tự lấy i.ytimg.com/hqdefault
      }),
    )
    .min(1)
    .max(12),
});

/* ---------- Nhóm section eCard (danh thiếp điện tử) — compose từ dữ liệu Medusa ---------- */

// Đầu thẻ: avatar + tên + chức danh. Chứa <h1> (preflight whitelist cùng Hero).
const ProfileHeader = SectionBase.extend({
  type: z.literal("profileHeader"),
  name: z.string().min(1),
  tagline: z.string().optional(), // chức danh / mô tả 1 dòng
  org: z.string().optional(), // tên shop/công ty (thẻ nhân viên)
  avatar: z.string().optional(), // URL Medusa hoặc /path — render <img> (host tuỳ tenant)
  cover: z.string().optional(),
});

// Thanh hành động: sticky bottom trên mobile (lý do tồn tại của eCard) — Gọi/Zalo/Lưu danh bạ/Chỉ đường.
const ContactBar = SectionBase.extend({
  type: z.literal("contactBar"),
  sticky: z.boolean().default(true),
  items: z
    .array(
      z.object({
        kind: z.enum(["tel", "zalo", "mail", "map", "vcard", "share", "link"]),
        label: z.string().min(1),
        href: z.string().min(1),
      }),
    )
    .min(1)
    .max(5),
});

// Lưới link mạng xã hội / nền tảng.
const SocialLinks = SectionBase.extend({
  type: z.literal("socialLinks"),
  heading: z.string().optional(),
  links: z
    .array(z.object({ label: z.string().min(1), href: z.string().min(1) }))
    .min(1),
});

// Khung QR: svg (QR sinh server-side bằng lib/qr.ts) HOẶC imageUrl (vd VietQR png).
// Lưu ý: KHÔNG .refine() ở đây (ZodEffects bị cấm trong discriminatedUnion) —
// cần đúng 1 trong svg/imageUrl; component render null nếu thiếu cả hai.
const QrPanel = SectionBase.extend({
  type: z.literal("qrPanel"),
  heading: z.string().optional(),
  caption: z.string().optional(),
  svg: z.string().optional(),
  imageUrl: z.string().optional(),
});

// Dải logo đối tác/nền tảng/chứng nhận.
const LogoMarquee = SectionBase.extend({
  type: z.literal("logoMarquee"),
  heading: z.string().optional(),
  animated: z.boolean().default(false), // marquee CSS; tôn trọng prefers-reduced-motion
  items: z
    .array(
      z.object({
        name: z.string().min(1), // alt text bắt buộc
        image: z.string().min(1),
        href: z.string().optional(),
      }),
    )
    .min(3),
});

const Contact = SectionBase.extend({
  type: z.literal("contact"),
  heading: z.string().min(1),
  note: z.string().optional(),
  showMap: z.boolean().default(false),
});

// SXO: form liên hệ tương tác (POST /api/contact) — biến khách thành lead.
// fields tùy biến theo tenant (mặc định giữ layout VN cũ: name+phone bắt buộc, email tùy chọn).
// Server yêu cầu: name + message + ít nhất một trong email|phone — superRefine gác cấu hình.
const ContactFormField = z.object({
  name: z.enum(["name", "phone", "email", "company", "musicLink"]),
  label: z.string().min(1),
  required: z.boolean().default(false),
  type: z.enum(["text", "tel", "email", "url"]).default("text"),
});
const ContactForm = SectionBase.extend({
  type: z.literal("contactForm"),
  heading: z.string().min(1),
  note: z.string().optional(),
  submitLabel: z.string().default("Gửi liên hệ"),
  successMessage: z
    .string()
    .default("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất."),
  fields: z
    .array(ContactFormField)
    .min(1)
    .default([
      { name: "name", label: "Họ và tên *", required: true, type: "text" },
      { name: "phone", label: "Số điện thoại *", required: true, type: "tel" },
      { name: "email", label: "Email", required: false, type: "email" },
    ]),
  messageLabel: z.string().default("Nội dung *"),
  errorMessage: z.string().default("Có lỗi, vui lòng thử lại."),
  errorRateLimited: z
    .string()
    .default("Quá nhiều yêu cầu, vui lòng thử lại sau ít phút."),
});

export const SectionSchema = z.discriminatedUnion("type", [
  Hero,
  ValueHighlights,
  About,
  Leadership,
  Events,
  Testimonials,
  Faq,
  CtaSection,
  Contact,
  ContactForm,
  StatsBar,
  MediaGrid,
  EmbedWall,
  LogoMarquee,
  ProfileHeader,
  ContactBar,
  SocialLinks,
  QrPanel,
]);

// Bất biến dùng chung cho 1 danh sách section (trang chủ + content page).
function refineSections(
  sections: z.infer<typeof SectionSchema>[],
  ctx: z.RefinementCtx,
  label: string,
) {
  const heroIdx = sections
    .map((s, i) => (s.type === "hero" ? i : -1))
    .filter((i) => i >= 0);
  if (heroIdx.length !== 1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${label}: phải có đúng 1 section 'hero'`,
      path: ["sections"],
    });
  } else if (heroIdx[0] !== 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${label}: section 'hero' phải nằm đầu tiên (giữ đúng 1 <h1>)`,
      path: ["sections"],
    });
  }
  const ids = sections.map((s) => s.id);
  const dup = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  if (dup.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${label}: id section bị trùng: ${dup.join(", ")}`,
      path: ["sections"],
    });
  }
}

// Content page phụ (/{slug}) — cùng hệ section với trang chủ, render qua route [collection].
const ContentPageSchema = z
  .object({
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, "slug page chỉ gồm a-z, 0-9 và dấu gạch ngang"),
    title: z.string().min(1),
    description: z.string().min(20, "description dùng cho meta, nên ≥ 20 ký tự"),
    datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    dateModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    sections: z.array(SectionSchema).min(1),
  })
  .superRefine((data, ctx) => refineSections(data.sections, ctx, `page "${data.slug}"`));
export type ContentPage = z.infer<typeof ContentPageSchema>;

export const ContentConfigSchema = z
  .object({
    page: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
        // AEO/SEO: ngày xuất bản & cập nhật (ISO YYYY-MM-DD) -> WebPage datePublished/dateModified.
        datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        dateModified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      })
      .default({}),
    sections: z.array(SectionSchema).min(1),
    // Trang nội dung phụ (vd /distribution, /terms) — slug không được trùng collection.
    pages: z.array(ContentPageSchema).default([]),
  })
  .superRefine((data, ctx) => {
    // contactForm phải khớp yêu cầu server: có field name + (email | phone) — mọi trang.
    const allSections = [...data.sections, ...data.pages.flatMap((p) => p.sections)];
    for (const s of allSections) {
      if (s.type !== "contactForm") continue;
      const names = s.fields.map((f) => f.name);
      if (!names.includes("name") || !(names.includes("email") || names.includes("phone"))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `contactForm "${s.id}": fields phải gồm "name" và ít nhất một trong "email"/"phone" (server /api/contact yêu cầu)`,
          path: ["sections"],
        });
      }
    }
    refineSections(data.sections, ctx, "trang chủ");
    const slugs = data.pages.map((p) => p.slug);
    const dupSlugs = [...new Set(slugs.filter((s, i) => slugs.indexOf(s) !== i))];
    if (dupSlugs.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `slug page bị trùng: ${dupSlugs.join(", ")}`,
        path: ["pages"],
      });
    }
  });

export type ContentConfig = z.infer<typeof ContentConfigSchema>;
export type AnySection = z.infer<typeof SectionSchema>;
export type SectionType = AnySection["type"];
export type SectionOf<T extends SectionType> = Extract<AnySection, { type: T }>;
