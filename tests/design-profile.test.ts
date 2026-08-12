import { describe, it, expect } from "vitest";
import { VIBES, PROFILES, resolveProfile, profileVars } from "@/design/profile";

// WCAG contrast — hiện thực luật A11y của skill impeccable (text contrast ≥ 4.5:1).
function lum(hex: string): number {
  const h = hex.replace("#", "");
  const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const ch = [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(ch[0]) + 0.7152 * lin(ch[1]) + 0.0722 * lin(ch[2]);
}
function contrast(a: string, b: string): number {
  const ls = [lum(a), lum(b)].sort((x, y) => y - x);
  return (ls[0] + 0.05) / (ls[1] + 0.05);
}

describe("design persona (vibe)", () => {
  it("mọi vibe đều có profile", () => {
    for (const v of VIBES) expect(resolveProfile(v)).toBeTruthy();
  });
  it("ink/surface đạt contrast AA ≥ 4.5 (luật impeccable A11y)", () => {
    for (const v of VIBES) {
      expect(contrast(PROFILES[v].ink, PROFILES[v].surface), v).toBeGreaterThanOrEqual(4.5);
    }
  });
  it("profileVars trả đủ token cốt lõi", () => {
    const vars = profileVars(PROFILES.swiss);
    for (const k of ["--font-display", "--font-body", "--p-surface", "--p-ink", "--p-radius"]) {
      expect(vars[k]).toBeTruthy();
    }
  });
  it("font nạp qua Google Fonts <link> (không next/font/google)", () => {
    for (const v of VIBES) expect(PROFILES[v].googleFonts).toContain("fonts.googleapis.com");
  });
  it("nocturne: có --font-script, mode dark, shadow KHÔNG màu (không glow)", () => {
    const p = PROFILES.nocturne;
    expect(p.mode).toBe("dark");
    expect(profileVars(p)["--font-script"]).toContain("Dancing Script");
    // "matte, không glow": bóng chỉ dùng màu đêm gần-đen trong suốt, cấm tím/hồng rực.
    expect(p.shadow).toMatch(/rgba\(8,\s*5,\s*32/);
  });
  it("chữ trắng trên nút gradient đạt AA (2 đầu + midpoint #AA367C→#4A2FBD)", () => {
    // Guardrail cho pattern CTA gradient của tenant nhạc: trắng đọc được ở mọi điểm dừng.
    for (const stop of ["#AA367C", "#7A339C", "#4A2FBD"]) {
      expect(contrast("#ffffff", stop), stop).toBeGreaterThanOrEqual(4.5);
    }
  });
});
