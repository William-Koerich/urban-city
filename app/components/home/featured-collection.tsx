import { Container } from "@/app/components/ui/container";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { Button } from "@/app/components/ui/button";
import { ProductCard } from "@/app/components/product/product-card";
import { produtos } from "@/lib/data/products";

export function FeaturedCollection() {
  const destaques = produtos.filter((p) => p.destaque).slice(0, 4);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Destaques"
            title="Peças da coleção atual"
            description="Uma seleção do que está saindo da fábrica agora."
          />
          <Button href="/catalogo" variant="ghost" className="px-0">
            Ver catálogo completo →
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
          {destaques.map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
        </div>
      </Container>
    </section>
  );
}
