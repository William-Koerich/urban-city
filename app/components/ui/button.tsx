import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] transition-colors";

const variants = {
  primary: "bg-foreground text-background hover:bg-accent",
  secondary: "border border-foreground/25 text-foreground hover:border-foreground",
  ghost: "text-foreground hover:text-accent",
};

type Variant = keyof typeof variants;

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
