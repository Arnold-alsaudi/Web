import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-45 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-[#e6e1d8]",
  secondary: "border border-border-strong bg-transparent text-fg hover:border-[#4a4a52] hover:bg-surface",
  ghost: "text-fg-2 hover:text-fg hover:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function buttonClasses({ variant = "primary", size = "md", className }: Omit<CommonProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  loading,
  icon,
  children,
  className,
  disabled,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "children">) {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : null}
      {children}
      {!loading && icon}
    </button>
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  icon,
  children,
  className,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<"a">, "href" | "children">) {
  return (
    <Link href={href} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {icon}
    </Link>
  );
}
