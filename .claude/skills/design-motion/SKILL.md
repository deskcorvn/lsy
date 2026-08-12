---
name: design-motion
description: Hệ chuyển động của chassis — các class motion có sẵn (hero-enter, card-reveal, btn-press, sky-breathe...), luật choreography, timing/easing, reduced-motion. Dùng khi thêm/chỉnh animation hay hiệu ứng.
---

# Hệ motion (đã cài sẵn trong globals.css — DÙNG, đừng chế lại)

## Luật số 1 (chống AI-slop)

**"Fade-and-rise trên mọi section khi cuộn là DẤU HIỆU máy làm, không phải choreography."**
Ngân sách motion tiêu vào: MỘT entrance hero được dàn dựng + stagger cho card-grid
(hợp lệ) + micro-feedback. Hết. Section thường KHÔNG animate.

## Class có sẵn (globals.css) — API của hệ

| Class | Việc | Cách dùng |
|---|---|---|
| `.hero-enter` | choreography hero: con rise-up so le | đặt trên wrapper; mỗi con inline `style={{"--i": n}}` (80ms/bước, tổng <500ms) |
| `.hero-script` | chữ ký script hiện chậm 1.6s | tự động qua `hero.scriptAccent` |
| `.hero-sky` | ảnh nền "thở" scale 1→1.07 trong 48s | tự động qua `hero.backgroundImage` |
| `.card-reveal` | card hiện dần khi cuộn (CSS `view()` timeline, tự stagger theo vị trí) | CHỈ cho item trong grid — cấm áp cho cả section |
| `.btn-press` | hover nhấc 1px + sáng 6%, active nén 0.97 (150ms) | mọi nút/link dạng nút |
| `.nav-link` | gạch chân gradient trượt ra khi hover | link điều hướng |
| `.mg-card`/`.mg-lift`/`.mg-scrim` | artwork zoom 1.05 + scrim caption hover/focus/touch | MediaGrid tự dùng |
| `.lm-track` | marquee cuộn ngang vô hạn 40s | logoMarquee `animated: true` |
| `--ease-out-quint/expo` | easing chuẩn | mọi transition tự viết |

Tất cả đã guard `prefers-reduced-motion: reduce` trong globals.css — thêm class motion
mới thì PHẢI thêm nó vào block guard đó.

## Timing (luật 100/300/500 — chưng cất từ impeccable/animate)

| Thời lượng | Dùng cho |
|---|---|
| 100–150ms | feedback nút, toggle, đổi màu |
| 200–300ms | menu, tooltip, hover state |
| 300–500ms | accordion, modal, drawer |
| 500–800ms | entrance hero (một lần duy nhất) |

- Exit nhanh hơn enter (~75%).
- **CẤM bounce/elastic** — lỗi thời và tự phô animation.
- Animate `transform`/`opacity`; không animate width/height/top/left/margin.
- Stagger: `animation-delay: calc(var(--i) * 50-80ms)`, cap tổng ~500ms.

## Scene decor (tầng "sống" trên artwork)

`hero.decor: "night-piano"` bật `HeroDecor.tsx`: sao 2 tầng lấp lánh + sao băng +
đom đóm trôi + piano SVG bấm được (Web Audio) + parallax con trỏ. Xem skill
**design-artwork** để làm pack mới. Nguyên tắc: hiệu ứng là ÁNH SÁNG TRONG TRANH
(diegetic — đom đóm, sao), không phải UI glow; chậm như hơi thở, không ồn.

## Bẫy SSR đã trả giá

Vị trí "ngẫu nhiên" (sao, hạt) phải DETERMINISTIC — sinh bằng số học
(`(i*37+11)%100`), CẤM `Math.random()` lúc render: server và client phải ra
cùng một bầu trời, không thì hydration mismatch.
