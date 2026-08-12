import Image from "next/image";
import Link from "next/link";
import type { SectionOf } from "@/content/schema";

// backgroundImage (tùy chọn) = pattern "promo trên artwork" (Lofi Girl): tranh cảnh
// full-bleed + scrim tối cố định để chữ trắng luôn đạt AA bất kể tranh sáng/tối.
export default function Cta({ section }: { section: SectionOf<"cta"> }) {
  const bg = section.backgroundImage;
  return (
    <section
      id={section.id}
      className="relative overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: "var(--brand-primary)" }}
    >
      {bg && (
        <>
          <Image
            src={bg}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "rgba(8, 6, 24, 0.52)" }}
          />
        </>
      )}
      <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{section.heading}</h2>
        {section.body && (
          <p className="mx-auto mt-4 max-w-2xl text-white/90">{section.body}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={section.primaryCta.href}
            className="btn-press rounded-full bg-white px-6 py-3 font-semibold shadow-sm"
            style={{ color: "var(--brand-primary)" }}
          >
            {section.primaryCta.label}
          </Link>
          {section.secondaryCta && (
            <Link
              href={section.secondaryCta.href}
              className="btn-press rounded-full border border-white/40 px-6 py-3 font-medium text-white"
            >
              {section.secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
