import Script from "next/script";
import { clientConfig } from "@config";

// SXO: GA4 — chỉ chèn khi cấu hình sxo.gaMeasurementId (đo chuyển đổi).
export default function Analytics() {
  const id = clientConfig.sxo.gaMeasurementId;
  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
