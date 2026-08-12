---
name: design-system
description: Hệ vibe/token của chassis — chọn vibe, chỉnh màu thương hiệu, thêm vibe mới, cổng contrast AA. Dùng khi làm bất kỳ việc gì liên quan giao diện/màu/font/persona của site này.
---

# Hệ design (vibe · token · contrast)

Site này KHÔNG style tự do. Mọi diện mạo đi qua 2 tầng, sửa đúng chỗ:

1. **`client.config.ts` → `theme`** — của TENANT: `primary` + `accent` (#RRGGBB) + `vibe`.
2. **`src/design/profile.ts`** — của CHASSIS: 6 vibe, mỗi vibe = bộ token khóa cứng
   (fontDisplay/fontBody/fontScript? · googleFonts · surface/surfaceAlt/surfaceImage? ·
   card/ink/muted/line · radius · shadow · mode).

Token đổ ra CSS var trong `layout.tsx`: `--brand-primary`, `--brand-accent`, `--p-*`,
`--font-display/body/script`. **Component chỉ dùng var — cấm hex/slate hardcode**
(preflight #12 chặn slate; hex lạ = drift).

## 6 vibe hiện có

| vibe | chất | khi nào |
|---|---|---|
| swiss | sáng, lưới, Inter | doanh nghiệp, tư vấn, B2B |
| industrial | tối, mono, phẳng | tech, dev-tool, hạ tầng |
| organic | đất ấm, serif Fraunces, bo 22px | y tế, F&B, thủ công |
| aurora | tối gradient, glow | startup, SaaS |
| retro | đen neon, scanline | game, sự kiện, gen-Z |
| nocturne | trời đêm matte, Marcellus, KHÔNG glow | nhạc, thiền, spa, calm-brand |

Chọn vibe: "lean unexpected" — cặp an-toàn (tech→industrial) cho ra đồ giống mọi người;
cặp lệch kỳ vọng (label nhạc→nocturne tự chế) mới có cá tính. Nêu lựa chọn + lý do 1 dòng.

## Thêm vibe mới (đúng 4 bước)

1. Thêm tên vào `VIBES` + profile đầy đủ trong `src/design/profile.ts` (copy shape vibe gần nhất).
2. Thêm 1 dòng mô tả vào `VIBE_GUIDE` (`src/design/direction.ts`) — thiếu là typecheck FAIL (cố ý).
3. Font: CHỈ Google Fonts, nạp qua `googleFonts` href (KHÔNG next/font — offline build fail).
4. Chạy `pnpm test` — cổng contrast tự chấm: `ink/surface ≥ 4.5` (tests/design-profile.test.ts).

## Luật màu đã trả giá mới có (đừng học lại bằng tiền của mình)

- **Accent tối trên nền tối = chết chìm**: #4A2FBD trên #0F0C24 chỉ ~1.8:1. Nâng sáng accent
  để làm MỰC (#8F7BFF ≈ 5.9:1), giữ bản gốc cho GRADIENT/nền. "Gốc làm nền, sáng làm mực."
- **Gradient thương hiệu dùng 3 tầng liều giảm dần**: (1) bầu trời nền `surfaceImage` →
  (2) nút CTA pill `linear-gradient(90deg, var(--brand-primary), var(--brand-accent))` →
  (3) hairline 2px (gạch chân nav `.nav-link`). KHÔNG viền gradient quanh card, không chữ gradient tràn.
- **Chữ trắng trên nút gradient phải AA ở cả 2 đầu + midpoint** — có test sẵn trong
  design-profile.test.ts, thêm stop của tenant vào đó khi đổi màu.
- **Không glow trừ khi vibe là aurora/retro**: shadow mang màu là dấu hiệu "AI dashboard".
  Vibe matte (nocturne/swiss/organic) chỉ dùng bóng không màu.
- **Xám trên nền màu = cấm**: dùng chính màu nền pha trắng/trong suốt (`color-mix`).

## Typography

- Heading section chuẩn chassis: `font-display text-4xl md:text-5xl font-bold tracking-tight`.
- Font script (`--font-script`, ví dụ Dancing Script của nocturne) là CHỮ KÝ:
  quota 2 chỗ/trang (wordmark header + 1 từ `hero.scriptAccent`). Cấm dưới 28px,
  trong đoạn văn, trên nút. Ký một lần thì sang, ký mọi nơi thì sến.
- Serif 1-weight (Marcellus) gánh hierarchy bằng CỠ, không bằng weight — đó là chủ ý.

## Nguồn gốc tri thức

Chưng cất từ workspace `skills/frontend-design` (8 anchor) + `skills/impeccable`
(27 luật + refs). Cần sâu hơn (anchor đầy đủ, luật màu chi tiết) → đọc 2 repo đó.
