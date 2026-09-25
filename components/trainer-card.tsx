import type { Trainer } from "@/lib/types";
import { Badge } from "./ui/badge";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-2 transition-colors duration-200 hover:border-border-strong">
      {/* Placeholder portrait: the demo uses no photos of real people. */}
      <div
        className="relative grid aspect-[4/3] place-items-center border-b border-border bg-surface"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 14px, rgba(255,255,255,0.018) 14px 15px)",
        }}
      >
        <span className="font-display text-5xl font-semibold tracking-tight text-[#3a3a42]" aria-hidden>
          {trainer.initials}
        </span>
        <span className="absolute bottom-3 left-3 text-[10px] tracking-[0.12em] text-muted uppercase">Photo placeholder</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-sans text-base font-semibold tracking-normal">{trainer.name}</h3>
            <p className="mt-0.5 text-sm text-fg-2">{trainer.role}</p>
          </div>
          <Badge tone={trainer.onShiftToday ? "ok" : "neutral"} dot>
            {trainer.onShiftToday ? "On shift today" : "Off today"}
          </Badge>
        </div>
        <dl className="mt-6 grid gap-3 border-t border-border pt-5 text-[13px]">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Specialty</dt>
            <dd className="text-right">{trainer.specialty}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Experience</dt>
            <dd className="tabular">{trainer.experienceYears} years</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Availability</dt>
            <dd className="text-right">{trainer.availability}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Active clients</dt>
            <dd className="tabular">{trainer.activeClients}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
