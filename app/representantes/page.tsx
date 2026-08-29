import type { Metadata } from "next";
import { Container } from "@/app/components/ui/container";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { RepFinder } from "@/app/representantes/rep-finder";
import { CandidaturaForm } from "@/app/representantes/candidatura-form";
import { representantes, getRegioes, getEstados } from "@/lib/data/representatives";
import { getProdutoPorSlug } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Representantes",
  description:
    "Encontre o representante Urban City da sua região e fale direto por WhatsApp ou Instagram.",
};

export default async function RepresentantesPage({
  searchParams,
}: {
  searchParams: Promise<{ produto?: string }>;
}) {
  const { produto: produtoSlug } = await searchParams;
  const produto = produtoSlug ? getProdutoPorSlug(produtoSlug) : undefined;

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Rede comercial"
            title="Encontre um representante"
            description="Busque por região, estado, cidade ou nome e fale direto pelo WhatsApp ou Instagram."
          />

          <div className="mt-10">
            <RepFinder
              representantes={representantes}
              regioes={getRegioes()}
              estados={getEstados()}
              produto={produto}
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-background-alt py-16 sm:py-24">
        <Container className="max-w-2xl">
          <SectionHeading
            eyebrow="Rede comercial"
            title="Quer ser um representante Urban City?"
            description="Esse é o único canal oficial de entrada para novos representantes — preencha os dados e nossa equipe entra em contato."
          />
          <div className="mt-8">
            <CandidaturaForm estados={getEstados()} />
          </div>
        </Container>
      </section>
    </>
  );
}
