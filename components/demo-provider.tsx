"use client";

import { Check, CircleCheck } from "lucide-react";
import { createContext, useCallback, useContext, useState, type FormEvent, type ReactNode } from "react";
import { CITIES, GYM_SIZES } from "@/lib/mockData";
import type { PlanId } from "@/lib/types";
import { formatEGP, getPlan } from "@/lib/utils";
import { Badge, DemoTag } from "./ui/badge";
import { Button } from "./ui/button";
import { Field, Input, Select } from "./ui/field";
import { Modal } from "./ui/modal";

type ModalState = { kind: "none" } | { kind: "book" } | { kind: "plan"; planId: PlanId };

const DemoContext = createContext<{
  openBookDemo: () => void;
  openPlan: (id: PlanId) => void;
} | null>(null);

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider>");
  return ctx;
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ kind: "none" });
  const close = useCallback(() => setModal({ kind: "none" }), []);
  const openBookDemo = useCallback(() => setModal({ kind: "book" }), []);
  const openPlan = useCallback((planId: PlanId) => setModal({ kind: "plan", planId }), []);

  return (
    <DemoContext.Provider value={{ openBookDemo, openPlan }}>
      {children}
      <BookDemoModal open={modal.kind === "book"} onClose={close} />
      {modal.kind === "plan" && <PlanModal planId={modal.planId} onClose={close} onBook={openBookDemo} />}
    </DemoContext.Provider>
  );
}

/* ───────────── Book a Demo ───────────── */

type Errors = Partial<Record<"name" | "gym", string>>;

function BookDemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});

  const handleClose = useCallback(() => {
    onClose();
    // Reset after the close so the next open starts fresh.
    setTimeout(() => {
      setStatus("idle");
      setErrors({});
    }, 200);
  }, [onClose]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (String(data.get("name") ?? "").trim().length < 2) next.name = "Enter your name so we know who to ask for.";
    if (String(data.get("gym") ?? "").trim().length < 2) next.gym = "Enter the gym's name.";
    setErrors(next);
    if (Object.keys(next).length) return;

    // Demo only: no request leaves the browser.
    setStatus("sending");
    setTimeout(() => setStatus("done"), 900);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={status === "done" ? "Request received" : "Book a Demo"}
      description={
        status === "done" ? undefined : "A 20-minute walkthrough of Iron District using your gym's own setup."
      }
    >
      {status === "done" ? (
        <div className="flex flex-col items-start gap-4">
          <CircleCheck className="size-8 text-ok" aria-hidden />
          <p className="text-[15px] leading-relaxed text-fg-2">
            This is a demo, so nothing was sent. In the live product, this form would book a walkthrough with the
            Iron District team.
          </p>
          <Button variant="secondary" onClick={handleClose}>
            Back to the demo
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <Field label="Your name" htmlFor="bd-name" error={errors.name}>
            <Input id="bd-name" name="name" autoComplete="name" placeholder="e.g. Khaled Mansour" aria-invalid={!!errors.name} />
          </Field>
          <Field label="Gym name" htmlFor="bd-gym" error={errors.gym}>
            <Input id="bd-gym" name="gym" placeholder="e.g. Iron District Maadi" aria-invalid={!!errors.gym} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City" htmlFor="bd-city">
              <Select id="bd-city" name="city" defaultValue="Cairo">
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>
            <Field label="Gym size" htmlFor="bd-size">
              <Select id="bd-size" name="size" defaultValue={GYM_SIZES[1]}>
                {GYM_SIZES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="flex flex-col gap-3 pt-1">
            <Button type="submit" size="lg" loading={status === "sending"}>
              {status === "sending" ? "Sending request" : "Request a walkthrough"}
            </Button>
            <p className="flex items-center gap-2 text-xs text-muted">
              <DemoTag label="Demo" /> This form doesn&apos;t send anything.
            </p>
          </div>
        </form>
      )}
    </Modal>
  );
}

/* ───────────── Plan details ───────────── */

function PlanModal({ planId, onClose, onBook }: { planId: PlanId; onClose: () => void; onBook: () => void }) {
  const plan = getPlan(planId);
  return (
    <Modal
      open
      onClose={onClose}
      title={`${plan.name} plan`}
      description={plan.summary}
      footer={
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onBook}>Book a Demo</Button>
        </div>
      }
    >
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold tabular">{formatEGP(plan.priceMonthly)}</span>
        <span className="text-sm text-fg-2">/ month</span>
      </div>
      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-sm">
            <Check className="size-4 shrink-0 text-brand-soft" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-md border border-border bg-bg p-4 text-[13px] leading-relaxed text-fg-2">
        Every plan includes the member app, QR check-in and renewal reminders. The gym sets its own prices in the
        product.
      </div>
      <div className="mt-5 flex items-center gap-2">
        <Badge>Sample pricing</Badge>
        <span className="text-xs text-muted">Not a real offer or pricing advice.</span>
      </div>
    </Modal>
  );
}
