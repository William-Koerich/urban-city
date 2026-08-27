import Link from "next/link";
import { Container } from "@/app/components/ui/container";
import { Button } from "@/app/components/ui/button";
import { navPrincipal } from "@/lib/data/nav";
import { MobileNav } from "@/app/components/layout/mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          className="font-display text-lg tracking-tight sm:text-xl"
        >
          Urban City
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navPrincipal.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <Button href="/representantes" variant="secondary">
            Encontrar representante
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
