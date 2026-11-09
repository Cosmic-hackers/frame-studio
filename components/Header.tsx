"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/Magnetic";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  // Close mobile drawer on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/studio", label: "About" },
    { href: "/journal", label: "Journal" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/work?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/work");
    }
  };

  return (
    <motion.header
      initial={prefersReduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#000000]/92 backdrop-blur-md border-b border-neutral-900/90 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
          : "bg-[#000000]/50 backdrop-blur-sm border-b border-neutral-900/40"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* Left Section: Logo + Explore Link (Pinterest-style) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Magnetic strength={0.15}>
            <Link
              href="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] rounded-sm py-1 px-1.5"
            >
              <span className="font-bold tracking-tight text-xl sm:text-2xl text-white group-hover:text-[#c8ff00] transition-colors duration-200">
                FRAME
              </span>
              <span className="text-[#c8ff00] text-sm group-hover:scale-125 transition-transform duration-200">
                •
              </span>
              <span className="text-neutral-400 text-xs sm:text-sm tracking-wider uppercase font-medium group-hover:text-white transition-colors duration-200">
                STUDIO
              </span>
            </Link>
          </Magnetic>

          {/* Explore pill next to logo (matching Image 1) */}
          <Link
            href="/work"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              isActive("/work")
                ? "bg-[#c8ff00] text-black shadow-[0_0_15px_rgba(200,255,0,0.3)]"
                : "bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800"
            }`}
          >
            <span>Explore</span>
            <span className="text-xs">▾</span>
          </Link>
        </div>

        {/* Center Section: Wide Search Bar (Matching Image 1 Pinterest style) */}
        <div className="hidden md:flex flex-1 max-w-xl mx-2 lg:mx-4">
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full flex items-center"
          >
            <div className="absolute left-4 pointer-events-none text-neutral-400">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, services, journal..."
              className="w-full bg-[#141414] hover:bg-[#1a1a1a] focus:bg-[#111111] border border-neutral-800/80 hover:border-neutral-700 focus:border-[#c8ff00] text-white text-xs sm:text-sm placeholder-neutral-500 rounded-full pl-11 pr-12 py-2.5 transition-all duration-200 focus:outline-none focus:shadow-[0_0_20px_rgba(200,255,0,0.15)]"
            />

            <div className="absolute right-3.5 hidden lg:flex items-center pointer-events-none font-mono text-[10px] text-neutral-500 border border-neutral-800 rounded px-1.5 py-0.5 bg-neutral-900/60">
              <span>⌘K</span>
            </div>
          </form>
        </div>

        {/* Right Section: Navigation Links & Action Buttons */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 shrink-0">
          <nav className="flex items-center gap-5 lg:gap-7 text-xs sm:text-sm">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 font-medium transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00] rounded-xs ${
                    active ? "text-[#c8ff00]" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#c8ff00] transition-all duration-300 ease-out ${
                      active ? "w-full shadow-[0_0_8px_#c8ff00]" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Action Button: Start a Project (Pinterest-style bold pill CTA) */}
          <Magnetic strength={0.25}>
            <Link
              href="/inquire"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#c8ff00] text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white active:scale-[0.97] transition-all duration-200 shadow-[0_0_20px_rgba(200,255,0,0.25)] hover:shadow-[0_0_25px_rgba(200,255,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Let&apos;s Talk</span>
              <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5">
                ↗
              </span>
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] hover:text-[#c8ff00] transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-current rounded-full transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 bg-current rounded-full transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-6"
          >
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="mb-5">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-[#141414] border border-neutral-800 text-white text-xs placeholder-neutral-500 rounded-full px-4 py-2.5 focus:border-[#c8ff00] focus:outline-none"
              />
            </form>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.06 },
                },
              }}
              className="flex flex-col gap-3 text-sm"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <Link
                  href="/work"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1.5 text-base font-semibold transition-colors ${
                    isActive("/work")
                      ? "text-[#c8ff00]"
                      : "text-neutral-300 hover:text-[#c8ff00]"
                  }`}
                >
                  Explore Work
                </Link>
              </motion.div>

              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-1.5 text-base font-semibold transition-colors ${
                      isActive(link.href)
                        ? "text-[#c8ff00]"
                        : "text-neutral-300 hover:text-[#c8ff00]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="pt-2"
              >
                <Link
                  href="/inquire"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 px-5 py-3.5 bg-[#c8ff00] text-black text-xs font-bold uppercase rounded-full tracking-wider active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(200,255,0,0.3)]"
                >
                  <span>Start a Project</span>
                  <span>↗</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
