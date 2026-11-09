"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-28 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="kicker">{"//"} [ 01 ] SELECTED ARCHIVE</span>
            <h2 className="display text-5xl sm:text-7xl text-paper mt-2">
              CASE STUDIES
            </h2>
          </div>
          <p className="text-mute font-mono text-xs max-w-sm uppercase leading-relaxed">
            Every study represents a complete brand or product system designed from scratch with full specifications.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-2 py-8 font-mono text-xs uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 border transition-all ${
                activeCategory === cat
                  ? "border-lime bg-lime text-ink font-semibold"
                  : "border-white/10 text-mute hover:border-white/30 hover:text-paper"
              }`}
            >
              {cat === "all" ? "All Projects [06]" : cat}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-20 pt-6">
          {filtered.map((project, index) => {
            const isExpanded = expandedSlug === project.slug;

            return (
              <Reveal key={project.id} delay={index * 0.1}>
                <article className="border border-white/10 bg-[#121212] overflow-hidden group">
                  {/* Top bar */}
                  <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-lime font-bold">
                        [ 0{project.sortOrder || index + 1} ]
                      </span>
                      <span className="text-paper uppercase tracking-wider">
                        {project.clientName}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-mute">
                      <span>{project.category}</span>
                      <span>{"//"}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  {/* Body grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
                    {/* Visual poster */}
                    <div className="lg:col-span-7">
                      <div className="frame-mask">
                        <ProjectVisual project={project} />
                      </div>
                    </div>

                    {/* Content metadata */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <h3 className="display text-4xl sm:text-5xl text-paper group-hover:text-lime transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-paper/90 text-base leading-relaxed mt-4">
                          {project.summary}
                        </p>

                        {/* Color swatches */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <span className="kicker block mb-3">Color System</span>
                          <div className="flex flex-wrap gap-2">
                            {project.colors.map((color) => (
                              <div
                                key={color.name}
                                className="flex items-center gap-2 px-2.5 py-1.5 border border-white/10 bg-ink font-mono text-[10px]"
                              >
                                <span
                                  className="w-3 h-3 rounded-full border border-white/20"
                                  style={{ backgroundColor: color.hex }}
                                />
                                <span className="text-paper">{color.name}</span>
                                <span className="text-mute">{color.hex}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Typography */}
                        <div className="mt-4">
                          <span className="kicker block mb-2">Typography</span>
                          <div className="flex flex-wrap gap-2 font-mono text-xs text-mute">
                            {project.typography.map((font) => (
                              <span
                                key={font}
                                className="px-2 py-0.5 border border-white/10"
                              >
                                {font}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Expand / Close Case Study Action */}
                      <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                        <Magnetic>
                          <button
                            type="button"
                            onClick={() => setExpandedSlug(isExpanded ? null : project.slug)}
                            className="inline-flex items-center gap-2 font-mono text-xs uppercase px-5 py-2.5 bg-paper text-ink hover:bg-lime transition-colors font-bold"
                          >
                            {isExpanded ? "Close Study ↑" : "Read Full Case Study ↓"}
                          </button>
                        </Magnetic>
                        <span className="font-mono text-[11px] text-mute uppercase">
                          {project.technologies.slice(0, 2).join(" • ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded In-Depth Case Study Drawer */}
                  {isExpanded && (
                    <div className="border-t border-white/15 bg-[#0e0e0e] p-6 sm:p-12 space-y-12 animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                          <span className="kicker block mb-2">{"//"} 01 CHALLENGE</span>
                          <p className="text-paper text-sm sm:text-base leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>
                        <div>
                          <span className="kicker block mb-2">{"//"} 02 STRATEGY</span>
                          <p className="text-paper text-sm sm:text-base leading-relaxed">
                            {project.strategy}
                          </p>
                        </div>
                      </div>

                      {/* Process Steps */}
                      <div>
                        <span className="kicker block mb-4">{"//"} 03 PROCESS EXECUTION</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {project.process.map((step, idx) => (
                            <div
                              key={step.title}
                              className="border border-white/10 p-5 bg-ink"
                            >
                              <span className="font-mono text-xs text-lime block mb-2">
                                PHASE 0{idx + 1}
                              </span>
                              <h4 className="font-mono text-sm uppercase text-paper font-bold mb-2">
                                {step.title}
                              </h4>
                              <p className="text-mute text-xs leading-relaxed">
                                {step.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Outcome */}
                      <div className="border-l-2 border-lime pl-6 py-2 bg-lime/[0.03]">
                        <span className="kicker block mb-1 text-lime">{"//"} 04 OUTCOME &amp; RESOLUTION</span>
                        <p className="text-paper text-base leading-relaxed">
                          {project.outcome}
                        </p>
                      </div>

                      {/* Technology and tags */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono text-xs text-mute">
                        <div className="flex items-center gap-2">
                          <span className="text-paper uppercase">Stack &amp; Artifacts:</span>
                          <span>{project.technologies.join(", ")}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExpandedSlug(null)}
                          className="text-lime hover:underline uppercase"
                        >
                          Collapse Spec ↑
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

