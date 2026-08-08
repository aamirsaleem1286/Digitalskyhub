import type { Metadata } from "next";
import { CareersContent } from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Digital Sky Hub! Explore open positions in AI engineering, software development, design, and digital marketing.",
  openGraph: {
    title: "Careers | Digital Sky Hub",
    description: "Join our team and help build the future of digital innovation.",
  },
};

export default function CareersPage() {
  return <CareersContent />;
}
