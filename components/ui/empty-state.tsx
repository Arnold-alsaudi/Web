import type { ReactNode } from "react";

export function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-border px-6 py-10 text-center">
      <div className="mb-1 grid size-10 place-items-center rounded-full border border-border text-muted">{icon}</div>
      <p className="text-sm font-medium text-fg">{title}</p>
      <p className="max-w-[280px] text-[13px] text-fg-2">{description}</p>
    </div>
  );
}
