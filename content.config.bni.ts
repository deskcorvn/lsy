import { ContentConfigSchema, type ContentConfig } from "@/content/schema";

/**
 * FIXTURE nội dung landing BNI (chapter intro). Còn «CẦN ĐIỀN: ...» cho dữ kiện riêng chapter.
 * Dùng cho CM2 (dựng landing BNI). Khi giao khách: copy file này -> content.config.ts,
 * điền hết «CẦN ĐIỀN» (preflight no_placeholder sẽ chặn nếu còn sót) + cập nhật client.config.ts.
 */
const raw = {
  page: {
    title: "Chapter BNI — Kết nối kinh doanh, cùng nhau lớn mạnh",
    description:
      "Cộng đồng doanh nhân BNI gặp nhau mỗi tuần để trao cơ hội kinh doanh thật trên tinh thần Givers Gain. Mỗi ngành nghề chỉ một đại diện.",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      heading:
        "Nơi những doanh nhân nghiêm túc gặp nhau mỗi tuần để cùng nhau lớn mạnh",
      subheading:
        "Chapter «CẦN ĐIỀN: Tên Chapter» là một mắt xích của BNI — tổ chức Marketing Truyền miệng & Kết nối Kinh doanh lớn nhất thế giới. Tại đây, mỗi thành viên không đi một mình: chúng tôi trao cho nhau cơ hội kinh doanh thật, khách hàng thật và sự tín nhiệm thật — trên tinh thần 'Givers Gain — Cho đi sẽ nhận lại'.",
      highlights: [
        "Givers Gain",
        "Độc quyền 1 ngành/1 ghế",
        "Họp tuần có cấu trúc",
      ],
      primaryCta: { label: "Đăng ký tham dự buổi họp khách mời", href: "#lien-he" },
      secondaryCta: { label: "Tìm hiểu về chapter", href: "#gioi-thieu" },
    },
    {
      id: "gia-tri",
      type: "valueHighlights",
      heading: "Vì sao gia nhập chapter của chúng tôi",
      columns: 3,
      items: [
        {
          icon: "handshake",
          title: "Givers Gain — Cho đi sẽ nhận lại",
          description:
            "Triết lý cốt lõi của BNI. Khi bạn chủ động giúp đối tác tìm được khách hàng, họ sẽ làm điều tương tự cho bạn. Đây không phải khẩu hiệu — đây là cách vận hành tạo ra dòng cơ hội kinh doanh bền vững.",
        },
        {
          icon: "shield",
          title: "Độc quyền 1 ghế cho mỗi ngành nghề",
          description:
            "Mỗi chapter chỉ cho phép duy nhất một đại diện ở mỗi lĩnh vực. Bạn không cạnh tranh trực tiếp với ai trong phòng — bạn trở thành lựa chọn đầu tiên khi các thành viên cần dùng dịch vụ của ngành bạn.",
        },
        {
          icon: "trending-up",
          title: "Cơ hội kinh doanh được trao tận tay",
          description:
            "Không dừng lại ở danh thiếp. Thành viên giới thiệu cho nhau những khách hàng cụ thể, có nhu cầu thật — biến mối quan hệ thành hợp đồng, biến mỗi buổi họp thành doanh thu.",
        },
        {
          icon: "calendar-clock",
          title: "Họp tuần có cấu trúc rõ ràng",
          description:
            "Mỗi tuần một buổi, đúng giờ, đúng quy trình được chuẩn hóa toàn cầu. Bạn biết trước mình sẽ nhận được gì: thuyết trình ngành nghề, trao cơ hội và cập nhật tiến độ hợp tác — không lan man, không lãng phí thời gian.",
        },
        {
          icon: "globe",
          title: "Mạng lưới vươn xa toàn cầu",
          description:
            "Tham gia một chapter, bạn kết nối với hàng triệu doanh nhân BNI trên khắp thế giới. Cơ hội không giới hạn trong một căn phòng — nó lan tỏa qua từng giới thiệu, từng mối quan hệ tin cậy.",
        },
        {
          icon: "award",
          title: "Phát triển bản thân & năng lực lãnh đạo",
          description:
            "BNI không chỉ giúp bạn bán hàng. Kỹ năng thuyết trình, xây dựng quan hệ, làm việc nhóm và dẫn dắt — tất cả được rèn luyện mỗi tuần, giúp bạn trưởng thành cả trong kinh doanh lẫn vai trò lãnh đạo.",
        },
      ],
    },
    {
      id: "gioi-thieu",
      type: "about",
      heading: "Về Chapter «CẦN ĐIỀN: Tên Chapter»",
      body: [
        "Chúng tôi là một cộng đồng doanh nhân thuộc BNI (Business Network International) — tổ chức tiên phong và dẫn đầu thế giới về marketing truyền miệng có hệ thống. Tại chapter «CẦN ĐIỀN: Tên Chapter», mỗi thành viên đều là đại diện duy nhất cho ngành nghề của mình, cùng cam kết một điều: giúp nhau thành công.",
        "Khác với những sự kiện kết nối thông thường — nơi bạn trao danh thiếp rồi quên lãng — chapter của chúng tôi vận hành theo một quy trình chặt chẽ, đo lường được và lặp lại mỗi tuần. Chúng tôi không tìm 'mối quan hệ xã giao'; chúng tôi xây dựng những đối tác chiến lược thực sự tin tưởng nhau, hiểu rõ công việc của nhau, và sẵn sàng giới thiệu khách hàng cho nhau bằng cả uy tín cá nhân.",
        "Ở đây, mạng lưới của một người trở thành tài sản của cả chapter. Mỗi khi bạn cần một nhà cung cấp đáng tin, một đối tác uy tín hay một khách hàng tiềm năng — bạn không tìm một mình, mà có cả một đội ngũ cùng tìm giúp bạn. Đó là sức mạnh của BNI: biến quan hệ thành cơ hội, biến cơ hội thành kết quả kinh doanh thực tế.",
      ],
    },
    {
      id: "ban-dieu-hanh",
      type: "leadership",
      heading: "Ban điều hành chapter",
      columns: 4,
      people: [
        {
          role: "Chủ tịch Chapter (President)",
          name: "«CẦN ĐIỀN: Họ tên Chủ tịch»",
          bio: "Điều hành chung, định hướng tầm nhìn và đảm bảo chapter vận hành đúng chuẩn BNI.",
        },
        {
          role: "Phó Chủ tịch (Vice President)",
          name: "«CẦN ĐIỀN: Họ tên Phó Chủ tịch»",
          bio: "Phụ trách phát triển thành viên và chất lượng các buổi họp hàng tuần.",
        },
        {
          role: "Giám đốc Cố vấn (Membership Committee)",
          name: "«CẦN ĐIỀN: Họ tên Giám đốc Cố vấn»",
          bio: "Hỗ trợ, đồng hành và cố vấn cho thành viên mới để hòa nhập và tạo giá trị sớm.",
        },
        {
          role: "Thư ký - Thủ quỹ (Secretary / Treasurer)",
          name: "«CẦN ĐIỀN: Họ tên Thư ký - Thủ quỹ»",
          bio: "Quản lý số liệu, theo dõi chỉ số trao cơ hội và minh bạch tài chính của chapter.",
        },
      ],
    },
    {
      id: "su-kien",
      type: "events",
      heading: "Sự kiện",
      items: [
        {
          title: "Buổi họp kết nối hàng tuần",
          scheduleText:
            "«CẦN ĐIỀN: Thứ và khung giờ họp hàng tuần, ví dụ Thứ Tư hàng tuần, 06:00 - 08:30»",
          locationName:
            "«CẦN ĐIỀN: Tên địa điểm và địa chỉ đầy đủ nơi tổ chức họp»",
          description:
            "Trái tim của chapter. Mỗi tuần, các thành viên gặp nhau theo một chương trình chuẩn hóa: giới thiệu bản thân, thuyết trình ngành nghề trong 60 giây, trao cơ hội kinh doanh và cập nhật kết quả hợp tác. Khách mời được chào đón để trải nghiệm trực tiếp cách BNI vận hành — hoàn toàn miễn phí cho lần đầu tham dự.",
        },
      ],
    },
    {
      id: "faq",
      type: "faq",
      heading: "Câu hỏi thường gặp",
      items: [
        {
          question: "BNI là gì và chapter hoạt động như thế nào?",
          answer:
            "BNI (Business Network International) là tổ chức marketing truyền miệng và kết nối kinh doanh lớn nhất thế giới, hoạt động tại hơn 70 quốc gia. Một 'chapter' là một nhóm doanh nhân địa phương gặp nhau mỗi tuần theo quy trình chuẩn, với mục tiêu trao đổi cơ hội kinh doanh và giới thiệu khách hàng cho nhau dựa trên sự tin tưởng.",
        },
        {
          question: "Tại sao mỗi ngành nghề chỉ có một người trong chapter?",
          answer:
            "Đây là nguyên tắc độc quyền ngành nghề của BNI. Khi bạn gia nhập, bạn trở thành đại diện duy nhất cho lĩnh vực của mình trong chapter. Điều này loại bỏ cạnh tranh trực tiếp và đảm bảo mọi cơ hội kinh doanh thuộc ngành bạn sẽ được giới thiệu cho bạn đầu tiên.",
        },
        {
          question: "'Givers Gain' nghĩa là gì?",
          answer:
            "'Givers Gain — Cho đi sẽ nhận lại' là triết lý nền tảng của BNI. Ý nghĩa rất đơn giản: nếu bạn giúp đối tác của mình có được khách hàng, họ sẽ có động lực và mong muốn giúp lại bạn. Kết quả kinh doanh đến từ việc chủ động cho đi giá trị trước, chứ không phải chờ đợi người khác trao cho bạn.",
        },
        {
          question: "Tôi cần chuẩn bị gì khi đến tham dự buổi họp đầu tiên?",
          answer:
            "Bạn chỉ cần mang theo danh thiếp và một tinh thần cởi mở. Lần đầu tham dự với tư cách khách mời thường là miễn phí. Bạn sẽ được giới thiệu, lắng nghe các thành viên thuyết trình ngành nghề và tự mình cảm nhận giá trị mà chapter mang lại trước khi quyết định bất kỳ điều gì.",
        },
        {
          question: "Làm thế nào để trở thành thành viên chính thức?",
          answer:
            "Sau khi tham dự và thấy phù hợp, bạn nộp đơn ứng tuyển cho vị trí ngành nghề của mình (nếu vị trí đó còn trống). Ban điều hành chapter sẽ xét duyệt để đảm bảo chất lượng và sự phù hợp. Khi được chấp thuận, bạn trở thành đại diện độc quyền cho ngành của mình trong chapter.",
        },
        {
          question: "Tham gia BNI mất bao nhiêu thời gian mỗi tuần?",
          answer:
            "Cam kết cốt lõi là tham dự đầy đủ buổi họp hàng tuần (thường khoảng 2 - 3 giờ). Ngoài ra, bạn nên dành thời gian gặp gỡ 1-1 với các thành viên khác để hiểu sâu công việc của nhau. Đây là khoản đầu tư thời gian, và giá trị bạn nhận lại phụ thuộc trực tiếp vào mức độ bạn chủ động tham gia.",
        },
      ],
    },
    {
      id: "cta",
      type: "cta",
      heading: "Sẵn sàng mở rộng mạng lưới và tăng trưởng doanh thu?",
      body: "Vị trí đại diện cho ngành của bạn trong chapter có thể chỉ còn trống hôm nay. Đăng ký tham dự một buổi họp hàng tuần — miễn phí cho khách mời — để tận mắt trải nghiệm cách một cộng đồng doanh nhân nghiêm túc giúp nhau thành công.",
      primaryCta: { label: "Đăng ký làm khách mời ngay", href: "#lien-he" },
    },
    {
      id: "lien-he",
      type: "contactForm",
      heading: "Liên hệ",
      note: "Liên hệ ban điều hành chapter để được xếp lịch tham dự buổi họp gần nhất. Chúng tôi sẽ đón tiếp bạn với tư cách khách mời và hướng dẫn bạn trong suốt buổi họp đầu tiên.",
    },
  ],
};

export const bniContent: ContentConfig = ContentConfigSchema.parse(raw);
