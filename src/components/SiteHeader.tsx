"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clientConfig } from "@config";

/**
 * Header config-driven: logo + wordmark (dùng --font-script nếu vibe có — chữ ký thương hiệu)
 * + nav từ clientConfig.nav + nút CTA (navCta). Sticky, nền mờ để artwork hero xuyên qua.
 * Không có nav lẫn navCta -> vẫn render logo (mọi trang cần danh tính + đường về "/").
 */
export default function SiteHeader() {
  const { brand, nav, navCta } = clientConfig;
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: "color-mix(in srgb, var(--p-surface) 80%, transparent)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--p-line)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={brand.name}>
          <Image src={brand.logo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          <span
            className="text-xl"
            style={{ fontFamily: "var(--font-script, var(--font-display))", color: "var(--p-ink)" }}
          >
            {brand.name}
          </span>
        </Link>

        {nav.length > 0 && (
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-6" style={{ listStyle: "none", padding: 0 }}>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link text-sm font-medium"
                    style={{ color: "var(--p-muted)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {navCta && (
            <Link
              href={navCta.href}
              className="btn-press hidden px-4 py-2 text-sm font-semibold text-white sm:inline-block"
              style={{
                background: "linear-gradient(90deg, var(--brand-primary), var(--brand-accent))",
                borderRadius: "999px",
              }}
            >
              {navCta.label}
            </Link>
          )}
          {nav.length > 0 && (
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center md:hidden"
              aria-expanded={open}
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              style={{
                border: "1px solid var(--p-line)",
                borderRadius: "var(--p-radius)",
                color: "var(--p-ink)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                {open ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {open && nav.length > 0 && (
        <nav
          aria-label="Main mobile"
          className="md:hidden"
          style={{ background: "var(--p-surface)", borderTop: "1px solid var(--p-line)" }}
        >
          <ul className="flex flex-col px-6 py-3" style={{ listStyle: "none", padding: 0 }}>
            {[...nav, ...(navCta ? [navCta] : [])].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-sm font-medium"
                  style={{ color: "var(--p-ink)", borderBottom: "1px solid var(--p-line)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
