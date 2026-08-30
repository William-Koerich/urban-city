import "server-only";
import type { Client, Row } from "@libsql/client";
import { getDb } from "@/lib/db";

export type Contagem = {
  chave: string;
  rotulo: string;
  total: number;
  href?: string;
};

function paraContagem(row: Row): Contagem {
  return {
    chave: String(row.chave ?? ""),
    rotulo: row.rotulo != null ? String(row.rotulo) : String(row.chave ?? ""),
    total: Number(row.total),
  };
}

async function contarPorTipo(db: Client): Promise<Record<string, number>> {
  const { rows } = await db.execute(`SELECT tipo, COUNT(*) as total FROM eventos GROUP BY tipo`);
  return Object.fromEntries(rows.map((r) => [String(r.tipo), Number(r.total)]));
}

async function topProdutos(db: Client, tipo: string, limite = 8): Promise<Contagem[]> {
  const { rows } = await db.execute({
    sql: `SELECT produto_slug as chave, produto_nome as rotulo, COUNT(*) as total
          FROM eventos
          WHERE tipo = ? AND produto_slug IS NOT NULL
          GROUP BY produto_slug
          ORDER BY total DESC
          LIMIT ?`,
    args: [tipo, limite],
  });
  return rows.map(paraContagem);
}

async function topRepresentantes(db: Client, tipos: string[], limite = 8): Promise<Contagem[]> {
  const placeholders = tipos.map(() => "?").join(",");
  const { rows } = await db.execute({
    sql: `SELECT representante_id as chave, representante_nome as rotulo, COUNT(*) as total
          FROM eventos
          WHERE tipo IN (${placeholders}) AND representante_id IS NOT NULL
          GROUP BY representante_id
          ORDER BY total DESC
          LIMIT ?`,
    args: [...tipos, limite],
  });
  return rows.map(paraContagem);
}

async function porOrigem(db: Client): Promise<Contagem[]> {
  const { rows } = await db.execute(
    `SELECT COALESCE(origem, 'desconhecido') as chave, COUNT(*) as total
     FROM eventos
     GROUP BY chave
     ORDER BY total DESC`
  );
  return rows.map((r) => ({ chave: String(r.chave), rotulo: String(r.chave), total: Number(r.total) }));
}

async function porDia(db: Client, dias = 14): Promise<{ dia: string; total: number }[]> {
  const { rows } = await db.execute({
    sql: `SELECT date(criado_em) as dia, COUNT(*) as total
          FROM eventos
          WHERE criado_em >= date('now', ?)
          GROUP BY dia
          ORDER BY dia`,
    args: [`-${dias} days`],
  });
  return rows.map((r) => ({ dia: String(r.dia), total: Number(r.total) }));
}

export type Candidatura = {
  id: number;
  nome: string;
  email: string;
  whatsapp: string;
  cidade: string;
  estado: string;
  mensagem: string | null;
  criado_em: string;
};

function paraCandidatura(row: Row): Candidatura {
  return {
    id: Number(row.id),
    nome: String(row.nome),
    email: String(row.email),
    whatsapp: String(row.whatsapp),
    cidade: String(row.cidade),
    estado: String(row.estado),
    mensagem: row.mensagem != null ? String(row.mensagem) : null,
    criado_em: String(row.criado_em),
  };
}

async function candidaturasRecentes(db: Client, limite = 20): Promise<Candidatura[]> {
  const { rows } = await db.execute({
    sql: `SELECT * FROM candidaturas_representante ORDER BY criado_em DESC LIMIT ?`,
    args: [limite],
  });
  return rows.map(paraCandidatura);
}

async function contarCandidaturas(db: Client): Promise<number> {
  const { rows } = await db.execute(`SELECT COUNT(*) as total FROM candidaturas_representante`);
  return Number(rows[0]?.total ?? 0);
}

async function contarSessoes(db: Client): Promise<number> {
  const { rows } = await db.execute(
    `SELECT COUNT(DISTINCT sessao_id) as total FROM eventos WHERE sessao_id IS NOT NULL`
  );
  return Number(rows[0]?.total ?? 0);
}

async function paginasMaisVistas(db: Client, limite = 8): Promise<Contagem[]> {
  const { rows } = await db.execute({
    sql: `SELECT pagina as chave, pagina as rotulo, COUNT(*) as total
          FROM eventos
          WHERE tipo = 'pagina_vista' AND pagina IS NOT NULL
          GROUP BY pagina
          ORDER BY total DESC
          LIMIT ?`,
    args: [limite],
  });
  return rows.map(paraContagem);
}

async function porEstadoGeo(db: Client, limite = 10): Promise<Contagem[]> {
  const { rows } = await db.execute({
    sql: `SELECT
            COALESCE(geo_estado, geo_pais) as chave,
            COALESCE(geo_estado || ' (' || geo_pais || ')', geo_pais) as rotulo,
            COUNT(DISTINCT sessao_id) as total
          FROM eventos
          WHERE geo_estado IS NOT NULL OR geo_pais IS NOT NULL
          GROUP BY chave
          ORDER BY total DESC
          LIMIT ?`,
    args: [limite],
  });
  return rows.map(paraContagem);
}

/**
 * Cidade é o nível mais fino que dá pra ter sem pedir permissão de
 * localização ao visitante — junto com CEP e lat/lon (achados por sessão via
 * MIN, já que toda visita da mesma cidade cai nas mesmas coordenadas do
 * IP), o suficiente pra plotar num mapa depois, se quiser.
 */
async function porCidade(db: Client, limite = 10): Promise<Contagem[]> {
  const { rows } = await db.execute({
    sql: `SELECT
            geo_cidade as cidade,
            geo_estado as estado,
            MIN(geo_cep) as cep,
            MIN(geo_lat) as lat,
            MIN(geo_lon) as lon,
            COUNT(DISTINCT sessao_id) as total
          FROM eventos
          WHERE geo_cidade IS NOT NULL
          GROUP BY geo_cidade, geo_estado
          ORDER BY total DESC
          LIMIT ?`,
    args: [limite],
  });
  return rows.map((r) => {
    const cidade = String(r.cidade);
    const estado = r.estado != null ? String(r.estado) : undefined;
    const lat = r.lat != null ? String(r.lat) : undefined;
    const lon = r.lon != null ? String(r.lon) : undefined;
    const cep = r.cep != null ? String(r.cep) : undefined;
    return {
      chave: `${cidade}-${estado ?? ""}`,
      rotulo: `${cidade}${estado ? ` · ${estado}` : ""}${cep ? ` · ${cep}` : ""}`,
      total: Number(r.total),
      href: lat && lon ? `https://www.google.com/maps?q=${lat},${lon}` : undefined,
    };
  });
}

export async function getMetricas() {
  const db = await getDb();
  const porTipo = await contarPorTipo(db);

  const [
    produtosMaisVistos,
    produtosMaisProcurados,
    representantesMaisContatados,
    representantesMaisSeguidos,
    origemTrafego,
    evolucaoDiaria,
    candidaturas,
    totalCandidaturas,
    sessoes,
    paginasVistas,
    estadosDeAcesso,
    cidadesDeAcesso,
  ] = await Promise.all([
    topProdutos(db, "visualizacao_produto"),
    topProdutos(db, "whatsapp_produto"),
    topRepresentantes(db, ["whatsapp_produto", "whatsapp_generico"]),
    topRepresentantes(db, ["instagram_representante"]),
    porOrigem(db),
    porDia(db),
    candidaturasRecentes(db),
    contarCandidaturas(db),
    contarSessoes(db),
    paginasMaisVistas(db),
    porEstadoGeo(db),
    porCidade(db),
  ]);

  const visualizacoes = porTipo["visualizacao_produto"] ?? 0;
  const contatosWhatsapp = (porTipo["whatsapp_produto"] ?? 0) + (porTipo["whatsapp_generico"] ?? 0);

  return {
    totais: {
      sessoes,
      visualizacoes,
      contatosWhatsapp,
      cliquesInstagram: porTipo["instagram_representante"] ?? 0,
      candidaturas: totalCandidaturas,
    },
    funil: [
      { chave: "sessoes", rotulo: "Sessões", total: sessoes },
      { chave: "visualizacoes", rotulo: "Viram algum produto", total: visualizacoes },
      { chave: "contatos", rotulo: "Chamaram no WhatsApp", total: contatosWhatsapp },
      { chave: "candidaturas", rotulo: "Candidataram-se a representante", total: totalCandidaturas },
    ] satisfies Contagem[],
    produtosMaisVistos,
    produtosMaisProcurados,
    representantesMaisContatados,
    representantesMaisSeguidos,
    origemTrafego,
    paginasMaisVistas: paginasVistas,
    estadosDeAcesso,
    cidadesDeAcesso,
    evolucaoDiaria,
    candidaturas,
  };
}
