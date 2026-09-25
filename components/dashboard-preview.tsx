import {
  BarChart3,
  CalendarCheck,
  CreditCard,
  Dumbbell,
  IdCard,
  LayoutDashboard,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { DASHBOARD_NAV, DEMO_TODAY, MEMBERS, OVERVIEW_STATS } from "@/lib/mockData";
import { STATUS_META, cn, daysFromToday, formatDate, getPlan, upcomingRenewals } from "@/lib/utils";
import { AttendanceChart } from "./attendance-chart";
import { LogoMark } from "./logo";
import { MembershipMix } from "./membership-mix";
import { StatsCard } from "./stats-card";
import { Avatar } from "./ui/avatar";
import { Badge, DemoTag } from "./ui/badge";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

const NAV_ICONS: Record<(typeof DASHBOARD_NAV)[number], LucideIcon> = {
  Overview: LayoutDashboard,
  Members: Users,
  Attendance: CalendarCheck,
  Memberships: IdCard,
  Trainers: Dumbbell,
  Payments: Wallet,
  Reports: BarChart3,
};

export function DashboardPreviewSection() {
  return (
    <section id="overview" className="border-b border-border bg-bg-2 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Overview"
          title="Your whole gym, on one calm screen."
          description="Members, check-ins, renewals and revenue update in one place, so the front desk and the owner see the same picture."
        />
        <Reveal className="mt-12 sm:mt-14">
          <DashboardPreview />
        </Reveal>
        <p className="mt-4 text-center text-xs text-muted">
          Interface preview with invented data. Navigation inside the preview is disabled.
        </p>
      </Container>
    </section>
  );
}

function Panel({ title, meta, children, className }: { title: string; meta?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col rounded-md border border-border bg-surface p-4 sm:p-5", className)}>
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h3 className="font-sans text-sm font-medium tracking-normal">{title}</h3>
        {meta && <p className="text-[11px] whitespace-nowrap text-muted">{meta}</p>}
      </div>
      {children}
    </div>
  );
}

export function DashboardPreview() {
  const recent = [...MEMBERS].sort((a, b) => b.joined.localeCompare(a.joined)).slice(0, 5);
  const renewals = upcomingRenewals().slice(0, 4);

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg shadow-2xl shadow-black/40">
      <div className="flex">
        {/* Sidebar: display only */}
        <aside className="hidden w-[216px] shrink-0 flex-col border-r border-border bg-bg-2 p-4 lg:flex" aria-label="Preview navigation (display only)">
          <div className="flex items-center gap-2.5 px-2 py-1">
            <LogoMark className="size-5 text-fg" />
            <div className="leading-tight">
              <p className="text-[13px] font-semibold">Iron District</p>
              <p className="text-[11px] text-muted">Maadi branch</p>
            </div>
          </div>
          <ul className="mt-7 flex flex-col gap-0.5">
            {DASHBOARD_NAV.map((item) => {
              const Icon = NAV_ICONS[item];
              const active = item === "Overview";
              return (
                <li
                  key={item}
                  className={cn(
                    "flex h-9 items-center gap-3 rounded-sm px-2.5 text-[13px]",
                    active ? "bg-surface text-fg" : "text-muted",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={cn("size-4", active && "text-brand-soft")} aria-hidden />
                  {item}
                </li>
              );
            })}
          </ul>
          <div className="mt-auto flex items-center gap-2.5 border-t border-border px-2 pt-4">
            <Avatar initials="KM" size="sm" />
            <div className="min-w-0 leading-tight">
              <p className="truncate text-[12px] font-medium">Khaled M.</p>
              <p className="text-[11px] text-muted">Owner</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[13px] text-fg-2">Welcome back, Khaled</p>
              <h3 className="mt-1 text-xl font-semibold sm:text-2xl">Today&apos;s Overview</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-muted">{DEMO_TODAY.label}</span>
              <DemoTag />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
            {OVERVIEW_STATS.map((s) => (
              <StatsCard key={s.id} stat={s} />
            ))}
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Panel title="Attendance" meta="Check-ins · last 7 days">
              <AttendanceChart height={190} />
            </Panel>
            <Panel title="Membership Overview" meta="By plan">
              <MembershipMix />
            </Panel>
          </div>

          <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Panel title="Recent Members" meta="Newest first">
              <div className="-mx-4 overflow-x-auto px-4 sm:-mx-5 sm:px-5">
                <table className="w-full min-w-[520px] text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-border text-[11px] text-muted">
                      <th scope="col" className="pb-2.5 font-medium">Member</th>
                      <th scope="col" className="pb-2.5 font-medium">Plan</th>
                      <th scope="col" className="pb-2.5 font-medium">Status</th>
                      <th scope="col" className="pb-2.5 font-medium">Joined</th>
                      <th scope="col" className="pb-2.5 text-right font-medium">Last visit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((m) => {
                      const status = STATUS_META[m.status];
                      return (
                        <tr key={m.id} className="border-b border-border/70 last:border-0">
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <Avatar initials={m.initials} size="sm" />
                              <div className="leading-tight">
                                <p className="font-medium">{m.name}</p>
                                <p className="text-[11px] text-muted tabular">{m.memberCode}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-fg-2">{getPlan(m.plan).name}</td>
                          <td className="py-3">
                            <Badge tone={status.tone} dot>
                              {status.label}
                            </Badge>
                          </td>
                          <td className="py-3 text-fg-2 tabular">{formatDate(m.joined, false)}</td>
                          <td className="py-3 text-right text-fg-2">{m.lastVisit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>

            <Panel title="Upcoming Renewals" meta="Next 14 days">
              <ul className="flex flex-col">
                {renewals.map((m) => {
                  const days = daysFromToday(m.expires);
                  return (
                    <li key={m.id} className="flex items-center gap-3 border-b border-border/70 py-3 first:pt-0 last:border-0 last:pb-0">
                      <Avatar initials={m.initials} size="sm" />
                      <div className="min-w-0 flex-1 leading-tight">
                        <p className="truncate text-[13px] font-medium">{m.name}</p>
                        <p className="text-[11px] text-muted">
                          {getPlan(m.plan).name} · {formatDate(m.expires, false)}
                        </p>
                      </div>
                      <Badge tone={days <= 7 ? "warn" : "neutral"}>in {days} days</Badge>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto flex items-center gap-2 pt-4 text-[11px] text-muted">
                <CreditCard className="size-3.5" aria-hidden />
                Reminders go out 7 days before expiry
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}
