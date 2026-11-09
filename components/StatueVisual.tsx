"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export function StatueVisual() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const statueRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized coordinates (-1 to 1)
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const updateParallax = () => {
      // Smooth lerp interpolation
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (statueRef.current) {
        statueRef.current.style.transform = `translate3d(${currentX * -12}px, ${currentY * -12}px, 0)`;
      }
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${currentX * 16}px, ${currentY * 16}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX * 22}px, ${currentY * 22}px, 0)`;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReduced]);

  return (
    <motion.div
      ref={containerRef}
      initial={prefersReduced ? {} : { opacity: 0, scale: 0.94, y: 35 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-[500px] lg:max-w-[560px] aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] mx-auto flex items-center justify-center select-none"
    >
      {/* 1. Subtle neon-lime rim backlight glow with breathing animation */}
      <div
        ref={glowRef}
        className="absolute w-[85%] h-[85%] rounded-full blur-[90px] opacity-45 pointer-events-none will-change-transform animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(199, 255, 0, 0.28) 0%, rgba(199, 255, 0, 0.08) 50%, transparent 75%)",
          animationDuration: "6s",
        }}
      />

      {/* 2. Thin circular halo behind statue head with continuous smooth rotation */}
      <div
        ref={haloRef}
        className="absolute w-[80%] h-[80%] rounded-full pointer-events-none will-change-transform flex items-center justify-center"
      >
        {/* Rotating Lime Halo Ring */}
        <div
          className="absolute inset-0 rounded-full border border-[#C7FF00]/30 animate-spin-slow pointer-events-none"
          style={{
            boxShadow: "0 0 35px rgba(199, 255, 0, 0.12)",
            animationDuration: "36s",
          }}
        >
          {/* Subtle accent indicator on the halo */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C7FF00] shadow-[0_0_10px_#C7FF00]" />
        </div>

        {/* Outer subtle concentric ring */}
        <div
          className="absolute -inset-4 rounded-full border border-white/[0.05] border-dashed animate-spin-reverse pointer-events-none"
          style={{ animationDuration: "55s" }}
        />
      </div>

      {/* 3. The Statue directly integrated into the background */}
      <div
        ref={statueRef}
        className="relative w-full h-full flex items-center justify-center overflow-visible will-change-transform pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 92% 90% at 50% 48%, black 62%, transparent 100%), linear-gradient(to bottom, black 75%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 92% 90% at 50% 48%, black 62%, transparent 100%), linear-gradient(to bottom, black 75%, transparent 100%)",
        }}
      >
        <Image
          src="/images/hero-statue-main.png"
          alt="Classical sculpture with neon-lime accent"
          fill
          priority
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 560px"
          className="object-contain object-center scale-105 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        />

        {/* Seamless edge blend overlays */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}
