import type { Produto } from "@/lib/types";

export type CatalogParams = Record<string, string | string[] | undefined>;

const FACETS = ["categoria", "colecao", "genero", "cor"] as const;
export type Facet = (typeof FACETS)[number];

function toSingle(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parseList(value: string | string[] | undefined): string[] {
  const single = toSingle(value);
  return single ? single.split(",").filter(Boolean) : [];
}

export function filtrarProdutos(
  produtos: Produto[],
  params: CatalogParams
): Produto[] {
  const categorias = parseList(params.categoria);
  const colecoes = parseList(params.colecao);
  const generos = parseList(params.genero);
  const cores = parseList(params.cor);

  return produtos.filter((p) => {
    if (categorias.length && !categorias.includes(p.categoria)) return false;
    if (colecoes.length && !colecoes.includes(p.colecao)) return false;
    if (generos.length && !generos.includes(p.genero)) return false;
    if (cores.length && !p.cores.some((c) => cores.includes(c.nome)))
      return false;
    return true;
  });
}

export function isFacetActive(
  params: CatalogParams,
  facet: Facet,
  value: string
): boolean {
  return parseList(params[facet]).includes(value);
}

/** Constrói a URL do catálogo com `value` alternado dentro de `facet`, preservando os outros filtros ativos. */
export function toggleFacetHref(
  params: CatalogParams,
  facet: Facet,
  value: string
): string {
  const current = parseList(params[facet]);
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];

  const usp = new URLSearchParams();
  for (const key of FACETS) {
    const values = key === facet ? next : parseList(params[key]);
    if (values.length) usp.set(key, values.join(","));
  }
  const qs = usp.toString();
  return `/catalogo${qs ? `?${qs}` : ""}`;
}

export function hasActiveFilters(params: CatalogParams): boolean {
  return FACETS.some((facet) => parseList(params[facet]).length > 0);
}
