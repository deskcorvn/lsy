import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { clientConfig, siteUrl } from "@config";
import { absoluteUrl } from "@/lib/seo/absolute-url";
import { resolveProfile, profileVars } from "@/design/profile";
import QuickContact from "@/components/QuickContact";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: clientConfig.brand.name,
    template: `%s | ${clientConfig.brand.name}`,
  },
  description: clientConfig.brand.description,
  applicationName: clientConfig.brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: clientConfig.brand.locale,
    url: siteUrl,
    siteName: clientConfig.brand.name,
    title: clientConfig.brand.name,
    description: clientConfig.brand.description,
    images: [{ url: absoluteUrl(clientConfig.brand.ogImage), alt: clientConfig.brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: clientConfig.brand.name,
    description: clientConfig.brand.description,
    images: [absoluteUrl(clientConfig.brand.ogImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: clientConfig.brand.logo },
};

// Theme tokens lấy từ client.config → nhân bản chỉ cần đổi config, không sửa CSS.
// Design persona (vibe) → token font/surface/shape. Accent vẫn từ brand để giữ màu khách.
const profile = resolveProfile(clientConfig.theme.vibe);
const themeVars = {
  "--brand-primary": clientConfig.theme.primary,
  "--brand-accent": clientConfig.theme.accent,
  ...profileVars(profile),
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={clientConfig.brand.lang} data-vibe={clientConfig.theme.vibe}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={profile.googleFonts} rel="stylesheet" />
      </head>
      <body style={themeVars}>
        <SiteHeader />
        {children}
        <Footer />
        <QuickContact />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
