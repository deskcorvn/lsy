# CONTENT PIPELINE — hệ tạo nội dung AI + multi-site publishing

> Mục tiêu: AI tự sinh nội dung ĐÚNG-VÀ-THẬT trên trang, sản xuất có nhịp, phân phối nhiều site —
> KHÔNG thành content farm. Nền tham chiếu: `vendor/geoflow` (GEOFlow, Apache-2.0). Đồ sẵn có:
> `chassis/.../scripts/{generate,geo-audit,citation-audit,seed-tenants}.mjs`.

## 1. geoflow là gì (đọc từ source, không đoán)

Một **content-engineering + multi-site distribution** backend cho GEO, viết **Laravel/PHP +
PostgreSQL(pgvector) + Redis + Docker**. Thế mạnh thật = **"nhà máy nội dung có nguồn + phân phối"**:

- Knowledge base + **RAG** (chunk → vector → recall khi generate — nội dung bám tài liệu thật)
- Material libraries: title / keyword / image / author / prompt
- Task automation: batch generate → draft pool → review toggle → publish cadence → queue → retry
- State machine: draft → review → publish → recycle (có cổng người)
- **Multi-site distribution**: GEOFlow Agent (gói PHP target-site), WordPress REST, generic HTTP API —
  mỗi channel sinh sẵn homepage/detail/sitemap/**llms.txt**/Schema
- Analytics + **AI-crawler detection** (đo AI có vào đọc không)

Chính README geoflow nhấn: *"知识库建设应该始终排在最前面"* (KB đứng đầu tiên) và không khuyến khích
tạo nhiễu hàng loạt — **khớp 100% luật toolkit** (số phải thật, không bịa).

## 2. Chassis đang có gì / thiếu gì (đối chiếu `generate.mjs`)

| | Chassis `generate.mjs` hiện tại | geoflow |
|---|---|---|
| Sinh nội dung AI | ✅ one-shot: brief → 1 prompt → nháp JSON | ✅ batch + queue |
| Chống câu-máy/số-bịa | ✅ system prompt + `auditContent` + Zod verify (cổng người biên tập) | ✅ review state |
| **Knowledge base + RAG** | ❌ prompt thẳng — không recall tài liệu → dễ chung chung/bịa | ✅ **cốt lõi** |
| Pipeline có trạng thái (draft/review/publish) | ❌ | ✅ |
| Material libraries (title/keyword/image) | ❌ | ✅ |
| Multi-site distribution | ⚠️ `seed-tenants` (đa tenant) — chưa phân phối 1-nguồn→N-site | ✅ |
| Analytics + AI-crawler log | ⚠️ `citation-audit` đo ngoài — chưa log crawler | ✅ |

**Gap giá trị nhất = Knowledge base + RAG.** generate.mjs phải CẤM-BỊA bằng lời vì AI không có gì để
bám; có RAG thì AI **chỉ nói được điều có trong KB** → chống bịa từ gốc (đúng thứ luật cổng cần).

## 3. Hai con đường (trình bày trade-off, không tự chọn)

### Con đường A — NATIVE pipeline trong chassis (KHUYẾN NGHỊ cho các site Gifty)
Port PATTERN geoflow sang Node/TS, giữ **content-as-code + SSG** của chassis.
- **Thắng:** cùng stack (không nuôi PHP/Laravel/Docker); SSG prerender + schema inline + llms.txt tự
  sinh = SEO/GEO tốt nhất (chính là lý do giftyid mạnh); **cắm thẳng 4 cổng + copy-craft + Zod verify**;
  mỗi bài AI sinh = 1 git commit → review/rollback miễn phí qua PR.
- **Hợp khi:** site của Gifty (giftyid, clones chassis), team có dev.

### Con đường B — geoflow-as-SERVICE (backend nặng, optional)
Deploy geoflow Docker riêng làm CMS, chassis nhận qua generic HTTP API channel.
- **Thắng:** admin UI cho team NON-technical tự tạo task/duyệt bài; distribute ra **WordPress** (nhiều
  khách VN dùng); dashboard phân phối + analytics tập trung cho **nhiều site không phải Next.js**.
- **Giá:** thêm một hệ PHP/Postgres/Redis/Docker để nuôi; content ra HTML qua agent/WP (kém kiểm soát
  schema/SSG hơn content-as-code).

### Con đường C — n8n HUB (bộ điều phối cho N site, bổ sung cho A — KHÔNG thay cổng)
MỘT n8n self-host (Docker, server sẵn có) điều phối mọi site chassis, hub-and-spoke:
`cron/RSS/search → RAG từ KB site → Claude API sinh nháp → mở PR vào repo site → CI chạy pnpm verify
(Zod+auditContent, cổng MÁY) → nút DUYỆT Telegram (human-in-the-loop node sẵn của n8n, cổng NGƯỜI)
→ merge → Vercel tự deploy`. Site vẫn SSG tĩnh — **AI không sống TRÊN website, AI NUÔI website qua git**.
- **Thắng:** hẹn giờ + research node + nút duyệt có sẵn; 1 dashboard cho N site; kho template AI-content
  lớn để tham khảo; mỗi bài = 1 PR (diff/review/rollback miễn phí).
- **Luật sắt:** n8n CHỈ được mở PR (cấm push main); mọi flow bắt buộc cắm verify + cổng duyệt —
  template n8n mặc định sinh-xong-đăng-luôn = content farm, không được dùng nguyên.
- **License:** n8n = Sustainable Use (fair-code) — self-host dùng nội bộ/agency phục vụ site khách OK;
  KHÔNG bán lại n8n như SaaS. Ghi NOTICE khi triển khai.

**C-lite — Vercel Cron (không cần n8n cho case đơn giản):** vì site đã ở Vercel, `vercel.json` crons →
route `/api/cron/*` (bảo vệ bằng `CRON_SECRET`) làm được **scheduler + execute + gọi API** — đủ cho
"mỗi ngày sinh 1 nháp → mở PR". KHÔNG có orchestration nhiều nhánh/retry/human-approval/connector →
cần mấy thứ đó mới lên n8n. Chi tiết + hạn mức: `skills/vercel-deploy` §3. Quy tắc: cron chỉ mở PR/draft,
không auto-publish.

### C-lite v2 — recipe cụ thể MVP: crawl thật → Sheet → Vercel Cron → Telegram duyệt (KHÔNG cần n8n)

Giải quyết khoảng trống của KB "chỉ tài liệu nội bộ": thêm khả năng **AI tự tìm kiếm/tổng hợp nguồn
web thật** trước khi generate. Toàn bộ chạy bằng hạ tầng đã quen (Vercel + Sheets + Telegram — cùng
pattern course-register/check-in/chấm công), KHÔNG cần Docker n8n:

```
Firecrawl/Crawl4AI (crawl nguồn thật theo chủ đề)
   → ghi vào Google Sheet: [chủ đề, nguồn URL, nội dung tóm, ngày crawl]  ← KB v1, người đọc/sửa được
       tay bằng lọc cột chủ đề (đủ cho vài chục–vài trăm dòng; KHÔNG cần vector store ở quy mô này)
   → Vercel Cron (`/api/cron/generate-draft`) đọc Sheet theo chủ đề trong backlog SEO Gate
   → Claude API sinh nháp — PROMPT BẮT BUỘC: answer-first + trích nguồn (URL/dòng Sheet cụ thể)
   → auditContent + Zod (cổng máy, sẵn có)
   → GitHub API mở PR (branch content-as-code) → Vercel dựng Preview URL
   → Telegram Bot gửi tin nhắn: [tiêu đề bài + link Preview + nút Approve/Reject]
   → Telegram webhook (`/api/telegram-webhook`, xác thực đúng chat admin) nhận bấm nút
       → Approve: GitHub API merge PR → Vercel tự deploy Production
       → Reject: đóng PR + ghi log lý do
```

**Chọn công cụ crawl (license khác nhau, chọn có chủ đích):**
| Công cụ | License | Vận hành | Khi nào chọn |
|---|---|---|---|
| **Crawl4AI** | Apache-2.0, free | Tự host (Python, cần server — đặt cùng chỗ n8n nếu có) | Mặc định — license sạch, không giới hạn |
| **Firecrawl** | Self-host = **AGPL-3.0**; **API cloud** = SaaS trả phí | Gọi qua `fetch()` từ Vercel (dùng API = KHÔNG dính AGPL, như gọi OpenAI) | Muốn nhanh, không muốn nuôi Python service |
*License có thể đổi — xác nhận lại trước khi tự host bất kỳ bản nào.*

**Luật riêng của recipe này (chống bịa khi nguồn là web NGOÀI, không phải tài liệu công ty):**
- Nội dung crawl từ đối thủ/ngành chỉ được dùng để mô tả **thị trường/xu hướng chung** — CẤM gán số
  liệu/thành tích của nguồn ngoài thành thành tích của chính doanh nghiệp (đúng lỗi P0 Codex đã bắt:
  75M+/68%/93% không nguồn ở `/dich-vu`). Prompt generate phải phân tách rõ 2 loại claim.
- Mỗi dòng Sheet giữ URL nguồn — draft sinh ra PHẢI trích được về dòng đó; không trích được = không dùng.
- Secret cần: `GITHUB_TOKEN` (mở/merge PR), `TELEGRAM_BOT_TOKEN` + `CHAT_ID`, `CRON_SECRET` — set theo
  env matrix ở `skills/vercel-deploy` (KHÔNG prefix `NEXT_PUBLIC_`).
- Đây có thể là ĐIỂM DỪNG đủ dùng — chỉ lên n8n hub khi thực sự cần nhiều nhánh/retry phức tạp/nhiều
  connector cùng lúc mà recipe này không kham nổi.

### RUNNER: GitHub Actions — nhà tự nhiên của automation (KHUYẾN NGHỊ, gọn hơn Vercel Cron)

Repo đã ở GitHub, và **chassis ĐÃ CÓ `.github/workflows/ci.yml`** chạy đúng cổng máy (pnpm verify +
chặn placeholder + chặn câu-máy `As an AI|Là một AI`) trên MỌI push/PR. Nên đặt runner ở GitHub Actions
là gọn nhất — KHÔNG cần Vercel Cron, KHÔNG cần n8n, KHÔNG cần nuôi server nào.

Kế hoạch TINH GỌN nhất — 1 workflow, tái dùng script + CI sẵn có:
```yaml
# .github/workflows/content-draft.yml
on:
  schedule: [{ cron: "0 2 * * 1" }]   # thứ 2 hằng tuần (cron Actions có thể trễ vài phút — ok cho content)
  workflow_dispatch: {}                # nút chạy tay để test
jobs:
  draft:
    steps:
      - checkout
      # CRAWL — Crawl4AI chạy EPHEMERAL ngay trong runner (pip install, KHÔNG cần nuôi Python server):
      #   crawl4ai: arun() → markdown sạch · extraction_strategy (CSS/LLM) · deep_crawl theo link
      #   HOẶC Firecrawl API qua fetch: /search (tìm+scrape 1 lần) · /scrape · /extract (schema)
      - run: crawl theo chủ đề trong backlog → ghi KB (Sheet hoặc file repo) kèm URL nguồn
      - run: node scripts/generate.mjs --run   # đã có; nâng để đọc KB + BẮT trích nguồn
      - run: pnpm verify                        # cổng máy (cũng chạy lại khi PR mở)
      - uses: peter-evans/create-pull-request   # mở PR (branch content-as-code)
      # → Vercel tự comment Preview URL vào PR · (tùy chọn) Telegram ping
```
Rồi: bạn mở PR trên điện thoại → thấy link Preview Vercel tự comment → bấm **Merge** → Vercel deploy
Production. **"Đẩy lên Vercel" xảy ra TỰ ĐỘNG** vì Vercel nối sẵn repo GitHub — Actions KHÔNG nói chuyện
trực tiếp với Vercel, chỉ quản git/PR; Vercel phản ứng với git. Đây là tách vai sạch nhất:
**GitHub = nhà máy nội dung + cổng máy · Vercel = chỉ build/host/deploy.**

Vì sao GitHub Actions > Vercel Cron cho việc này: runtime dài (crawl+LLM chậm, Vercel function có
timeout); Crawl4AI ephemeral trong job (gỡ đúng lo "phải nuôi Python service"); cổng máy đã có trong
ci.yml; tạo PR native. Nhược: cron Actions có thể trễ/skip lúc tải cao — không hợp việc gấp giờ.

**Tận dụng "agent GitHub":**
- **GitHub Actions** = runner scripted (khuyến nghị — deterministic, rẻ, hợp pipeline định kỳ).
- **GitHub Copilot coding agent** (tùy chọn): giao issue "viết bài về X / sửa Y" → agent làm trong môi
  trường Actions → mở PR review. Cần Copilot sub, ít deterministic — hợp task RỜI, không hợp cron định kỳ.
- **GitHub Models**: model host sẵn — có thể làm LLM ngay trong Action nếu không muốn gọi Anthropic ngoài.
- Sẵn trong toolkit: `vendor/ecc/skills/github-ops` · `vendor/agency-agents/integrations/github-copilot`.

**Chọn runner:** GitHub Actions (mặc định, gọn) → Vercel Cron (nếu muốn gói trọn trong Vercel) →
n8n (chỉ khi cần orchestration giàu nhánh/retry/connector cùng lúc).

### Khuyến nghị: **A là ĐỘNG CƠ, GitHub Actions là RUNNER, B chỉ khi khách cần CMS non-tech/WordPress.**
A (KB/RAG + generate trong chassis) quyết chất lượng; C (n8n) quyết nhịp sản xuất + trải nghiệm duyệt;
không nuôi B nếu chưa có nhu cầu thật. Thứ tự build: P1 (KB/RAG) → P2 (generate nâng cấp) → rồi mới
dựng n8n flow gọi chúng — dựng C trước khi có A là tự động hóa cái rỗng.

## 4. Pipeline NATIVE — 7 stage, mỗi stage cắm 1 cổng (không tạo cổng mới)

```
0. KNOWLEDGE BASE  ← làm TRƯỚC mọi thứ (luật geoflow: KB đứng đầu)
   Nguồn THẬT: REQUIREMENTS.md, hồ sơ năng lực, giá niêm yết, verbatim khách, docs công ty.
   → chunk → embed (pgvector hoặc local store) → index. KHÔNG có KB thì KHÔNG generate.

1. PLAN            → [SEO GATE]  title/keyword library ← Search Console + Suggest (bằng chứng thật);
                     mỗi từ khóa 1 bài, gắn intent. Backlog chủ đề.

2. GENERATE (RAG)  retrieve KB theo chủ đề → prompt answer-first + BẮT TRÍCH NGUỒN → nháp JSON
                     (nâng cấp generate.mjs: thêm retrieval + citation field).

3. VERIFY MÁY      auditContent + Zod (sẵn có) chặn câu-máy/số-bịa/placeholder — cổng tự động.

4. COPY GATE       [copy-craft ≥8/10] + duyệt giọng/định vị. Chưa đạt → sửa, KHÔNG publish.
                     Subtractive pass: mỗi đoạn một ý; bỏ câu lặp/jargon/tính từ không có chứng cứ;
                     người đọc ngoài dự án phải hiểu thông điệp chính ngay lượt đầu.

5. GEO GATE        JSON-LD + entity + llms.txt + answer-first; Rich Results Test.

6. PUBLISH         commit content-as-code (seo-content.ts/content.config) → git → SSG build → deploy.
                     ⛔ KHÔNG auto-publish thẳng production. Cổng người = ranh giới factory vs farm.

7. DISTRIBUTE+ĐO   1 KB → N tenant (seed-tenants); citation-audit + vòng lặp GSC hằng tuần; log AI crawler.
```

## 5. Hai luật sống-còn (phân biệt "nhà máy" với "trại spam")

1. **KB trước, tự động sau.** Không có tài liệu thật thì mọi tự động chỉ khuếch đại nhiễu (geoflow tự
   nói vậy). RAG + trích nguồn = mỗi câu truy được về KB → hết bịa.
2. **Không auto-publish thẳng production.** Mọi bài AI qua cổng người (COPY) + máy (Zod/GEO) trước khi
   git commit. Tốc độ có thể cao, nhưng cổng không được bỏ — đó là uy tín thương hiệu.

## 6. Roadmap build (khi user chốt con đường A)
- **P1 (móng, BẢN NHẸ — khuyến nghị bắt đầu):** KB v1 = Google Sheet (không cần pgvector) — nạp thủ
  công vài chục dòng từ docs thật của 1 site; nếu cần crawl ngoài thì thêm Crawl4AI/Firecrawl (§ C-lite
  v2). Nâng lên vector store CHỈ khi Sheet vượt quá khả năng lọc-theo-cột (hàng trăm+ dòng, chủ đề chồng lấn).
- **P2:** nâng `generate.mjs` → đọc KB (Sheet hoặc vector) + citation bắt buộc; giữ dry-run + auditContent.
- **P3:** GitHub Actions workflow (khuyến nghị) HOẶC Vercel Cron: crawl → KB → generate → mở PR;
  Vercel tự dựng Preview, cổng máy ci.yml tự chạy, duyệt bằng merge PR (Telegram tùy chọn).
- **P4:** distribute 1-nguồn→N-tenant (mở rộng seed-tenants); citation-audit định kỳ + crawler log;
  nâng lên n8n hub CHỈ khi P3 không kham nổi độ phức tạp (nhiều nhánh/retry/connector).

## 7. Nối các playbook khác
Cổng: `codex-gates.md` (COPY/SEO/GEO). Đo & off-site: `offsite-gsc-loop.md`. Đặc tả feature lớn:
`spec-kit-pipeline.md`. Chất văn: `skills/copy-craft`.
