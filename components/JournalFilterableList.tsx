"use client";

import { useState } from "react";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { Reveal } from "@/components/Reveal";
import { formatDate, readingMinutes } from "@/lib/utils";

export function JournalFilterableList({ articles }: { articles: Article[] }) {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["all", "perspective", "craft", "process"];

  const filtered = articles.filter((article) => {
    const matchesCat = selectedCat === "all" || article.categorySlug === selectedCat;
    const matchesSearch =
      searchQuery.trim() === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 py-8 border-b border-white/10">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 font-mono text-xs uppercase">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 border transition-all ${
                selectedCat === cat
                  ? "border-lime bg-lime text-ink font-semibold"
                  : "border-white/10 text-mute hover:border-white/30 hover:text-paper"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search essays..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-ink border border-white/15 px-4 py-2 text-xs font-mono text-paper placeholder:text-mute focus:border-lime focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-mute hover:text-paper"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Articles Listing */}
      <div className="divide-y divide-white/10">
        {filtered.length === 0 ? (
          <div className="py-20 text-center font-mono text-sm text-mute">
            No essays match your query “{searchQuery}”.
          </div>
        ) : (
          filtered.map((article, idx) => {
            const mins = readingMinutes(article.blocks);

            return (
              <Reveal key={article.id} delay={idx * 0.05}>
                <article className="py-12 group">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                    <div className="max-w-3xl">
                      {/* Meta bar */}
                      <div className="flex items-center gap-4 font-mono text-xs text-mute mb-4">
                        <span className="text-lime uppercase font-semibold">
                          {article.categorySlug}
                        </span>
                        <span>{"//"}</span>
                        <span>{formatDate(article.publishedAt)}</span>
                        <span>{"//"}</span>
                        <span>{mins} MIN READ</span>
                      </div>

                      {/* Title */}
                      <h2 className="display text-4xl sm:text-6xl text-paper group-hover:text-lime transition-colors">
                        <Link href={`/journal/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-paper/80 text-base sm:text-lg mt-4 leading-relaxed font-light">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Direct reading action */}
                    <div className="pt-2">
                      <Link
                        href={`/journal/${article.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase px-5 py-3 border border-white/20 text-paper group-hover:border-lime group-hover:text-lime transition-colors whitespace-nowrap font-semibold"
                      >
                        Read Full Essay →
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })
        )}
      </div>
    </div>
  );
}

