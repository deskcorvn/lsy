---
name: design-ecard
description: Chuẩn UX/UI trang eCard (danh thiếp điện tử) cho thị trường VN — mobile-first quét QR, contactBar Zalo/VietQR, vCard 4.0, ProfilePage schema, budget hiệu năng. Dùng khi làm route /card hay section eCard.
---

# eCard VN — luật UX/UI (nguồn: research 6-scout 07/2026, projects/ecard/docs/)

## Bối cảnh sử dụng quyết định mọi thứ

Người xem **quét QR từ thẻ giấy/NFC, trên điện thoại, thường 4G, đang đứng nói chuyện**.
→ Budget cứng: **JS <100KB, mở <2s trên 4G, Lighthouse mobile ≥95**. Không chat widget,
không carousel, vCard/QR sinh server-side. Mọi thứ trong 1 màn hình đầu phải đủ để hành động.

## Thứ tự ưu tiên màn hình đầu (trên xuống)

1. `profileHeader` — cover + avatar + tên + chức danh/shop (KHÔNG hero marketing).
2. `contactBar` — **sticky bottom trên mobile**, 4 nút: Gọi · Zalo · Lưu danh bạ · Chỉ đường.
   Touch target ≥48px, label chữ (không icon-only). Đây là lý do tồn tại của trang.
3. QR + social + phần còn lại cuộn xuống.

## Bộ nút bản địa (moat VN — không đối thủ quốc tế nào có)

- **Zalo**: 79,6 triệu MAU, kênh số 1. Deep-link `zalo.me/{sđt}` là CONVENTION không phải API
  → wrap MỌI deep-link trong `lib/links.ts`, đổi một chỗ khi Zalo đổi.
- **VietQR** (chuyển khoản): sinh ảnh qua vietqr.io. **Mặc định TẮT** — số tài khoản công khai
  = rủi ro mạo danh; chỉ bật khi chủ thẻ xác nhận (toggle trong config).
- Chủ shop e-commerce: thêm link Shopee/TikTok Shop nếu có.
- "Chỉ đường": dựng từ `metadata.address` của Medusa (address_detail + ward + district + province);
  `location_link` trống → fallback `https://maps.google.com/?q={chuỗi địa chỉ encode}`.

## vCard + QR (table stakes quốc tế)

- vCard **4.0 (RFC 6350, UTF-8)** qua route handler `/card/[slug]/vcard.vcf` — server-side.
  Field tối thiểu: FN, ORG, TITLE, TEL, EMAIL (⚠ dữ liệu Medusa hay để email rỗng — kiểm trước),
  URL, PHOTO (url), ADR; Zalo vào IMPP. Test tải vào danh bạ CẢ iOS lẫn Android trước khi nhận xong.
- QR: SVG render build-time (lib `qrcode`), trỏ về chính URL card (đổi nội dung không đổi mã in).
- Apple/Google Wallet pass: KHÔNG hứa ở MVP (cần cert PassKit) — .vcf không vào thẳng Wallet.

## Dữ liệu = Medusa, trình bày = client.config

Medusa admin là builder — KHÔNG tạo form/builder/tenant-store riêng cho card. FE đọc qua
`lib/medusa.ts` (publishable key, header `x-publishable-api-key`), ISR cache dài + fallback
bản build (BE sập thì card vẫn sống). Vibe/màu/toggle VietQR nằm trong `client.config.ts`
(`ecard: {enabled, shopId}`). Shop metadata json chứa Zalo/social — không cần migration.

## SEO/AEO cho trang hồ sơ

JSON-LD `ProfilePage` + `mainEntity: Person` (name bắt buộc; image, description, sameAs
social/Zalo, `worksFor: Organization` shop) — Google có doc chính thức cho ProfilePage.
OG per-card (satori) để share đẹp trên **Zalo** (kênh share chính, không phải Facebook).

## Thẩm mỹ

Theo 4 skill design-* sẵn có. Riêng eCard: card là NGƯỜI, không phải landing —
tối đa 1 điểm nhấn gradient (nút Lưu danh bạ), còn lại im lặng; ảnh chân dung
1:1 arch hoặc circle (mediaGrid shape có sẵn); motion chỉ `.btn-press`, không entrance dài
(người quét đang vội).
