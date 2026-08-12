import QRCode from "qrcode";

/**
 * Sinh QR SVG server-side (route/RSC) — 0 JS client, in ra thẻ giấy vẫn nét.
 * QR luôn module tối trên nền trắng (QrPanel lo nền) — điều kiện quét được,
 * KHÔNG theme QR theo vibe.
 */
export async function qrSvg(text: string): Promise<string> {
  return QRCode.toString(text, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#0F0C24", light: "#ffffff" },
  });
}
