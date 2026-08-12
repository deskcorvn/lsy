# wordpress-5-pillars — nâng site WordPress khách lên chuẩn 5 trụ cột (đang chưng cất)

> **Trạng thái: KHUNG + phần chẩn đoán đã kiểm chứng. Đang chưng cất từ case pilot
> `projects/mam-quang-hai` (KE-HOACH.md) — mỗi phase làm thật xong thì điền mục tương ứng ở đây.**
> Nguồn đã có: chẩn đoán nenmongdatviet.vn (17/07) + khảo sát mamquanghai.vn (20/07) —
> chi tiết ở `docs/danh-gia-bo-sung-geo-wordpress-2026-07-16.md`.
> Vì sao playbook này tồn tại: khách SME Việt phần lớn đang ở WP; toolkit trước 07/2026 giả định
> Next.js toàn tập — điểm mù đã ghi nhận. Nhiều khách WP đang tới.

## Chân lý nền (đã kiểm chứng trên 2 case thật)

1. **Bệnh WP hầu hết là CẤU HÌNH, không phải xây lại.** nenmongdatviet: Rank Math có sẵn nhưng chọn
   schema `Person` thay `Organization` → AI học "công ty là một con người". mamquanghai: Yoast có
   sẵn nhưng Organization RỖNG ruột. Công cụ luôn có sẵn — chưa ai bật đúng.
2. **Gốc bệnh "chỉnh mất thời gian" = nhiều builder chồng nhau.** mamquanghai: Flatsome + Elementor
   cùng lúc. Luật: MỘT builder duy nhất.
3. **Triệu chứng site không được chăm** (nhận diện nhanh): `sample-page` còn public · title dính
   "Home" · 0 H1 · ảnh không alt · trang chủ trùng · llms.txt 404.

## 0.5 KHOÁ DESIGN SYSTEM trước khi đụng giao diện — ✅ chưng cất từ mamquanghai (5 vòng làm lại)

> **BẮT BUỘC trước mọi việc UI:** chưa có `DESIGN-SYSTEM.md` khoá + KHÁCH KÝ DUYỆT → CẤM code/đổi màu/bố cục.
> Quy trình đầy đủ (Extract → Draft → Sign-off → Build → Compliance): **[`design-system-lock.md`](design-system-lock.md)**.
> WP-riêng: (1) khách CÓ SẴN site → chạy `brand-extract`+`color-expert` ĐO màu/font/nút của theme cũ
> (hoặc mẫu khách chỉ định như dhfoods) → đó là gu ĐÃ được khách xác nhận, đừng tự chế; (2) viết
> `projects/<khách>/DESIGN-SYSTEM.md`, cho khách chốt (AskUserQuestion, kèm preview khi cần); (3) mọi phase
> sau đối chiếu file này, `design-craft` chấm COMPLIANCE (chụp UI → so token/nút/font), không "đẹp theo mắt tôi".
> Bài học đắt: mamquanghai bỏ bước này → tự áp gu → kem/nâu→đỏ/vàng→xanh→revert = **5 vòng**. Khoá xong: 1 lần trúng.

## 1. WP Intake Checklist (khảo sát) — ✅ chưng cất từ P0 mamquanghai 20/07

**Không cần admin (làm ngay khi có domain):**
- [ ] `curl` trang chủ: generator (bản WP/Woo) · theme trong `/wp-content/themes/` · builder
      (elementor|wpbakery|flatsome|divi|bricks) · SEO plugin (yoast|rankmath) · đếm `<script>` ·
      đếm H1 · alt/img · og:image · canonical
- [ ] JSON-LD: `@type` nào, Organization có address/telephone/taxID/sameAs không (bệnh phổ biến: RỖNG)
- [ ] `/llms.txt` (thường 404) · `/robots.txt` · sitemap index → đếm product/page thật
- [ ] Bảo mật lộ mặt: `/wp-json/wp/v2/users` có lộ username không · headers
- [ ] Đối chiếu MST trên masothue.com → tên pháp lý/địa chỉ/ngày thành lập (proof-point thật cho GEO)

### 1a. QUÉT AN NINH — làm ĐẦU TIÊN, không cần admin (case mamquanghai: 3/3 lỗ)

Đây là phần trả giá trị nhanh nhất cho khách và tạo uy tín ngay buổi đầu — khách SME hầu như không
biết mấy lỗ này tồn tại.

- [ ] `curl /wp-json/wp/v2/users?per_page=100` → **lộ tên đăng nhập?** (mamquanghai: lộ CẢ 3 —
      `trungspider` (id 1, quyền cao nhất), `cuongbui`, `content`). Lộ username = kẻ tấn công chỉ
      còn phải dò mật khẩu. Đây là lỗ phổ biến nhất và dễ vá nhất.
- [ ] `/author/<slug>/` trả 200 → xác nhận username lần hai (kể cả khi REST đã khoá).
- [ ] `/readme.html` → lộ phiên bản WP. `/xmlrpc.php` POST → 403 là tốt, 200 là điểm brute-force.
- [ ] `/wp-login.php` có giới hạn đăng nhập sai / 2FA không.
- [ ] Fingerprint plugin trả phí trên frontend (`wp-content/plugins/elementor-pro`, theme trả phí…)
      → **hỏi license đứng tên ai**. Bản bẻ khoá = rủi ro bảo mật (nulled hay nhúng mã độc) + pháp
      lý. Luật GiftyTech: **không nhận bàn giao site chạy phần mềm không license**.
- [ ] Thanh admin có nút "Activate Theme"/ổ khoá → theme trả phí **chưa kích hoạt license** →
      không nhận bản vá bảo mật.

**Cần admin (tài khoản RIÊNG cho agency — không dùng chung của khách):**
- [ ] Plugin inventory: cái nào sống, cái nào rác; builder nào dựng TRANG NÀO
- [ ] Theme child là gì, custom gì trong đó
- [ ] Woo: có đơn hàng THẬT trong DB không → quyết cách tắt (có = chỉ ẩn mặt tiền).
      mamquanghai: **0 đơn** → chuyển catalog mode an toàn tuyệt đối
- [ ] **Đếm plugin snippet**: Code Snippets / WPCode / Fluent Snippets. mamquanghai có **HAI** cùng
      lúc → code tuỳ biến nằm 2 nơi. **Kiểm kê hết snippet TRƯỚC khi gỡ builder** — snippet phụ
      thuộc builder mà gỡ mù là vỡ site
- [ ] Số bản cập nhật đang treo (mamquanghai: 13/12 plugin) — plugin chưa vá là đường vào phổ biến nhất
- [ ] Bình luận spam (mamquanghai: 106 trên site bán mắm) → dọn + tắt comment cho product/page
- [ ] **Chân trang wp-admin**: thường lộ đơn vị làm trước ("Website được phát triển riêng cho…").
      Tiếp quản thì hỏi khách: license theme/plugin đứng tên ai · hosting/DNS ai giữ · còn hợp đồng
      bảo trì không. KHÔNG tự đụng tài khoản người ta — báo khách để khách quyết
- [ ] Hosting/PHP/staging/backup hiện có
- [ ] User accounts + quyền

## 0. Môi trường render-test local (nhẹ, không MySQL/Docker) — ✅ chưng cất từ mamquanghai 22/07
Khi làm THEME RIÊNG cho khách (hướng chủ động, không phụ thuộc builder cũ), phải render-test trước
khi đóng gói — `php -l` chỉ bắt cú pháp, KHÔNG bắt lỗi runtime. Rig nhẹ, đặt ngoài ổ hệ thống:
- PHP portable (windows.php.net/downloads/releases/archives, bản `-nts-...-x64.zip`) — giải nén,
  `php.ini`: `extension_dir` trỏ đúng `ext/`, bật mbstring/sqlite3/pdo_sqlite/curl/gd/zip/openssl.
- `wp-cli.phar` + **sqlite-database-integration** (drop-in `db.php`) → WordPress chạy SQLite, khỏi MySQL.
- Copy WP core → site dir, `wp config create` (db dummy) + `wp core install`, activate theme,
  `php -S localhost:PORT site/index.php`, curl/screenshot.
Bài học thật: một handler `/llms.txt` dùng `add_rewrite_rule` pass lint nhưng chết runtime (WP
canonical redirect 301 đuôi `.txt`) → sửa thành chặn sớm ở `init` (priority 0) đọc `REQUEST_URI`. Chỉ render mới bắt.
Base theme khuyên dùng: **air-light** (MIT, Underscores-based, cực nhẹ) — fork + đổi style.css + thêm
module `inc/includes/` cho GEO/Woo. **KHÔNG cần chạy Parcel build**: viết CSS tay vào `assets/mqh.css`,
enqueue với dep `['styles']` (handle base của air-light) → nạp SAU, override sạch; theme tự-đủ, khách
deploy khỏi npm. `assets/dist/` (CSS/JS đã build sẵn trong repo air-light) giữ nguyên là chạy.

**BẪY render-test đã dính (đắt giá, phải nhớ):**
- Headless Chrome `--window-size=390,x` KHÔNG phải mobile viewport — nó render layout desktop rồi crop
  → media query không kích hoạt, `scrollWidth` báo sai, mình "test 390" mà thực ra xem desktop. PHẢI dùng
  puppeteer-core `page.emulate({viewport:{width:390,isMobile:true,...}})` (CDP setDeviceMetrics) mới ra mobile thật.
  Cài `puppeteer-core` (KHÔNG tải Chromium, dùng Chrome máy sẵn), `executablePath` trỏ chrome.exe.
- Đo bằng số, đừng tin mắt: `documentElement.scrollWidth - innerWidth` (overflow px), đếm `h1`, liệt kê
  element có `getBoundingClientRect().right > vw+1` (thủ phạm tràn), computed `display` của nút toggle.
- Khoảng hở **source→deploy**: nếu theme deploy là bản COPY, sửa source test lại bản cũ (ngồi sửa mãi không
  đổi!). Fix: biến deploy thành **junction** trỏ source (`New-Item -ItemType Junction`) → một nguồn chân lý.
  NHƯNG `rm -rf` (Git Bash) lên junction Windows có thể xuyên qua xoá file GỐC — gỡ junction phải bằng
  `[System.IO.Directory]::Delete(path, $false)` (chỉ gỡ reparse point). Xem `workspace-git-traps`.

## 2. Safety net + vá bảo mật — ✅ chưng cất từ P1 mamquanghai (có snippet dùng lại)
Backup files+DB tải về + snapshot hosting · staging trước khi đụng · tài khoản admin riêng ·
chụp baseline (screenshot + geo-audit --url) để có số "trước". KHÔNG BAO GIỜ sửa site đang chạy
mà không có đường lui.

**Snippet hardening dán-là-chạy** (WPCode PHP, Run Everywhere) — vá đúng 3 lỗ phổ biến nhất
(lộ username REST + author enum + lộ version). Mẫu đầy đủ + trình tự thao tác:
`projects/mam-quang-hai/BUOC-1-AN-TOAN.md`. Lõi:
```php
// Chặn liệt kê user cho khách chưa đăng nhập (admin đăng nhập vẫn dùng bình thường)
add_filter('rest_endpoints', function ($e) {
    if (!is_user_logged_in()) { unset($e['/wp/v2/users'], $e['/wp/v2/users/(?P<id>[\d]+)']); }
    return $e;
});
add_action('template_redirect', function () {
    if (!is_user_logged_in() && (is_author() || isset($_GET['author']))) { wp_safe_redirect(home_url('/'), 301); exit; }
});
remove_action('wp_head', 'wp_generator');
if (!defined('DISALLOW_FILE_EDIT')) define('DISALLOW_FILE_EDIT', true);
```
Kèm: đổi mật khẩu mọi tài khoản (mật khẩu đã qua chat = coi như lộ) · Limit Login Attempts · xoá
`readme.html` · Wordfence quét mã độc (BẮT BUỘC nếu site có plugin/theme bản nulled — nguồn malware
phổ biến nhất) · cập nhật core+plugin TRỪ builder sắp gỡ (bản mới nhảy version lớn hay vỡ).
Luật license đọc lại: purchase code (Flatsome/Elementor) chỉ để auto-update, KHÔNG khóa tính năng —
đừng bắt khách mua; rủi ro thật là nulled=malware, gỡ đồ nulled + quét là xong.

## 3. Diet WP (dọn stack) — ⬜ chưng cất từ P2
- MỘT builder duy nhất (bỏ builder chồng; dựng lại trang bằng builder giữ lại)
- Bán qua kênh khác (Zalo/hotline)? → Woo **catalog mode**: ẩn cart/checkout, product giữ làm
  nội dung, nút mua → CTA Zalo
- Dọn index: sample-page, trang nội bộ lộ, trang trùng → 301/noindex
- Giảm script: tắt module theme/plugin không dùng

## 4. Pattern "catalog đơn giản" — ⬜ builder có sẵn / ✅ build theme riêng
Mẫu tham chiếu khách SME Việt hay chỉ định: dhfoods.com.vn — grid SP 3 cột (ảnh + tên + cỡ),
chữ ít, không giỏ hàng, footer đủ pháp lý.
**QUYẾT ĐỊNH đường đi** (case mamquanghai chọn build riêng):
- Builder khách còn lành + có license → dựng lại trang trong builder đó (recipe UX Builder, chờ chưng cất).
- Builder khách nulled/bloat/license kẹt, hoặc khách muốn "chủ động không phụ thuộc đồ cũ" → **build theme riêng** (mục 4b).

## 4b. Build theme riêng từ air-light — recipe đã chạy END-TO-END ✅ (mamquanghai 22/07)
Ưu điểm: ZERO quyền truy cập khách lúc build (dựng offline, chỉ cần quyền lúc deploy) · không đụng
plugin/builder nulled · giao hàng = 1 file `.zip` khách tự upload wp-admin. Các mảnh ghép đã kiểm chứng:

**Catalog mode (Woo) — hook thật** (`inc/includes/*-woocommerce.php`):
```php
add_theme_support('woocommerce');
add_filter('woocommerce_is_purchasable', '__return_false');   // tắt mua toàn site
add_filter('woocommerce_show_page_title', '__return_false');  // chống 2 H1 trang shop
add_filter('woocommerce_product_tabs', fn($t)=>{unset($t['reviews']);return $t;}, 98); // bỏ Reviews
add_action('init', fn()=>{ remove_action('woocommerce_after_shop_loop_item','woocommerce_template_loop_add_to_cart',10);
  remove_action('woocommerce_single_product_summary','woocommerce_template_single_add_to_cart',30); });
add_action('woocommerce_single_product_summary', /* in nút "Đặt qua Zalo" */ , 31);
add_action('template_redirect', /* is_cart||is_checkout||is_account → 302 về archive product */ );
```
**Lưới SP 3 cột — 2 bẫy CSS phải vá:**
- `woocommerce_content()` trong wrapper tự viết KHÔNG có `.woocommerce` bao ngoài → cả CSS mình lẫn CSS
  lõi Woo mất tổ tiên, `<li>` co về content-width, xếp lộn xộn. Fix: bọc `<div class="woocommerce">`.
- Woo core ép `li.product { width:22%; float:left; margin }` (layout float mặc định) đè lên CSS Grid →
  card teo. Fix: `ul.products li.product { width:auto!important; float:none!important; margin:0!important }`.
- Trang chi tiết: `product_title` của Woo ĐÃ là `<h1>` → wrapper đừng in H1 nữa (bọc `if(!is_product())`).
  Ẩn giá catalog: `div.product p.price, div.product span.price { display:none }`.

**Bẫy specificity CSS**: nút `.mqh-btn-primary`(0,1,0) đặt trong `.mqh-prose` mà rule `.mqh-prose a`(0,2,0)
set màu chữ = màu nền → CTA chữ vô hình. Fix: `.mqh-prose a:not(.mqh-btn)`. (Luôn đo computed `color` vs `background`.)

**ĐÓNG GÓI ZIP — bẫy chí mạng**: PowerShell `Compress-Archive` (5.1) tạo entry tên có **backslash**
(`theme\style.css`) → host Linux của khách coi là MỘT file phẳng → theme cài HỎNG (dù Windows giải nén OK).
PHẢI đóng bằng **PHP ZipArchive** entry forward-slash (`chr(92)`→`/`). Kiểm chứng: `getFromName("theme/style.css")`
tìm thấy + đếm entry chứa `\` = 0 + giải nén FRESH vào theme mới + `wp theme activate` + render HTTP 200.
Slim gói: prune `assets/src` (SCSS/JS nguồn), dotfiles, `package*.json`, `parcel/`, `composer*`, `bin/`, docs
air-light — chỉ giữ runtime (`.php`, `style.css`, `assets/dist`+`fonts`+`mqh.css`+`svg`, `inc/`, `template-parts/`).
Kèm `HUONG-DAN-CAI-DAT.txt` trong zip (upload wp-admin + gán menu Primary + slug đúng + note Woo).

**BẪY VÒNG 2 — build-theme thay TOÀN BỘ theme (đắt hơn, phải nhớ):**
- **TEST TRÊN NỘI DUNG THẬT, KHÔNG PHẢI DEMO.** Theme sạch thay theme cũ → *mọi* trang builder cũ
  (Flatsome/Elementor) VỠ hoặc lộ shortcode thô `[section]` khi render bằng `the_content()`. Bản test
  trên 4 SP demo báo "verified" nhưng site thật ~16 SP/4 danh mục + 5-6 trang Flatsome → hỏng hàng loạt.
  BẮT BUỘC: seed dữ liệu thật vào rig (`wp wc product create`, `wp post create` theo đúng slug menu thật)
  HOẶC import WXR (Công cụ → Xuất) trước khi claim xong. Đọc site thật bằng WebFetch để lấy menu/nội dung/SP.
- **Clean-theme = phải dựng LẠI MỌI trang** site có (không chỉ home/about/contact). Map slug menu thật →
  `page-{slug}.php`. Trang chưa dựng: lọc shortcode Flatsome `preg_replace('/\[\/?[^\]]+\]/','',...)` để
  không lộ chữ thô (lưới an toàn), nhưng đẹp thì phải dựng template.
- `the_content()` ở front-page/page.php dump nội dung Flatsome cũ → BỎ ở trang tự-dựng; chỉ nhúng nếu có
  form thật (`[contact-form-7|wpforms|gravityform]`).
- **Reveal/animation phải degrade AN TOÀN**: gate `.has-reveal` do JS thêm; mặc định (không JS/crawler/
  screenshot fullPage không cuộn) = nội dung HIỆN đủ. Nếu ẩn mặc định + JS lỗi → mất chữ. Screenshot phải
  auto-scroll để kích hoạt IntersectionObserver mới thấy đúng.
- `wp wc product create --name="[OCOP] ..."` có `[shortcode]` ĐẦU tên → title lưu thành "Product" (mất tên).
  Fix: set title bằng `wp post update --post_title`.
- **Junction + giải nén zip**: extract vào thư mục themes mà tên trùng junction → ghi XUYÊN junction vào
  SOURCE. Test cài-fresh phải giải nén ra thư mục sạch riêng rồi mới copy vào themes.
- MSYS (Git Bash) chuyển tham số bắt đầu `/` thành path Windows → URL/route hỏng khi gọi node/exe; truyền
  route không có `/` đầu rồi ghép trong JS (đừng dùng `MSYS_NO_PATHCONV=1` global — hỏng path PHP server).
- Rig local: WP home_url cố định 1 cổng → mọi cổng khác bị canonical 301; luôn serve + test đúng cổng đó.

**Recipe trang danh mục kiểu DH Foods** (khách SME hay chỉ định): page-hero căn giữa + hàng SỐ LIỆU (số thật)
+ pills lọc danh mục (neo `#cat-slug`, active màu nhấn) + lưới 4 cột theo danh mục, card = badge spec (độ đạm/
dung tích) góc trên-trái + ảnh vuông + tên + "Xem chi tiết". Responsive 4→3→2→1. Card featured trang chủ dùng
CHUNG markup để đồng bộ.

## 5. NĂM TRỤ CỘT trên WP — lõi playbook — ✅ có KIT cắm-là-chạy (rút từ mamquanghai)

> **Bộ code tái dùng: [`chassis/wp-5-pillars-kit/`](../chassis/wp-5-pillars-kit/README.md)** — thả `inc/` vào
> fork air-light, điền `sk_site_entity()` bằng số thật → tự có GEO schema + SEO meta description + AIO llms.txt
> (+ catalog-mode + FAQ AEO tuỳ chọn), KHÔNG phụ thuộc plugin SEO. README có scorecard + lệnh ĐO từng trụ.

| Trụ | Trên WP làm gì | Ghi chú đã kiểm chứng |
|---|---|---|
| **SEO** | Title template (bỏ "Home"), H1 đúng 1/trang (builder hay render hero bằng div/h2!), alt hàng loạt, canonical, redirect map khi dọn trang | nenmongdatviet: 0 H1 cả 3 trang kiểm; 114/116 ảnh không alt |
| **GEO** | SEO plugin → Organization/LocalBusiness ĐẦY ĐỦ: legalName + taxID (từ giấy tờ/masothue) + address + telephone + foundingDate + sameAs (GBP/Zalo/FB). Bẫy Rank Math: wizard chọn Person→Organization | Số phải THẬT — GEO GATE. Đối chiếu masothue trước khi nạp |
| **AEO** | FAQ schema từ câu hỏi THẬT của khách hàng; nội dung answer-first không giấu trong accordion JS | |
| **AIO** | llms.txt: **chặn sớm `init` priority 0 đọc `REQUEST_URI`** (KHÔNG `add_rewrite_rule` — bị canonical 301 đuôi .txt) hoặc page tĩnh | Cả 2 case ban đầu 404; kỹ thuật init-hook đã render HTTP 200 ✅ |
| **SXO** | Form liên hệ ngắn + nút Zalo/gọi nổi; mọi CTA đo được | Cân nhắc port ai-launcher-kit bản WP |

## 6. Đo & bàn giao — ⬜ chưng cất từ P6
- `geo-audit --url <domain>` (đang build cùng case pilot — chạy được trên URL sống, không cần
  source): so trước–sau, số vào báo cáo bàn giao
- **SOP 1 trang cho nhân sự khách** (khách tự cập nhật là mô hình phổ biến): cách thêm sản phẩm
  đúng chuẩn (ảnh/alt/danh mục), cái gì KHÔNG được đụng
- Off-site: GBP + NAP nhất quán mọi kênh (bài học giftyid: địa chỉ sai đến từ off-site, sửa code
  không cứu được)

## Luật chung (không thương lượng)
- Credential khách KHÔNG vào repo/doc. Tài khoản admin riêng cho agency, khách đổi mật khẩu sau đợt.
- 4 cổng vẫn áp dụng đầy đủ trên WP: giao diện → ART · thông điệp → copy-craft ≥8/10 + COPY ·
  title/slug/redirect → SEO · thực thể → GEO.
- Số liệu trên site = số thật có nguồn (giấy tờ, masothue, kiểm định) — claim vô nguồn thì bỏ.
