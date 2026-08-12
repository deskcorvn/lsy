import type { SectionOf } from "@/content/schema";

// Answer-first (AEO): câu hỏi + trả lời hiển thị NGAY (dl/dt/dd), không gập <details>.
// Diện mạo theo design persona: nền/chữ/đường kẻ lấy từ token --p-*.
export default function Faq({ section }: { section: SectionOf<"faq"> }) {
  return (
    <section id={section.id} style={{ background: "var(--p-surface)" }}>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {section.heading && (
          <h2 className="mb-10 font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: "var(--p-ink)" }}>
            {section.heading}
          </h2>
        )}
        <dl style={{ borderTop: "1px solid var(--p-line)" }}>
          {section.items.map((it) => (
            <div key={it.question} className="py-6" style={{ borderBottom: "1px solid var(--p-line)" }}>
              <dt className="text-lg font-semibold" style={{ color: "var(--p-ink)" }}>
                {it.question}
              </dt>
              <dd className="mt-2 leading-relaxed" style={{ color: "var(--p-muted)" }}>
                {it.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
