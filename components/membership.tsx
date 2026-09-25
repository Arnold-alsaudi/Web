import { PLANS } from "@/lib/mockData";
import { MembershipCard } from "./membership-card";
import { DemoTag } from "./ui/badge";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

export function Membership() {
  return (
    <section id="membership" className="border-b border-border bg-bg-2/40 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Membership"
          title="Membership Plans"
          description="Set up your own plans and prices. Members see exactly what they pay for, and the front desk sees who is on which plan."
          aside={<DemoTag label="Sample pricing" />}
        />
        <Reveal className="mt-12 sm:mt-14">
          <div className="grid items-stretch gap-4 md:grid-cols-3 lg:gap-5">
            {PLANS.map((p) => (
              <MembershipCard key={p.id} plan={p} />
            ))}
          </div>
        </Reveal>
        <p className="mt-6 text-xs text-muted">
          Prices shown are examples for this demo only. They are not real prices or a pricing recommendation. No
          payment is taken.
        </p>
      </Container>
    </section>
  );
}
