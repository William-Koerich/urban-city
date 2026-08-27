"use client";

import { useMemo, useState } from "react";
import type { Representante } from "@/lib/types";
import { linkWhatsapp, linkInstagram } from "@/lib/utils";

const MENSAGEM_PADRAO =
  "Olá! Vim pelo site da Urban City e gostaria de saber mais sobre a coleção.";

export function RepFinder({
  representantes,
  regioes,
  estados,
}: {
  representantes: Representante[];
  regioes: string[];
  estados: string[];
}) {
  const [busca, setBusca] = useState("");
  const [regiao, setRegiao] = useState<string | null>(null);
  const [estado, setEstado] = useState<string | null>(null);

  const resultado = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return representantes.filter((r) => {
      if (regiao && r.regiao !== regiao) return false;
      if (estado && r.estado !== estado) return false;
      if (
        termo &&
        !`${r.nome} ${r.cidade} ${r.estado}`.toLowerCase().includes(termo)
      )
        return false;
      return true;
    });
  }, [representantes, busca, regiao, estado]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome, cidade ou UF..."
          className="w-full rounded-full border border-line bg-background px-5 py-3 text-sm outline-none focus:border-foreground sm:max-w-sm"
        />

        {(regiao || estado || busca) && (
          <button
            type="button"
            onClick={() => {
              setBusca("");
              setRegiao(null);
              setEstado(null);
            }}
            className="text-xs uppercase tracking-wide text-muted underline underline-offset-2 hover:text-foreground"
          >
            Limpar busca
          </button>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Região
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {regioes.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegiao(regiao === r ? null : r)}
                aria-pressed={regiao === r}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  regiao === r
                    ? "border-foreground bg-foreground text-background"
                    : "border-line text-foreground/80 hover:border-foreground/50"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Estado
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {estados.map((uf) => (
              <button
                key={uf}
                type="button"
                onClick={() => setEstado(estado === uf ? null : uf)}
                aria-pressed={estado === uf}
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  estado === uf
                    ? "border-foreground bg-foreground text-background"
                    : "border-line text-foreground/80 hover:border-foreground/50"
                }`}
              >
                {uf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {resultado.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resultado.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-line p-5"
            >
              <p className="text-xs uppercase tracking-wide text-muted">
                {r.regiao} · {r.estado}
              </p>
              <p className="mt-1 font-display text-lg">{r.nome}</p>
              <p className="text-sm text-muted">{r.cidade}</p>
              <div className="mt-4 flex gap-2">
                <a
                  href={linkWhatsapp(r.whatsapp, MENSAGEM_PADRAO)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full bg-foreground px-4 py-2 text-center text-xs font-medium uppercase tracking-wide text-background"
                >
                  WhatsApp
                </a>
                <a
                  href={linkInstagram(r.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-full border border-line px-4 py-2 text-center text-xs font-medium uppercase tracking-wide hover:border-foreground/50"
                >
                  Instagram
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted">
          Nenhum representante encontrado para essa busca.
        </p>
      )}
    </div>
  );
}
