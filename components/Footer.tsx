"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/Magnetic";

export function Footer() {
  const prefersReduced = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/studio", label: "About" },
    { href: "/journal", label: "Journal" },
    { href: "/inquire", label: "Contact" },
  ];

  const socialLinks = [
    { label: "IG", href: "https://instagram.com", name: "Instagram" },
    { label: "IN", href: "https://linkedin.com", name: "LinkedIn" },
    { label: "YT", href: "https://youtube.com", name: "YouTube" },
  ];

  return (
    <footer className="bg-black border-t border-neutral-900 pt-16 pb-12 text-neutral-400 text-sm overflow-hidden relative">
      {/* Subtle top lime edge glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-[#c8ff00]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Top Row */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-neutral-900"
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-white font-bold text-2xl tracking-tight inline-flex items-baseline gap-1 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00]"
            >
              <span className="group-hover:text-[#c8ff00] transition-colors">
                FRAME
              </span>
              <span className="text-xs text-[#c8ff00] font-normal">®</span>
            </Link>
            <p className="text-xs text-neutral-500 mt-1">
              Creative studio for modern brands.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-[#c8ff00] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00] rounded-xs"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links with Magnetic & Lime Glow */}
          <div className="flex items-center gap-3 text-neutral-400">
            {socialLinks.map((social) => (
              <Magnetic key={social.label} strength={0.3}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full border border-neutral-800 bg-[#0a0a0a] flex items-center justify-center hover:border-[#c8ff00] hover:text-[#c8ff00] hover:bg-[#c8ff00]/10 hover:shadow-[0_0_15px_rgba(200,255,0,0.25)] transition-all duration-200 text-xs font-mono font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00]"
                >
                  {social.label}
                </a>
              </Magnetic>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-neutral-600"
        >
          <p>© 2026 FRAME Studio. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {/* Animated Barcode Graphic */}
            <div
              className="flex items-center gap-[2.5px] h-6 py-1 opacity-80"
              aria-hidden="true"
            >
              {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 3].map(
                (width, idx) => (
                  <motion.div
                    key={idx}
                    className="h-full bg-[#c8ff00]"
                    style={{ width: `${width}px` }}
                    animate={
                      prefersReduced
                        ? {}
                        : {
                            opacity: [0.45, 1, 0.45],
                          }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: idx * 0.08,
                      ease: "easeInOut",
                    }}
                  />
                )
              )}
            </div>

            {/* Back to Top Button */}
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={scrollToTop}
                className="group flex items-center gap-1.5 px-3 py-1.5 border border-neutral-800 hover:border-[#c8ff00] hover:text-[#c8ff00] text-neutral-400 rounded-sm font-mono text-[11px] uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00]"
                aria-label="Scroll back to top"
              >
                <span>TOP</span>
                <span className="transition-transform duration-200 group-hover:-translate-y-0.5 text-xs">
                  ↑
                </span>
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
