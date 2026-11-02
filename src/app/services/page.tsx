import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore AI Solution IT's comprehensive services: AI & Automation, Software Development, Digital Marketing, Design & Branding, and more.",
  openGraph: {
    title: "Services | AI Solution IT",
    description:
      "Full-stack digital services including AI, automation, software development, design, and marketing.",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
