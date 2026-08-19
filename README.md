# catalog-site-template

> ✅ **BẢN NÀY LÀ CANONICAL — sửa ở đây.** (Chủ repo chốt 16/07/2026.)
>
> Lý do chọn: nó nằm trong `agency-toolkit` nên **có remote** (`deskcorvn/agency-toolkit`), có CI, có
> `verify-toolkit.mjs` gác. Bản kia chỉ tồn tại trên một máy — mất máy là mất.
>
> **Đã nâng lên ngang bản sống ngày 16/07/2026** (sync từ `6c6a960`, 2026-07-06 — 118 file):
> nay có `.claude/skills/` (design-artwork · design-craft · design-ecard · design-motion ·
> design-system — mỗi clone tự mang tay nghề), `catalog.config.ts`, module ECard, 10 section
> component, và preflight **14 cổng** (trước đó 12).
> Sync **có chọn lọc**: giữ lại `WORKFLOW.md` · `README.md` · `AGENTS.md` · `CLONE-CHECKLIST.md` ·
> `STYLE_PROMPT.template.md` của bản này, vì chúng có **4 cổng Codex** mà bản kia không có.
>
> ⚠️ `D:\Workspace\A3 Landingpage\catalog-site-template` giờ là **BẢN CŨ** — đừng sửa nó nữa, đừng
> clone từ nó. Giữ lại làm lịch sử, không xoá. Mọi thay đổi chassis từ nay làm ở đây rồi push.

> **Vai trò của tôi: giới thiệu 60 giây.** Luật cho AI ở `AGENTS.md` (nguồn-sự-thật) ·
> quy trình vận hành đầy đủ ở `WORKFLOW.md` · checklist tick khi làm ở `CLONE-CHECKLIST.md`.
> 5 bước dưới là bản rút gọn của **4 bước lõi** (`AGENTS.md`) — mâu thuẫn thì `AGENTS.md` thắng.

Template website catalog (sản phẩm + dịch vụ) lấy dữ liệu từ Medusa (BE-GiftyID), gắn sẵn SEO/AEO/GEO, deploy Vercel. Mỗi khách = 1 bản sao repo này + 1 publishable key.

## Nhân bản nhanh
1. `npx degit <repo-template> ten-khach`
2. Sửa **`client.config.ts`** (brand, domain, theme, nav) — nguồn-sự-thật duy nhất.
3. Tạo `.env` từ `.env.example` (MEDUSA_URL + publishable key của khách).
4. `pnpm install && pnpm preflight` (cổng kiểm tra) → `pnpm build`.
5. Deploy lên Vercel của khách → gắn domain → khai webhook revalidate trong Medusa.

## Guardrails (chống sót / không phải sửa lại)
- `client.config.ts` + `src/env.ts`: **Zod validate** → cấu hình sai/thiếu là build FAIL ngay.
- `pnpm preflight` (**đã có, 14 cổng**): đúng 1 `<h1>` (chỉ ở `Hero.tsx`) · JSON-LD `Organization`+`WebSite` · hết placeholder · có `logo.svg`/`og.png` · **trang chủ có `contactForm`** (cổng #10) · có `/api/contact` · không `<details>` gập (AEO) · mọi `<img>` có `alt` · anchor sống · section không hardcode màu slate. *(Không ping Medusa — landing content-only không cần.)*
- vitest (**đã có, 11 file**): `jsonld` · `sitemap-robots` · `content.schema` · `config.invariant` · `geo` · `aio-quality` · `contact-api` · `tenant` · `builder` · `design-direction` · `design-profile`. *(Product JSON-LD/sitemap sản phẩm là phần Medusa — xem M1/M2 dưới.)*
- CI (**đã có**): `.github/workflows/ci.yml` chạy `pnpm verify` + Placeholder gate + AI-content phrase gate; `approval-gate` bắt buộc playbook/skill và handoff đã duyệt cho ART/COPY/SEO/GEO; `lighthouse.yml` chạy trên PR (SEO + CLS chặn cứng, performance/LCP vẫn cảnh báo theo baseline).
- **Cổng người duyệt** (máy không bắt được): ART · COPY · SEO · GEO — xem `AGENTS.md` + `.claude/playbooks/codex-gates.md`.

## Trạng thái

> Đo lại từ đĩa 2026-07-16 (mốc → artifact bắt buộc). Bảng cũ tick sai: M3/M5/M6 **đã xong từ lâu** mà vẫn để `[ ]`,
> khiến người mới tưởng "template mới là scaffold, SEO/JSON-LD/sitemap chưa có" rồi đi **viết lại thứ đã tồn tại**
> (+ vi phạm quy tắc vàng "KHÔNG sửa `src/`").

**Đã xong — dùng được ngay, ĐỪNG viết lại:**
- [x] **M0** — scaffold Next 16 + TS + Tailwind 4 + config/env (Zod) · `next.config.ts` · `src/env.ts`
- [x] **M3** — SEO/AEO/GEO: `src/app/sitemap.ts` · `robots.ts` · `llms.txt` + `llms-full.txt` · JSON-LD (`src/lib/jsonld.ts`, `src/components/seo/JsonLd.tsx`, `src/lib/seo/schema.ts`) · **`scripts/geo-audit.mjs`** (3 lớp/12 điểm) · `scripts/citation-audit.mjs`
- [x] **M5** — CI + guardrails: `.github/workflows/ci.yml` (+ `lighthouse.yml`) · `scripts/preflight.mjs` **14 cổng** · `scripts/approval-gate.mjs` · `tests/` · `pnpm verify` = typecheck+build+preflight+test+approval-gate
- [x] **M6** — generator: `scripts/setup.mjs` · `scripts/make-og.mjs` · `scripts/generate.mjs` (AIO) · `scripts/design-direction.mjs`

**Tuỳ chọn — CHỈ bật khi khách dùng catalog Medusa (không phải "chưa làm", site content-only không cần):**
- [ ] **M1** — data layer Medusa (server-side fetch). *Hiện có:* `src/env.ts` đã khai `MEDUSA_URL`/`MEDUSA_PUBLISHABLE_KEY`/`REVALIDATE_SECRET`. *Chưa có:* `src/lib/medusa.ts`.
- [ ] **M2** — trang list/detail/category (SSG/ISR). *Chưa có route sản phẩm* (`src/app/` hiện có `/`, `/s/[slug]`, `/builder`, `/api/*`).
- [ ] **M4** — `/api/revalidate` + subscriber Medusa. *Chưa có* `src/app/api/revalidate/route.ts` (`REVALIDATE_SECRET` đã khai sẵn trong `env.ts`).

> **Luồng đang chạy thật là landing content-only** (M0+M3+M5+M6) — `pnpm verify` xanh **không cần** Medusa.
> Ba mốc M1/M2/M4 là **kho dự phòng, chưa kích hoạt**.
> ⚠️ `src/env.ts` parse `MEDUSA_URL`/`MEDUSA_PUBLISHABLE_KEY`/`REVALIDATE_SECRET` là **bắt buộc** — site content-only vẫn phải set `.env` (xem `.env.example`).
