/**
 * URL pública do site, com fallback pro dev local.
 *
 * `||` (não `??`) de propósito: uma env var configurada na Vercel mas
 * deixada em branco chega aqui como `""` — que não é `undefined`/`null`,
 * então `??` não cairia no fallback e `new URL("")` quebraria o build.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
