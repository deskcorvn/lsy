import { describe, it, expect } from "vitest";
import { ContentConfigSchema, SectionSchema } from "@/content/schema";

const hero = {
  id: "hero",
  type: "hero",
  heading: "Heading",
  subheading: "Sub",
  primaryCta: { label: "CTA", href: "#lien-he" },
};

describe("section mới: statsBar / mediaGrid / embedWall / logoMarquee", () => {
  it("statsBar cần 2-6 items", () => {
    const one = {
      id: "s",
      type: "statsBar",
      items: [{ value: "2.84M", label: "Subscribers" }],
    };
    expect(() => SectionSchema.parse(one)).toThrow();
    expect(() =>
      SectionSchema.parse({
        ...one,
        items: [
          { value: "2.84M", label: "Subscribers" },
          { value: "1B+", label: "Listens" },
        ],
      }),
    ).not.toThrow();
  });

  it("mediaGrid: default columns=4/aspect=square/shape=rounded, nhận shape arch", () => {
    const parsed = SectionSchema.parse({
      id: "m",
      type: "mediaGrid",
      items: [{ image: "/images/a.webp", title: "A" }],
    });
    expect(parsed).toMatchObject({ columns: 4, aspect: "square", shape: "rounded" });
    expect(() =>
      SectionSchema.parse({
        id: "m2",
        type: "mediaGrid",
        shape: "arch",
        filterByTag: true,
        batchSize: 18,
        items: [{ image: "/images/a.webp", title: "A", tags: ["piano"] }],
      }),
    ).not.toThrow();
  });

  it("embedWall: tối đa 12 item, provider/kind hợp lệ, variant playerRail", () => {
    const item = {
      provider: "youtube",
      kind: "video",
      embedId: "hj83cwfOF3Y",
      title: "Video",
    };
    expect(() =>
      SectionSchema.parse({
        id: "e",
        type: "embedWall",
        variant: "playerRail",
        items: [item],
      }),
    ).not.toThrow();
    expect(() =>
      SectionSchema.parse({ id: "e2", type: "embedWall", items: Array(13).fill(item) }),
    ).toThrow();
  });

  it("logoMarquee cần ≥3 logo có name (alt)", () => {
    const logo = { name: "Spotify", image: "/images/stores/spotify.svg" };
    expect(() =>
      SectionSchema.parse({ id: "l", type: "logoMarquee", items: [logo, logo] }),
    ).toThrow();
    expect(() =>
      SectionSchema.parse({ id: "l2", type: "logoMarquee", items: [logo, logo, logo] }),
    ).not.toThrow();
  });
});

describe("hero/cta artwork-first + contactForm fields", () => {
  it("hero nhận backgroundImage /..., proofLine, scriptAccent, decor pack", () => {
    expect(() =>
      SectionSchema.parse({
        ...hero,
        backgroundImage: "/images/brand/hero-sky.webp",
        proofLine: "2.84M SUBSCRIBERS · 1B+ LISTENS · SINCE 2014",
        scriptAccent: "breathe",
        decor: "night-piano",
      }),
    ).not.toThrow();
    expect(() => SectionSchema.parse({ ...hero, decor: "disco" })).toThrow();
    expect(() =>
      SectionSchema.parse({ ...hero, backgroundImage: "images/x.webp" }),
    ).toThrow();
  });

  it("cta nhận backgroundImage (pattern promo trên artwork)", () => {
    expect(() =>
      SectionSchema.parse({
        id: "c",
        type: "cta",
        heading: "Listen now",
        primaryCta: { label: "Open", href: "/music" },
        backgroundImage: "/images/brand/promo.webp",
      }),
    ).not.toThrow();
  });

  it("contactForm: fields thiếu email|phone bị chặn từ config (khớp server)", () => {
    const form = (fields: unknown[]) => ({
      sections: [
        hero,
        {
          id: "form",
          type: "contactForm",
          heading: "Submit your music",
          fields,
        },
      ],
    });
    expect(() =>
      ContentConfigSchema.parse(
        form([{ name: "name", label: "Name *", required: true }]),
      ),
    ).toThrow();
    expect(() =>
      ContentConfigSchema.parse(
        form([
          { name: "name", label: "Name *", required: true },
          { name: "email", label: "Email *", required: true, type: "email" },
          { name: "musicLink", label: "Music link *", required: true, type: "url" },
        ]),
      ),
    ).not.toThrow();
  });

  it("FAQ answer nhận tới 750 ký tự (nới trần cho tenant EN)", () => {
    expect(() =>
      ContentConfigSchema.parse({
        sections: [
          hero,
          {
            id: "faq",
            type: "faq",
            items: [{ question: "Câu hỏi mẫu đủ dài?", answer: "x".repeat(700) }],
          },
        ],
      }),
    ).not.toThrow();
  });
});
