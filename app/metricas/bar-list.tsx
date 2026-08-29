import type { Contagem } from "@/lib/metrics/queries";

export function BarList({
  titulo,
  dados,
  vazio,
}: {
  titulo: string;
  dados: Contagem[];
  vazio: string;
}) {
  const max = Math.max(1, ...dados.map((d) => d.total));

  return (
    <div className="rounded-2xl border border-line p-6">
      <h3 className="font-display text-lg">{titulo}</h3>
      {dados.length === 0 ? (
        <p className="mt-3 text-sm text-muted">{vazio}</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {dados.map((d) => (
            <li key={d.chave}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="truncate">{d.rotulo || d.chave}</span>
                <span className="shrink-0 font-medium">{d.total}</span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-background-alt">
                <div
                  className="h-full rounded-full bg-foreground"
                  style={{ width: `${(d.total / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
