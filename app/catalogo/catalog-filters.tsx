import Link from "next/link";
import {
  isFacetActive,
  toggleFacetHref,
  hasActiveFilters,
  type CatalogParams,
  type Facet,
} from "@/lib/catalog-filters";

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
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = isFacetActive(params, facet, option);
          return (
            <Link
              key={option}
              href={toggleFacetHref(params, facet, option)}
              scroll={false}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-line text-foreground/80 hover:border-foreground/50"
              }`}
            >
              {option}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CatalogFilters({
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
  cores: string[];
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
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
        <FilterGroup label="Cor" facet="cor" options={cores} params={params} />
      </div>

      {hasActiveFilters(params) && (
        <Link
          href="/catalogo"
          scroll={false}
          className="text-xs uppercase tracking-wide text-muted underline underline-offset-2 hover:text-foreground"
        >
          Limpar filtros
        </Link>
      )}
    </div>
  );
}
