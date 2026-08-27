import type { Metadata } from "next";
import { Container } from "@/app/components/ui/container";
import { SectionHeading } from "@/app/components/ui/section-heading";
import { redesSociais } from "@/lib/data/nav";

export const metadata: Metadata = {
  title: "Contato",
  description: "Canais oficiais da Urban City: Instagram, LinkedIn e email.",
};

const descricoes: Record<string, string> = {
  Instagram: "Coleções, bastidores da fábrica e novidades do dia a dia.",
  LinkedIn: "Institucional, vagas e parcerias comerciais.",
  Email: "Para imprensa, parcerias e outros assuntos institucionais.",
};

export default function ContatoPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Fale com a gente"
          title="Canais oficiais"
          description="Para lojistas e representantes, veja a página de Representantes — aqui estão nossos canais institucionais."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {redesSociais.map((canal) => (
            <a
              key={canal.href}
              href={canal.href}
              target={canal.href.startsWith("http") ? "_blank" : undefined}
              rel={
                canal.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="rounded-2xl border border-line p-6 transition-colors hover:border-foreground/40"
            >
              <p className="font-display text-xl">{canal.label}</p>
              <p className="mt-2 text-sm text-muted">
                {descricoes[canal.label]}
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
