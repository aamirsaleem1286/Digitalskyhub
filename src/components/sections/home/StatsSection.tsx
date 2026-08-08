"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Briefcase, HeartHandshake, Users, Globe, Activity, type LucideIcon
} from "lucide-react";

interface Stat {
  icon: LucideIcon;
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Briefcase, target: 250, suffix: "+", label: "Successful Projects" },
  { icon: HeartHandshake, target: 90, suffix: "%", label: "Client Retention" },
  { icon: Users, target: 50, suffix: "+", label: "Tech Experts" },
  { icon: Globe, target: 10, suffix: "+", label: "Industries Served" },
  { icon: Activity, target: 70, suffix: "+", label: "Ongoing Projects" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let frameId: number;
    const duration = 4000; // 4 seconds — slow and smooth

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic for a gradual slowdown
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setCount(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target]);

  return (
    <>
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-3xl md:text-4xl font-bold gradient-text inline-block"
    >
      {count}{suffix}
    </motion.span></>
  );
}

export function StatsSection() {
  return (
    <section className="section-padding relative overflow-hidden mt-[-100px]">
      {/* Background glow */}
      <h1 className="mb-4 text-center text-bold text-4xl">What Makes Us Different?</h1>
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[128px]" />
      </div>

      <div className="container-custom mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <GlassCard
              key={stat.label}
              glow="blue"
              className="text-center p-6 md:p-8"
              hover={true}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>

              <AnimatedCounter target={stat.target} suffix={stat.suffix} />

              <p className="text-sm text-muted-foreground font-medium mt-1">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}