import { BarChart3, CalendarCheck, CalendarClock, Dumbbell, IdCard, UserRound, type LucideIcon } from "lucide-react";
import type { Feature, FeatureIcon } from "@/lib/types";

const ICONS: Record<FeatureIcon, LucideIcon> = {
  memberships: IdCard,
  attendance: CalendarCheck,
  profiles: UserRound,
  renewals: CalendarClock,
  trainers: Dumbbell,
  reports: BarChart3,
};

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = ICONS[feature.icon];
  return (
    <article className="flex h-full flex-col bg-bg p-6 transition-colors duration-200 hover:bg-bg-2 sm:p-8">
      <span className="grid size-9 place-items-center rounded-sm border border-border text-brand-soft">
        <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="mt-6 font-sans text-base font-semibold tracking-normal">{feature.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-2">{feature.description}</p>
      <p className="mt-auto pt-6 text-[13px] text-muted">{feature.detail}</p>
    </article>
  );
}
