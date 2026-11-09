"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface ImageParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // e.g. 0.15 to 0.3
}

export function ImageParallax({
  children,
  className = "",
  speed = 0.15,
}: ImageParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 100}%`, `${speed * 100}%`]
  );

  if (prefersReduced) {
    return <div className={`relative overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y }}
        className="w-full h-full will-change-transform scale-110"
      >
        {children}
      </motion.div>
    </div>
  );
}

