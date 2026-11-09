"use client";

import { useState } from "react";
import type { Article } from "@/lib/types";
import { Reveal } from "@/components/Reveal";
import { readingMinutes, formatDate } from "@/lib/utils";

export function JournalSection({ articles }: { articles: Article[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const categories = ["all", "perspective", "craft", "process"];

  const filtered = selectedCat === "all"
    ? articles
    : articles.filter((a) => a.categorySlug === selectedCat);

  return (
    <section id="journal" className="py-28 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <span className="kicker">{"//"} [ 04 ] EDITORIAL</span>
            <h2 className="display text-5xl sm:text-7xl text-paper mt-2">
              JOURNAL
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-xs uppercase">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 border transition-all ${selectedCat === cat
                    ? "border-lime bg-lime text-ink font-semibold"
                    : "border-white/10 text-mute hover:border-white/30 hover:text-paper"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Article list */}
        <div className="divide-y divide-white/10">
          {filtered.map((article, idx) => {
            const isOpen = activeSlug === article.slug;
            const mins = readingMinutes(article.blocks);

            return (
              <Reveal key={article.id} delay={idx * 0.05}>
                <article className="py-10 group">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-4 font-mono text-xs text-mute mb-3">
                        <span className="text-lime uppercase">{article.categorySlug}</span>
                        <span>{"//"}</span>
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>{"//"}</span>
                        <span>{mins} MIN READ</span>
                      </div>
                      <h3
                        onClick={() => setActiveSlug(isOpen ? null : article.slug)}
                        className="display text-3xl sm:text-5xl text-paper group-hover:text-lime transition-colors cursor-pointer"
                      >
                        {article.title}
                      </h3>
                      <p className="text-mute text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => setActiveSlug(isOpen ? null : article.slug)}
                        className="px-4 py-2 border border-white/20 text-paper group-hover:border-lime group-hover:text-lime transition-colors uppercase"
                      >
                        {isOpen ? "Close Reader ↑" : "Read Essay →"}
                      </button>
                    </div>
                  </div>

                  {/* Expanded article reader */}
                  {isOpen && (
                    <div className="mt-8 pt-8 border-t border-white/10 bg-[#0e0e0e] p-6 sm:p-12 max-w-4xl space-y-6">
                      <span className="kicker block mb-4">Full Essay Transcript</span>
                      {article.blocks.map((block, bIdx) => {
                        if (block.type === "h2") {
                          return (
                            <h4
                              key={bIdx}
                              className="display text-2xl sm:text-3xl text-paper pt-4 border-t border-white/10"
                            >
                              {block.text}
                            </h4>
                          );
                        }
                        if (block.type === "quote") {
                          return (
                            <blockquote
                              key={bIdx}
                              className="border-l-2 border-lime pl-6 py-2 text-paper text-lg italic my-6 bg-lime/[0.04]"
                            >
                              “{block.text}”
                            </blockquote>
                          );
                        }
                        return (
                          <p key={bIdx} className="text-paper/85 text-base leading-relaxed">
                            {block.text}
                          </p>
                        );
                      })}
                      <div className="pt-6 border-t border-white/10 flex justify-between items-center font-mono text-xs text-mute">
                        <span>End of essay</span>
                        <button
                          type="button"
                          onClick={() => setActiveSlug(null)}
                          className="text-lime hover:underline uppercase"
                        >
                          Close reader ↑
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

