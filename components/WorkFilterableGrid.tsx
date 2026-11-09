"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { Magnetic } from "@/components/Magnetic";

export function WorkFilterableGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("ALL");

  const categories = ["ALL", "Branding", "Web", "Product", "Motion"];

  const filteredProjects = projects.filter((p) => {
    if (filter === "ALL") return true;
    const cat = p.category.toLowerCase();
    const target = filter.toLowerCase();
    if (target === "web") return cat.includes("web") || cat.includes("digital");
    if (target === "branding") return cat.includes("brand") || cat.includes("identity");
    if (target === "product") return cat.includes("product") || cat.includes("tech");
    if (target === "motion") return cat.includes("motion") || cat.includes("creative");
    return cat.includes(target);
  });

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2.5 mb-12 sm:mb-16">
        {categories.map((cat) => (
          <Magnetic key={cat} strength={0.15}>
            <button
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-all duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00] ${
                filter === cat
                  ? "bg-[#c8ff00] text-black shadow-[0_0_20px_rgba(200,255,0,0.35)]"
                  : "bg-[#0d0d0d] border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
              }`}
            >
              {cat}
            </button>
          </Magnetic>
        ))}
      </div>

      {/* 6-card grid with layout animation */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6 lg:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard
                project={project}
                priority={idx < 3}
                index={idx}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
