# HUMANIZER PIPELINE — dây chuyền chống-slop hai làn: CHỮ và GIAO DIỆN

> Mục tiêu: mọi thứ ship ra khỏi factory **đọc như người viết, nhìn như người thiết kế**.
> Ba skill mới (07/2026): `copywriting-mode` (draft chữ) · `humanizer` (tẩy dấu AI chữ) ·
> `design-humanizer` (tẩy dấu AI giao diện/bố cục). Nền: `vendor/ai-copywriter` (MIT).

## Vì sao cần — một câu

AI sinh ra thứ "đúng trung bình cho nhiều trường hợp nhất" (thống kê), nên cả văn lẫn giao diện
đều hồi quy về đồng phục; khách trả tiền cho thứ CÓ NGƯỜI đứng sau — pipeline này gỡ đồng phục
ra một cách có hệ thống thay vì trông chờ "gu" ngẫu hứng.

## Làn 1 — CHỮ (copy bán hàng, bài viết, chữ trong UI)

```
.agents/product-marketing.md        (dữ liệu: persona, verbatim, anti-persona — kho marketingskills)
        │
        ▼
skills/copywriting-mode             DRAFT: 2 câu hỏi lõi + intake ICP/kệ/chuyện + test chuyện 4 câu
        │                           (thiếu nguyên liệu → HỎI, không viết vòng quanh lỗ hổng)
        ▼
skills/humanizer                    TẨY: 33 pattern + bảng dấu-hiệu Việt + không bịa fact
        │                           (quét `—` lần cuối; giữ dấu văn người)
        ▼
skills/copy-craft                   LUẬT VĂN VIỆT: 20 luật + rubric — ≥8/10 mới đi tiếp
        │
        ▼
COPY GATE (codex-gates.md)          nếu chạm trigger: định vị/tagline/H1 trang tiền/giá-claim/ads
```

- Không chạm trigger cổng (microcopy theo product-marketing đã chốt, FAQ từ dữ kiện thật, docs):
  dừng ở copy-craft, tự QA.
- Docs kỹ thuật/commit/PR: chỉ cần `humanizer` chế độ embedded.
- Thứ tự CỐ ĐỊNH draft → humanize → craft: humanizer sửa cấu trúc mạnh tay (gộp/tách đoạn),
  chạy sau copy-craft sẽ phá điểm rubric đã chấm.

## Làn 2 — GIAO DIỆN (layout, màu, motion, phần tử)

```
DESIGN.md / DESIGN-SYSTEM.md khoá   (design-system-lock.md: extract > invent)
        │
        ▼
build UI (chassis + design-systems + motion-craft)
        │
        ▼
skills/design-humanizer             SCAN 22 pattern design-slop (grep được thì grep thật,
        │                           bố cục thì soi screenshot 390/768/1440) → fix theo nguyên tắc
        ▼
skills/animation/review-animations  (chỉ khi đợt việc có motion — luật sẵn trong codex-gates)
        │
        ▼
ART GATE (CODEX_ART_HANDOFF.md)     mọi quyết định GU (palette/hero/signature) vẫn dừng ở cổng
```

- design-humanizer **không thay quyền phán gu** của ART GATE: fix máy-làm-được (grep + nguyên
  tắc) thì làm; đổi gu thì đưa 2–3 phương án vào handoff.
- Chữ nhìn thấy trong UI đi Làn 1 (pattern #22 chỉ trỏ đường).

## Luật chung hai làn

1. **Không bịa fact / không bịa asset:** số không nguồn → bỏ block; testimonial chưa có verbatim
   thật → bỏ section; ảnh không có → ảnh thật của khách hoặc để trống, không stock dựng cảnh.
2. **Tìm CHÙM, không phán tell lẻ** — một gạch dài/một `rounded-xl` không nói lên gì; cụm tell
   mới là bằng chứng. Tell lẻ đứng cạnh signature thật = chủ đích, ghi nhận và giữ.
3. **Giữ dấu người:** chi tiết đặc thù, bất đối xứng có chủ đích, nhịp thay đổi, cảm xúc lẫn lộn
   — humanize quá tay còn tệ hơn slop.
4. **Ưu tiên khi kẹt thời gian:** trang tiền (home/pricing/khóa học) đi đủ pipeline; trang phụ
   tối thiểu phải qua humanizer (chữ) + scan nhanh 5 pattern màu/bố cục đầu (giao diện).

## Nguồn & tham chiếu

- `vendor/ai-copywriter` (MIT © Siqi Chen, Mickey Haslavsky) — bản gốc 33 pattern (từ hướng dẫn
  "Signs of AI writing" của Wikipedia) + phương pháp reader-first (enso.bot/research) + template
  LinkedIn/strategic-blog tiếng Anh.
- Án lệ nội bộ: ART GATE giftyid 17–18/07 (wave-once, cấm sparkle) · bài học mamquanghai (bỏ khoá
  design-system → 5 vòng làm lại) · new-heaven (asset thật có nguồn, claim có giới hạn).
- Luật liền kề: `codex-gates.md` (4 cổng) · `design-system-lock.md` · `art-direction-pipeline.md`
  · `marketing-skills-pipeline.md` (product-marketing chạy TRƯỚC).
