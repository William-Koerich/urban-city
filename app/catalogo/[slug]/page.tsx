import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/app/components/ui/container";
import { Button } from "@/app/components/ui/button";
import { ProductViewer } from "@/app/catalogo/[slug]/product-viewer";
import { produtos, getProdutoPorSlug } from "@/lib/data/products";

export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produto = getProdutoPorSlug(slug);
  if (!produto) return {};
  return {
    title: produto.nome,
    description: produto.descricao,
  };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produto = getProdutoPorSlug(slug);
  if (!produto) notFound();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <nav className="mb-8 text-xs text-muted">
          <Link href="/catalogo" className="hover:text-foreground">
            Catálogo
          </Link>{" "}
          / <span className="text-foreground/80">{produto.nome}</span>
        </nav>

        <ProductViewer produto={produto} />

        <div className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-line bg-background-alt p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/85">
            Quer essa peça na sua loja? Fale com o representante da sua
            região para condições e disponibilidade.
          </p>
          <Button
            href={`/representantes?produto=${produto.slug}`}
            variant="secondary"
            className="shrink-0"
          >
            Falar com representante
          </Button>
        </div>
      </Container>
    </section>
  );
}
