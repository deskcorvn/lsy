import type { SectionOf } from "@/content/schema";

export default function Testimonials({
  section,
}: {
  section: SectionOf<"testimonials">;
}) {
  return (
    <section id={section.id} style={{ background: "var(--p-surface-alt)" }}>
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        {section.heading && (
          <h2
            className="mb-10 text-center font-display text-3xl font-bold"
            style={{ color: "var(--p-ink)" }}
          >
            {section.heading}
          </h2>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {section.items.map((t, i) => (
            <figure
              key={i}
              className="p-6"
              style={{
                background: "var(--p-card)",
                border: "1px solid var(--p-line)",
                borderRadius: "var(--p-radius)",
                boxShadow: "var(--p-shadow)",
              }}
            >
              <blockquote style={{ color: "var(--p-ink)" }}>{`“${t.quote}”`}</blockquote>
              <figcaption
                className="mt-4 text-sm font-medium"
                style={{ color: "var(--p-ink)" }}
              >
                {t.author}
                {t.role ? (
                  <span className="font-normal" style={{ color: "var(--p-muted)" }}>
                    {" "}
                    — {t.role}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
