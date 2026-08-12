import { clientConfig } from "@config";
import type { SectionOf } from "@/content/schema";

export default function Contact({ section }: { section: SectionOf<"contact"> }) {
  const { contact, social } = clientConfig;
  return (
    <section id={section.id} style={{ background: "var(--p-surface-alt)" }}>
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <h2 className="font-display text-3xl font-bold" style={{ color: "var(--p-ink)" }}>
          {section.heading}
        </h2>
        {section.note && (
          <p className="mt-4" style={{ color: "var(--p-muted)" }}>
            {section.note}
          </p>
        )}
        {/* phone/address tùy chọn (tenant online-only chỉ có email) */}
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {contact.phoneDisplay && (
            <div>
              <dt className="text-sm" style={{ color: "var(--p-muted)" }}>
                Điện thoại
              </dt>
              <dd className="mt-1 font-medium" style={{ color: "var(--p-ink)" }}>
                {contact.phoneDisplay}
              </dd>
            </div>
          )}
          <div>
            <dt className="text-sm" style={{ color: "var(--p-muted)" }}>
              Email
            </dt>
            <dd className="mt-1 font-medium" style={{ color: "var(--p-ink)" }}>
              {contact.email}
            </dd>
          </div>
          {contact.address && (
            <div>
              <dt className="text-sm" style={{ color: "var(--p-muted)" }}>
                Địa chỉ
              </dt>
              <dd className="mt-1 font-medium" style={{ color: "var(--p-ink)" }}>
                {contact.address.street}, {contact.address.locality}
              </dd>
            </div>
          )}
        </dl>
        {social.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {social.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline"
                style={{ color: "var(--p-muted)" }}
              >
                {url}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
