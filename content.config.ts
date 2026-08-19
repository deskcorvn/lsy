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
};

export const content: ContentConfig = ContentConfigSchema.parse(raw);
