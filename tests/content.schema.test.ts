import { describe, it, expect } from "vitest";
import { ContentConfigSchema } from "@/content/schema";

const hero = {
  id: "hero",
  type: "hero",
  heading: "Heading",
  subheading: "Sub",
  primaryCta: { label: "CTA", href: "#x" },
};
const faq = {
  id: "faq",
  type: "faq",
  items: [
    {
      question: "Câu hỏi mẫu đủ dài?",
      answer: "Đây là câu trả lời mẫu đủ dài để vượt ngưỡng tối thiểu cho AEO.",
    },
  ],
};

describe("ContentConfigSchema (bất biến nội dung)", () => {
  it("parse nội dung hợp lệ", () => {
    expect(() => ContentConfigSchema.parse({ sections: [hero, faq] })).not.toThrow();
  });
  it("từ chối 0 hero", () => {
    expect(() => ContentConfigSchema.parse({ sections: [faq] })).toThrow();
  });
  it("từ chối 2 hero", () => {
    expect(() =>
      ContentConfigSchema.parse({ sections: [hero, { ...hero, id: "hero2" }] }),
    ).toThrow();
  });
  it("từ chối hero không ở đầu", () => {
    expect(() => ContentConfigSchema.parse({ sections: [faq, hero] })).toThrow();
  });
  it("từ chối id trùng", () => {
    expect(() =>
      ContentConfigSchema.parse({ sections: [hero, { ...faq, id: "hero" }] }),
    ).toThrow();
  });
  it("từ chối câu trả lời FAQ quá ngắn (AEO)", () => {
    expect(() =>
      ContentConfigSchema.parse({
        sections: [
          hero,
          { ...faq, items: [{ question: "Câu hỏi đủ dài chứ?", answer: "ngắn" }] },
        ],
      }),
    ).toThrow();
  });
});
