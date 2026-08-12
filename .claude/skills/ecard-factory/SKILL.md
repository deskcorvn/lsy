# ECard Factory

Use this skill when the user asks to build, clone, package, analyze, or expand an electronic business card / ECard / BioLink product, especially when the work includes landing pages, `/card` profiles, QR, vCard, NFC, OG images, profile banners, or team cards.

## Required Reading

Before acting, read:

- `chassis/ecard-profile-template/README.md`
- `chassis/ecard-profile-template/CLONE-CHECKLIST.md`
- `chassis/ecard-profile-template/templates/content-blueprint.md`
- `chassis/ecard-profile-template/design/visual-system.md`
- `chassis/ecard-profile-template/design/asset-prompts.md`
- `chassis/ecard-profile-template/design/gallery-index.md`
- `playbooks/ecard-factory.md`

## Operating Rules

1. Separate product layers:
   - landing page
   - profile runtime
   - data/admin
   - assets
   - tracking/growth

2. Separate image roles:
   - OG share image `1200x630`
   - landing hero visual
   - mobile hero visual
   - profile cover/banner
   - QR/NFC print asset

3. Do not copy competitor pricing or wording. Use competitor pages only as feature references and rewrite for the client's positioning.

4. Prioritize QR, vCard, share, Zalo/contact actions, social links, map, and OG metadata before advanced features.

5. For business/team cards, keep slugs stable because QR/NFC depends on permanent URLs.

6. Hide or relocate global floating CTAs if they cover profile previews or QR areas.

7. Verify on mobile and desktop. For visual changes, check whether text/QR remain readable at realistic preview sizes.

## Recommended Deliverables

- Landing route such as `/ecard-vip`.
- Profile route such as `/card` and optionally `/card/[slug]`.
- vCard routes.
- QR generation.
- OG image and metadata.
- Landing sections: hero, problem, comparison, workflow, package, benefits, FAQ, related links.
- Asset brief/prompt saved with the project.
- QA notes and commands run.

## Definition Of Done

- Landing explains the offer clearly without copying market references.
- Profile can be shared, scanned, and saved to contacts.
- OG preview is not inherited from homepage.
- QR is large enough and scannable.
- Mobile layout has no overlapping text/buttons.
- `lint`, typecheck, and production build pass where available.
