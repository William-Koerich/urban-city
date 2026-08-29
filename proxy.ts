import { NextRequest, NextResponse } from "next/server";

/**
 * Protege /metricas com HTTP Basic Auth.
 *
 * (Next.js 16 renomeou `middleware.ts` para `proxy.ts` — mesma coisa, nome
 * novo. Ver node_modules/next/dist/docs/.../file-conventions/proxy.md.)
 *
 * Sem METRICAS_USER/METRICAS_PASSWORD configurados, bloqueia por padrão —
 * um painel com dados de negócio e emails/telefones de candidatos não pode
 * ficar aberto só porque alguém esqueceu de configurar a senha.
 */
export function proxy(request: NextRequest) {
  const usuario = process.env.METRICAS_USER;
  const senha = process.env.METRICAS_PASSWORD;

  if (!usuario || !senha) {
    return new NextResponse(
      "Painel de métricas não configurado: defina METRICAS_USER e METRICAS_PASSWORD.",
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decodificado = atob(auth.slice(6));
      const separador = decodificado.indexOf(":");
      const u = decodificado.slice(0, separador);
      const p = decodificado.slice(separador + 1);
      if (u === usuario && p === senha) {
        return NextResponse.next();
      }
    } catch {
      // credenciais malformadas — cai no 401 abaixo
    }
  }

  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Metricas Urban City"' },
  });
}

export const config = {
  matcher: "/metricas/:path*",
};
