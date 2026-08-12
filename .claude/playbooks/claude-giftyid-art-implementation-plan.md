# Claude Handoff: GiftyID Art Elevation Implementation Plan

Kế hoạch này dùng để giao cho Claude triển khai nâng cấp thẩm mỹ cho `D:\Workspace\A3 Landingpage\projects\giftyid` theo hướng đã chốt trong agency toolkit.

Claude không được xem đây là một redesign trang trí. Đây là một đợt nâng cấp sản phẩm: giữ nội dung thật, giữ SEO/schema, giữ brand GiftyTech, nhưng thay các pattern template bằng hệ visual riêng có tính vận hành, có sản phẩm thật, có ảnh/QR/flow/device và có motion có chủ đích.

## Role For Claude

Bạn là senior product designer kiêm frontend engineer. Nhiệm vụ của bạn là đưa GiftyID từ một website đúng chức năng, sạch và SEO tốt lên thành một sản phẩm có trình độ thẩm mỹ cao hơn.

North star:

> GiftyTech là hệ điều hành thương mại địa phương: Zalo Mini App, QR, công đoàn, bưu điện, nhà cung cấp và người mua cùng nằm trên một bản đồ vận hành rõ ràng.

Tên direction:

> Civic Commerce Command System

Bạn phải làm theo thứ tự từng phase. Không làm đại tu toàn site trong một commit. Mỗi phase phải có mục tiêu, file đụng tới, ảnh chụp kiểm tra nếu có UI, và lệnh verify.

## Required Reading Before Code

Đọc các file này trước khi sửa code:

1. `D:\Workspace\A3 Landingpage\agency-toolkit\playbooks\art-direction-pipeline.md`
2. `D:\Workspace\A3 Landingpage\agency-toolkit\playbooks\giftyid-art-elevation.md`
3. `D:\Workspace\A3 Landingpage\agency-toolkit\design-systems\giftytech-art\DESIGN.md`
4. `D:\Workspace\A3 Landingpage\agency-toolkit\design-systems\giftytech-art\USAGE.md`
5. `D:\Workspace\A3 Landingpage\agency-toolkit\skills\art-direction-factory\SKILL.md`
6. Nếu đụng ECard, đọc thêm:
   - `D:\Workspace\A3 Landingpage\agency-toolkit\chassis\ecard-profile-template\README.md`
   - `D:\Workspace\A3 Landingpage\agency-toolkit\chassis\ecard-profile-template\design\visual-system.md`
   - `D:\Workspace\A3 Landingpage\agency-toolkit\chassis\ecard-profile-template\design\gallery-index.md`

Sau đó đọc code hiện tại:

1. `src/app/globals.css`
2. `src/app/page.tsx`
3. `src/components/seo/SolutionLandingPage.tsx`
4. `src/lib/seo-content.ts`
5. `src/components/ecard/Card.tsx`
6. `src/components/layout/Header.tsx`
7. `src/components/layout/CallToAction.tsx`

## Non-Negotiable Rules

- Không xóa nội dung SEO/schema đang có.
- Không copy UI, ảnh, câu chữ hoặc giá từ đối thủ.
- Không dùng purple-blue glow gradient làm mặc định.
- Không dùng beige/cream/paper làm hướng chính cho GiftyID.
- Không biến mọi section thành card grid.
- Không dùng eyebrow all-caps ở mọi section.
- Không để floating CTA che QR, ECard, phone mockup hoặc hero visual.
- Không animate ảnh chỉ vì hover.
- Không dùng animation nếu thiếu reduced-motion fallback.
- Không dùng cùng một ảnh cho OG, hero desktop, hero mobile và poster.
- Không sửa rộng nhiều trang cùng lúc nếu chưa có screenshot trước/sau.

## Codex Art Gate

Claude phải gọi Codex thông qua người dùng ở các điểm cần gu thẩm mỹ, ảnh minh họa hoặc quyết định visual lớn. "Gọi Codex" nghĩa là Claude dừng lại, tạo một handoff ngắn, rồi yêu cầu người dùng gửi handoff đó sang Codex. Claude không tự đi tiếp phần đó cho đến khi nhận được phản hồi hoặc người dùng cho phép bỏ qua gate.

### Khi Nào Bắt Buộc Gọi Codex

Gọi Codex trước khi làm một trong các việc sau:

- Tạo, sửa hoặc chọn ảnh OG.
- Tạo hero visual, mobile hero, poster dọc, square social, banner, cover, NFC mockup.
- Viết prompt tạo ảnh minh họa hoặc prompt image generation.
- Chọn art direction mới cho một route quan trọng.
- Sửa lớn hero/homepage/ECard/profile vì lý do thẩm mỹ.
- Thêm motion nổi bật như QR scan, line draw, device parallax.
- Quyết định dùng ảnh AI thay cho ảnh thật.
- Sau khi chụp screenshot mà Claude thấy trang vẫn "đúng nhưng chưa đẹp".

Không cần gọi Codex cho thay đổi nhỏ như sửa typo, padding nhỏ, bug TypeScript, hoặc đổi link.

### Quy Trình Gate

1. Claude mô tả quyết định thẩm mỹ đang cần.
2. Claude gom context tối thiểu: route, file, ảnh/screenshot nếu có, mục tiêu, ràng buộc.
3. Claude tạo block `CODEX_ART_HANDOFF` theo template bên dưới.
4. Claude nói với người dùng: "Hãy gửi block này sang Codex để lấy art direction/prompt/QA."
5. Sau khi nhận phản hồi từ Codex, Claude áp dụng đúng phần đã được duyệt.
6. Claude ghi lại trong final report: gate nào đã gọi, Codex đề xuất gì, áp dụng gì.

### Codex Handoff Template

```text
CODEX_ART_HANDOFF

Project: GiftyID / GiftyTech
Route or asset:
Files involved:
Current phase:

Goal:

Current state:

Audience:

Brand constraints:
- Direction: Civic Commerce Command System
- Keep teal/navy + amber signal
- Use real product/QR/flow/proof where possible
- Avoid generic SaaS gradient, repeated card grid, decorative orbs

Inputs available:
- Screenshots:
- Existing assets:
- Copy/content:

Decision needed from Codex:
- Art direction:
- Layout/composition:
- Image/OG prompt:
- Mobile crop/safe area:
- Motion guidance:
- QA checklist:

Output format wanted:
- concise recommendation
- asset dimensions
- prompt if image generation is needed
- implementation notes for Claude
END_CODEX_ART_HANDOFF
```

### Điều Codex Sẽ Trả Lại

Codex nên trả một trong bốn kiểu output:

- **Art direction**: hướng bố cục, token, visual hierarchy.
- **Asset brief**: kích thước, safe area, nội dung, prompt ảnh.
- **QA critique**: vấn đề trong screenshot và cách sửa.
- **Implementation notes**: component/file/class nên đổi thế nào.

## Aesthetic Teaching For Claude

### 1. Đẹp hơn không có nghĩa là nhiều hiệu ứng hơn

Nếu bạn định thêm glow, blur, gradient, orb, particle hoặc 3D, hãy hỏi:

- Nó giúp người xem hiểu sản phẩm hơn không?
- Nó làm QR, Mini App, flow hoặc dữ liệu dễ hiểu hơn không?
- Nó có đúng brand GiftyTech không?

Nếu câu trả lời là không, đừng thêm.

### 2. Mỗi section phải có một visual job

Trước khi sửa một section, đặt tên job của nó:

- Hook: kéo người đọc vào.
- Explain: giải thích mô hình.
- Proof: chứng minh bằng ảnh/số liệu.
- Convert: tạo hành động.
- Operate: cho thấy sản phẩm vận hành.

Section nào không có job rõ thường đang là template.

### 3. Thay pattern generic bằng visual form cụ thể

Nếu thấy `eyebrow + heading + paragraph + 3 cards`, hãy quyết định có nên đổi thành:

- Operating map
- Device stage
- Editorial proof spread
- Data story
- Premium profile/card
- QR moment
- Timeline/order lifecycle

Không phải section nào cũng cần đổi. Nhưng mỗi page quan trọng phải có ít nhất một visual form riêng.

### 4. GiftyTech cần "thật"

Ưu tiên:

- Ảnh sự kiện thật.
- UI thật.
- QR thật.
- Số liệu có nguồn.
- Map/flow vận hành thật.

Tránh:

- Icon minh họa chung chung.
- Stock photo mờ.
- Screenshot crop quá tối.
- Mockup quá nhỏ để đọc.

### 5. Amber là tín hiệu, không phải trang trí

Màu amber `#e08a2b` nên dùng cho:

- CTA chính.
- QR scan/check moment.
- Metric quan trọng.
- Active state.

Không rải amber cho mọi icon, mọi badge, mọi border.

## Phase 0: Setup And Baseline

Goal: hiểu hiện trạng và tạo baseline trước khi sửa.

Steps:

1. Kiểm tra branch và dirty state.
2. Nếu chưa có branch phù hợp, tạo branch theo format `codex/art-elevation` hoặc `claude/art-elevation`.
3. Chạy:

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

4. Chạy dev server.
5. Chụp baseline screenshots:
   - `/`
   - `/ecard-vip`
   - `/card`
   - `/website-doanh-nghiep-5-tru-cot`
   - `/mini-app-thuong-hieu-rieng`
   - `/mua-chung-phuc-loi-cong-doan`
6. Viewport tối thiểu:
   - 390x844
   - 768x1024
   - 1440x1000

Deliverable:

- Một note ngắn: trang nào đang generic nhất, trang nào nên làm trước.

Do not code yet.

## Phase 1: Install The Design Contract Into GiftyID

Goal: đưa GiftyTech Art Direction vào repo để các phase sau có nguồn sự thật.

Recommended changes:

1. Tạo `DESIGN.md` ở root `giftyid`, tóm tắt:
   - Civic Commerce Command System.
   - Palette.
   - Layout lanes.
   - Motion rules.
   - Anti-patterns.
2. Cập nhật `src/app/globals.css`:
   - Thêm token ramp `--gt-*` từ `agency-toolkit/design-systems/giftytech-art/tokens.css`.
   - Không xóa token cũ ngay.
   - Map token cũ sang token mới khi an toàn.
3. Thêm motion tokens:
   - `--motion-fast`
   - `--motion-standard`
   - `--motion-story`
   - `--ease-out`
4. Thêm `@media (prefers-reduced-motion: reduce)`.

Files likely touched:

- `DESIGN.md`
- `src/app/globals.css`

Verification:

```bash
npm run lint
npx tsc --noEmit --pretty false
```

Commit:

```bash
git commit -m "design: add giftytech art direction contract"
```

## Phase 2: Create Reusable Visual Components

Goal: tạo component để thay pattern card grid bằng visual form thật.

Build small, reusable components:

1. `OperatingMap`
   - Hiển thị flow: Nguồn hàng -> Zalo Mini App -> Công đoàn/điểm nhận -> Bưu điện/logistics -> Người mua -> QR xác nhận.
   - Desktop có line/connector.
   - Mobile thành list timeline.
   - Amber chỉ dùng cho active/QR node.

2. `ProductStage`
   - Stage cho phone/MacBook hoặc phone-only.
   - Nhận image/UI mockup, title, caption.
   - Không làm device quá nhỏ.
   - Không dùng mockup mờ nếu có screenshot thật.

3. `ProofSpread`
   - Ảnh thật lớn + caption ngày/địa điểm/nguồn + 1-2 fact.
   - Dùng thay card proof lặp.

4. `MetricContext`
   - Số liệu + label + nguồn/caveat.
   - Không dùng số lớn rời rạc thiếu nguồn.

5. `QrMoment`
   - QR tile hoặc QR placeholder có scan/check animation nhẹ.
   - Có reduced-motion fallback.

Suggested folder:

- `src/components/art/OperatingMap.tsx`
- `src/components/art/ProductStage.tsx`
- `src/components/art/ProofSpread.tsx`
- `src/components/art/MetricContext.tsx`
- `src/components/art/QrMoment.tsx`
- `src/components/art/index.ts`

Verification:

```bash
npm run lint
npx tsc --noEmit --pretty false
```

Commit:

```bash
git commit -m "feat: add giftytech art direction components"
```

## Phase 3: Homepage First View And Operating Model

Goal: homepage phải cho thấy GiftyTech là hệ vận hành thật trong viewport đầu.

Target files:

- `src/app/page.tsx`
- new components from Phase 2

What to change:

1. Rework `HeroVisual`.
   - Giữ phone Mini App nếu đang tốt.
   - Thêm operating map hoặc QR/order nodes quanh phone.
   - Giảm decorative glow nếu nó không giúp đọc sản phẩm.
   - Hero phải cho thấy: Mini App + QR + luồng vận hành.

2. Rework `MODEL_STEPS`.
   - Đổi từ list/card đều thành `OperatingMap`.
   - Mobile vẫn đọc dễ.

3. Rework proof section.
   - Dùng `ProofSpread` cho ảnh bưu điện, Quảng Tây, VPSF.
   - Caption phải cụ thể: ảnh gì, bối cảnh gì.

4. Rework context stats.
   - Dùng `MetricContext`.
   - Mỗi số có caveat/source nearby.

Aesthetic target:

- Không giống landing SaaS chung.
- Có cảm giác bản đồ vận hành.
- Có sản phẩm thật và điểm chạm thật.
- Không quá tối nếu người xem là đối tác không kỹ thuật.

Screenshots:

- `/` at 390, 768, 1440.

Verification:

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

Commit:

```bash
git commit -m "feat: elevate homepage operating story"
```

## Phase 4: Solution Landing Variants

Goal: các trang solution không còn giống nhau hoàn toàn.

Target files:

- `src/lib/seo-content.ts`
- `src/components/seo/SolutionLandingPage.tsx`

Add content field:

```ts
visualVariant?: "command" | "product-stage" | "premium-profile" | "editorial-proof";
```

Mapping:

- `ecard-vip`: `premium-profile`
- `mini-app-thuong-hieu-rieng`: `product-stage`
- `website-doanh-nghiep-5-tru-cot`: `product-stage`
- `mua-chung-phuc-loi-cong-doan`: `command`
- `cho-z`: `command`
- `marketing-da-kenh`: `editorial-proof` or default

Implementation:

- Do not fork the whole component.
- Create small variant renderers inside or near `SolutionLandingPage`.
- Keep schema/content unchanged.
- Hero visual should change by variant:
  - command: flow/operating map
  - product-stage: device mockup
  - premium-profile: large ECard/QR visual
  - editorial-proof: image/proof-led layout

Screenshots:

- `/ecard-vip`
- `/website-doanh-nghiep-5-tru-cot`
- `/mini-app-thuong-hieu-rieng`
- `/mua-chung-phuc-loi-cong-doan`

Verification:

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

Commit:

```bash
git commit -m "feat: add visual variants for solution pages"
```

## Phase 5: ECard Premium Polish

Goal: ECard trở thành sản phẩm cao cấp, không chỉ là trang profile đúng chức năng.

Read again:

- `agency-toolkit/chassis/ecard-profile-template/design/visual-system.md`
- `agency-toolkit/chassis/ecard-profile-template/design/gallery-index.md`

Target files:

- `src/app/ecard-vip/page.tsx`
- `src/lib/seo-content.ts`
- `src/components/seo/SolutionLandingPage.tsx`
- `src/components/ecard/Card.tsx`
- `src/app/card/page.tsx`
- `src/app/card/[slug]/page.tsx`

Tasks:

1. Keep OG `1200x630` separate from hero.
2. Add or prepare asset roles:
   - `public/ecard/hero-desktop.png`
   - `public/ecard/hero-mobile.png`
   - `public/ecard/og-vip.png`
   - `public/ecard/nfc-mockup.png`
3. If assets are not ready, create placeholders via CSS/device stage, not broken images.
4. Ensure `/ecard-vip` hero image is readable on mobile.
5. Improve `/card` profile:
   - action icons clear
   - QR visible
   - sticky actions not covering content
   - social and links scan well
6. Add optional NFC section to ECard landing if content supports it.

Screenshots:

- `/ecard-vip` at 390 and 1440.
- `/card` at 390 and 1440.

Verification:

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

Commit:

```bash
git commit -m "feat: polish ecard premium experience"
```

## Phase 6: Social Asset System

Goal: mỗi sản phẩm quan trọng có asset đúng kênh.

Create convention:

```text
public/social/og-{slug}.png
public/social/poster-{slug}.png
public/social/square-{slug}.png
public/product/device-{slug}.png
public/ecard/cover-{slug}.jpg
public/ecard/qr-{slug}.svg
```

Do not generate final AI assets unless asked. Instead:

1. Add `docs/social-asset-manifest.md`.
2. List needed assets by page.
3. Before writing any final prompt or asset brief, use **Codex Art Gate** and ask Codex to review the art direction, dimensions, safe areas and prompt quality.
4. Add prompts based on:
   - `ecard-profile-template/design/asset-prompts.md`
   - `art-direction-pipeline.md`
5. Point current metadata to existing safe images until final assets exist.

Important:

- OG: `1200x630`.
- Poster: `1080x1920`.
- Square: `1080x1080`.
- Mobile hero: `1080x1350` or `1080x1080`.

Verification:

```bash
npm run lint
npx tsc --noEmit --pretty false
```

Commit:

```bash
git commit -m "docs: add social asset system for giftytech"
```

## Phase 7: Motion System

Goal: motion feels like product behavior, not decoration.

Add:

- QR scan/check.
- Operating map line draw.
- Device stage entrance.
- Button/action press.
- Status transition.

Before adding QR scan, line draw, device parallax or any signature motion, use **Codex Art Gate** if the motion affects a hero, ECard, OG/asset preview, or first viewport.

Rules:

- Use CSS first.
- Animate `transform`, `opacity`, stroke-dashoffset if SVG.
- Do not animate layout properties.
- No endless loops except subtle QR scan, and it must pause/reduce with reduced motion.
- No custom cursor.
- No particles.

Target:

- `src/app/globals.css`
- component files from Phase 2

Verification:

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

Screenshots or video:

- capture before/after if tool available.

Commit:

```bash
git commit -m "feat: add purposeful motion system"
```

## Phase 8: Final Impeccable Pass

Goal: remove AI-tell and harden the site.

Audit for:

- repeated eyebrow sections
- identical card grids
- nested cards
- border + huge shadow on same element
- radius overuse
- tiny text
- text overflow
- weak contrast
- generic copy
- mobile overlap
- CTA covering product visuals

Pages:

- `/`
- `/ecard-vip`
- `/card`
- `/website-doanh-nghiep-5-tru-cot`
- `/mini-app-thuong-hieu-rieng`
- `/mua-chung-phuc-loi-cong-doan`

Run:

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

Commit:

```bash
git commit -m "chore: harden giftytech visual polish"
```

## Final Delivery Format

When finished, report:

1. Branch and commits.
2. Pages changed.
3. Visual direction applied.
4. Components added.
5. Assets added or asset manifest created.
6. Screenshots captured.
7. Codex Art Gates used: what was handed off, what Codex recommended, what was applied.
8. Verification commands and results.
9. Remaining design backlog.

## Suggested Claude Opening Prompt

Paste this to Claude:

```text
You are working in D:\Workspace\A3 Landingpage\projects\giftyid.

Your job is to implement the GiftyID art elevation plan one phase at a time. Before coding, read:

- D:\Workspace\A3 Landingpage\agency-toolkit\playbooks\claude-giftyid-art-implementation-plan.md
- D:\Workspace\A3 Landingpage\agency-toolkit\playbooks\art-direction-pipeline.md
- D:\Workspace\A3 Landingpage\agency-toolkit\playbooks\giftyid-art-elevation.md
- D:\Workspace\A3 Landingpage\agency-toolkit\design-systems\giftytech-art\DESIGN.md
- D:\Workspace\A3 Landingpage\agency-toolkit\design-systems\giftytech-art\USAGE.md

Follow the phase order. Do not redesign everything at once. Start with Phase 0, then wait/report before Phase 1 unless I approve continuing. Preserve SEO/schema/content. The visual direction is Civic Commerce Command System: real product, real QR, real flow, real proof, no generic SaaS decoration.

Important collaboration rule: whenever you need to create or choose OG images, hero visuals, poster/social assets, ECard/NFC mockups, major art direction, or signature motion, stop and produce a CODEX_ART_HANDOFF block from the plan. Ask me to send it to Codex. Do not continue that asset/aesthetic decision until Codex responds or I explicitly approve skipping the gate.
```
