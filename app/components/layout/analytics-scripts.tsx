"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCookieConsent } from "@/app/components/layout/use-cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Só injeta os scripts depois que o visitante aceita cookies no banner — sem
 * isso, estaríamos rodando analytics de terceiro sem consentimento, o que
 * contradiz a própria política de cookies do site. Sem `NEXT_PUBLIC_GA_ID`/
 * `NEXT_PUBLIC_META_PIXEL_ID` configurados, este componente não renderiza
 * nada (ver `.env.example`).
 */
export function AnalyticsScripts() {
  const consent = useCookieConsent();
  const pathname = usePathname();
  const habilitado = consent === "accepted" && Boolean(GA_ID || META_PIXEL_ID);

  // Pageview em navegações client-side (GA/Pixel só disparam a primeira
  // automaticamente; o App Router não recarrega a página nas trocas de rota).
  useEffect(() => {
    if (!habilitado) return;
    window.gtag?.("event", "page_view", { page_path: pathname });
    window.fbq?.("track", "PageView");
  }, [pathname, habilitado]);

  if (!habilitado) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      {META_PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
