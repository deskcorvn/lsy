# OG And Social Preview Standard

Chuẩn tạo ảnh chia sẻ cho website agency, landing page, ECard và trang nội dung. Mục tiêu là ảnh vừa có art direction, vừa đọc được ở thumbnail và không bị dùng sai vai trò.

## 1. Chọn đúng vai trò ảnh

Không dùng một ảnh cho mọi route.

| Route | Vai trò ảnh | Nội dung chính |
|---|---|---|
| Homepage | Brand master OG | Thương hiệu + định vị cấp công ty + 1 bằng chứng sản phẩm |
| Solution/product | Solution OG | Tên giải pháp + UI/sản phẩm của đúng giải pháp |
| Article/event | Editorial OG | Tiêu đề rút gọn + tác giả/sự kiện + ảnh liên quan |
| ECard/profile | Identity OG | Avatar/tên/chức danh + QR hoặc profile preview |

Banner sản phẩm có thể rất đẹp nhưng không được dùng làm homepage OG nếu nó khiến người xem hiểu sai phạm vi thương hiệu.

## 2. Thông số bắt buộc

- Canvas: `1200x630`, tỷ lệ `1.91:1`.
- Định dạng: PNG cho chữ/UI sắc nét; WebP/JPEG chỉ khi nền ảnh làm PNG quá nặng và nền tảng đích hỗ trợ ổn định.
- Safe area mặc định: ít nhất `72px` trái/phải và `56px` trên/dưới.
- Nội dung quan trọng không nằm sát mép, không phụ thuộc một vùng crop duy nhất.
- Chữ chính phải đọc được ở bản thu nhỏ `360x189`.
- Một headline ngắn, tối đa hai dòng; supporting copy tối đa hai dòng.
- Mặc định chỉ có `1 headline + 1 proof line + 1 brand lockup`; thêm lớp chữ thứ tư phải có lý do rõ ràng.
- Không đặt đoạn mô tả SEO đầy đủ lên ảnh.
- Không đặt QR cần quét trên OG. Nếu QR chỉ là tín hiệu thị giác, phải ghi rõ là decorative.

## 3. Cấu trúc thị giác

Ưu tiên ba tầng:

1. Brand: logo/wordmark thật.
2. Message: định vị hoặc tên giải pháp, ngắn và có thứ bậc mạnh.
3. Evidence: UI thật, thiết bị thật, ảnh sự kiện thật hoặc flow thật.

Không để ảnh AI tự sinh logo, chữ tiếng Việt, QR, số liệu hoặc UI cần chính xác.

## 4. Evidence-first trước, generation sau

Thứ tự chọn chất liệu:

1. Ảnh triển khai/sự kiện/con người thật có bằng chứng.
2. Product screenshot hoặc UI thật đủ độ phân giải.
3. Device mockup dựng từ UI thật.
4. Image generation chỉ khi ba nguồn trên không đủ tạo bố cục.

Trước khi sinh ảnh, phải lập inventory gồm kích thước, độ nét, nội dung và khả năng crop của toàn bộ asset thật. Không được gọi image generation chỉ vì nhanh hơn đọc kho ảnh.

Khi thực sự cần hybrid asset:

1. Art Gate chốt audience, vai trò route, visual direction và copy đã duyệt.
2. Sinh `background plate` không chữ, không logo, không QR và không được mang AI-tell phổ biến.
3. Ghép logo, typography và product screenshot bằng SVG/Sharp hoặc generator deterministic.
4. Lưu cả source plate, script generator và final asset có version.
5. Xuất thumbnail `600x315` và `360x189` để QA.
6. Nếu reviewer nhận ra “ảnh AI” trước khi hiểu thương hiệu, loại bỏ hướng đó và quay lại asset thật.

Tên file nên có vai trò và phiên bản, ví dụ:

```text
public/images/og/og-home-command-bg-v1.png
public/images/og/og-home-command-v1.png
scripts/make-home-og.mjs
```

## 5. Cache và metadata

- `og:image` và `twitter:image` phải dùng URL tuyệt đối khi render HTML.
- Khi thay ảnh đã bị Zalo/Facebook cache, ưu tiên đổi tên file (`v1` -> `v2`) thay vì chỉ ghi đè.
- Không dùng URL proxy của nền tảng làm source metadata; luôn trỏ về domain sở hữu.
- Kiểm tra HTML production, không chỉ đọc code.
- Homepage phải dùng brand master OG; trang sản phẩm giữ solution OG riêng.

## 6. QA checklist

- [ ] Final đúng `1200x630`.
- [ ] Logo và chữ là asset/layer deterministic, không phải chữ AI.
- [ ] Headline đọc được ở `360x189`.
- [ ] Không hiểu nhầm sản phẩm con là toàn bộ công ty.
- [ ] UI/ảnh bằng chứng đúng sản phẩm và còn đủ nét.
- [ ] Critical content nằm trong safe area.
- [ ] `og:image` và `twitter:image` cùng trỏ tới ảnh mong muốn.
- [ ] URL ảnh trả `200`, đúng content type và có thể truy cập công khai.
- [ ] Tên file mới đã phá cache khi cần.
- [ ] Đã kiểm tra preview trên ít nhất một nền tảng mục tiêu.

## 7. Anti-pattern

- Dùng hero 16:9, banner 3:2 hoặc ảnh vuông rồi mong nền tảng tự crop đẹp.
- Dùng banner chiến dịch/sản phẩm con làm homepage OG.
- Nhồi toàn bộ title, description, giá, CTA và QR vào một ảnh.
- Dùng eyebrow + headline + supporting copy + service list + caption cùng lúc trên một OG.
- Chữ nhỏ đẹp ở file gốc nhưng biến mất ở thumbnail.
- AI tạo luôn logo, chữ tiếng Việt hoặc giao diện sản phẩm.
- Dùng command center, hologram, đường mạch neon hoặc UI giả khi đã có ảnh triển khai thật tốt hơn.
- Ghi đè cùng URL rồi kết luận metadata không hoạt động khi Zalo còn cache.
