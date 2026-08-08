import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Digital Sky Hub. Book a free consultation for AI, automation, software development, or digital marketing services.",
  openGraph: {
    title: "Contact Us | Digital Sky Hub",
    description: "Let's discuss your project. Free consultation available.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
