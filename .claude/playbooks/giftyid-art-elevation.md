# GiftyID Art Elevation Audit

Ngày rà soát: 2026-07-07.

Mục tiêu: xem các repo giao diện/thẩm mỹ có thể giúp `giftyid` trở thành sản phẩm có trình độ nghệ thuật cao hơn, nhưng vẫn giữ tính B2B, local commerce, Zalo Mini App, QR và dữ liệu vận hành.

## Nguồn Đã Rà

- `D:\Workspace\A3 Landingpage\skills\impeccable`
- `D:\Workspace\A3 Landingpage\open-design`
- `D:\Workspace\A3 Landingpage\skills\frontend-design`
- `D:\Workspace\A3 Landingpage\skills\taste-skill`
- `D:\Workspace\A3 Landingpage\skills\ui-design-brain`
- Code hiện tại của `projects/giftyid`: `globals.css`, home page, `SolutionLandingPage`, ECard routes/components.

## Hiện Trạng GiftyID

Điểm mạnh:

- Nội dung thật, có bối cảnh Hải Phòng, công đoàn, bưu điện, QR, Mini App.
- Brand palette đã có: teal-blue sâu, amber accent, nền lạnh không kem.
- Có nhiều ảnh sự kiện/thực địa, không chỉ stock.
- Có ECard runtime tốt: `/card`, `/card/[slug]`, QR, vCard, share, social, map, video.
- SEO/schema/landing content đã tương đối chặt.

Điểm đang kéo xuống mức "template":

- Nhiều section cùng công thức: eyebrow nhỏ tracking rộng, heading, body, grid card.
- Card/border/shadow lặp nhiều, thiếu các section dạng editorial, diagram, device stage.
- Hero nhiều trang dựa vào nền xanh + grid, chưa có một visual language riêng cho hệ sinh thái.
- Motion hiện có còn generic: float, glow, slide, scale. Chưa kể câu chuyện QR/order/mini-app.
- Type system đang là fallback system fonts, chưa có signature typographic move.
- Asset system chưa đủ phân vai: OG, hero, mobile hero, poster, device mockup, diagram.
- Các trang solution dùng một component chung khá tốt về tốc độ, nhưng làm các sản phẩm giống nhau.

## North Star Đề Xuất

**Civic Commerce Command System**

GiftyID/GiftyTech nên trông như một hệ điều hành thương mại địa phương: Mini App, công đoàn, bưu điện, QR, nhà cung cấp và người mua cùng nằm trên một bản đồ vận hành rõ ràng. Cảm giác cần đạt: đáng tin, có dữ liệu, có hạ tầng thật, đủ tinh tế để bán cho doanh nghiệp.

Không nên đi theo:

- SaaS tím/xanh gradient chung chung.
- Landing agency hào nhoáng nhưng thiếu sản phẩm.
- Beige editorial quá mềm.
- Dashboard tối đặc nếu trang hướng tới đối tác không kỹ thuật.

## Art Direction Lanes

### 1. Civic Command

Dùng cho homepage, Chợ Z, mua chung, logistics, QR nhận hàng.

Nguồn cảm hứng:

- Open Design: Mission Control, Linear, D3 visualization.
- Impeccable: layout, colorize, harden.

Biểu hiện:

- Nền sáng lạnh hoặc navy sâu theo vùng.
- Line/grid như bản đồ vận hành, nhưng mảnh và có chức năng.
- Diagram thật: nguồn hàng, Zalo, công đoàn, bưu điện, người mua.
- Số liệu có caption nguồn.
- Amber dùng như telemetry/action, không rải lung tung.

Nên làm:

- Rework homepage hero thành "operating map" thay vì chỉ phone + glow.
- Section mô hình nên có flow map hoặc interactive diagram.
- QR nhận hàng nên có motion scan/check nhỏ.

### 2. Premium ECard

Dùng cho `/ecard-vip`, `/card`, OG, NFC.

Nguồn cảm hứng:

- Open Design: mockup-device-3d, poster-hero, imagegen-frontend-mobile.
- Gói ECard factory đã tạo.
- Impeccable: anti-overdetail, responsive hardening.

Biểu hiện:

- Card/profile lớn, QR rõ, avatar/cover thật.
- OG tách khỏi hero visual.
- Mobile hero riêng nếu ảnh dày thông tin.
- NFC mockup như sản phẩm vật lý cao cấp.

Nên làm:

- Tạo thư viện OG: VIP cá nhân, Team/Pro, NFC, Growth.
- Tạo device stage cho profile chạy trên iPhone.
- Tạo vertical poster 1080x1920 để share Zalo/Facebook.

### 3. Proof Editorial

Dùng cho hồ sơ năng lực, event, case study, partner proof.

Nguồn cảm hứng:

- Open Design: Editorial, Atelier Zero.
- Impeccable STYLE: câu chữ cụ thể, không buzzword.

Biểu hiện:

- Ảnh thật lớn, caption nguồn rõ.
- Layout bất đối xứng có chủ đích.
- Ít card, nhiều ảnh + quote + số liệu.
- Font/display có nhịp riêng nhưng vẫn đọc tốt tiếng Việt.

Nên làm:

- Chuyển một số section "proof" từ card grid sang editorial spreads.
- Mỗi ảnh sự kiện có caption thật: địa điểm, ngày, bối cảnh.
- Case study dùng cấu trúc: vấn đề, mô hình, ảnh thật, kết quả, bước tiếp.

### 4. Product Stage

Dùng cho Mini App thương hiệu riêng, Chợ Z, website 5 trụ cột, dashboard/admin.

Nguồn cảm hứng:

- Open Design: Stripe, Linear, Device 3D Showcase.
- UI Design Brain: component rigor.

Biểu hiện:

- UI thật được đặt trong phone/MacBook.
- Không dùng mockup mờ, không crop quá tối.
- Feature sections show product state, not icon + text only.

Nên làm:

- Tạo `ProductStage` component cho phone/MacBook.
- Thay một số icon-card bằng screenshot thật hoặc UI reconstruction.
- Với website 5 trụ cột: show search/AI citation/llms/schema as product proof.

### 5. Data Story

Dùng cho trang năng lực, báo cáo, số liệu địa phương, phễu vận hành.

Nguồn cảm hứng:

- Open Design: d3-visualization, live-dashboard, data-report templates.
- Mission Control for dense states.

Biểu hiện:

- Charts/flow/heatmap nhỏ nhưng thật.
- Không dùng số lớn rời rạc nếu không có ý nghĩa.
- Mỗi số liệu có nhãn nguồn và ngày.

Nên làm:

- Biến `CONTEXT_STATS` thành một "regional operating context" visual.
- Tạo diagram cho mô hình mua chung.
- Thêm `source footnotes` ở các số liệu lớn.

### 6. Social Asset System

Dùng cho campaign, Zalo share, tuyển agency/collaborator.

Nguồn cảm hứng:

- Open Design: poster-hero, card-twitter, imagegen-frontend-web.
- ECard asset prompts.

Biểu hiện:

- 1080x1920 poster.
- 1200x630 OG.
- 1080x1080 square.
- QR rõ, CTA ít chữ, brand nhận diện nhất quán.

Nên làm:

- Tạo `/public/social/` naming convention.
- Mỗi landing quan trọng có OG + vertical poster.
- Không dùng cùng một ảnh cho mọi kênh.

## Backlog Ưu Tiên Cho GiftyID

### P0: Thiết Kế Hệ Art Direction

- Thêm `DESIGN.md` cho GiftyID hoặc dùng `design-systems/giftytech-art/DESIGN.md` làm contract.
- Chuyển palette sang ramp rõ hơn: ink, muted, line, surface, surface-ink, amber, teal.
- Xác định radius/shadow: tránh border + shadow rộng trên cùng element.
- Đặt motion tokens: fast 160ms, standard 220ms, reveal 420ms, reduced-motion.

### P1: Homepage Hero Và Mô Hình Vận Hành

- Tạo hero "Civic Commerce Command": bản đồ flow + phone Mini App + QR node.
- Biến `MODEL_STEPS` thành visual flow thay vì list đều.
- Dùng ảnh thật bưu điện/công đoàn trong proof band.

### P1: Solution Landing Variants

Hiện `SolutionLandingPage` đang dùng một template chung. Nên thêm `visualVariant`:

- `command`: Chợ Z, mua chung, logistics, QR.
- `product-stage`: Mini App, website 5 trụ cột.
- `premium-profile`: ECard VIP.
- `editorial-proof`: hồ sơ năng lực/case study.

Variant chỉ thay hero/proof/component layout, không phá content/schema chung.

### P1: ECard Asset Library

- OG VIP, OG Team/Pro, OG NFC, OG Growth.
- Hero desktop và hero mobile riêng.
- Profile cover set.
- NFC mockup.
- QR print template.

### P2: Motion System

- QR scan animation.
- Order status transition.
- Sticky bottom action bar states.
- Device stage entrance.
- Diagram line draw, with reduced-motion fallback.

Không thêm custom cursor, particle, endless loop.

### P2: Product Proof Components

- `DeviceStage`: phone/MacBook with real UI.
- `FlowMap`: Zalo -> order -> delivery -> QR confirmation.
- `ProofSpread`: large image + caption + fact.
- `SourceNote`: standardized source citation block.
- `MetricContext`: number + source + caveat.

### P3: Visual QA Automation

- Playwright screenshots for homepage, `/ecard-vip`, `/card`, key solution pages.
- Check text overflow mobile/tablet.
- Check color contrast.
- Check OG preview small size.
- Screenshot before/after for design review.

## Design Rules Riêng Cho GiftyID

- GiftyID không phải "AI SaaS". Đừng dùng purple-blue glow làm mặc định.
- GiftyID có hạ tầng thật. Ưu tiên ảnh thật, QR thật, UI thật.
- Amber là tín hiệu hành động/số liệu, không phải màu trang trí khắp nơi.
- Teal/navy là nền tin cậy, cần thêm surface ramp để tránh một màu.
- Không dùng eyebrow all-caps ở mọi section. Thay bằng caption nguồn, label flow, hoặc bỏ hẳn.
- Không biến mọi lợi ích thành card giống nhau.
- Hero phải cho thấy sản phẩm hoặc mô hình thật trong viewport đầu.
- Copy phải nói việc cụ thể: quét QR, mở Mini App, gom đơn, giao điểm nhận, lưu danh bạ.

## Khi Nào Dùng Repo Nào

- Muốn polish page đang có: Impeccable.
- Muốn art direction mới: Open Design `creative-director` + selected design systems.
- Muốn tạo reference ảnh từng section: `imagegen-frontend-web`.
- Muốn tạo mobile/profile comps: `imagegen-frontend-mobile`.
- Muốn tạo OG/poster/social: `poster-hero`, `card-twitter`.
- Muốn show app thật: `mockup-device-3d`.
- Muốn motion nhẹ: `emilkowalski-motion`.
- Muốn flow/data: `d3-visualization`, `frame-flowchart-sticky`.
- Muốn component đúng UX: `ui-design-brain`.

## Definition Of Done Cho Một Đợt Art Elevation

- Có before/after screenshots.
- Có design contract hoặc note direction.
- Có ít nhất một signature visual mới trong viewport đầu.
- Ít nhất một section đổi khỏi công thức card grid.
- Asset social/OG được tách đúng kênh.
- Mobile không overflow.
- Contrast pass.
- Build pass.

