# Citation Audit — đo OFF-SITE (AI có nhắc/trích brand không)

Bổ sung cho `geo-audit` (đo ON-SITE). Theo phương pháp agent **AI Citation Strategist**.
`geo-audit` trả lời *"nền của mình đã sẵn sàng chưa"*; `citation-audit` trả lời *"AI có THỰC SỰ
nhắc/trích brand khi khách hỏi không"*.

## Đo 2 tầng: được NHẮC vs được DẪN LINK (nâng cấp 16/07/2026)
Bản cũ chỉ substring-match tên brand trong câu trả lời → gộp *"AI biết brand"* với *"AI chọn brand
làm nguồn"*. Thực tế hai thứ này rất khác: brand có thể được nhắc 3/3 câu nhưng chỉ được dẫn link
1/3 — và đối thủ mới là nguồn được trích. Bản mới tách rõ:
- **Tầng 1 — nhắc**: tên/alias brand xuất hiện trong câu trả lời.
- **Tầng 2 — dẫn link**: domain brand (`domains`) xuất hiện trong danh sách **URL nguồn** engine trả về
  (Perplexity trả `citations`/`search_results`; Claude bóc URL lộ trong text).
- **Nguồn về tay ai**: bảng chi tiết mỗi prompt được dẫn từ domain nào — thấy ngay đối thủ nào
  (`competitorDomains`) đang chiếm thẻ nguồn ở câu ta thua.
Khoảng cách **% nhắc − % dẫn link** chính là việc cần đóng.

## Chạy
1. Copy `citation-audit.config.example.json` → `citation-audit.config.json`, điền:
   - `brand` + `aliases` (các cách viết tên).
   - `domains`: domain của brand — **bắt buộc để đo tầng "dẫn link"** (tự bóc từ alias nếu thiếu).
   - `competitors` (2–4 đối thủ) + `competitorDomains` (để biết đối thủ nào chiếm link nguồn).
   - `prompts`: 20–40 câu **khách thật sự hỏi AI** (recommendation / so sánh / how-to / best-of).
2. Set API key: `PERPLEXITY_API_KEY` (khuyên dùng — có web search, trả nguồn thật) và/hoặc `ANTHROPIC_API_KEY`.
3. `node scripts/citation-audit.mjs --config citation-audit.config.json` → DRY-RUN (xem kế hoạch + domain nhận diện).
4. Thêm `--run` để gọi API thật → báo cáo ra `citation-audit-report.md`:
   - Scorecard **% nhắc và % dẫn link** riêng theo từng engine.
   - Prompt mất điểm THẬT (ta không được dẫn link, đối thủ thì có).
   - Bảng nguồn được dẫn theo từng prompt (ai chiếm thẻ nguồn).
   - Fix pack, ưu tiên các câu "chỉ nhắc → cần đẩy thành dẫn link".

> ⚠️ **Không đo Google AI Overview**: AIO không có API công khai. Công cụ này chỉ đo Perplexity +
> Claude. Muốn số AI Overview → Search Console "Generative AI performance" (nếu tài khoản đã bật) hoặc
> prompt audit tay. Đừng suy ra AIO từ số ở đây.

## Là deliverable bán cho khách
- **Lần 1 (baseline)** → giao fix pack → **recheck sau 14 ngày** → báo cáo cải thiện.
- KPI tham chiếu: tỉ lệ trích **+20%/30 ngày**, có mặt **≥3/4 engine**, thu hẹp gap với đối thủ ≥30%.

> Trung thực: Perplexity tìm web thật (sát citation nhất); Claude/OpenAI phản ánh kiến-thức-mô-hình.
> AI phi-xác-định → kết quả là **ảnh chụp thời điểm**, "cải thiện khả năng được trích" chứ không cam kết được trích.
