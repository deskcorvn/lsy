---
name: vercel-deploy
description: "Knowledge + skill pack để coding agent (Claude/Codex/Cursor) deploy đúng các site chassis lên Vercel — env matrix (build vs runtime, chống lộ secret), mô hình preview/production theo PR, Vercel Cron cho content automation (nhánh nhẹ thay n8n), và các gotcha THẬT đã gặp ở giftyid/chassis. Dùng khi: chuẩn bị go-live, cấu hình env, dựng cron sinh nội dung, hoặc debug build fail trên Vercel."
metadata:
  author: giftytech
  type: ops
user-invocable: true
---

# vercel-deploy — deploy chassis site lên Vercel ĐÚNG cách

Chassis = Next.js SSG deploy Vercel (đó là lý do SEO/GEO mạnh + hosting rẻ). Skill này là bộ luật
vận hành, không phải lý thuyết — chưng cất từ go-live thật của giftyid.

## 1. ENV MATRIX — luật quan trọng nhất (sai = lộ secret hoặc sai domain)

| Loại | Prefix | Đọc lúc | Ví dụ | Cảnh báo |
|---|---|---|---|---|
| Public build-time | `NEXT_PUBLIC_*` | BUILD, nhúng vào bundle client | `NEXT_PUBLIC_SITE_URL` | Ai xem source cũng thấy — CHỈ đặt thứ công khai |
| Server secret | (không prefix) | RUNTIME, chỉ trên server | `SHEETS_WEBAPP_URL`, `SEPAY_WEBHOOK_API_KEY`, `ANTHROPIC_API_KEY`, `CRON_SECRET` | **TUYỆT ĐỐI không thêm `NEXT_PUBLIC_`** → sẽ lộ ra client |

- **`NEXT_PUBLIC_SITE_URL` BẮT BUỘC set đúng domain thật** (www hay non-www theo domain đang chạy) —
  sitemap/canonical/OG/robots/llms.txt đều đọc từ đây (site.ts có fallback nhưng fallback = sai domain
  khi lệch). Set ở cả 3 scope Production/Preview/Development nếu cần build preview đúng.
- Đổi env → phải **redeploy** (env build-time không hot-reload vào bundle cũ).
- Secret đã lộ (commit nhầm/log) → rotate ngay, không tái dùng (luật bảo mật).

## 2. Mô hình deploy — GitHub → Vercel (Vercel KHÔNG deploy trực tiếp; nó phản ứng với git)

Vercel nối vào **repo GitHub**: `push branch → Preview URL (mỗi PR 1 URL, Vercel comment vào PR)` ·
`merge main → Production`. Không ai "đẩy lên Vercel" thủ công — mọi thứ đi qua git. Đây là khớp nối cho
content pipeline: runner (**GitHub Actions** khuyến nghị / Vercel Cron / n8n) **mở PR** → Vercel tự dựng
Preview → duyệt → merge → Production tự deploy. Site vẫn tĩnh; AI nuôi site qua git, không chạy runtime trên site.

**Cổng máy đã có sẵn ở GitHub:** chassis ship `.github/workflows/ci.yml` chạy `pnpm verify` + chặn
placeholder + chặn câu-máy trên mọi PR. GitHub Actions cũng là nơi gọn nhất đặt job sinh nội dung định kỳ
(schedule cron + tạo PR native + runtime dài hơn Vercel function). Chi tiết: `playbooks/content-pipeline.md`.
Lưu ý: giftyid hiện deploy zero-config CHƯA có `.github/workflows` — thêm ci.yml (theo mẫu chassis) khi
muốn cổng máy + content automation chạy trên CI.

## 3. Vercel Cron — nhánh NHẸ cho content automation (thay n8n khi đơn giản)

Đúng như nhận định: Vercel Cron gánh được **scheduler + execute + gọi API**; KHÔNG có orchestration
nhiều nhánh / retry phong phú / human-approval UI / connector — cần mấy thứ đó thì n8n.

`vercel.json`:
```json
{ "crons": [ { "path": "/api/cron/generate-draft", "schedule": "0 2 * * *" } ] }
```
- Route `/api/cron/*` phải tự bảo vệ: check header `Authorization: Bearer ${CRON_SECRET}` (Vercel gửi
  kèm nếu đặt env `CRON_SECRET`) — không thì ai cũng gọi được.
- **Hạn mức:** gói Hobby cron chạy tối đa ~1 lần/ngày; Pro trở lên tần suất tùy ý — xác nhận hạn mức
  hiện hành trên dashboard (Vercel đổi theo thời gian).
- Route cron nên **mở PR / ghi draft**, KHÔNG tự publish thẳng (giữ cổng người — luật content-pipeline).
- Khi nào lên n8n: cần nhiều bước có điều kiện, retry theo lỗi, duyệt Telegram, nhiều nguồn/connector.

## 4. GOTCHA THẬT (đã gặp ở giftyid — không phải lý thuyết)

1. **Font offline khi build:** `next/font/google` FETCH lúc build. Vercel có mạng nên chạy, nhưng
   local offline thì fail → **bundle font local** (đọc từ disk), như OG card giftyid dùng Source Serif.
   An toàn hai chiều + không phụ thuộc mạng build.
2. **Asset đọc runtime bằng `process.cwd()`** (vd font cho satori OG) KHÔNG được @vercel/nft trace tự động
   → khai báo `outputFileTracingIncludes` trong `next.config` để Vercel đóng gói file vào serverless,
   nếu route có thể chạy động. (giftyid: fonts OG + logo.)
3. **giftyid build bằng `next build --webpack`** (không Turbopack) — giữ đúng flag khi CI/verify.
4. **Redirect SEO an toàn:** đổi URL/slug đã index → `redirects()` trong next.config (301), đừng để
   Vercel 404 (mất thứ hạng). giftyid có sẵn 301 cho các route B2B cũ.
5. **`.env.local` không lên Vercel** — mọi env phải nhập ở Project Settings (hoặc `vercel env`), không
   dựa vào file local. `.env*` phải gitignore.

## 5. CHECKLIST GO-LIVE (chạy trước khi trỏ domain)

- [ ] `NEXT_PUBLIC_SITE_URL` = domain production thật (Production + Preview).
- [ ] Mọi server secret đã nhập (không prefix NEXT_PUBLIC): Sheets/SePay/API key/CRON_SECRET.
- [ ] `next build --webpack` xanh trên CI; không lỗi font/asset.
- [ ] Mở `https://<domain>/sitemap.xml` + `/robots.txt` + `/llms.txt` — đúng domain, load được.
- [ ] Domain trỏ đúng (www vs non-www thống nhất với SITE_URL); redirect cũ→mới là 301.
- [ ] (Nếu bật cron) `CRON_SECRET` đặt + route check header; cron chỉ mở PR/draft.
- [ ] Sau deploy: submit sitemap GSC + Bing; validate OG bằng Zalo/FB debugger (xem offsite-gsc-loop).

## 6. Cập nhật theo docs mới
Vercel đổi hạn mức/tính năng thường xuyên — khi làm việc quan trọng (cron limit, runtime, image),
xác nhận lại ở `vercel.com/docs` thay vì tin số cứng trong skill này. Chi tiết deploy/env riêng của
site: đọc `README`/docs của repo đó trước.

## Chống trùng lặp
Đo & submit sau deploy → `playbooks/offsite-gsc-loop.md`. Pipeline sinh nội dung → `playbooks/content-pipeline.md`
(cron ở đây = nhánh nhẹ của Con đường C). Secret/bảo mật → hiến chương ECC (`~/.claude/rules/ecc`).
