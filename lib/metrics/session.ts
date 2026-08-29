const SESSION_KEY = "urbancity-sessao-id";
const STARTED_KEY = "urbancity-sessao-iniciada";

/**
 * Um ID por aba/sessão de navegador (sessionStorage — some quando a aba
 * fecha), não por pessoa. É o suficiente pra reconstruir "o que essa visita
 * fez no site" sem virar um identificador persistente entre visitas.
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
}

/** True só na primeira chamada de cada sessão — usado pra disparar "sessao_iniciada" uma única vez. */
export function marcarInicioDeSessao(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.sessionStorage.getItem(STARTED_KEY)) return false;
    window.sessionStorage.setItem(STARTED_KEY, "1");
    return true;
  } catch {
    return false;
  }
}
