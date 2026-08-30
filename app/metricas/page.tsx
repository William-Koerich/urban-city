import type { Metadata } from "next";
import { Container } from "@/app/components/ui/container";
import { BarList } from "@/app/metricas/bar-list";
import { EvolucaoDiaria } from "@/app/metricas/evolucao-diaria";
import { getMetricas } from "@/lib/metrics/queries";

// Painel interno: nunca cachear/prerenderizar, sempre ler o estado atual do
// banco, e nunca indexar (a proteção de verdade é o Basic Auth em proxy.ts).
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Métricas",
  robots: { index: false, follow: false },
};

const ORIGEM_ROTULO: Record<string, string> = {
  google: "Busca no Google",
  instagram: "Instagram",
  direto: "Acesso direto",
  outro: "Outros / indicação",
  desconhecido: "Sem referência",
};

function StatTile({ rotulo, valor }: { rotulo: string; valor: number }) {
  return (
    <div className="rounded-2xl border border-line p-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
        {rotulo}
      </p>
      <p className="mt-2 font-display text-3xl">{valor}</p>
    </div>
  );
}

export default async function MetricasPage() {
  const dados = await getMetricas();

  const origem = dados.origemTrafego.map((o) => ({
    ...o,
    rotulo: ORIGEM_ROTULO[o.chave] ?? o.chave,
  }));

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
          Painel interno
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl">Métricas</h1>
        <p className="mt-3 max-w-xl text-muted">
          Dados de comportamento coletados diretamente pelo site — sem
          depender do que os representantes reportam em campo.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-5">
          <StatTile rotulo="Sessões" valor={dados.totais.sessoes} />
          <StatTile rotulo="Visualizações de produto" valor={dados.totais.visualizacoes} />
          <StatTile rotulo="Contatos via WhatsApp" valor={dados.totais.contatosWhatsapp} />
          <StatTile rotulo="Cliques em Instagram" valor={dados.totais.cliquesInstagram} />
          <StatTile rotulo="Candidaturas de representante" valor={dados.totais.candidaturas} />
        </div>

        <div className="mt-6">
          <BarList
            titulo="Funil — do acesso ao contato"
            dados={dados.funil}
            vazio="Ainda sem sessões registradas."
          />
        </div>

        <div className="mt-6 rounded-2xl border border-line p-6">
          <h3 className="font-display text-lg">Eventos por dia (14 dias)</h3>
          <div className="mt-6">
            <EvolucaoDiaria dados={dados.evolucaoDiaria} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <BarList
            titulo="Produtos mais vistos"
            dados={dados.produtosMaisVistos}
            vazio="Ainda sem visualizações registradas."
          />
          <BarList
            titulo="Produtos que mais geram contato"
            dados={dados.produtosMaisProcurados}
            vazio="Ainda sem cliques de WhatsApp com produto associado."
          />
          <BarList
            titulo="Representantes mais contatados"
            dados={dados.representantesMaisContatados}
            vazio="Ainda sem contatos de WhatsApp registrados."
          />
          <BarList
            titulo="Representantes mais seguidos (Instagram)"
            dados={dados.representantesMaisSeguidos}
            vazio="Ainda sem cliques de Instagram registrados."
          />
          <BarList
            titulo="Páginas mais vistas"
            dados={dados.paginasMaisVistas}
            vazio="Ainda sem navegação registrada."
          />
          <BarList
            titulo="Origem do tráfego"
            dados={origem}
            vazio="Ainda sem dados de origem."
          />
          <BarList
            titulo="Estado de acesso (por IP)"
            dados={dados.estadosDeAcesso}
            vazio="Sem dados de localização ainda — só disponível quando o site está publicado (a Vercel injeta a região, local não tem)."
          />
          <BarList
            titulo="Cidade de acesso (por IP)"
            dados={dados.cidadesDeAcesso}
            vazio="Sem dados de cidade ainda — só disponível quando o site está publicado."
          />
        </div>
        <p className="mt-2 text-xs text-muted">
          Cidade, CEP e coordenadas vêm do IP, sem pedir permissão de
          localização a ninguém — por isso são aproximados (nível de cidade,
          não endereço exato). Clique numa cidade pra abrir a coordenada no
          mapa.
        </p>

        <div className="mt-10 rounded-2xl border border-line p-6">
          <h3 className="font-display text-lg">Candidaturas de representante</h3>
          {dados.candidaturas.length === 0 ? (
            <p className="mt-3 text-sm text-muted">Nenhuma candidatura recebida ainda.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
                    <th className="px-3 py-2">Nome</th>
                    <th className="px-3 py-2">Contato</th>
                    <th className="px-3 py-2">Local</th>
                    <th className="px-3 py-2">Recebido em</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.candidaturas.map((c) => (
                    <tr key={c.id} className="border-b border-line last:border-0 align-top">
                      <td className="px-3 py-2">{c.nome}</td>
                      <td className="px-3 py-2">
                        <div>{c.email}</div>
                        <div className="text-muted">{c.whatsapp}</div>
                      </td>
                      <td className="px-3 py-2">
                        {c.cidade} · {c.estado}
                      </td>
                      <td className="px-3 py-2 text-muted">{c.criado_em}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
