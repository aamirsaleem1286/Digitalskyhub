"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, useCallback, useState } from "react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  className?: string;
  magnetic?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  icon,
  iconPosition = "right",
  loading = false,
  className,
  magnetic = false,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary overflow-hidden group cursor-pointer select-none";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-primary text-white hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]",
    secondary:
      "bg-secondary text-white hover:shadow-lg hover:shadow-secondary/25 active:scale-[0.98]",
    outline:
      "border border-primary/30 text-foreground hover:bg-primary hover:text-white hover:border-primary active:scale-[0.98]",
    ghost:
      "text-foreground hover:bg-white/5 active:scale-[0.98]",
    gradient:
      "bg-gradient-to-r from-primary via-secondary to-accent text-white hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]",
  };

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    },
    []
  );

  const content = (
    <>
      {/* Ripple container */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/20 animate-ripple"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}
      </span>

      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && (
        <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">
          {icon}
        </span>
      )}
      <span className="relative z-10">{children}</span>
      {!loading && icon && iconPosition === "right" && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
      {variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />
      )}
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    onClick: handleClick,
    className: cn(baseStyles, sizes[size], variants[variant], className, magnetic && "magnetic-btn"),
    ...props,
  };

  if (href) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (
      <motion.a href={href} {...(motionProps as any)}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" {...motionProps}>
      {content}
    </motion.button>
  );
}
