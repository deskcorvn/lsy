# Motion Craft

> Một hệ motion nguyên bản cho landing page cao cấp. Mục tiêu là tạo chiều sâu và nhịp kể chuyện bằng bố cục, typography và chuyển động có chủ đích — không dựa vào glow, particle hay vòng lặp trang trí.

## North Star

Mỗi màn hình chỉ có **một signature move**. Chuyển động phải làm rõ thứ tự đọc, quan hệ không gian hoặc phản hồi thao tác. Nếu bỏ animation mà thông tin trở nên khó hiểu hơn, animation đó có lý do tồn tại; nếu không, bỏ.

## Visual language

- Canvas đen mực, panel graphite, chữ trắng ngà; một accent cam san hô để đánh dấu hành động.
- Display type lớn, line-height chặt; body text rộng tối đa 65 ký tự.
- Khối media có bán kính vừa phải và đường viền rất nhẹ. Depth đến từ overlap và scale, không từ shadow dày.
- Nhịp section rộng: 96–144px desktop, 64–96px mobile.
- Không dùng asset, copy, tên thương hiệu hoặc URL media lấy từ gallery tham khảo.

## Motion tokens

| Vai trò | Token | Dùng cho |
|---|---|---|
| Feedback | `--mc-motion-fast` | hover, press, focus |
| Transition | `--mc-motion-base` | card, menu, reveal ngắn |
| Story | `--mc-motion-story` | hero entrance, section choreography |
| Distance | `--mc-shift-sm/md/lg` | biên độ translate tối đa |
| Ease | `--mc-ease-out` | enter/reveal |
| Ease | `--mc-ease-spring` | magnetic CTA, panel settle |

Chỉ animate `transform`, `opacity`, và khi thật cần thiết `clip-path`. Không animate `top`, `left`, `width`, `height`, blur lớn hoặc box-shadow liên tục.

## Component patterns

### 1. Kinetic type hero

- Eyebrow ngắn → heading 2–3 dòng → CTA → media focal.
- Heading vào theo từng dòng, translate 24px → 0 và opacity 0 → 1.
- Media vào sau heading 80–120ms để mắt có điểm neo.
- Không cho mọi chữ bay riêng lẻ; tối đa 3 nhóm reveal.

### 2. Proof rail

- Dùng rail ngang cho logo, case-study thumbnail hoặc bằng chứng thực tế.
- Ưu tiên drag/scroll do người dùng kiểm soát. Nếu autoplay, dừng khi hover/focus và khi tab ẩn.
- Không nhân ba DOM chỉ để chạy vô hạn trên mobile.

### 3. Magnetic CTA

- Chỉ desktop có con trỏ chính xác; dịch chuyển tối đa 6px.
- Hit target không đổi vị trí trong layout; chuyển động nằm ở lớp con.
- Touch, keyboard và reduced-motion dùng trạng thái tĩnh.

### 4. Reveal copy

- Reveal theo dòng hoặc cụm từ, không theo từng ký tự cho nội dung dài.
- Contrast ở trạng thái chưa reveal vẫn đạt mức đọc được; animation chỉ tăng nhấn mạnh.
- Một paragraph tối đa 3 nhịp.

### 5. Sticky story stack

- Dùng cho 3–5 case study có thứ tự kể chuyện.
- Mỗi card chỉ scale 1 → 0.96 và dịch tối đa 24px.
- Mobile chuyển thành list thường; không khóa scroll.

### 6. Depth grid

- Grid media lệch hàng nhẹ, có một item span 2 hàng để tạo nhịp.
- Hover chỉ lift 4px + đổi border; không tilt 3D trên toàn bộ grid.
- Poster/video phải có kích thước khai báo để tránh layout shift.

## Accessibility and performance gates

- `prefers-reduced-motion: reduce` phải đưa toàn bộ animation về trạng thái cuối ngay lập tức.
- Keyboard focus luôn nhìn thấy; hover không được là cách duy nhất lộ nội dung.
- Không autoplay video có âm thanh. Video preview dùng `muted`, `playsinline`, poster và lazy loading.
- Mục tiêu: animation không tạo long task > 50ms; tránh nhiều hơn 3 phần tử story chạy cùng lúc.
- Motion pass phải qua `skills/animation/skills/review-animations` trước ART GATE. (Trong project đã
  bootstrap, skill này được phẳng-hoá thành `.claude/skills/review-animations` — gọi thẳng bằng tên.)

## Anti-patterns

- Glow orb, particle field hoặc beam chỉ để lấp nền.
- Marquee vô hạn chứa nội dung cần đọc.
- Parallax mạnh làm text và nền chạy ngược chiều quá 24px.
- Cursor follower toàn trang, scroll hijacking, smooth-scroll bắt buộc.
- Copy nguyên prompt, asset URL, screenshot hoặc layout nhận diện từ gallery thương mại.
