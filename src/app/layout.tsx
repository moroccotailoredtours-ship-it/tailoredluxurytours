import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TabBar } from "@/components/layout/TabBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationLd } from "@/lib/seo";
import { isIndexable, site } from "@/lib/site";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Private, Tailor-Made Morocco Travel`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  verification: {
    ...(site.googleVerification ? { google: site.googleVerification } : {}),
    ...(site.yandexVerification ? { yandex: site.yandexVerification } : {}),
    other: {
      ...(site.bingVerification ? { "msvalidate.01": site.bingVerification } : {}),
      ...(site.baiduVerification ? { "baidu-site-verification": site.baiduVerification } : {}),
      ...(site.naverVerification ? { "naver-site-verification": site.naverVerification } : {}),
    },
  },
};

export const viewport: Viewport = { themeColor: "#fdfcf9", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <JsonLd data={organizationLd()} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <TabBar />
        <BackToTop />
        <WhatsAppFloat />
        {site.plausibleDomain && (
          <Script defer data-domain={site.plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
