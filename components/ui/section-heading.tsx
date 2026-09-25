import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-medium tracking-[0.14em] text-brand-soft uppercase", className)}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-[620px]">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-[28px] leading-[1.15] font-semibold text-fg sm:text-[34px] lg:text-[40px]">
          {title}
        </h2>
        {description && <p className="mt-4 text-[15px] leading-relaxed text-fg-2 sm:text-base">{description}</p>}
      </div>
      {aside}
    </div>
  );
}
