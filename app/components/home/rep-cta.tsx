import { Container } from "@/app/components/ui/container";
import { Button } from "@/app/components/ui/button";

export function RepCta() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-foreground px-8 py-12 text-background sm:flex-row sm:items-center sm:px-14">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl">
            Tem uma loja? Fale com o representante da sua região.
          </h2>
          <p className="mt-3 max-w-md text-background/70">
            Atendimento direto por WhatsApp e Instagram, com quem conhece a
            grade e o estoque da sua praça.
          </p>
        </div>
        <Button
          href="/representantes"
          className="!bg-background !text-foreground hover:!bg-background/90"
        >
          Encontrar representante
        </Button>
      </Container>
    </section>
  );
}
