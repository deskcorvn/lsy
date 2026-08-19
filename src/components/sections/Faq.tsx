import type { SectionOf } from "@/content/schema";

// Answer-first (AEO): câu hỏi + trả lời hiển thị NGAY (dl/dt/dd), không gập <details>.
// Diện mạo theo design persona: nền/chữ/đường kẻ lấy từ token --p-*.
export default function Faq({ section }: { section: SectionOf<"faq"> }) {
  return (
    <section id={section.id} style={{ background: "var(--p-surface)" }}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          {section.heading && (
            <div>
              <p
                className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--brand-primary)" }}
              >
                Câu hỏi thường gặp
              </p>
              <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: "var(--p-ink)" }}>
                {section.heading}
              </h2>
            </div>
          )}
          <dl style={{ borderTop: "1px solid var(--p-line)" }}>
            {section.items.map((it, index) => (
              <div key={it.question} className="py-6" style={{ borderBottom: "1px solid var(--p-line)" }}>
                <div className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="pt-1 font-display text-sm font-semibold tracking-[0.16em]"
                    style={{ color: "var(--brand-accent)" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt className="text-lg font-semibold" style={{ color: "var(--p-ink)" }}>
                      {it.question}
                    </dt>
                    <dd className="mt-2 leading-relaxed" style={{ color: "var(--p-muted)" }}>
                      {it.answer}
                    </dd>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
