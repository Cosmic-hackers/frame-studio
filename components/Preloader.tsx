"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "motion/react";

const emptySubscribe = () => () => {};

export function Preloader() {
  const shouldShow = useSyncExternalStore(
    emptySubscribe,
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const hasSeen = sessionStorage.getItem("frame_preloaded");
      return !prefersReducedMotion && !hasSeen;
    },
    () => false
  );

  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!shouldShow) {
      window.dispatchEvent(new CustomEvent("frame:preloaded"));
      return;
    }

    document.body.style.overflow = "hidden";

    let currentProgress = 0;
    const interval = setInterval(() => {
      const increment = Math.max(1, Math.floor((100 - currentProgress) * 0.18));
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsComplete(true);
          sessionStorage.setItem("frame_preloaded", "true");
          document.body.style.overflow = "";
          window.dispatchEvent(new CustomEvent("frame:preloaded"));
        }, 250);
      }
    }, 28);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [shouldShow]);

  if (!shouldShow || isComplete) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          aria-hidden="true"
        >
          {/* Ambient glow */}
          <div
            className="absolute w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(200, 255, 0, 0.4) 0%, transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-center text-center px-6">
            {/* FRAME Logo Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="font-bold tracking-tight text-3xl sm:text-4xl text-white">
                FRAME
              </span>
              <motion.span
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#c8ff00] text-lg leading-none"
              >
                •
              </motion.span>
              <span className="text-neutral-400 text-sm sm:text-base tracking-[0.25em] uppercase font-medium">
                STUDIO
              </span>
            </motion.div>

            {/* Neon lime loading progress indicator */}
            <div className="w-48 sm:w-64 flex flex-col items-center gap-3">
              {/* Progress Line */}
              <div className="w-full h-[1.5px] bg-neutral-900 overflow-hidden relative rounded-full">
                <motion.div
                  className="h-full bg-[#c8ff00] shadow-[0_0_12px_rgba(200,255,0,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>

              {/* Progress Percentage & Status */}
              <div className="w-full flex items-center justify-between font-mono text-[11px] text-neutral-500 uppercase tracking-widest pt-1">
                <span>INITIALIZING</span>
                <span className="text-[#c8ff00] font-semibold tabular-nums">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
