"use client";

import Link from "next/link";
import { useCookieConsent, setCookieConsent } from "@/app/components/layout/use-cookie-consent";
import { registrarEvento } from "@/lib/metrics/track";

export function CookieConsent() {
  const stored = useCookieConsent();
  const visible = stored === "none" || stored === "unavailable";

  if (!visible) return null;

  function aceitar() {
    setCookieConsent("accepted");
    // só depois de aceitar — é o próprio consentimento que libera o envio.
    registrarEvento({ tipo: "cookies_aceitos" });
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-2xl flex-col gap-4 rounded-2xl border border-line bg-background p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-foreground/85">
        Usamos cookies essenciais e de análise para melhorar sua experiência.
        Veja nosso{" "}
        <Link href="/cookies" className="underline underline-offset-2">
          aviso de cookies
        </Link>
        .
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => setCookieConsent("rejected")}
          className="rounded-full border border-foreground/25 px-4 py-2 text-xs font-medium uppercase tracking-wide"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={aceitar}
          className="rounded-full bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide text-background"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
