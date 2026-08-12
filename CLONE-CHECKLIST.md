# CLONE CHECKLIST — nhân bản 1 landing mới

> **Vai trò của tôi: checklist tick khi thật sự làm.** Luật cho AI ở `AGENTS.md` (nguồn-sự-thật) ·
> giới thiệu ở `README.md` · quy trình vận hành đầy đủ ở `WORKFLOW.md`.

> Mục tiêu: vài thao tác, không sót. Mỗi bước có **cổng tự kiểm** — quên là bị chặn, không lọt ra production.

## Các bước (content-only, không Medusa)

0. **Nạp đồ nghề toolkit (BẮT BUỘC — làm NGAY sau khi copy chassis).** Clone trần = **0 skill, 0 agent,
   0 playbook** → người/AI làm site đó **không có cách nào biết 4 cổng Codex tồn tại**. Chạy trong thư mục clone:
   ```bash
   pwsh <đường-dẫn-agency-toolkit>/bootstrap.ps1 -Target .    # Windows
   bash <đường-dẫn-agency-toolkit>/bootstrap.sh --target .     # macOS/Linux
   ```
   **Kiểm đủ (cả 3 phải xanh):**
   - [ ] `.claude/TOOLKIT_STAMP.json` tồn tại (dấu đóng: bản toolkit nào, ngày nào).
   - [ ] `.claude/playbooks/codex-gates.md` tồn tại → **luật gu/giọng**, thiếu là 4 cổng chết đường dẫn.
   - [ ] Gõ `/skills` trong Claude Code → thấy danh sách skill (không rỗng).

   Bỏ bước này thì `AGENTS.md` và `WORKFLOW.md` sẽ trỏ tới `.claude/playbooks/…` **không tồn tại**.

1. **Tạo repo** từ template: `npx degit <repo-template> ten-khach` → `cd ten-khach`.
2. **Sửa `client.config.ts`** — thương hiệu: `name, legalName, shortName, description, domain, logo`, `theme.{primary,accent,vibe}` (**vibe** = diện mạo: `swiss·industrial·organic·aurora·retro` — đổi font/nền/shape *cả site* bằng 1 dòng; nguồn skill frontend-design), `contact.*`, `social[]`, `nav[]`. (Tùy chọn: `taxId, foundingDate`; **SXO** `contact.zalo` / `contact.whatsapp` → nút gọi nhanh, `sxo.gaMeasurementId` → GA4; **GEO** `geo.mentions[]` báo/bài nói về bạn + `geo.localBusiness` areaServed/priceRange/openingHours.)
3. **Sửa nội dung `content.config.ts`** — thay nội dung mẫu bằng nội dung khách. Có thể copy từ một fixture (vd `content.config.bni.ts`) rồi **điền hết `«CẦN ĐIỀN»`**. (**SXO** thêm section `{ type: "contactForm", heading, note? }` để có form lead; **AEO** câu trả lời FAQ 30–500 ký tự, có thể kèm `sourceUrl`; **AEO/SEO** `page.datePublished/dateModified` ISO `YYYY-MM-DD`.)
4. **Thay assets**: `public/logo.svg` (logo), `public/og.png` (ảnh share — hoặc `pnpm exec node scripts/make-og.mjs`).
5. **`pnpm install && pnpm verify`** — phải XANH mới deploy.
6. **Deploy Vercel** (tài khoản khách) → gắn domain.

## Cổng tự kiểm (bảng "quên → bị bắt")

| Thứ dễ quên/sai | Cổng bắt | Khi nào |
|---|---|---|
| Sai/thiếu brand, domain sai định dạng, logo không bắt đầu `/` | Zod `client.config.ts` | `build` FAIL |
| Sai schema nội dung, thiếu field, 0/2 hero, id trùng | Zod `content.config.ts` (+ test) | `build`/`test` FAIL |
| Còn `«CẦN ĐIỀN»` / lorem chưa điền | `preflight` + CI grep | `preflight`/CI FAIL |
| Quên đổi nội dung (>1 H1, thiếu JSON-LD) | `preflight` (đọc HTML build) | `preflight` FAIL |
| Sitemap rỗng / robots chặn nhầm toàn bộ | vitest `sitemap-robots.test` | `test` FAIL |
| Thiếu og.png / logo | `preflight` asset check | `preflight` FAIL |
| Thêm H1 ngoài Hero | `preflight` (chỉ Hero.tsx được có `<h1`) | `preflight` FAIL |
| Câu trả lời FAQ quá ngắn/dài (AEO) | Zod FAQ 30–500 + test | `build`/`test` FAIL |
| FAQ còn gập `<details>` (AEO) | `preflight` (HTML không có `<details>`) | `preflight` FAIL |
| Ảnh thiếu `alt` | `preflight` (mọi `<img>` có alt) | `preflight` FAIL |
| Form liên hệ không có backend | `preflight` (tồn tại `/api/contact`) | `preflight` FAIL |
| Lọt câu sinh-máy ("As an AI…") | CI grep gate | CI FAIL |

## Lệnh
- `pnpm verify` = `typecheck` + `build` + `preflight` + `test` (cổng tổng, dùng cho local & CI).
- `pnpm generate --brief brief.json` — **AIO**: sinh nháp nội dung bằng Claude (mặc định dry-run; thêm `--run` + `ANTHROPIC_API_KEY`). Nháp phải biên tập + `pnpm verify` mới ship.
- `pnpm build && pnpm geo-audit` — **đo GEO/AEO on-site** theo 3 lớp / 12 điểm (Discovery · Parsability · Authority): chấm Foundation Score + gợi ý fix (báo cáo, không chặn). Đo OFF-SITE (AI có thực sự nhắc brand) dùng agent **AI Citation Strategist**.

## Cổng người duyệt (máy KHÔNG bắt được — dừng chờ Codex/người)

Bảng trên chỉ bắt **định dạng**. Gu, giọng và **sự thật của con số** thuộc 4 cổng Codex —
luật đầy đủ ở `.claude/playbooks/codex-gates.md` (có sau khi chạy **bước 0**).

- [ ] **ART GATE** — đổi palette/design system/hero visual/motion → `CODEX_ART_HANDOFF.md`.
      Dựng giao diện mới thì điền **`STYLE_PROMPT.template.md`** (có sẵn ở repo này) → lưu thành
      `STYLE_PROMPT.md` **TRƯỚC** khi dựng: north-star scene + signature move + choreography.
      Thiếu nó là AI dựng bố cục vô hồn.
- [ ] **COPY GATE** — định vị/tagline/H1 trang tiền/giá/claim/ads → `CODEX_COPY_HANDOFF.md`. Số phải có nguồn.
- [ ] **SEO GATE** — chốt từ khóa; đổi title/H1/slug trang **đã index** (⇒ kèm 301) → `CODEX_SEO_HANDOFF.md`.
- [ ] **GEO GATE** — đổi hồ sơ thực thể (`legalName`/`taxId`/địa chỉ/`social[]`/LocalBusiness) →
      `CODEX_GEO_HANDOFF.md`. **Zod chỉ kiểm định dạng, không kiểm khớp giấy tờ** — `setup.mjs` hỏi
      và ghi thẳng các trường này, nên phải tự đối chiếu ĐKKD/MST của khách. Không có giấy tờ ⇒ bỏ trống `taxId`.

## Quy tắc vàng
- KHÔNG sửa code trong `src/` khi nhân bản — chỉ sửa `client.config.ts` + `content.config.ts` + assets.
- KHÔNG ship `«CẦN ĐIỀN»` / số liệu bịa — điền dữ liệu thật hoặc bỏ section.
- KHÔNG tự quyết **gu** (palette/layout) và **giọng** (định vị/H1/claim) — đó là việc của 4 cổng trên.

## Tối ưu 5 trụ cột (config nào → trụ nào)
| Trụ | Bật bằng | Mặc định |
|---|---|---|
| **SEO** | có sẵn: meta · sitemap · robots · JSON-LD · 1 H1 | ✅ |
| **GEO** | `geo.mentions[]` · `geo.localBusiness` · FAQ `sourceUrl` · llms.txt `Last-Updated` | tùy chọn |
| **AEO** | FAQ answer-first + `faqPageSchema` · `page.datePublished` | ✅ (FAQ) |
| **AIO** | `pnpm generate` (Claude) + cổng `auditContent` (test) + CI gate sinh-máy | ✅ |
| **SXO** | `contactForm` + `/api/contact` · `contact.zalo/whatsapp` · `sxo.gaMeasurementId` | tùy chọn |

## Env tùy chọn
- `CONTACT_WEBHOOK_URL` — nơi nhận lead từ form (Google Apps Script / Telegram…); chưa set thì lead ghi log server (Vercel Functions).

## Cổng hiệu năng (Lighthouse)
- PR tự chạy `.github/workflows/lighthouse.yml` (CLS = chặn cứng; LCP/perf = cảnh báo). Có baseline ổn thì siết `warn → error` trong `lighthouserc.json`.
