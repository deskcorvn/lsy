---
name: design-humanizer
description: "Công cụ Humanizer cho GIAO DIỆN & BỐ CỤC — nhận diện và sửa 'dấu hiệu thiết kế AI' (design slop): gradient tím AI, glassmorphism tràn, emoji làm icon, grid 3 cột đồng phục, hero công thức, glow/pulse vô hạn, section đặt tên Features/Benefits, mọi card cùng radius-shadow... 22 pattern DETECT được (grep class/CSS khi có thể) + FIX được + dấu-hiệu-thiết-kế-người cần giữ. Chạy TRƯỚC ART GATE (như review-animations cho motion). Chữ trong UI → skills/humanizer."
metadata:
  author: giftytech (đúc từ ART GATE giftyid 17-18/07, motion-craft, codex-gates, design-system-lock, bài học mamquanghai/new-heaven)
  type: craft
user-invocable: true
---

# design-humanizer — tẩy dấu AI khỏi giao diện

Vì sao giao diện AI nhận ra được — cùng cơ chế với văn AI: **model sinh ra thứ "đúng trung bình
cho nhiều site nhất"** → layout, màu, hiệu ứng đều hồi quy về mẫu phổ biến nhất của internet.
Kết quả: site nào cũng na ná — nhìn "sạch" mà không có ai đứng sau. Humanize design = gỡ các
khuôn trung bình đó và trả lại **dấu tay người quyết định**: một signature move có tên, chi tiết
đặc thù thương hiệu, nhịp thay đổi có chủ đích.

Luật gốc (từ `playbooks/codex-gates.md` — "Vừa đủ để hiểu ngay"): một surface một nhiệm vụ;
1 focal point mỗi viewport; bố cục có khoảng thở; test 5 giây. Skill này là bộ DETECT + FIX
đứng trước cổng — **không thay quyền phán gu của ART GATE**.

## A. 22 pattern design-slop — DETECT → FIX

### Nhóm MÀU & CHẤT LIỆU (1–5)

**1. Gradient tím AI.** Tím-hồng-xanh neon (`from-purple-* to-pink-*`, `violet`, `fuchsia`) —
đồng phục của mọi landing AI 2023–2026. DETECT: grep `purple|violet|fuchsia|indigo.*pink`.
FIX: palette từ DESIGN.md/brand thật; không có brand → lấy màu từ ảnh sản phẩm thật (extract >
invent, luật design-system-lock).

**2. Glassmorphism tràn lan.** `backdrop-blur` + nền trong mờ ở MỌI card/nav/modal. DETECT: grep
`backdrop-blur` đếm >3 chỗ. FIX: giữ tối đa 1 chỗ có lý do quang học thật (nav nổi trên ảnh);
còn lại nền đặc.

**3. Glow/pulse vô hạn.** Đổ bóng neon thở phập phồng, ring lấp lánh không bao giờ nghỉ. DETECT:
grep `animate-pulse|animate-ping|animation.*infinite` ngoài skeleton-loading. FIX: luật motion-craft
— hiệu ứng chú ý chạy MỘT LẦN rồi nghỉ (án lệ ART GATE giftyid: mascot vẫy 1 lần, KHÔNG sparkle
ring); `infinite` chỉ cho spinner/skeleton.

**4. Dark-mode tím than mặc định.** Nền `#0f0f23`-ish + chữ neon — "AI aesthetic" không xuất phát
từ brand. FIX: dark mode phải đi từ palette đã khoá, không phải từ mẫu phổ biến.

**5. Blob gradient trôi + noise overlay.** Các đốm màu mờ trôi góc màn hình lấp chỗ trống. DETECT:
div `blur-3xl opacity-*` absolute không nội dung. FIX: thay bằng asset thật (ảnh xưởng, sản phẩm,
người) hoặc để trống — khoảng thở là thiết kế, không phải chỗ trống cần lấp.

### Nhóm BỐ CỤC (6–11)

**6. Hero công thức.** Badge pill nhỏ → H1 gradient-text → sub 2 dòng → đôi nút "Get Started +
Learn More" → ảnh mock nghiêng. Từng phần tử vô tội; đủ combo = đồng phục AI. FIX: đổi ít nhất
2 phần tử theo brand thật (headline đứng được một mình — luật copy-craft #19; CTA gọi tên kết
quả; ảnh thật thay mock).

**7. Grid 3 cột icon-title-text đồng phục.** Mọi section "tính năng" = 3/6 card cao bằng nhau,
icon trên, 2 dòng mô tả. DETECT: `grid-cols-3` lặp nhiều section liền. FIX: phá nhịp — 1 section
dùng layout khác (1 cột kể chuyện, ảnh + text so le, bảng so sánh); card QUAN TRỌNG được to hơn.

**8. Centered-everything.** Mọi heading, mọi đoạn, mọi section đều `text-center mx-auto`.
FIX: căn trái cho nội dung đọc; center chỉ giữ cho khoảnh khắc nghi lễ (hero, CTA cuối).

**9. Section đặt tên đồng phục.** "Features · Benefits · Testimonials · FAQ · CTA" (bản Việt:
"Tính năng nổi bật · Lợi ích vượt trội · Khách hàng nói gì"). FIX: heading là CLAIM cụ thể của
brand ("Giao 50 bộ FFU trong 6 ngày" thay "Dịch vụ của chúng tôi") — heading đứng một mình vẫn bán được.

**10. Uniform spacing không nhịp.** `py-24` đều tăm tắp mọi section — nhịp thở đều máy móc.
FIX: nhịp co giãn theo tầm quan trọng (hero thở rộng, dải logo nén lại); trước/sau một section
chuyển cảnh được phép chật/rộng bất thường CÓ CHỦ ĐÍCH.

**11. Mọi card cùng radius + cùng shadow.** `rounded-xl shadow-lg` phủ toàn site kể cả bảng giá,
ảnh, quote. DETECT: đếm tần suất cặp class này. FIX: hệ radius/độ nổi phân CẤP theo vai trò
(design token 2–3 bậc), không một cỡ cho tất cả.

### Nhóm PHẦN TỬ (12–17)

**12. Emoji làm icon hệ thống.** 🚀✨💡✅ thay icon thật trong feature/nav/nút. DETECT: grep emoji
trong JSX/HTML ngoài content người viết. FIX: bộ icon nhất quán 1 nguồn (lucide/heroicons/custom)
hoặc chữ trần; emoji chỉ sống trong giọng nói người thật (quote, chat).

**13. Pill/rounded-full lạm phát.** Badge pill ở mọi nơi: trên H1, trong card, cạnh giá. FIX: giữ
pill cho đúng ngữ nghĩa trạng thái (tag, filter); thông tin quan trọng không nhét vào pill.

**14. Số liệu đếm-ngược-lên + "1000+ khách hàng tin dùng"** không nguồn. FIX: luật số THẬT có
nguồn (COPY GATE); không nguồn → bỏ block; có nguồn → số lẻ thật ("47 công trình") thắng số tròn.

**15. Avatar giả + tên Tây trong testimonial** (ảnh unsplash mặt người + "Sarah J., CEO"). FIX:
verbatim khách thật (luật copy-craft #14) + tên thật được phép công bố; chưa có → bỏ section, đừng dựng cảnh.

**16. Stock 3D illustration chung chung** (nhân vật hoạt hình bay quanh laptop). FIX: ảnh thật
của khách (xưởng, đội, sản phẩm — bài học new-heaven: 9 asset thật có nguồn), hoặc minh họa
theo art-direction đã khoá.

**17. Footer 5 cột đầy link chết.** Cột "Resources/Company/Legal" bê nguyên khuôn dù site chỉ có
7 trang. FIX: footer khớp kiến trúc thật của site; link chưa có trang thì không bày.

### Nhóm MOTION & TƯƠNG TÁC (18–20)

**18. Mọi thứ fade-up khi scroll.** AOS/whileInView phủ đều từng phần tử, delay bậc thang 100ms.
DETECT: grep `data-aos|whileInView|animate-fadeUp` mật độ cao. FIX: luật motion-craft — motion
phục vụ THỨ BẬC (1 khoảnh khắc chính/section); phần tử phụ xuất hiện tĩnh; ease-out, một lần,
transform/opacity only; tôn trọng `prefers-reduced-motion`.

**19. Hover scale toàn cục.** `hover:scale-105` trên mọi card/nút/ảnh. FIX: hover phân cấp — phần
tử hành động chính mới có phản hồi mạnh; card tĩnh chỉ cần đổi elevation/viền nhẹ.

**20. Typewriter/gradient-text-animation trên H1.** Chữ tự gõ, gradient chạy — "trang AI" đặc
sệt 2024. FIX: H1 tĩnh, sức nặng nằm ở câu chữ (đã qua copy-craft); muốn "sống" thì 1 accent
nhỏ chạy MỘT lần.

### Nhóm CHỮ TRONG GIAO DIỆN (21–22)

**21. Type scale đơn điệu + Inter mọi nơi.** Toàn site 1 font, scale đều, không tương phản
cỡ/weight. FIX: cặp font có vai trò (display + body) theo DESIGN.md; tương phản cỡ RÕ giữa
H1/body (không phải 24px vs 16px).

**22. Chữ UI là văn AI.** Nút "Khám phá ngay", section mô tả bằng văn "trong bối cảnh...". FIX:
không phải việc skill này — chạy `skills/humanizer` + `copy-craft` cho mọi chữ nhìn thấy.

## B. Dấu THIẾT KẾ NGƯỜI — thấy thì giữ, đừng "chuẩn hóa" mất

- **Signature move có tên** (luật style-prompt-brief): 1 chi tiết chỉ site này có — giữ tuyệt đối.
- **Bất đối xứng có chủ đích** (ảnh lệch trái 60/40, heading không thẳng khối) — đừng "sửa" về center.
- **Chi tiết đặc thù brand/ngành**: màu lấy từ sản phẩm thật, icon vẽ riêng, texture giấy/kim loại
  của nghề — thứ AI không đoán ra được.
- **Nhịp section thay đổi** như nhịp văn người: có đoạn nén, có đoạn thở.
- **Ảnh thật chưa hoàn hảo** (xưởng bừa một góc, ánh sáng không studio) thắng stock bóng bẩy.
- Quy tắc chung như văn: tìm **CHÙM** slop, đừng phán tell lẻ — `rounded-xl` một chỗ không nói
  lên gì; gradient tím + glassmorphism + 3-col grid + emoji icon + fade-up đều = thú nhận.

## C. Quy trình chạy

1. **Scan** — đi qua 22 pattern; pattern nào DETECT bằng grep thì chạy grep thật (Tailwind class,
   CSS, `data-aos`...), pattern bố cục thì soi screenshot 390/768/1440.
2. **Báo cáo** — bảng `pattern → vị trí → mức (chùm hay lẻ) → đề xuất fix`; tell lẻ đứng cạnh
   signature move thật thì GHI NHẬN là chủ đích, không sửa.
3. **Fix** — sửa theo nguyên tắc từng pattern; đổi gu (palette, hero concept, signature) thì
   KHÔNG tự quyết → đưa 2–3 phương án vào `CODEX_ART_HANDOFF.md` chờ duyệt.
4. **Re-scan** sau fix + chụp lại 3 viewport.

## D. Vị trí dây chuyền + chống trùng

- Đứng TRƯỚC ART GATE, cùng bậc với `review-animations` (motion): build xong → **design-humanizer
  scan** → (có motion: review-animations) → mở `CODEX_ART_HANDOFF.md`.
- Tuân design system đã KHOÁ (`design-system-lock.md`): fix không được phá token; extract > invent.
- Motion chi tiết (easing/duration/choreography) → `skills/animation/*` (Emil Kowalski) là luật.
- Anti-pattern polish frontend tổng quát → `skills/impeccable`; skill này chuyên MỘT việc: dấu-AI.
- Chữ trong UI → `skills/humanizer` + `skills/copy-craft`.
