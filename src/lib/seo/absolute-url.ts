import { siteUrl } from "@config";

/** Dựng URL tuyệt đối từ path tương đối; giữ nguyên nếu đã là http(s). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}
