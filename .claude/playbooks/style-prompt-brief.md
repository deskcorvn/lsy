# Style Prompt Brief — từ brand brief tới prompt dựng giao diện

Style Prompt là artifact trung gian giữa **brand brief/reference** và **DESIGN.md**:

```text
Brand brief + content truth + references
  → STYLE_PROMPT.md (creative/build direction, dùng để scaffold)
  → DESIGN.md (token + luật bền vững, source of truth)
  → component implementation
```

MotionSites mạnh ở bước prompt này. Agency Toolkit trước đây đi thẳng từ brand brief sang design system nên đúng kỹ thuật nhưng đôi khi thiếu một “cảnh” đủ cụ thể để AI dựng bố cục có hồn.

## Luật

- Style prompt mô tả **ý đồ**, không sao chép nguyên một trang tham khảo.
- Mọi claim, copy, sản phẩm và asset phải đến từ project.
- Reference chỉ được tách thành layout principle, hierarchy, interaction intent và responsive behavior.
- `STYLE_PROMPT.md` dùng để scaffold; sau khi chốt, `DESIGN.md` mới là hợp đồng lâu dài.
- Mỗi viewport chỉ có một signature move; luôn có reduced-motion.

## Input sheet

Điền trước khi viết prompt:

```yaml
project:
  name: ""
  page: "landing | product | campaign | portfolio | app"
  stack: "React/Next + Tailwind + Motion"
business:
  primary_action: ""
  proof: []
audience:
  role: ""
  decision: ""
brand:
  posture: "precise | warm | bold | editorial | technical | luxury"
  three_traits: []
  assets_available: []
references:
  keep_as_principles: []
  forbidden_to_copy: ["brand names", "copy", "asset URLs", "exact layout fingerprint"]
motion:
  intensity: 1-5
  signature_move: ""
constraints:
  breakpoints: [390, 768, 1440]
  reduced_motion: true
```

## Prompt template

Lưu block đã điền thành `STYLE_PROMPT.md` trong project:

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

## Chọn primitive motion

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

Nguồn code mặc định: `vendor/motion-primitives/components/core/` (MIT). Không đưa primitive vào prompt nếu nó không phục vụ ý đồ cụ thể.

## Definition of ready

Style prompt chỉ sẵn sàng để build khi có đủ:

- Mục tiêu và primary action.
- Audience + quyết định họ cần đưa ra.
- North-star scene và ba tính từ brand.
- Section choreography.
- Một signature move có tên primitive.
- Responsive behavior cho 390/768/1440.
- Content/asset truth và danh sách cấm sao chép.
