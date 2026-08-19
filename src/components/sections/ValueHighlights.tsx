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
          <div className="mb-12 max-w-3xl">
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--brand-primary)" }}
            >
              {section.eyebrow ?? "Trước khi chọn máy"}
            </p>
            <h2
              className="font-display text-4xl font-bold tracking-tight md:text-5xl"
              style={{ color: "var(--p-ink)" }}
            >
              {section.heading}
            </h2>
          </div>
        )}
        <div
          className={`grid grid-cols-1 gap-4 ${
            section.items.length === 4 && section.columns === 4
              ? "sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]"
              : GRID[section.columns]
          }`}
        >
          {section.items.map((it, index) => (
            <div
              key={it.title}
              className="flex min-h-full flex-col p-6 md:p-7"
              style={{
                background: "var(--p-card)",
                border: "1px solid var(--p-line)",
                borderRadius: "var(--p-radius)",
                boxShadow: "var(--p-shadow)",
              }}
            >
              <div className="mb-8 flex items-center justify-between">
                <span
                  className="font-display text-sm font-semibold tracking-[0.16em]"
                  style={{ color: "var(--brand-accent)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="inline-flex h-11 w-11 items-center justify-center"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--brand-primary) 14%, transparent)",
                    color: "var(--brand-primary)",
                    borderRadius: "var(--p-radius)",
                  }}
                >
                  <Icon name={it.icon} className="h-5 w-5" />
                </span>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: "var(--p-ink)" }}>
                {it.title}
              </h3>
              <p className="mt-2 flex-1" style={{ color: "var(--p-muted)" }}>
                {it.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
