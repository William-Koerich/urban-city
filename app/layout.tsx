import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/app/components/layout/site-header";
import { SiteFooter } from "@/app/components/layout/site-footer";
import { CookieConsent } from "@/app/components/layout/cookie-consent";
import { AnalyticsScripts } from "@/app/components/layout/analytics-scripts";
import { AnalyticsBoot } from "@/app/components/layout/analytics-boot";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Urban City",
    template: "%s · Urban City",
  },
  description:
    "Urban City — moda feita na própria fábrica. Catálogo, coleções e rede de representantes em todo o Brasil.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Urban City",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <AnalyticsBoot />
        </Suspense>
      </body>
    </html>
  );
}
