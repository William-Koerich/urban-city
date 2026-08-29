"use client";

import dynamic from "next/dynamic";

/**
 * `ssr:false` só é permitido a partir de um Client Component — por isso este
 * arquivo existe só pra isolar o dynamic import. A cena em si (Three.js) é
 * puramente decorativa, então nunca precisa existir no HTML enviado pelo
 * servidor; carregar só no cliente evita que o bundle do Three.js atrase o
 * primeiro paint da página.
 */
const HeroScene = dynamic(
  () => import("@/app/components/home/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

export function HeroSceneLoader() {
  return <HeroScene />;
}
