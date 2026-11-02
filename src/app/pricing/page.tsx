import type { Metadata } from "next";
import { PricingContent } from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "View AI Solution IT's transparent pricing for startup, business, and enterprise plans. Custom solutions available.",
  openGraph: {
    title: "Pricing | AI Solution IT",
    description: "Flexible pricing plans for businesses of all sizes. From startups to enterprises.",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
