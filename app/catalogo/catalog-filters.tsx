import Link from "next/link";
import {
  isFacetActive,
  toggleFacetHref,
  hasActiveFilters,
  getActiveChips,
  type CatalogParams,
  type Facet,
} from "@/lib/catalog-filters";

const FACET_LABEL: Record<Facet, string> = {
  categoria: "Categoria",
  colecao: "Coleção",
  genero: "Gênero",
  cor: "Cor",
};

function Pill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-line text-foreground/80 hover:border-foreground/50"
      }`}
    >
      {children}
    </Link>
  );
}

function FilterGroup({
  label,
  facet,
  options,
  params,
}: {
  label: string;
  facet: Facet;
  options: string[];
  params: CatalogParams;
}) {
  if (options.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <Pill
            key={option}
            href={toggleFacetHref(params, facet, option)}
            active={isFacetActive(params, facet, option)}
          >
            {option}
          </Pill>
        ))}
      </div>
    </div>
  );
}

function CorGroup({
  cores,
  params,
}: {
  cores: { nome: string; hex: string }[];
  params: CatalogParams;
}) {
  if (cores.length === 0) return null;
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
        Cor
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {cores.map(({ nome, hex }) => {
          const active = isFacetActive(params, "cor", nome);
          return (
            <Link
              key={nome}
              href={toggleFacetHref(params, "cor", nome)}
              scroll={false}
              title={nome}
              aria-label={nome}
              aria-pressed={active}
              className="group flex flex-col items-center gap-1.5"
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-inset ring-black/10 transition-shadow ${
                  active
                    ? "ring-2 ring-offset-2 ring-offset-background ring-accent"
                    : "group-hover:ring-black/25"
                }`}
                style={{ backgroundColor: hex }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function FiltersBody({
  params,
  categorias,
  colecoes,
  generos,
  cores,
}: {
  params: CatalogParams;
  categorias: string[];
  colecoes: string[];
  generos: string[];
  cores: { nome: string; hex: string }[];
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-6">
      <FilterGroup
        label="Categoria"
        facet="categoria"
        options={categorias}
        params={params}
      />
      <FilterGroup
        label="Coleção"
        facet="colecao"
        options={colecoes}
        params={params}
      />
      <FilterGroup
        label="Gênero"
        facet="genero"
        options={generos}
        params={params}
      />
      <CorGroup cores={cores} params={params} />
    </div>
  );
}

export function CatalogFilters({
  params,
  categorias,
  colecoes,
  generos,
  cores,
  total,
}: {
  params: CatalogParams;
  categorias: string[];
  colecoes: string[];
  generos: string[];
  cores: { nome: string; hex: string }[];
  total: number;
}) {
  const chips = getActiveChips(params);
  const body = (
    <FiltersBody
      params={params}
      categorias={categorias}
      colecoes={colecoes}
      generos={generos}
      cores={cores}
    />
  );

  return (
    <div className="rounded-2xl border border-line bg-background-alt/60">
      {/* Cabeçalho: contagem + limpar — sempre visível, dentro ou fora do <details> */}
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
        <p className="text-sm text-foreground/85">
          <span className="font-medium">{total}</span>{" "}
          {total === 1 ? "peça encontrada" : "peças encontradas"}
        </p>
        {hasActiveFilters(params) && (
          <Link
            href="/catalogo"
            scroll={false}
            className="shrink-0 text-xs uppercase tracking-wide text-muted underline underline-offset-2 hover:text-foreground"
          >
            Limpar filtros
          </Link>
        )}
      </div>

      {/* Chips dos filtros ativos — visíveis com o painel fechado no mobile */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-line px-5 py-4 sm:hidden">
          {chips.map((chip) => (
            <Link
              key={`${chip.facet}-${chip.value}`}
              href={chip.href}
              scroll={false}
              className="flex items-center gap-1.5 rounded-full bg-foreground py-1.5 pl-3 pr-2 text-xs text-background"
            >
              <span className="text-background/70">{FACET_LABEL[chip.facet]}:</span>{" "}
              {chip.value}
              <span aria-hidden="true" className="text-background/70">
                ×
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile: painel recolhível, sem depender de JS (<details> nativo) */}
      <details className="group border-t border-line sm:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground/85">
          Filtros
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform group-open:rotate-180"
            aria-hidden="true"
          >
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>
        <div className="px-5 pb-5">{body}</div>
      </details>

      {/* Desktop: sempre visível, sem recolher */}
      <div className="hidden border-t border-line px-6 py-5 sm:block">
        {body}
      </div>
    </div>
  );
}
