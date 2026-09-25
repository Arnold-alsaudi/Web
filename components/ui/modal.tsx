"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocused.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusable = () =>
      panel?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])',
      ) ?? [];
    // Focus the first form control if there is one, otherwise the panel.
    const first = panel?.querySelector<HTMLElement>("input, select") ?? panel;
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = [...focusable()];
        if (!items.length) return;
        const [head, tail] = [items[0], items[items.length - 1]];
        if (e.shiftKey && document.activeElement === head) {
          e.preventDefault();
          tail.focus();
        } else if (!e.shiftKey && document.activeElement === tail) {
          e.preventDefault();
          head.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 animate-fade-in bg-black/70" onClick={onClose} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative flex max-h-[92svh] w-full animate-scale-in flex-col rounded-t-lg border border-border bg-bg-2 shadow-2xl shadow-black/60 outline-none sm:max-w-[480px] sm:rounded-lg"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div>
            <h2 id={titleId} className="text-lg font-semibold">
              {title}
            </h2>
            {description && <div className="mt-1 text-[13px] text-fg-2">{description}</div>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 grid size-9 shrink-0 place-items-center rounded-sm text-fg-2 transition-colors hover:bg-surface hover:text-fg"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
        {footer && <div className="border-t border-border px-6 py-4">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
