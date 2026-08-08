"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import {
  Target, Eye, Heart, Shield, Lightbulb, Rocket,
  BrainCircuit, BarChart3, Zap, Globe
} from "lucide-react";

const values = [
  { icon: Lightbulb, title: "Innovation First", description: "We leverage cutting-edge AI and technology to build solutions that push boundaries." },
  { icon: Shield, title: "Trust & Integrity", description: "Transparent processes, honest communication, and unwavering commitment to quality." },
  { icon: Rocket, title: "Results Driven", description: "Every project is measured by the tangible business value it delivers." },
  { icon: Heart, title: "Client Partnership", description: "We embed ourselves in your vision, becoming a true extension of your team." },
];

const whyUs = [
  { icon: BrainCircuit, title: "AI-Native Approach", description: "We don't just use AI — we build it. Our solutions are AI-first by design." },
  { icon: BarChart3, title: "Proven Track Record", description: "100+ successful projects with 98% client satisfaction across industries." },
  { icon: Zap, title: "Rapid Delivery", description: "Agile methodologies and automated pipelines ensure fast, reliable delivery." },
  { icon: Globe, title: "Global Team", description: "World-class talent across time zones, delivering 24/7 innovation." },
];

export function AboutSection() {
  return (
    <section className="section-padding relative overflow-hidden mt-[-100px]" id="about">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="container-custom mx-auto relative z-10">
        <SectionHeading
          title="About Digital Sky Hub"
          subtitle="Who We Are"
        />

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 ">
          <GlassCard glow="blue" className="p-8 md:p-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To democratize advanced technology by making AI, automation, and custom software
              accessible to businesses of all sizes. We empower organizations to achieve
              more with less — less time, less cost, less complexity.
            </p>
          </GlassCard>

          <GlassCard glow="purple" className="p-8 md:p-10">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center ">
              <Target className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              A world where every business, regardless of size, can harness the full power of
              artificial intelligence and digital technology to compete, grow, and lead in
              their industry. We envision a future where technology serves humanity seamlessly.
            </p>
          </GlassCard>
        </div>

        {/* Core Values */}
        <h3 className="text-2xl md:text-3xl font-bold text-center mt-4 mb-8">
          <span className="gradient-text ">Core Values</span>
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {values.map((value, i) => (
            <GlassCard key={value.title} glow="cyan" className="text-center p-6" hover={true}>
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </GlassCard>
          ))}
        </div>

        {/* Why Us */}
        <h3 className="text-2xl md:text-3xl font-bold text-center mt-4 mb-8">
          <span className="gradient-text">Why Digital Sky Hub?</span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-6">
          {whyUs.map((item, i) => (
            <GlassCard key={item.title} glow="blue" className="flex items-start gap-4 p-6" hover={true}>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
