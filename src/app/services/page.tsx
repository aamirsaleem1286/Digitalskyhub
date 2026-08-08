import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Digital Sky Hub's comprehensive services: AI & Automation, Software Development, Digital Marketing, Design & Branding, and more.",
  openGraph: {
    title: "Services | Digital Sky Hub",
    description:
      "Full-stack digital services including AI, automation, software development, design, and marketing.",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
