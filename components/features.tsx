import { FEATURES } from "@/lib/mockData";
import { FeatureCard } from "./feature-card";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

export function Features() {
  return (
    <section id="features" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Six tools your gym already needs."
          description="Each one replaces a notebook, a spreadsheet or a WhatsApp thread the team uses today."
        />
        <Reveal className="mt-12 sm:mt-14">
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <FeatureCard key={f.id} feature={f} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
