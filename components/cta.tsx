"use client";

import { ArrowRight } from "lucide-react";
import { useDemo } from "./demo-provider";
import { Button, ButtonLink } from "./ui/button";
import { Container } from "./ui/container";

export function Cta() {
  const { openBookDemo } = useDemo();
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-start gap-8 rounded-lg border border-border bg-bg-2 px-6 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[560px]">
            <h2 className="text-[30px] leading-[1.15] font-semibold sm:text-[40px]">Ready to run your gym smarter?</h2>
            <p className="mt-4 text-base leading-relaxed text-fg-2">
              Build a better experience for your members and your team.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button size="lg" onClick={openBookDemo}>
              Book a Demo
            </Button>
            <ButtonLink href="#features" size="lg" variant="secondary" icon={<ArrowRight className="size-4" aria-hidden />}>
              Explore Features
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
