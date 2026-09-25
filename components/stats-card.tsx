import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { Stat } from "@/lib/types";
import { cn } from "@/lib/utils";

const trendIcon = { up: ArrowUpRight, down: ArrowDownRight, flat: Minus };

export function StatsCard({ stat, compact = false }: { stat: Stat; compact?: boolean }) {
  const Icon = trendIcon[stat.trend];
  return (
    <div className={cn("flex flex-col rounded-md border border-border bg-surface", compact ? "gap-2 p-3.5" : "gap-3 p-4 sm:p-5")}>
      <p className={cn("text-fg-2", compact ? "text-[11px]" : "text-xs")}>{stat.label}</p>
      <p className={cn("font-display font-semibold tracking-tight whitespace-nowrap tabular", compact ? "text-lg sm:text-xl" : "text-[22px] leading-none sm:text-[26px]")}>
        {stat.value}
      </p>
      <p className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-muted", compact ? "text-[10px]" : "text-[11px]")}>
        <span className={cn("inline-flex items-center gap-0.5 font-medium whitespace-nowrap", stat.trend === "down" ? "text-danger" : "text-ok")}>
          <Icon className="size-3" aria-hidden />
          {stat.change}
        </span>
        <span>{stat.hint}</span>
      </p>
    </div>
  );
}
