import type { Metadata } from "next";
import { PaymentContent } from "./PaymentContent";

export const metadata: Metadata = {
  title: "Payment",
  description:
    "Secure bank transfer payment details for AI Solution IT. Pay your invoice via RHB Bank.",
  openGraph: {
    title: "Payment | AI Solution IT",
    description: "Bank transfer payment details for AI Solution IT.",
  },
};

export default function PaymentPage() {
  return <PaymentContent />;
}
