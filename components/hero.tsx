"use client";

import { ArrowRight, LogIn } from "lucide-react";
import { DEMO_TODAY, OVERVIEW_STATS } from "@/lib/mockData";
import { getMember, getPlan } from "@/lib/utils";
import { AttendanceChart } from "./attendance-chart";
import { useDemo } from "./demo-provider";
import { StatsCard } from "./stats-card";
import { Avatar } from "./ui/avatar";
import { ButtonLink, Button } from "./ui/button";
import { Container } from "./ui/container";
import { Eyebrow } from "./ui/section-heading";
import { WindowFrame } from "./window-frame";

const FACTS = ["Built for gyms in Egypt", "Prices in EGP", "Works on desktop, tablet and phone"];

export function Hero() {
  const { openBookDemo } = useDemo();
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-14 pt-14 pb-16 sm:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12 lg:pt-24 lg:pb-24">
        <div className="animate-fade-up">
          <Eyebrow>Gym management software</Eyebrow>
          <h1 className="mt-5 text-[42px] leading-[1.05] font-semibold sm:text-[54px] xl:text-[62px]">
            Run Your Gym.
            <br />
            <span className="text-fg-2">Smarter.</span>
          </h1>
          <p className="mt-6 max-w-[470px] text-base leading-relaxed text-fg-2 sm:text-[17px]">
            A modern management experience for memberships, attendance, trainers, and everyday gym operations.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#overview" size="lg" icon={<ArrowRight className="size-4" aria-hidden />}>
              Explore Demo
            </ButtonLink>
            <Button size="lg" variant="secondary" onClick={openBookDemo}>
              Book a Demo
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted">
            {FACTS.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-brand" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <HeroPreview />
        </div>
      </Container>
    </section>
  );
}

function HeroPreview() {
  const member = getMember("m-001");
  return (
    <WindowFrame title={`Iron District · Overview · ${DEMO_TODAY.label}`} bodyClassName="p-4 sm:p-5">
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {OVERVIEW_STATS.map((s) => (
          <StatsCard key={s.id} stat={s} compact />
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div className="rounded-md border border-border bg-surface p-4">
          <div className="mb-5 flex items-baseline justify-between">
            <p className="text-xs font-medium">Check-ins this week</p>
            <p className="text-[11px] text-muted">Peak: Wed</p>
          </div>
          <AttendanceChart height={112} showAxis={false} />
        </div>
        <div className="flex flex-col rounded-md border border-border bg-surface p-4">
          <p className="text-xs font-medium">Latest check-in</p>
          <div className="mt-4 flex items-center gap-3">
            <Avatar initials={member.initials} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{member.name}</p>
              <p className="text-[11px] text-muted">{getPlan(member.plan).name} · Active</p>
            </div>
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-border pt-3 text-[11px] text-fg-2">
            <LogIn className="size-3.5 text-ok" aria-hidden />
            Checked in at {DEMO_TODAY.time}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
