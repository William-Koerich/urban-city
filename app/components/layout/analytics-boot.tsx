"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { registrarEvento } from "@/lib/metrics/track";
import { marcarInicioDeSessao } from "@/lib/metrics/session";

/**
 * Monta uma vez no layout raiz e cobre o fluxo inteiro de navegação sem
 * precisar instrumentar página por página:
 * - 1x por sessão de navegador: "sessao_iniciada" (entrou no site).
 * - a cada troca de rota OU de querystring: "pagina_vista" — isso já cobre
 *   filtros do catálogo (?categoria=X muda a querystring) sem código extra
 *   em `catalog-filters.tsx`.
 *
 * Usa `useSearchParams`, que exige um limite de Suspense (ver `layout.tsx`)
 * — sem isso o Next forçaria o site inteiro a renderizar dinâmico.
 */
export function AnalyticsBoot() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pagina = searchParams.size > 0 ? `${pathname}?${searchParams}` : pathname;

  // Ref porque este efeito deve rodar só 1x (a sessão só "começa" uma vez) —
  // capturamos a página atual no momento do mount, sem precisar re-rodar o
  // efeito quando `pagina` mudar depois.
  const paginaInicialRef = useRef(pagina);

  useEffect(() => {
    if (marcarInicioDeSessao()) {
      registrarEvento({ tipo: "sessao_iniciada", pagina: paginaInicialRef.current });
    }
  }, []);

  useEffect(() => {
    registrarEvento({ tipo: "pagina_vista", pagina });
  }, [pagina]);

  return null;
}
