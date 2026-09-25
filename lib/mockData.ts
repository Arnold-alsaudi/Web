// ─────────────────────────────────────────────────────────────
// MOCK / DEMO DATA ONLY
// Every name, number, date and price in this file is invented for
// presentation. None of it belongs to a real gym, person or business.
// ─────────────────────────────────────────────────────────────
import type {
  DayAttendance,
  Feature,
  Member,
  NavItem,
  Plan,
  Stat,
  Trainer,
} from "./types";

export const BRAND = {
  name: "IRON DISTRICT",
  product: "GYM MANAGEMENT",
  tagline: "Modern gym management experience.",
  demoNotice: "Demo Project — Not a real gym",
};

/** The fixed "today" the whole demo is set on. */
export const DEMO_TODAY = {
  label: "Saturday, 30 May 2026",
  shortDay: "Sat",
  time: "08:42 PM",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Membership", href: "#membership" },
  { label: "Trainers", href: "#trainers" },
];

export const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    priceMonthly: 700,
    summary: "Gym floor access for members who train on their own.",
    features: ["Access to gym", "Locker access", "Basic support"],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 1000,
    summary: "The most common plan, with coaching check-ins built in.",
    features: ["Full gym access", "Locker access", "Trainer consultation", "Progress tracking"],
    highlighted: true,
  },
  {
    id: "elite",
    name: "Elite",
    priceMonthly: 1500,
    summary: "One-to-one coaching and nutrition for committed members.",
    features: ["Full access", "Personal trainer", "Nutrition consultation", "Priority support"],
  },
];

export const TRAINERS: Trainer[] = [
  {
    id: "t-omar",
    name: "Omar Hassan",
    role: "Strength Coach",
    specialty: "Powerlifting & hypertrophy",
    experienceYears: 8,
    availability: "Sat – Wed · 4 PM – 11 PM",
    onShiftToday: true,
    activeClients: 24,
    initials: "OH",
  },
  {
    id: "t-adam",
    name: "Adam Kareem",
    role: "Fitness Coach",
    specialty: "Conditioning & fat loss",
    experienceYears: 5,
    availability: "Daily · 7 AM – 2 PM",
    onShiftToday: true,
    activeClients: 31,
    initials: "AK",
  },
  {
    id: "t-youssef",
    name: "Youssef Ali",
    role: "Personal Trainer",
    specialty: "Mobility & beginner programs",
    experienceYears: 6,
    availability: "Sun – Thu · 12 PM – 9 PM",
    onShiftToday: false,
    activeClients: 18,
    initials: "YA",
  },
];

export const MEMBERS: Member[] = [
  {
    id: "m-001",
    name: "Ahmed Hassan",
    initials: "AH",
    memberCode: "ID-20417",
    plan: "pro",
    status: "active",
    joined: "2026-05-12",
    expires: "2026-06-12",
    lastVisit: "Today",
    visitsThisMonth: 18,
    trainerId: "t-omar",
    goal: "Weight Training",
  },
  {
    id: "m-002",
    name: "Mariam Adel",
    initials: "MA",
    memberCode: "ID-20398",
    plan: "elite",
    status: "active",
    joined: "2026-02-03",
    expires: "2026-08-03",
    lastVisit: "Yesterday",
    visitsThisMonth: 14,
    trainerId: "t-youssef",
    goal: "Mobility",
  },
  {
    id: "m-003",
    name: "Karim Mostafa",
    initials: "KM",
    memberCode: "ID-20352",
    plan: "basic",
    status: "expiring",
    joined: "2026-03-02",
    expires: "2026-06-02",
    lastVisit: "2 days ago",
    visitsThisMonth: 9,
    goal: "General Fitness",
  },
  {
    id: "m-004",
    name: "Nour Samir",
    initials: "NS",
    memberCode: "ID-20411",
    plan: "pro",
    status: "active",
    joined: "2026-05-20",
    expires: "2026-06-20",
    lastVisit: "Today",
    visitsThisMonth: 7,
    trainerId: "t-adam",
    goal: "Fat Loss",
  },
  {
    id: "m-005",
    name: "Hana Tarek",
    initials: "HT",
    memberCode: "ID-20288",
    plan: "pro",
    status: "expiring",
    joined: "2026-03-04",
    expires: "2026-06-04",
    lastVisit: "Today",
    visitsThisMonth: 16,
    trainerId: "t-adam",
    goal: "Conditioning",
  },
  {
    id: "m-006",
    name: "Mostafa Ibrahim",
    initials: "MI",
    memberCode: "ID-20193",
    plan: "basic",
    status: "expired",
    joined: "2026-01-25",
    expires: "2026-05-25",
    lastVisit: "8 days ago",
    visitsThisMonth: 4,
    goal: "Weight Training",
  },
  {
    id: "m-007",
    name: "Salma Youssef",
    initials: "SY",
    memberCode: "ID-20405",
    plan: "elite",
    status: "active",
    joined: "2026-05-16",
    expires: "2026-11-16",
    lastVisit: "Today",
    visitsThisMonth: 12,
    trainerId: "t-omar",
    goal: "Strength",
  },
  {
    id: "m-008",
    name: "Ziad Khaled",
    initials: "ZK",
    memberCode: "ID-20246",
    plan: "pro",
    status: "frozen",
    joined: "2026-02-10",
    expires: "2026-06-24",
    lastVisit: "3 weeks ago",
    visitsThisMonth: 0,
    goal: "Weight Training",
  },
  {
    id: "m-009",
    name: "Yasmin Fathy",
    initials: "YF",
    memberCode: "ID-20371",
    plan: "basic",
    status: "expiring",
    joined: "2026-04-07",
    expires: "2026-06-07",
    lastVisit: "Yesterday",
    visitsThisMonth: 11,
    goal: "General Fitness",
  },
];

/** The member used across the check-in, profile and mobile previews. */
export const FEATURED_MEMBER_ID = "m-001";

export const OVERVIEW_STATS: Stat[] = [
  { id: "members", label: "Active Members", value: "1,248", change: "+36", trend: "up", hint: "vs. last month" },
  { id: "checkins", label: "Today's Check-ins", value: "186", change: "+12%", trend: "up", hint: "vs. last Saturday" },
  { id: "retention", label: "Member Retention", value: "94%", change: "+2 pts", trend: "up", hint: "rolling 90 days" },
  { id: "revenue", label: "Monthly Revenue", value: "EGP 284K", change: "+8%", trend: "up", hint: "collected in May" },
];

export const WEEK_ATTENDANCE: DayAttendance[] = [
  { day: "Sun", checkIns: 164 },
  { day: "Mon", checkIns: 192 },
  { day: "Tue", checkIns: 178 },
  { day: "Wed", checkIns: 205 },
  { day: "Thu", checkIns: 171 },
  { day: "Fri", checkIns: 96 },
  { day: "Sat", checkIns: 186, isToday: true },
];

/** Active members per plan. Sums to the 1,248 active members above. */
export const MEMBERSHIP_MIX: { plan: Plan["id"]; members: number }[] = [
  { plan: "basic", members: 412 },
  { plan: "pro", members: 596 },
  { plan: "elite", members: 240 },
];

/** Busiest hours today, used in the member app. */
export const PEAK_HOURS = [
  { hour: "6 AM", load: 0.35 },
  { hour: "9 AM", load: 0.5 },
  { hour: "12 PM", load: 0.3 },
  { hour: "3 PM", load: 0.45 },
  { hour: "6 PM", load: 0.85 },
  { hour: "9 PM", load: 0.95 },
];

/** Days of May 2026 on which the featured member checked in. */
export const FEATURED_MEMBER_VISIT_DAYS = [
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30,
];

export const FEATURED_MEMBER_RECENT_VISITS = [
  { date: "Today", time: "08:42 PM", duration: "In the gym" },
  { date: "Fri, 29 May", time: "07:15 PM", duration: "1 h 20 min" },
  { date: "Thu, 28 May", time: "08:05 PM", duration: "1 h 05 min" },
  { date: "Wed, 27 May", time: "06:50 PM", duration: "1 h 35 min" },
];

export const FEATURES: Feature[] = [
  {
    id: "memberships",
    icon: "memberships",
    title: "Membership Management",
    description: "Keep every membership organized in one place.",
    detail: "Plans, freezes, upgrades and payment history on one record.",
  },
  {
    id: "attendance",
    icon: "attendance",
    title: "Attendance Tracking",
    description: "Know who is inside your gym and when they visited.",
    detail: "Search or QR check-in in seconds at the front desk.",
  },
  {
    id: "profiles",
    icon: "profiles",
    title: "Member Profiles",
    description: "Keep important member information organized.",
    detail: "Goals, assigned trainer and visit history per member.",
  },
  {
    id: "renewals",
    icon: "renewals",
    title: "Renewal Tracking",
    description: "See upcoming renewals before memberships expire.",
    detail: "A daily list of who to call this week, sorted by date.",
  },
  {
    id: "trainers",
    icon: "trainers",
    title: "Trainer Management",
    description: "Organize trainers, schedules, and specialties.",
    detail: "Working hours, client load and specialties at a glance.",
  },
  {
    id: "reports",
    icon: "reports",
    title: "Reports",
    description: "Understand gym activity through clear visual reports.",
    detail: "Attendance peaks, plan mix and revenue by month.",
  },
];

export const DASHBOARD_NAV = [
  "Overview",
  "Members",
  "Attendance",
  "Memberships",
  "Trainers",
  "Payments",
  "Reports",
] as const;

export const GYM_SIZES = ["Under 200 members", "200 – 500 members", "500 – 1,000 members", "Over 1,000 members"];

export const CITIES = ["Cairo", "Giza", "Alexandria", "Mansoura", "Tanta", "Other"];
