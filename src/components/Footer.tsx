import Image from "next/image";
import Link from "next/link";
import { clientConfig } from "@config";

/**
 * Footer 2 tầng (pattern Lofi Girl): tầng trên = khối brand (logo + wordmark + mô tả)
 * đối diện lưới NÚT social lớn (footerLinks dạng http); tầng dưới = hairline với ©,
 * email và link nội bộ (/terms, /privacy…). Tất cả config-driven từ footerLinks.
 */
export default function Footer() {
  const { brand, contact, footerLinks } = clientConfig;
  const social = footerLinks.filter((l) => l.href.startsWith("http"));
  const internal = footerLinks.filter((l) => !l.href.startsWith("http"));

  return (
    <footer
      style={{
        background: "var(--p-surface-alt)",
        color: "var(--p-muted)",
        borderTop: "1px solid var(--p-line)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3" aria-label={brand.name}>
              <Image
                src={brand.logo}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span
                className="text-2xl"
                style={{
                  fontFamily: "var(--font-script, var(--font-display))",
                  color: "var(--p-ink)",
                }}
              >
                {brand.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">{brand.description}</p>
          </div>

          {social.length > 0 && (
            <nav aria-label="Social">
              <ul
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                style={{ listStyle: "none", padding: 0 }}
              >
                {social.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press flex min-w-[8.5rem] items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-widest"
                      style={{
                        border: "1px solid var(--p-line)",
                        borderRadius: "var(--p-radius)",
                        color: "var(--p-ink)",
                        background: "var(--p-card)",
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div
          className="mt-12 flex flex-col items-center gap-3 pt-6 text-sm md:flex-row md:justify-between"
          style={{ borderTop: "1px solid var(--p-line)" }}
        >
          <p>
            © {new Date().getFullYear()} {brand.name} ·{" "}
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </p>
          {internal.length > 0 && (
            <nav aria-label="Footer">
              <ul
                className="flex flex-wrap items-center gap-x-6 gap-y-2"
                style={{ listStyle: "none", padding: 0 }}
              >
                {internal.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
