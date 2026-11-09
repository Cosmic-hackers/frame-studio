"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  imageSrc?: string;
  priority?: boolean;
  index?: number;
}

export function ProjectCard({
  project,
  imageSrc,
  priority = false,
  index = 0,
}: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const prefersReduced = useReducedMotion();

  // Fallback image paths matching reference
  const fallbackImages: Record<string, string> = {
    novara: "/images/novara-laptop.png",
    velora: "/images/velora-tote.png",
    aether: "/images/aether-cube.png",
    mono: "/images/mono-box.png",
    orbit: "/images/orbit-arc.png",
    pulse: "/images/nexus-phone.png",
  };

  const src = imageSrc || fallbackImages[project.slug] || "/images/novara-laptop.png";

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.75,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group block"
    >
      <Link
        href={`/work/${project.slug}`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] rounded-xs"
        data-cursor="view"
      >
        {/* Visual Box with Hover Scale & Border Glow */}
        <div className="relative aspect-[16/11] w-full bg-[#111111] border border-neutral-900 group-hover:border-neutral-700/80 transition-all duration-500 overflow-hidden rounded-xs group-hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.4)] group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)]">
          {/* Subtle lime accent top line reveal on hover */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c8ff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 shadow-[0_0_10px_#c8ff00]" />

          {!imageError ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={src}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={priority}
                onError={() => setImageError(true)}
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#181818] to-[#0d0d0d]">
              <span className="text-xs font-mono text-[#c8ff00] uppercase tracking-widest mb-2">
                {project.category}
              </span>
              <h3 className="display text-4xl sm:text-5xl text-white">
                {project.title}
              </h3>
            </div>
          )}

          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Quick category tag pill on card hover */}
          <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-black/80 backdrop-blur-md text-[#c8ff00] border border-[#c8ff00]/40 px-2.5 py-1 rounded-xs">
              {project.category}
            </span>
          </div>
        </div>

        {/* Info Row Below Card */}
        <div className="flex items-start justify-between pt-4">
          <div>
            <h3 className="text-white font-bold text-base sm:text-lg tracking-tight group-hover:text-[#c8ff00] transition-colors duration-200 uppercase">
              {project.title}
            </h3>
            <p className="text-neutral-500 text-xs sm:text-sm mt-0.5 transition-colors group-hover:text-neutral-400">
              {project.category}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="text-neutral-500 group-hover:text-[#c8ff00] transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 text-base leading-none pt-1"
          >
            ↗
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
