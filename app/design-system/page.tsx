import type { Metadata } from "next";
import { DesignSystem } from "./design-system";

export const metadata: Metadata = {
  title: "Design System — Iron District",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <DesignSystem />;
}
