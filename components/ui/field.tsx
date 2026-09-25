import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const control =
  "h-11 w-full rounded-sm border border-border bg-bg px-3.5 text-sm text-fg placeholder:text-muted " +
  "transition-[border-color,background-color] duration-150 hover:border-border-strong " +
  "focus:border-brand-soft focus:outline-none focus-visible:outline-none " +
  "aria-[invalid=true]:border-danger disabled:cursor-not-allowed disabled:opacity-50";

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-fg-2">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={cn(control, className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "appearance-none pr-10", className)} {...rest}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted" aria-hidden />
    </div>
  );
}
