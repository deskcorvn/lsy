import { ContentConfigSchema, type ContentConfig } from "@/content/schema";

/**
 * NGUỒN-SỰ-THẬT #2: nội dung landing LSY. Copy chỉ dùng dữ kiện đã truy nguồn
 * trong .agents/product-marketing.md và các CODEX handoff ở root repo.
 */
const raw = {
  page: {
    title: "Máy lọc nước LSY | Thông tin sản phẩm và hỗ trợ",
    description:
      "Thông tin máy lọc nước LSY, quy trình tư vấn và kênh liên hệ hỗ trợ cho gia đình.",
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
      highlights: ["Máy lọc nước gia đình", "Hỗ trợ trực tiếp", "Theo dõi thiết bị"],
      primaryCta: { label: "Nhận tư vấn máy phù hợp", href: "#lien-he" },
      secondaryCta: { label: "Xem cách LSY hỗ trợ", href: "#san-pham" },
      backgroundImage: "/hero-lsy.png",
    },
    {
      id: "san-pham",
      type: "valueHighlights",
      heading: "Rõ nhu cầu, rõ phương án, rõ đầu mối hỗ trợ",
      columns: 3,
      items: [
        {
          icon: "handshake",
          title: "Trao đổi nhu cầu",
          description:
            "LSY tiếp nhận thông tin về nguồn nước, số người dùng và vị trí đặt máy trước khi tư vấn.",
        },
        {
          icon: "shield",
          title: "Xác nhận phương án",
          description:
            "Bạn biết mẫu máy, cách lắp và kênh hỗ trợ trước khi đưa ra quyết định.",
        },
        {
          icon: "globe",
          title: "Theo dõi thiết bị",
          description:
            "Nền tảng LSY hỗ trợ quản lý trạng thái thiết bị và tiếp nhận yêu cầu chăm sóc sau khi lắp.",
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
      note: "Gọi trực tiếp nếu bạn cần trao đổi nhanh về máy hoặc hỗ trợ thiết bị.",
    },
    {
      id: "lien-he",
      type: "contactForm",
      heading: "Để LSY liên hệ lại",
      note: "Cho LSY biết nguồn nước, số người sử dụng hoặc vấn đề bạn đang gặp.",
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
