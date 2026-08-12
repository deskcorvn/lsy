# Marketing Skills Pipeline (kho `marketingskills/`)

Cầu nối giữa kho **47 marketing skills** (`D:\Workspace\A3 Landingpage\marketingskills` — Corey Haines, Agent Skills spec, MIT-style) và bộ đồ nghề agency. KHÔNG copy skills vào toolkit — dùng thẳng từ repo gốc (git riêng, pull upstream được). File này nói **khi nào dùng skill nào, ghép với gì**.

## Luật vận hành #1 — Context trước, skill sau

Mọi skill trong kho đều đọc **`.agents/product-marketing.md`** của project trước khi làm.
→ **Project mới/chưa có file này: chạy skill `product-marketing` TRƯỚC** (auto-draft từ codebase rồi cho khách sửa). Không có nó, mọi skill sẽ hỏi lại từ đầu và copy sẽ chung chung.

- ✅ `projects/giftyid/.agents/product-marketing.md` — đã tạo 07/2026.
- Clone site mới từ chassis → tạo file này ngay sau `client.config.ts`.

## Map 47 skills → tình huống agency

| Tình huống thật | Skills (theo thứ tự) | Ghép với toolkit |
|---|---|---|
| **Landing bán dịch vụ** (solution page) | `copywriting` → `cro` → `ab-testing` | art-direction-factory (visual) + impeccable (polish) |
| **Trang giá / gói** | `pricing` → `offers` → `cro` | giftyid đã có bảng giá thật — soi bằng offers |
| **SEO/AEO content** | `content-strategy` → `seo-audit`/`ai-seo` → `schema` | chassis đã có 5 trụ cột + geo-audit/citation-audit scripts — skill bổ lens chiến lược |
| **Lead magnet / thư viện** | `lead-magnets` → `emails` → `popups` (điều độ) | giftyid `/thu-vien` là lead magnet sẵn |
| **Ra mắt sản phẩm** (eCard, Mini App mới) | `launch` → `social` → `public-relations` | ecard-factory playbook |
| **Email nuôi dưỡng / bán** | `emails` → `cold-email` (outbound) → `sms` | agency-agents/sales (outbound, proposal) |
| **Ads** | `ads` → `ad-creative` → `ab-testing` → `analytics` | toolkit skills/ad-creative (bản cũ) — ưu tiên bản kho mới hơn |
| **Giữ khách / quay lại** | `onboarding` → `churn-prevention` → `referrals` | Mini App flows |
| **Nghiên cứu trước pitch** | `customer-research` → `competitors`/`competitor-profiling` → `marketing-ideas` | agency-agents/strategy phase 0 |
| **Kế hoạch marketing khách** | `marketing-plan` → `marketing-council` (multi-lens review) → `marketing-loops` | agents/strategy playbook |
| **Định vị khó/khách mới** | `product-marketing` → `marketing-psychology` → `offers` | brand-extract + brand-guidelines |

Nhóm ít dùng cho thị trường VN hiện tại: `aso` (chưa có app store), `paywalls`, `directory-submissions` (US-centric — thay bằng registry VN), `free-tools` (giữ ý tưởng cho GiftyTech tools).

## Chồng lấn với toolkit — ai thắng

- `agency-toolkit/skills/copywriting` + `ad-creative` (bản port cũ) **vs** kho mới: **kho `marketingskills/` thắng** (version 2.x, có evals + references + cross-link). Bản toolkit giữ làm fallback offline.
- SEO: chassis scripts (`geo-audit`, `citation-audit`) đo ĐIỂM; skills `seo-audit`/`ai-seo`/`schema` cho LENS + checklist thủ công. Dùng cả hai: script đo → skill diễn giải + fix.
- Agents `aeo-foundations` + `ai-citation-strategist` (đã cài) = bản agent hoá của `ai-seo`/`schema` — task lớn dùng agent, chỉnh nhanh dùng skill.

## Cách gọi skill từ repo ngoài

Skills nằm ngoài project → nạp thủ công khi cần:
1. Đọc `marketingskills/skills/<name>/SKILL.md` (+ `references/` nếu sâu).
2. Làm theo framework trong đó, với context từ `.agents/product-marketing.md` của project.
3. Skill nào dùng thường xuyên cho 1 project → copy riêng skill đó vào `<project>/.claude/skills/` (như chassis đã làm với design-*).

## Pipeline chuẩn: nâng một landing (đã dùng cho giftyid Phase 4→5)

```
product-marketing (context, 1 lần/project)
  → cro (audit trang theo 8 lens: value prop, CTA, friction, proof, ...)
  → copywriting (viết lại theo verbatim khách + psychology)
  → art-direction-factory + impeccable (visual + polish — Codex Art Gate nếu lớn)
  → ab-testing (nếu có traffic) / analytics (đo)
```
