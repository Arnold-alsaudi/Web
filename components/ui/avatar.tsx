import { cn } from "@/lib/utils";

const sizes = {
  sm: "size-8 text-[11px]",
  md: "size-10 text-xs",
  lg: "size-14 text-base",
};

/** Initials avatar. The demo deliberately avoids photos of real people. */
export function Avatar({
  initials,
  size = "md",
  className,
}: {
  initials: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full border border-border-strong bg-bg-2 font-semibold text-fg-2",
        sizes[size],
        className,
      )}
      aria-hidden
    >
      {initials}
    </span>
  );
}
