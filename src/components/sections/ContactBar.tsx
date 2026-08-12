"use client";

import type { MouseEvent } from "react";
import type { SectionOf } from "@/content/schema";
import { track } from "@/lib/track";

// Thanh hành động eCard — LÝ DO TỒN TẠI của thẻ: người quét QR đang đứng nói chuyện,
// cần Gọi/Zalo/Lưu danh bạ/Chỉ đường trong 1 chạm. Sticky bottom trên mobile,
// touch target ≥48px, label chữ (không icon-only). Nút "vcard" = tải .vcf (a href,
// trình duyệt tự xử lý content-type text/vcard).
const KIND_STYLE: Record<string, { bg: string; fg: string }> = {
  vcard: { bg: "linear-gradient(90deg, var(--brand-primary), var(--brand-accent))", fg: "#fff" },
  zalo: { bg: "#0068ff", fg: "#fff" },
  tel: { bg: "var(--p-card)", fg: "var(--p-ink)" },
  mail: { bg: "var(--p-card)", fg: "var(--p-ink)" },
  map: { bg: "var(--p-card)", fg: "var(--p-ink)" },
  share: { bg: "var(--p-card)", fg: "var(--p-ink)" },
  link: { bg: "var(--p-card)", fg: "var(--p-ink)" },
};

const EVENT_BY_KIND: Record<string, string> = {
  tel: "ecard_call",
  zalo: "ecard_zalo",
  mail: "ecard_email",
  map: "ecard_map",
  vcard: "ecard_save_contact",
  share: "ecard_share",
  link: "ecard_link_click",
};

async function shareCard(href: string) {
  const url = new URL(href, window.location.href).toString();
  const data = { title: document.title, url };
  try {
    if (navigator.share) {
      await navigator.share(data);
      return;
    }
    await navigator.clipboard?.writeText(url);
  } catch {
    // User-cancelled shares are common and do not need UI noise.
  }
}

export default function ContactBar({ section }: { section: SectionOf<"contactBar"> }) {
  const bar = (
    <ul
      className="mx-auto grid w-full max-w-2xl gap-2 px-4 py-3"
      style={{
        listStyle: "none",
        padding: "0.75rem 1rem",
        gridTemplateColumns: `repeat(${section.items.length}, minmax(0, 1fr))`,
      }}
    >
      {section.items.map((item) => {
        const s = KIND_STYLE[item.kind] ?? KIND_STYLE.link;
        const external = item.href.startsWith("http");
        return (
          <li key={item.kind + item.href}>
            <a
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                track(EVENT_BY_KIND[item.kind] ?? "ecard_action", {
                  kind: item.kind,
                  label: item.label,
                });
                if (item.kind === "share") {
                  event.preventDefault();
                  void shareCard(item.href);
                }
              }}
              className="btn-press flex min-h-12 items-center justify-center px-2 py-3 text-center text-[11px] font-semibold leading-tight sm:text-sm"
              style={{
                background: s.bg,
                color: s.fg,
                borderRadius: "var(--p-radius)",
                border: s.bg === "var(--p-card)" ? "1px solid var(--p-line)" : "none",
              }}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );

  if (!section.sticky) {
    return (
      <section id={section.id} style={{ background: "var(--p-surface)" }}>
        {bar}
      </section>
    );
  }
  return (
    <section id={section.id}>
      {/* spacer giữ chỗ cho bar fixed trên mobile */}
      <div className="h-20 md:hidden" aria-hidden="true" />
      <div
        className="fixed inset-x-0 bottom-0 z-40 md:static"
        style={{
          background: "color-mix(in srgb, var(--p-surface) 92%, transparent)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderTop: "1px solid var(--p-line)",
        }}
      >
        {bar}
      </div>
    </section>
  );
}
