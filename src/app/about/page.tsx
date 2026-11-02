import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about AI Solution IT's mission, vision, and team. We're on a mission to transform businesses with AI, automation, and digital innovation.",
  openGraph: {
    title: "About AI Solution IT | AI & Digital Innovation",
    description:
      "Discover the story behind AI Solution IT. We build world-class AI solutions, custom software, and digital strategies.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
