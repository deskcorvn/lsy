# STYLE_PROMPT: LSY landing

```yaml
project:
  name: "Máy lọc nước LSY"
  page: "landing"
  stack: "Next.js App Router, Tailwind 4, chassis config-driven"
business:
  primary_action: "Gửi biểu mẫu để LSY liên hệ tư vấn"
  proof:
    - "Thương hiệu Máy lọc nước LSY xuất hiện trong hồ sơ sản phẩm iCheck"
    - "Pháp nhân mã số thuế 0801321580 hoạt động từ 2020-04-21"
audience:
  role: "Người mua máy lọc nước cho gia đình tại Việt Nam"
  decision: "Có nên để LSY liên hệ trao đổi mẫu máy và phương án lắp đặt hay không"
brand:
  posture: "precise"
  three_traits: ["sạch", "thật", "dễ hỏi"]
  assets_available:
    - "logo LSY gốc từ ứng dụng ghép nối"
    - "ảnh máy công khai trong banner LSY"
    - "visual sản phẩm trong bếp được dựng từ ảnh máy tham chiếu"
references:
  keep_as_principles:
    - "màu xanh giọt nước là tín hiệu thương hiệu chính"
    - "sản phẩm thật là điểm nhìn, khoảng trắng giữ vai trò giải thích"
  forbidden_to_copy:
    - "copy của đối thủ"
    - "thông số chưa xác thực"
    - "asset ngoài nguồn LSY"
    - "bố cục fingerprint của website khác"
motion:
  intensity: "1"
  signature_move: "Button press feedback"
constraints:
  breakpoints: [390, 768, 1440]
  reduced_motion: true
```

Build a production-ready landing page for Máy lọc nước LSY using the existing config-driven chassis.

## Outcome

The page helps a household buyer decide whether to leave contact information for a product and installation consultation. Use only the supplied brand assets, public registry facts and locally implemented platform capabilities. Do not invent specifications or health claims.

## Creative premise

Create the physical feeling of a clean family kitchen in morning light, with the water purifier present but not oversized. The posture is clean, factual and easy to approach. The interface should feel like a water-care brand, not a generic software landing page.

## Visual system

- White is the main canvas. Aqua blue identifies LSY. Deep red appears only as a product-derived accent.
- Use a restrained Swiss sans-serif hierarchy for quick reading.
- Use thin borders, minimal depth and small corner radii.
- Keep one dominant focal point per viewport. Avoid decorative gradients and glass effects.
- Use the existing profile tokens. Do not hardcode a second theme.

## Page choreography

1. Hero: state the product category, the consultation outcome and one primary action.
2. Support process: show the three decisions a buyer needs before installation.
3. About: establish the organization and the connected after-install platform.
4. FAQ: answer purchase and support questions in plain language.
5. Product visual CTA: pair the reference-based machine image with the contact action.
6. Contact details and form: make phone and lead submission obvious.

## Motion direction

- Keep only the chassis button press feedback for action confirmation.
- Do not add decorative looping motion, parallax, marquees or scroll hijacking.
- Preserve the existing reduced-motion behavior.

## Responsive behavior

- 390px: one-column reading order, full-width actions, product visual cropped without hiding the main machine.
- 768px: maintain one clear text column and three support cards in the chassis breakpoint pattern.
- 1440px: generous white space, readable line lengths and the product visual kept to the decision CTA.
- Declare media dimensions through the existing Next.js Image components.

## Anti-patterns

- No medical claims, fabricated certifications, invented prices or anonymous testimonials.
- No gradient text, purple glow, glass cards, emoji icons or repeated decorative pills.
- No duplicate actions competing with the lead form.

## Deliverable

Configure only `client.config.ts`, `content.config.ts` and assets under `public/`. Keep `src/` unchanged. Completion requires `pnpm verify` to exit successfully and visual QA at 390, 768 and 1440 pixels.
