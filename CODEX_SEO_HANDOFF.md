# CODEX_SEO_HANDOFF: LSY landing, 2026-08-19

## Gate status

Codex decision: approve the launch baseline below. This gate covers the current homepage metadata,
canonical host and initial keyword target. It does not claim ranking, traffic or search volume.

## Live baseline

- `https://www.lsy.vn/` currently returns `200`.
- `https://lsy.vn/` currently redirects `308` to `https://www.lsy.vn/`.
- The live page exposes one H1, the title `Máy lọc nước LSY | Thông tin sản phẩm và hỗ trợ`, a
  canonical link, `robots.txt`, `sitemap.xml`, `llms.txt` and `llms-full.txt`.
- The source config now uses `www.lsy.vn` so generated canonical, sitemap and JSON-LD point to the
  final non-redirecting host after the next deployment.

## Keyword decision

### 1. Primary keyword — `máy lọc nước LSY`

- A. `máy lọc nước LSY` — exact product/brand phrase already used by the live H1 and title; it is
  also the title of the public iCheck product record.
- B. `máy lọc nước gia đình LSY` — clearer household intent, but not the public product name.
- C. `máy lọc nước thông minh LSY` — appears in an older recruitment listing, but the owner has not
  supplied a current product source for the “thông minh” positioning.

Codex decision: approve A. Keep B as a supporting phrase in explanatory copy. Do not target C until
the owner supplies a current product source.

### 2. Supporting phrases — descriptive only for this launch

- `máy lọc nước gia đình`
- `tư vấn máy lọc nước`
- `lắp đặt máy lọc nước`

These phrases describe the existing page sections and buyer questions. There is no Search Console
baseline or verified search-volume dataset in the repo, so no volume, difficulty or ranking forecast
is recorded here.

## Sources and constraints

- Public product naming: https://icheck.vn/san-pham/may-loc-nuoc-lsy-8938535347005
- Current public deployment checked on 2026-08-19: https://www.lsy.vn/
- Do not add specifications, health outcomes, certifications, pricing or ranking claims without an
  owner-supplied source.
- The homepage URL is not being changed; no redirect migration is required beyond keeping the
  canonical host aligned with the existing Vercel redirect.

## QA after deployment

- Run `pnpm verify`.
- Confirm `https://www.lsy.vn/` returns `200` and its canonical is `https://www.lsy.vn/`.
- Confirm `https://lsy.vn/` continues to redirect to the same canonical host.
- Capture a Search Console baseline after the deployment is crawled; update this handoff before any
  title, H1, slug or keyword-target change.
