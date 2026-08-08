import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Digital Sky Hub's mission, vision, and team. We're on a mission to transform businesses with AI, automation, and digital innovation.",
  openGraph: {
    title: "About Digital Sky Hub | AI & Digital Innovation",
    description:
      "Discover the story behind Digital Sky Hub. We build world-class AI solutions, custom software, and digital strategies.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
