/** Só é importado por Client Components — mas não precisa da diretiva "use
 * client" porque não exporta nenhum componente React. */

import { hasAnalyticsConsent } from "@/app/components/layout/use-cookie-consent";
import { getSessionId } from "@/lib/metrics/session";

export type OrigemTrafego = "google" | "instagram" | "direto" | "outro";

export function detectarOrigem(): OrigemTrafego {
  if (typeof document === "undefined" || !document.referrer) return "direto";
  try {
    const host = new URL(document.referrer).hostname;
    if (host.includes("google.")) return "google";
    if (host.includes("instagram.com")) return "instagram";
    if (host === window.location.hostname) return "direto";
    return "outro";
  } catch {
    return "outro";
  }
}

export type TipoEvento =
  | "sessao_iniciada"
  | "pagina_vista"
  | "visualizacao_produto"
  | "whatsapp_produto"
  | "whatsapp_generico"
  | "instagram_representante"
  | "busca_representante"
  | "candidatura_representante"
  | "cookies_aceitos";

export type EventoPayload = {
  tipo: TipoEvento;
  /** Caminho da página. Se omitido, usa a URL atual automaticamente. */
  pagina?: string;
  produtoSlug?: string;
  produtoNome?: string;
  representanteId?: string;
  representanteNome?: string;
  /** Texto livre curto — termo de busca, filtro aplicado, etc. */
  detalhe?: string;
};

/**
 * Dispara o registro do evento sem nunca bloquear ou quebrar a navegação do
 * usuário — usa `sendBeacon` (sobrevive mesmo se a página trocar de aba/
 * fechar logo em seguida) e cai pra `fetch keepalive` como alternativa.
 *
 * Só envia depois que o visitante aceita cookies no banner — consistente com
 * o que o site promete em `/cookies`. Nenhuma chamada aqui bloqueia ou atrasa
 * a ação que o usuário está tomando (clicar num link, enviar um formulário).
 */
export function registrarEvento(payload: EventoPayload): void {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  const body = JSON.stringify({
    ...payload,
    pagina: payload.pagina ?? window.location.pathname + window.location.search,
    sessaoId: getSessionId(),
    origem: detectarOrigem(),
  });

  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/eventos", new Blob([body], { type: "application/json" }));
    } else {
      fetch("/api/eventos", {
        method: "POST",
        body,
        keepalive: true,
        headers: { "Content-Type": "application/json" },
      }).catch(() => {});
    }
  } catch {
    // métricas são um extra — nunca podem derrubar a experiência do usuário
  }
}
