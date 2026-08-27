"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "urbancity-cookie-consent";
const CHANGE_EVENT = "urbancity-cookie-consent-changed";

// localStorage é um "sistema externo": lido via useSyncExternalStore, que já
// resolve o problema de hidratação (servidor não tem window) sem precisar de
// setState dentro de um efeito.
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "none";
  } catch {
    // modo privado ou storage bloqueado — trata como "sem decisão"
    return "unavailable";
  }
}

function getServerSnapshot() {
  return "server";
}

function decide(value: "accepted" | "rejected") {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // sem storage disponível — o aviso volta a aparecer na próxima visita, ok
  }
  // localStorage.setItem não dispara 'storage' na própria aba; avisa manualmente.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function CookieConsent() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const visible = stored === "none" || stored === "unavailable";

  if (!visible) return null;

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
          onClick={() => decide("rejected")}
          className="rounded-full border border-foreground/25 px-4 py-2 text-xs font-medium uppercase tracking-wide"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="rounded-full bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-wide text-background"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
