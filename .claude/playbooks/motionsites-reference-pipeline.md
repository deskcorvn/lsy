# MotionSites reference pipeline

Mục tiêu: dùng các prompt đang được MotionSites đánh dấu **miễn phí** để lấy brief cho một dự án cụ thể, nhưng không biến `agency-toolkit` thành bản mirror của kho thương mại.

## Kết luận nguồn (kiểm tra 2026-07-15)

- MotionSites là kho **prompt**, không phải thư viện component React để clone.
- Trang chính hiển thị `Copy prompt` cho mục miễn phí và `Unlock prompt` cho mục Premium.
- Dữ liệu public tại thời điểm kiểm tra có 119 mục `is_free=true`; số lượng/trạng thái có thể đổi bất kỳ lúc nào.
- Trang pricing công bố quyền dùng cho personal/client work, nhưng footer ghi `All rights reserved`; không thấy license cho phép tái phân phối prompt/asset thành một thư viện khác.
- Một repo GitHub của bên thứ ba có gắn MIT không chứng minh họ sở hữu bản quyền các prompt đã mirror. Không dùng repo đó làm nguồn vendor.

## Luồng hợp lệ

1. Mở [motionsites.ai](https://motionsites.ai/), lọc `Pricing → Free` nếu bộ lọc có sẵn.
2. Chỉ dùng nút `Copy prompt`. Thẻ có `Premium` dừng tại đó; không gọi endpoint, scrape payload hoặc tìm mirror để lấy nội dung khóa.
3. Dán prompt vào brief **riêng của dự án khách** và ghi:
   - URL nguồn;
   - tên mẫu;
   - ngày truy cập;
   - trạng thái `free-at-access-time`;
   - người thực hiện.
4. Tách prompt thành bốn lớp: layout, hierarchy, interaction intent, responsive behavior; chuyển phần giữ lại sang `STYLE_PROMPT.md` bằng `playbooks/style-prompt-brief.md`.
5. Xóa khỏi brief triển khai: tên thương hiệu, câu copy, URL ảnh/video, asset nhận diện, exact color/spacing fingerprint.
6. Dựng lại bằng `design-systems/motion-craft` + token của brand. Ưu tiên `vendor/motion-primitives`; dùng `vendor/magicui` hoặc `vendor/animata` khi primitive mặc định không đủ và hiệu ứng đã được DESIGN.md cho phép. `animate-ui` phải qua kiểm tra Commons Clause.
7. Chạy `review-animations`, reduced-motion, keyboard, mobile và performance QA trước ART GATE.

## Không làm

- Không commit prompt nguyên văn, screenshot, video preview hoặc asset MotionSites vào `agency-toolkit`.
- Không vendor repo mirror bên thứ ba chỉ vì repo tự gắn MIT.
- Không tự động lấy toàn bộ free prompt để tái xuất bản thành catalog cạnh tranh.
- Không dùng URL media trong prompt làm asset production nếu chưa có quyền riêng cho asset đó.

## Template provenance cho project khách

```yaml
ui_reference:
  source: https://motionsites.ai/
  item: "<tên mẫu>"
  accessed_at: YYYY-MM-DD
  access_state: free-at-access-time
  retained: structure-and-interaction-intent-only
  copied_assets: false
  implementation_system: agency-toolkit/design-systems/motion-craft
```
