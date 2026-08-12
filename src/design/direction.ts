import { VIBES, type Vibe } from "./profile";

/**
 * AI Design Direction — "hợp đồng" (contract) cho việc chọn vibe từ brand brief.
 * Nguồn methodology: skill frontend-design ("lean unexpected") + agent ux-architect (archetype→ngành).
 * LLM chỉ ĐỀ XUẤT trong whitelist; coerceVibe là VALIDATOR cuối (sai → fallback an toàn).
 */
export const VIBE_GUIDE: Record<Vibe, string> = {
  swiss: "sạch · lưới · sans — tài chính, luật, tư vấn, B2B chuyên nghiệp, cao cấp tối giản",
  industrial: "mono · tối · phẳng — công nghệ, dev-tools, kỹ thuật, hạ tầng, crypto",
  organic: "ấm · serif · bo tròn — y tế, chăm sóc, F&B, giáo dục, bền vững, thủ công",
  aurora: "gradient · glow · display lớn — startup, SaaS, AI, sáng tạo, hiện đại",
  retro: "neon · scanline · bold — game, giải trí, âm nhạc, gen-Z, sự kiện bùng nổ",
  nocturne:
    "trời đêm · tĩnh · matte · artwork-first — label âm nhạc thư giãn/sleep, spa, thiền, wellness ban đêm",
};

/** Ép input về một Vibe hợp lệ; không nhận diện được → "swiss" (an toàn nhất). */
export function coerceVibe(input: string): Vibe {
  const s = (input || "").trim().toLowerCase();
  return (VIBES as readonly string[]).includes(s) ? (s as Vibe) : "swiss";
}
