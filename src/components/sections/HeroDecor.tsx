"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";

/**
 * Scene decor pack "night-piano" — lớp sống phủ lên hero artwork:
 * - 2 tầng sao lấp lánh + 1 sao băng (CSS, vị trí DETERMINISTIC — không Math.random
 *   lúc render để SSR/CSR khớp nhau).
 * - Đom đóm trôi lên (Ghibli-feel) — ánh sáng diegetic trong tranh, không phải UI glow.
 * - Piano cánh silhouette vẽ bằng SVG, BẤM ĐƯỢC: phát hợp âm rải nhẹ bằng Web Audio
 *   (không file âm thanh; chỉ chạy sau cử chỉ người dùng — đúng chính sách trình duyệt).
 * - Parallax nhẹ theo con trỏ (±9px, chỉ thiết bị hover; tôn trọng reduced-motion).
 * Mọi layer pointer-events:none trừ piano.
 */

// Rải giả-ngẫu-nhiên bằng nhân số nguyên tố — cùng kết quả ở server & client.
const STARS = Array.from({ length: 42 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7) % 62,
  size: 1 + ((i * 29) % 3) * 0.55,
  delay: ((i * 41) % 70) / 10,
  dur: 3.2 + ((i * 17) % 40) / 10,
  dim: i % 3 === 0,
}));

const FIREFLIES = Array.from({ length: 9 }, (_, i) => ({
  x: (i * 31 + 17) % 88 + 4,
  size: 3 + ((i * 13) % 3),
  delay: ((i * 47) % 110) / 10,
  dur: 13 + ((i * 23) % 6),
  sway: ((i % 2 === 0 ? 1 : -1) * (24 + ((i * 19) % 30))),
}));

// E4-G4-B4-D5-F#5: hợp âm rải Emaj9-cảm — mềm, hợp "music for the quiet hours".
const CHIME_HZ = [329.63, 392.0, 493.88, 587.33, 739.99];

function playChime() {
  type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };
  const Ctx = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.14;
  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 1400;
  master.connect(lowpass).connect(ctx.destination);
  CHIME_HZ.forEach((hz, i) => {
    const t = ctx.currentTime + i * 0.11;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = hz;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.9 - i * 0.12, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.4);
    osc.connect(gain).connect(master);
    osc.start(t);
    osc.stop(t + 2.6);
  });
  // Đóng context sau khi ngân xong — không giữ tài nguyên audio.
  window.setTimeout(() => void ctx.close(), 3400);
}

export default function HeroDecor({ pack }: { pack: "night-piano" }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  if (pack !== "night-piano") return null;

  // Parallax: đặt CSS var trên wrapper; các layer tự nhân hệ số. rAF-throttle tối giản.
  let raf = 0;
  const onMove = (e: React.PointerEvent) => {
    const el = wrapRef.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    });
  };

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{ pointerEvents: "none" }}
      onPointerMove={onMove}
    >
      {/* Tầng sao xa (parallax yếu) */}
      <div className="decor-layer" style={{ "--depth": 3 } as CSSProperties}>
        {STARS.filter((s) => s.dim).map((s, i) => (
          <span
            key={`fs-${i}`}
            className="decor-star"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                opacity: 0.35,
                "--tw-delay": `${s.delay}s`,
                "--tw-dur": `${s.dur}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      {/* Tầng sao gần (parallax mạnh hơn, sáng hơn) + sao băng */}
      <div className="decor-layer" style={{ "--depth": 7 } as CSSProperties}>
        {STARS.filter((s) => !s.dim).map((s, i) => (
          <span
            key={`ns-${i}`}
            className="decor-star"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size + 0.6,
                height: s.size + 0.6,
                opacity: 0.7,
                "--tw-delay": `${s.delay}s`,
                "--tw-dur": `${s.dur}s`,
              } as CSSProperties
            }
          />
        ))}
        <span className="decor-shooting-star" />
      </div>
      {/* Đom đóm — ánh sáng trong tranh (diegetic), trôi lên chậm */}
      <div className="decor-layer" style={{ "--depth": 10 } as CSSProperties}>
        {FIREFLIES.map((f, i) => (
          <span
            key={`ff-${i}`}
            className="decor-firefly"
            style={
              {
                left: `${f.x}%`,
                width: f.size,
                height: f.size,
                "--ff-delay": `${f.delay}s`,
                "--ff-dur": `${f.dur}s`,
                "--ff-sway": `${f.sway}px`,
              } as CSSProperties
            }
          />
        ))}
      </div>
      {/* Piano cánh silhouette — bấm phát hợp âm rải (easter egg, chỉ desktop) */}
      <button
        type="button"
        aria-label="Play a soft piano chord"
        title="♪"
        onClick={playChime}
        className="decor-piano hidden md:block"
        style={{ pointerEvents: "auto" }}
      >
        <svg viewBox="0 0 340 210" width="330" height="204" fill="none" aria-hidden="true">
          <g fill="var(--decor-silhouette, #07051a)">
            {/* nắp đàn mở chéo — mép sau thân (x86) lên đỉnh phải */}
            <path d="M 86 106 L 268 28 L 282 34 L 276 106 Z" opacity="0.94" />
            {/* que chống nắp */}
            <path d="M 214 56 L 222 106" stroke="var(--decor-silhouette, #07051a)" strokeWidth="4" strokeLinecap="round" />
            {/* thân đàn: notch phím bên trái, hông sâu, đuôi bo tròn */}
            <path
              d="M 46 158
                 L 46 122 Q 46 114 56 114
                 L 64 114 L 64 106 L 158 106 L 158 114
                 L 252 114 Q 282 114 288 136 Q 292 148 284 158 Z"
              opacity="0.98"
            />
            {/* 3 chân thuôn + bánh xe */}
            <path d="M 62 158 L 56 200 M 160 158 L 160 202 M 272 158 L 280 200" stroke="var(--decor-silhouette, #07051a)" strokeWidth="8" strokeLinecap="round" />
            <circle cx="55" cy="203" r="4" />
            <circle cx="160" cy="205" r="4" />
            <circle cx="281" cy="203" r="4" />
            {/* pedal lyre */}
            <path d="M 165 158 L 165 178 M 157 178 L 173 178" stroke="var(--decor-silhouette, #07051a)" strokeWidth="4" strokeLinecap="round" />
            {/* ghế đôn bên trái */}
            <rect x="2" y="164" width="34" height="7" rx="3" />
            <path d="M 7 171 L 7 200 M 31 171 L 31 200" stroke="var(--decor-silhouette, #07051a)" strokeWidth="5" strokeLinecap="round" />
          </g>
          {/* dải phím trắng nằm TRONG notch, black keys tick phía trên */}
          <rect x="66" y="107" width="90" height="6" rx="1.5" fill="#EDE9FF" opacity="0.9" />
          <g fill="var(--decor-silhouette, #07051a)" opacity="0.95">
            {Array.from({ length: 11 }, (_, i) => (
              <rect key={i} x={69 + i * 7.9} y={107} width={3} height={3.8} rx={0.5} />
            ))}
          </g>
        </svg>
      </button>
    </div>
  );
}
