"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SectionOf } from "@/content/schema";

/**
 * Lưới card ảnh có link (catalog card grid). Kỷ luật hiển thị:
 * - Artwork bất khả xâm phạm: luôn object-cover đúng tỉ lệ, không filter đè, không xoay.
 * - Caption nằm TRONG DOM (a11y/SEO), scrim chỉ đổi opacity: hover/focus hiện,
 *   thiết bị touch luôn hiện (globals.css .mg-scrim).
 * - filterByTag/batchSize chỉ ẨN bằng `hidden` — không cắt DOM (SEO cần danh sách đủ).
 */
const COLS: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  6: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6",
};
const SIZES: Record<number, string> = {
  2: "(max-width: 640px) 100vw, 50vw",
  3: "(max-width: 768px) 50vw, 33vw",
  4: "(max-width: 768px) 50vw, 25vw",
  6: "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 17vw",
};
const ASPECT: Record<string, string> = {
  square: "1 / 1",
  portrait: "3 / 4",
  video: "16 / 9",
};

function shapeRadius(shape: "rounded" | "circle" | "arch"): string {
  if (shape === "circle") return "999px";
  if (shape === "arch") return "999px 999px var(--p-radius) var(--p-radius)";
  return "var(--p-radius)";
}

export default function MediaGrid({ section }: { section: SectionOf<"mediaGrid"> }) {
  const tags = section.filterByTag
    ? [...new Set(section.items.flatMap((i) => i.tags))]
    : [];
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const batch = section.batchSize ?? section.items.length;
  const [visible, setVisible] = useState(batch);

  const matches = section.items.map(
    (item) => activeTag === null || item.tags.includes(activeTag),
  );
  const matchCount = matches.filter(Boolean).length;

  let shown = 0;
  return (
    <section
      id={section.id}
      className="py-16 md:py-24"
      style={{ background: "var(--p-surface)", color: "var(--p-ink)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {section.heading && (
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            {section.heading}
          </h2>
        )}
        {section.description && (
          <p className="mt-3 max-w-2xl" style={{ color: "var(--p-muted)" }}>
            {section.description}
          </p>
        )}

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter">
            {[null, ...tags].map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag ?? "__all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setActiveTag(tag);
                    setVisible(batch);
                  }}
                  className="px-3 py-1 text-sm transition"
                  style={{
                    border: "1px solid var(--p-line)",
                    borderRadius: "999px",
                    background: active ? "var(--brand-primary)" : "transparent",
                    color: active ? "#ffffff" : "var(--p-muted)",
                  }}
                >
                  {tag ?? "All"}
                </button>
              );
            })}
          </div>
        )}

        <ul
          className={`mt-8 grid gap-3 md:gap-4 ${COLS[section.columns]}`}
          style={{ listStyle: "none", padding: 0 }}
        >
          {section.items.map((item, i) => {
            const match = matches[i];
            const within = match && shown < visible;
            if (match) shown++;
            const caption = item.subtitle
              ? `${item.title} — ${item.subtitle}`
              : item.title;
            const inner = (
              <>
                <span
                  className="mg-lift relative block overflow-hidden"
                  style={{
                    aspectRatio: ASPECT[section.aspect],
                    borderRadius: shapeRadius(section.shape),
                    border: "1px solid var(--p-line)",
                    background: "var(--p-card)",
                  }}
                >
                  <Image
                    src={item.image}
                    alt={caption}
                    fill
                    sizes={SIZES[section.columns]}
                    className="object-cover"
                  />
                  {item.badge && (
                    <span
                      className="absolute left-2 top-2 z-10 px-2 py-0.5 text-xs font-medium text-white"
                      style={{
                        background: "var(--brand-primary)",
                        borderRadius: "var(--p-radius)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <span
                    className="mg-scrim absolute inset-x-0 bottom-0 z-10 px-3 pb-3 pt-10 text-left"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent, rgba(8, 6, 24, 0.82))",
                      borderRadius: `0 0 ${
                        section.shape === "circle" ? "999px 999px" : "var(--p-radius) var(--p-radius)"
                      }`,
                    }}
                  >
                    <span className="block truncate text-sm font-semibold text-white">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="block truncate text-xs text-white/75">
                        {item.subtitle}
                      </span>
                    )}
                  </span>
                </span>
                {/* Shape vòm/tròn cắt mất scrim đáy trên vài trình duyệt cũ → tên luôn hiện dưới card cho 2 shape này. */}
                {section.shape !== "rounded" && (
                  <span className="mt-3 block text-center">
                    <span className="font-display block text-sm font-semibold">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="block text-xs" style={{ color: "var(--p-muted)" }}>
                        {item.subtitle}
                      </span>
                    )}
                  </span>
                )}
              </>
            );
            return (
              <li key={item.title + i} hidden={!within} className="mg-card card-reveal">
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-label={caption}
                    className="block focus:outline-none"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {matchCount > visible && (
            <button
              type="button"
              onClick={() => setVisible((v) => v + batch)}
              className="btn-press px-6 py-3 font-medium"
              style={{
                border: "1px solid var(--p-line)",
                borderRadius: "var(--p-radius)",
                color: "var(--p-ink)",
              }}
            >
              Show more ({matchCount - visible})
            </button>
          )}
          {section.viewAll && (
            <Link
              href={section.viewAll.href}
              className="btn-press px-6 py-3 font-medium text-white"
              style={{
                background: "var(--brand-primary)",
                borderRadius: "var(--p-radius)",
              }}
            >
              {section.viewAll.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
