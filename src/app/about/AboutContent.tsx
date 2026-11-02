"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { teamMembers } from "@/data/content";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { stats } from "@/data/content";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ArrowRight, Quote } from "lucide-react";
import Link from "next/link";

export function AboutContent() {
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
              About Us
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              We Are <span className="gradient-text">AI Solution IT</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A team of innovators, engineers, and designers passionate about
              transforming businesses through AI, automation, and digital excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <GlassCard key={stat.label} glow="blue" className="text-center p-6">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  <AnimatedCounter value={parseInt(stat.value)} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* About Section (Mission, Vision, Values) */}
      <AboutSection />

      {/* Company Story */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <GlassCard glow="blue" className="p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">Our Story</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                AI Solution IT was founded with a simple yet ambitious vision: to make
                enterprise-grade AI and digital technology accessible to every business.
                We recognized that while large corporations had the resources to leverage
                cutting-edge technology, small and medium businesses were often left behind.
              </p>
              <p>
                Starting as a small team of passionate engineers and designers, we have grown
                into a global digital innovation partner, serving clients across fintech,
                healthcare, e-commerce, logistics, and more. Our secret? We combine deep
                technical expertise with a relentless focus on delivering measurable business value.
              </p>
              <p>
                Today, AI Solution IT is home to 50+ talented professionals across AI engineering,
                software development, design, and digital marketing. We have delivered 100+ successful
                projects and maintain a 98% client satisfaction rate — a testament to our commitment
                to quality and partnership.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding pt-0">
        <div className="container-custom mx-auto px-4 md:px-6">
          <SectionHeading title="Meet Our Leadership" subtitle="Team" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard glow="purple" className="text-center p-6" hover={true}>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-2 mt-4">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors text-xs">LinkedIn</a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-colors text-xs">Twitter</a>
                    )}
                  </div>
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
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Want to Join Our Journey?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We&apos;re always looking for talented individuals who share our passion for innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/careers" variant="gradient" icon={<ArrowRight className="w-4 h-4" />}>
                View Open Positions
              </Button>
              <Button href="/contact" variant="outline">
                Get in Touch
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
