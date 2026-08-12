/**
 * Design Persona ("vibe") — LỚP CÁ-TÍNH-HÓA cho site factory.
 * Nguồn token: skill `frontend-design` (8 "anchor"). P1 dùng 5 anchor hợp doanh nghiệp.
 * Mỗi vibe = bộ token nhất quán (font · surface/ink · shape · shadow) → đổi 1 dòng
 * `theme.vibe` là khác hẳn diện mạo, KHÔNG sửa src/. Accent vẫn lấy từ client.config
 * (--brand-primary) để giữ MÀU THƯƠNG HIỆU của khách bên trong cấu trúc anchor.
 *
 * Ràng buộc: font nạp qua <link> (KHÔNG next/font/google — offline build fail).
 * Guardrail (test design-profile): ink/surface phải đạt contrast AA ≥ 4.5 (luật impeccable A11y).
 */
export const VIBES = [
  "swiss",
  "industrial",
  "organic",
  "aurora",
  "retro",
  "nocturne",
] as const;
export type Vibe = (typeof VIBES)[number];

export type BrandProfile = {
  label: string;
  fontDisplay: string;
  fontBody: string;
  fontScript?: string; // font chữ ký (tùy chọn) — hero.scriptAccent/wordmark, quota 2 chỗ/trang
  googleFonts: string; // href cho <link> nạp font
  surface: string; // nền section (dùng cho contrast + fallback)
  surfaceAlt: string; // nền section xen kẽ
  surfaceImage?: string; // nền gradient/texture (tùy chọn, cho Hero)
  card: string; // nền card
  ink: string; // màu chữ chính
  muted: string;
  line: string;
  radius: string;
  shadow: string;
  mode: "light" | "dark";
};

const G = "https://fonts.googleapis.com/css2?";

export const PROFILES: Record<Vibe, BrandProfile> = {
  // 1. Swiss — sạch · lưới · sans đơn họ (frontend-design §3.1)
  swiss: {
    label: "Swiss — sạch · lưới · doanh nghiệp",
    fontDisplay: '"Inter", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
    googleFonts: G + "family=Inter:wght@400;500;600;700;800&display=swap",
    surface: "#ffffff",
    surfaceAlt: "#f7f7f8",
    card: "#ffffff",
    ink: "#111111",
    muted: "#5b5b5b",
    line: "#e5e5e5",
    radius: "2px",
    shadow: "0 1px 0 #e5e5e5",
    mode: "light",
  },
  // 2. Industrial — mono · tối · phẳng · viền 1px (§3.2)
  industrial: {
    label: "Industrial — mono · tối · tech",
    fontDisplay: '"IBM Plex Mono", ui-monospace, monospace',
    fontBody: '"IBM Plex Mono", ui-monospace, monospace',
    googleFonts: G + "family=IBM+Plex+Mono:wght@400;500;600;700&display=swap",
    surface: "#0b0c0a",
    surfaceAlt: "#101109",
    card: "#15160f",
    ink: "#e8e8e6",
    muted: "#9a9a96",
    line: "#2a2b27",
    radius: "0px",
    shadow: "none",
    mode: "dark",
  },
  // 3. Organic — đất ấm · serif Fraunces · bo tròn (§3.7)
  organic: {
    label: "Organic — ấm · serif · chăm sóc",
    fontDisplay: '"Fraunces", Georgia, serif',
    fontBody: '"Nunito Sans", system-ui, sans-serif',
    googleFonts:
      G + "family=Fraunces:opsz,wght@9..144,400..700&family=Nunito+Sans:wght@400;600;700&display=swap",
    surface: "#e8dcc7",
    surfaceAlt: "#ddcfb4",
    card: "#fff8ec",
    ink: "#33281d",
    muted: "#73624e",
    line: "#d6c5a7",
    radius: "22px",
    shadow: "0 12px 34px rgba(60,40,25,.14)",
    mode: "light",
  },
  // 4. Aurora — gradient tối · display lớn · glow (§3.4)
  aurora: {
    label: "Aurora — gradient · glow · startup",
    fontDisplay: '"Sora", system-ui, sans-serif',
    fontBody: '"Inter", system-ui, sans-serif',
    googleFonts: G + "family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap",
    surface: "#160d2e",
    surfaceAlt: "#1a1140",
    surfaceImage:
      "radial-gradient(60% 60% at 18% 8%, #5d34d0 0%, transparent 60%), radial-gradient(50% 50% at 92% 18%, #ff006e 0%, transparent 55%), linear-gradient(160deg, #1d1140, #0d0820)",
    card: "rgba(255,255,255,.06)",
    ink: "#f3f0ff",
    muted: "#c9c0ee",
    line: "rgba(255,255,255,.14)",
    radius: "16px",
    shadow: "0 0 44px rgba(168,85,247,.4)",
    mode: "dark",
  },
  // 6. Nocturne — trời đêm · tĩnh · matte (label âm nhạc / calm brand).
  //    Khác biệt cốt lõi với aurora: KHÔNG glow — shadow không màu, gradient chỉ nằm
  //    ở "bầu trời" nền (surfaceImage), không bọc quanh card. UI chrome trung tính
  //    nhường màu cho artwork (bài học lofigirl.com).
  nocturne: {
    label: "Nocturne — trời đêm · tĩnh · artwork-first",
    fontDisplay: '"Marcellus", Georgia, serif',
    fontBody: '"Figtree", system-ui, sans-serif',
    fontScript: '"Dancing Script", cursive',
    googleFonts:
      G +
      "family=Marcellus&family=Figtree:wght@400;500;600&family=Dancing+Script:wght@500;600&display=swap",
    surface: "#0F0C24", // indigo đêm — KHÔNG đen tuyền
    surfaceAlt: "#161233",
    surfaceImage:
      "radial-gradient(70% 55% at 50% 0%, #2B1C5F 0%, transparent 62%), radial-gradient(42% 38% at 82% 96%, rgba(170,54,124,.30) 0%, transparent 65%), linear-gradient(180deg, #151034, #0F0C24)",
    card: "rgba(244,241,255,.05)",
    ink: "#F2EFFB",
    muted: "#A9A3C9",
    line: "rgba(242,239,251,.13)",
    radius: "14px",
    shadow: "0 18px 50px rgba(8,5,32,.55)", // bóng sâu KHÔNG MÀU — tuyệt đối không glow
    mode: "dark",
  },
  // 5. Retro-Futuristic — đen · neon · mono kỳ (§3.6)
  retro: {
    label: "Retro-Futuristic — neon · scanline · bold",
    fontDisplay: '"Orbitron", ui-monospace, monospace',
    fontBody: '"Space Mono", ui-monospace, monospace',
    googleFonts: G + "family=Orbitron:wght@600;700;800&family=Space+Mono:wght@400;700&display=swap",
    surface: "#0a0014",
    surfaceAlt: "#0f0020",
    card: "rgba(227,224,255,.05)",
    ink: "#e3e0ff",
    muted: "#9b97cf",
    line: "rgba(227,224,255,.2)",
    radius: "4px",
    shadow: "0 0 0 1px rgba(227,224,255,.25)",
    mode: "dark",
  },
};

export function resolveProfile(vibe: Vibe): BrandProfile {
  return PROFILES[vibe];
}

export function profileVars(p: BrandProfile): Record<string, string> {
  const vars: Record<string, string> = {
    "--font-display": p.fontDisplay,
    "--font-body": p.fontBody,
    "--p-surface": p.surface,
    "--p-surface-alt": p.surfaceAlt,
    "--p-card": p.card,
    "--p-ink": p.ink,
    "--p-muted": p.muted,
    "--p-line": p.line,
    "--p-radius": p.radius,
    "--p-shadow": p.shadow,
  };
  if (p.surfaceImage) vars["--p-surface-image"] = p.surfaceImage;
  if (p.fontScript) vars["--font-script"] = p.fontScript;
  return vars;
}
