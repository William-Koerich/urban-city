import "server-only";
import { createClient, type Client } from "@libsql/client";
import path from "node:path";
import fs from "node:fs";

/**
 * Banco de métricas (visualizações, cliques de WhatsApp/Instagram,
 * candidaturas de representante, sessões, navegação).
 *
 * Usa `@libsql/client`, que fala o MESMO SQL do SQLite mas funciona em dois
 * modos com a mesma API:
 *
 * - Sem `TURSO_DATABASE_URL` configurado: abre um arquivo local
 *   (`data/metrics.sqlite`) — zero configuração, ótimo pra dev.
 * - Com `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` configurados: conecta num
 *   banco Turso (libSQL hospedado) — é o que faz os dados **persistirem em
 *   produção na Vercel**, já que o filesystem lá é efêmero/read-only e um
 *   arquivo local se perde a cada deploy/invocação.
 *
 * Crie o banco em https://turso.tech (free tier), rode `turso db show
 * <nome> --url` e `turso db tokens create <nome>` pra pegar os dois valores.
 */

const LOCAL_DB_PATH = path.join(process.cwd(), "data", "metrics.sqlite");

function criarConexao(): Client {
  const tursoUrl = process.env.TURSO_DATABASE_URL;

  if (tursoUrl) {
    return createClient({
      url: tursoUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }

  const dir = path.dirname(LOCAL_DB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return createClient({ url: `file:${LOCAL_DB_PATH}` });
}

// `next dev` recarrega módulos a cada mudança — guardamos a conexão em
// `globalThis` pra não abrir uma nova a cada reload.
const globalForDb = globalThis as unknown as {
  __urbancityDb?: Client;
  __urbancitySchema?: Promise<void>;
};

function getClient(): Client {
  if (!globalForDb.__urbancityDb) {
    globalForDb.__urbancityDb = criarConexao();
  }
  return globalForDb.__urbancityDb;
}

// Colunas adicionadas depois da primeira versão do schema. `CREATE TABLE IF
// NOT EXISTS` não afeta uma tabela que já existe, então bancos criados antes
// (o Turso já em uso, por exemplo) precisam desse `ALTER TABLE` pra ganhar
// as colunas novas — daí o try/catch ignorando "coluna já existe".
const MIGRACOES_EVENTOS = [
  "ALTER TABLE eventos ADD COLUMN sessao_id TEXT",
  "ALTER TABLE eventos ADD COLUMN pagina TEXT",
  "ALTER TABLE eventos ADD COLUMN detalhe TEXT",
  "ALTER TABLE eventos ADD COLUMN geo_pais TEXT",
  "ALTER TABLE eventos ADD COLUMN geo_estado TEXT",
  "ALTER TABLE eventos ADD COLUMN geo_cidade TEXT",
  "ALTER TABLE eventos ADD COLUMN geo_cep TEXT",
  "ALTER TABLE eventos ADD COLUMN geo_lat TEXT",
  "ALTER TABLE eventos ADD COLUMN geo_lon TEXT",
];

async function criarSchema(db: Client): Promise<void> {
  // Índices aqui só cobrem colunas que já existem desde a v1 do schema.
  // Colunas adicionadas depois (sessao_id, geo_*) ganham índice só no final
  // desta função — só depois que a migração abaixo garante que elas existem
  // (numa tabela pré-existente, `CREATE TABLE IF NOT EXISTS` é um no-op e não
  // adiciona as colunas novas, então indexá-las aqui falharia).
  await db.executeMultiple(`
    CREATE TABLE IF NOT EXISTS eventos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT NOT NULL,
      pagina TEXT,
      produto_slug TEXT,
      produto_nome TEXT,
      representante_id TEXT,
      representante_nome TEXT,
      detalhe TEXT,
      origem TEXT,
      sessao_id TEXT,
      geo_pais TEXT,
      geo_estado TEXT,
      geo_cidade TEXT,
      geo_cep TEXT,
      geo_lat TEXT,
      geo_lon TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_eventos_tipo ON eventos(tipo);
    CREATE INDEX IF NOT EXISTS idx_eventos_produto_slug ON eventos(produto_slug);
    CREATE INDEX IF NOT EXISTS idx_eventos_representante_id ON eventos(representante_id);
    CREATE INDEX IF NOT EXISTS idx_eventos_criado_em ON eventos(criado_em);

    CREATE TABLE IF NOT EXISTS candidaturas_representante (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      cidade TEXT NOT NULL,
      estado TEXT NOT NULL,
      mensagem TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  for (const sql of MIGRACOES_EVENTOS) {
    try {
      await db.execute(sql);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (!/duplicate column/i.test(msg)) throw err;
    }
  }

  // Agora sim — sessao_id existe de um jeito ou de outro (CREATE TABLE numa
  // base nova, ou ALTER TABLE acima numa base pré-existente).
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_eventos_sessao_id ON eventos(sessao_id)`);
}

/** Conexão pronta pra uso — schema já garantido (idempotente, uma vez por processo). */
export async function getDb(): Promise<Client> {
  const db = getClient();
  if (!globalForDb.__urbancitySchema) {
    globalForDb.__urbancitySchema = criarSchema(db).catch((err) => {
      // Não deixa um erro transitório (ex.: Turso momentaneamente fora do
      // ar) travar o processo pra sempre num estado quebrado — a próxima
      // chamada tenta de novo em vez de repetir o mesmo erro pra sempre.
      globalForDb.__urbancitySchema = undefined;
      throw err;
    });
  }
  await globalForDb.__urbancitySchema;
  return db;
}
