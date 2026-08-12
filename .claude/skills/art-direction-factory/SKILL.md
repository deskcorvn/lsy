# Art Direction Factory

Use this skill when the user asks to improve, redesign, polish, audit, elevate, art-direct, or make a website/product UI more beautiful, premium, artistic, memorable, or less template-like. Especially use it for GiftyID/GiftyTech surfaces and for work that references Impeccable, Open Design, Taste Skill, UI Design Brain, visual systems, OG images, hero sections, motion, diagrams, or product mockups.

## Required Reading

Before acting, read:

- `playbooks/art-direction-pipeline.md`
- `playbooks/giftyid-art-elevation.md` when the target is GiftyID/GiftyTech.
- `design-systems/giftytech-art/DESIGN.md` when the target is GiftyID/GiftyTech.
- `design-systems/giftytech-art/USAGE.md` when the target is GiftyID/GiftyTech.
- `chassis/ecard-profile-template/design/visual-system.md` when the target is ECard.
- `chassis/ecard-profile-template/design/gallery-index.md` when the target is ECard or profile/social assets.

## Operating Rules

1. Inspect the existing product before proposing changes. Read CSS/tokens and at least one representative page/component.
2. Define a north star before editing:
   - audience
   - product goal
   - density
   - motion tone
   - asset needs
   - explicit anti-patterns
3. Choose one primary direction. Do not mix many aesthetics.
4. Prefer real product visuals, diagrams, photos, QR, screenshots and device mockups over abstract decoration.
5. Replace at least one generic section pattern with a more specific visual form when doing a redesign:
   - flow map
   - product stage
   - editorial proof spread
   - data story
   - premium profile
6. Keep accessibility and production constraints:
   - body contrast >= 4.5:1
   - mobile no overflow
   - reduced motion fallback
   - no nested cards
   - no decorative gradient text
   - no floating controls covering product/QR
7. Do not copy external repo UI, text, images, or prices. Port patterns and principles only.

## GiftyID Default Direction

Use `Civic Commerce Command System` unless the user requests another direction.

Default lanes:

- Homepage: `command-hero` + `data-story`.
- ECard: `premium-profile` + `product-stage`.
- Mini App: `product-stage`.
- Mua chung/Chợ Z: `command-hero` + `editorial-proof`.
- Website 5 trụ cột: `product-stage` + `data-story`.

## Deliverables

Depending on the task, produce one or more:

- art direction audit
- redesign backlog
- updated design tokens
- implementation patch
- OG/hero/poster asset brief
- motion plan
- QA checklist
- before/after notes

## Definition Of Done

- The recommendation names concrete files/routes/components.
- The design direction is specific enough to reject wrong choices.
- The proposed changes are feasible in the existing stack.
- The work preserves brand identity and business clarity.
- Verification commands or screenshot QA are listed.

