// Domain types for the demo. They mirror what a real backend would
// return, so the mock data can later be swapped for API calls.

export type PlanId = "basic" | "pro" | "elite";

export type MembershipStatus = "active" | "expiring" | "expired" | "frozen";

export interface Plan {
  id: PlanId;
  name: string;
  priceMonthly: number; // EGP
  summary: string;
  features: string[];
  highlighted?: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experienceYears: number;
  availability: string;
  onShiftToday: boolean;
  activeClients: number;
  initials: string;
}

export interface Member {
  id: string;
  name: string;
  initials: string;
  memberCode: string;
  plan: PlanId;
  status: MembershipStatus;
  joined: string; // ISO date
  expires: string; // ISO date
  lastVisit: string; // human label
  visitsThisMonth: number;
  trainerId?: string;
  goal: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "flat";
  hint: string;
}

export interface DayAttendance {
  day: string;
  checkIns: number;
  isToday?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: FeatureIcon;
}

export type FeatureIcon =
  | "memberships"
  | "attendance"
  | "profiles"
  | "renewals"
  | "trainers"
  | "reports";

export interface NavItem {
  label: string;
  href: string;
}
