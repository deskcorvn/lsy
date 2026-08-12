import { track as vercelTrack } from "@vercel/analytics";

// SXO: bắn event chuyển đổi tới GA4 và Vercel Web Analytics (cả hai đều no-op khi chưa bật).
type AnalyticsParam = string | number | boolean | null;

function analyticsParams(params?: Record<string, unknown>): Record<string, AnalyticsParam> | undefined {
  if (!params) return undefined;
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null
      ) {
        return [key, value];
      }
      return [key, String(value)];
    }),
  );
}

export function track(action: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") w.gtag("event", action, params ?? {});
  vercelTrack(action, analyticsParams(params));
}
