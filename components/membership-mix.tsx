import { MEMBERSHIP_MIX } from "@/lib/mockData";
import { getPlan } from "@/lib/utils";

const COLORS = { basic: "#4a4a52", pro: "#8b6f47", elite: "#b59a72" } as const;

export function MembershipMix() {
  const total = MEMBERSHIP_MIX.reduce((s, m) => s + m.members, 0);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-display text-2xl font-semibold tabular">{total.toLocaleString("en-US")}</p>
        <p className="text-xs text-muted">active memberships</p>
      </div>
      <div className="mt-4 flex h-2 gap-0.5 overflow-hidden rounded-full" role="img" aria-label="Active members by plan">
        {MEMBERSHIP_MIX.map((m) => (
          <span key={m.plan} style={{ width: `${(m.members / total) * 100}%`, background: COLORS[m.plan] }} />
        ))}
      </div>
      <ul className="mt-4 flex flex-col gap-2.5">
        {MEMBERSHIP_MIX.map((m) => (
          <li key={m.plan} className="flex items-center gap-2.5 text-[13px]">
            <span className="size-2 rounded-full" style={{ background: COLORS[m.plan] }} aria-hidden />
            <span className="text-fg-2">{getPlan(m.plan).name}</span>
            <span className="ml-auto tabular">{m.members.toLocaleString("en-US")}</span>
            <span className="w-10 text-right text-muted tabular">{Math.round((m.members / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
