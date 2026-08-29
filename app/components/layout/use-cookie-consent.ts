"use client";

import { useSyncExternalStore } from "react";

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

export type CookieConsentValue = "accepted" | "rejected";

export function setCookieConsent(value: CookieConsentValue): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // sem storage disponível — o aviso volta a aparecer na próxima visita, ok
  }
  // localStorage.setItem não dispara 'storage' na própria aba; avisa manualmente.
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** "server" | "none" | "unavailable" | "accepted" | "rejected" */
export function useCookieConsent(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Versão não-hook — usada fora de componentes React (o tracker de métricas
 * em `lib/metrics/track.ts`) pra decidir, a cada evento, se pode enviar.
 */
export function hasAnalyticsConsent(): boolean {
  return getSnapshot() === "accepted";
}
