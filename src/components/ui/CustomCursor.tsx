"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.5 });

  const dotX = useSpring(mouseX, { stiffness: 300, damping: 20, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 20, mass: 0.3 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor]') ||
        target.classList.contains("glass-card");

      if (cursorRef.current) {
        cursorRef.current.style.width = isInteractive ? "48px" : "32px";
        cursorRef.current.style.height = isInteractive ? "48px" : "32px";
        cursorRef.current.style.borderColor = isInteractive
          ? "rgba(37, 99, 235, 0.5)"
          : "rgba(255, 255, 255, 0.15)";
        cursorRef.current.style.backgroundColor = isInteractive
          ? "rgba(37, 99, 235, 0.08)"
          : "transparent";
      }

      if (glowRef.current) {
        glowRef.current.style.width = isInteractive ? "120px" : "200px";
        glowRef.current.style.height = isInteractive ? "120px" : "200px";
        glowRef.current.style.opacity = isInteractive ? "0.2" : "0.08";
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return (
    <>
      {/* Main cursor ring */}
      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full border border-white/15 transition-all duration-300 ease-out"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 32,
          height: 32,
          backgroundColor: "transparent",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full bg-primary"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 4,
          height: 4,
          boxShadow: "0 0 8px rgba(37, 99, 235, 0.6)",
        }}
      />

      {/* Glow */}
      <motion.div
        ref={glowRef}
        className="fixed pointer-events-none z-[9998] rounded-full transition-all duration-300"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(6, 182, 212, 0.06) 40%, transparent 70%)",
        }}
      />
    </>
  );
}
