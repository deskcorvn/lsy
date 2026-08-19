import Image from "next/image";
import type { SectionOf } from "@/content/schema";

export default function About({ section }: { section: SectionOf<"about"> }) {
  return (
    <section id={section.id} style={{ background: "var(--p-surface-alt)" }}>
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div
          className={`grid gap-10 lg:items-center ${
            section.media ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" : "max-w-3xl"
          }`}
        >
          <div>
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--brand-primary)" }}
            >
              Thiết bị và chăm sóc sau lắp
            </p>
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
          {section.media && (
            <figure>
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "4 / 3",
                  border: "1px solid var(--p-line)",
                  borderRadius: "var(--p-radius)",
                  boxShadow: "var(--p-shadow)",
                }}
              >
                <Image
                  src={section.media}
                  alt={section.mediaAlt ?? section.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm" style={{ color: "var(--p-muted)" }}>
                {section.mediaAlt ?? section.heading}.
              </figcaption>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
