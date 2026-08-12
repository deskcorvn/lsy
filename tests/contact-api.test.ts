import { describe, it, expect } from "vitest";
import { POST } from "@/app/api/contact/route";

function req(body: Record<string, unknown>, ip: string) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

describe("/api/contact", () => {
  it("honeypot điền → 200 (bỏ qua, không xử lý)", async () => {
    const r = await POST(
      req({ company_website: "bot", name: "x", phone: "0900000000", message: "hi" }, "2.0.0.1"),
    );
    expect(r.status).toBe(200);
  });
  it("thiếu field bắt buộc → 400", async () => {
    const r = await POST(req({ name: "", phone: "", message: "" }, "2.0.0.2"));
    expect(r.status).toBe(400);
  });
  it("hợp lệ → 200", async () => {
    const r = await POST(
      req({ name: "An", phone: "0900000000", message: "Xin tư vấn website giúp tôi." }, "2.0.0.3"),
    );
    expect(r.status).toBe(200);
  });
  it("quá nhiều request cùng IP → 429 (rate-limit)", async () => {
    const ip = "9.0.0.9";
    let last: Response | undefined;
    for (let i = 0; i < 7; i++) {
      last = await POST(req({ name: "An", phone: "0900000000", message: "Nội dung kiểm tra rate limit." }, ip));
    }
    expect(last?.status).toBe(429);
  });
  it("email thay phone vẫn hợp lệ → 200 (tenant quốc tế)", async () => {
    const r = await POST(
      req(
        { name: "Ann", email: "ann@example.com", message: "I want to distribute my piano EP." },
        "2.0.0.4",
      ),
    );
    expect(r.status).toBe(200);
  });
  it("thiếu cả email lẫn phone → 400", async () => {
    const r = await POST(
      req({ name: "Ann", message: "No contact channel provided here." }, "2.0.0.5"),
    );
    expect(r.status).toBe(400);
  });
  it("musicLink không phải URL → 400 (mã invalid_music_link)", async () => {
    const r = await POST(
      req(
        {
          name: "Ann",
          email: "ann@example.com",
          musicLink: "not-a-url",
          message: "Please listen to my demo track.",
        },
        "2.0.0.6",
      ),
    );
    expect(r.status).toBe(400);
    expect((await r.json()).error).toBe("invalid_music_link");
  });
  it("musicLink là URL hợp lệ → 200", async () => {
    const r = await POST(
      req(
        {
          name: "Ann",
          email: "ann@example.com",
          musicLink: "https://soundcloud.com/ann/demo",
          message: "Please listen to my demo track.",
        },
        "2.0.0.7",
      ),
    );
    expect(r.status).toBe(200);
  });
});
