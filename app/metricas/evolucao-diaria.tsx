export function EvolucaoDiaria({
  dados,
}: {
  dados: { dia: string; total: number }[];
}) {
  if (dados.length === 0) {
    return (
      <p className="text-sm text-muted">Sem eventos nos últimos 14 dias.</p>
    );
  }

  const max = Math.max(1, ...dados.map((d) => d.total));

  return (
    <div className="flex h-32 items-stretch gap-1">
      {dados.map((d) => (
        <div key={d.dia} className="group relative flex flex-1 items-end">
          <div
            className="w-full rounded-t bg-foreground/80 transition-colors group-hover:bg-accent"
            style={{ height: `${Math.max(4, (d.total / max) * 100)}%` }}
          />
          <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
            {d.dia.slice(5)} · {d.total}
          </span>
        </div>
      ))}
    </div>
  );
}
