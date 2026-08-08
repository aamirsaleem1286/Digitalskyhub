import type { Metadata } from "next";
import { CaseStudiesContent } from "./CaseStudiesContent";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore Digital Sky Hub's case studies showcasing AI automation, digital transformation, and software development success stories.",
  openGraph: {
    title: "Case Studies | Digital Sky Hub",
    description: "Real results from real projects. See how we transform businesses through technology.",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
