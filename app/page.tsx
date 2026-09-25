import { AttendanceExperience } from "@/components/attendance-preview";
import { Cta } from "@/components/cta";
import { DashboardPreviewSection } from "@/components/dashboard-preview";
import { DemoProvider } from "@/components/demo-provider";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MemberProfileSection } from "@/components/member-profile";
import { Membership } from "@/components/membership";
import { MobilePreviewSection } from "@/components/mobile-preview";
import { Navbar } from "@/components/navbar";
import { Trainers } from "@/components/trainers";

export default function Home() {
  return (
    <DemoProvider>
      <div className="border-b border-border bg-bg-2 py-2 text-center text-[11px] tracking-wide text-muted">
        Demo project. All names, numbers and prices on this page are invented.
      </div>
      <Navbar />
      <main>
        <Hero />
        <DashboardPreviewSection />
        <Features />
        <Membership />
        <Trainers />
        <AttendanceExperience />
        <MemberProfileSection />
        <MobilePreviewSection />
        <Cta />
      </main>
      <Footer />
    </DemoProvider>
  );
}
