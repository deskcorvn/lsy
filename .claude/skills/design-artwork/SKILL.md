---
name: design-artwork
description: Phương pháp artwork-first (bài học Lofi Girl) — hero/CTA nền tranh, scrim đạt AA, ghép cover-wall từ ảnh thật bằng sharp, làm scene decor pack mới, pipeline nén ảnh webp. Dùng khi làm việc với ảnh nền, artwork, hiệu ứng cảnh, hay asset.
---

# Artwork-first (công thức đã kiểm chứng trên lofigirl.com + the-soul-of-wind)

## Nguyên lý

Cái "chuyên nghiệp" của site đẹp KHÔNG nằm ở hiệu ứng — nằm ở:
**artwork lớn mang toàn bộ màu sắc, UI chrome trung tính im lặng, typography đậm, khoảng thở.**
(Soi CSS lofigirl.com: chrome chỉ có #0c0908/#faf9f8/#2c3729 — tranh gánh hết.)

Ba điểm cắm artwork trong chassis:

1. **`hero.backgroundImage`** — tranh full-bleed ~86svh, scrim 3 lớp tự đạt AA:
   gradient surface 34%→22%→100% + vignette điện ảnh + text-glow màu nền quanh chữ.
   Chọn tranh có VÙNG AN TOÀN ở giữa (mobile crop dọc).
2. **`cta.backgroundImage`** — pattern "promo trên artwork" (khối Morning Coffee của
   Lofi Girl): tranh + headline + 1 nút; component tự phủ scrim tối .52 nên chữ trắng luôn AA.
3. **`hero.decor`** — tầng sống phủ lên tranh (xem dưới).

## Ghép artwork thật từ asset sẵn có (không chờ designer)

**Cover wall** — ghép N ảnh vuông thành banner nền (đã dùng cho CTA the-soul-of-wind):

```bash
node scripts/make-cover-wall.mjs public/images/releases public/images/brand/cover-wall.webp
```

(Script nhận: thư mục nguồn, file đích, `--cols 7 --rows 3 --tile 276`. Tự rải đều
bước 3 qua catalog cho đa dạng màu + phủ indigo 30% baked.)

Biến thể cùng kỹ thuật (sharp `composite`): dải ảnh ngang cho divider, mosaic OG image.

## Pipeline ảnh (chuẩn đã dùng, 147MB→2.8MB)

- Đích `public/images/{artists,releases,playlists,brand,stores}/{slug}.webp`.
- Card: resize max 800px cạnh dài, webp q80 (~80KB — đủ 2x retina cho card ≤400px).
- Hero: 1920px + bản 960px, q78. OG: 1200×630.
- Tên file = slug thực thể (kebab-case), KHÔNG `image37.jpg`.
- Preflight #13 chặn ảnh khai trong config mà không tồn tại; #8 chặn ảnh thiếu alt.
- Ảnh remote chỉ hostname đã khai trong `next.config.ts` `remotePatterns`
  (có sẵn `i.ytimg.com` — thumbnail YouTube `hqdefault.jpg` LUÔN tồn tại, maxres hay 404).

## Làm scene decor pack mới (mẫu: night-piano)

`src/components/sections/HeroDecor.tsx` + enum `decor` trong `src/content/schema.ts`.
Một pack = các layer absolute inset-0 pointer-events-none:

1. **Hạt/ánh sáng diegetic** (sao, đom đóm, cánh hoa, tuyết): vị trí sinh DETERMINISTIC
   bằng số học `(i*prime+offset)%range` — cấm Math.random (SSR mismatch). Mỗi layer
   một `--depth` để parallax con trỏ (đã có sẵn cơ chế `--px/--py`).
2. **Silhouette SVG** vẽ tay (piano, cây, mèo, thuyền...): fill `var(--decor-silhouette, #07051a)`,
   đặt ở đường chân trời. Vẽ hỏng thì chụp màn hình soi lại rồi sửa path — đừng đoán chay.
3. **Easter egg âm thanh** (tùy chọn): Web Audio oscillator (triangle + lowpass + envelope),
   CHỈ chạy trong onClick (chính sách autoplay), master gain ≤0.15, đóng context sau khi ngân.
4. Guard: mọi keyframe mới vào block `prefers-reduced-motion` của globals.css;
   pack chỉ render khi tenant bật `decor` — site khác không trả chi phí.

## Sinh ảnh AI (khi được yêu cầu)

Workspace có `skills/taste-skill` (image-gen) — CẦN API key sinh ảnh (chưa cấu hình sẵn).
Khi không có key: ghép/chỉnh từ asset thật bằng sharp (như trên) hoặc vẽ SVG.
KHÔNG dùng tranh/nhân vật của thương hiệu khác (Lofi Girl...) — chỉ học BỐ CỤC.
