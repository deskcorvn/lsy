import type { SectionOf } from "@/content/schema";

export default function Events({ section }: { section: SectionOf<"events"> }) {
  return (
    <section id={section.id} style={{ background: "var(--p-surface)" }}>
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        {section.heading && (
          <h2 className="mb-8 font-display text-3xl font-bold" style={{ color: "var(--p-ink)" }}>
            {section.heading}
          </h2>
        )}
        <div className="space-y-6">
          {section.items.map((e) => (
            <div
              key={e.title}
              className="p-6"
              style={{ border: "1px solid var(--p-line)", borderRadius: "var(--p-radius)" }}
            >
              <h3 className="text-xl font-semibold" style={{ color: "var(--p-ink)" }}>
                {e.title}
              </h3>
              <div
                className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm font-medium"
                style={{ color: "var(--brand-primary)" }}
              >
                {(e.scheduleText || e.startDate) && (
                  <span>{e.scheduleText ?? e.startDate}</span>
                )}
                {e.locationName && <span>{e.locationName}</span>}
              </div>
              <p className="mt-3" style={{ color: "var(--p-muted)" }}>
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
