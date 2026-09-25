import { BRAND } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6", className)} aria-hidden>
      <rect x="1" y="1" width="22" height="22" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6.5" y="6" width="3" height="12" rx="1" fill="currentColor" />
      <rect x="11.5" y="10" width="6" height="3" rx="1" fill="#8B6F47" />
    </svg>
  );
}

export function Logo({ withProduct = true }: { withProduct?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <LogoMark className="text-fg" />
      <span className="font-display text-[15px] font-bold tracking-[0.08em] text-fg">{BRAND.name}</span>
      {withProduct && (
        <span className="hidden border-l border-border-strong pl-2.5 text-[10px] font-medium tracking-[0.16em] text-muted sm:inline">
          {BRAND.product}
        </span>
      )}
    </span>
  );
}
