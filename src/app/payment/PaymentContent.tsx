"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Copy,
  Check,
  Landmark,
  Building2,
  CreditCard,
  ShieldCheck,
  Clock,
  MessageCircle,
  Mail,
  ArrowRight,
  Wallet,
  Banknote,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { bankDetails } from "@/data/bank";

const steps = [
  {
    title: "Transfer the amount",
    description:
      "Send the exact invoice amount to the RHB Bank account listed on this page using online banking, DuitNow, or IBG transfer.",
  },
  {
    title: "Add a payment reference",
    description:
      "Use your invoice number or project name as the transfer reference so we can match your payment quickly.",
  },
  {
    title: "Share your receipt",
    description:
      "Send us a screenshot or PDF of the transfer confirmation on WhatsApp or email.",
  },
  {
    title: "We confirm your payment",
    description:
      "Our team verifies the transfer and confirms your payment within 1 business day.",
  },
];

const details = [
  { key: "Bank", value: bankDetails.bankName, icon: Landmark, copy: false },
  { key: "Account Name", value: bankDetails.accountHolder, icon: Building2, copy: false },
  { key: "Account Number", value: bankDetails.accountNumber, icon: CreditCard, copy: true },
  // { key: "SWIFT / BIC", value: bankDetails.swiftCode, icon: Banknote, copy: true },
  { key: "Currency", value: bankDetails.currency, icon: Wallet, copy: false },
];

const notes = [
  "Please transfer the exact amount shown on your invoice.",
  "Bank transfer charges are not covered by AI Solution IT.",
  "For international transfers, use the SWIFT / BIC code above.",
  "We will never ask for your OTP, PIN, or online banking password.",
];

export function PaymentContent() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447418354297";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi AI Solution IT! I have completed a bank transfer and would like to share my payment receipt."
  )}`;

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ""));
      setCopiedKey(key);
      toast.success(`${key} copied`);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast.error("Could not copy. Please copy it manually.");
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10" />
        <div className="container-custom mx-auto px-4 md:px-6">
          <SectionHeading title="Bank Transfer Payment" subtitle="Secure Payment" />

          <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Bank details */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard glow="blue" className="p-6 md:p-8 h-full">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Landmark className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Bank Transfer Details</h3>
                      <p className="text-xs text-muted-foreground">
                        Use these details for your payment
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Secure
                  </span>
                </div>

                <div className="space-y-3">
                  {details.map((detail) => (
                    <div
                      key={detail.key}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <detail.icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-xs text-muted-foreground">{detail.key}</div>
                          <div className="text-sm font-semibold truncate">{detail.value}</div>
                        </div>
                      </div>
                      {detail.copy && (
                        <button
                          type="button"
                          onClick={() => handleCopy(detail.key, detail.value)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-xs text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                          aria-label={`Copy ${detail.key}`}
                        >
                          {copiedKey === detail.key ? (
                            <Check className="w-3.5 h-3.5 text-green-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          {copiedKey === detail.key ? "Copied" : "Copy"}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Payment reference:</span>{" "}
                    please add your invoice number or project name so we can identify your
                    payment.
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            {/* Confirm payment */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <GlassCard glow="purple" className="p-6 md:p-8 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Confirm Your Payment</h3>
                    <p className="text-xs text-muted-foreground">Takes less than a minute</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Once the transfer is complete, share the receipt with our team. We will
                  verify it and confirm your payment within 1 business day.
                </p>

                <div className="space-y-3 mt-auto">
                  <Button href={waLink} variant="gradient" className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    Send Receipt on WhatsApp
                  </Button>
                  <Button
                    href="mailto:aisolutionit26@gmail.com?subject=Payment%20Receipt%20-%20AI%20Solution%20IT"
                    variant="outline"
                    className="w-full"
                  >
                    <Mail className="w-4 h-4" />
                    Email Receipt
                  </Button>
                </div>

                <div className="mt-5 pt-5 border-t border-white/10 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your payment is confirmed only after our team verifies the transfer.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* How to pay */}
          <div className="max-w-6xl mx-auto mt-6">
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-lg font-bold mb-6">How to Pay</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {steps.map((step, i) => (
                  <div key={step.title} className="relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </span>
                      <h4 className="text-sm font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Notes */}
          <div className="max-w-6xl mx-auto mt-6">
            <GlassCard className="p-6 md:p-8">
              <h3 className="text-lg font-bold mb-4">Important Notes</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {notes.map((note) => (
                  <li key={note} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Button href="/contact" variant="ghost" icon={<ArrowRight className="w-4 h-4" />}>
                  Need help with your payment?
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
    </>
  );
}
