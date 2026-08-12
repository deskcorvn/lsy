---
name: design-craft
description: Checklist polish trước khi ship giao diện — duyệt mắt bằng screenshot thật, các cổng máy chấm (verify/geo-audit/contrast), luật copy chống slop. Dùng trước khi kết thúc bất kỳ việc UI nào trên site này.
---

# Craft gate — "xong" nghĩa là gì với giao diện site này

## Thứ tự nghiệm thu (máy trước, mắt sau, cả hai bắt buộc)

1. **`pnpm verify`** — typecheck + build + preflight 14 cổng + test. Đỏ = chưa xong, miễn bàn.
   Các cổng liên quan giao diện: 1 h1 duy nhất · ảnh đủ alt · anchor sống · không slate
   hardcode · ảnh config tồn tại · không font DEMO/Personal-Use · không `<details>`.
2. **`pnpm geo-audit`** — 12 điểm nền AI-search; đổi cấu trúc trang thì chạy lại.
3. **Duyệt MẮT bằng screenshot thật** — máy không thấy piano vẽ xấu. Trên Windows:

```bash
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --no-first-run --user-data-dir=/tmp/chrome-profile --window-size=1440,900 \
  --screenshot=out.png --virtual-time-budget=12000 "http://localhost:3000"
```

   - Trang dài: `--window-size=1440,7800` rồi crop bằng sharp.
   - **Bẫy**: chụp URL có `#anchor` ra ảnh đen — chụp cửa sổ cao rồi crop, đừng anchor-jump.
   - Nhìn ảnh và TỰ CHẤM: có gì lệch tông (khối trắng giữa site tối?), chữ đè nhau,
     silhouette méo? Sửa rồi chụp lại — lặp đến khi không còn gì chướng mắt.

## Checklist mắt (chưng cất từ impeccable/polish, gắn với chassis này)

- [ ] Mọi section cùng tông vibe — không khối nào "lạc hệ" (dùng token, không hex lạ)
- [ ] Heading đúng scale chuẩn (`text-4xl md:text-5xl tracking-tight`), hierarchy nhất quán
- [ ] Mọi element tương tác đủ state: hover/focus/active/disabled/loading — focus ring KHÔNG bị xóa
- [ ] Thông tin trong hover-scrim có mặt trong DOM và hiện trên touch (`.mg-scrim` lo sẵn — đừng phá)
- [ ] Số liệu xuất hiện đúng 1 lần/trang, dạng câu thì thầm — không counter chạy, không card stat icon
- [ ] Ảnh không gây CLS (aspect-ratio cố định), 0 iframe khi first-load (facade)
- [ ] Touch target ≥44px, text mobile ≥14px, không tràn ngang
- [ ] Mobile 360px: hero script không vỡ, tranh crop còn vùng an toàn

## Copy (luật chống slop — áp cho mọi chữ trên site)

- CẤM slop-verb: "unleash / elevate / empower / delve / seamless / cutting-edge".
- Mọi claim bán hàng chứa DỮ KIỆN kiểm chứng được ("130+ stores", "keep 90%") —
  không có số thật thì bỏ câu, không bịa (cổng aio-quality.test.ts + preflight placeholder gác một phần).
- Số lớn thì thì thầm: proofLine hairline, không hô khẩu hiệu.
- Cùng một thứ gọi cùng một tên trên toàn site (Workspace ≠ Project ba màn hình sau).

## NEVER (từ 27 luật impeccable, các điều hay phạm nhất ở đây)

- Polish khi chức năng chưa xong — trang trí trên nền drift.
- Hoàn hảo một góc trong khi góc khác còn thô — chất lượng phải ĐỀU.
- Tự chế component khi section registry đã có (hero/mediaGrid/embedWall/statsBar/
  logoMarquee/cta/faq/contactForm... — xem `src/content/schema.ts`).
- Sửa `src/` cho nhu cầu riêng của MỘT tenant khi có thể thêm field config generic.
- Tin "verify xanh" là bằng chứng ĐẸP — xanh chỉ là bằng chứng ĐÚNG. Đẹp phải nhìn.
