import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with AI Solution IT. Book a free consultation for AI, automation, software development, or digital marketing services.",
  openGraph: {
    title: "Contact Us | AI Solution IT",
    description: "Let's discuss your project. Free consultation available.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
