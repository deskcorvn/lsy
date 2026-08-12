# WORKFLOW — Nhân bản & vận hành site (GiftyTech)

> **Vai trò của tôi:** quy trình **vận hành cho Sales + Dev + Admin** — 7 bước lõi (§2) nằm trong 11 bước vận hành (§3).
> Tôi KHÔNG phải luật cho AI. AI tuân `AGENTS.md`.

> Quy trình chuẩn để **nhân bản 1 website khách** từ `catalog-site-template`
> (Next.js, config-driven, Zod guardrails, SEO/AEO/GEO tích hợp) — từ **chốt khách → LIVE trên Vercel**.
>
> **Quy tắc vàng:** khi nhân bản chỉ sửa **`client.config.ts` + `content.config.ts` + `public/`** — **KHÔNG** sửa `src/`.
> Mọi sai sót bị chặn trước production bởi **Zod + preflight + vitest + CI**.

### Đọc file nào? (4 tài liệu vào cửa)

| File | Vai trò | Số bước | Dành cho |
|---|---|---|---|
| **`AGENTS.md`** | **LUẬT CHO AI — nguồn-sự-thật.** Thứ duy nhất AI phải tuân. | **4 bước lõi** | AI/agent |
| `README.md` | Giới thiệu 60 giây — template này là gì | 5 bước rút gọn | người mới ghé |
| `WORKFLOW.md` (file này) | Quy trình vận hành đầy đủ | 7 bước lõi trong 11 bước vận hành | Sales · Dev · Admin |
| `CLONE-CHECKLIST.md` | Checklist tick khi thật sự làm | 6 mục tick | người đang clone |

**4 / 5 / 7 / 11 KHÔNG mâu thuẫn** — đó là bốn mức phóng đại của cùng một quy trình:
4 bước lõi (sửa config) ⊂ 7 bước lõi (thêm repo + verify + deploy) ⊂ 11 bước vận hành (thêm chốt khách,
domain, handover, maintenance — việc của Sales/Admin, **AI không tự làm**).
Mâu thuẫn thật thì `AGENTS.md` thắng.

---

## Mục lục

1. [Tóm tắt nhanh (TL;DR)](#1-tóm-tắt-nhanh-tldr)
2. [Số bước chính xác — hiện tại vs end-state](#2-số-bước-chính-xác--hiện-tại-vs-end-state)
3. [Quy trình nhân bản hoàn chỉnh (11 bước, có cổng)](#3-quy-trình-nhân-bản-hoàn-chỉnh-11-bước-có-cổng)
4. [UI tiến độ — lựa chọn & khuyến nghị](#4-ui-tiến-độ--lựa-chọn--khuyến-nghị)
5. [Bot thông báo — lựa chọn, khuyến nghị & wiring](#5-bot-thông-báo--lựa-chọn-khuyến-nghị--wiring)
6. [Phụ lục — schema section, cổng kiểm, checklist cuối](#6-phụ-lục)

---

## 1. Tóm tắt nhanh (TL;DR)

| Hạng mục | Kết luận |
|---|---|
| **Số bước nhân bản 1 site** | **7 bước** (xem §2). GEO/AEO audit nằm trong `pnpm verify`, không phải bước riêng. |
| **Thao tác người — hiện tại** | ~6 thao tác (gõ config, điền content, thay assets, verify+sửa, deploy+domain). |
| **Thao tác người — end-state** | ~3 thao tác (1 lệnh tạo repo → `setup.mjs` + AI điền content → push, CI+Vercel tự lo). |
| **Còn thiếu để đạt end-state** | (a) generator/AI sinh luôn `content.config.ts`; (b) Vercel Git auto-deploy thay deploy tay. |
| **UI tiến độ — khuyến nghị** | **Derive-from-source** (`factory-dashboard/`) — quét `projects/*`, suy ra trạng thái 7 stage, không cần DB. |
| **Bot — khuyến nghị** | **Telegram** (BotFather, 1 token + chat_id, no-op an toàn khi thiếu env). |

---

## 2. Số bước chính xác — hiện tại vs end-state

**Nguồn:** `CLONE-CHECKLIST.md`, `AGENTS.md`, `scripts/setup.mjs`, `scripts/preflight.mjs`, `package.json`, `.github/workflows/ci.yml`.

### Tổng: **7 bước**

| # | Bước | Loại | HIỆN TẠI (thủ công) | END-STATE (generator + CI + Vercel Git) |
|---|------|------|---------------------|-----------------------------------------|
| 1 | **Tạo repo** từ template: `npx degit <template> ten-khach && cd ten-khach` | đã-tự-động (1 lệnh) | 1 lệnh | 1 lệnh |
| 2 | **`client.config.ts`** — brand, theme, contact, social, nav, logo · **cổng: Zod + GEO GATE nếu có `taxId`/`legalName` thật** | thủ công / AI / **đã-tự-động** | gõ tay | `node scripts/setup.mjs` hỏi-đáp → tự ghi config + `logo.svg` + `og.png` |
| 3 | **`content.config.ts`** — nội dung các section (1 hero ở index 0, id không trùng, hết placeholder) | thủ công / AI | điền tay từ fixture `content.config.bni.ts` | AI điền (Zod + preflight bắt lỗi) |
| 4 | **Assets**: `public/logo.svg` + `public/og.png` | đã-tự-động / thủ công | gõ + `scripts/make-og.mjs` | `setup.mjs` đã sinh sẵn ở bước 2 |
| 5 | **`pnpm install && pnpm verify`** (typecheck + build + preflight + test) | đã-tự-động (script/CI) | chạy lệnh, sửa tới khi exit 0 | CI tự chạy mỗi push |
| 6 | **GEO/AEO + nội dung audit** (1 `<h1>`, JSON-LD `Organization`+`WebSite`, sitemap≠rỗng, robots không chặn nhầm, hết «CẦN ĐIỀN») | đã-tự-động (preflight + vitest + CI grep) | **nằm TRONG `verify` ở bước 5** | gate tự động, không thao tác |
| 7 | **Deploy Vercel** (tài khoản khách) + gắn domain | thủ công | bấm tay trên Vercel | Vercel Git-import: tự deploy mỗi push (gắn domain 1 lần) |

### Ghi chú quan trọng

- **Bước 6 KHÔNG phải bước riêng trong checklist** — repo gộp toàn bộ GEO/AEO/SEO audit **chặn cứng** vào `pnpm verify`. Tách ra ở đây chỉ để thấy rõ cổng kiểm. Ngoài `verify` **CÓ** hai script audit độc lập (báo cáo, không chặn, không nằm trong `verify`): `pnpm geo-audit` (on-site, 3 lớp/12 điểm) và `pnpm citation-audit` (off-site). Lighthouse chạy riêng ở `.github/workflows/lighthouse.yml`. Các cổng GEO/AEO hiện có:
  - `scripts/preflight.mjs`: đúng 1 `<h1>`; JSON-LD có `Organization` + `WebSite`; tồn tại `og.png`/`logo.svg`; chỉ `Hero.tsx` chứa `<h1>`; hết placeholder.
  - `tests/`: `jsonld.test.ts`, `sitemap-robots.test.ts`, `content.schema.test.ts`, `config.invariant.test.ts`.
  - `llms.txt` + `llms-full.txt` (route handlers), `robots.ts`, `sitemap.ts` đã có sẵn trong `src/app/` → tự sinh, không cần thao tác mỗi khách.
  - CI (`.github/workflows/ci.yml`): chạy `pnpm verify` + "Placeholder gate" (grep «CẦN ĐIỀN»).

### So sánh số thao tác người

- **HIỆN TẠI (~6 thao tác):** gõ `client.config.ts` (B2) · điền `content.config.ts` (B3) · thay 2 assets (B4) · verify + sửa lỗi (B5+B6) · deploy + domain (B7).
- **END-STATE (~3 thao tác):**
  1. 1 lệnh tạo repo (B1);
  2. `setup.mjs` hỏi-đáp (gộp B2+B4) + AI điền `content.config.ts` (B3);
  3. push → CI tự verify (B5+B6) + Vercel tự deploy; chỉ **gắn domain 1 lần** (B7).

**Khoảng cách hiện tại → end-state:** generator `setup.mjs` đã có (lo `client.config` + assets, **chưa** lo `content.config`). Còn thiếu: (a) generator/AI sinh luôn `content.config.ts`; (b) wiring Vercel Git auto-deploy thay deploy tay.

---

## 3. Quy trình nhân bản hoàn chỉnh (11 bước, có cổng)

> §2 là **lõi tối thiểu 7 bước**. §3 là **quy trình vận hành đầy đủ** (thêm chốt khách, Vercel/domain, SEO audit, handover, maintenance) cho đội Sales + Dev + Admin.

### Bảng RACI tóm lược

| Bước | Tên | Người | AI làm được? | Cổng kiểm |
|---|---|---|---|---|
| 1 | Chốt khách & dữ liệu | Sales + Admin | Hỗ trợ sàng lọc | Spreadsheet/Figma |
| 2 | Tạo repo | Dev | Không (cần credential GitHub) | Repo tồn tại |
| 3 | `client.config.ts` | Dev / AI (`setup.mjs`) | Có | Zod build PASS/FAIL **+ GEO GATE nếu có `taxId`/`legalName` thật** (Zod kiểm định dạng, KHÔNG kiểm khớp giấy tờ) |
| 4 | `content.config.ts` | Dev / Content | Có | Zod + preflight PASS/FAIL **+ COPY GATE cho H1/tagline/giá/claim** |
| 5 | Assets | Dev + Design | Có | preflight PASS/FAIL **+ ART GATE nếu đổi gu/palette/hero visual** |
| 6 | Local verify | Dev | Có | `pnpm verify` exit 0 |
| 7 | Setup Vercel + ENV | Dev + Admin | Không (cần account) | Vercel deploy OK |
| 8 | Domain + HTTPS | Admin | Không (DNS) | Domain resolve + HTTPS |
| 9 | SEO/AEO/GEO audit | Dev + QA | Có (crawl/analyze) | PageSpeed ≥ 80 |
| 10 | Handover | Dev + Sales | Có (doc) | Credentials + guide |
| 11 | Maintenance | Admin + Dev | Có (monitor) | Uptime + SEO OK |

---

### BƯỚC 1 — Chốt khách & quản lý dữ liệu
**Người:** Sales + AI/Admin · **Output:** dữ liệu cơ bản đã sàng lọc.

Sales thu thập:
- **Domain** (vd `brandx.vn`) — bỏ `http://`, bỏ dấu chấm cuối.
- **Thương hiệu:** `name`, `legalName`, `shortName` (≤20 ký tự — dùng làm logo wordmark).
- **Mô tả** ≥20 ký tự (cho SEO title/description).
- **Liên hệ:** SĐT (≥8 ký tự), email hợp lệ, địa chỉ (đường, phường/tỉnh).
- **2 màu hex** `#RRGGBB`: `primary`, `accent`.
- **URL mạng xã hội** (nếu có) — URL đầy đủ.
- **Nội dung từng section** (hero, giá trị, giới thiệu, FAQ, liên hệ) — hoặc copy từ fixture nếu là BNI chapter.

AI/Admin: kiểm domain chưa dùng + TLD hợp lệ; validate SĐT/email. **Cờ hiệu:** thiếu mô tả ≥20 ký tự → Sales cập nhật ngay.

---

### BƯỚC 2 — Tạo repo từ template
**Người:** Dev · **Cổng:** GitHub repo đã tạo.

```bash
npx degit <repo-url-template> <ten-khach>     # vd: ... catalog-site-template bni-hanoi
cd <ten-khach>
git init && git add . && git commit -m "Initial commit from template"
git remote add origin <repo-moi>
git push -u origin main
```

`.github/workflows/ci.yml` tự kích hoạt khi push.

---

### BƯỚC 3 — Cấu hình thương hiệu (`client.config.ts`)
**Người:** Dev hoặc AI · **Cổng:** Zod schema → build FAIL nếu sai · **+ GEO GATE nếu có `taxId`/`legalName` thật.**

> **`setup.mjs` đi vòng qua GEO GATE — đọc trước khi chạy.** Script hỏi `legalName`, địa chỉ, `social[]`
> (= `sameAs` trong JSON-LD) và tuỳ chọn `taxId`, rồi **ghi thẳng vào `client.config.ts`**. Đây là **hồ sơ
> thực thể** — thứ GEO GATE bắt dừng chờ duyệt, vì *danh tính sai là AI học sai lâu dài, sửa rất chậm*.
> Zod chỉ kiểm ĐỊNH DẠNG (email hợp lệ, hex màu, phone ≥8 ký tự); nó **không kiểm SỰ THẬT** — MST gõ nhầm
> một số vẫn build PASS. ⟹ Dữ liệu thực thể phải **đối chiếu giấy tờ khách** (ĐKKD/MST), rồi mở GEO GATE
> theo `.claude/playbooks/codex-gates.md`. Không có giấy tờ ⇒ **bỏ trống `taxId`**, đừng đoán.

**Phương án A — generator (khuyến nghị):**
```bash
node scripts/setup.mjs
# Hỏi-đáp: tên thương hiệu · shortName · legalName · mô tả(≥20) · domain
#          · primary #RRGGBB · accent #RRGGBB · SĐT · email · địa chỉ · khu vực
```
Script ghi vùng `SITE_CONFIG_START → SITE_CONFIG_END`, tạo `logo.svg` (wordmark từ `shortName` + `primary`), gọi `scripts/make-og.mjs` sinh `og.png`.

**Phương án B — sửa tay** (chỉ trong vùng `SITE_CONFIG_START...SITE_CONFIG_END`):
```ts
const config = {
  brand: {
    name: "Brand X",
    legalName: "Công ty Brand X LLC",
    shortName: "BrandX",
    description: "Giải pháp tư vấn kinh doanh toàn diện cho doanh nghiệp SME.",
    domain: "brandx.vn",
    logo: "/logo.svg",
    ogImage: "/og.png",          // mặc định "/og.png"
    locale: "vi-VN", lang: "vi", // mặc định
    // tùy chọn (JSON-LD Organization): taxId, foundingDate, legalEntityType
  },
  theme: { primary: "#1e5f86", accent: "#e08a2b" },
  contact: {
    phone: "0913456789", phoneDisplay: "0913 456 789",
    email: "hello@brandx.vn",
    address: { street: "Số 123, Đường ABC", locality: "Quận 1, TP.HCM", region: "Hồ Chí Minh", country: "VN" },
  },
  social: ["https://facebook.com/brandx"],
  nav: [{ label: "Giới thiệu", href: "#gioi-thieu" }, { label: "Liên hệ", href: "#lien-he" }],
  catalog: { productCategoryHandles: [], serviceCategoryHandles: [] },
} satisfies z.input<typeof ClientConfigSchema>;
```

**Quy tắc vàng:** `description` ≥20 ký tự · `domain` không kèm `http://`/dấu chấm cuối · `logo`/`ogImage` bắt đầu `/` · hex `#RRGGBB` · `phone` ≥8 ký tự · email hợp lệ · social là URL đầy đủ.

---

### BƯỚC 4 — Cấu hình nội dung (`content.config.ts`)
**Người:** Dev + Content · **Cổng:** Zod + preflight + CI grep.

```ts
const raw = {
  page: { title: "Tiêu đề trang (SEO)", description: "Meta description" }, // cả 2 tùy chọn
  sections: [ /* đúng 1 hero ở index 0; sau đó tùy chọn các section khác */ ],
};
export const content: ContentConfig = ContentConfigSchema.parse(raw);
```

Schema từng kiểu section: xem [§6 Phụ lục](#6-phụ-lục).

**Quy tắc vàng:**
- Đúng **1** section `hero` ở **index 0** (tạo duy nhất `<h1>`).
- Mỗi section có `id` **unique**.
- **KHÔNG** để placeholder: `«CẦN ĐIỀN»`, `«...»`, `lorem ipsum`, số liệu bịa → preflight chặn.
- **KHÔNG** thêm `<h1>` ngoài Hero (preflight check).
- Icon từ [lucide-react](https://lucide.dev) (vd `handshake`, `trending-up`, `shield`).

**Cổng:** Zod parse (import) → build FAIL · `pnpm test` (`content.schema.test.ts`) · `pnpm preflight` (grep placeholder) · CI workflow.

---

### BƯỚC 5 — Thay assets (logo + OG image)
**Người:** Dev + Design · **Cổng:** preflight asset check.

- **Generator:** `setup.mjs` tự sinh `logo.svg` + `og.png`.
- **Sửa tay:** `public/logo.svg` (SVG scalable, có `viewBox`) · `public/og.png` (1200×630). Tạo nhanh: `node scripts/make-og.mjs "#1e5f86"`.

**Quy tắc vàng:** logo & OG bắt đầu `/` (vd `/logo.svg`, `/og.png`); tuyệt đối không để trống (preflight chặn).

---

### BƯỚC 6 — Tải deps & local verify
**Người:** Dev · **Cổng:** `pnpm verify` (typecheck + build + preflight + test).

```bash
pnpm install
pnpm verify          # = typecheck && build && preflight && test
```

| Cổng | Lệnh | Kiểm tra | FAIL nếu |
|---|---|---|---|
| Typecheck | `pnpm typecheck` | TypeScript | Sai kiểu |
| Build | `pnpm build` | Zod parse config | `client/content.config.ts` sai schema |
| Preflight | `pnpm preflight` | HTML + asset + placeholder | Sai H1, thiếu JSON-LD, còn placeholder, thiếu logo/og.png |
| Test | `pnpm test` | vitest snapshot | Sai sitemap/robots, config invariant fail |

Sửa tới khi **exit 0** → lên Bước 7.

---

### BƯỚC 7 — Setup Vercel & ENV
**Người:** Dev + Admin · **Cổng:** Vercel deploy log OK.

1. Đăng nhập Vercel → **Import** repo GitHub ([vercel.com/new](https://vercel.com/new)) → auto-detect Next.js.
2. **ENV** (nếu dùng Medusa BE):
   ```
   MEDUSA_URL=https://api.giftytech.com
   MEDUSA_PUBLISHABLE_KEY=pk_<khach>
   REVALIDATE_SECRET=<chuoi-bi-mat-≥8-ky-tu>
   ```
   Content-only → bỏ qua.
3. Deploy: Vercel chạy CI (verify) → build Next.js → deploy.
4. Revalidate (nếu Medusa): webhook `POST https://<domain>/api/revalidate` (secret khớp `REVALIDATE_SECRET`); route đã có trong template.

**Quy tắc vàng:** không hardcode secret trong repo (dùng Vercel Secrets); không deploy nếu CI FAIL.

---

### BƯỚC 8 — Gắn domain & HTTPS
**Người:** Admin · **Cổng:** `https://<domain>` → 200 OK.

1. Registrar (GoDaddy/Cloudflare/cPanel…): thêm CNAME/nameserver trỏ Vercel (theo hướng dẫn Vercel → Project → Settings → Domains).
2. Chờ DNS propagate (10' – 48h).
3. Kiểm: `curl -I https://<domain>` → 200 OK + Vercel headers.
4. SSL: Vercel tự cấp Let's Encrypt; HTTPS tự bật sau propagate.

**Quy tắc vàng:** domain khớp `client.config.ts → brand.domain`; HTTPS bắt buộc.

---

### BƯỚC 9 — Audit SEO/AEO/GEO
**Người:** Dev + QA/SEO · **Cổng:** PageSpeed/Lighthouse.

```bash
# SEO
curl https://<domain>/sitemap.xml          # có URL
curl https://<domain>/robots.txt           # không block "/" toàn bộ
curl https://<domain> | grep "application/ld+json"   # Organization + WebSite
curl https://<domain> | grep -E "<title>|og:image|og:title"

# AEO
curl https://<domain>/llms.txt
curl https://<domain>/llms-full.txt

# GEO
curl https://<domain> | grep -A5 "PostalAddress"     # streetAddress, addressLocality, addressCountry
```

PageSpeed: nên ≥80/100. Fix nếu LCP >2.5s (optimize ảnh) · CLS >0.1 (layout shift) · thiếu alt text.

**Template đã tích hợp:** JSON-LD Organization + WebSite · meta tags · `/sitemap.xml` · `/robots.txt` · `/llms.txt` + `/llms-full.txt`.

---

### BƯỚC 10 — Handover & hỗ trợ
**Người:** Dev + Sales + Admin.

- **Credentials:** Vercel project · GitHub repo · domain registrar · Medusa webhook (nếu có).
- **Docs:** `CLONE-CHECKLIST.md`, `AGENTS.md`, file này.
- **Cập nhật nội dung sau này:** sửa `client.config.ts`/`content.config.ts` → `pnpm verify` → `git push` → Vercel auto-deploy.

---

### BƯỚC 11 — Maintenance & monitoring
**Người:** Admin + Dev · **Cổng:** audit hàng tháng.

Uptime (200 OK) · SSL auto-renew (alert nếu lỗi) · JSON-LD/sitemap/robots còn đúng · Lighthouse ≥80 · DNS còn resolve về Vercel.

---

### Timeline & SLA

| Giai đoạn | Thời gian |
|---|---|
| Bước 1–2 | 1 ngày |
| Bước 3–5 | 1–2 ngày |
| Bước 6 | 30 phút |
| Bước 7–8 | 1–2 ngày |
| Bước 9 | 1 ngày |
| Bước 10 | 1 ngày |
| **Tổng** | **5–7 ngày → LIVE, SEO PASS** |

---

## 4. UI tiến độ — lựa chọn & khuyến nghị

### Khuyến nghị: **Derive-from-source** (không cần DB) — đã hiện thực tại `factory-dashboard/`

Dashboard quét `projects/*` và **suy ra** trạng thái pipeline mỗi khách trực tiếp từ repo — không cần store ngoài cho MVP.

### So sánh lựa chọn

| Phương án | Đánh giá |
|---|---|
| **(a)** Claude Code `/workflows` progress tree | Sống trong phiên CLI, ephemeral, 1 máy — không phải view "live" chia sẻ cho nhiều khách. **Loại.** |
| **(b) Derive-from-source** ✅ | Repo **chính là** nguồn sự thật. Cùng cổng gate production (`client.config` vs demo, `content.config` vs template, `pnpm verify` exit code, HTTP probe) → suy ra status xác định. Zero drift, zero infra, chạy được ngay. **Chọn.** |
| **(c)** Next.js app + Google Sheet / Vercel KV | DB thật ⇒ write path mỗi lần đổi stage, app có auth, state lệch với repo thật. Infra suy đoán (YAGNI). Giữ làm **đường nâng cấp**, không phải MVP. |

### Mô hình dữ liệu — 7 stage

`Provision → Config(brand) → Content → Verify → Deploy → GEO-audit → Live`, mỗi stage status `todo | doing | done | fail`.

Tín hiệu suy ra: brand khác `Catalog Demo`/`example.com` · không còn `«CẦN ĐIỀN»` · `content.config.ts` khác bản template · `pnpm verify` exit 0 · `https://<domain>` trả 200 · `/llms.txt` 200 + JSON-LD `Organization` có trên homepage.

### Layout

Table-per-client: tên brand + domain + theme swatch · pipeline 7-node ngang (xanh=done, hổ phách nhấp nháy=doing, đỏ=fail, mờ=todo) · progress bar/% · status pill (LIVE / verify FAIL / demo / running) · log lỗi verify mở rộng được. Header KPI (total / live / in-progress / blocked). Auto-refresh 15s.

### Đã verify với dữ liệu thật

- `bni-landing` → **57%** (provision/config/content/verify done; deploy/geo/live pending — `bnihd.vn` chưa trỏ).
- `bni-event` → **loại đúng** (event microsite dùng `event.config.ts`, không phải clone catalog-template).
- Scanner + static server + render đều xác nhận HTTP 200 trên `/` và `/state.json`.

### Files (tuyệt đối)

- `d:\Workspace\A3 Landingpage\factory-dashboard\scan.mjs` — probe; suy ra state, ghi `public/state.json`. Cờ: `--verify` (chạy `pnpm verify` mỗi client), `--probe` (HTTP-check domain). Export `STAGES`.
- `d:\Workspace\A3 Landingpage\factory-dashboard\public\index.html` — UI self-contained (no framework/build).
- `d:\Workspace\A3 Landingpage\factory-dashboard\serve.mjs` — static server (`http://localhost:4321`).
- `d:\Workspace\A3 Landingpage\factory-dashboard\package.json` — `scan` / `scan:verify` / `scan:full` / `serve`.
- `d:\Workspace\A3 Landingpage\factory-dashboard\README.md` — usage + đường nâng cấp (Vercel deploy webhook → realtime `deploy`; push `state.json` lên KV/Sheet cho multi-viewer).
- `d:\Workspace\A3 Landingpage\factory-dashboard\public\state.json` — output snapshot hiện tại.

**Chạy:** `cd factory-dashboard && node scan.mjs --probe && node serve.mjs`. Lên lịch `scan` định kỳ (Task Scheduler/cron/post-deploy CI) để luôn tươi.

> **Lưu ý chính xác:** thiếu `--verify`, stage `verify` chỉ là **đoán mềm** (config+content done + assets có + `.next` build trước đó tồn tại). Muốn bảng đúng tuyệt đối, chạy `node scan.mjs --verify --probe` theo lịch — chậm hơn nhưng là gate thật.

---

## 5. Bot thông báo — lựa chọn, khuyến nghị & wiring

### Khuyến nghị: **Telegram**

| Tiêu chí | **Telegram** ✅ | Zalo OA | Slack | Discord |
|---|---|---|---|---|
| Chi phí | Miễn phí | OA cần duyệt, quota tin/tháng | Free tier ok | Miễn phí |
| Setup | BotFather 2', 1 token + chat_id | Đăng ký OA, token hết hạn phải refresh | App + Incoming Webhook | Tạo webhook URL |
| API gửi | 1 `curl POST`, không SDK | OAuth + refresh token | 1 `curl POST` | 1 `curl POST` |
| Hợp ngữ cảnh | Kỹ thuật nội bộ GiftyTech | Khách cuối (CSKH) | Team có Slack | Team có Discord |

**Kết luận:** Telegram cho kênh tiến độ kỹ thuật (build/deploy GiftyTech). Muốn báo khách BNI sau này → thêm Zalo OA ở tầng riêng. Thiết kế dùng **1 adapter mỏng** nên đổi kênh = đổi 1 hàm.

**Option "không-cần-setup":** khi nhân bản **trong workflow Claude Code**, orchestrator đã có `log()/phase()` + `task-notification` phát tiến độ thẳng về bạn — **không cần bot**. Bot Telegram chỉ cần cho: (a) **CI/CD** (Vercel/GitHub Actions) chạy không người xem; (b) **nhóm Telegram chung** cho cả team/khách. Tức là: **trong-Claude → `phase()`**; **ngoài-Claude → `notify.mjs` Telegram**. Cả hai gọi **cùng danh sách mốc** nên thông điệp đồng nhất.

### Kiến trúc

```
                     ┌─────────────────────────────────────────┐
                     │  scripts/notify.mjs  (adapter mỏng)      │
   gọi từ mọi nơi →  │  notify(phase, {client, status, extra})  │
                     │   ├─ TOKEN + chat_id?  → POST Telegram   │
                     │   └─ không có env?     → console.log()    │  (no-op an toàn)
                     └─────────────────────────────────────────┘
        ▲                         ▲                         ▲
   pnpm verify hooks         GitHub Actions CI         Vercel Deploy
   (verifying/green)         (mỗi step)                (deployed)
```

**Nguyên tắc:** 1 adapter duy nhất (DRY) · **fail-safe/no-op** — thiếu env thì log rồi `exit 0`, báo tiến độ **không bao giờ làm vỡ build** (KISS) · stateless (mỗi mốc 1 POST độc lập) · **không sửa `src/`**.

### Các mốc

| # | Mốc | Khi nào bắn | Nguồn |
|---|---|---|---|
| 1 | `start` | Sau `setup.mjs` | `setup.mjs` cuối hàm |
| 2 | `verifying` | Bắt đầu `pnpm verify` | hook `preverify` |
| 3 | `green` | `verify` exit 0 | hook `postverify` |
| 4 | `deploying` | CI bắt đầu deploy | GitHub Actions step |
| 5 | `deployed` | Vercel xong (có URL) | Vercel/CI |
| 6 | `geo-audit` | Kiểm GEO/AEO sau build | `geo-audit.mjs` (**đã có sẵn**) |
| 7 | `failed` | Bất kỳ bước nào lỗi | trap CI / catch |

### Wiring

**1) Bot + token + chat_id (1 lần):** BotFather `/newbot` → token; add bot vào nhóm; lấy `chat_id` qua `getUpdates` (nhóm thường âm, vd `-1001234567890`). Thêm vào `.env.example`:
```bash
TELEGRAM_BOT_TOKEN=123456789:AAE...   # từ @BotFather
TELEGRAM_CHAT_ID=-1001234567890        # id nhóm/cá nhân
NOTIFY_CLIENT=ten-khach                # nhãn khách trong tin
```

**2) `scripts/notify.mjs`** — adapter gọi `sendMessage`; thiếu env → `console.log` + return (no-op); lỗi mạng → `console.warn`, **không throw**. CLI: `node scripts/notify.mjs <phase> [text]`.

**3) Hook vào `pnpm verify`** (chạy mọi nơi kể cả local):
```jsonc
"verify":     "pnpm typecheck && pnpm build && pnpm preflight && pnpm test",
"preverify":  "node scripts/notify.mjs verifying",
"postverify": "node scripts/notify.mjs green",
"geo-audit":  "node scripts/geo-audit.mjs",
"notify":     "node scripts/notify.mjs"
```
> `verify` fail (exit ≠ 0) ⇒ `postverify` **không** chạy ⇒ không bao giờ báo "xanh" nhầm. Mốc `failed` do CI/catch xử lý.

`setup.mjs` cuối hàm: `import { notify } from "./notify.mjs"; await notify("start");`.

**4) GitHub Actions** — thêm env từ Secrets + step `deploying`/`deployed`/`geo-audit`; `if: failure()` → `notify failed`. **Không** hardcode token; dùng repo Secrets `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `VERCEL_TOKEN`.

**5) Vercel thuần (không CI):** `vercel.json` → `"buildCommand": "pnpm build && node scripts/notify.mjs deployed \"$VERCEL_URL\""`; đặt `TELEGRAM_*` trong Project → Environment Variables.

**6) `scripts/geo-audit.mjs` — ĐÃ CÓ (đừng viết lại).** `pnpm geo-audit` (script có sẵn trong `package.json`).
Bản thật khác mô tả cũ ở tài liệu này: nó **đọc HTML đã build + file nguồn** (chạy SAU `pnpm build`), chấm theo
mô hình **3 lớp / 12 điểm** (Discovery · Parsability · Authority) theo agent "AEO Foundations Architect",
và **KHÔNG chặn** — báo cáo + gợi ý fix, không `exit 1`. Muốn cổng chặn cứng thì dùng `pnpm preflight`.
Đo OFF-SITE (AI có thực sự nhắc brand) là `pnpm citation-audit` + agent "AI Citation Strategist".

### Mẫu tin (preview)

```
🚀 bni-landing — bắt đầu nhân bản site mới.
🔍 bni-landing — đang chạy `pnpm verify` (typecheck · build · preflight · test)…
✅ bni-landing — VERIFY XANH. Sẵn sàng deploy.
📦 bni-landing — đang deploy lên Vercel…
🌐 bni-landing — ĐÃ DEPLOY.  URL: https://bni-landing.vercel.app
🧭 bni-landing — GEO/AEO audit xong.  ✓ llms.txt  ✓ sitemap  ✓ robots  ✓ JSON-LD
❌ bni-landing — LỖI ở bước `verify`. Đã chặn, KHÔNG ship.
```

### Quy ước "khi nào dùng cái gì"

| Bối cảnh | Dùng | Lý do |
|---|---|---|
| Nhân bản **trong Claude Code** | `phase()`/`log()` + `task-notification` (sẵn có) | Không cần setup, tiến độ về thẳng orchestrator |
| **CI / Vercel** (không người xem) | `scripts/notify.mjs` → Telegram | Cần kênh ngoài |
| **Local thủ công** | có env → Telegram; không env → `console.log` | `notify.mjs` no-op an toàn |
| Báo **khách cuối** (BNI…) | Thêm adapter Zalo OA (cùng danh sách mốc) | Kênh CSKH riêng |

### Files liên quan (tuyệt đối)

**Thêm mới:**
- `d:\Workspace\A3 Landingpage\catalog-site-template\scripts\notify.mjs`
- `d:\Workspace\A3 Landingpage\catalog-site-template\scripts\geo-audit.mjs`

**Sửa:**
- `...\package.json` (hooks `preverify`/`postverify` + `geo-audit`/`notify`)
- `...\.github\workflows\ci.yml` (step notify + deploy)
- `...\.env.example` (3 biến `TELEGRAM_*` / `NOTIFY_CLIENT`)
- `...\scripts\setup.mjs` (1 dòng `await notify("start")` cuối hàm)
- `...\CLONE-CHECKLIST.md` (checklist tích hợp, tùy chọn)

**Lưu ý/giả định:** (1) ~~Template chưa có geo-audit~~ → **SAI, đã lỗi thời**: `scripts/geo-audit.mjs` **đã tồn tại**
và `package.json` đã có script `geo-audit` — phần mới chỉ là *notify*, KHÔNG phải viết lại geo-audit
(viết đè lên là phá script đang chạy + vi phạm quy tắc vàng). (2) `parse_mode: "Markdown"` nhạy với `_*[]` trong tên khách; tên có gạch dưới → đổi `MarkdownV2` + escape hoặc bỏ `parse_mode`. (3) Thiết kế cố ý fail-safe: lỗi gửi tin không throw.

---

## 6. Phụ lục

### 6.1. Schema các kiểu section (`src/content/schema.ts`)

| Type | Bắt buộc | Trường chính |
|---|---|---|
| `hero` | **Có** (1, index 0) | `heading` (`<h1>`), `subheading`, `highlights[]`, `primaryCta{label,href}`, `secondaryCta?` |
| `valueHighlights` | — | `heading?`, `columns` (2\|3\|4), `items[]{icon?, title, description}` |
| `about` | — | `heading`, `body[]` (mỗi phần tử = 1 `<p>`), `media?` |
| `leadership` | — | `heading?`, `columns` (2\|3\|4), `people[]{name, role, bio?, avatar?}` |
| `events` | — | `heading?`, `items[]{title, startDate (ISO 8601+offset \| null), scheduleText, locationName, description}` |
| `testimonials` | — | `heading?`, `items[]{quote, author, role?}` |
| `faq` | — | `heading?`, `items[]{question, answer}` |
| `cta` | — | `heading`, `body?`, `primaryCta`, `secondaryCta?` |
| `contact` | — | `heading`, `note?`, `showMap` (lấy contact tự động từ `client.config.ts`) |
| `contactForm` | **BẮT BUỘC với trang lead-gen** | `heading`, `note?`, `submitLabel` (default `"Gửi liên hệ"`), `successMessage` (có default) — POST `/api/contact` |

> **`contactForm` — preflight cổng #10 chặn.** Trang chủ KHÔNG có `<form>` ⇒ `pnpm preflight` HARD-FAIL:
> `"trang chủ KHÔNG có form — thêm section contactForm (đừng để mất lead)"`.
> Cách sửa ĐÚNG: thêm `{ type: "contactForm", heading: "..." }` vào `content.config.ts`.
> Cách sửa SAI: chế `<form>` vào `src/` — **vi phạm quy tắc vàng**, và cổng #9 vẫn đòi `/api/contact`.
> (Tổng cộng schema có **10 type**; 9 hàng trên + `contactForm`.)

Ví dụ `hero`:
```ts
{ id: "hero", type: "hero",
  heading: "Tiêu đề chính",            // <h1> duy nhất
  subheading: "Tóm tắt",
  highlights: ["Điểm 1", "Điểm 2", "Điểm 3"],
  primaryCta: { label: "Nút chính", href: "#section-id" },
  secondaryCta: { label: "Nút phụ", href: "/page" } }   // tùy chọn
```

### 6.2. Cổng kiểm (tổng hợp)

| Cổng | Lệnh | Chặn gì |
|---|---|---|
| Typecheck | `pnpm typecheck` | Sai kiểu TS |
| Build (Zod) | `pnpm build` | `client/content.config.ts` sai schema |
| Preflight | `pnpm preflight` | ≠1 `<h1>`, thiếu JSON-LD Organization+WebSite, còn placeholder, thiếu `logo.svg`/`og.png`, `<h1>` ngoài Hero, **trang chủ không có form (cổng #10)**, anchor chết, section hardcode màu slate |
| Test | `pnpm test` | `jsonld` · `sitemap-robots` · `content.schema` · `config.invariant` |
| CI | `.github/workflows/ci.yml` | `pnpm verify` + Placeholder gate (grep «CẦN ĐIỀN») |

#### Cổng người duyệt (máy KHÔNG bắt được — phải dừng chờ Codex/người)

Năm cổng trên chỉ kiểm **định dạng**, không kiểm **sự thật, gu và giọng**. Luật đầy đủ:
**`.claude/playbooks/codex-gates.md`** (bootstrap toolkit mang xuống — thiếu thì chạy lại bootstrap, xem `CLONE-CHECKLIST.md`).

| Cổng | Handoff | Chặn gì (dừng chờ duyệt) |
|---|---|---|
| **ART GATE** | `CODEX_ART_HANDOFF.md` | Chọn/đổi design system, palette, hero visual, poster/asset chủ lực, motion pass, variant layout trang tiền. Đợt có animation: phải chạy skill `review-animations` XONG trước khi mở cổng. |
| **COPY GATE** | `CODEX_COPY_HANDOFF.md` | Định vị, tagline, tên gói, **H1 trang tiền**, giá hiển thị & claim ("cam kết", "số 1", SLA, con số hiệu quả — số phải có nguồn), copy ads chạy tiền thật, đổi tone site-wide, bản dịch EN thông điệp chủ đạo. Phương án phải đạt `copy-craft` ≥8/10 TRƯỚC khi mở cổng. |
| **SEO GATE** | `CODEX_SEO_HANDOFF.md` | Chốt bộ từ khóa trang tiền; đổi title/H1/slug/URL của trang **đã index** (slug đổi ⇒ kèm 301); kế hoạch cụm bài; canonical/redirect hàng loạt. CẤM bịa search volume. |
| **GEO GATE** | `CODEX_GEO_HANDOFF.md` | **Đổi hồ sơ thực thể**: ORG (tên/`legalName`/`taxId`/địa chỉ), `sameAs` (= `social[]`), LocalBusiness — *danh tính sai là AI học sai lâu dài, sửa rất chậm*. Cấu trúc `llms.txt`; prompt-set mục tiêu; claim GEO trên site (chỉ được viết "tăng khả năng được AI nhắc tên", CẤM bảo đảm kết quả). |

**Không cần cổng** (tự làm, tự chịu QA): sửa chính tả, microcopy theo bản đã chốt, FAQ bổ sung từ dữ kiện thật,
alt text/meta khớp nội dung có sẵn, copy kỹ thuật (README/commit/docs nội bộ), keyword phụ trong bài MỚI.

> **Cảnh báo — Zod KHÔNG thay được GEO GATE.** `pnpm build` chỉ kiểm **định dạng** (`email` hợp lệ,
> hex `#RRGGBB`, `phone` ≥8 ký tự); nó **không biết** MST/`legalName`/địa chỉ có khớp giấy tờ khách hay không.
> `scripts/setup.mjs` hỏi và ghi thẳng các trường này vào `client.config.ts` — **đi vòng qua cổng**.
> Có `taxId`/`legalName` thật ⇒ đối chiếu giấy tờ + mở GEO GATE, đừng tin Zod PASS là "đúng".

### 6.3. Checklist trước khi LIVE

**Cổng máy (tự chạy):**

- [ ] `pnpm verify` exit 0
- [ ] Không còn placeholder (`«CẦN ĐIỀN»` / lorem)
- [ ] Đúng 1 `<h1>` ở Hero
- [ ] JSON-LD Organization + WebSite có trong HTML
- [ ] `logo.svg` + `og.png` tồn tại
- [ ] **Trang chủ có section `contactForm`** (preflight cổng #10 — trang lead-gen không form = mất lead)
- [ ] domain khớp `client.config.ts → brand.domain`
- [ ] Vercel build PASS (CI)
- [ ] Domain resolve HTTPS (200 OK)
- [ ] PageSpeed ≥ 80
- [ ] `sitemap.xml` có URL · `robots.txt` không block `/` · `llms.txt` accessible

**Cổng người (máy không bắt được — xem §6.2):**

- [ ] **Copy trang tiền đã qua COPY GATE** (H1, tagline, giá & claim — mọi con số truy được nguồn)
- [ ] **Thay đổi gu đã qua ART GATE** (palette/hero visual/motion — không đổi gu thì tick "không phát sinh")
- [ ] **Hồ sơ thực thể đã đối chiếu giấy tờ khách** — `legalName` · `taxId` (MST) · địa chỉ · `social[]` (=`sameAs`)
      khớp ĐKKD/giấy tờ do khách cung cấp, **không phải nghe qua điện thoại**. Có sửa ⇒ GEO GATE (Zod chỉ kiểm định dạng).
- [ ] Trang đã index mà đổi title/H1/slug ⇒ đã qua SEO GATE + có 301

### 6.4. Ghi chú quan trọng

1. **Quy tắc vàng:** chỉ sửa `client.config.ts` + `content.config.ts` + `public/` — **KHÔNG** sửa `src/`.
2. Guardrails là tất cả: Zod + preflight + CI + vitest chặn sai trước production.
3. `setup.mjs` không bắt buộc — sửa tay config được, nhưng generator nhanh hơn.
4. SEO/AEO/GEO tích hợp sẵn (JSON-LD, sitemap, robots, llms.txt) — chỉ cần điền dữ liệu đúng.
5. Medusa tùy chọn — dùng product/service sync thì thêm ENV + webhook, không thì bỏ qua.
