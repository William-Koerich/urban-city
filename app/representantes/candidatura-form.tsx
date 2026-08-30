"use client";

import { useState, type FormEvent } from "react";
import { registrarEvento } from "@/lib/metrics/track";

type Estado = "idle" | "enviando" | "sucesso" | "erro";

export function CandidaturaForm({ estados }: { estados: string[] }) {
  const [estadoEnvio, setEstadoEnvio] = useState<Estado>("idle");
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstadoEnvio("enviando");
    setErro(null);

    const form = e.currentTarget;
    const dados = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/candidaturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Não foi possível enviar. Tente novamente.");
      }
      setEstadoEnvio("sucesso");
      registrarEvento({
        tipo: "candidatura_representante",
        detalhe: typeof dados.estado === "string" ? dados.estado : undefined,
      });
      form.reset();
    } catch (err) {
      setEstadoEnvio("erro");
      setErro(err instanceof Error ? err.message : "Não foi possível enviar.");
    }
  }

  if (estadoEnvio === "sucesso") {
    return (
      <p className="rounded-xl border border-line bg-background px-5 py-4 text-sm text-foreground/85">
        Recebemos seu contato — obrigado pelo interesse! Nossa equipe comercial
        vai falar com você em breve.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <input
        name="nome"
        required
        placeholder="Nome completo"
        className="rounded-full border border-line bg-background px-5 py-3 text-sm outline-none focus:border-foreground"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="rounded-full border border-line bg-background px-5 py-3 text-sm outline-none focus:border-foreground"
      />
      <input
        name="whatsapp"
        required
        placeholder="WhatsApp (com DDD)"
        className="rounded-full border border-line bg-background px-5 py-3 text-sm outline-none focus:border-foreground"
      />
      <input
        name="cidade"
        required
        placeholder="Cidade"
        className="rounded-full border border-line bg-background px-5 py-3 text-sm outline-none focus:border-foreground"
      />
      <select
        name="estado"
        required
        defaultValue=""
        className="rounded-full border border-line bg-background px-5 py-3 text-sm outline-none focus:border-foreground sm:col-span-2"
      >
        <option value="" disabled>
          Estado
        </option>
        {estados.map((uf) => (
          <option key={uf} value={uf}>
            {uf}
          </option>
        ))}
      </select>
      <textarea
        name="mensagem"
        placeholder="Conte um pouco sobre você e sua experiência com vendas (opcional)"
        rows={3}
        className="rounded-2xl border border-line bg-background px-5 py-3 text-sm outline-none focus:border-foreground sm:col-span-2"
      />

      {erro && <p className="text-sm text-accent sm:col-span-2">{erro}</p>}

      <button
        type="submit"
        disabled={estadoEnvio === "enviando"}
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-background transition-opacity disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        {estadoEnvio === "enviando" ? "Enviando..." : "Quero ser representante"}
      </button>
    </form>
  );
}
