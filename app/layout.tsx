import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Iron District — Gym Management",
  description:
    "A demo of a modern gym management experience: memberships, attendance, trainers and member profiles. All data is invented.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0d0d10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
