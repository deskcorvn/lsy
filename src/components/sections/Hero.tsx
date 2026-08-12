import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SectionOf } from "@/content/schema";
import HeroDecor from "./HeroDecor";

// Diện mạo theo design persona (vibe): nền/chữ/bo góc/shadow lấy từ token --p-*; tiêu đề dùng --font-display.
// h1 giữ màu --brand-primary (màu thương hiệu khách) = "one strong color moment" (nguyên tắc impeccable).
// variant: "centered" (mặc định) | "split" (chữ trái, panel phải).
// Artwork-first (pattern Lofi Girl): backgroundImage = tranh cảnh full-bleed của tenant;
// scrim color-mix từ --p-surface đảm bảo chữ đạt AA trên mọi vùng tranh, đáy tan vào trang.
export default function Hero({ section }: { section: SectionOf<"hero"> }) {
  const split = section.variant === "split";
  const bg = section.backgroundImage;
  return (
    <section
      id={section.id}
      className={`relative overflow-hidden ${bg ? "flex items-center" : ""}`}
      style={{
        background: "var(--p-surface-image, var(--p-surface))",
        color: "var(--p-ink)",
        // Artwork-first (Lofi Girl): tranh chiếm gần trọn màn hình đầu, chữ nổi trên tranh.
        ...(bg ? { minHeight: "min(86svh, 900px)" } : {}),
      }}
    >
      {bg && (
        <>
          <Image
            src={bg}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="hero-sky object-cover"
          />
          {/* Scrim nhẹ để artwork vẫn "gánh" trang; chữ đọc được nhờ glow màu nền quanh text. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--p-surface) 34%, transparent) 0%, color-mix(in srgb, var(--p-surface) 22%, transparent) 55%, var(--p-surface) 100%)",
            }}
          />
          {/* Vignette điện ảnh: tối nhẹ 4 mép để mắt hút vào giữa tranh. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 40%, transparent 58%, color-mix(in srgb, var(--p-surface) 55%, transparent) 100%)",
            }}
          />
        </>
      )}
      {section.decor && <HeroDecor pack={section.decor} />}
      <div
        className={
          split
            ? "relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28"
            : "relative mx-auto w-full max-w-5xl px-6 py-20 text-center md:py-28"
        }
        style={
          bg
            ? { textShadow: "0 1px 24px color-mix(in srgb, var(--p-surface) 85%, transparent), 0 1px 8px color-mix(in srgb, var(--p-surface) 60%, transparent)" }
            : undefined
        }
      >
        <div className={`hero-enter relative ${section.scriptAccent ? "pt-14 md:pt-20" : ""}`}>
          {section.scriptAccent && (
            <span
              aria-hidden="true"
              className="hero-script pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none whitespace-nowrap text-7xl md:text-9xl"
              style={{
                fontFamily: "var(--font-script, var(--font-display))",
                opacity: 0.2,
                color: "var(--p-ink)",
              }}
            >
              {section.scriptAccent}
            </span>
          )}
          {section.highlights.length > 0 && (
            <div
              className={`mb-6 flex flex-wrap gap-2 ${split ? "" : "justify-center"}`}
              style={{ "--i": 0 } as CSSProperties}
            >
              {section.highlights.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1 text-sm"
                  style={{
                    border: "1px solid var(--p-line)",
                    borderRadius: "var(--p-radius)",
                    color: "var(--p-muted)",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          )}
          <h1
            className={`font-display font-bold leading-tight tracking-tight ${
              bg ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"
            }`}
            style={{ color: "var(--brand-primary)", "--i": 1 } as CSSProperties}
          >
            {section.heading}
          </h1>
          <p
            className={`mt-6 max-w-2xl text-lg ${split ? "" : "mx-auto"}`}
            style={{ color: "var(--p-muted)", "--i": 2 } as CSSProperties}
          >
            {section.subheading}
          </p>
          <div
            className={`mt-8 flex flex-wrap gap-3 ${split ? "" : "justify-center"}`}
            style={{ "--i": 3 } as CSSProperties}
          >
            <Link
              href={section.primaryCta.href}
              className="btn-press px-6 py-3 font-medium text-white shadow-sm"
              style={{
                background: "linear-gradient(90deg, var(--brand-primary), var(--brand-accent))",
                borderRadius: "999px",
              }}
            >
              {section.primaryCta.label}
            </Link>
            {section.secondaryCta && (
              <Link
                href={section.secondaryCta.href}
                className="btn-press px-6 py-3 font-medium"
                style={{
                  border: "1px solid var(--p-line)",
                  borderRadius: "999px",
                  color: "var(--p-ink)",
                }}
              >
                {section.secondaryCta.label}
              </Link>
            )}
          </div>
          {section.proofLine && (
            <p
              className="mt-8 text-[13px] font-medium uppercase tracking-[0.18em]"
              style={{ color: "var(--p-muted)", "--i": 4 } as CSSProperties}
            >
              {section.proofLine}
            </p>
          )}
        </div>
        {split && (
          <div
            className="hidden md:block"
            aria-hidden="true"
            style={{
              borderRadius: "var(--p-radius)",
              border: "1px solid var(--p-line)",
              boxShadow: "var(--p-shadow)",
              background: "var(--p-surface)",
              aspectRatio: "4 / 3",
            }}
          />
        )}
      </div>
    </section>
  );
}
