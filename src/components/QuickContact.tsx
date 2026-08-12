"use client";
import { clientConfig } from "@config";
import { track } from "@/lib/track";

// SXO: cụm nút gọi/chat nhanh nổi góc phải — luôn hiện trên mọi trang.
// tel: chỉ hiện khi có contact.phone; Zalo/WhatsApp chỉ hiện khi cấu hình.
// Không kênh nào cấu hình -> ẩn hẳn (tenant online-only dùng form).
// Mỗi click bắn event GA4 (đo chuyển đổi).
export default function QuickContact() {
  const { contact, ecard } = clientConfig;
  // eCard bật: thẻ đã có ContactBar dính đáy — nút nổi này thừa và đè lên bar.
  if (ecard.enabled) return null;
  const items: { label: string; href: string; bg: string; event: string }[] = [];
  if (contact.phone) {
    items.push({ label: "Gọi ngay", href: `tel:${contact.phone}`, bg: "var(--brand-primary)", event: "phone_call" });
  }
  if (contact.zalo) {
    items.push({ label: "Zalo", href: `https://zalo.me/${contact.zalo}`, bg: "#0068ff", event: "zalo_click" });
  }
  if (contact.whatsapp) {
    items.push({ label: "WhatsApp", href: `https://wa.me/${contact.whatsapp}`, bg: "#25d366", event: "whatsapp_click" });
  }
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {items.map((it) => {
        const external = it.href.startsWith("http");
        return (
          <a
            key={it.label}
            href={it.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            onClick={() => track(it.event, { channel: it.label })}
            aria-label={it.label}
            className="flex h-12 items-center rounded-full px-5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            style={{ backgroundColor: it.bg }}
          >
            {it.label}
          </a>
        );
      })}
    </div>
  );
}
