import { TRAINERS } from "@/lib/mockData";
import { TrainerCard } from "./trainer-card";
import { DemoTag } from "./ui/badge";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { SectionHeading } from "./ui/section-heading";

export function Trainers() {
  return (
    <section id="trainers" className="border-b border-border py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Trainers"
          title="Know who is coaching, and when."
          description="Each trainer has a profile with specialties, working hours and current client load, so members get matched with the right coach."
          aside={<DemoTag label="Sample trainers" />}
        />
        <Reveal className="mt-12 sm:mt-14">
          <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
            {TRAINERS.map((t) => (
              <TrainerCard key={t.id} trainer={t} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
