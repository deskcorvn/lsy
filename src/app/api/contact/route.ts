export const dynamic = "force-dynamic";

/**
 * SXO: nhận liên hệ từ ContactForm.
 * - Honeypot (field `company_website`): bot điền → bỏ qua, giả vờ thành công.
 * - Rate-limit nhẹ trong bộ nhớ (theo IP, reset mỗi instance — đủ cho landing).
 * - Bắt buộc: name + message + ít nhất một trong email|phone (tenant quốc tế dùng email).
 * - musicLink (tùy chọn): validate URL http(s) — funnel "submit your music" của label nhạc.
 * - Giao lead theo chuỗi fallback: Resend (RESEND_API_KEY + CONTACT_TO_EMAIL)
 *   → CONTACT_WEBHOOK_URL → console.log (Vercel Functions log, không mất lead).
 * - Lỗi trả về MÃ (error code) — UI tự hiển thị text theo config tenant.
 * - KHÔNG import src/env.ts (tránh ràng buộc MEDUSA_*).
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const MAX_LEN = 5_000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX_PER_WINDOW;
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

type Payload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  musicLink: string;
  message: string;
};

async function deliver(payload: Payload): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
          to: [to],
          reply_to: payload.email || undefined,
          subject: `[Contact] ${payload.name}`,
          text: [
            `Name: ${payload.name}`,
            payload.email && `Email: ${payload.email}`,
            payload.phone && `Phone: ${payload.phone}`,
            payload.company && `Company/Artist: ${payload.company}`,
            payload.musicLink && `Music link: ${payload.musicLink}`,
            "",
            payload.message,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      if (r.ok) return true;
    } catch {
      // rơi xuống webhook/log
    }
  }
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return true;
    } catch {
      return false;
    }
  }
  // Chưa cấu hình kênh giao lead: ghi log server để không mất lead.
  console.log("[contact]", payload);
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  // honeypot: bot điền field ẩn → coi như xong, không xử lý.
  if (body?.company_website) return Response.json({ ok: true });

  const field = (key: string) =>
    (body?.[key] || "").toString().trim().slice(0, MAX_LEN);
  const payload: Payload = {
    name: field("name"),
    email: field("email"),
    phone: field("phone"),
    company: field("company"),
    musicLink: field("musicLink"),
    message: field("message"),
  };

  if (!payload.name || !payload.message || !(payload.email || payload.phone)) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }
  if (payload.musicLink && !isHttpUrl(payload.musicLink)) {
    return Response.json({ error: "invalid_music_link" }, { status: 400 });
  }

  const delivered = await deliver(payload);
  if (!delivered) {
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
