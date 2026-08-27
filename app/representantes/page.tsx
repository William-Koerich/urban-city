import type { Metadata } from "next";
import { Container } from "@/app/components/ui/container";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { RepFinder } from "@/app/representantes/rep-finder";
import { representantes, getRegioes, getEstados } from "@/lib/data/representatives";

export const metadata: Metadata = {
  title: "Representantes",
  description:
    "Encontre o representante Urban City da sua região e fale direto por WhatsApp ou Instagram.",
};

export default function RepresentantesPage() {
  return (
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
          />
        </div>
      </Container>
    </section>
  );
}
