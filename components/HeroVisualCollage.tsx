"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function HeroVisualCollage() {
  const prefersReduced = useReducedMotion();

  const cards = [
    {
      slug: "novara",
      title: "NOVARA",
      category: "Web & Product",
      img: "/images/novara-laptop.png",
      className: "col-span-6 row-span-2 aspect-[4/3] -rotate-1 hover:rotate-0",
      delay: 0.2,
      tag: "FEATURED",
    },
    {
      slug: "velora",
      title: "VELORA",
      category: "Brand Identity",
      img: "/images/velora-tote.png",
      className: "col-span-6 row-span-2 aspect-[4/3] rotate-2 hover:rotate-0 translate-y-4 sm:translate-y-6",
      delay: 0.35,
      tag: "NEW",
    },
    {
      slug: "aether",
      title: "AETHER",
      category: "3D & Motion",
      img: "/images/aether-cube.png",
      className: "col-span-4 aspect-square -rotate-2 hover:rotate-0 -translate-y-2",
      delay: 0.5,
      tag: "LAB",
    },
    {
      slug: "orbit",
      title: "ORBIT",
      category: "Hardware Experience",
      img: "/images/orbit-arc.png",
      className: "col-span-8 aspect-[16/9] rotate-1 hover:rotate-0 translate-y-2",
      delay: 0.65,
      tag: "AUDIO",
    },
  ];

  return (
    <div className="relative w-full max-w-[620px] lg:max-w-none mx-auto select-none py-4">
      {/* Ambient neon lime background glow */}
      <div
        className="absolute -top-12 -right-12 w-[340px] h-[340px] rounded-full blur-[110px] opacity-25 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 255, 0, 0.45) 0%, transparent 70%)",
        }}
      />

      {/* Floating Card Collage (Pinterest-inspired) */}
      <div className="grid grid-cols-12 gap-3 sm:gap-4 lg:gap-5 items-center">
        {cards.map((card) => (
          <motion.div
            key={card.slug}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: card.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#121212] shadow-[0_20px_45px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-[#c8ff00]/60 hover:shadow-[0_25px_50px_rgba(200,255,0,0.15)] hover:-translate-y-1.5 ${card.className}`}
          >
            <Link href={`/work/${card.slug}`} className="block w-full h-full relative">
              <Image
                src={card.img}
                alt={card.title}
                fill
                priority
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 30vw, 320px"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />

              {/* Gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Tag Badge */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
                <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#c8ff00] bg-black/75 backdrop-blur-md border border-[#c8ff00]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {card.tag}
                </span>
              </div>

              {/* Card Meta on Bottom */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3.5 sm:right-3.5 z-10 flex items-end justify-between">
                <div>
                  <h3 className="text-white font-bold text-xs sm:text-sm tracking-tight uppercase group-hover:text-[#c8ff00] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-neutral-400 font-mono text-[9px] sm:text-[10px]">
                    {card.category}
                  </p>
                </div>
                <span className="text-neutral-400 group-hover:text-[#c8ff00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-bold leading-none pb-0.5">
                  ↗
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

