import type { Metadata } from "next";
import { PortfolioContent } from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore AI Solution IT's portfolio of AI, web, mobile, automation, marketing, and branding projects.",
  openGraph: {
    title: "Portfolio | AI Solution IT",
    description: "See our latest work in AI, software development, design, and digital marketing.",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
