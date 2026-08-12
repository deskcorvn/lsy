# STYLE_PROMPT.template.md — bản mẫu điền-vào-chỗ-trống

> **Cách dùng:** copy file này thành **`STYLE_PROMPT.md`** ở root repo khách, điền hết `[...]`,
> **xoá mọi dòng `>` hướng dẫn**, rồi mới dựng. File template này **giữ nguyên**, đừng điền đè lên nó.
>
> **Vị trí trong dây chuyền** (luật gốc: `.claude/playbooks/style-prompt-brief.md`):
> ```text
> Brand brief + content truth + references
>   → STYLE_PROMPT.md   (creative/build direction — dùng để scaffold)
>   → DESIGN.md         (token + luật bền vững — source of truth lâu dài)
>   → component implementation
> ```
> **STYLE_PROMPT.md dùng để scaffold; chốt xong thì `DESIGN.md` mới là hợp đồng lâu dài.**
>
> **Cổng:** đây là input của **ART GATE** (`.claude/playbooks/codex-gates.md`) — điền xong **DỪNG**,
> mở `CODEX_ART_HANDOFF.md` chờ duyệt gu. AI **không tự chốt** north-star scene, palette, signature move.
> Đợt có animation: chạy skill `review-animations` XONG rồi mới mở cổng.
>
> **Luật xuyên suốt:** style prompt mô tả **ý đồ**, KHÔNG sao chép một trang tham khảo. Mọi claim, copy,
> sản phẩm, asset phải đến từ project. Reference chỉ được tách thành *layout principle, hierarchy,
> interaction intent, responsive behavior*.

---

## 0. Input sheet — điền TRƯỚC khi viết prompt

> Chưa đủ mục này thì chưa viết prompt (xem "Definition of ready" cuối file).

```yaml
project:
  name: "[TÊN KHÁCH]"
  page: "[landing | product | campaign | portfolio | app]"
  stack: "Next.js (App Router) + Tailwind 4 + Motion"   # chassis mặc định
business:
  primary_action: "[HÀNH ĐỘNG DUY NHẤT muốn người xem làm — vd: gửi form tư vấn]"
  proof: ["[BẰNG CHỨNG THẬT 1 — có nguồn]", "[BẰNG CHỨNG THẬT 2]"]
audience:
  role: "[HỌ LÀ AI — vd: chủ xưởng cơ khí 35–50t, Hải Phòng]"
  decision: "[QUYẾT ĐỊNH HỌ CẦN ĐƯA RA]"
brand:
  posture: "[precise | warm | bold | editorial | technical | luxury]"
  three_traits: ["[TÍNH TỪ 1]", "[TÍNH TỪ 2]", "[TÍNH TỪ 3]"]
  assets_available: ["[logo.svg]", "[ảnh thật có gì — KHÔNG có thì ghi rõ]"]
references:
  keep_as_principles: ["[NGUYÊN TẮC rút từ reference — KHÔNG phải link để chép]"]
  forbidden_to_copy: ["brand names", "copy", "asset URLs", "exact layout fingerprint"]
motion:
  intensity: "[1-5]"
  signature_move: "[MỘT move duy nhất]"
constraints:
  breakpoints: [390, 768, 1440]
  reduced_motion: true
```

---

## 1. Prompt — điền rồi lưu thành `STYLE_PROMPT.md`

```md
Build a production-ready [PAGE TYPE] for [PROJECT] using [STACK].

OUTCOME
The page must help [AUDIENCE] decide [DECISION] and take [PRIMARY ACTION].
Use only the supplied content, proof, brand assets, and product facts. Do not invent claims.

CREATIVE PREMISE
Create the physical feeling of [NORTH-STAR SCENE]. The visual posture is [THREE TRAITS].
The interface should feel specific to [INDUSTRY/BRAND], not like a generic SaaS template.

VISUAL SYSTEM
- Canvas/surface/ink/accent roles: [ROLES, NOT RANDOM HEX VALUES].
- Typography: [DISPLAY BEHAVIOR] for major statements; [BODY BEHAVIOR] for reading.
- Geometry: [RADIUS/BORDER/DEPTH RULE].
- Density and spacing: [DENSITY], with one dominant focal point per viewport.
- Use the project's DESIGN.md tokens; do not hardcode a parallel theme.

PAGE CHOREOGRAPHY
1. [SECTION]: purpose, hierarchy, focal element, action.
2. [SECTION]: purpose, proof, interaction.
3. [SECTION]: purpose, transition, action.
Vary section rhythm. Do not repeat identical eyebrow-heading-copy-card grids.

MOTION DIRECTION
- Signature move: [ONE MOVE] using [MOTION PRIMITIVE].
- Feedback motion: 140–180ms; transitions: 220–280ms; story motion: 420–520ms.
- Animate transform and opacity only unless clip-path is justified.
- Motion must explain hierarchy, spatial relationship, or feedback.
- Disable decorative motion for prefers-reduced-motion and coarse pointers.

COMPONENT PLAN
- Prefer primitives from agency-toolkit/vendor/motion-primitives: [COMPONENTS].
- Use magicui/animata only when the chosen effect is justified by DESIGN.md.
- Keep semantic HTML, visible focus, 44px touch targets, and keyboard operation.

RESPONSIVE BEHAVIOR
- 390px: [MOBILE COMPOSITION]; no sticky scroll trap or horizontal text overflow.
- 768px: [TABLET COMPOSITION].
- 1440px: [DESKTOP COMPOSITION].
- Declare media dimensions and avoid cumulative layout shift.

ANTI-PATTERNS
- No copied reference text, logos, screenshots, video URLs, or exact visual fingerprint.
- No glow-orb filler, particle wallpaper, cursor follower, scroll hijacking, or infinite marquee for readable content.
- No card nesting, gradient text by default, or animation used to hide weak content.

DELIVERABLE
Return the component structure, required dependencies, token additions, and implementation.
Then provide a short QA checklist for responsive layout, accessibility, reduced motion, and performance.
```

---

## 2. Chọn primitive motion (mỗi viewport **một** signature move)

| Ý đồ | Ưu tiên |
|---|---|
| Element vào viewport | `in-view`, `animated-group` |
| Hero typography | `text-effect`, `text-roll`, `text-morph` — chọn một |
| CTA hút nhẹ theo con trỏ | `magnetic` |
| Tiến độ đọc | `scroll-progress` |
| Number/KPI | `animated-number`, `sliding-number` |
| Modal chuyển ngữ cảnh | `morphing-dialog`, `morphing-popover` |
| Before/after | `image-comparison` |
| Disclosure | `accordion`, `disclosure`, `transition-panel` |

Nguồn code mặc định: `vendor/motion-primitives/components/core/` (MIT).
**Không** đưa primitive vào prompt nếu nó không phục vụ ý đồ cụ thể.

---

## 3. Ràng buộc riêng của chassis này (đừng vi phạm khi dựng)

> Style prompt tự do về **ý đồ**, nhưng vẫn nằm trong luật của chassis:

- **KHÔNG sửa `src/`** khi nhân bản — gu đổi qua `client.config.ts` (`theme.primary/accent`, `theme.vibe`)
  + `content.config.ts`, không phải sửa component dùng chung.
- **Đúng 1 `<h1>`, chỉ ở `Hero.tsx`** — preflight chặn `<h1>` mọc thêm.
- **Trang chủ phải có section `contactForm`** — preflight cổng #10 hard-fail nếu không có `<form>`.
  Đừng "sửa" bằng cách chế `<form>` vào `src/`.
- **Không hardcode màu slate trong section** — dùng token `--p-*` (preflight kiểm, chống "đồng phục" tái phát).
- **FAQ answer-first, không `<details>` gập** (AEO) · **mọi `<img>` có `alt`** · **anchor `href="#x"` phải có `id="x"`**.
- Tiêu chí "xong" = **`pnpm verify` exit 0**.

---

## 4. Definition of ready — thiếu 1 mục là CHƯA được build

- [ ] Mục tiêu + **primary action** (một, không phải ba).
- [ ] Audience + **quyết định** họ cần đưa ra.
- [ ] **North-star scene** + ba tính từ brand.
- [ ] **Section choreography** (mỗi section: purpose · hierarchy · focal · action).
- [ ] **Một** signature move, có **tên primitive** cụ thể.
- [ ] Responsive behavior cho **390 / 768 / 1440**.
- [ ] **Content/asset truth** (copy & ảnh thật có gì) + danh sách **cấm sao chép**.
- [ ] Đã mở **ART GATE** (`CODEX_ART_HANDOFF.md`) — gu do người/Codex chốt, không phải AI.
