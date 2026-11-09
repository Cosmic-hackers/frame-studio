import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { getArticles } from "@/lib/data/public";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Journal — FRAME Studio",
  description: "Ideas and insights on design, technology, typography, and brand systems.",
};

export default async function JournalPage() {
  const articles = await getArticles();

  // Featured journal visual assets matching Image 2
  const journalImages = [
    {
      title: "Design for Attention",
      date: "Mar 2026",
      img: "/images/journal-silk.png",
      slug: "restraint-is-a-loud-decision",
    },
    {
      title: "The Power of Brand",
      date: "Feb 2026",
      img: "/images/journal-brand.png",
      slug: "brutal-clarity",
    },
    {
      title: "Minimal, Not Boring",
      date: "Jan 2026",
      img: "/images/journal-fern.png",
      slug: "motion-with-a-job",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-24 sm:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="flex items-end justify-between mb-12 sm:mb-16">
            <Reveal direction="up">
              <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-2">
                {"//"} JOURNAL
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase">
                IDEAS &amp; INSIGHTS<span className="text-[#c8ff00]">.</span>
              </h1>
            </Reveal>
          </div>

          {/* 3 Featured Visual Essays Grid with Stagger */}
          <StaggerContainer
            stagger={0.12}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 pb-20 border-b border-neutral-900"
          >
            {journalImages.map((item, idx) => (
              <StaggerItem key={item.title}>
                <article className="group">
                  <Link
                    href={`/journal/${item.slug}`}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] rounded-xs"
                    data-cursor="view"
                  >
                    <div className="relative aspect-[16/11] w-full bg-[#111111] border border-neutral-900 overflow-hidden group-hover:border-neutral-700/80 transition-all duration-300 rounded-xs group-hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <div className="pt-4 flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-bold text-base sm:text-lg group-hover:text-[#c8ff00] transition-colors flex items-center gap-1">
                          <span>{item.title}</span>
                          <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                        </h3>
                        <span className="text-xs text-neutral-500 font-mono mt-1 block">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Complete Article Catalog */}
          <div className="pt-16">
            <Reveal direction="up">
              <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-6">
                {"//"} ESSAYS ARCHIVE
              </span>
            </Reveal>

            <div className="divide-y divide-neutral-900">
              {articles.map((article) => (
                <article key={article.id} className="py-8 group">
                  <Link
                    href={`/journal/${article.slug}`}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00]"
                  >
                    <div>
                      <span className="text-[#c8ff00] text-xs font-mono uppercase tracking-wider block mb-1">
                        {article.categorySlug}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#c8ff00] transition-colors duration-200 uppercase">
                        {article.title}
                      </h2>
                      <p className="text-neutral-400 text-sm mt-2 max-w-2xl line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 shrink-0">
                      <span>{formatDate(article.publishedAt)}</span>
                      <span className="text-white group-hover:text-[#c8ff00] group-hover:translate-x-1.5 transition-all duration-200">
                        →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
