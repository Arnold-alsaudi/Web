import { WEEK_ATTENDANCE } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const MAX = 250;
const TICKS = [250, 200, 150, 100, 50, 0];

/** Weekly check-ins, drawn to one linear scale (0–250). */
export function AttendanceChart({ height = 180, showAxis = true }: { height?: number; showAxis?: boolean }) {
  const total = WEEK_ATTENDANCE.reduce((s, d) => s + d.checkIns, 0);
  return (
    <figure className="m-0" aria-label={`Check-ins this week: ${total} in total`}>
      <div className="flex gap-3">
        {showAxis && (
          <div className="flex flex-col justify-between text-right text-[10px] text-muted tabular" style={{ height }} aria-hidden>
            {TICKS.map((t) => (
              <span key={t} className="-translate-y-1/2 leading-none last:translate-y-0">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="relative flex-1">
          {/* grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between" style={{ height }} aria-hidden>
            {TICKS.map((t) => (
              <span key={t} className={cn("h-px w-full", t === 0 ? "bg-border-strong" : "bg-border/60")} />
            ))}
          </div>
          <ul className="relative flex items-end justify-between gap-2 sm:gap-3" style={{ height }}>
            {WEEK_ATTENDANCE.map((d) => (
              <li key={d.day} className="group relative flex h-full flex-1 items-end justify-center">
                <span
                  className={cn(
                    "pointer-events-none absolute left-1/2 -translate-x-1/2 text-[11px] font-medium tabular transition-opacity duration-150",
                    d.isToday ? "text-fg opacity-100" : "text-fg-2 opacity-0 group-hover:opacity-100",
                  )}
                  style={{ bottom: `calc(${(d.checkIns / MAX) * 100}% + 6px)` }}
                >
                  {d.checkIns}
                </span>
                <span
                  className={cn(
                    "w-full max-w-[34px] rounded-t-[3px] transition-colors duration-150",
                    d.isToday ? "bg-brand" : "bg-[#34343b] group-hover:bg-[#44444c]",
                  )}
                  style={{ height: `${(d.checkIns / MAX) * 100}%` }}
                  role="img"
                  aria-label={`${d.day}: ${d.checkIns} check-ins${d.isToday ? " (today)" : ""}`}
                />
              </li>
            ))}
          </ul>
          <ul className="mt-2 flex justify-between gap-2 sm:gap-3" aria-hidden>
            {WEEK_ATTENDANCE.map((d) => (
              <li key={d.day} className={cn("flex-1 text-center text-[11px]", d.isToday ? "font-medium text-fg" : "text-muted")}>
                {d.isToday ? "Today" : d.day}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
