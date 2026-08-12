import { describe, it, expect } from "vitest";
import { auditContent, collectText } from "@/lib/ai/content-quality";
import { content } from "@content";

describe("auditContent (AIO guardrail)", () => {
  it("phát hiện câu sinh-máy (EN + VI)", () => {
    expect(
      auditContent("As an AI language model, here is the draft.").length,
    ).toBeGreaterThan(0);
    expect(
      auditContent("Dưới đây là bản nháp của tôi cho bạn.").length,
    ).toBeGreaterThan(0);
  });
  it("nội dung biên tập sạch → không vấn đề", () => {
    expect(
      auditContent("Chúng tôi đồng hành cùng doanh nghiệp đến kết quả đo lường được."),
    ).toEqual([]);
  });
  it("nội dung thật trong content.config.ts sạch (GATE)", () => {
    expect(auditContent(collectText(content))).toEqual([]);
  });
});
