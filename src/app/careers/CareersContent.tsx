"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { careerPositions } from "@/data/content";
import { cn } from "@/lib/utils";
import { MapPin, Clock, Building2, ChevronDown, ChevronUp, Check } from "lucide-react";

export function CareersContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container-custom mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Careers
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Build the <span className="gradient-text">Future</span> With Us
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our team of innovators and help shape the next generation of AI-powered
              business solutions. We&apos;re always looking for talented individuals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <GlassCard glow="blue" className="p-8 md:p-12 max-w-4xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Why Work at Digital Sky Hub?</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Work on cutting-edge AI & technology",
                "Remote-first culture",
                "Competitive salary & benefits",
                "Continuous learning & development",
                "Collaborative team environment",
                "Impact-driven projects",
                "Flexible working hours",
                "Growth opportunities",
              ].map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/80">{perk}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Open Positions</span>
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {careerPositions.map((position, i) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <GlassCard glow="blue" className="p-0 overflow-hidden">
                  <button
                    onClick={() => setExpandedId(expandedId === position.id ? null : position.id)}
                    className="w-full p-5 md:p-6 text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{position.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {expandedId === position.id ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedId === position.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-white/5 pt-5 space-y-5">
                          <p className="text-sm text-muted-foreground">{position.description}</p>
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Requirements</h4>
                            <ul className="space-y-1.5">
                              {position.requirements.map((req) => (
                                <li key={req} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-2">Responsibilities</h4>
                            <ul className="space-y-1.5">
                              {position.responsibilities.map((resp) => (
                                <li key={resp} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-secondary mt-2 flex-shrink-0" />
                                  {resp}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <Button href="/contact" variant="gradient" size="sm">
                            Apply Now
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <GlassCard glow="cyan" className="p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Don&apos;t See Your Role?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Send us your resume anyway. We&apos;re always open to hearing from talented individuals.
            </p>
            <Button href="/contact" variant="gradient" size="lg">
              Send Your Resume
            </Button>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
