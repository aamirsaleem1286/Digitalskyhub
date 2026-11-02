"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { pricingPlans } from "@/data/content";
import { FaqSection } from "@/components/sections/home/FaqSection";
import { CouponSection } from "@/components/sections/pricing/CouponSection";
import { Check, ArrowRight, HelpCircle, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export function PricingContent() {
  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10" />
        <div className="container-custom mx-auto px-4 md:px-6">
          <SectionHeading
            title="Transparent Pricing"
            subtitle="Pricing Plans"
          />

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard
                  glow={plan.highlighted ? "purple" : "blue"}
                  className={cn(
                    "p-8 relative",
                    plan.highlighted && "scale-105 border-primary/30 shadow-xl shadow-primary/10"
                  )}
                  hover={true}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-semibold shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    href="/contact"
                    variant={plan.highlighted ? "gradient" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Already have an invoice? Pay securely via bank transfer.
            </p>
            <Button href="/payment" variant="outline" icon={<CreditCard className="w-4 h-4" />}>
              Pay via Bank Transfer
            </Button>
          </div>
        </div>
      </section>

      <CouponSection />

      <FaqSection />
    </>
  );
}