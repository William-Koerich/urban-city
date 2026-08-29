import type { Metadata } from "next";
import { Container } from "@/app/components/ui/container";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { PlaceholderImage } from "@/app/components/ui/placeholder-image";
import { Reveal } from "@/app/components/motion/reveal";
import { ValoresScroll } from "@/app/a-urbancity/valores-scroll";

export const metadata: Metadata = {
  title: "A UrbanCity",
  description:
    "História, estrutura fabril, valores e diferenciais da Urban City.",
};

const valores = [
  {
    titulo: "Fábrica própria",
    texto:
      "Do corte à costura, controlamos cada etapa da produção — sem intermediários entre o tecido e a peça final.",
  },
  {
    titulo: "Produto real",
    texto:
      "Cada item do catálogo existe fisicamente, com referência, grade e ficha técnica, antes de virar conteúdo do site.",
  },
  {
    titulo: "Rede comercial",
    texto:
      "Representantes em todo o país que conhecem a coleção e atendem lojistas de perto, praça por praça.",
  },
];

export default function AUrbanCityPage() {
  return (
    <>
      <section className="border-b border-line py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Nossa história"
            title="Uma marca construída de dentro da fábrica para fora"
            description="A Urban City nasceu do chão de fábrica, não de uma planilha de tendências. Cada coleção começa no tecido e na modelagem, testada na prática antes de chegar ao catálogo."
          />
        </Container>
      </section>

      <section className="border-b border-line py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <PlaceholderImage
              seed="fabrica"
              label="Estrutura fabril"
              className="aspect-4/3 rounded-2xl"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl">Estrutura fabril</h2>
            <p className="mt-4 text-muted">
              Produção verticalizada: modelagem, corte, costura e
              acabamento acontecem sob o mesmo teto. Isso encurta o
              caminho entre o design e a peça pronta, e é o que permite
              cadastrar cada produto do catálogo já com referência, cor,
              tamanho e grade reais — prontos para virar pedido quando a
              loja de representantes ou o carrinho de compras entrarem no
              ar.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="O que nos diferencia" title="Valores" />
          <ValoresScroll valores={valores} />
        </Container>
      </section>
    </>
  );
}
