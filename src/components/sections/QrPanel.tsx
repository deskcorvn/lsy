import type { SectionOf } from "@/content/schema";

// Khung QR của eCard. QR PHẢI nền trắng + module tối bất kể vibe (điều kiện quét được) —
// đây là ngoại lệ theming có chủ đích. svg = QR sinh server-side (lib/qr.ts, không JS client);
// imageUrl = ảnh ngoài (vd VietQR png từ img.vietqr.io).
export default function QrPanel({ section }: { section: SectionOf<"qrPanel"> }) {
  if (!section.svg && !section.imageUrl) return null;
  return (
    <section
      id={section.id}
      className="py-8"
      style={{ background: "var(--p-surface-alt)", color: "var(--p-ink)" }}
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        {section.heading && (
          <h2 className="font-display mb-4 text-2xl font-bold tracking-tight">
            {section.heading}
          </h2>
        )}
        <div
          className="mx-auto inline-block bg-white p-4"
          style={{ borderRadius: "var(--p-radius)", boxShadow: "var(--p-shadow)" }}
        >
          {section.svg ? (
            <div
              className="h-52 w-52 [&_svg]:h-full [&_svg]:w-full"
              role="img"
              aria-label={section.caption ?? "QR code"}
              // SVG sinh nội bộ từ lib/qr.ts (không phải input người dùng)
              dangerouslySetInnerHTML={{ __html: section.svg }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={section.imageUrl!}
              alt={section.caption ?? "QR code"}
              className="h-52 w-52 object-contain"
              loading="lazy"
            />
          )}
        </div>
        {section.caption && (
          <p className="mt-3 text-sm" style={{ color: "var(--p-muted)" }}>
            {section.caption}
          </p>
        )}
      </div>
    </section>
  );
}
