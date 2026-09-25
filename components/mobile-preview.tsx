import { CalendarCheck, Flame, House, IdCard, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import {
  DEMO_TODAY,
  FEATURED_MEMBER_ID,
  FEATURED_MEMBER_RECENT_VISITS,
  PEAK_HOURS,
} from "@/lib/mockData";
import { cn, daysFromToday, formatDate, getMember, getPlan, getTrainer } from "@/lib/utils";
import { QrPattern } from "./qr-pattern";
import { DemoTag } from "./ui/badge";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

const POINTS = [
  { title: "Digital membership card", text: "A QR code for check-in, so members never need a plastic card." },
  { title: "Renewal reminders", text: "Members see how many days are left and get notified before expiry." },
  { title: "Visit history", text: "Every check-in is visible to the member, which keeps them motivated." },
];

type Tab = "home" | "membership" | "attendance";

export function MobilePreviewSection() {
  return (
    <section id="app" className="overflow-hidden border-b border-border bg-bg-2/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Member app"
          title="Your members get an app too."
          description="The same system extends to a simple mobile experience for members, built around the three things they actually check."
          aside={<DemoTag label="Concept preview" />}
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-3">
          {POINTS.map((p) => (
            <li key={p.title} className="border-t border-border pt-5">
              <p className="text-[15px] font-medium">{p.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{p.text}</p>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14">
          {/* On small screens the phones scroll inside this row; the page itself never scrolls sideways. */}
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:justify-center lg:gap-8 lg:overflow-visible lg:px-0">
            <Phone label="Home" tab="home">
              <HomeScreen />
            </Phone>
            <Phone label="Membership" tab="membership" raised>
              <MembershipScreen />
            </Phone>
            <Phone label="Attendance" tab="attendance">
              <AttendanceScreen />
            </Phone>
          </div>
        </Reveal>
        <p className="mt-4 text-center text-xs text-muted">
          Screens are a design preview. The member app is not part of this demo.
        </p>
      </Container>
    </section>
  );
}

/* ───────────── Device frame ───────────── */

function Phone({ label, tab, raised, children }: { label: string; tab: Tab; raised?: boolean; children: ReactNode }) {
  const tabs: [Tab | "profile", string, typeof House][] = [
    ["home", "Home", House],
    ["membership", "Membership", IdCard],
    ["attendance", "Visits", CalendarCheck],
    ["profile", "Profile", UserRound],
  ];
  return (
    <figure className={cn("m-0 shrink-0 snap-center", raised && "lg:-translate-y-6")}>
      <div
        className="relative flex h-[560px] w-[272px] flex-col overflow-hidden rounded-[40px] border border-border-strong bg-bg p-2 shadow-2xl shadow-black/50"
        aria-label={`Member app, ${label} screen (preview)`}
        role="img"
      >
        <div className="flex flex-1 flex-col overflow-hidden rounded-[32px] bg-bg-2">
          {/* status bar */}
          <div className="flex h-9 items-center justify-between px-6 pt-1 text-[10px] font-medium text-fg-2 tabular" aria-hidden>
            <span>20:42</span>
            <span className="h-4 w-16 rounded-full bg-bg" />
            <span>5G</span>
          </div>
          <div className="flex-1 overflow-hidden px-4 pt-2" aria-hidden>
            {children}
          </div>
          {/* tab bar */}
          <div className="grid grid-cols-4 border-t border-border px-2 pt-2 pb-3" aria-hidden>
            {tabs.map(([id, name, Icon]) => (
              <span key={id} className={cn("flex flex-col items-center gap-1 text-[9px]", id === tab ? "text-fg" : "text-muted")}>
                <Icon className={cn("size-4", id === tab && "text-brand-soft")} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-fg-2">{label}</figcaption>
    </figure>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-[14px] border border-border bg-surface p-3.5", className)}>{children}</div>;
}

/* ───────────── Screens ───────────── */

const member = getMember(FEATURED_MEMBER_ID);
const plan = getPlan(member.plan);
const daysLeft = daysFromToday(member.expires);

function HomeScreen() {
  return (
    <div className="flex flex-col gap-3">
      <div className="pt-1 pb-1">
        <p className="text-[11px] text-muted">{DEMO_TODAY.label}</p>
        <p className="mt-0.5 font-display text-lg font-semibold">Good evening, Ahmed</p>
      </div>
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-[0.12em] text-fg-2">{plan.name.toUpperCase()}</p>
          <span className="flex items-center gap-1.5 text-[10px] text-ok">
            <span className="size-1.5 rounded-full bg-ok" /> Membership Active
          </span>
        </div>
        <p className="mt-3 text-[10px] text-muted">Next Renewal</p>
        <p className="font-display text-base font-semibold">{formatDate(member.expires, false).replace("Jun", "June")}</p>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-[10px] text-muted">Attendance</p>
          <p className="mt-1 font-display text-lg font-semibold tabular">{member.visitsThisMonth} visits</p>
          <p className="text-[10px] text-muted">this month</p>
        </Card>
        <Card>
          <p className="text-[10px] text-muted">Trainer</p>
          <p className="mt-1 text-[13px] font-semibold">{getTrainer(member.trainerId)?.name}</p>
          <p className="text-[10px] text-muted">Strength</p>
        </Card>
      </div>
      <Card>
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-medium">Gym busyness today</p>
          <p className="text-[10px] text-warn">Busy now</p>
        </div>
        <div className="mt-3 flex h-12 items-end gap-1.5">
          {PEAK_HOURS.map((h) => (
            <span key={h.hour} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={cn("w-full rounded-[2px]", h.hour === "9 PM" ? "bg-brand" : "bg-[#34343b]")}
                style={{ height: `${h.load * 36}px` }}
              />
            </span>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[8px] text-muted">
          <span>6 AM</span>
          <span>9 PM</span>
        </div>
      </Card>
    </div>
  );
}

function MembershipScreen() {
  return (
    <div className="flex flex-col gap-3">
      <p className="pt-1 font-display text-lg font-semibold">Membership</p>
      <Card className="flex flex-col items-center text-center">
        <p className="text-[10px] tracking-[0.16em] text-muted uppercase">Iron District</p>
        <p className="mt-1 font-display text-sm font-semibold">
          {member.name} · {plan.name.toUpperCase()}
        </p>
        <div className="mt-3 w-36 overflow-hidden rounded-md">
          <QrPattern seed={20417} className="w-full" />
        </div>
        <p className="mt-3 text-[10px] text-fg-2">Show this code at the front desk</p>
        <p className="text-[10px] text-muted tabular">{member.memberCode}</p>
      </Card>
      <Card className="grid grid-cols-2 gap-y-3 text-[11px]">
        <div>
          <p className="text-[10px] text-muted">Status</p>
          <p className="font-medium text-ok">Active</p>
        </div>
        <div>
          <p className="text-[10px] text-muted">Expires</p>
          <p className="font-medium tabular">{formatDate(member.expires)}</p>
        </div>
        <div className="col-span-2">
          <div className="flex justify-between text-[10px] text-muted">
            <span>Days left</span>
            <span className="tabular">{daysLeft} of 31</span>
          </div>
          <div className="mt-1.5 h-1 rounded-full bg-bg">
            <div className="h-full rounded-full bg-brand-soft" style={{ width: `${(daysLeft / 31) * 100}%` }} />
          </div>
        </div>
      </Card>
    </div>
  );
}

function AttendanceScreen() {
  return (
    <div className="flex flex-col gap-3">
      <p className="pt-1 font-display text-lg font-semibold">Attendance</p>
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-[10px] text-muted">This month</p>
          <p className="mt-1 font-display text-xl font-semibold tabular">{member.visitsThisMonth}</p>
          <p className="text-[10px] text-muted">visits</p>
        </Card>
        <Card>
          <p className="flex items-center gap-1 text-[10px] text-muted">
            <Flame className="size-3 text-brand-soft" /> Streak
          </p>
          <p className="mt-1 font-display text-xl font-semibold tabular">8</p>
          <p className="text-[10px] text-muted">days in a row</p>
        </Card>
      </div>
      <Card className="p-0">
        <p className="px-3.5 pt-3 pb-1 text-[11px] font-medium">Recent visits</p>
        <ul>
          {FEATURED_MEMBER_RECENT_VISITS.map((v) => (
            <li key={v.date} className="flex items-center justify-between border-t border-border px-3.5 py-2.5 text-[11px] first:border-0">
              <span>
                <span className="block">{v.date}</span>
                <span className="text-[10px] text-muted">{v.duration}</span>
              </span>
              <span className="text-fg-2 tabular">{v.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
