"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode, useRef, useCallback } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: "blue" | "cyan" | "purple" | "none";
  hover?: boolean;
  gradient?: boolean;
  tilt?: boolean;
  as?: "div" | "section";
}

export function GlassCard({
  children,
  className,
  glow = "none",
  hover = true,
  gradient = false,
  tilt = false,
  as = "div",
}: GlassCardProps) {
  const Component = motion[as];
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    },
    [tilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (!tilt || !cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, [tilt]);

  return (
    <Component
      ref={cardRef}
      className={cn(
        "glass rounded-2xl p-6 md:p-8",
        hover && "transition-all duration-500 hover:shadow-xl",
        glow === "blue" && "hover:shadow-blue-500/10",
        glow === "cyan" && "hover:shadow-cyan-500/10",
        glow === "purple" && "hover:shadow-purple-500/10",
        gradient && "gradient-card",
        tilt && "cursor-default",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      whileHover={hover && !tilt ? { y: -5, transition: { duration: 0.3 } } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: tilt ? "preserve-3d" : undefined, transition: tilt ? "transform 0.1s ease-out" : undefined }}
    >
      {children}
    </Component>
  );
}
