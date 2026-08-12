import type { SectionOf } from "@/content/schema";

export default function About({ section }: { section: SectionOf<"about"> }) {
  return (
    <section id={section.id} style={{ background: "var(--p-surface-alt)" }}>
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl" style={{ color: "var(--p-ink)" }}>
          {section.heading}
        </h2>
        <div
          className="mt-6 space-y-4 text-lg leading-relaxed"
          style={{ color: "var(--p-muted)" }}
        >
          {section.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
