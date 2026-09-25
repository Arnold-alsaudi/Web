import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Tone = "neutral" | "brand" | "ok" | "warn" | "danger";

const tones: Record<Tone, string> = {
  neutral: "border-border-strong text-fg-2",
  brand: "border-brand/50 text-brand-soft bg-brand/10",
  ok: "border-ok/30 text-ok bg-ok/10",
  warn: "border-warn/30 text-warn bg-warn/10",
  danger: "border-danger/30 text-danger bg-danger/10",
};

export function Badge({
  tone = "neutral",
  dot = false,
  children,
  className,
}: {
  tone?: Tone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 rounded-sm border px-2 text-[11px] font-medium tracking-wide whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}

/** Small marker that makes it explicit a block uses invented data. */
export function DemoTag({ label = "DEMO DATA", className }: { label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-[4px] border border-dashed border-[#4a4a52] px-1.5",
        "text-[10px] font-semibold tracking-[0.12em] text-muted uppercase whitespace-nowrap",
        className,
      )}
      title="Invented data for demonstration only"
    >
      {label}
    </span>
  );
}
