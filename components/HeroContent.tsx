"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Magnetic } from "@/components/Magnetic";

export function HeroContent() {
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={prefersReduced ? {} : containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start z-10 w-full"
    >
      {/* 1. Eyebrow */}
      <motion.div variants={itemVariants}>
        <span className="text-[#C7FF00] font-mono text-xs sm:text-sm font-semibold tracking-widest block mb-4 sm:mb-6">
          {"//"} CREATIVE STUDIO
        </span>
      </motion.div>

      {/* 2. Headline reveals word by word + IMPOSSIBLE neon-lime highlight */}
      <h1 className="text-[clamp(2.5rem,5.2vw,5.25rem)] font-black tracking-[-0.03em] text-[#F5F5F5] uppercase leading-[0.92] max-w-xl">
        <span className="inline-flex gap-x-[0.28em] overflow-hidden">
          {["WE", "MAKE", "IDEAS"].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-0.5">
              <motion.span
                variants={wordVariants}
                className="inline-block will-change-transform"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
        <br />

        {/* IMPOSSIBLE with neon-lime highlight animation */}
        <motion.span
          variants={itemVariants}
          className="relative inline-block my-1.5"
        >
          <motion.span
            animate={
              prefersReduced
                ? {}
                : {
                    boxShadow: [
                      "0 0 15px rgba(199,255,0,0.18)",
                      "0 0 35px rgba(199,255,0,0.42)",
                      "0 0 15px rgba(199,255,0,0.18)",
                    ],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block text-[#C7FF00] border-2 border-[#C7FF00] px-3 sm:px-4 py-0.5 rounded-sm"
          >
            IMPOSSIBLE
          </motion.span>
        </motion.span>{" "}
        <br />

        <span className="inline-flex gap-x-[0.28em] overflow-hidden">
          {["TO", "IGNORE"].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden py-0.5">
              <motion.span
                variants={wordVariants}
                className="inline-block will-change-transform"
              >
                {word}
              </motion.span>
            </span>
          ))}
          <motion.span
            variants={wordVariants}
            className="inline-block text-[#C7FF00]"
          >
            .
          </motion.span>
        </span>
      </h1>

      {/* 3. Description fades upward */}
      <motion.p
        variants={itemVariants}
        className="text-[#A3A3A3] text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mt-6 sm:mt-7"
      >
        Creative design and digital experiences built to stand out.
      </motion.p>

      {/* 4. CTA buttons matching Image 1 Pinterest pill buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8 sm:mt-10"
      >
        <Magnetic strength={0.25}>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#C7FF00] text-[#050505] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-[0_0_25px_rgba(199,255,0,0.35)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF00]"
          >
            <span>Explore Work</span>
            <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </Magnetic>

        <Magnetic strength={0.25}>
          <Link
            href="/inquire"
            className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#141414] border border-neutral-800 hover:border-[#C7FF00] text-[#F5F5F5] hover:text-[#C7FF00] text-xs font-bold uppercase tracking-wider rounded-full active:scale-[0.98] transition-all duration-200 hover:shadow-[0_0_20px_rgba(199,255,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF00]"
          >
            <span>Start a Project</span>
            <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </Magnetic>
      </motion.div>
    </motion.div>
  );
}
