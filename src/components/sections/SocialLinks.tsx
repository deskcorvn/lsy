import type { SectionOf } from "@/content/schema";

// Lưới nút social/nền tảng của eCard — cùng ngôn ngữ nút với Footer (chunky, uppercase).
export default function SocialLinks({ section }: { section: SectionOf<"socialLinks"> }) {
  return (
    <section
      id={section.id}
      className="py-8"
      style={{ background: "var(--p-surface)", color: "var(--p-ink)" }}
    >
      <div className="mx-auto max-w-2xl px-6">
        {section.heading && (
          <h2
            className="mb-4 text-center text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--p-muted)" }}
          >
            {section.heading}
          </h2>
        )}
        <ul
          className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          style={{ listStyle: "none", padding: 0 }}
        >
          {section.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="btn-press flex items-center justify-center px-4 py-3 text-xs font-semibold uppercase tracking-widest"
                style={{
                  border: "1px solid var(--p-line)",
                  borderRadius: "var(--p-radius)",
                  background: "var(--p-card)",
                  color: "var(--p-ink)",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
