import { Clock, Target, UserRound } from "lucide-react";
import {
  FEATURED_MEMBER_ID,
  FEATURED_MEMBER_RECENT_VISITS,
  FEATURED_MEMBER_VISIT_DAYS,
} from "@/lib/mockData";
import { STATUS_META, cn, formatDate, getMember, getPlan, getTrainer } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { Badge, DemoTag } from "./ui/badge";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

const MONTHLY_TARGET = 20;
// May 2026 starts on a Friday; weeks start on Saturday as in most Egyptian gyms.
const WEEKDAYS = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"];
const MAY_OFFSET = 6;
const MAY_DAYS = 31;
const TODAY = 30;

export function MemberProfileSection() {
  return (
    <section id="profile" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Member profiles"
          title="Every member, on one clear record."
          description="Plan, status, trainer, goal and visit history live together, so any staff member can answer a question at the desk."
        />
        <Reveal className="mt-12 sm:mt-14">
          <MemberProfile />
        </Reveal>
      </Container>
    </section>
  );
}

function Block({ title, icon, children, className }: { title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col bg-bg p-5 sm:p-6", className)}>
      <h4 className="mb-5 flex items-center gap-2 font-sans text-[13px] font-medium tracking-normal text-fg-2">
        {icon}
        {title}
      </h4>
      {children}
    </div>
  );
}

export function MemberProfile() {
  const m = getMember(FEATURED_MEMBER_ID);
  const plan = getPlan(m.plan);
  const trainer = getTrainer(m.trainerId);
  const status = STATUS_META[m.status];
  const visited = new Set(FEATURED_MEMBER_VISIT_DAYS);
  const joinedDay = Number(m.joined.split("-")[2]);

  const details: [string, React.ReactNode][] = [
    ["Membership", plan.name.toUpperCase()],
    ["Status", <Badge key="st" tone={status.tone} dot>{status.label}</Badge>],
    ["Joined", formatDate(m.joined)],
    ["Expires", formatDate(m.expires)],
    ["Trainer", trainer?.name ?? "Not assigned"],
    ["Member ID", m.memberCode],
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg-2 shadow-2xl shadow-black/30">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-border p-5 sm:flex-row sm:items-center sm:p-6">
        <Avatar initials={m.initials} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-2xl font-semibold">{m.name}</h3>
            <Badge tone="brand">{plan.name.toUpperCase()}</Badge>
            <Badge tone={status.tone} dot>
              {status.label}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-fg-2">
            Member since {formatDate(m.joined)} · Goal: {m.goal}
          </p>
        </div>
        <DemoTag className="self-start sm:self-center" />
      </div>

      <div className="grid gap-px bg-border lg:grid-cols-3">
        <Block title="Membership" icon={<UserRound className="size-4" aria-hidden />}>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm">
            {details.map(([label, value]) => (
              <div key={label} className="min-w-0">
                <dt className="text-[11px] text-muted">{label}</dt>
                <dd className="mt-1 truncate font-medium tabular">{value}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block title="Attendance · May 2026" icon={<Clock className="size-4" aria-hidden />}>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-semibold tabular">{m.visitsThisMonth}</span>
            <span className="text-sm text-fg-2">visits this month</span>
          </p>
          <div className="mt-5 grid grid-cols-7 gap-1.5 text-center" role="img" aria-label={`${m.visitsThisMonth} visits in May 2026`}>
            {WEEKDAYS.map((d) => (
              <span key={d} className="pb-1 text-[10px] text-muted">
                {d}
              </span>
            ))}
            {Array.from({ length: MAY_OFFSET }).map((_, i) => (
              <span key={`pad-${i}`} />
            ))}
            {Array.from({ length: MAY_DAYS }, (_, i) => i + 1).map((day) => {
              const isVisit = visited.has(day);
              const beforeJoin = day < joinedDay;
              const future = day > TODAY;
              return (
                <span
                  key={day}
                  className={cn(
                    "grid aspect-square place-items-center rounded-[4px] text-[10px] tabular",
                    isVisit ? "bg-brand/80 text-fg" : "bg-surface text-muted",
                    (beforeJoin || future) && "bg-transparent text-[#3f3f46]",
                    day === TODAY && "ring-1 ring-brand-soft",
                  )}
                >
                  {day}
                </span>
              );
            })}
          </div>
          <p className="mt-4 flex items-center gap-4 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-[2px] bg-brand/80" aria-hidden /> Visit
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-[2px] bg-surface" aria-hidden /> No visit
            </span>
          </p>
        </Block>

        <Block title="Progress" icon={<Target className="size-4" aria-hidden />}>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-[11px] text-muted">Visits</p>
              <p className="mt-1 font-display text-xl font-semibold tabular">{m.visitsThisMonth}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[11px] text-muted">Goal</p>
              <p className="mt-1 font-medium">{m.goal}</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-[11px] text-muted">
              <span>Monthly visit target</span>
              <span className="tabular">
                {m.visitsThisMonth} / {MONTHLY_TARGET}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
              <div className="h-full rounded-full bg-brand-soft" style={{ width: `${(m.visitsThisMonth / MONTHLY_TARGET) * 100}%` }} />
            </div>
          </div>
          <ul className="mt-6 flex flex-col border-t border-border pt-2">
            {FEATURED_MEMBER_RECENT_VISITS.map((v) => (
              <li key={v.date} className="flex items-center justify-between gap-3 border-b border-border/70 py-2.5 text-[13px] last:border-0">
                <span>{v.date}</span>
                <span className="text-fg-2 tabular">{v.time}</span>
                <span className="w-24 text-right text-[11px] text-muted">{v.duration}</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </div>
  );
}
