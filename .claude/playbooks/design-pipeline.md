# Design Pipeline — dây chuyền 3 tầng (giải bài "rập khuôn")

> **Bước 0: gọi `skills/ui-suite` để chọn mảnh + thứ tự; playbook này chỉ MÔ TẢ tầng, ui-suite mới QUYẾT.**
> Ngữ cảnh của playbook này: **GREENFIELD** (clone mới, chưa có gu) → `STYLE_PROMPT.md` viết TRƯỚC
> khi chốt token. Project đã có code + token cần hiệu chỉnh gu (RETROFIT) → `playbooks/art-direction-pipeline.md`.
> Nghiệm thu ở cả hai lối: `playbooks/codex-gates.md` (ART · COPY · SEO · GEO).

Mục tiêu: mỗi site **khác biệt + có hồn + gắn thương hiệu** mà KHÔNG vỡ guardrail và vẫn nhân bản nhanh.

## Nguyên tắc Just-enough Clarity

Thiết kế tốt không phải là đưa được nhiều thứ lên màn hình. Mỗi viewport/section cần:

- Một ý chính có thể nhắc lại bằng một câu.
- Một focal point thị giác; ảnh và chữ hỗ trợ nhau, không tranh vị trí.
- Một bằng chứng phù hợp thay cho nhiều badge/card giải thích.
- Khoảng trắng đủ để người xem nhận thứ bậc mà không cần đọc hết.
- Câu chữ đời thường, thân thiện và cụ thể; độ dài co lại theo kích thước surface.

Quy trình review: xác định thứ quan trọng nhất → xóa lớp ít quan trọng nhất → chụp lại ở desktop/mobile/thumbnail → chỉ thêm lại khi thiếu nó làm sai nghĩa hoặc cản hành động.

## 3 tầng bù nhau
- **Cấu trúc** = `chassis/` (factory): Zod + preflight 14 cổng + 1 H1 + answer-first + form + anchor sống → đảm bảo *đúng, nhanh, an toàn*.
- **Đội** = `agents/` (agency-agents): ai làm gì.
- **Gu** = `skills/` (design): persona có sẵn + cổng chống-slop + sinh ảnh.

## Luồng cho mỗi clone
```
Brand brief (ngành + 3 tính từ giá trị + khách)
 → playbooks/style-prompt-brief                    VIẾT STYLE_PROMPT.md: scene + choreography + signature move
 → agents/design: ux-architect + brand-guardian   CHỌN 1/8 anchor (skills/frontend-design) + chốt DESIGN.md/token
 → agents/design: image-prompt-engineer + skills/taste-skill   SINH ảnh / mood board đặc trưng
 → skills/ui-design-brain                          dựng variant component theo 60+ pattern
 → vendor/motion-primitives                        hiện thực primitive đã chốt trong STYLE_PROMPT.md
 → skills/impeccable (27 luật) + skills/animation:review-animations (nếu có motion) + chassis preflight (12 cổng)
   CỔNG ba: chống-slop thẩm mỹ + chống-slop motion + guardrail nội dung
 → site khác biệt + `pnpm verify` xanh
```

## Nguyên tắc giữ guardrail
**Persona chỉ chạm SKIN** (CSS variables + variant enum); **guardrail chỉ kiểm CONTENT + a11y** → trực giao, thêm tự do thẩm mỹ không làm yếu guardrail nào (còn siết thêm 2 cổng a11y: contrast AA + reduced-motion).

`STYLE_PROMPT.md` là scaffold brief, không thay `DESIGN.md`: prompt tạo phương án; design contract khóa token và luật để các lần sửa sau không trôi gu.

## 7 trục tạo "hồn" (ROI giảm dần)
1. Typography (font + scale + tracking + weight) — đòn bẩy lớn nhất
2. Hệ màu đầy đủ (surface/ink/border, không chỉ primary/accent)
3. Shape (radius + border + shadow)
4. Layout rhythm (hero archetype + density)
5. Ảnh/icon (art direction) — yếu tố "hồn" nhất, factory đang thiếu
6. Signature motion — bộ chuyên sâu: `skills/animation` (emil-design-eng thiết kế · review-animations chấm · improve-animations audit codebase); motion pass phải qua review-animations trước ART GATE (luật ở codex-gates.md)
7. Voice (tông copy — AIO)

## P1 (chưa code) — Design Persona system
`client.config.theme.vibe: "tech-sharp"` → map 8 anchor `frontend-design` → resolve CSS variables + section `variant` → cổng `impeccable` + contrast-AA. Khách mới = đổi 1 dòng `vibe`.
