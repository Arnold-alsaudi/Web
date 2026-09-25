"use client";

import { CircleAlert, CircleCheck, LogIn, QrCode, ScanLine, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { DEMO_TODAY, FEATURED_MEMBER_ID, MEMBERS } from "@/lib/mockData";
import type { Member } from "@/lib/types";
import { STATUS_META, cn, formatDate, getMember, getPlan } from "@/lib/utils";
import { QrPattern } from "./qr-pattern";
import { Avatar } from "./ui/avatar";
import { Badge, DemoTag } from "./ui/badge";
import { Button } from "./ui/button";
import { Container } from "./ui/container";
import { EmptyState } from "./ui/empty-state";
import { Input } from "./ui/field";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

const STEPS = [
  { title: "Find the member", text: "Type a name or member ID, or scan the QR code from the member app." },
  { title: "Check the membership", text: "Plan, status and expiry show instantly, so nobody trains on an expired plan." },
  { title: "Confirm the visit", text: "One tap records the check-in and updates today's attendance." },
];

export function AttendanceExperience() {
  return (
    <section id="attendance" className="border-b border-border bg-bg-2/40 py-20 sm:py-28">
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Attendance"
            title="Check a member in, in under five seconds."
            description="The front desk searches or scans, sees the membership status, and confirms. Try it on the right."
          />
          <ol className="mt-10 flex flex-col gap-6">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border-strong text-xs text-fg-2 tabular">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[15px] font-medium">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Reveal>
          <CheckInCard />
        </Reveal>
      </Container>
    </section>
  );
}

type Mode = "search" | "scan";

function CheckInCard() {
  const [mode, setMode] = useState<Mode>("search");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(FEATURED_MEMBER_ID);
  const [checkedIn, setCheckedIn] = useState<Set<string>>(() => new Set([FEATURED_MEMBER_ID]));
  const [scanning, setScanning] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MEMBERS.filter((m) => m.name.toLowerCase().includes(q) || m.memberCode.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const selected = getMember(selectedId);

  function select(m: Member) {
    setSelectedId(m.id);
    setQuery("");
  }

  function simulateScan() {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSelectedId(FEATURED_MEMBER_ID);
    }, 1100);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <LogIn className="size-4 text-brand-soft" aria-hidden />
          <h3 className="font-sans text-[15px] font-semibold tracking-normal">Member Check-in</h3>
        </div>
        <DemoTag label="Demo" />
      </div>

      <div className="p-5 sm:p-6">
        {/* Mode switch */}
        <div role="tablist" aria-label="Check-in method" className="grid grid-cols-2 gap-1 rounded-sm border border-border bg-bg-2 p-1">
          {(
            [
              ["search", "Search member", "Search", Search],
              ["scan", "Scan Membership QR", "Scan QR", QrCode],
            ] as const
          ).map(([id, label, short, Icon]) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={mode === id}
              onClick={() => setMode(id)}
              className={cn(
                "flex h-9 items-center justify-center gap-2 rounded-[4px] text-[13px] transition-colors duration-150",
                mode === id ? "bg-surface-hover text-fg" : "text-fg-2 hover:text-fg",
              )}
            >
              <Icon className="size-4" aria-hidden />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          ))}
        </div>

        {mode === "search" ? (
          <div className="mt-4">
            <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <Input
              id="checkin-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search member..."
              className="pl-10"
              aria-label="Search member by name or ID"
              autoComplete="off"
            />
            </div>
            {query.trim() && (
              <div className="mt-2 rounded-md border border-border bg-bg-2">
                {results.length ? (
                  <ul role="listbox" aria-label="Matching members" className="p-1">
                    {results.map((m) => (
                      <li key={m.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={m.id === selectedId}
                          onClick={() => select(m)}
                          className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left transition-colors hover:bg-surface"
                        >
                          <Avatar initials={m.initials} size="sm" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium">{m.name}</span>
                            <span className="block text-[11px] text-muted tabular">
                              {m.memberCode} · {getPlan(m.plan).name}
                            </span>
                          </span>
                          <Badge tone={STATUS_META[m.status].tone}>{STATUS_META[m.status].label}</Badge>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-3">
                    <EmptyState
                      icon={<SearchX className="size-4" />}
                      title="No member found"
                      description={`Nobody matches "${query.trim()}". Try a first name, or an ID such as ID-20417.`}
                    />
                  </div>
                )}
              </div>
            )}
            {!query.trim() && (
              <p className="mt-2 text-xs text-muted">Try &ldquo;Ibrahim&rdquo; to see an expired membership.</p>
            )}
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-5 rounded-md border border-border bg-bg-2 p-4">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-sm">
              <QrPattern seed={20417} className="size-full" />
              {scanning && <span className="absolute inset-x-0 top-0 h-0.5 animate-scan bg-brand" aria-hidden />}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] leading-relaxed text-fg-2">
                Members show this code from the app. The desk scans it with a webcam or a handheld scanner.
              </p>
              <Button size="sm" variant="secondary" className="mt-3" loading={scanning} onClick={simulateScan} icon={<ScanLine className="size-4" aria-hidden />}>
                {scanning ? "Reading code" : "Simulate scan"}
              </Button>
            </div>
          </div>
        )}

        <CheckInResult
          member={selected}
          checkedIn={checkedIn.has(selected.id)}
          onConfirm={() => setCheckedIn((s) => new Set(s).add(selected.id))}
        />
      </div>
    </div>
  );
}

function CheckInResult({ member, checkedIn, onConfirm }: { member: Member; checkedIn: boolean; onConfirm: () => void }) {
  const status = STATUS_META[member.status];
  const blocked = member.status === "expired" || member.status === "frozen";
  const rows: [string, React.ReactNode][] = [
    ["Member", member.name],
    ["Membership", getPlan(member.plan).name.toUpperCase()],
    ["Status", <Badge key="s" tone={status.tone} dot>{status.label}</Badge>],
    ["Expires", formatDate(member.expires)],
    ["Last Visit", checkedIn ? "Today" : member.lastVisit],
    ["Check-in", checkedIn ? DEMO_TODAY.time : "Not yet"],
  ];

  return (
    <div key={member.id} className="mt-5 animate-fade-up rounded-md border border-border bg-bg-2">
      <div className="flex items-center gap-3.5 border-b border-border p-4">
        <Avatar initials={member.initials} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg font-semibold">{member.name}</p>
          <p className="text-xs text-muted tabular">{member.memberCode}</p>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 p-4 text-[13px] sm:grid-cols-3">
        {rows.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-[11px] text-muted">{label}</dt>
            <dd className="mt-1 truncate font-medium tabular">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="border-t border-border p-4">
        {checkedIn ? (
          <p className="flex items-center gap-2 text-[13px] text-ok" role="status">
            <CircleCheck className="size-4" aria-hidden />
            Checked in at {DEMO_TODAY.time}. This is a demo, nothing was recorded.
          </p>
        ) : blocked ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-[13px] text-danger">
              <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
              {member.status === "expired"
                ? `Membership expired on ${formatDate(member.expires, false)}. Renew before checking in.`
                : "Membership is frozen. Unfreeze it before checking in."}
            </p>
            <Button size="sm" disabled>
              Confirm check-in
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-fg-2">
              {member.status === "expiring"
                ? `Renews on ${formatDate(member.expires, false)}. Remind the member at the desk.`
                : "Membership is valid. Ready to check in."}
            </p>
            <Button size="sm" onClick={onConfirm}>
              Confirm check-in
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
