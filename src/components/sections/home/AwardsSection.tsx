"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy } from "lucide-react";

interface Award {
  icon: typeof Trophy;
  title: string;
  description: string;
  badge: string;
}

const awards: Award[] = [
  {
    icon: Trophy,
    title: "Top Software Development Agency",
    description:
      "Recognized for delivering innovative, scalable, and high-quality software solutions.",
    badge: "Verified Award",
  },
  {
    icon: Trophy,
    title: "Trustpilot Recognition",
    description:
      "Recognized for outstanding customer satisfaction and consistently excellent client reviews.",
    badge: "Verified Award",
  },
  {
    icon: Trophy,
    title: "UpCity Top Agency 2020",
    description:
      "Honored by UpCity for excellence in digital services and client success.",
    badge: "Verified Award",
  },
  {
    icon: Trophy,
    title: "Clutch – Clients Say We Deliver",
    description:
      "Recognized on Clutch for exceptional project delivery, communication, and client satisfaction.",
    badge: "Verified Award",
  },
];

export function AwardsSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[128px]" />
      </div>

      <div className="container-custom mx-auto relative z-10 ">
        {/* Section heading */}
        <div className="max-w-3xl mx-auto text-center  mt-[-100px] md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Our Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="gradient-text">Awards &amp; Recognition</span>
          </h2>
        </div>

        {/* Grid of cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {awards.map((award) => (
            <GlassCard
              key={award.title}
              glow="blue"
              className="p-6 md:p-8 text-center"
              hover={true}
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <award.icon className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-semibold">{award.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{award.description}</p>
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {award.badge}
              </span>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
