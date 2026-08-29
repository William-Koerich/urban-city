"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * `template.tsx` remonta a cada navegação (diferente de `layout.tsx`), por
 * isso é o lugar certo pra uma transição de entrada de página. Fade + leve
 * subida, ~0,4s — rápido o bastante pra não atrapalhar quem está navegando
 * rápido, mas visível. Desliga sozinho se o usuário pedir menos movimento.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
