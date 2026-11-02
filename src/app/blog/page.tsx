import type { Metadata } from "next";
import { BlogListContent } from "./BlogListContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Explore AI Solution IT's blog for insights on AI, automation, software development, design, and digital marketing.",
  openGraph: {
    title: "Blog | AI Solution IT",
    description: "Insights and expertise on AI, technology, design, and digital transformation.",
  },
};

export default function BlogPage() {
  return <BlogListContent />;
}
