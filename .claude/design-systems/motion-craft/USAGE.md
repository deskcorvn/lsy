# Motion Craft — cách dùng

## Dùng nhanh

1. Nếu bắt đầu từ brand brief/reference, tạo `STYLE_PROMPT.md` theo `playbooks/style-prompt-brief.md`.
2. Đọc `DESIGN.md`, chọn đúng **một** signature move cho mỗi viewport.
3. Import `tokens.css`; với Tailwind v4 import `tailwind-v4.css` thay thế.
4. Chọn pattern trong `components.manifest.json`, ưu tiên primitive từ `vendor/motion-primitives`; chỉ tham khảo `vendor/magicui` / `vendor/animata` khi cần hiệu ứng đặc thù.

> **Site KHÔNG-React** (WordPress, PHP, HTML tĩnh): hệ này chỉ là *spec* (token + pattern + gate) —
> code chạy thật nằm ở **`chassis/motion-vanilla-kit/`** (reveal guard-first, video facade + cổng âm
> thanh, preloader, GSAP hero/parallax scrub) kèm 7 bài học va-chạm-trình-duyệt từ mamquanghai.vn.
5. Thay mọi asset demo bằng asset có quyền sử dụng của khách hàng.
6. Chạy reduced-motion, keyboard, mobile và performance QA.
7. Chạy `review-animations` trước ART GATE.

## Khi dùng MotionSites làm tham khảo

- Chỉ nhấn **Copy** ở thẻ đang được trang đánh dấu miễn phí; không tìm cách gọi nội dung Premium.
- Prompt được dán vào brief riêng của dự án khách, không commit nguyên văn vào `agency-toolkit`.
- Tách prompt thành: bố cục, hierarchy, interaction intent, responsive behavior.
- Loại tên thương hiệu, câu copy, URL ảnh/video, màu và kích thước nhận diện; dựng lại bằng token của hệ này.
- Ghi provenance trong dự án: URL, ngày xem, tên mẫu và trạng thái `free-at-access-time`.

Quy trình chi tiết: `playbooks/motionsites-reference-pipeline.md`.
