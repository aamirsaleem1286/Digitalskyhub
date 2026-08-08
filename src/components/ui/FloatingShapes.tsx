"use client";

import { motion } from "framer-motion";

interface FloatingShape {
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

export function FloatingShapes() {
  const shapes: FloatingShape[] = [
    { Icon: Circle, color: "text-primary/20", size: 24, x: 10, y: 20, duration: 6, delay: 0 },
    { Icon: Square, color: "text-secondary/20", size: 20, x: 85, y: 30, duration: 7, delay: 1 },
    { Icon: Triangle, color: "text-accent/20", size: 22, x: 70, y: 70, duration: 8, delay: 2 },
    { Icon: Hexagon, color: "text-primary/15", size: 18, x: 20, y: 75, duration: 6.5, delay: 0.5 },
    { Icon: Circle, color: "text-secondary/15", size: 16, x: 90, y: 15, duration: 7.5, delay: 1.5 },
    { Icon: Square, color: "text-accent/15", size: 14, x: 45, y: 10, duration: 6, delay: 3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
          animate={{
            y: [0, -15, 0, 10, 0],
            x: [0, 10, -5, 5, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <shape.Icon className={shape.color} />
        </motion.div>
      ))}
    </div>
  );
}

function Circle({ className }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Square({ className }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Triangle({ className }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3L21 19H3L12 3Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Hexagon({ className }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}