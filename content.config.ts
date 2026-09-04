import { ContentConfigSchema, type ContentConfig } from "@/content/schema";

/**
 * NGUỒN-SỰ-THẬT #2: nội dung landing LSY. Copy chỉ dùng dữ kiện đã truy nguồn
 * trong .agents/product-marketing.md và các CODEX handoff ở root repo.
 */
const raw = {
  page: {
    title: "Máy lọc nước LSY | Thông tin sản phẩm và hỗ trợ",
    description:
      "Tìm hiểu máy lọc nước LSY, cách chọn theo nhu cầu gia đình và kênh liên hệ hỗ trợ trước, sau khi lắp.",
    datePublished: "2026-08-12",
    dateModified: "2026-08-12",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      heading: "Máy lọc nước LSY",
      subheading:
        "Dành cho gia đình muốn trao đổi rõ nhu cầu, phương án máy và cách lắp trước khi quyết định.",
      highlights: [
        "Máy lọc nước gia đình",
        "Theo nhu cầu sử dụng",
        "Hỗ trợ trực tiếp",
        "Theo dõi thiết bị",
      ],
      primaryCta: { label: "Nhận tư vấn máy phù hợp", href: "#lien-he" },
      secondaryCta: { label: "Xem cách LSY hỗ trợ", href: "#san-pham" },
      backgroundImage: "/hero-lsy.png",
    },
    {
      id: "san-pham",
      type: "valueHighlights",
      eyebrow: "Trước khi chọn máy",
      heading: "Bắt đầu từ bốn thông tin của gia đình bạn",
      columns: 4,
      items: [
        {
          icon: "droplet",
          title: "Nguồn nước đang dùng",
          description:
            "Cho LSY biết nguồn nước gia đình bạn đang sử dụng để cuộc trao đổi bắt đầu từ đúng nhu cầu.",
        },
        {
          icon: "users",
          title: "Số người sử dụng",
          description:
            "Số người dùng giúp LSY hiểu nhịp sử dụng hằng ngày trước khi trao đổi mẫu máy.",
        },
        {
          icon: "map-pin",
          title: "Vị trí đặt máy",
          description:
            "Nói rõ chỗ dự kiến lắp để cùng xem cách bố trí và phương án lắp phù hợp với không gian.",
        },
        {
          icon: "thermometer",
          title: "Nhu cầu nước nóng hoặc lạnh",
          description:
            "Đây là một trong những thông tin LSY cần biết để tư vấn sát hơn với cách gia đình bạn dùng nước.",
        },
      ],
    },
    {
      id: "gioi-thieu",
      type: "about",
      heading: "LSY kết nối thiết bị với dịch vụ sau lắp",
      body: [
        "LSY là thương hiệu máy lọc nước của CÔNG TY TNHH LSY, hoạt động từ năm 2020. Doanh nghiệp có trụ sở đăng ký tại thôn An Điềm, xã Cẩm Giang, thành phố Hải Phòng.",
        "Song song với thiết bị, LSY phát triển nền tảng quản lý để người dùng theo dõi trạng thái máy, nhận cảnh báo và gửi yêu cầu hỗ trợ từ cùng một hệ thống.",
        "Mỗi gia đình bắt đầu từ một điều kiện khác nhau. LSY ưu tiên nghe thông tin sử dụng trước, sau đó mới trao đổi mẫu máy, vị trí lắp và đầu mối hỗ trợ để bạn dễ quyết định hơn.",
      ],
      media: "/hero-lsy.png",
      mediaAlt: "Máy lọc nước LSY trong không gian gia đình",
    },
    {
      id: "iot",
      type: "valueHighlights",
      eyebrow: "Lớp IoT sau khi lắp",
      heading: "Sau khi lắp, thông tin của máy vẫn có đường về LSY",
      columns: 3,
      items: [
        {
          icon: "wifi",
          title: "Máy gửi dữ liệu về hệ thống",
          description:
            "Khi đã kết nối, thiết bị gửi trạng thái và dữ liệu vận hành về nền tảng LSY. Đội ngũ có thêm cơ sở để trao đổi khi cần kiểm tra, thay vì chỉ dựa vào mô tả qua điện thoại.",
        },
        {
          icon: "bell",
          title: "Có việc cần để ý, hệ thống ghi nhận",
          description:
            "Nền tảng có thể tạo cảnh báo khi máy mất kết nối, khi chỉ số vượt ngưỡng đã cấu hình hoặc khi thiết bị báo cần thay lõi.",
        },
        {
          icon: "history",
          title: "Mỗi lần chăm sóc đều có dấu vết",
          description:
            "Các lần thay lõi, bảo trì, kiểm tra và sửa chữa được lưu thành lịch sử chăm sóc để lần hỗ trợ sau không phải bắt đầu lại từ đầu.",
        },
      ],
    },
    {
      id: "cau-hoi",
      type: "faq",
      heading: "Điều gia đình thường hỏi trước khi chọn máy",
      items: [
        {
          question: "LSY tư vấn máy lọc nước theo thông tin nào?",
          answer:
            "LSY cần biết nguồn nước đang dùng, số người trong gia đình, vị trí dự kiến đặt máy và nhu cầu nước nóng hoặc lạnh. Bạn có thể ghi các thông tin này trong biểu mẫu để được trao đổi đúng trọng tâm.",
        },
        {
          question: "Tôi có được biết phương án trước khi quyết định không?",
          answer:
            "Có. LSY trao đổi mẫu máy, vị trí lắp và kênh hỗ trợ dự kiến trước khi bạn quyết định. Chi phí phụ thuộc vào mẫu máy và điều kiện lắp đặt thực tế nên website không tự đưa ra một mức giá chung.",
        },
        {
          question: "Nền tảng LSY hỗ trợ theo dõi những gì?",
          answer:
            "Hệ thống LSY được xây dựng để quản lý trạng thái thiết bị, dữ liệu vận hành, cảnh báo và yêu cầu chăm sóc. Khả năng hiển thị cụ thể phụ thuộc vào model máy và cấu hình được bàn giao.",
        },
        {
          question: "Tôi cần chuẩn bị gì trước khi trao đổi với LSY?",
          answer:
            "Bạn chỉ cần ghi lại nguồn nước đang dùng, số người sử dụng, vị trí muốn đặt máy và nhu cầu nước nóng hoặc lạnh. Nếu đang gặp vấn đề với thiết bị, hãy mô tả thêm tình trạng để LSY tiếp nhận đúng việc cần hỗ trợ.",
        },
        {
          question: "Thiết bị IoT của LSY giúp ích gì sau khi lắp?",
          answer:
            "Khi kết nối, thiết bị gửi trạng thái và dữ liệu vận hành về nền tảng LSY. Hệ thống có thể ghi nhận cảnh báo, hỗ trợ làm mới dữ liệu khi cần và lưu lịch sử thay lõi, bảo trì, kiểm tra hoặc sửa chữa để việc chăm sóc rõ ràng hơn.",
        },
        {
          question: "Nếu máy mất kết nối thì LSY có biết không?",
          answer:
            "Nền tảng theo dõi thời điểm thiết bị gửi dữ liệu gần nhất. Nếu quá thời gian cấu hình mà không nhận dữ liệu, hệ thống có thể ghi nhận trạng thái ngoại tuyến và tạo cảnh báo để kiểm tra nguồn điện, Wi-Fi hoặc đường truyền.",
        },
        {
          question: "Tôi có cần xem các chỉ số kỹ thuật mỗi ngày không?",
          answer:
            "Không nhất thiết. LSY ưu tiên những thông tin dễ hành động như máy đang trực tuyến hay mất kết nối, cảnh báo thay lõi và lịch sử chăm sóc. Các chỉ số kỹ thuật chi tiết nằm ở kênh quản lý dành cho người có quyền truy cập.",
        },
        {
          question: "Có thể chia sẻ một thiết bị cho người nhà không?",
          answer:
            "Có. Nền tảng hỗ trợ chia sẻ quyền xem thiết bị cho người khác trong gia đình. Chủ thiết bị có thể quản lý những ai được xem, còn quyền điều khiển và các thao tác quản trị vẫn phụ thuộc vào vai trò được cấp.",
        },
        {
          question: "Sau khi lắp, tôi gửi yêu cầu hỗ trợ cho LSY ở đâu?",
          answer:
            "Bạn có thể gọi 0966 817 188 hoặc gửi thông tin qua biểu mẫu liên hệ trên website. Nền tảng LSY cũng được xây dựng để tiếp nhận yêu cầu chăm sóc và giúp theo dõi trạng thái thiết bị.",
        },
        {
          question: "Tôi liên hệ LSY bằng cách nào?",
          answer:
            "Bạn có thể gọi 0966 817 188 hoặc để lại họ tên, số điện thoại và nhu cầu trong biểu mẫu. LSY sẽ dùng thông tin đó để liên hệ lại và trao đổi phương án phù hợp.",
        },
      ],
    },
    {
      id: "cta",
      type: "cta",
      heading: "Chọn máy sau khi đã rõ nhu cầu",
      body: "Gửi thông tin nguồn nước và số người sử dụng. LSY sẽ liên hệ để trao đổi mẫu máy và phương án lắp đặt.",
      primaryCta: { label: "Gửi nhu cầu cho LSY", href: "#lien-he" },
      secondaryCta: { label: "Gọi 0966 817 188", href: "tel:0966817188" },
    },
    {
      id: "thong-tin-lien-he",
      type: "contact",
      heading: "Thông tin liên hệ LSY",
      note: "Gọi trực tiếp nếu bạn cần trao đổi nhanh về máy, vị trí lắp hoặc hỗ trợ thiết bị.",
    },
    {
      id: "lien-he",
      type: "contactForm",
      heading: "Để LSY liên hệ lại",
      note: "Cho LSY biết nguồn nước, số người sử dụng, vị trí đặt máy hoặc vấn đề bạn đang gặp.",
      submitLabel: "Gửi nhu cầu",
      successMessage:
        "LSY đã nhận thông tin. Đội ngũ sẽ liên hệ theo số điện thoại hoặc email bạn đã để lại.",
      fields: [
        { name: "name", label: "Họ và tên *", required: true, type: "text" },
        { name: "phone", label: "Số điện thoại *", required: true, type: "tel" },
        { name: "email", label: "Email", required: false, type: "email" },
      ],
      messageLabel: "Nguồn nước, số người dùng hoặc nhu cầu cần hỗ trợ *",
      errorMessage: "Chưa gửi được thông tin. Vui lòng thử lại hoặc gọi 0966 817 188.",
      errorRateLimited: "Bạn đã gửi nhiều lần. Vui lòng chờ ít phút rồi thử lại.",
    },
  ],
  // Trang pháp lý bắt buộc cho hồ sơ duyệt Mini App Zalo (Bước 2: Điều khoản sử
  // dụng). ĐỒNG BỘ TAY với `zalo-mini-app/src/features/legal/terms-content.ts`
  // (bản đọc trong app) và `DIEU-KHOAN-SU-DUNG.md` (bản nộp) — sửa một nơi thì
  // sửa cả ba, và đổi dateModified bên dưới.
  pages: [
    {
      slug: "dieu-khoan",
      title: "Điều khoản sử dụng & Chính sách quyền riêng tư",
      description:
        "Điều khoản sử dụng và chính sách quyền riêng tư của Mini App LSY: các quyền truy cập, dữ liệu cá nhân thu thập, mục đích xử lý và cách yêu cầu xoá dữ liệu.",
      datePublished: "2026-09-01",
      dateModified: "2026-09-04",
      sections: [
        {
          id: "dk-hero",
          type: "hero",
          heading: "Điều khoản sử dụng & Chính sách quyền riêng tư",
          subheading:
            "Áp dụng cho Mini App LSY trên nền tảng Zalo. Có hiệu lực từ ngày 01/09/2026.",
          highlights: [
            "Tuân thủ Nghị định 13/2023/NĐ-CP",
            "Nêu rõ từng quyền truy cập và lý do cần",
            "Xoá dữ liệu ngay khi Bạn yêu cầu",
          ],
          primaryCta: { label: "Liên hệ LSY", href: "tel:0981144220" },
        },
        {
          id: "dk-1",
          type: "about",
          heading: "1. Đơn vị vận hành",
          body: [
            "Đơn vị vận hành Mini App và hệ thống LSY: CÔNG TY TNHH LSY.",
            "Mã số doanh nghiệp: 0801321580.",
            "Địa chỉ trụ sở: Đội 7, Thôn Đỗ Hạ, Xã Nguyễn Lương Bằng, Thành phố Hải Phòng, Việt Nam.",
            "Hotline: 0981 144 220 (hoặc 0928 877 468). Email: info@lsy.vn. Zalo Official Account: LSY.",
            "Trong văn bản này, đơn vị vận hành được gọi là “Chúng tôi”; người sử dụng Mini App được gọi là “Bạn”.",
          ],
        },
        {
          id: "dk-2",
          type: "about",
          heading: "2. Chấp nhận điều khoản",
          body: [
            "Khi mở và sử dụng Mini App LSY trên nền tảng Zalo, Bạn xác nhận đã đọc, hiểu và đồng ý với toàn bộ nội dung của văn bản này. Nếu không đồng ý, vui lòng ngừng sử dụng Mini App.",
            "Văn bản này đồng thời là Chính sách quyền riêng tư, được xây dựng theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.",
          ],
        },
        {
          id: "dk-3",
          type: "about",
          heading: "3. Mô tả dịch vụ",
          body: [
            "Mini App LSY giúp khách hàng theo dõi và chăm sóc máy lọc nước LSY đã lắp đặt tại gia đình hoặc nơi làm việc:",
            "• Nhận máy về tài khoản Zalo bằng cách quét mã QR trên thân máy hoặc mở liên kết do kỹ thuật viên cung cấp.",
            "• Xem chỉ số hoạt động của máy: chất lượng nước TDS, lưu lượng, trạng thái lõi lọc.",
            "• Nhận cảnh báo khi máy vượt ngưỡng an toàn hoặc đến hạn thay lõi.",
            "• Gửi yêu cầu bảo hành, bảo trì, hỗ trợ kỹ thuật và theo dõi tiến độ xử lý.",
            "• Xem lịch sử chăm sóc máy: ngày xử lý, nội dung đã làm, vật tư và dịch vụ đã dùng kèm chi phí.",
            "• Chia sẻ quyền xem máy cho người thân trong gia đình.",
            "• Tra cứu danh mục sản phẩm, dịch vụ và bảng giá.",
            "Mini App không bán hàng trực tuyến, không thu tiền và không xử lý thanh toán.",
          ],
        },
        {
          id: "dk-4",
          type: "about",
          heading: "4. Tài khoản và đăng nhập",
          body: [
            "Mini App sử dụng chính tài khoản Zalo của Bạn để đăng nhập. Chúng tôi không tạo mật khẩu riêng và không lưu mật khẩu Zalo của Bạn.",
            "Bạn có trách nhiệm bảo quản thiết bị và tài khoản Zalo của mình. Mọi thao tác thực hiện qua tài khoản Zalo của Bạn trên Mini App được xem là do Bạn thực hiện.",
          ],
        },
        {
          id: "dk-5-1",
          type: "about",
          heading: "5.1. Số điện thoại Zalo (bắt buộc)",
          body: [
            "Xin khi nào: ngay lần đầu Bạn mở Mini App, tại màn hình đăng nhập.",
            "Cách lấy: Mini App nhận một mã tạm thời từ Zalo, gửi về máy chủ của Chúng tôi; máy chủ đổi mã đó lấy số điện thoại trực tiếp từ Zalo. Mã chỉ dùng được một lần.",
            "Dùng để: định danh tài khoản; liên hệ khi xử lý bảo hành, bảo trì; xác định máy nào đã được chia sẻ quyền xem cho Bạn, vì việc chia sẻ thực hiện theo số điện thoại.",
            "Nếu Bạn từ chối: Mini App không xác định được Bạn là ai nên không hiển thị được máy của Bạn. Đây là quyền bắt buộc để dùng dịch vụ.",
          ],
        },
        {
          id: "dk-5-2",
          type: "about",
          heading: "5.2. Thông tin cơ bản tài khoản Zalo (bắt buộc)",
          body: [
            "Gồm: mã người dùng Zalo, tên hiển thị và ảnh đại diện. Xin cùng lúc với bước đăng nhập.",
            "Dùng để: hiển thị tên và ảnh của Bạn trong Mini App; giúp nhân viên kỹ thuật nhận đúng khách hàng; liên kết tài khoản Zalo với hồ sơ khách hàng trong hệ thống.",
            "Chúng tôi không truy cập danh bạ, tin nhắn, danh sách bạn bè hay bất kỳ nội dung riêng tư nào khác trong tài khoản Zalo của Bạn.",
          ],
        },
        {
          id: "dk-5-3",
          type: "about",
          heading: "5.3. Vị trí (tuỳ chọn)",
          body: [
            "Xin khi nào: chỉ tại thời điểm Bạn bấm gửi một yêu cầu hỗ trợ kỹ thuật. Mini App không theo dõi vị trí ở chế độ nền và không xin quyền này khi Bạn chỉ xem thông tin máy.",
            "Dùng để: giúp kỹ thuật viên xác định nơi đặt máy để đến đúng địa chỉ. Toạ độ được lưu kèm yêu cầu hỗ trợ đó.",
            "Nếu Bạn từ chối: yêu cầu hỗ trợ vẫn gửi được bình thường; Bạn nhập địa chỉ bằng tay để kỹ thuật viên liên hệ.",
          ],
        },
        {
          id: "dk-5-4",
          type: "about",
          heading: "5.4. Máy ảnh (tuỳ chọn)",
          body: [
            "Xin khi nào: khi Bạn bấm chức năng quét mã QR để nhận máy về tài khoản.",
            "Dùng để: đọc nội dung mã QR dán trên thân máy. Mini App không chụp, không lưu và không gửi đi bất kỳ hình ảnh nào từ máy ảnh; chỉ nội dung văn bản trong mã QR được sử dụng.",
            "Nếu Bạn từ chối: Bạn vẫn nhận máy được bằng cách mở liên kết do kỹ thuật viên gửi.",
          ],
        },
        {
          id: "dk-5-5",
          type: "about",
          heading: "5.5. Dữ liệu khác",
          body: [
            "• Ảnh Bạn chủ động đính kèm khi mô tả sự cố: lưu cùng yêu cầu hỗ trợ, chỉ Bạn và nhân viên xử lý yêu cầu đó xem được.",
            "• Địa chỉ email (tuỳ chọn): Bạn tự nhập trong mục Cá nhân để nhận cảnh báo; tắt hoặc xoá được bất cứ lúc nào tại chính màn hình đó.",
            "• Dữ liệu hoạt động của máy: mã máy, số sê-ri, phiên bản phần mềm, chỉ số cảm biến, trạng thái vận hành và lịch sử bảo trì.",
            "• Dữ liệu lưu trên máy Bạn: phiên đăng nhập lưu trong bộ nhớ cục bộ của Zalo để khỏi đăng nhập lại; bị xoá khi Bạn đăng xuất hoặc gỡ Mini App.",
          ],
        },
        {
          id: "dk-6",
          type: "about",
          heading: "6. Mục đích xử lý dữ liệu",
          body: [
            "Chúng tôi xử lý dữ liệu nêu trên chỉ nhằm: cung cấp các chức năng của Mini App; tiếp nhận và xử lý yêu cầu bảo hành, bảo trì, hỗ trợ kỹ thuật; gửi cảnh báo tình trạng máy và nhắc lịch bảo dưỡng; chăm sóc khách hàng và giải quyết khiếu nại; bảo đảm an toàn hệ thống, phòng chống gian lận; thực hiện nghĩa vụ theo yêu cầu hợp lệ của cơ quan nhà nước có thẩm quyền.",
            "Chúng tôi không sử dụng dữ liệu của Bạn cho mục đích quảng cáo của bên thứ ba và không bán, trao đổi dữ liệu cá nhân của Bạn.",
          ],
        },
        {
          id: "dk-7",
          type: "about",
          heading: "7. Bên thứ ba tiếp nhận dữ liệu",
          body: [
            "• Nền tảng Zalo Mini App: dữ liệu phát sinh khi Bạn dùng Mini App trên hạ tầng Zalo, theo điều khoản của Zalo.",
            "• Nhân viên kỹ thuật, đại lý được Chúng tôi uỷ quyền: tên, số điện thoại, địa chỉ hoặc vị trí, nội dung yêu cầu hỗ trợ — để đến tận nơi xử lý.",
            "• Đơn vị cung cấp hạ tầng máy chủ: dữ liệu được lưu trữ trên máy chủ.",
            "Các bên trên chỉ được tiếp cận phần dữ liệu cần thiết cho công việc của họ và có nghĩa vụ bảo mật.",
          ],
        },
        {
          id: "dk-8",
          type: "about",
          heading: "8. Thời gian lưu trữ",
          body: [
            "• Dữ liệu tài khoản và lịch sử chăm sóc máy: lưu trong suốt thời gian Bạn còn sử dụng dịch vụ, phục vụ bảo hành và tra cứu lịch sử bảo trì của máy.",
            "• Khi Bạn yêu cầu xoá tài khoản: Chúng tôi xoá ngay lập tức số điện thoại, email, tên, ảnh đại diện, liên kết tài khoản Zalo, cùng số điện thoại, địa chỉ và toạ độ đã lưu trong các yêu cầu hỗ trợ; mọi phiên đăng nhập bị thu hồi. Lịch sử bảo trì của máy được giữ ở dạng ẩn danh để phục vụ bảo hành theo quy định pháp luật.",
            "• Nhật ký hệ thống phục vụ an ninh: lưu tối đa 12 tháng.",
          ],
        },
        {
          id: "dk-9",
          type: "about",
          heading: "9. Quyền của Bạn và cách thực hiện",
          body: [
            "Theo Nghị định 13/2023/NĐ-CP, Bạn có quyền được biết, đồng ý hoặc không đồng ý, truy cập, chỉnh sửa, rút lại sự đồng ý, xoá dữ liệu, hạn chế và phản đối xử lý dữ liệu, yêu cầu bồi thường thiệt hại, khiếu nại và tố cáo.",
            "• Xem lại thông tin tài khoản: mục Cá nhân trong Mini App.",
            "• Tắt nhận cảnh báo qua email: mục Cá nhân, phần Email nhận cảnh báo.",
            "• Thu hồi quyền xem máy đã chia sẻ: màn hình chi tiết máy, phần Chia sẻ.",
            "• Rút lại quyền số điện thoại hoặc vị trí: Zalo, Cài đặt, Quản lý Mini App, chọn LSY.",
            "• Xoá tài khoản và dữ liệu: mục Cá nhân, nút Xoá tài khoản; hoặc gọi hotline 0981 144 220; hoặc gửi email info@lsy.vn.",
            "Chúng tôi phản hồi mọi yêu cầu liên quan đến dữ liệu cá nhân trong vòng 72 giờ làm việc.",
          ],
        },
        {
          id: "dk-10",
          type: "about",
          heading: "10. Bảo mật dữ liệu",
          body: [
            "Chúng tôi truyền dữ liệu qua kết nối mã hoá HTTPS, mã hoá thông tin xác thực của thiết bị khi lưu trữ, phân quyền truy cập theo vai trò và ghi nhật ký các thao tác quan trọng trên hệ thống.",
            "Không có hệ thống nào an toàn tuyệt đối. Nếu xảy ra sự cố lộ lọt dữ liệu cá nhân, Chúng tôi sẽ thông báo cho Bạn và cơ quan có thẩm quyền theo đúng quy định pháp luật.",
          ],
        },
        {
          id: "dk-11",
          type: "about",
          heading: "11. Dữ liệu của người dưới 16 tuổi",
          body: [
            "Mini App dành cho người từ đủ 16 tuổi trở lên. Chúng tôi không chủ động thu thập dữ liệu của trẻ em dưới 16 tuổi và sẽ xoá ngay khi nhận được thông báo về việc đã thu thập mà không có sự đồng ý của cha, mẹ hoặc người giám hộ.",
          ],
        },
        {
          id: "dk-12",
          type: "about",
          heading: "12. Trách nhiệm của Người dùng",
          body: [
            "Khi sử dụng Mini App, Bạn không được:",
            "• Cung cấp thông tin sai sự thật hoặc mạo danh người khác.",
            "• Nhận về tài khoản của mình máy lọc nước không thuộc quyền sở hữu hoặc sử dụng hợp pháp của mình.",
            "• Can thiệp, dò quét, gây quá tải hoặc tìm cách truy cập trái phép vào hệ thống.",
            "• Sử dụng Mini App vào mục đích vi phạm pháp luật Việt Nam.",
            "Chúng tôi có quyền tạm khoá hoặc chấm dứt tài khoản vi phạm, đồng thời bảo lưu quyền yêu cầu bồi thường thiệt hại.",
          ],
        },
        {
          id: "dk-13",
          type: "about",
          heading: "13. Quyền sở hữu trí tuệ",
          body: [
            "Toàn bộ nội dung, giao diện, hình ảnh, nhãn hiệu và phần mềm của Mini App thuộc quyền sở hữu của Chúng tôi hoặc bên cấp phép hợp pháp. Bạn không được sao chép, phân phối hoặc tạo sản phẩm phái sinh khi chưa có văn bản đồng ý.",
          ],
        },
        {
          id: "dk-14",
          type: "about",
          heading: "14. Giới hạn trách nhiệm",
          body: [
            "Chỉ số hiển thị trên Mini App được lấy từ cảm biến của máy lọc nước, mang tính tham khảo cho việc theo dõi và nhắc bảo dưỡng; không thay thế kết quả kiểm nghiệm nước của đơn vị kiểm định có thẩm quyền.",
            "Chúng tôi không chịu trách nhiệm với các gián đoạn ngoài khả năng kiểm soát: sự cố đường truyền Internet của Bạn, sự cố nền tảng Zalo, mất điện, thiên tai hoặc các trường hợp bất khả kháng khác.",
          ],
        },
        {
          id: "dk-15",
          type: "about",
          heading: "15. Thay đổi điều khoản",
          body: [
            "Chúng tôi có thể cập nhật văn bản này khi bổ sung tính năng hoặc khi quy định pháp luật thay đổi. Bản cập nhật được công bố ngay trong Mini App và trên trang này kèm ngày hiệu lực mới.",
            "Việc Bạn tiếp tục sử dụng sau ngày hiệu lực được xem là chấp nhận nội dung mới. Với thay đổi làm mở rộng phạm vi dữ liệu thu thập, Chúng tôi sẽ xin lại sự đồng ý của Bạn.",
          ],
        },
        {
          id: "dk-16",
          type: "about",
          heading: "16. Luật áp dụng và giải quyết tranh chấp",
          body: [
            "Văn bản này được điều chỉnh bởi pháp luật Việt Nam. Tranh chấp phát sinh được ưu tiên giải quyết thông qua thương lượng; nếu không đạt được thoả thuận, tranh chấp sẽ được đưa ra Toà án có thẩm quyền tại Việt Nam.",
          ],
        },
        {
          id: "dk-17",
          type: "about",
          heading: "17. Liên hệ",
          body: [
            "CÔNG TY TNHH LSY — Mã số doanh nghiệp 0801321580.",
            "Địa chỉ: Đội 7, Thôn Đỗ Hạ, Xã Nguyễn Lương Bằng, Thành phố Hải Phòng, Việt Nam.",
            "Hotline: 0981 144 220 (hoặc 0928 877 468). Email: info@lsy.vn. Zalo Official Account: LSY.",
            "Cảm ơn Bạn đã tin dùng sản phẩm và dịch vụ của chúng tôi.",
          ],
        },
      ],
    },
  ],
};

export const content: ContentConfig = ContentConfigSchema.parse(raw);
