import { Container } from "@/app/components/ui/container";
import { Button } from "@/app/components/ui/button";
import { PlaceholderImage } from "@/app/components/ui/placeholder-image";
import { produtos } from "@/lib/data/products";

export function Hero() {
  const vitrine = produtos.slice(0, 3);

  return (
    <section className="border-b border-line">
      <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Coleção Inverno 2026
          </p>
          <h1 className="font-display text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Roupa de verdade, feita na nossa própria fábrica.
          </h1>
          <p className="mt-6 max-w-md text-muted">
            Cada peça do catálogo já nasce como item comercial — referência,
            cor, tamanho e grade, exatamente como sai da linha de produção.
            Veja a coleção completa ou fale direto com o representante da sua
            região.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/catalogo">Ver catálogo</Button>
            <Button href="/representantes" variant="secondary">
              Falar com representante
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <PlaceholderImage
            seed={vitrine[0]?.id ?? "hero-1"}
            label={vitrine[0]?.nome}
            className="col-span-2 aspect-[16/10] rounded-2xl"
          />
          <PlaceholderImage
            seed={vitrine[1]?.id ?? "hero-2"}
            label={vitrine[1]?.nome}
            className="aspect-[4/5] rounded-2xl"
          />
          <PlaceholderImage
            seed={vitrine[2]?.id ?? "hero-3"}
            label={vitrine[2]?.nome}
            className="aspect-[4/5] rounded-2xl"
          />
        </div>
      </Container>
    </section>
  );
}
