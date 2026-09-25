"use client";

import { Check } from "lucide-react";
import type { Plan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useDemo } from "./demo-provider";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function MembershipCard({ plan }: { plan: Plan }) {
  const { openPlan } = useDemo();
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-lg border p-6 transition-colors duration-200 sm:p-8",
        plan.highlighted
          ? "border-brand/60 bg-surface"
          : "border-border bg-bg-2 hover:border-border-strong",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-sans text-xs font-semibold tracking-[0.16em] text-fg-2 uppercase">{plan.name}</h3>
        {plan.highlighted && <Badge tone="brand">Most chosen</Badge>}
      </div>
      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-sm text-fg-2">EGP</span>
        <span className="font-display text-[40px] leading-none font-semibold tracking-tight tabular">
          {plan.priceMonthly.toLocaleString("en-US")}
        </span>
        <span className="text-sm text-fg-2">/ Month</span>
      </p>
      <p className="mt-4 text-sm leading-relaxed text-fg-2">{plan.summary}</p>
      <ul className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <Check className={cn("size-4 shrink-0", plan.highlighted ? "text-brand-soft" : "text-fg-2")} aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <Button
        variant={plan.highlighted ? "primary" : "secondary"}
        className="mt-8 w-full"
        onClick={() => openPlan(plan.id)}
        aria-label={`View ${plan.name} plan details`}
      >
        View Plan
      </Button>
    </article>
  );
}
