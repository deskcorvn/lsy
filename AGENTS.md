# AGENTS.md — Hướng dẫn nhân bản landing (cho MỌI AI/agent & người)

> **Vai trò của tôi: LUẬT CHO AI — nguồn-sự-thật.** Mâu thuẫn với file khác thì tôi thắng.
> `README.md` = giới thiệu 60 giây · `WORKFLOW.md` = quy trình vận hành Sales+Dev+Admin ·
> `CLONE-CHECKLIST.md` = checklist tick khi làm.
> Bốn file nói **4 / 5 / 7 / 11 bước** — KHÔNG mâu thuẫn, chỉ là bốn mức phóng đại của cùng một quy trình:
> 4 bước lõi dưới đây ⊂ 7 bước lõi ⊂ 11 bước vận hành (có cả việc Sales/Admin: chốt khách, mua domain — **AI không tự làm**).

Template landing **config-driven**. Tạo một site mới = sửa **2 file config + assets**, KHÔNG sửa `src/`.
Hướng dẫn này độc lập công cụ — dùng được với Claude, Gemini, ChatGPT, Cursor… vì đúng/sai do **cổng kiểm tra (Zod + preflight + test)** quyết định, không phụ thuộc AI nào.

## Repo này là clone của agency-toolkit chassis — ĐỌC TRƯỚC KHI ĐỔI GU/GIỌNG

**Luật gu (thẩm mỹ) và giọng (câu chữ) ở `.claude/playbooks/codex-gates.md` — đọc TRƯỚC khi đổi
H1/tagline/palette/hồ sơ thực thể.** Cổng kiểm máy (Zod + preflight + test) chỉ bắt **định dạng**;
gu, giọng và **sự thật của con số** do **người/Codex duyệt**, AI KHÔNG tự quyết:

- **ART GATE** — đổi palette/design system/hero visual/motion pass → `CODEX_ART_HANDOFF.md`.
- **COPY GATE** — định vị/tagline/H1 trang tiền/giá/claim/ads → `CODEX_COPY_HANDOFF.md`. Số phải có nguồn; không nguồn thì KHÔNG viết.
- **SEO GATE** — chốt từ khóa, đổi title/H1/slug trang đã index → `CODEX_SEO_HANDOFF.md`.
- **GEO GATE** — đổi hồ sơ thực thể (`legalName`/`taxId`/địa chỉ/`social[]`=`sameAs`/LocalBusiness) → `CODEX_GEO_HANDOFF.md`. **Zod PASS ≠ đúng sự thật** — MST sai vẫn build xanh.

Không thấy `.claude/playbooks/` ⇒ repo **chưa chạy bootstrap của toolkit** — xem `CLONE-CHECKLIST.md` bước 0. Đừng tự bịa luật thay thế.

## Quy trình (đúng 4 bước)

1. **`client.config.ts` — thương hiệu.** Điền `brand` (name, legalName, shortName, description ≥20 ký tự, domain không kèm `http`, logo `/...`), `theme.{primary,accent}` (#RRGGBB), `contact.{phone,phoneDisplay,email,address}`, `social[]` (URL đầy đủ), `nav[]`. Sai/thiếu → build FAIL (Zod). _Người dùng có thể chạy `node scripts/setup.mjs` để điền qua hỏi-đáp._

2. **`content.config.ts` — nội dung.** Mảng `sections` theo schema `src/content/schema.ts` (discriminated union: `hero | valueHighlights | about | leadership | events | testimonials | faq | cta | contact | contactForm`). BẮT BUỘC: đúng **1 `hero` ở đầu**, `id` không trùng, và trang lead-gen có **1 `contactForm`** (preflight bắt buộc trang chủ có form thu lead). KHÔNG để placeholder.

3. **Assets.** `public/logo.svg` (logo), `public/og.png` (ảnh share — hoặc `node scripts/make-og.mjs "#RRGGBB"`).

4. **Kiểm tra (BẮT BUỘC xanh):**
   ```bash
   pnpm install && pnpm verify
   ```
   `pnpm verify` = `typecheck` + `build` + `preflight` + `test` + `approval-gate`. Sửa cho đến khi exit 0.

## Quy tắc (không vi phạm)
- TUYỆT ĐỐI không sửa `src/` khi nhân bản (UI/SEO/guardrails dùng chung).
- Không ship placeholder/số liệu bịa — điền dữ liệu thật hoặc bỏ section.
- Tiêu chí "xong" = **`pnpm verify` exit 0**. KHÔNG tự nhận hoàn thành nếu chưa chạy verify xanh.
- Mọi thứ-có-thể-quên đều có cổng tự bắt — xem `CLONE-CHECKLIST.md`.

## Nhân bản & deploy — bẫy đã biết (đọc trước khi clone/deploy)

**Quy tắc cốt lõi: mỗi site nhân bản là MỘT project ĐỘC LẬP** — repo/thư mục riêng, `package.json` riêng, `node_modules` riêng, build & deploy riêng. Làm đúng vậy thì các bẫy dưới đây KHÔNG xảy ra.

1. **Clone chuẩn (standalone) — KHÔNG có vấn đề.** Tạo clone ở thư mục/repo riêng (degit hoặc copy, loại `node_modules`/`.next`/`.git`) → `pnpm install` → `pnpm verify` → deploy Vercel với **Root Directory = thư mục clone**. Project tự dùng Zod/tsconfig riêng nên mọi guardrail chạy đúng.

2. **Bẫy — lồng template vào repo của project KHÁC (monorepo).** Nếu đặt clone làm thư mục con trong một repo Next.js khác, `next build` của repo cha sẽ **type-check luôn code con** (vì `tsconfig.json` thường `include: ["**/*.ts"]`). Nếu cha dùng version package khác (vd Zod 4 trong khi template dùng Zod 3) → lỗi kiểu dù `pnpm verify` của con đã xanh (ví dụ thật: `.default({})` trên ZodObject hỏng dưới Zod 4). **Bắt buộc khi lồng:** thêm thư mục con vào `exclude` của tsconfig repo cha — `"exclude": ["node_modules", "<thu-muc-con>"]` — và đặt Vercel **Root Directory** trỏ đúng project; mỗi con vẫn `pnpm install`/`pnpm verify` độc lập.

3. **"Local xanh nhưng Vercel đỏ" — vì sao.** `pnpm verify` chạy trong ngữ cảnh của CHÍNH project (deps/tsconfig/Zod của nó). Vercel có thể build trong ngữ cảnh KHÁC (repo cha). ⟹ **Luôn kiểm tra trong đúng ngữ cảnh sẽ deploy.** Standalone thì tự khớp; lồng thì "cổng thật" là build của repo cha — phải để cha build xanh.

4. **Zod version-an toàn.** Ưu tiên `.default({ field: [] })` thay vì `.default({})` cho object có field bắt-buộc-nhưng-có-default — hợp lệ ở cả Zod 3 lẫn Zod 4, không vỡ khi đổi version.
