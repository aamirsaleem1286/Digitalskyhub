import type { Metadata } from "next";
import { AwardsContent } from "./AwardsContent";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description:
    "Explore the awards, recognitions, and certifications earned by Digital Sky Hub. Trusted by Pasha Group, Clutch, GoodFirms, Google, and more.",
  openGraph: {
    title: "Awards & Recognition | Digital Sky Hub",
    description:
      "Discover the industry awards, client recognitions, and platform verifications that set Digital Sky Hub apart as a leader in AI, automation, and digital innovation.",
  },
};

export default function AwardsPage() {
  return <AwardsContent />;
}
