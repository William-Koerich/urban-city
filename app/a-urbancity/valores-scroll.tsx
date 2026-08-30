"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Valor = { titulo: string; texto: string };

/**
 * Cada card entra com um deslocamento contínuo ligado à posição do scroll
 * (scrub), não a um gatilho único como o `Reveal` (Motion) usado no resto do
 * site — é o efeito que o GSAP faz melhor e que justifica ter a lib só aqui.
 * Sem `pin`: mais seguro/previsível sem poder testar em um navegador real.
 */
export function ValoresScroll({ valores }: { valores: Valor[] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) return;

      const cards = gsap.utils.toArray<HTMLElement>(".valor-card", container.current);

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -48 : 48 },
          {
            opacity: 1,
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 55%",
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
      {valores.map((valor) => (
        <div key={valor.titulo} className="valor-card">
          <h3 className="font-display text-xl">{valor.titulo}</h3>
          <p className="mt-2 text-sm text-muted">{valor.texto}</p>
        </div>
      ))}
    </div>
  );
}
