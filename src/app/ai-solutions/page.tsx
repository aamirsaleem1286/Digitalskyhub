import type { Metadata } from "next";
import { AiSolutionsContent } from "./AiSolutionsContent";

export const metadata: Metadata = {
  title: "AI Solutions",
  description:
    "Discover AI Solution IT's AI solutions: AI agents, chatbots, voice AI, document processing, and intelligent automation for your business.",
  openGraph: {
    title: "AI Solutions | AI Solution IT",
    description:
      "Enterprise AI solutions including AI agents, chatbots, voice AI, and intelligent process automation.",
  },
};

export default function AiSolutionsPage() {
  return <AiSolutionsContent />;
}
