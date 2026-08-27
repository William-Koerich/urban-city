import Link from "next/link";
import { Container } from "@/app/components/ui/container";
import { navPrincipal, navLegal, redesSociais } from "@/lib/data/nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background-alt">
      <Container className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-lg">Urban City</p>
          <p className="mt-3 max-w-[26ch] text-sm text-muted">
            Roupa feita na nossa própria fábrica, do tecido à etiqueta.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Navegue
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {navPrincipal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Contato
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {redesSociais.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Legal
          </p>
          <ul className="mt-4 flex flex-col gap-2">
            {navLegal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/80 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line py-5">
        <Container>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Urban City. Todos os direitos
            reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
