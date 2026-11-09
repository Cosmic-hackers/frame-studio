"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

interface TextRevealProps {
  children: string;
  className?: string;
  type?: "word" | "char" | "blur" | "line";
  delay?: number;
  duration?: number;
  stagger?: number;
  inView?: boolean;
}

export function TextReveal({
  children,
  className = "",
  type = "word",
  delay = 0,
  duration = 0.6,
  stagger = 0.04,
  inView = true,
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={className}>{children}</span>;
  }

  // Blur-to-sharp reveal
  if (type === "blur") {
    const animationProps = inView
      ? {
          initial: { opacity: 0, y: 16, filter: "blur(8px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        }
      : {
          initial: { opacity: 0, y: 16, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        };

    return (
      <motion.span
        {...animationProps}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] as const }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    );
  }

  // Masked Line-by-line reveal
  if (type === "line") {
    const animationProps = inView
      ? {
          initial: { y: "105%", opacity: 0 },
          whileInView: { y: "0%", opacity: 1 },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        }
      : {
          initial: { y: "105%", opacity: 0 },
          animate: { y: "0%", opacity: 1 },
        };

    return (
      <span className={`inline-block overflow-hidden align-top ${className}`}>
        <motion.span
          {...animationProps}
          transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] as const }}
          className="inline-block"
        >
          {children}
        </motion.span>
      </span>
    );
  }

  // Character-by-character staggered reveal
  if (type === "char") {
    const chars = Array.from(children);

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: stagger,
        },
      },
    };

    const charVariants: Variants = {
      hidden: { opacity: 0, y: 24, rotateX: 45 },
      visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      },
    };

    const containerProps = inView
      ? {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "0px 0px -10% 0px" },
        }
      : {
          initial: "hidden",
          animate: "visible",
        };

    return (
      <motion.span
        variants={containerVariants}
        {...containerProps}
        className={`inline-block ${className}`}
      >
        {chars.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={charVariants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Default: Word-by-word reveal with masked overflow
  const words = children.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const containerProps = inView
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "0px 0px -10% 0px" },
      }
    : {
        initial: "hidden",
        animate: "visible",
      };

  return (
    <motion.span
      variants={containerVariants}
      {...containerProps}
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden py-0.5"
        >
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-transform"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
