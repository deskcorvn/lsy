# CODEX GATES — bốn cổng duyệt bắt buộc: THẨM MỸ · CÂU TỪ/MARKETING · SEO · GEO

> Nguyên tắc chung: Claude làm hạ tầng + phương án + ràng buộc; **quyết định GU (thị giác) và
> GIỌNG (ngôn ngữ/định vị) dừng ở cổng, chờ Codex/người duyệt**. Mỗi đợt qua cổng = 1 file
> handoff ở root repo của project, Codex làm xong thì đợt sau ghi đè file bằng đợt mới.

## Điều kiện vào cổng — áp dụng cho CẢ BỐN cổng

Trước khi mở BẤT KỲ file handoff nào:

- **Kiểm đồ nghề có thật ở nơi đang chạy.** Trong toolkit: `node scripts/verify-toolkit.mjs`
  (cổng kiểm tự động: sổ sách ↔ đĩa). Trong project khách: `.claude/skills/` phải có đủ
  **`copy-craft`** và **`animation/skills/review-animations`**, `.claude/playbooks/codex-gates.md`
  phải tồn tại.
- **Thiếu công cụ = chưa đủ điều kiện mở cổng, KHÔNG phải lý do bỏ cổng.** Hai điều kiện vào cổng
  bên dưới (copy-craft ≥8/10 · review-animations) từng không gọi được ở project thật vì bootstrap
  chưa mang playbooks/design-systems xuống — gặp tình huống này thì cài bù rồi mới mở cổng.
- Handoff viết ở **root repo của project**, không viết trong toolkit.

## Luật xuyên suốt — Vừa đủ để hiểu ngay

Mọi cổng ART/COPY/SEO/GEO cùng áp dụng một tiêu chuẩn: **người xem hiểu đúng ý chính trong một lượt nhìn/đọc, không phải giải mã và không bị nhồi thông tin**.

- Một surface chỉ có một nhiệm vụ chính: một headline, một bằng chứng, một hành động hoặc một kết luận.
- Câu từ dễ hiểu, thân thiện, dùng từ người mua nói; bỏ jargon, khẩu hiệu rỗng và superlative không có chứng cứ.
- Bố cục phải có khoảng thở; ảnh, chữ và UI không tranh nhau làm điểm nhấn.
- Nội dung phụ chỉ được giữ khi bỏ nó đi làm người xem hiểu sai hoặc không thể hành động.
- “Đủ dữ kiện” không đồng nghĩa “đưa mọi dữ kiện lên cùng một màn hình”. Chi tiết chuyển xuống section sau, caption, FAQ hoặc trang chuyên sâu.
- Test 5 giây: người ngoài dự án nói lại được `đây là gì / dành cho ai / bằng chứng nào` bằng một câu. Không làm được thì chưa qua cổng.

## Cổng 1 — ART GATE (`CODEX_ART_HANDOFF.md`) — đã vận hành

Kích hoạt khi: chọn/đổi design system, palette, poster/asset chủ lực, hero visual, motion pass,
variant layout mới cho trang tiền. Trong `art-direction-pipeline.md` đây là §5.5, ngay sau khi chốt
direction/palette/signature. Ví dụ thật: poster khóa học giftyid, 3 hệ mobile zmp-toolkit.

> **Output ĐƯỢC DUYỆT của ART GATE = một `DESIGN-SYSTEM.md` KHOÁ + versioned** (token+component+bố cục), sống
> suốt dự án; mọi build sau đối chiếu nó, `design-craft` chấm COMPLIANCE. Quy trình khoá + template + luật
> "extract > invent" + "skip gate được, skip lock KHÔNG": **[`design-system-lock.md`](design-system-lock.md)**.
> Bài học mamquanghai: bỏ khoá design-system → 5 vòng làm lại.

### Claude chuẩn bị (Definition of ready của ART GATE)
1. **`STYLE_PROMPT.md` đã điền đủ Definition of ready** — checklist nằm ở CUỐI
   `playbooks/style-prompt-brief.md` (mục "Definition of ready"): mục tiêu + primary action,
   audience + quyết định họ cần đưa, north-star scene + 3 tính từ brand, section choreography,
   một signature move CÓ TÊN primitive, responsive 390/768/1440, content/asset truth + danh sách
   cấm sao chép. Thiếu mục nào = chưa được mở cổng (gương của luật copy-craft ≥8/10 bên COPY GATE).
2. Bối cảnh + ràng buộc từ DESIGN.md (token, lanes, anti-patterns đang có).
3. **2–3 phương án** cho mỗi quyết định gu, mỗi phương án 1 dòng lý do — không đưa 1 phương án ép duyệt.
4. QA checklist + screenshot các viewport.
5. **Scan `skills/design-humanizer` đã chạy và fix xong** (22 pattern design-slop: gradient tím AI,
   glassmorphism tràn, grid đồng phục, glow/pulse vô hạn...) — gương của luật review-animations
   bên motion: quên chạy = chưa đủ điều kiện mở cổng; dây chuyền ở `humanizer-pipeline.md`.

ART GATE phải kiểm tra thêm: chỉ một focal point mỗi viewport; headline không đè ảnh chủ lực; không dùng decoration để bù cho asset yếu; bản mobile/thumbnail vẫn giữ đúng thứ bậc sau khi bỏ bớt chi tiết.

### Điều kiện vào cổng cho MOTION (gương của luật copy-craft ≥8/10 bên COPY GATE)
Đợt việc có animation/transition/gesture (motion pass, hero enter, micro-interaction, page
transition) thì **TRƯỚC khi mở `CODEX_ART_HANDOFF.md` phải chạy skill
`skills/animation/skills/review-animations`** (Emil Kowalski, cổng khắt khe default-flag) và sửa
hết finding bị flag. Skill này có `disable-model-invocation: true` — AI KHÔNG tự kích hoạt, phải
gọi tường minh; vì vậy luật nằm ở đây: quên gọi = chưa đủ điều kiện mở cổng. Motion chưa qua
review-animations thì Codex không duyệt — cổng duyệt GU, không sửa easing/duration hộ.
- Audit motion cả codebase (không phải 1 diff): dùng `improve-animations` → plan trong `plans/`.
- Từ vựng khi mô tả hiệu ứng trong handoff: `animation-vocabulary` (gọi đúng tên, khỏi tả vòng).
- Luật nền đã có sẵn trong chassis: cổng a11y `reduced-motion` (design-pipeline) vẫn áp dụng.

## Cổng 2 — COPY GATE (`CODEX_COPY_HANDOFF.md`) — cổng MỚI cho câu từ, ngôn ngữ, marketing

### Kích hoạt cổng (BẮT BUỘC dừng chờ duyệt)
- **Định vị / tái định vị** sản phẩm, dịch vụ, khóa học (như đợt "AI Marketing" theo góp ý Mr Tuấn).
- **Tagline, tên sản phẩm/gói, thông điệp chủ đạo, H1 trang tiền** (trang chủ, bảng giá, khóa học).
- **Giá hiển thị & lời hứa thương hiệu** (claim "cam kết", "số 1", SLA, con số hiệu quả) — kèm
  luật sắt: số phải THẬT có nguồn, không có nguồn thì không viết.
- **Copy quảng cáo chạy tiền thật** (ads FB/Google/TikTok/Zalo, ZNS gửi hàng loạt, email blast).
- **Đổi tone-of-voice hàng loạt** hoặc rewrite site-wide; **bản dịch EN** của thông điệp chủ đạo.

### KHÔNG cần cổng (Claude tự làm, tự chịu QA)
Sửa chính tả/ngữ pháp; microcopy theo product-marketing.md đã chốt; FAQ bổ sung từ dữ kiện thật;
bài kiến thức theo cấu trúc đã duyệt; alt text/meta mô tả khớp nội dung có sẵn; copy kỹ thuật
(README, commit, docs nội bộ).

### Claude chuẩn bị gì TRƯỚC khi mở cổng
0. **Mọi phương án trình cổng phải đã qua `skills/copy-craft` đạt ≥8/10** (20 luật anti-slop văn +
   rubric + 3 lượt sửa) — cổng duyệt ĐỊNH VỊ và GU, không phải nơi sửa văn hộ. Văn chưa 10 điểm
   thì chưa được mở cổng. Thứ tự chuẩn TRƯỚC copy-craft: draft bằng `copywriting-mode`
   (phỏng-vấn-trước-khi-viết) → tẩy dấu AI bằng `humanizer` — xem `humanizer-pipeline.md`.
1. Đọc `.agents/product-marketing.md` của project (persona, verbatim khách, anti-persona, pricing
   thật) — chưa có thì chạy skill `product-marketing` (kho marketingskills) tạo trước.
2. Soạn **2–3 phương án** cho mỗi quyết định (không đưa 1 phương án ép duyệt), mỗi phương án kèm
   1 dòng lý-do-nghiệp-vụ (bán cho ai, chạm nỗi đau nào).
3. Ràng buộc đi kèm: glossary i18n (tên riêng không dịch), số liệu chỉ-được-dùng (có nguồn),
   từ CẤM (bịa số, "chuyển đổi số toàn diện" rỗng nghĩa, superlative không chứng cứ).

### Template `CODEX_COPY_HANDOFF.md`
```markdown
# CODEX_COPY_HANDOFF — <đợt gì, ngày>
> Hạ tầng/copy nền đã xong (Claude). Các quyết định ngôn ngữ dưới đây thuộc Codex/người duyệt.
## Bối cảnh — trang/chiến dịch nào, vì sao đổi, link product-marketing.md
## Quyết định cần duyệt (mỗi mục 2–3 phương án + lý do)
### 1. <vd: H1 trang chủ>  — A) ... B) ... C) ...
## Ràng buộc — persona/anti-persona · số liệu được dùng (nguồn) · glossary · từ cấm
## Không đụng — copy đã chốt ở đợt trước, khu vực ngoài phạm vi
## QA sau duyệt — đọc vai người mua · số khớp nguồn · i18n đủ vi/en · build pass
```

### QA của cổng copy (sau khi Codex chốt)
Đọc lại **vai người mua** (không phải người viết) · mọi con số truy được nguồn · giọng nhất quán
xưng hô đã chọn (vd "anh chị") · không jargon chưa giải thích · vi/en đồng bộ nếu trang có EN ·
`tsc + build` pass nếu copy nằm trong code. Sau cùng làm một lượt **subtractive edit**: bỏ eyebrow, câu lặp, danh sách và tính từ không làm thay đổi nghĩa; ưu tiên câu ngắn, trực tiếp và thân thiện.

## Cổng 3 — SEO GATE (`CODEX_SEO_HANDOFF.md`) — từ khóa & thứ hạng Google

### Kích hoạt cổng (BẮT BUỘC dừng chờ duyệt)
- **Chốt bộ từ khóa mục tiêu** cho trang tiền (mỗi trang 1 từ khóa chính + cụm phụ) hoặc đổi mục tiêu đang rank.
- **Đổi title/H1/slug/URL của trang ĐÃ index** (ảnh hưởng thứ hạng, khó đảo) — slug đổi bắt buộc kèm 301.
- **Kế hoạch cụm bài** (content cluster) cho một chủ đề mới; canonical/redirect hàng loạt.

### Luật cứng của cổng
- Từ khóa phải có **bằng chứng thật**: Google Suggest/related, Search Console query thật, hoặc đối thủ
  cụ thể đang rank — **CẤM bịa search volume**; không có công cụ đo thì ghi "chưa có số, chọn theo suggest".
- Mỗi từ khóa gắn 1 intent (tìm hiểu / so sánh / mua) và đúng 1 trang — hai trang tranh 1 từ khóa = loại.
- Claude chuẩn bị: bảng `từ khóa → trang → bằng chứng → intent` + 2–3 phương án title/H1 (đã qua
  copy-craft) → DỪNG chờ duyệt. Đo sau ship: `geo-audit` + Search Console sau 2–4 tuần.

### KHÔNG cần cổng
Thêm keyword phụ vào bài MỚI, meta description, alt text, internal link, FAQ bổ sung theo cụm đã duyệt.

## Cổng 4 — GEO GATE (`CODEX_GEO_HANDOFF.md`) — được AI (ChatGPT/Gemini/Perplexity) nhắc tên

### Kích hoạt cổng (BẮT BUỘC dừng chờ duyệt)
- **Đổi hồ sơ thực thể**: ORG (tên/legalName/taxId/địa chỉ), `sameAs`, LocalBusiness — danh tính sai
  là AI học sai lâu dài, sửa rất chậm.
  - **Trigger này xảy ra ở đâu trong thực tế:** bước nhân bản site khách —
    `chassis/catalog-site-template/scripts/setup.mjs` hỏi–đáp rồi ghi thẳng **`brand.legalName`** và
    **`address` (street/locality/country)** vào config (đo 07/2026: `taxId` script KHÔNG hỏi;
    `social: []` để rỗng — hai trường này điền tay sau, và chính chúng cũng là trigger cổng).
    Tức MỖI clone đều chạm trigger GEO GATE, rất dễ đi vòng qua cổng vì thấy script chạy trót lọt.
    Zod trong chassis chỉ kiểm **ĐỊNH DẠNG**, không kiểm **SỰ THẬT** — setup xanh ≠ hồ sơ đúng.
    Sau `setup.mjs` của clone mới: dừng, đối chiếu giấy tờ, mở `CODEX_GEO_HANDOFF.md` trước khi ship.
- **Cấu trúc llms.txt / llms-full.txt** (thêm bớt khu vực, đổi thứ tự ưu tiên nội dung cho AI đọc).
- **Bộ câu hỏi mục tiêu** (prompt-set) mà brand muốn được AI trích khi người dùng hỏi — và claim
  marketing về GEO trên site: chỉ được viết "tăng khả năng được AI nhắc tên", CẤM bảo đảm kết quả
  (audit Codex 13/07 đã bắt lỗi này).
- Chiến dịch entity off-site (GBP, Wikipedia-adjacent, báo) nhân danh brand.

### Luật cứng của cổng
- Dữ kiện thực thể phải THẬT và khớp giấy tờ (MST, địa chỉ, người đại diện) — schema qua
  Rich Results Test + Schema Validator trước khi ship.
- Đo trước–sau bằng `citation-audit` (chassis) trên bộ câu hỏi đã chốt; không có baseline thì đo
  baseline trước, không phán "hiệu quả".
- Nội dung cho AI đọc = answer-first (câu đầu trả lời thẳng), có nguồn — không nhồi từ khóa.

### Claude chuẩn bị (Definition of ready của GEO GATE)
1. Bảng `trường thực thể → giá trị đề xuất → nguồn giấy tờ` (MST, ĐKKD, địa chỉ trên giấy, người
   đại diện) — trường nào không truy được giấy tờ thì để trống và ghi "chưa có nguồn", CẤM điền tạm.
2. Kết quả Rich Results Test + Schema Validator của schema sắp ship (dán link/ảnh kết quả).
3. Baseline `citation-audit` trên bộ câu hỏi mục tiêu — chưa có baseline thì đo baseline trước.
4. Diff hồ sơ thực thể cũ → mới (đổi danh tính đang được AI học là việc khó đảo).

### Công cụ tầng GEO trong toolkit
`vendor/geoflow` (Apache-2.0 — nền GEO: RAG + sinh nội dung + phân phối đa site + llms.txt/Schema,
tham khảo pattern PHP → port sang chassis) · `chassis: geo-audit + citation-audit` (đo on/off-site) ·
`vendor/open-seo` (MCP tools) · agents `AEO Foundations Architect` + `AI Citation Strategist`.

## Luật phối các cổng
- Một đợt việc đổi CẢ giao diện lẫn thông điệp → mở **2 file handoff riêng** (Codex art ≠ Codex copy
  có thể là 2 người/2 phiên khác nhau); copy chốt TRƯỚC, art minh họa theo copy đã chốt.
- Cổng nào cũng không thay được luật dữ liệu thật (ECC) và art gate không sửa chữ / copy gate
  không đổi visual — lệch làn thì ghi chú sang handoff của làn kia.

## Kênh chạy cổng (ghi nhận 17/07/2026 — tuỳ chọn, KHÔNG đổi luật)
- **Mặc định (đang dùng, ĐÃ CHỐT là chuẩn):** tuần tự — Claude thực thi → viết `CODEX_*_HANDOFF.md`
  → chủ repo mang sang ChatGPT/Codex duyệt → chép kết luận về. Lý do giữ: giám khảo độc lập + người
  đứng giữa; và kinh tế quota — Claude (Max 5) dồi dào cho thực thi, Codex (Plus) khan nên chỉ dành
  cho phán quyết ngắn giá trị cao. KHÔNG đảo chiều "Claude điều phối → Codex thực thi" (mốt lan truyền
  07/2026): đốt quota khan vào việc rẻ.
- **Tuỳ chọn giảm ma sát (chưa kích hoạt):** plugin chính chủ `openai/codex-plugin-cc` (org `openai`
  thật, verify 17/07/2026) có `/codex:adversarial-review` — chạy Codex phản biện ngay trong phiên
  Claude Code, dùng quota ChatGPT sẵn có. Nếu có ngày vòng mang-tay thành nút thắt thì cân nhắc làm
  bước TIỀN-cổng (Codex phản biện trước, người vẫn duyệt cuối). README chính chủ tự cảnh báo: review
  loop "may drain usage limits quickly".
- ⚠️ **Bẫy repo nhái:** tồn tại `*/auth-codex-plugin`, `*/codex-gpt-plugin` (tạo 08/07/2026, sao mua)
  — plugin chạy với toàn quyền repo. Chỉ cài đúng chuỗi `openai/codex-plugin-cc`, không click link lạ.
