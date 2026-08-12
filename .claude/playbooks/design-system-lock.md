# design-system-lock — KHOÁ gu TRƯỚC khi code UI (mọi project, không riêng WP)

> **LUẬT #1:** Chưa có `DESIGN-SYSTEM.md` đã khoá (token + component + bố cục) và được **KHÁCH/ART GATE
> ký duyệt** → **CẤM code giao diện.** Không có chốt = đánh bạc, và cái đắt không phải AI gen xấu mà là
> gen KHÔNG ràng buộc → làm đi làm lại.

## Vì sao (bài học trả bằng "tiền thật")
Case **mamquanghai** (07/2026): build UI khi CHƯA khoá design system → tự áp gu (kem/nâu) → khách chê
→ đổi đỏ/vàng → đổi xanh → revert → **5 vòng làm lại**. Chỉ hết loạn khi viết `DESIGN-SYSTEM.md`, cho
khách **ký duyệt** (giữ terracotta + bám dhfoods), rồi build đối chiếu nó. → Ràng buộc mạnh = AI khó đi sai.

## Quan hệ với cổng sẵn có (đừng dựng trùng)
- **ART GATE** (`codex-gates.md` §1) = cổng DUYỆT gu. Output được duyệt của nó CHÍNH LÀ `DESIGN-SYSTEM.md` khoá.
- **`STYLE_PROMPT.md`** (`style-prompt-brief.md`) = BRIEF đầu vào (mục tiêu, 3 tính từ, north-star, signature).
- **`DESIGN-SYSTEM.md`** = OUTPUT khoá, cụ-thể-hoá brief thành TOKEN + COMPONENT versioned, sống suốt dự án.
- Skip Codex ART GATE là quyền của khách — nhưng **KHOÁ design-system thì KHÔNG được skip**; thiếu gate thì
  vẫn phải cho khách OK `DESIGN-SYSTEM.md` trước khi build.

## Quy trình 5 bước (map vào skill sẵn có)
1. **EXTRACT — đừng tự chế.** Khách CÓ SẴN site/logo/ảnh → trích gu từ tài sản THẬT bằng
   `skills/brand-extract` + `skills/color-expert` (đo computed màu/font/radius/nút của site cũ, hoặc của
   mẫu khách chỉ định). Gu của khách nằm sẵn trong đồ họ đang dùng — trích ra, đừng áp gu mình.
   *(mamquanghai: màu thật = trích từ banner Cover + huy chương, không phải màu tôi nghĩ.)*
2. **DRAFT DESIGN-SYSTEM.md** (template §dưới) — dùng `skills/.../design-system` (token/contrast AA),
   `design-artwork` (artwork gánh màu), `design-motion` (ngân sách motion). Mỗi quyết định gu đưa 2–3 phương án.
3. **SIGN-OFF** — mở ART GATE (`CODEX_ART_HANDOFF.md`) HOẶC hỏi khách trực tiếp (AskUserQuestion, kèm
   preview 2 phương án khi cần). **Chốt bằng văn bản trong file** (dòng "✅ KHÁCH DUYỆT <ngày>: …").
4. **BUILD đối chiếu DS** — chỉ dùng token trong DS, không hex/nút lạ. Đổi gu giữa chừng = quay lại B3, không tự quyết.
5. **COMPLIANCE (không phải "đẹp theo mắt tôi")** — `skills/.../design-craft`: chụp UI thật →
   **so TỪNG element với `DESIGN-SYSTEM.md`** (đúng token? đúng radius? đúng nút? font? shadow matte?) →
   lệch chỗ nào sửa chỗ đó. Lặp tới khi khớp DS, KHÔNG tới khi "tôi thấy ổn".

## Template `DESIGN-SYSTEM.md` (đặt ở root project, versioned)
```
# DESIGN SYSTEM — <brand>
> Nguồn sự thật DUY NHẤT về diện mạo. Mọi sửa UI đối chiếu file này.
> Chuẩn tham chiếu: <mẫu khách thích>. Trạng thái: ✅ KHÁCH DUYỆT <ngày>: <quyết định>.

0. Tinh thần — 3 tính từ brand + north-star (ảnh/asset gánh màu).
1. MÀU (token) — primary/accent/ink/surface/line/deep + hex + DÙNG CHO GÌ + luật (AA ≥4.5, shadow matte).
2. TYPOGRAPHY — font (heading/body) + thang cỡ (clamp) + weight + ornament tiêu đề.
3. NÚT — biến (primary/ghost/…) + radius (pill 999 / card 12) + đủ state (hover/active/focus).
4. CARD·SECTION·SPACING — radius, shadow, padding, nhịp nền xen kẽ, aspect-ratio ảnh.
5. BỐ CỤC trang chính — blueprint thứ tự section (bám mẫu tham chiếu).
6. MOTION — preloader? · reveal CHỈ card-grid + 1 hero-entrance · timing 100/300/500 · reduced-motion.
7. COMPLIANCE checklist — để design-craft chụp UI chấm: 1 h1, token-only, font đúng, shadow matte,
   ảnh alt+aspect-ratio, 0 iframe first-load, mobile 390 overflow 0, số liệu 1 lần/trang.
```

## Ràng buộc (không thương lượng)
- **Không UI code trước khi DS khoá + ký.** Skip gate được, skip lock KHÔNG.
- **Extract > invent** với khách có tài sản. Màu/font phải có NGUỒN (site cũ/mẫu/logo), không "màu tôi nghĩ đẹp".
- DS **versioned** (git), có dòng ký duyệt + ngày. Đổi gu = commit mới + ký lại, không sửa lén.
- design-craft chấm **COMPLIANCE với DS**, không phải thẩm mỹ cá nhân. Lặp 3–4 lần vẫn lệch = DS sai/chưa ký, quay lại B1–3.

Liên quan: [[codex-gates]] (ART GATE), [[style-prompt-brief]], [[art-direction-pipeline]], [[design-pipeline]],
`skills/brand-extract` · `skills/color-expert` · `chassis/catalog-site-template/.claude/skills/{design-system,design-artwork,design-motion,design-craft}`.
