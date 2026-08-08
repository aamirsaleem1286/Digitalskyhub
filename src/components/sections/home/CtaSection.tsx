"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px]" />
      </div>
      <div className="container-custom mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Ready to Transform Your Business?
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Let&apos;s Build Your{' '}
            <span className="gradient-text">Digital Future</span> Today
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Schedule a free consultation with our team. We&apos;ll discuss your goals,
            challenges, and craft a tailored roadmap for your digital transformation journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/contact"
              size="lg"
              variant="gradient"
              className="w-full sm:w-auto shadow-2xl shadow-primary/20"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Book Free Consultation
            </Button>
            <Button
              href="/case-studies"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              View Case Studies
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
