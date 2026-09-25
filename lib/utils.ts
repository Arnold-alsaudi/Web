import { MEMBERS, PLANS, TRAINERS } from "./mockData";
import type { MembershipStatus, PlanId } from "./types";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatEGP(value: number) {
  return `EGP ${value.toLocaleString("en-US")}`;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-06-12" → "12 Jun 2026" (no timezone surprises). */
export function formatDate(iso: string, withYear = true) {
  const [y, m, d] = iso.split("-").map(Number);
  return withYear ? `${d} ${MONTHS[m - 1]} ${y}` : `${d} ${MONTHS[m - 1]}`;
}

export function getPlan(id: PlanId) {
  return PLANS.find((p) => p.id === id)!;
}

export function getTrainer(id?: string) {
  return TRAINERS.find((t) => t.id === id);
}

export function getMember(id: string) {
  return MEMBERS.find((m) => m.id === id)!;
}

export const STATUS_META: Record<MembershipStatus, { label: string; tone: "ok" | "warn" | "danger" | "neutral" }> = {
  active: { label: "Active", tone: "ok" },
  expiring: { label: "Expiring soon", tone: "warn" },
  expired: { label: "Expired", tone: "danger" },
  frozen: { label: "Frozen", tone: "neutral" },
};

/** Members whose plan ends within the next two weeks, soonest first. */
export function upcomingRenewals() {
  return MEMBERS.filter((m) => m.status === "expiring" || (m.status === "active" && m.expires <= "2026-06-13"))
    .sort((a, b) => a.expires.localeCompare(b.expires));
}

/** Whole days from the demo's "today" (30 May 2026) to an ISO date. */
export function daysFromToday(iso: string) {
  const today = Date.UTC(2026, 4, 30);
  const [y, m, d] = iso.split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - today) / 86_400_000);
}
