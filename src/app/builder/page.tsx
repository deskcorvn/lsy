"use client";

import { useState } from "react";
import { VIBES } from "@/design/profile";

type Result = { slug: string; url: string };
type Status = "idle" | "loading" | "done" | "error";

const VIBE_LABEL: Record<string, string> = {
  swiss: "Swiss — sạch, tối giản, doanh nghiệp",
  industrial: "Industrial — tối, mạnh, công nghệ",
  organic: "Organic — ấm, mộc, thủ công",
  aurora: "Aurora — gradient, hiện đại, startup",
  retro: "Retro — hoài cổ, cá tính",
};

export default function BuilderPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      brandName: fd.get("brandName"),
      description: fd.get("description"),
      phone: fd.get("phone") || undefined,
      email: fd.get("email") || undefined,
      locality: fd.get("locality") || undefined,
      vibe: fd.get("vibe"),
    };
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.error ?? "Có lỗi xảy ra.");
        return;
      }
      setResult(json);
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Không gọi được máy chủ.");
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-900">Tạo website của bạn</h1>
      <p className="mt-2 text-gray-600">
        Điền vài thông tin cơ bản — hệ thống tự dựng một website đầy đủ (giới thiệu, giá trị, FAQ, form liên hệ) theo
        phong cách bạn chọn.
      </p>

      {status === "done" && result ? (
        <div className="mt-8 rounded-lg border border-green-300 bg-green-50 p-6">
          <p className="font-semibold text-green-800">✅ Website đã tạo xong!</p>
          <a href={result.url} className="mt-2 inline-block text-lg font-bold text-green-700 underline">
            Xem site: {result.url}
          </a>
          <button
            onClick={() => {
              setStatus("idle");
              setResult(null);
            }}
            className="mt-4 block text-sm text-gray-500 underline"
          >
            Tạo site khác
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field label="Tên thương hiệu *" name="brandName" required placeholder="Ví dụ: Cà phê Mộc" />
          <div>
            <label className="block text-sm font-medium text-gray-700">Mô tả ngắn * (tối thiểu 20 ký tự)</label>
            <textarea
              name="description"
              required
              minLength={20}
              rows={3}
              placeholder="Bạn làm gì, cho ai, điểm mạnh là gì?"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Điện thoại" name="phone" placeholder="0900..." />
            <Field label="Email" name="email" type="email" placeholder="hello@..." />
          </div>
          <Field label="Khu vực" name="locality" placeholder="Hải Phòng" />
          <div>
            <label className="block text-sm font-medium text-gray-700">Phong cách (vibe)</label>
            <select
              name="vibe"
              defaultValue="swiss"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            >
              {VIBES.map((v) => (
                <option key={v} value={v}>
                  {VIBE_LABEL[v] ?? v}
                </option>
              ))}
            </select>
          </div>

          {status === "error" && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-md bg-gray-900 px-4 py-3 font-semibold text-white disabled:opacity-50"
          >
            {status === "loading" ? "Đang dựng site..." : "Tạo website ngay"}
          </button>
        </form>
      )}
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
      />
    </div>
  );
}
