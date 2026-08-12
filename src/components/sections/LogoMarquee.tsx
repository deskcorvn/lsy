import type { SectionOf } from "@/content/schema";

// Dải logo đối tác/nền tảng. animated=true: cuộn ngang (CSS, tôn trọng reduced-motion —
// xem globals.css .lm-track); mặc định: hàng tĩnh wrap. Logo dùng <img> thường vì kích
// thước mỗi logo khác nhau (chuẩn hoá bằng chiều cao), alt bắt buộc từ schema.
export default function LogoMarquee({
  section,
}: {
  section: SectionOf<"logoMarquee">;
}) {
  // Marquee cần track nhân đôi để cuộn liền mạch (translateX -50%).
  const items = section.animated ? [...section.items, ...section.items] : section.items;

  const logo = (item: (typeof section.items)[number], key: string) => {
    const img = (
      // eslint-disable-next-line @next/next/no-img-element -- logo nhiều kích thước, chuẩn hoá bằng height
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="h-8 w-auto object-contain opacity-80 transition hover:opacity-100 md:h-10"
      />
    );
    return item.href ? (
      <a
        key={key}
        href={item.href}
        aria-label={item.name}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="shrink-0"
      >
        {img}
      </a>
    ) : (
      <span key={key} className="shrink-0">
        {img}
      </span>
    );
  };

  return (
    <section
      id={section.id}
      className="py-10 md:py-14"
      style={{ background: "var(--p-surface)", color: "var(--p-ink)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {section.heading && (
          <h2
            className="mb-8 text-center text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--p-muted)" }}
          >
            {section.heading}
          </h2>
        )}
        {section.animated ? (
          <div className="overflow-hidden" aria-label={section.heading}>
            <div className="lm-track flex w-max items-center gap-12">
              {items.map((item, i) => logo(item, `${item.name}-${i}`))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {items.map((item, i) => logo(item, `${item.name}-${i}`))}
          </div>
        )}
      </div>
    </section>
  );
}
