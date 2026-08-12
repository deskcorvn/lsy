import Icon from "./Icon";
import type { SectionOf } from "@/content/schema";

const GRID = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export default function ValueHighlights({
  section,
}: {
  section: SectionOf<"valueHighlights">;
}) {
  return (
    <section id={section.id} style={{ background: "var(--p-surface)" }}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {section.heading && (
          <h2
            className="mb-12 text-center font-display text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "var(--p-ink)" }}
          >
            {section.heading}
          </h2>
        )}
        <div className={`grid grid-cols-1 gap-6 ${GRID[section.columns]}`}>
          {section.items.map((it) => (
            <div
              key={it.title}
              className="p-6"
              style={{
                background: "var(--p-card)",
                border: "1px solid var(--p-line)",
                borderRadius: "var(--p-radius)",
                boxShadow: "var(--p-shadow)",
              }}
            >
              <div
                className="mb-4 inline-flex h-12 w-12 items-center justify-center"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--brand-primary) 14%, transparent)",
                  color: "var(--brand-primary)",
                  borderRadius: "var(--p-radius)",
                }}
              >
                <Icon name={it.icon} className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold" style={{ color: "var(--p-ink)" }}>
                {it.title}
              </h3>
              <p className="mt-2" style={{ color: "var(--p-muted)" }}>
                {it.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
