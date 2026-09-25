import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DemoTag } from "./ui/badge";

/** App-window chrome used around every product preview. */
export function WindowFrame({
  title,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-bg-2 shadow-2xl shadow-black/40", className)}>
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#2e2e35]" />
          <span className="size-2.5 rounded-full bg-[#2e2e35]" />
          <span className="size-2.5 rounded-full bg-[#2e2e35]" />
        </div>
        <p className="truncate text-[11px] text-muted">{title}</p>
        <DemoTag className="ml-auto" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
