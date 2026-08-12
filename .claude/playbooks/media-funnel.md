# MEDIA FUNNEL — ảnh/video/social/ads đẩy về 2 trang tiền (mở rộng content-pipeline)

> **North Star (user chốt 13/07): MỘT TRỤ NỘI DUNG DUY NHẤT — "Bộ não thứ 2 cho chủ doanh nghiệp".**
> Không rải chủ đề. Chuỗi chuyển đổi: `video/bài đăng về bộ não thứ 2 (tò mò, nỗi đau quên-lời-hứa)
> → /kien-thuc/bo-nao-thu-2-cho-thanh-vien-bni (niềm tin + AI trích) → /khoa-hoc-ai-thuc-chien
> (chuyển đổi: giữ chỗ 500k)`. Marketing đa kênh trong khóa = phần PHỤ trợ lực, không phải trụ riêng.
> Mọi asset đo bằng MỘT số: bao nhiêu đăng ký khóa học. Nội dung mẫu vô tận vì chính workspace này
> LÀ một bộ não thứ 2 đang vận hành — quay/chụp việc thật, không cần dựng kịch bản giả.
> Audit 8 repo `D:\Workspace\AI Video Generate` (workflow 13/07, 493k token) — kết luận dưới đây.
> Giáo án thực hành khóa học (phần mở rộng): `projects/giftyid/docs/12-giao-an-thuc-hanh-khoa-hoc-ai.md`.

## 1. Bản đồ công cụ theo khâu phễu (đã audit thật, không đoán)

| Khâu | Công cụ | License | Phán quyết | Ghi chú |
|---|---|---|---|---|
| Nghiên cứu trend | **MediaCrawler** | NON-COMMERCIAL 1.1 | ❌ **SKIP** | Cấm thương mại + chỉ MXH Trung Quốc (không FB/TikTok-global/YT/Zalo). Chỉ học pattern Playwright-session. |
| **Sinh VIDEO** (chủ lực) | **openshorts** | MIT | ✅ **ADOPT** (service riêng) | 3-trong-1: cắt short từ video dài · AI Shorts diễn viên UGC · YouTube Studio (thumbnail/tiêu đề). Đăng TikTok/IG/YT qua Upload-Post. |
| Sinh video (rẻ, volume) | **MoneyPrinterTurbo** | MIT | ✅ ADOPT (phụ) | Script+giọng+phụ đề ghép STOCK Pexels/Pixabay (KHÔNG phải AI-image). **XÓA resource/songs mặc định (bản quyền YouTube) trước khi dùng.** |
| Sinh VOICE / lồng tiếng | **OmniVoice-Studio** | AGPL-3.0 | ⚠️ **API-ONLY** | ElevenLabs thay thế chạy local (miễn phí sau khi có GPU), tiếng Việt + 646 ngôn ngữ. Gọi qua API OpenAI-compatible; **KHÔNG fork mã vào repo proprietary** (AGPL network-copyleft). |
| Sinh PROMPT video | **veo3-prompt-generator** | MIT | 📎 **TRÍCH FILE** | App phân kỳ/mock — chỉ lấy 2 file `veo3_meta_prompt_{compact,enhanced}.md` (schema prompt định lượng) làm template prompt-tooling. |
| Sinh video Veo3 | veo3-ai-story-automation · **Flow-automation** | KHÔNG license | ❌ **SKIP** | Scrape UI Google Flow (vi phạm ToS, dễ khóa acc), module thiếu/không build được. **Flow-automation LỘ credential Google.** → dùng Veo API CHÍNH THỨC (Gemini/Vertex) nếu cần. |
| **PHÂN PHỐI đa nền tảng** | **AiToEarn** | MIT (giá trị = SaaS) | ⚠️ **API-ONLY** (MCP) | Đăng FB/TikTok/YT/IG/X… qua MCP (x-api-key). **KHÔNG có Zalo.** SaaS gốc Trung Quốc (nội dung đi qua server họ). Đừng self-host monorepo (quá nặng). |
| Sinh ẢNH brand | *(không repo nào chuyên)* | — | ➕ **BỔ SUNG** | openshorts dùng fal.ai Flux cho b-roll/diễn viên. Ảnh brand riêng = fal.ai Flux / Gemini image API — khâu còn thiếu, cần thêm. |
| QUẢNG CÁO | **Meta Ads MCP** (đã kết nối) | SaaS API | ✅ dùng | Tạo campaign/ad set/creative FB-IG qua API. TikTok/Google ads = riêng. |

## 2. Kiến trúc: media là TẦNG DỊCH VỤ RIÊNG, không nhét vào Vercel

Khác biệt cốt lõi với pipeline chữ: **tất cả công cụ media là Python nặng (torch/whisper/mediapipe/FFmpeg),
cần GPU + Docker — KHÔNG chạy trên Vercel function.** Vậy tách 2 tầng rạch ròi:

```
TẦNG CHỮ (đã có): GitHub Actions/Vercel — text → content-as-code → SSG. Nhẹ, không GPU.
TẦNG MEDIA (mới): 1 box GPU (VPS/server sẵn) chạy các service Docker + gọi SaaS API:
   nguồn = thông điệp 2 trang tiền / KB
   → script (Claude/Gemini)                         → [COPY GATE: copy-craft ≥8/10]
   → voice: OmniVoice API (VN, free sau GPU)
   → ảnh: fal.ai Flux · video: openshorts (chủ lực) / MoneyPrinter (rẻ)   → [ART GATE: thumbnail/style]
   → caption + CTA (LUÔN link 2 trang tiền)         → [COPY GATE]
   → phân phối: AiToEarn MCP → FB/TikTok/YT · Zalo OA riêng (giftyid đã có)
   → quảng cáo: Meta Ads MCP → FB/IG (khuếch đại bài organic thắng)       → [ADS BUDGET GATE ⛔]
   → tất cả link về → 2 TRANG TIỀN → website (SEO/GEO, AI trích)
   → đo: bài/ad nào ra đăng ký khóa học → lặp
```
Orchestrator (GitHub Actions/n8n) chỉ *ra lệnh* cho tầng media qua API/MCP, không chứa mã Python.

## 3. Cổng cho media (mở rộng codex-gates, thêm 1 cổng tiền)

- **COPY GATE** (có sẵn): script video, caption, ad copy → copy-craft ≥8/10 + duyệt. CTA phải trỏ trang tiền.
- **ART GATE** (có sẵn): thumbnail, style video, khung hình chủ lực → DESIGN.md.
- **ADS BUDGET GATE (MỚI):** quảng cáo tiêu TIỀN THẬT → BẮT BUỘC người duyệt ngân sách + đối tượng +
  creative TRƯỚC khi campaign chạy. Như luật "không auto-publish" nhưng cho tiền. Meta Ads MCP chỉ được
  tạo campaign ở trạng thái PAUSED; bật ON là hành động của người.

## 4. Cảnh báo bảo mật (từ audit — xử lý trước khi đụng repo)
- **Flow-automation**: hardcode mật khẩu Google plaintext trong `selenium_bot.py` (~dòng 904). Credential
  của người khác đã lộ → KHÔNG chạy; nếu đã từng dùng, chủ tài khoản phải đổi mật khẩu.
- **AiToEarn**: commit sẵn locize key + docker default yếu (`JWT_SECRET: change-this-jwt-secret`, mongo
  admin/password) → nếu self-host phải rotate hết. Khuyến nghị dùng SaaS/MCP, không self-host.
- Mọi API key media (GEMINI/FAL/ELEVENLABS/AiToEarn x-api-key) = server secret, KHÔNG prefix NEXT_PUBLIC.

## 5. Sự thật về chi phí + rủi ro (không tô hồng)
- **Tốn tiền thật:** openshorts ~$0.65–2/AI Short (fal.ai+ElevenLabs); OmniVoice free nhưng cần box GPU;
  ads = ngân sách riêng. Chốt ngân sách/tháng TRƯỚC khi chạy số lượng.
- **Nền tảng phạt AI slop:** TikTok/FB hạ reach nội dung AI cẩu thả. Nước đi thắng = **volume THẤP, chất
  CAO, mỗi asset trỏ trang tiền**, ads khuếch đại bài organic đã chứng minh hiệu quả. KHÔNG phải 1000 video auto.
- **ToS:** chỉ dùng API chính thức (Veo qua Gemini/Vertex, không scrape UI). Cloning giọng người thật cần
  đồng ý + tuân luật disclosure AI của nền tảng ads.

## 6. MVP tinh gọn khuyến nghị (khi build)
1. **1 box GPU** dựng **openshorts** (docker compose) — engine video chủ lực; chốt budget fal.ai/ElevenLabs.
2. **OmniVoice** cùng box làm voice VN (thay ElevenLabs để cắt phí/char).
3. Tùy biến script openshorts: hook/CTA/mô tả LUÔN dẫn 2 trang tiền.
4. Phân phối: **AiToEarn MCP** cho FB/TikTok/YT + **Zalo OA riêng**.
5. Ads: **Meta Ads MCP** tạo campaign PAUSED → duyệt → bật.
6. Trích 2 meta-prompt Veo3 vào prompt-tooling để nâng chất input.

## 7. Còn thiếu (gap thật)
- **Zalo distribution**: không tool nào cover → dùng Zalo OA API (giftyid đã có pattern ZNS).
- **Sinh ảnh brand chuyên dụng**: chưa có tool riêng → fal.ai Flux / Gemini image, thêm bước.
- **Veo API chính thức**: nếu cần video Veo3 chất cao → Gemini/Vertex Veo (trả phí, có key), KHÔNG scrape.
- **Nghiên cứu trend hợp pháp**: MediaCrawler bị loại → dùng API chính thức nền tảng hoặc social listening trả phí.

## 8. Nối playbook khác
Sinh chữ: `content-pipeline.md` · cổng: `codex-gates.md` (+ADS BUDGET GATE ở đây) · chất văn: `skills/copy-craft`
· deploy web: `skills/vercel-deploy` · đo & off-site: `offsite-gsc-loop.md`.
