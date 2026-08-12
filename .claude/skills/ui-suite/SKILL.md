---
name: ui-suite
description: "SIÊU CÔNG CỤ UI/UX — bộ điều phối hợp nhất toàn bộ tầng thiết kế của agency-toolkit: style prompt → chọn gu (design systems + anchors) → dựng (patterns + tokens + motion primitives) → chống-slop → art gate. Dùng khi bắt đầu/nâng cấp giao diện bất kỳ project nào; skill này QUYẾT dùng mảnh nào, thứ tự nào — đừng gọi lẻ từng skill con."
metadata:
  author: giftytech
  type: orchestrator
user-invocable: true
---

# ui-suite — dây chuyền UI/UX chuyên nghiệp (một cửa)

Bạn không cần nhớ từng công cụ con. Trả lời 4 câu → skill này trỏ đúng mảnh, đúng thứ tự:
1. **Project loại gì?** (web marketing/site khách · storefront/app · AI-chat/copilot · miniapp Zalo → sang zmp-toolkit)
2. **Đã có brand/gu chưa?** (có DESIGN.md? có brand assets?)
3. **Reference nào chỉ để học nguyên tắc?** (gallery, site đối thủ, mood board; cấm bê copy/asset/layout fingerprint)
4. **Giai đoạn nào?** (style prompt → chọn gu → dựng → đánh bóng → nghiệm thu)

**Ngữ cảnh của skill này: GREENFIELD** — project chưa có gu/DESIGN.md, dựng hệ từ đầu, nên
`STYLE_PROMPT.md` viết TRƯỚC rồi mới tokenize. Project ĐÃ có code + token và chỉ cần hiệu chỉnh gu
(RETROFIT) → vào bằng `playbooks/art-direction-pipeline.md` (nó capture token hiện có trước, style
prompt khoá scene cho phần dựng mới).

## Hai lối vào — giai đoạn nào đọc playbook nào

ui-suite QUYẾT dùng mảnh nào/thứ tự nào; playbook MÔ TẢ tầng và luật chi tiết. Vào bằng playbook
cũng được, nhưng vẫn quay về bảng này để chốt thứ tự:

| Giai đoạn | Playbook đi kèm |
|---|---|
| 1 — style prompt → chọn gu | `playbooks/style-prompt-brief.md` (có Definition of ready) · `playbooks/design-pipeline.md` (3 tầng) |
| 1–6 — hiệu chỉnh gu trên code đã có (RETROFIT) | `playbooks/art-direction-pipeline.md` (8 bước: capture → north star → tokenize → signature → asset) |
| 2 — dựng | `playbooks/design-pipeline.md` (7 trục tạo hồn) · `playbooks/motionsites-reference-pipeline.md` |
| 3 — chống-slop & đánh bóng | `playbooks/art-direction-pipeline.md` §7–§8 |
| 4 — nghiệm thu | **`playbooks/codex-gates.md`** (ART · COPY · SEO · GEO) · `playbooks/og-social-preview-standard.md` |

## Resolve đường dẫn — 2 CHẾ ĐỘ

Mọi đường dẫn trong skill này viết theo chế độ A. Đang chạy ở project khách thì dịch sang chế độ B:

| | A — chạy TRONG toolkit | B — chạy TRONG project khách (cài bằng `bootstrap.ps1`) |
|---|---|---|
| skill | `skills/<tên>` | `.claude/skills/<tên>` |
| playbook | `playbooks/<tên>.md` | `.claude/playbooks/<tên>.md` |
| design system | `design-systems/<tên>/` | `.claude/design-systems/<tên>/` |
| vendor (kho nặng, KHÔNG copy xuống project) | `vendor/<tên>/` | đọc đường dẫn toolkit trong `.claude/toolkit-root.txt` rồi nối `vendor/<tên>/` |

Thiếu `.claude/toolkit-root.txt` → không tự đoán đường dẫn vendor; báo người dùng chạy lại bootstrap.

## GIAI ĐOẠN 0 — Luật bất biến (đọc 1 lần)

- Mọi project UI phải có **DESIGN.md** (hợp đồng thị giác) TRƯỚC khi code UI. Chưa có → tạo từ
  giai đoạn 1. Mẫu tốt: `design-systems/giftytech-art/` (North Star + palette + lanes + anti-patterns + QA).
- **Thẩm mỹ lớn dừng ở art gate**: quyết định gu (chọn hệ, đổi palette, poster/asset) → viết
  `CODEX_ART_HANDOFF.md`, KHÔNG tự quyết. Skill này chuẩn bị *phương án + ràng buộc* cho gate.
- **Thông điệp dừng ở copy gate**: đợt việc đụng H1/tagline/định vị/giá–claim → chạy
  `skills/copy-craft` (đạt ≥8/10) rồi viết `CODEX_COPY_HANDOFF.md` và **chốt copy TRƯỚC**; art minh
  họa theo copy đã chốt (luật ở `playbooks/codex-gates.md`). Đợt đổi cả gu lẫn thông điệp = 2 file
  handoff riêng, không gộp. Copy nằm ngoài phạm vi *sản xuất* của skill này (soạn văn → kho
  `marketingskills`), nhưng thứ tự cổng thì skill này phải giữ.
- Số liệu/claim trên UI phải thật (không bịa) — theo hiến chương ECC.

## GIAI ĐOẠN 1 — STYLE PROMPT → CHỌN GU

Trước khi tạo `DESIGN.md`, viết `STYLE_PROMPT.md` theo `playbooks/style-prompt-brief.md`. Đây là creative/build brief kiểu MotionSites nhưng dùng brand, content truth và asset của project. Nó phải chốt: outcome, north-star scene, visual language, section choreography, một signature move, primitive dự kiến, responsive behavior và anti-copy guard.

`STYLE_PROMPT.md` dùng để scaffold. Sau khi art direction được chốt, chuyển các quyết định bền vững thành `DESIGN.md`; từ đó `DESIGN.md` là source of truth.

### Chọn hệ (khi chưa có design system)

| Nguồn | Là gì | Khi nào |
|---|---|---|
| `design-systems/` (12 hệ) | 10 hệ Open Design + `giftytech-art` + **`motion-craft`** (6 motion pattern nguyên bản, token, reduced-motion) | Cần một hệ hoàn chỉnh nhanh; shortlist 2–3 hệ theo brand brief → art gate chốt. Landing nhiều chuyển động ưu tiên `motion-craft` thay vì bê gallery |
| `skills/frontend-design` (8 anchor) | 8 persona thẩm mỹ để ĐỊNH HƯỚNG khi tự dựng hệ riêng | Brand mạnh, không muốn hệ có sẵn |
| `skills/taste-skill` | Mood board + sinh ảnh định gu, anti-slop cho asset | Cần vật liệu thị giác trước khi chốt gu |
| **`skills/hallmark`** (MIT, Together AI) | Anti-slop design skill: **20 theme + custom OKLCH**, macrostructure ĐA DẠNG theo brief, 50 component pattern (9 hero/13 nav/6 feature/8 footer), verb `study` bóc DNA từ URL/screenshot (từ chối clone pixel + template trả phí — cùng luật motionsites-pipeline) | Brief cần **cấu trúc khác nhau giữa các trang/khách** (chống rập khuôn hero→3-feature→CTA); hoặc có reference URL/ảnh cần bóc DNA hợp pháp. Demo 20 theme: `vendor/hallmark/site/` |
| **`vendor/ui-ux-pro-max`** (MIT) | **Database quyết-định gu tra cứu được**: 84 style · 192 palette · 74 cặp font · 192 product type + reasoning · 98 UX guideline · 25 chart × 22 stack (CSV ở `src/ui-ux-pro-max/data/`) | Cần **cơ sở dữ liệu** để chọn style/palette/font theo LOẠI SẢN PHẨM + kiểm UX priority-based (accessibility → touch → performance → style). Đọc `vendor/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/SKILL.md`. Tra làm dữ liệu, restyle qua token DESIGN.md — không bê nguyên |
| Kho đầy đủ 152 hệ | `../open-design` (local clone, POINTERS) | 12 hệ trong toolkit không đủ |

**Luật license khi port template từ kho open-design:** `vendor/open-design/design-templates/` có
**36 file LICENSE riêng** — nhiều template thuộc bản quyền của chủ khác, KHÔNG dùng chung LICENSE
gốc của kho. Chủ sở hữu đo được ở tầng trên: Zara Zhang · op7418 (歸藏) · lewis · Matt Van Horn
(một số template còn ghi credit tác giả trong `SKILL.md` của chính nó). Trước khi port bất kỳ
`design-templates/*`: `ls` thư mục đó tìm `LICENSE`, đọc dòng copyright THẬT, mang nguyên dòng đó
theo sang project và ghi vào NOTICE của project. Không có LICENSE trong thư mục → truy lên LICENSE
của kho, đừng mặc định "MIT là dùng thoải mái, khỏi ghi tên".

**Output bắt buộc:** `STYLE_PROMPT.md` + `DESIGN.md` của project (palette/token, lanes, signature moves, anti-patterns, QA) + handoff nếu quyết gu.

## GIAI ĐOẠN 2 — DỰNG (đã có DESIGN.md)

| Nguồn | Dùng cho |
|---|---|
| `skills/ui-design-brain` | 60+ pattern component (chọn variant đúng ngữ cảnh, không chế bừa) |
| **Mặc định:** `vendor/motion-primitives` | 33 primitive MIT, built with Motion + Tailwind: in-view, magnetic, scroll-progress, morphing dialog, text effects, disclosure, carousel… Copy/adapt đúng primitive đã ghi trong `STYLE_PROMPT.md`; map mọi style qua token `DESIGN.md`. Upstream đang beta nên kiểm tra API trước khi nâng snapshot. |
| **Kho hiệu ứng tham khảo:** `vendor/{magicui,animata,animate-ui}` | 1.470 tsx: particles · beam · marquee · micro-interaction. Dùng khi `motion-primitives` không đủ và effect có lý do trong DESIGN.md. Không rắc hiệu ứng, mỗi màn tối đa 1 signature move. `animate-ui` có Commons Clause — cân nhắc trước deliverable tính tiền. |
| `design-systems/motion-craft` | Contract motion nguyên bản: kinetic hero · proof rail · magnetic CTA · reveal copy · sticky story stack · depth grid. Dùng làm default khi brief yêu cầu “premium motion”; không chứa prompt/asset gallery thương mại. |
| Token của hệ đã chọn | Import `tailwind-v4.css`/`tokens.css` — cấm hardcode màu ngoài token |
| Motion | Token `--*-motion-*` theo DESIGN.md (fast ~160ms feedback · standard ~220ms · story ~420ms, ease-out, chỉ animate transform/opacity, luôn có prefers-reduced-motion). Chassis clones có sẵn `.claude/skills/design-motion`. Kỹ thuật tham chiếu: kho motion ở bảng trên + `skills/animation` (Emil Kowalski). **BẮT BUỘC: chạy `review-animations` và sửa hết finding TRƯỚC khi mở ART GATE** (điều kiện vào cổng — `codex-gates.md`) |
| Agents | `ux-architect` (IA/luồng) · `brand-guardian` (soát lệch brand) · `image-prompt-engineer` (asset) · `whimsy-injector` (điểm nhấn) |

### 2b — AI-chat / Copilot UI (khi project cần khung chat)

**Ma trận adoption (đừng tự chế khung chat):**

| Thư viện | License | Chọn khi | Ghi chú |
|---|---|---|---|
| **assistant-ui** (`../assistant-ui`) | MIT ✅ | MẶC ĐỊNH cho React/Next: primitives composable, streaming, tool-call UI, attachment | Đã ADOPT cho kế hoạch eCard P3; style bằng token DESIGN.md |
| **ai-elements** (`../ai-elements`) | Apache-2.0 ✅ | Đã dùng Vercel AI SDK + muốn component shadcn-style cài từng cái | Cùng họ Vercel AI SDK |
| **open-webui** (`../open-webui`) | ⚠️ License riêng "All rights reserved" + điều khoản branding | KHÔNG copy code. Chỉ tham khảo pattern UX (thread list, model switcher, RAG citations) rồi tự dựng bằng assistant-ui | Là app hoàn chỉnh, không phải library |

Luật: cài qua npm khi adopt (không vendor code vào toolkit); mọi màu/spacing đi qua token của DESIGN.md để chat không "lạc hệ".

## GIAI ĐOẠN 3 — CHỐNG-SLOP & ĐÁNH BÓNG

1. Chạy `skills/impeccable` — 27 luật anti-pattern (deterministic, không cần gu).
2. Chạy `hallmark audit` (`skills/hallmark`) — chấm theo slop-test + anti-patterns của Hallmark, trả
   punch-list KHÔNG tự sửa. Bắt thứ impeccable không bắt: **rập khuôn cấu trúc** (trang nào cũng
   hero→3-feature→CTA→footer). Hai lượt audit bổ trợ nhau, không thay nhau.
3. Đối chiếu anti-patterns trong DESIGN.md của project (mỗi hệ có danh sách cấm riêng).
4. `skills/art-direction-factory` — quy trình audit → art-direct → polish → elevate khi cần nâng tầm.
5. Kỷ luật code đi kèm: `ponytail` (tối giản đúng), `caveman` (output gọn khi review dài).

## GIAI ĐOẠN 4 — NGHIỆM THU (gate kép)

Luật đầy đủ + template handoff: `playbooks/codex-gates.md`.

- **Máy:** lint/tsc/build xanh · mobile 390 + desktop 1440 không overflow · contrast ≥ 4.5:1 ·
  reduced-motion · OG preview đọc được ở 300×158 · QR (nếu có) quét được trên nền sáng.
- **Mắt — ART GATE:** screenshot các viewport → `CODEX_ART_HANDOFF.md` cho thay đổi thẩm mỹ lớn;
  thay đổi nhỏ theo đúng DESIGN.md thì tự duyệt bằng checklist QA của DESIGN.md.
- **Chữ — COPY GATE:** đợt việc có đụng H1/tagline/định vị/giá–claim thì `CODEX_COPY_HANDOFF.md`
  phải đã chốt TRƯỚC ART GATE (xem GIAI ĐOẠN 0). Chưa qua copy gate mà ship trang tiền = thiếu
  cổng, không phải "art gate xanh là xong".
- **SEO/GEO:** đổi title/slug trang đã index, hoặc đổi hồ sơ thực thể (ORG/legalName/taxId/địa
  chỉ/sameAs) → còn SEO GATE và GEO GATE ở `codex-gates.md`, ngoài phạm vi skill này nhưng vẫn
  chặn ship.

## Deploy (khi được hỏi)

Coolify (`../coolify`, Apache-2.0, self-host PaaS) — chỉ tham khảo pattern, xem POINTERS.md; không
phải phạm vi skill này.

## Chống trùng lặp

- Miniapp Zalo → dùng **zmp-toolkit** (shopee-storefront + zmp-design-gate), không áp hệ web vào.
- Nội dung marketing/copy → kho `marketingskills` (playbook marketing-skills-pipeline). Đây là
  phân công SẢN XUẤT, không phải miễn cổng: thứ tự copy-chốt-trước-art vẫn do skill này giữ
  (GIAI ĐOẠN 0 + 4).
- Kỹ thuật harness (build lỗi, e2e) → ECC (playbook ecc-pipeline).
