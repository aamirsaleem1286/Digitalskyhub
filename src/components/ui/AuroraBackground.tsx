"use client";

import { useRef, useEffect } from "react";

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const gradientColors = [
      { r: 37, g: 99, b: 235 },   // primary blue
      { r: 6, g: 182, b: 212 },   // secondary cyan
      { r: 124, g: 58, b: 237 },  // accent purple
    ];

    const layers = Array.from({ length: 3 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.5 + canvas.height * 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.15,
      radius: 300 + Math.random() * 400,
      color: gradientColors[i],
      alpha: 0.04 + Math.random() * 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      layers.forEach((layer) => {
        layer.x += layer.vx;
        layer.y += layer.vy;

        if (layer.x < -layer.radius) layer.x = canvas.width + layer.radius;
        if (layer.x > canvas.width + layer.radius) layer.x = -layer.radius;
        if (layer.y < -layer.radius) layer.y = canvas.height + layer.radius;
        if (layer.y > canvas.height + layer.radius) layer.y = -layer.radius;

        const gradient = ctx.createRadialGradient(
          layer.x,
          layer.y,
          0,
          layer.x,
          layer.y,
          layer.radius
        );
        gradient.addColorStop(
          0,
          `rgba(${layer.color.r}, ${layer.color.g}, ${layer.color.b}, ${layer.alpha})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${layer.color.r}, ${layer.color.g}, ${layer.color.b}, ${layer.alpha * 0.5})`
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
