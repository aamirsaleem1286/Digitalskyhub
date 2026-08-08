import type { Metadata } from "next";
import { BlogListContent } from "./BlogListContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore Digital Sky Hub's blog for insights on AI, automation, software development, design, and digital marketing.",
  openGraph: {
    title: "Blog | Digital Sky Hub",
    description: "Insights and expertise on AI, technology, design, and digital transformation.",
  },
};

export default function BlogPage() {
  return <BlogListContent />;
}
