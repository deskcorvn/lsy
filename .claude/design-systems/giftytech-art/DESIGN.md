# GiftyTech Art Direction System

Design contract đề xuất cho GiftyID/GiftyTech sau khi rà các kho `impeccable`, `open-design`, `frontend-design`, `taste-skill` và code hiện tại.

## Creative North Star

**Civic Commerce Command System**

GiftyTech là hạ tầng thương mại địa phương chạy qua Zalo Mini App, QR, công đoàn, bưu điện, nhà cung cấp và người mua. Giao diện nên cho cảm giác một hệ điều hành vận hành thật: rõ tuyến, rõ dữ liệu, rõ điểm chạm, có niềm tin địa phương, không phải SaaS trang trí.

Một câu kiểm tra:

> Người xem phải hiểu rằng đây là sản phẩm đang chạy ngoài đời, không chỉ là landing page công nghệ.

## Visual Posture

- Tin cậy trước, đẹp sau.
- Sản phẩm thật trước, hiệu ứng sau.
- Dữ liệu có nguồn trước, số lớn sau.
- Bản đồ/luồng vận hành trước, icon-card sau.

## Palette

Giữ nhận diện hiện tại nhưng nâng thành ramp:

```css
:root {
  --gt-bg: #fcfcfd;
  --gt-surface: #f4f6f9;
  --gt-surface-strong: #e8edf3;
  --gt-ink: #16263d;
  --gt-ink-soft: #24364d;
  --gt-muted: #69748a;
  --gt-line: #dce6ef;

  --gt-primary: #1e5f86;
  --gt-primary-dark: #14263b;
  --gt-primary-deep: #0b2035;
  --gt-primary-light: #2b7aa6;

  --gt-accent: #e08a2b;
  --gt-accent-dark: #c9781f;
  --gt-accent-soft: #fff3e2;

  --gt-success: #1f8a5b;
  --gt-danger: #c23b3b;
}
```

Usage:

- `--gt-primary-dark`: hero/command sections.
- `--gt-primary`: links, icon accents, active states.
- `--gt-accent`: primary CTA, QR/scan/action signals, important metrics.
- `--gt-accent-soft`: light callouts, not full page background.
- `--gt-line`: dividers and data grid, not heavy borders everywhere.

Avoid:

- Purple-blue AI gradients.
- Beige/cream as default warmth.
- Too many amber badges.
- Pure black backgrounds.

## Typography

Vietnamese readability matters more than exotic fonts.

Recommended:

- Display: Be Vietnam Pro or a high-quality Vietnamese-capable sans.
- Body: Lexend, Be Vietnam Pro, or system Vietnamese fallback.
- Mono/data: JetBrains Mono or ui-monospace for QR/order/status labels.

Rules:

- Hero max: 64-80px desktop, 40-48px mobile.
- Body line length: 65-75ch.
- Use `text-wrap: balance` for headings.
- Avoid all-caps body copy.
- Eyebrows: not every section. Use sparingly or replace with source labels.

## Layout Archetypes

### Command Hero

For homepage, Chợ Z, mua chung, QR:

- Left/bottom: strong claim and CTA.
- Main visual: flow map, phone Mini App, QR node.
- Secondary: source-backed context metrics.
- Background: navy surface with functional grid/line, not decorative bokeh.

### Product Stage

For Mini App, Website 5 trụ cột, ECard:

- Device mockup with real UI.
- No blurred/cropped fake screenshots.
- Include state labels: order, QR confirmation, profile, search/citation.

### Editorial Proof Spread

For events, partner proof, case study:

- Large real photo.
- Caption with date/place/source.
- Side panel with 1-2 facts.
- No repeated card grid.

### Data Story

For stats and operations:

- Use chart/flow/map when relationships matter.
- Use metric cards only when the metric stands alone.
- Every external number needs source/caveat.

### Premium Profile

For ECard:

- Profile/card mockup large.
- QR readable.
- Avatar and cover clear.
- No tiny text in hero.
- OG, hero and mobile hero are separate assets.

## Component Rules

- Buttons: one primary action per visual group.
- Cards: use for entities, pricing, repeated items. Do not make whole sections into floating cards.
- Tables: sticky header if long, numbers right aligned.
- Forms: labels visible, single column on mobile.
- Badges: 1-2 words, limited palette.
- Floating CTA: never cover QR, product mockup, or sticky action bar.

## Motion

Motion language:

- Fast control feedback: 140-180ms.
- Standard UI transitions: 200-240ms.
- Story/diagram reveals: 360-480ms.
- Easing: ease-out quart/quint, no bounce/elastic.

Allowed signature motions:

- QR scan line.
- Diagram path draw.
- Device stage parallax under 8px.
- Button press/active feedback.
- Status change checkmark.

Always add reduced-motion fallback.

## Asset System

Required asset roles:

- OG `1200x630`.
- Hero desktop.
- Hero mobile.
- Vertical poster `1080x1920`.
- Square social `1080x1080`.
- Device mockup.
- QR/NFC print.
- Editorial proof photo.

Naming:

- `public/social/og-{slug}.png`
- `public/social/poster-{slug}.png`
- `public/product/device-{slug}.png`
- `public/ecard/cover-{slug}.jpg`
- `public/ecard/qr-{slug}.svg`

## Signature Moves

Use 2-3 across the product:

1. **Operating Map**: visual route from source goods to Zalo to union pickup to QR confirmation.
2. **QR Moment**: QR tile with scan/check action as a recurring motif.
3. **Device Stage**: phone/MacBook presenting real Mini App/Profile UI.
4. **Proof Caption**: real photos with source/date captions, editorial confidence.
5. **Amber Telemetry**: important operational facts glow in amber, not every decoration.

## Anti-Patterns

- Same eyebrow-heading-card rhythm on every section.
- Equal 3-card feature rows repeated across pages.
- Heavy rounded cards with border and wide shadow.
- Icon-only proof when screenshot/diagram would be clearer.
- Animated image hover just because it can move.
- Tiny QR or QR on dark/gradient background.
- Copy that says "chuyển đổi số toàn diện" without naming the actual workflow.

## Page-Specific Guidance

Homepage:

- Make the hero an operating system, not a brochure.
- Put real product/flow in the first viewport.

ECard:

- Keep premium profile/card direction.
- Separate OG/hero/mobile/cover.
- Hide site floating CTA when it covers QR/profile.

Website 5 Trụ Cột:

- Use product-stage: search result, schema, llms.txt, AI citation, conversion path.
- Avoid abstract SEO icons only.

Mua Chung/Công Đoàn:

- Use civic command flow and proof editorial.
- Show order lifecycle and pickup confirmation.

Mini App:

- Use device stage with real screens.
- Show Zalo entry and admin/operation state.

## QA

Before shipping:

- Mobile screenshots at 390px.
- Desktop screenshots at 1440px.
- Contrast check body and CTA.
- Text overflow check.
- OG preview at `300x158`.
- Reduced motion check.
- QR scan if QR visible.
- Build/lint/typecheck pass.

