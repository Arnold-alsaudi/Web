"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useDemo } from "./demo-provider";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Container } from "./ui/container";

export function Navbar() {
  const { openBookDemo } = useDemo();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Highlight the nav item of the section in the middle of the screen.
    // Sections without a nav item clear the highlight.
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((el) => io.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200",
        scrolled || open ? "border-border bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="#top" aria-label="Iron District, back to top" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : undefined}
              className={cn(
                "rounded-sm px-3 py-2 text-sm transition-colors duration-150",
                active === item.href ? "text-fg" : "text-fg-2 hover:text-fg",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button size="sm" onClick={openBookDemo}>
              Book a Demo
            </Button>
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-sm text-fg-2 transition-colors hover:bg-surface hover:text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="animate-fade-in border-t border-border bg-bg lg:hidden">
          <Container className="flex h-[calc(100svh-64px)] flex-col py-4">
            <nav aria-label="Mobile" className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border py-4 font-display text-xl font-semibold text-fg"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pb-6">
              <Button
                size="lg"
                onClick={() => {
                  setOpen(false);
                  openBookDemo();
                }}
              >
                Book a Demo
              </Button>
              <p className="text-center text-xs text-muted">Demo project — not a real gym</p>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
