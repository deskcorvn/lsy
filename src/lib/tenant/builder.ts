import { z } from "zod";
import { VIBES } from "@/design/profile";
import { TenantSchema, type SiteModel } from "./types";

/**
 * "Form → site": input tối thiểu của khách → SiteModel đầy đủ.
 * Field nào không nhập → sinh mặc định hợp lệ (luôn pass TenantSchema). Đây là "phép màu" của builder.
 */
const HEX = /^#[0-9a-fA-F]{6}$/;

export const BuilderInputSchema = z.object({
  brandName: z.string().min(2),
  description: z.string().min(20),
  domain: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  locality: z.string().optional(),
  vibe: z.enum(VIBES).default("swiss"),
  primary: z.string().regex(HEX).optional(),
  accent: z.string().regex(HEX).optional(),
  heroHeading: z.string().optional(),
  heroSubheading: z.string().optional(),
  values: z
    .array(z.object({ title: z.string().min(2), description: z.string().min(20) }))
    .max(4)
    .optional(),
  about: z.string().optional(),
  faqs: z
    .array(z.object({ question: z.string().min(10), answer: z.string().min(30).max(500) }))
    .max(6)
    .optional(),
});

export type BuilderInput = z.infer<typeof BuilderInputSchema>;

export function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildSiteFromBrief(input: BuilderInput): SiteModel {
  const slug = slugify(input.domain ?? input.brandName);
  const name = input.brandName.trim();

  const values =
    input.values && input.values.length > 0
      ? input.values
      : [
          { title: "Chất lượng", description: `${name} cam kết chất lượng ổn định trong từng sản phẩm và dịch vụ.` },
          { title: "Tận tâm", description: `Đội ngũ ${name} luôn lắng nghe và phục vụ khách hàng tận tình, chu đáo.` },
          { title: "Uy tín", description: `${name} xây dựng niềm tin bằng sự minh bạch và cam kết rõ ràng với khách.` },
        ];

  const faqs =
    input.faqs && input.faqs.length > 0
      ? input.faqs
      : [
          {
            question: `${name} cung cấp những gì?`,
            answer: `${name} cung cấp các sản phẩm và dịch vụ như mô tả ở trên. Liên hệ với chúng tôi để được tư vấn chi tiết và báo giá phù hợp.`,
          },
          {
            question: `Làm sao để liên hệ ${name}?`,
            answer: `Bạn để lại thông tin qua form liên hệ ở cuối trang hoặc gọi trực tiếp; chúng tôi sẽ phản hồi trong thời gian sớm nhất.`,
          },
        ];

  const site: z.input<typeof TenantSchema> = {
    slug,
    brand: {
      name,
      description: input.description.trim(),
      domain: input.domain ?? `${slug}.giftysites.vn`,
      ...(input.phone ? { phone: input.phone } : {}),
      ...(input.email ? { email: input.email } : {}),
      ...(input.locality ? { locality: input.locality } : {}),
    },
    branding: {
      vibe: input.vibe,
      primary: input.primary ?? "#1e5f86",
      accent: input.accent ?? "#e08a2b",
    },
    content: {
      page: {
        title: `${name}${input.locality ? ` — ${input.locality}` : ""}`,
        description: input.description.trim(),
      },
      sections: [
        {
          id: "hero",
          type: "hero",
          heading: input.heroHeading?.trim() || name,
          subheading: input.heroSubheading?.trim() || input.description.trim(),
          highlights: values.slice(0, 3).map((v) => v.title),
          primaryCta: { label: "Liên hệ", href: "#lien-he" },
          secondaryCta: { label: "Tìm hiểu", href: "#gia-tri" },
        },
        {
          id: "gia-tri",
          type: "valueHighlights",
          heading: `Vì sao chọn ${name}`,
          columns: 3,
          items: values.map((v) => ({ title: v.title, description: v.description })),
        },
        {
          id: "gioi-thieu",
          type: "about",
          heading: `Về ${name}`,
          body: [
            input.about?.trim() || input.description.trim(),
            `Liên hệ ${name} để được tư vấn và hỗ trợ nhanh nhất cho nhu cầu của bạn.`,
          ],
        },
        {
          id: "faq",
          type: "faq",
          heading: "Câu hỏi thường gặp",
          items: faqs,
        },
        {
          id: "cta",
          type: "cta",
          heading: `Liên hệ ${name} ngay hôm nay`,
          body: "Để lại thông tin, chúng tôi sẽ phản hồi sớm.",
          primaryCta: { label: "Liên hệ ngay", href: "#lien-he" },
        },
        {
          id: "lien-he",
          type: "contactForm",
          heading: `Liên hệ ${name}`,
          note: "Để lại thông tin, chúng tôi sẽ liên hệ lại với bạn.",
        },
      ],
    },
  };

  // Lan can cuối: nếu default nào lỡ sai schema → throw ngay (không tạo site rác).
  return TenantSchema.parse(site);
}
