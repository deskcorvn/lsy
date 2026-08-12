import type { SectionOf } from "@/content/schema";

const GRID = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export default function Leadership({
  section,
}: {
  section: SectionOf<"leadership">;
}) {
  return (
    <section id={section.id} style={{ background: "var(--p-surface-alt)" }}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        {section.heading && (
          <h2
            className="mb-10 text-center font-display text-3xl font-bold"
            style={{ color: "var(--p-ink)" }}
          >
            {section.heading}
          </h2>
        )}
        <div className={`grid grid-cols-1 gap-6 ${GRID[section.columns]}`}>
          {section.people.map((p) => (
            <div
              key={p.role}
              className="p-6 text-center"
              style={{
                background: "var(--p-card)",
                border: "1px solid var(--p-line)",
                borderRadius: "var(--p-radius)",
                boxShadow: "var(--p-shadow)",
              }}
            >
              <div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold text-white"
                style={{ backgroundColor: "var(--brand-primary)" }}
              >
                {p.name.trim().charAt(0).toUpperCase()}
              </div>
              <div className="font-semibold" style={{ color: "var(--p-ink)" }}>
                {p.name}
              </div>
              <div className="text-sm" style={{ color: "var(--brand-accent)" }}>
                {p.role}
              </div>
              {p.bio && (
                <p className="mt-2 text-sm" style={{ color: "var(--p-muted)" }}>
                  {p.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
