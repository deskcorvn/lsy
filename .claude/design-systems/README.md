# Design Systems — thư viện persona (từ Open Design)

Kho gồm 10 hệ production-grade từ [nexu-io/open-design](https://github.com/nexu-io/open-design) (**Apache-2.0**, xem `LICENSE`) và các hệ nguyên bản của agency. Gói chuẩn gồm:

- `DESIGN.md` — bản mô tả brand/hệ (agent đọc để generate đúng gu).
- `design-tokens.json` — token nguồn (màu, typography, spacing, shadow…).
- `tokens.css` + `tailwind-v4.css` — **CSS thuần, Tailwind v4** → **drop-in** thẳng vào Next 16 + TW v4 (cả chassis lẫn giftyid).
- `components.html` + `components.manifest.json` — mẫu component tham chiếu.
- `USAGE.md` — cách dùng.

## 12 hệ đã có (chọn cho landing-page + content marketing)
| Hệ | Gu | Hợp với |
|---|---|---|
| `warm-editorial` | Editorial ấm, serif + terracotta | Blog, bài kiến thức, content marketing |
| `editorial` | Tạp chí, tương phản mạnh | Bài dài, magazine |
| `stripe` | SaaS sạch, tin cậy | Tech, fintech, dịch vụ |
| `clay` | Mềm, thân thiện, bo tròn | DN nhỏ, dịch vụ đời sống |
| `canva` | Nhiều màu, dễ gần | Sáng tạo, giáo dục |
| `apple` | Premium, tối giản | Cao cấp, sản phẩm |
| `xiaohongshu` | Social/lifestyle, nữ tính | F&B, làm đẹp, retail VN |
| `shopify` | Thương mại | Bán hàng, e-commerce |
| `arc` | Hiện đại, gradient | Startup, app |
| `atelier-zero` | Tối giản sang | Luxury, kiến trúc |
| `giftytech-art` | Civic commerce + editorial proof | GiftyID/GiftyTech |
| `motion-craft` | Kinetic editorial, motion có chủ đích | Landing page cao cấp, portfolio, campaign |

## Cách dùng
- **Chassis (persona system):** map token của 1 hệ vào `src/design/profile.ts` như một `vibe` mới (nạp font qua `<link>`, KHÔNG dùng `next/font/google`).
- **giftyid / clone:** `@import "tokens.css"` trong `globals.css`, scope cho route cần (vd `/kien-thuc`).
- **Agent:** đọc `DESIGN.md` để sinh nội dung/thiết kế đúng gu hệ đó.
- **Motion-heavy landing:** chọn tối đa một signature move/màn từ `motion-craft`; bắt buộc reduced-motion và `review-animations` trước ART GATE.

## 140+ hệ còn lại
Không copy hết vào repo (nặng). Browse tại `../open-design/design-systems/` hoặc submodule — xem `POINTERS.md`.
