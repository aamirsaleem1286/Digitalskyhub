"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const { x, y } = useMousePosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    setIsVisible(true);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[9998] transition-opacity duration-300"
      style={{
        left: x - 150,
        top: y - 150,
        width: 300,
        height: 300,
        opacity: isVisible ? 0.12 : 0,
        background:
          "radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, rgba(6, 182, 212, 0.15) 40%, transparent 70%)",
        borderRadius: "50%",
        transform: "translate(0, 0)",
      }}
    />
  );
}
