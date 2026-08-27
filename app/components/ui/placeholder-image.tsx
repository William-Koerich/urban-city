import { hashHue } from "@/lib/utils";

/**
 * Substitui a foto real do produto enquanto o banco de imagens da fábrica
 * não é integrado. Gera uma cor determinística a partir de `seed` (mesma
 * peça/cor sempre cai na mesma tonalidade) e mostra a legenda por cima, para
 * deixar claro que é um placeholder — não um bug de imagem quebrada.
 */
export function PlaceholderImage({
  seed,
  label,
  className = "",
}: {
  seed: string;
  label?: string;
  className?: string;
}) {
  const hue = hashHue(seed);
  return (
    <div
      className={`relative flex items-end overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(155deg, hsl(${hue} 22% 88%), hsl(${hue} 30% 74%) 60%, hsl(${hue} 26% 62%))`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 14px)",
        }}
      />
      {label && (
        <span className="relative m-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
          {label}
        </span>
      )}
    </div>
  );
}
