/**
 * AIO guardrail: quét text tìm câu lộ rõ do LLM sinh ra mà quên biên tập.
 * Hàm thuần — trả về danh sách vấn đề (rỗng = đạt). Dùng ở test để GATE nội dung thật.
 * (Placeholder / lorem do preflight + CI lo — không dò ở đây để tránh tự-bắt-mình.)
 */

// Câu lộ rõ là do LLM sinh ra mà quên biên tập.
const AI_PHRASES: RegExp[] = [
  /\bas an ai\b/i,
  /\bi cannot fulfill\b/i,
  /\bi'?m sorry,? but\b/i,
  /\blanguage model\b/i,
  /\bcertainly!?\s+here'?s\b/i,
  /\bhere is (?:a|the) (?:draft|response|content)\b/i,
  /là một (?:trợ lý ?ảo|mô hình ngôn ngữ|ai)\b/i,
  /dưới đây là (?:bản nháp|phản hồi của tôi)\b/i,
];

export function auditContent(text: string): string[] {
  const issues: string[] = [];
  for (const re of AI_PHRASES) {
    if (re.test(text)) issues.push(`câu sinh-máy: /${re.source}/`);
  }
  return issues;
}

// Gom đệ quy mọi chuỗi trong một object/array để audit toàn bộ nội dung.
export function collectText(value: unknown): string {
  if (typeof value === "string") return value + "\n";
  if (Array.isArray(value)) return value.map(collectText).join("");
  if (value && typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map(collectText)
      .join("");
  }
  return "";
}
