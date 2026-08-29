"use client";

import { useEffect, useState } from "react";
import { PlaceholderImage } from "@/app/components/ui/placeholder-image";
import type { Produto } from "@/lib/types";
import { registrarEvento } from "@/lib/metrics/track";

export function ProductViewer({ produto }: { produto: Produto }) {
  const [corIndex, setCorIndex] = useState(0);
  const [imagemIndex, setImagemIndex] = useState(0);
  const [tamanho, setTamanho] = useState(
    produto.tamanhos[Math.floor(produto.tamanhos.length / 2)]?.sigla
  );

  useEffect(() => {
    registrarEvento({
      tipo: "visualizacao_produto",
      produtoSlug: produto.slug,
      produtoNome: produto.nome,
    });
  }, [produto.slug, produto.nome]);

  const cor = produto.cores[corIndex];

  function selecionarCor(index: number) {
    setCorIndex(index);
    setImagemIndex(0);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Galeria */}
      <div>
        <PlaceholderImage
          seed={`${produto.id}-${cor.nome}-${imagemIndex}`}
          label={`${cor.nome} · foto ${imagemIndex + 1}`}
          className="aspect-4/5 rounded-2xl"
        />
        <div className="mt-3 flex gap-2">
          {cor.imagens.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setImagemIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === imagemIndex}
              className={`h-16 w-14 overflow-hidden rounded-lg ring-2 transition-colors ${
                i === imagemIndex ? "ring-foreground" : "ring-transparent"
              }`}
            >
              <PlaceholderImage
                seed={`${produto.id}-${cor.nome}-${i}`}
                className="h-full w-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Informações e variações */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {produto.referencia} · {produto.categoria}
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">
          {produto.nome}
        </h1>
        <p className="mt-4 text-muted">{produto.descricao}</p>

        {/* Cor */}
        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Cor — {cor.nome}
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {produto.cores.map((c, i) => (
              <button
                key={c.nome}
                type="button"
                onClick={() => selecionarCor(i)}
                aria-label={c.nome}
                aria-pressed={i === corIndex}
                className={`h-8 w-8 rounded-full ring-2 ring-offset-2 ring-offset-background transition-shadow ${
                  i === corIndex ? "ring-foreground" : "ring-transparent"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Tamanho */}
        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Tamanho
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {produto.tamanhos.map((t) => (
              <button
                key={t.sigla}
                type="button"
                onClick={() => setTamanho(t.sigla)}
                aria-pressed={tamanho === t.sigla}
                className={`h-10 min-w-10 rounded-full border px-3 text-sm transition-colors ${
                  tamanho === t.sigla
                    ? "border-foreground bg-foreground text-background"
                    : "border-line hover:border-foreground/50"
                }`}
              >
                {t.sigla}
              </button>
            ))}
          </div>
        </div>

        {/* Composição e cuidados */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Composição
            </p>
            <p className="mt-2 text-sm text-foreground/85">
              {produto.composicao}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Cuidados
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-foreground/85">
              {produto.cuidados.map((cuidado) => (
                <li key={cuidado}>· {cuidado}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tabela de medidas */}
        <div className="mt-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Tabela de medidas (cm)
          </p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                  <th className="px-3 py-2">Tamanho</th>
                  <th className="px-3 py-2">Largura</th>
                  <th className="px-3 py-2">Comprimento</th>
                  {produto.tamanhos[0]?.medidas.manga !== undefined && (
                    <th className="px-3 py-2">Manga</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {produto.tamanhos.map((t) => (
                  <tr
                    key={t.sigla}
                    className={`border-b border-line last:border-0 ${
                      t.sigla === tamanho ? "bg-background-alt font-medium" : ""
                    }`}
                  >
                    <td className="px-3 py-2">{t.sigla}</td>
                    <td className="px-3 py-2">{t.medidas.largura}</td>
                    <td className="px-3 py-2">{t.medidas.comprimento}</td>
                    {t.medidas.manga !== undefined && (
                      <td className="px-3 py-2">{t.medidas.manga}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
