# Art Direction Pipeline

Playbook nâng giao diện từ "đúng và sạch" lên "có gu, có nhận diện, có sức nhớ" cho các site và sản phẩm agency. Tài liệu này chắt lọc từ các kho đã vendor trong chính repo này (đường dẫn tương đối từ gốc toolkit; chạy trong project khách thì xem bảng "2 chế độ resolve" ở `skills/ui-suite/SKILL.md`):

- `skills/impeccable`
- `vendor/open-design`
- `skills/frontend-design`
- `skills/taste-skill`
- `skills/ui-design-brain`

Không copy nguyên code/hình ảnh/UI từ repo ngoài. Chỉ port phương pháp, vocabulary, checklist và direction. Port template từ `vendor/open-design/design-templates/*` thì phải mang theo dòng copyright thật trong `LICENSE` của chính template đó (luật đầy đủ ở `skills/ui-suite/SKILL.md`).

**Ngữ cảnh: RETROFIT** — playbook này dùng khi project ĐÃ có code + token và cần hiệu chỉnh/nâng gu, nên §1 Capture đọc token hiện có trước, §2–§4 là việc HIỆU CHỈNH cái đã có, rồi §5.5 mới khoá `STYLE_PROMPT.md` cho phần dựng mới. Project GREENFIELD (chưa có gu) → vào bằng `skills/ui-suite` + `playbooks/design-pipeline.md`: ở đó `STYLE_PROMPT.md` viết TRƯỚC khi tokenize. Cả hai ngữ cảnh đều giữ chung luật `STYLE_PROMPT.md` → `DESIGN.md` (prompt là scaffold, design contract mới là source of truth).

## Mục Tiêu

Một giao diện đạt trình độ nghệ thuật hơn không phải là giao diện có nhiều hiệu ứng hơn. Nó phải có:

- North star thị giác: một câu mô tả cảnh vật lý và cảm giác.
- Hệ token rõ: màu, chữ, khoảng cách, radius, shadow, motion.
- Signature moves: 2-3 chi tiết dễ nhớ nhưng không cản nhiệm vụ.
- Asset thật: ảnh sản phẩm, thiết bị, QR, poster, OG, diagram.
- Motion có chủ đích: feedback, giải thích, nhấn thứ bậc.
- QA chống AI-tell: không card spam, không gradient vô nghĩa, không copy chung chung.

## Resource Map

### Impeccable

Dùng khi giao diện đã có code và cần polish. Giá trị chính:

- 23 lệnh tư duy: `craft`, `shape`, `critique`, `audit`, `polish`, `bolder`, `quieter`, `typeset`, `layout`, `animate`, `harden`.
- Anti-pattern: card chồng card, gradient text, over-round, shadow + border ghost-card, eyebrow lặp lại, copy sáo.
- Quy tắc type/color/motion/interaction: contrast, text-wrap, line length, reduced motion, không animate layout property.
- Copy discipline: mỗi câu phải có thông tin thật, tránh buzzword và câu cân bằng rỗng.

Áp dụng:

- Chạy như pass sau khi trang đã build.
- Ưu tiên `critique -> polish -> harden`.
- Với trang landing nhiều section, thêm `typeset` và `layout`.
- Với trang sản phẩm/eCard, thêm `animate` nhưng chỉ cho state/QR/share/device, không trang trí vòng lặp.

### Open Design

Dùng như kho studio local. Giá trị chính:

- Design systems: Linear, Stripe, Apple, Mission Control, Editorial, Atelier Zero, Luxury, Bento, Agentic.
- Skills: `creative-director`, `design-review`, `impeccable-design-polish`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `poster-hero`, `mockup-device-3d`, `emilkowalski-motion`, `d3-visualization`, `frame-flowchart-sticky`, `ecommerce-image-workflow`.
- Templates: dashboards, posters, mobile onboarding, live dashboards, HTML/PPT, product launch, hyperframes.

Áp dụng:

- `creative-director`: trước khi sửa pixel, chốt audience, product goal, brand posture, density, motion tone, anti-pattern.
- `imagegen-frontend-web`: tạo reference từng section, không tạo một ảnh dài cả page.
- `mockup-device-3d`: trình diễn Mini App, ECard, dashboard trên thiết bị.
- `poster-hero`: tạo ảnh dọc 1080x1920 cho Zalo/Facebook.
- `d3-visualization`: biến số liệu/luồng vận hành thành đồ họa tương tác.
- `design-review`: audit bằng before/after screenshot và commit nhỏ.

### Frontend Design

Dùng để chọn một anchor rõ thay vì "đẹp chung chung".

8 anchor:

- Swiss: hệ grid, trắng, đỏ/cam/blue nhấn, typography nghiêm.
- Industrial: đen, mono, signal color, vận hành.
- Brutalist: táo bạo, thô, dùng rất hạn chế.
- Aurora Maximalism: neon/mesh, chỉ dùng cho campaign đặc biệt.
- Chaotic Maximalism: không hợp sản phẩm B2B trừ poster thử nghiệm.
- Retro-Futuristic: có thể dùng cho event/campaign công nghệ.
- Organic: hợp khách chăm sóc/sức khỏe, không phải Gifty core.
- Lo-Fi: hợp nội dung cộng đồng, không hợp trang sản phẩm chính.

Quy tắc: chọn một anchor, không pha loãng.

### Taste Skill

Dùng để tránh "một kiểu SaaS". Ba núm:

- DESIGN_VARIANCE: layout thử nghiệm.
- MOTION_INTENSITY: độ sâu animation.
- VISUAL_DENSITY: mật độ thông tin.

Khuyến nghị cho sản phẩm B2B công nghệ:

- Landing chính: variance 6-7, motion 4-5, density 5-6.
- Dashboard/admin: variance 3-4, motion 2-3, density 7-8.
- ECard/OG/poster: variance 7-8, motion 3-5, density 4-6.

### UI Design Brain

Dùng để bảo đảm component không đẹp mà sai UX:

- Form single-column, label rõ.
- Button verb-first, một primary mỗi cụm.
- Table có sticky header, số canh phải.
- Empty/loading/error có state thật.
- Card dùng khi biểu diễn entity, không dùng làm section wrapper.
- Touch target mobile tối thiểu 44px.

## Pipeline 8 Bước

### 1. Capture

Đọc project:

- CSS/tokens/theme.
- 1-2 page đại diện.
- Component chung.
- Ảnh/asset hiện có.
- Copy và mục tiêu business.

Output: 5-8 dòng "hiện trạng".

### 2. North Star

Viết một câu cảnh vật lý:

> Ai đang dùng sản phẩm, ở đâu, dưới ánh sáng nào, đang cần quyết định gì?

Ví dụ:

> Một cán bộ vận hành xem đơn mua chung, điểm nhận và QR xác nhận trong phòng làm việc sáng lạnh, cần biết hệ thống đang chạy đúng hay chưa.

Câu này quyết định dark/light, density, motion và visual motif.

### 3. Select Direction

Chọn direction chính và direction phụ. Không chọn quá 2.

- Product operations: Mission Control + Linear.
- Premium SaaS/commerce infra: Stripe + Linear.
- Civic/local commerce story: Editorial + Mission Control.
- ECard VIP: Executive Dark Card + Device 3D Showcase.
- Campaign/social share: Poster Hero + Atelier/Editorial.

### 4. Tokenize

Tạo hoặc chỉnh:

- `--bg`, `--surface`, `--surface-ink`, `--ink`, `--muted`, `--line`.
- `--primary`, `--primary-dark`, `--accent`, `--accent-soft`.
- Type scale và weights.
- Radius scale.
- Shadow/elevation rule.
- Motion durations/easings.

Prefer OKLCH khi bắt đầu mới. Khi dự án đã có hex ổn định, giữ identity và chỉ bổ sung ramp.

### 5. Signature Moves

Chọn 2-3 động tác thị giác:

- Operational map: tuyến `Nguồn hàng -> Zalo -> Công đoàn -> Bưu điện -> Người mua`.
- QR scan line hoặc check animation.
- Device stage: phone/MacBook render UI thật.
- Editorial proof wall: ảnh sự kiện + số liệu + caption nguồn.
- ECard premium card: QR tile, avatar, vCard action.

Signature move phải thấy được trong screenshot đầu tiên, không nằm sâu ở cuối page.

Sau bước này, tạo `STYLE_PROMPT.md` bằng `playbooks/style-prompt-brief.md`: khóa scene, section choreography, primitive motion dự kiến và responsive behavior trước khi code. Prompt là scaffold brief; token/luật bền vững vẫn phải đi vào `DESIGN.md`.

### 5.5. CỔNG — dừng ở đây, không tự chốt gu

Chốt direction (§3) + palette/token (§4) + signature moves (§5) = **quyết định GU**. Đây đúng là trigger của ART GATE, không phải việc Claude tự duyệt:

- Viết `CODEX_ART_HANDOFF.md` ở root repo project: bối cảnh + ràng buộc từ DESIGN.md + **2–3 phương án** direction/palette + QA checklist. Luật + template: [`codex-gates.md`](codex-gates.md).
- Điều kiện vào cổng: `STYLE_PROMPT.md` đủ Definition of ready · đợt việc có motion thì đã chạy `review-animations` và sửa hết finding.
- **DỪNG chờ duyệt.** Chỉ sang §6 Asset System và §7 Build khi direction đã được chốt — dựng asset/code theo gu chưa duyệt là làm lại từ đầu.
- Đợt việc đụng cả thông điệp (H1/tagline/định vị/giá–claim): COPY GATE chốt TRƯỚC, art minh họa theo copy đã chốt (`codex-gates.md`, mục "Luật phối các cổng").

### 6. Asset System

Với ảnh chia sẻ, áp dụng [`og-social-preview-standard.md`](og-social-preview-standard.md): homepage dùng brand master OG, solution dùng ảnh riêng của solution; không lấy banner sản phẩm con làm đại diện toàn công ty.

Không để CSS trang trí thay thế asset thật.

Cần chuẩn hóa:

- OG 1200x630.
- Hero desktop.
- Hero mobile.
- Vertical poster 1080x1920.
- Device mockup.
- QR/NFC print.
- Diagram/flow image.
- Product/partner image set.

### 7. Build And Polish

**Trước bước 1:** thông điệp phải đã chốt — H1/tagline/định vị/giá–claim đã qua COPY GATE (hoặc thuộc diện KHÔNG cần cổng theo `codex-gates.md`). Layout shape quanh câu chữ thật, không quanh chữ giả rồi nhét lại sau. "Polish copy" dưới đây chỉ là **polish vi mô** (nhịp câu, độ dài, subtractive edit) — không đổi thông điệp; đụng thông điệp thì quay lại COPY GATE.

Thứ tự:

1. Shape layout.
2. Implement with existing stack.
3. Typeset.
4. Colorize.
5. Polish copy (vi mô — xem luật trên).
6. Add motion.
7. Harden responsive/accessibility.

Không bắt đầu bằng animation.

### 8. QA

Kiểm tra:

- Mobile 360/390/430, tablet 768, desktop 1440.
- Text không overflow.
- Contrast body >= 4.5:1.
- Reduced motion.
- No nested cards.
- No decorative gradient text.
- No repeated identical 3-card grids.
- No tiny all-caps eyebrow on every section.
- Share preview đúng OG.
- Screenshot before/after nếu là redesign.
- Thay đổi gu lớn đã qua ART GATE (`CODEX_ART_HANDOFF.md` — xem §5.5). Chưa qua = chưa ship.
- Thay đổi thông điệp trang tiền đã qua COPY GATE trước ART GATE.

## Artifact Checklist

Mỗi dự án sau polish nên có:

- `STYLE_PROMPT.md` (creative/build brief đã khóa anti-copy guard).
- `DESIGN.md` hoặc design contract.
- `tokens.css` hoặc token map.
- Asset manifest.
- Art direction notes.
- QA screenshots.
- Backlog visual nâng cấp.

## What Not To Do

- Không lấy 150 design systems rồi pha hết vào một page.
- Không thêm bokeh/orb/gradient vì trang "cần đẹp".
- Không đổi toàn bộ brand chỉ vì một design system khác đẹp hơn.
- Không dùng ảnh AI mơ hồ khi sản phẩm cần được inspect.
- Không để mọi section cùng một nhịp: eyebrow, heading, body, card grid.
- Không dùng animation để che content yếu.
