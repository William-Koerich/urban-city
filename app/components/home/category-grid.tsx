import Link from "next/link";
import { Container } from "@/app/components/ui/container";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { PlaceholderImage } from "@/app/components/ui/placeholder-image";
import { getCategorias } from "@/lib/data/products";

export function CategoryGrid() {
  const categorias = getCategorias();

  return (
    <section className="bg-background-alt py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Categorias" title="Acesso rápido" />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categorias.map((categoria) => (
            <Link
              key={categoria}
              href={`/catalogo?categoria=${encodeURIComponent(categoria)}`}
              className="group"
            >
              <PlaceholderImage
                seed={categoria}
                className="aspect-square rounded-xl transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <p className="mt-2 text-sm">{categoria}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
