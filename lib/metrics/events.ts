import "server-only";
import { getDb } from "@/lib/db";

export const TIPOS_EVENTO = [
  "sessao_iniciada",
  "pagina_vista",
  "visualizacao_produto",
  "whatsapp_produto",
  "whatsapp_generico",
  "instagram_representante",
  "busca_representante",
  "candidatura_representante",
  "cookies_aceitos",
] as const;

export type TipoEvento = (typeof TIPOS_EVENTO)[number];

export type NovoEvento = {
  tipo: TipoEvento;
  pagina?: string;
  produtoSlug?: string;
  produtoNome?: string;
  representanteId?: string;
  representanteNome?: string;
  detalhe?: string;
  origem?: string;
  sessaoId?: string;
  geoPais?: string;
  geoEstado?: string;
  geoCidade?: string;
};

export async function registrarEvento(evento: NovoEvento): Promise<void> {
  const db = await getDb();
  await db.execute({
    sql: `INSERT INTO eventos
      (tipo, pagina, produto_slug, produto_nome, representante_id, representante_nome,
       detalhe, origem, sessao_id, geo_pais, geo_estado, geo_cidade)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      evento.tipo,
      evento.pagina ?? null,
      evento.produtoSlug ?? null,
      evento.produtoNome ?? null,
      evento.representanteId ?? null,
      evento.representanteNome ?? null,
      evento.detalhe ?? null,
      evento.origem ?? null,
      evento.sessaoId ?? null,
      evento.geoPais ?? null,
      evento.geoEstado ?? null,
      evento.geoCidade ?? null,
    ],
  });
}
