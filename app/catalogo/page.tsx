import type { Metadata } from "next";
import { Container } from "@/app/components/ui/container";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { ProductCard } from "@/app/components/product/product-card";
import { CatalogFilters } from "@/app/catalogo/catalog-filters";
import {
  produtos,
  getCategorias,
  getColecoes,
  getGeneros,
  getCores,
} from "@/lib/data/products";
import { filtrarProdutos, type CatalogParams } from "@/lib/catalog-filters";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Catálogo Urban City — filtre por categoria, coleção, gênero e cor.",
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<CatalogParams>;
}) {
  const params = await searchParams;
  const resultado = filtrarProdutos(produtos, params);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Catálogo"
          title="Todas as peças"
          description="Cada item aqui é um produto real, com referência e grade próprias — cadastrado exatamente como sai da fábrica."
        />

        <div className="mt-10 border-y border-line py-6">
          <CatalogFilters
            params={params}
            categorias={getCategorias()}
            colecoes={getColecoes()}
            generos={getGeneros()}
            cores={getCores()}
          />
        </div>

        {resultado.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {resultado.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-muted">
            Nenhuma peça encontrada com esses filtros.
          </p>
        )}
      </Container>
    </section>
  );
}
