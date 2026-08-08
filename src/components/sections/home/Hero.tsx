"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FloatingShapes } from "@/components/ui/FloatingShapes";
import { TypingAnimation } from "@/components/ui/TypingAnimation";
import { AiOrbScene } from "@/components/three/AiOrb";
import { stats } from "@/data/content";
import dynamic from "next/dynamic";

const AiOrbNoSSR = dynamic(() => import("@/components/three/AiOrb").then((m) => ({ default: m.AiOrbScene })), {
  ssr: false,
});

const typingWords = [
  "AI Agent Development",
  "Website Development",
  "Mobile App Development",
  "Video Editing",
  "Graphic Design",
  "AI Chatbot Development",
  "WhatsApp AI Automation",
  "Voice AI Agents",
  "Workflow Automation",
  "OpenAI Integration",
  "Claude Integration",
  "Gemini Integration",
  "Business Automation",
  "Digital Marketing",
  "SEO Services",
];

export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D AI Orb Background */}
      <div className="absolute inset-0 z-0 opacity-60 md:opacity-80">
        <AiOrbNoSSR />
      </div>

      {/* Background layers */}
      <div className="absolute inset-0 hero-glow z-[1]" />
      <div className="absolute inset-0 grid-bg z-[1]" />
      <FloatingShapes />

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03] z-[1]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-primary/20 rounded-full animate-pulse-glow" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] border border-secondary/20 rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[400px] h-[400px] border border-accent/20 rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating AI Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
        {[
          { icon: "⟳", x: "10%", y: "20%", delay: 0 },
          { icon: "◇", x: "85%", y: "15%", delay: 1 },
          { icon: "⚡", x: "15%", y: "70%", delay: 2 },
          { icon: "◆", x: "80%", y: "75%", delay: 0.5 },
          { icon: "○", x: "50%", y: "10%", delay: 1.5 },
          { icon: "□", x: "90%", y: "50%", delay: 2.5 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-lg md:text-2xl text-primary/20 dark:text-primary/30"
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -20, 0, 15, 0],
              opacity: [0.2, 0.5, 0.2, 0.4, 0.2],
              scale: [1, 1.2, 1, 1.1, 1],
            }}
            transition={{
              duration: 4 + i,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <motion.div style={{ y: y1, opacity, scale }} className="relative z-10 w-full">
        <div className="container-custom mx-auto px-4 md:px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/20 text-sm text-primary font-medium mb-6 md:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>AI-Powered Business Solutions</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] mb-6 md:mb-8 max-w-6xl mx-auto"
          >
            <span className="text-foreground">Build Smarter Businesses with</span>
            <br />
            <span className="gradient-text">AI, Automation & Custom Software</span>
          </motion.h1>

          {/* Subheading with Typing Animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            We specialize in{' '}
            <span className="text-primary font-semibold">
              <TypingAnimation
                words={typingWords}
                typingSpeed={70}
                deletingSpeed={35}
                pauseDuration={2000}
              />
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed"
          >
            From intelligent automation to stunning digital experiences — we build what&apos;s next.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16"
          >
            <Button
              href="/contact"
              size="lg"
              variant="gradient"
              className="w-full sm:w-auto shadow-2xl shadow-primary/20"
            >
              Book Free Consultation
            </Button>
            <Button
              href="/services"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              Explore Services
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-4 md:p-6 text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
                  <AnimatedCounter value={parseInt(stat.value)} suffix={stat.suffix} />
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
