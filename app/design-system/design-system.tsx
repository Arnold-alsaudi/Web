"use client";

import { ArrowLeft, ArrowRight, Inbox } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { FeatureCard } from "@/components/feature-card";
import { Logo } from "@/components/logo";
import { StatsCard } from "@/components/stats-card";
import { Avatar } from "@/components/ui/avatar";
import { Badge, DemoTag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Field, Input, Select } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { Eyebrow } from "@/components/ui/section-heading";
import { FEATURES, MEMBERS, OVERVIEW_STATS } from "@/lib/mockData";
import { STATUS_META, getPlan } from "@/lib/utils";

const COLORS = [
  { group: "Surfaces", items: [["Background", "#0D0D10", "bg"], ["Secondary background", "#141419", "bg-2"], ["Card", "#19191F", "surface"], ["Card hover", "#202027", "surface-hover"], ["Border", "#29292F", "border"]] },
  { group: "Text", items: [["Text", "#F5F3EF", "fg"], ["Secondary text", "#A5A3A0", "fg-2"], ["Muted", "#6F6D69", "muted"]] },
  { group: "Brand · use sparingly", items: [["Primary", "#8B6F47", "brand"], ["Secondary accent", "#B59A72", "brand-soft"]] },
  { group: "Status", items: [["Success", "#6FA98A", "ok"], ["Warning", "#C9A45C", "warn"], ["Danger", "#C7736A", "danger"]] },
] as const;

const TYPE = [
  { name: "Display / H1", cls: "font-display text-[62px] leading-[1.05] font-semibold tracking-tight", spec: "Manrope 600 · 62/65 · −2%", sample: "Run Your Gym." },
  { name: "H2", cls: "font-display text-[40px] leading-[1.15] font-semibold tracking-tight", spec: "Manrope 600 · 40/46 · −2%", sample: "Membership Plans" },
  { name: "H3", cls: "font-display text-2xl font-semibold tracking-tight", spec: "Manrope 600 · 24/30", sample: "Today's Overview" },
  { name: "Body large", cls: "text-[17px] leading-relaxed text-fg-2", spec: "Inter 400 · 17/28", sample: "A modern management experience for memberships and attendance." },
  { name: "Body", cls: "text-[15px] leading-relaxed text-fg-2", spec: "Inter 400 · 15/24", sample: "Keep every membership organized in one place." },
  { name: "Label", cls: "text-[13px] font-medium", spec: "Inter 500 · 13/18", sample: "Gym name" },
  { name: "Caption", cls: "text-xs text-muted", spec: "Inter 400 · 12/16", sample: "Reminders go out 7 days before expiry" },
  { name: "Eyebrow", cls: "text-xs font-medium tracking-[0.14em] text-brand-soft uppercase", spec: "Inter 500 · 12 · +14% · caps", sample: "Features" },
];

const SPACING = [4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 112];
const RADII = [["sm", 6, "Buttons, inputs, tags"], ["md", 10, "Cards, panels"], ["lg", 14, "Frames, modals"]] as const;

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-14">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {note && <p className="max-w-[440px] text-[13px] text-fg-2">{note}</p>}
      </div>
      {children}
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[11px] font-medium tracking-[0.12em] text-muted uppercase">{children}</p>;
}

export function DesignSystem() {
  const [modalOpen, setModalOpen] = useState(false);
  const members = MEMBERS.slice(0, 4);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Back to the demo">
            <Logo />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-fg-2 transition-colors hover:text-fg">
            <ArrowLeft className="size-4" aria-hidden /> Back to demo
          </Link>
        </Container>
      </header>

      <main>
        <Container className="pt-16 pb-24">
          <Eyebrow>Design system · v1.0</Eyebrow>
          <h1 className="mt-4 text-[40px] leading-tight font-semibold sm:text-[52px]">Iron District UI</h1>
          <p className="mt-4 max-w-[600px] text-base leading-relaxed text-fg-2">
            The tokens and components behind the demo. Dark but comfortable surfaces, one warm brand color used
            sparingly, and two typefaces.
          </p>

          <Section id="colors" title="Color" note="The brand bronze marks active or highlighted states only. Status colors carry meaning and never decorate.">
            <div className="grid gap-10">
              {COLORS.map((g) => (
                <div key={g.group}>
                  <Label>{g.group}</Label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    {g.items.map(([name, hex, token]) => (
                      <div key={hex} className="overflow-hidden rounded-md border border-border">
                        <div className="h-16" style={{ background: hex }} />
                        <div className="bg-bg-2 p-3">
                          <p className="text-[13px] font-medium">{name}</p>
                          <p className="mt-0.5 text-[11px] text-muted tabular">
                            {hex} · {token}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="type" title="Typography" note="Manrope for headings, Inter for everything else. Numbers use tabular figures.">
            <div className="divide-y divide-border rounded-lg border border-border">
              {TYPE.map((t) => (
                <div key={t.name} className="grid gap-3 p-5 md:grid-cols-[180px_minmax(0,1fr)] md:items-baseline">
                  <div>
                    <p className="text-[13px] font-medium">{t.name}</p>
                    <p className="text-[11px] text-muted">{t.spec}</p>
                  </div>
                  <p className={`${t.cls} min-w-0 break-words`}>{t.sample}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="spacing" title="Spacing & radius" note="A 4px base scale. Sections use 80–112px vertical padding; cards 20–32px.">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <Label>Spacing scale</Label>
                <ul className="flex flex-col gap-2">
                  {SPACING.map((s) => (
                    <li key={s} className="flex items-center gap-4 text-[12px] text-fg-2 tabular">
                      <span className="w-10 text-right">{s}px</span>
                      <span className="h-2.5 rounded-[2px] bg-brand/70" style={{ width: s * 2 }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Label>Radius</Label>
                <div className="grid grid-cols-3 gap-3">
                  {RADII.map(([name, px, use]) => (
                    <div key={name} className="flex flex-col gap-3">
                      <div className="h-20 border border-border-strong bg-surface" style={{ borderRadius: px }} />
                      <p className="text-[13px] font-medium">
                        {name} · {px}px
                      </p>
                      <p className="-mt-2 text-[11px] text-muted">{use}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section id="buttons" title="Buttons" note="One primary action per view. Hover and press are 150–200ms; focus always shows a visible ring.">
            <div className="grid gap-8">
              {(["primary", "secondary", "ghost"] as const).map((v) => (
                <div key={v}>
                  <Label>{v}</Label>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant={v}>Book a Demo</Button>
                    <Button variant={v} icon={<ArrowRight className="size-4" aria-hidden />}>
                      With icon
                    </Button>
                    <Button variant={v} size="sm">
                      Small
                    </Button>
                    <Button variant={v} loading>
                      Saving
                    </Button>
                    <Button variant={v} disabled>
                      Disabled
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="inputs" title="Inputs" note="Labels sit above the field. Errors say what went wrong and how to fix it.">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Default" htmlFor="ds-1" hint="Helper text">
                <Input id="ds-1" placeholder="Search member..." />
              </Field>
              <Field label="Error" htmlFor="ds-2" error="Enter the gym's name.">
                <Input id="ds-2" aria-invalid defaultValue="" placeholder="Gym name" />
              </Field>
              <Field label="Disabled" htmlFor="ds-3">
                <Input id="ds-3" disabled defaultValue="ID-20417" />
              </Field>
              <Field label="Select" htmlFor="ds-4">
                <Select id="ds-4" defaultValue="Cairo">
                  <option>Cairo</option>
                  <option>Giza</option>
                  <option>Alexandria</option>
                </Select>
              </Field>
            </div>
          </Section>

          <Section id="badges" title="Badges & avatars">
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="ok" dot>Active</Badge>
              <Badge tone="warn" dot>Expiring soon</Badge>
              <Badge tone="danger" dot>Expired</Badge>
              <Badge tone="neutral" dot>Frozen</Badge>
              <Badge tone="brand">Most chosen</Badge>
              <DemoTag />
              <span className="mx-2 h-6 w-px bg-border" aria-hidden />
              <Avatar initials="AH" size="sm" />
              <Avatar initials="AH" />
              <Avatar initials="AH" size="lg" />
            </div>
          </Section>

          <Section id="cards" title="Cards & stats" note="Cards are flat: a border and one surface step. No glow, no gradients.">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {OVERVIEW_STATS.map((s) => (
                <StatsCard key={s.id} stat={s} />
              ))}
            </div>
            <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
              {FEATURES.slice(0, 2).map((f) => (
                <FeatureCard key={f.id} feature={f} />
              ))}
            </div>
          </Section>

          <Section id="table" title="Table" note="Tables scroll inside their own container on small screens.">
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full min-w-[560px] text-left text-[13px]">
                <thead className="bg-bg-2 text-[11px] text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-medium">Member</th>
                    <th scope="col" className="px-5 py-3 font-medium">Plan</th>
                    <th scope="col" className="px-5 py-3 font-medium">Status</th>
                    <th scope="col" className="px-5 py-3 text-right font-medium">Visits (May)</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.id} className="border-t border-border transition-colors hover:bg-bg-2">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar initials={m.initials} size="sm" />
                          {m.name}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-fg-2">{getPlan(m.plan).name}</td>
                      <td className="px-5 py-3">
                        <Badge tone={STATUS_META[m.status].tone} dot>
                          {STATUS_META[m.status].label}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-right tabular">{m.visitsThisMonth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="states" title="Empty state & modal">
            <div className="grid gap-6 md:grid-cols-2">
              <EmptyState
                icon={<Inbox className="size-4" />}
                title="No renewals this week"
                description="Memberships that end in the next 14 days will show up here."
              />
              <div className="flex flex-col items-start justify-center gap-4 rounded-md border border-border p-6">
                <p className="text-sm text-fg-2">
                  Modals trap focus, close on Escape or backdrop click, and become bottom sheets on phones.
                </p>
                <Button variant="secondary" onClick={() => setModalOpen(true)}>
                  Open example modal
                </Button>
              </div>
            </div>
          </Section>
        </Container>
      </main>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Freeze membership"
        description="Pause Ahmed Hassan's PRO membership. The expiry date moves by the same number of days."
        footer={
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Freeze for 14 days</Button>
          </div>
        }
      >
        <Field label="Reason" htmlFor="ds-reason">
          <Select id="ds-reason" defaultValue="Travel">
            <option>Travel</option>
            <option>Injury</option>
            <option>Other</option>
          </Select>
        </Field>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted">
          <DemoTag label="Example" /> Nothing is saved.
        </p>
      </Modal>
    </>
  );
}
