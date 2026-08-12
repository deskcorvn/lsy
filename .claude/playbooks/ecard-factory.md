# ECard Factory Playbook

Playbook để triển khai hoặc nhân bản ECard cho khách sau case GiftyTech.

## Mục Tiêu

Tạo một module ECard có thể dùng như sản phẩm agency:

- Landing page để bán/giải thích dịch vụ.
- Profile runtime để khách thật sử dụng.
- Bộ asset share/cover/QR/NFC đẹp và nhất quán.
- Quy trình clone đủ nhanh nhưng vẫn có gu.

## Phân Tích Tính Năng Thị Trường

Các nền tảng ECard phổ biến thường có:

- VIP cá nhân: link profile, QR Code, chỉnh sửa online, ảnh đại diện/ảnh bìa, contact, social, website, video, tài liệu.
- Pro doanh nghiệp: nhiều danh thiếp, đồng bộ thương hiệu, tên miền riêng, phân quyền, tạm khóa/ẩn/chuyển giao, QR cố định, thống kê.
- NFC: thẻ vật lý có chip NFC và QR.

Khi đưa vào sản phẩm Gifty/agency, không nên chỉ sao chép danh sách tính năng. Cần nhóm thành giá trị:

- Được lưu lại đúng.
- Được liên hệ lại nhanh.
- Kéo khách về kênh sở hữu: website, Zalo, Mini App, CRM.
- Đo được hiệu quả nếu thuộc gói Growth.

## Gói Sản Phẩm Khuyến Nghị

ECard VIP:

- Một profile cá nhân.
- QR/vCard/share.
- Social/video/link/map.
- OG image và QR asset.
- Phù hợp chuyên gia, sales, chủ shop, freelancer.

ECard Team/Pro:

- Nhiều profile nhân sự.
- Brand đồng bộ.
- Slug/QR riêng từng người.
- Quản lý bật/tắt/chuyển giao.
- Phù hợp đội bán hàng, bảo hiểm, BĐS, tư vấn, agency.

ECard NFC:

- Add-on thẻ vật lý.
- QR/sticker/standee.
- QA quét/tap trước bàn giao.

ECard Growth:

- Tracking view/click/vCard/share.
- Lead form.
- Kết nối website 5 trụ cột, Zalo OA, Mini App, CRM.

## Lessons From GiftyTech

1. OG đẹp nhưng không đủ làm hero cho mọi màn hình.
   - Tách OG, hero desktop, mobile hero, profile cover.

2. Floating CTA của site có thể che card.
   - Ẩn hoặc đổi vị trí trên `/card*` và landing ECard nếu ảnh/QR bị che.

3. Hero points có thể làm co ảnh.
   - Với ảnh demo nhiều chi tiết, đưa bullet ra ngoài khung ảnh.

4. Không lấy giá từ đối thủ.
   - Nếu chưa có giá, dùng `Liên hệ` và mô tả biến số báo giá.

5. ECard là cửa vào hệ sinh thái.
   - Related links nên dẫn về Website 5 trụ cột, Mini App, hồ sơ năng lực hoặc tài liệu bán hàng.

## Implementation Order

1. Audit repo hiện tại.
2. Xác định route landing và route profile.
3. Thêm/port data model.
4. Thêm landing content.
5. Thêm profile UI.
6. Thêm QR/vCard/share.
7. Thêm schema/metadata/OG.
8. Tạo asset theo visual system.
9. Test mobile/share/QR/vCard.
10. Commit, push, ghi lại prompt asset đã dùng.

## QA Commands

Tùy repo:

```bash
npm run lint
npx tsc --noEmit --pretty false
npm run build
```

Hoặc:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Backlog Nên Có Trong Toolkit

- Script sinh QR SVG/PNG theo danh sách profile.
- Script generate OG từ JSON profile.
- Template NFC print.
- Dashboard staff cards.
- Event tracking helper.
- Share preview tester checklist.
- Gallery mẫu UI profile theo ngành.

