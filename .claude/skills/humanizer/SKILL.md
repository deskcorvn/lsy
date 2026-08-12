---
name: humanizer
description: "Công cụ Humanizer cho CHỮ — tẩy dấu hiệu văn-AI khỏi mọi text (copy, bài viết, docs, README, mô tả sản phẩm) để đọc như người thật viết. Bộ 33 pattern nhận diện (theo hướng dẫn 'Signs of AI writing' của Wikipedia, bản vận hành MIT ở vendor/ai-copywriter) + bảng dấu-hiệu tiếng Việt riêng + luật chống false-positive. Chạy SAU draft, TRƯỚC copy-craft. Với giao diện/bố cục dùng skills/design-humanizer."
metadata:
  author: giftytech (nền: vendor/ai-copywriter — MIT © Siqi Chen, Mickey Haslavsky)
  type: craft
user-invocable: true
---

# humanizer — tẩy dấu AI khỏi chữ

Cốt lõi vì sao văn AI nhận ra được: **model đoán từ kế tiếp theo xác suất → ra thứ "đúng trung
bình cho nhiều trường hợp nhất"** — tức là văn không có ai đứng sau. Humanize = gỡ các khuôn
thống kê đó và trả lại dấu người. Nhưng nhớ: **văn vô hồn sạch-pattern vẫn lộ AI** — nửa kia
của việc này là giữ/thêm giọng (quan điểm, nhịp không đều, chi tiết đặc thù), không phải chỉ tẩy.

## A. Bốn luật vận hành (thứ tự ưu tiên)

1. **Giữ thông tin, không giữ khuôn.** Mọi claim của bản gốc sống sót qua bản sửa; nhưng độ sâu
   không cần đều — nén chỗ nhạt, dừng lâu chỗ người thật sẽ dừng; gộp/tách đoạn tự do.
2. **Không bịa fact.** Bản sửa không chứa fact/tên/số/ngày/trích dẫn nào không có trong nguồn.
   Đổi claim mơ hồ thành cụ thể CHỈ khi cái cụ thể đến từ nguồn hoặc từ người dùng; cần chi tiết
   thật mà không có → hỏi, hoặc viết bản trơn không có nó.
3. **Khớp giọng.** Người dùng đưa văn mẫu của họ → phân tích trước (độ dài câu, từ vựng, mở
   đoạn, dấu câu, cụm lặp) và BẮT CHƯỚC thói quen đó thay vì chỉ xoá pattern. Mẫu thắng mọi luật
   style của skill (kể cả luật gạch dài): mẫu dùng gạch dài thì giữ đúng tần suất của mẫu.
4. **Giọng đúng chỗ.** Blog/opinion/bài cá nhân → được có quan điểm, do dự, humor, aside. Văn
   kỹ thuật/pháp lý/tham chiếu → trung tính phẳng CHÍNH LÀ giọng người đúng; đừng bơm cảm xúc.

## B. 33 pattern — bản đồ vận hành (chi tiết + ví dụ đầy đủ: `vendor/ai-copywriter/SKILL.md`)

**Nhóm NỘI DUNG (1–6):** thổi phồng tầm quan trọng/di sản ("đánh dấu bước ngoặt", "khẳng định vị
thế"); khoe độ nổi tiếng/báo chí không ngữ cảnh; đuôi "-ing" phân tích giả sâu (tiếng Việt: đuôi
"...góp phần khẳng định/thể hiện/phản ánh" dán cuối câu); ngôn ngữ quảng cáo ("tọa lạc tại trung
tâm", "tuyệt đẹp", "đẳng cấp"); trích nguồn ma hồ ("các chuyên gia cho rằng", "nhiều nghiên cứu
chỉ ra" — không tên); section "Thách thức và triển vọng" công thức.

**Nhóm NGÔN NGỮ (7–13):** từ vựng AI tần suất cao (delve/tapestry/landscape/pivotal — bản Việt ở
mục C); né "là/có" bằng cấu trúc kêu ("đóng vai trò như", "sở hữu"); song song phủ định ("không
chỉ X mà còn Y", "không đơn thuần là..., mà là..."); **bộ ba mọi nơi** (liệt kê 3 thứ liên tục để
ra vẻ đầy đủ); xoay vòng từ đồng nghĩa (nhân vật chính → người hùng → vị chủ nhân); "từ X đến Y"
giả phạm vi (X, Y không cùng thang); bị động giấu chủ ngữ.

**Nhóm STYLE (14–19):** **gạch dài — luật CỨNG: bản chốt KHÔNG còn `—`/`–`** (thay bằng dấu chấm
> phẩy > hai chấm > ngoặc đơn > viết lại; quét lần cuối, còn 1 cái = chưa xong; ngoại lệ duy
nhất: văn mẫu người dùng có dùng); bôi đậm máy móc; danh sách "**Đề mục:** câu"; Title Case Tiếng
Việt Từng Chữ; emoji trang trí đầu bullet/heading; ngoặc kép cong khi codebase dùng thẳng.

**Nhóm GIAO TIẾP (20–22):** rác hội thoại chatbot dán vào content ("Hy vọng thông tin hữu ích!",
"Bạn có muốn mình..."); disclaimer cutoff + đoán lấp chỗ trống ("thông tin còn hạn chế, có lẽ...",
"giữ kín đời tư" không nguồn — nói thẳng "chưa có nguồn" hoặc cắt); giọng nịnh ("Câu hỏi rất hay!").

**Nhóm ĐỆM & RÀO (23–33):** cụm đệm ("nhằm mục đích", "trong thời điểm hiện tại", "cần lưu ý
rằng"); rào kép ("có thể có khả năng phần nào"); **kết bài lạc quan rỗng** ("tương lai rộng mở
phía trước" → cắt, kết ở fact cuối); lạm phát từ-ghép-gạch-nối đều tăm tắp; trope "câu hỏi thực
sự là / về bản chất / cốt lõi vấn đề"; báo hiệu ("hãy cùng tìm hiểu", "dưới đây là những điều
cần biết" → làm luôn, đừng báo); câu-một-dòng nhắc lại heading; văn viết-theo-diff ("hàm này
được thêm để thay..."→ tả trạng thái hiện tại); **kịch staccato** (chuỗi câu cụt dồn dập tạo
drama giả); công thức cách ngôn ("X là ngôn ngữ của Y", "X không phải công cụ mà là tấm gương");
mở giả-thân-mật ("Thật lòng mà nói?", "Nói thẳng nhé:").

## C. Bảng dấu-hiệu TIẾNG VIỆT (bổ sung riêng, grep được)

Cụm gần-như-chắc-chắn-AI trong văn Việt (đối chiếu 20 luật copy-craft — đây là phần TẨY, copy-craft là phần VIẾT):

| Grep | Thay bằng |
|---|---|
| "Trong bối cảnh", "Trong thời đại (số/4.0)", "Ngày nay," mở bài | mở bằng cảnh đời/nỗi đau thật của người đọc |
| "không chỉ ... mà còn" | tách 2 câu hoặc chọn 1 vế mạnh |
| "đóng vai trò quan trọng/then chốt" | nói thẳng nó LÀM gì |
| "góp phần khẳng định/nâng tầm/thể hiện" (đuôi câu) | cắt đuôi; giữ fact trần |
| "một cách + [tính từ]" | trạng từ thường hoặc bỏ |
| "hành trình", "bức tranh (toàn cảnh)", "làn sóng", "hệ sinh thái" (ẩn dụ rỗng) | danh từ cụ thể |
| "tối ưu hóa trải nghiệm", "giải pháp toàn diện", "chuyển đổi số toàn diện" | việc cụ thể đo được |
| "Hãy cùng (tìm hiểu/khám phá)" | vào thẳng nội dung |
| "Có thể nói,", "Nhìn chung,", "Tóm lại," + kết rỗng | kết ở fact cuối cùng |
| "đáng chú ý", "đặc biệt hơn nữa" lặp >1 lần/trang | xoá, để fact tự nổi |
| Emoji đầu heading/bullet (✨🚀💡✅) trong văn nghiêm túc | chữ trần |
| "—" (gạch dài) | chấm/phẩy/hai chấm/ngoặc |

## D. Chống false-positive — KHÔNG tẩy oan (giữ nguyên tinh thần bản gốc)

Một mình các thứ sau KHÔNG phải bằng chứng AI: ngữ pháp chuẩn đều; văn khô (AI có tell CỤ THỂ,
khô đơn thuần chỉ là khô); từ học thuật (AI lạm dụng một DANH SÁCH từ cụ thể, không phải mọi từ
sang); 1 gạch dài đơn lẻ (nhiều nhà báo dùng); 1 câu cụt nhấn mạnh; "thật lòng" giữa câu; ngoặc
cong (Word/Docs tự cong); claim không nguồn (đa số web không nguồn); văn trong trích dẫn/tên
riêng/ví dụ đang bàn về chính cụm đó — không sửa.
**Luật cụm:** tìm CHÙM tell, không phán theo tell lẻ. 1 gạch dài = không nói lên gì; gạch dài +
bộ ba + "bức tranh toàn cảnh sống động" + mục "Kết luận" = thú nhận.

## E. Dấu văn NGƯỜI — thấy thì NGHIÊNG VỀ GIỮ, đừng sửa quá tay

Chi tiết đặc thù khó bịa (địa chỉ thật, câu quote kỳ cục); cảm xúc lẫn lộn chưa gỡ xong ("tốt
là chính, nhưng vẫn lấn cấn, chưa nói rõ được vì sao"); tham chiếu đúng-thời-đúng-nhóm; lựa chọn
biên tập tác giả bảo vệ được; câu dài ngắn so le thật; aside/tự-sửa-mình trong ngoặc.

## F. Quy trình & 4 chế độ gọi

Vòng chuẩn: **quét pattern → draft sửa → tự vấn 2 câu** ("cái gì còn làm nó lộ AI?" · "bản sửa có
fact nào không có trong nguồn không?" — bịa là lỗi kể cả khi nghe người hơn) **→ bản chốt** (quét
`—`/`–` lần cuối).

| Chế độ | Nhận | Trả |
|---|---|---|
| Text dán | đoạn văn trong chat | draft + bullet còn-lộ-AI + bản chốt |
| Copy request | đề bài viết copy | chuyển `copywriting-mode`, audit chạy ngầm, trả biến thể + lựa chọn |
| File | đường dẫn file | sửa tại chỗ (chỉ prose; không đụng code block/frontmatter/data/link), báo tóm tắt |
| Embedded | bước trong job lớn (PR desc, commit, doc) | chỉ trả bản chốt, không kèm nghi thức |

## G. Vị trí dây chuyền + chống trùng
- Chữ marketing: `copywriting-mode` (draft) → **humanizer** → `copy-craft` (≥8/10) → COPY GATE.
- Docs/README/commit/PR: humanizer chạy embedded, không cần cổng.
- Giao diện/bố cục: KHÔNG phải việc của skill này → `skills/design-humanizer`.
- Bản gốc đầy đủ 33 pattern + ví dụ before/after tiếng Anh: `vendor/ai-copywriter/SKILL.md` (MIT).
