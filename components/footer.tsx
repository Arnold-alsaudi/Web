"use client";

import Link from "next/link";
import { BRAND } from "@/lib/mockData";
import { useDemo } from "./demo-provider";
import { Logo } from "./logo";
import { Container } from "./ui/container";

const LINKS = [
  { label: "Product", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Membership", href: "#membership" },
  { label: "Trainers", href: "#trainers" },
];

const linkClass = "text-sm text-fg-2 transition-colors duration-150 hover:text-fg";

export function Footer() {
  const { openBookDemo } = useDemo();
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-[320px]">
          <Logo withProduct={false} />
          <p className="mt-4 text-sm text-fg-2">{BRAND.tagline}</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className={linkClass}>
              {l.label}
            </a>
          ))}
          <button type="button" onClick={openBookDemo} className={`${linkClass} text-left`}>
            Contact
          </button>
          <Link href="/design-system/" className={linkClass}>
            Design system
          </Link>
        </nav>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <span>© 2026 Iron District. Concept product.</span>
          <span className="font-medium text-fg-2">{BRAND.demoNotice}</span>
        </Container>
      </div>
    </footer>
  );
}
