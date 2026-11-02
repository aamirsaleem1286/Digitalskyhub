import type { Metadata } from "next";
import { CareersContent } from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join AI Solution IT! Explore open positions in AI engineering, software development, design, and digital marketing.",
  openGraph: {
    title: "Careers | AI Solution IT",
    description: "Join our team and help build the future of digital innovation.",
  },
};

export default function CareersPage() {
  return <CareersContent />;
}
