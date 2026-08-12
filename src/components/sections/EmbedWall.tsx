"use client";

import { useState } from "react";
import Image from "next/image";
import type { SectionOf } from "@/content/schema";

/**
 * Tường media nhúng (YouTube/Spotify) theo pattern FACADE (lite-embed):
 * - First load: 0 iframe — chỉ thumbnail tĩnh + nút play (hiệu năng + privacy).
 * - Click mới mount iframe (youtube-nocookie autoplay / spotify embed).
 * - aspect-ratio/height cố định trước khi mount → CLS = 0.
 * - variant "playerRail": 1 player lớn + rail thumbnail hoán đổi (scroll-snap trên mobile).
 */
type Item = SectionOf<"embedWall">["items"][number];

function embedSrc(item: Item): string {
  if (item.provider === "youtube") {
    return item.kind === "playlist"
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${item.embedId}&autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${item.embedId}?autoplay=1`;
  }
  return `https://open.spotify.com/embed/${item.kind}/${item.embedId}`;
}

function thumbSrc(item: Item): string | null {
  if (item.thumbnail) return item.thumbnail;
  // hqdefault luôn tồn tại (maxresdefault 404 với nhiều video cũ).
  if (item.provider === "youtube" && item.kind === "video")
    return `https://i.ytimg.com/vi/${item.embedId}/hqdefault.jpg`;
  return null; // spotify/playlist không có thumb công khai → panel chữ
}

function spotifyHeight(item: Item): number {
  return item.kind === "track" ? 152 : 352;
}

function PlayBadge() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white transition group-hover:scale-110"
      style={{ background: "var(--brand-primary)" }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5.14v13.72L19 12 8 5.14z" />
      </svg>
    </span>
  );
}

function Facade({
  item,
  playing,
  onPlay,
  priorityThumb = false,
}: {
  item: Item;
  playing: boolean;
  onPlay: () => void;
  priorityThumb?: boolean;
}) {
  const isSpotify = item.provider === "spotify";
  const frameStyle = isSpotify
    ? { height: `${spotifyHeight(item)}px` }
    : { aspectRatio: "16 / 9" };

  if (playing) {
    return (
      <iframe
        src={embedSrc(item)}
        title={item.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full"
        style={{ ...frameStyle, border: 0, borderRadius: "var(--p-radius)" }}
      />
    );
  }

  const thumb = thumbSrc(item);
  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`Play: ${item.title}`}
      className="group relative block w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2"
      style={{
        ...frameStyle,
        borderRadius: "var(--p-radius)",
        border: "1px solid var(--p-line)",
        background: "var(--p-card)",
      }}
    >
      {thumb ? (
        <Image
          src={thumb}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          priority={priorityThumb}
          className="object-cover"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <span className="font-display text-lg font-semibold">{item.title}</span>
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-12"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(8, 6, 24, 0.82))",
        }}
      >
        <span className="block truncate text-sm font-medium text-white">
          {item.title}
        </span>
      </span>
      <PlayBadge />
    </button>
  );
}

export default function EmbedWall({ section }: { section: SectionOf<"embedWall"> }) {
  const [mounted, setMounted] = useState<Set<number>>(new Set());
  const [selected, setSelected] = useState(0);
  const [railPlaying, setRailPlaying] = useState(false);

  const play = (i: number) => setMounted((prev) => new Set(prev).add(i));
  const cols =
    section.columns === 1
      ? "grid-cols-1"
      : section.columns === 2
        ? "grid-cols-1 md:grid-cols-2"
        : "grid-cols-1 md:grid-cols-3";

  return (
    <section
      id={section.id}
      className="py-16 md:py-24"
      style={{ background: "var(--p-surface-alt)", color: "var(--p-ink)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {section.heading && (
          <h2 className="font-display mb-10 text-4xl font-bold tracking-tight md:text-5xl">
            {section.heading}
          </h2>
        )}

        {section.variant === "grid" ? (
          <div className={`grid gap-4 md:gap-6 ${cols}`}>
            {section.items.map((item, i) => (
              <Facade
                key={item.provider + item.embedId}
                item={item}
                playing={mounted.has(i)}
                onPlay={() => play(i)}
              />
            ))}
          </div>
        ) : (
          <div>
            <Facade
              item={section.items[selected]}
              playing={railPlaying}
              onPlay={() => setRailPlaying(true)}
            />
            {section.items.length > 1 && (
              <ul
                className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2"
                style={{ listStyle: "none", padding: 0 }}
              >
                {section.items.map((item, i) => {
                  const thumb = thumbSrc(item);
                  const active = i === selected;
                  return (
                    <li key={item.provider + item.embedId} className="snap-start">
                      <button
                        type="button"
                        aria-label={`Play: ${item.title}`}
                        aria-current={active}
                        onClick={() => {
                          setSelected(i);
                          setRailPlaying(true);
                        }}
                        className="relative block h-20 w-32 shrink-0 overflow-hidden transition hover:opacity-90 md:h-24 md:w-40"
                        style={{
                          borderRadius: "var(--p-radius)",
                          border: active
                            ? "2px solid var(--brand-primary)"
                            : "1px solid var(--p-line)",
                          background: "var(--p-card)",
                          opacity: active ? 1 : 0.8,
                        }}
                      >
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={item.title}
                            fill
                            sizes="160px"
                            className="object-cover"
                          />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center p-2 text-center text-xs font-medium">
                            {item.title}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
