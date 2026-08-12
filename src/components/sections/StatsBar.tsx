import type { SectionOf } from "@/content/schema";

// Dải số liệu tin cậy. Số là sự kiện, không phải pháo hoa: không counter chạy số,
// không icon trang trí — độ lớn của số tự nói (luật impeccable).
export default function StatsBar({ section }: { section: SectionOf<"statsBar"> }) {
  return (
    <section
      id={section.id}
      className="py-12 md:py-16"
      style={{ background: "var(--p-surface-alt)", color: "var(--p-ink)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {section.heading && (
          <h2 className="font-display mb-8 text-center text-2xl font-bold md:text-3xl">
            {section.heading}
          </h2>
        )}
        <dl
          className="grid gap-8 text-center"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
          }}
        >
          {section.items.map((item) => {
            const body = (
              <>
                <dd className="font-display text-3xl font-bold md:text-4xl">
                  {item.value}
                </dd>
                <dt
                  className="mt-2 text-sm uppercase tracking-wide"
                  style={{ color: "var(--p-muted)" }}
                >
                  {item.label}
                </dt>
              </>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col-reverse transition hover:opacity-80"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {body}
              </a>
            ) : (
              <div key={item.label} className="flex flex-col-reverse">
                {body}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
