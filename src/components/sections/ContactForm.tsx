"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import type { SectionOf } from "@/content/schema";
import { track } from "@/lib/track";

// SXO: form liên hệ tương tác → POST /api/contact (honeypot + rate-limit ở server).
export default function ContactForm({
  section,
}: {
  section: SectionOf<"contactForm">;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [msg, setMsg] = useState("");

  async function submit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    setMsg("");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await r.json();
      // Server trả MÃ lỗi — text hiển thị lấy từ config tenant (đa ngôn ngữ).
      if (!r.ok)
        throw new Error(
          json?.error === "rate_limited"
            ? section.errorRateLimited
            : section.errorMessage,
        );
      setStatus("done");
      form.reset();
      track("form_submit", { form: "contact" }); // SXO: đo chuyển đổi lead
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : section.errorMessage);
    }
  }

  if (status === "done") {
    return (
      <section id={section.id} style={{ background: "var(--p-surface-alt)", color: "var(--p-ink)" }}>
        <div className="mx-auto max-w-xl px-6 py-16 text-center md:py-24">
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{section.heading}</h2>
          <p className="mt-4" style={{ color: "var(--p-muted)" }}>{section.successMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section id={section.id} style={{ background: "var(--p-surface-alt)", color: "var(--p-ink)" }}>
      <div className="mx-auto max-w-xl px-6 py-16 md:py-24">
        <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{section.heading}</h2>
        {section.note && <p className="mt-3" style={{ color: "var(--p-muted)" }}>{section.note}</p>}
        <form onSubmit={submit} className="mt-8 grid gap-4">
          {/* honeypot chống bot: người thật luôn để trống */}
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          {section.fields.map((f) => (
            <Field
              key={f.name}
              name={f.name}
              label={f.label}
              required={f.required}
              type={f.type === "tel" ? "text" : f.type}
              inputMode={f.type === "tel" ? "tel" : undefined}
            />
          ))}
          <label className="block">
            <span className="mb-1 block text-sm" style={{ color: "var(--p-muted)" }}>
              {section.messageLabel}
            </span>
            <textarea
              name="message"
              required
              rows={4}
              className="w-full px-3 py-2.5 outline-none transition focus:border-[var(--brand-accent)]" style={{ background: "var(--p-card)", border: "1px solid var(--p-line)", borderRadius: "var(--p-radius)", color: "var(--p-ink)" }}
            />
          </label>
          {status === "error" && <p className="text-sm text-red-600">{msg}</p>}
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-press rounded-full px-6 py-3 font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: "var(--brand-primary)" }}
          >
            {status === "loading" ? "Đang gửi…" : section.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  required,
  type = "text",
  inputMode,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  inputMode?: "tel";
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm" style={{ color: "var(--p-muted)" }}>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        inputMode={inputMode}
        className="w-full px-3 py-2.5 outline-none transition focus:border-[var(--brand-accent)]" style={{ background: "var(--p-card)", border: "1px solid var(--p-line)", borderRadius: "var(--p-radius)", color: "var(--p-ink)" }}
      />
    </label>
  );
}
