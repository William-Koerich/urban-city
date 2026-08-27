import Link from "next/link";
import type { Produto } from "@/lib/types";
import { PlaceholderImage } from "@/app/components/ui/placeholder-image";

export function ProductCard({ produto }: { produto: Produto }) {
  return (
    <Link href={`/catalogo/${produto.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
        <PlaceholderImage
          seed={produto.id}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        {produto.destaque && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-accent-foreground">
            Destaque
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {produto.cores.map((cor) => (
            <span
              key={cor.nome}
              title={cor.nome}
              className="h-4 w-4 rounded-full ring-1 ring-background/70"
              style={{ backgroundColor: cor.hex }}
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm text-foreground">{produto.nome}</p>
          <p className="text-xs text-muted">{produto.categoria}</p>
        </div>
        <p className="whitespace-nowrap text-xs text-muted">
          {produto.referencia}
        </p>
      </div>
    </Link>
  );
}
