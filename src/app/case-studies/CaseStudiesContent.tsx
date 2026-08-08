"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/data/content";
import { Check, ArrowRight, Calendar, Building2 } from "lucide-react";

export function CaseStudiesContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      {/* Page Header */}
      <section className="relative pt-32 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="container-custom mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              Success Stories
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover how we&apos;ve helped businesses transform through AI,
              automation, and digital innovation. Real projects, real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6 space-y-8">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard glow="blue" className="p-0 overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-white/5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {study.industry}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Building2 className="w-3 h-3" />
                          {study.client}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">{study.title}</h2>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(study.id)}
                      icon={expandedId === study.id ? undefined : <ArrowRight className="w-4 h-4" />}
                    >
                      {expandedId === study.id ? "Show Less" : "View Details"}
                    </Button>
                  </div>
                  <p className="text-muted-foreground">{study.description}</p>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expandedId === study.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 md:p-8 space-y-8">
                        {/* Problem & Solution */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-red-400">The Problem</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{study.problem}</p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-green-400">Our Solution</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{study.solution}</p>
                          </div>
                        </div>

                        {/* Technology Stack */}
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Technology Stack</h3>
                          <div className="flex flex-wrap gap-2">
                            {study.technologies.map((tech) => (
                              <span key={tech} className="px-3 py-1.5 rounded-lg glass text-sm text-foreground/80">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
                          <div className="space-y-4">
                            {study.timeline.map((phase, i) => (
                              <div key={phase.phase} className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                                  {i < study.timeline.length - 1 && (
                                    <div className="w-px flex-1 bg-primary/20" />
                                  )}
                                </div>
                                <div className="pb-4">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-medium">{phase.phase}</h4>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {phase.duration}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{phase.details}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Results */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 text-primary">Results</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {study.results.map((result) => (
                              <GlassCard key={result.metric} glow="cyan" className="text-center p-4" hover={false}>
                                <div className="text-2xl font-bold gradient-text mb-1">{result.value}</div>
                                <div className="text-xs text-muted-foreground">{result.metric}</div>
                              </GlassCard>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <GlassCard glow="cyan" className="p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let&apos;s discuss how we can deliver similar results for your business.
            </p>
            <Button href="/contact" variant="gradient" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Start Your Project
            </Button>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
