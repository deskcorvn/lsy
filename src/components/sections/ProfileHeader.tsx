import type { SectionOf } from "@/content/schema";

// Đầu thẻ eCard: cover + avatar tròn + tên (h1 — được preflight whitelist cùng Hero).
// Avatar/cover là URL Medusa (host tuỳ tenant) -> dùng <img> thường tránh bẫy
// remotePatterns của next/image; alt bắt buộc (preflight #8).
export default function ProfileHeader({
  section,
}: {
  section: SectionOf<"profileHeader">;
}) {
  return (
    <section
      id={section.id}
      className="relative"
      style={{ background: "var(--p-surface-image, var(--p-surface))", color: "var(--p-ink)" }}
    >
      {section.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={section.cover}
          alt=""
          aria-hidden="true"
          className="h-40 w-full object-cover md:h-56"
        />
      ) : (
        <div className="h-24 md:h-32" aria-hidden="true" />
      )}
      <div className="mx-auto max-w-2xl px-6 pb-8 text-center">
        {section.avatar && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={section.avatar}
            alt={section.name}
            className="mx-auto -mt-14 h-28 w-28 rounded-full object-cover md:-mt-16 md:h-32 md:w-32"
            style={{
              border: "3px solid var(--p-surface)",
              boxShadow: "var(--p-shadow)",
              background: "var(--p-card)",
            }}
          />
        )}
        <h1 className="font-display mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          {section.name}
        </h1>
        {section.tagline && (
          <p className="mt-2 text-base" style={{ color: "var(--p-muted)" }}>
            {section.tagline}
          </p>
        )}
        {section.org && (
          <p
            className="mt-1 text-sm font-medium uppercase tracking-widest"
            style={{ color: "var(--brand-accent)" }}
          >
            {section.org}
          </p>
        )}
      </div>
    </section>
  );
}
