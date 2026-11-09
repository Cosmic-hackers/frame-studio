import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { getArticle, getArticles, getRelatedArticles, articleReadingTime } from "@/lib/data/public";
import { formatDate } from "@/lib/utils";

export const instant = false;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function SingleArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const related = await getRelatedArticles(article);
  const readingTime = articleReadingTime(article);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-24 sm:pt-36 pb-24">
        <article className="max-w-4xl mx-auto px-5 sm:px-8">
          {/* Back link */}
          <Magnetic strength={0.2}>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 hover:text-[#c8ff00] transition-colors mb-8 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00]"
            >
              <span>←</span>
              <span>Back to Journal</span>
            </Link>
          </Magnetic>

          {/* Article Header */}
          <Reveal direction="up">
            <header className="border-b border-neutral-900 pb-12">
              <div className="flex items-center gap-4 font-mono text-xs text-neutral-500 mb-4">
                <span className="text-[#c8ff00] uppercase font-semibold">
                  {article.categorySlug}
                </span>
                <span>•</span>
                <span>{formatDate(article.publishedAt)}</span>
                <span>•</span>
                <span>{readingTime} MIN READ</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
                {article.title}
              </h1>

              <p className="text-lg sm:text-xl text-neutral-300 font-light mt-6 leading-relaxed">
                {article.excerpt}
              </p>
            </header>
          </Reveal>

          {/* Article Prose Content */}
          <div className="py-12 space-y-8 text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
            {article.blocks.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <Reveal key={index} direction="up">
                    <h2 className="text-2xl sm:text-3xl font-black text-white pt-8 mt-12 border-t border-neutral-900 uppercase">
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }

              if (block.type === "quote") {
                return (
                  <Reveal key={index} direction="up">
                    <blockquote className="border-l-2 border-[#c8ff00] pl-6 my-8 py-2 text-xl sm:text-2xl italic font-serif text-white bg-[#c8ff00]/[0.02]">
                      “{block.text}”
                    </blockquote>
                  </Reveal>
                );
              }

              return (
                <p key={index} className="leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Author footer */}
          <div className="border-t border-neutral-900 pt-8 mt-12 flex items-center justify-between font-mono text-xs text-neutral-500">
            <div>
              <span>WRITTEN BY </span>
              <span className="text-white uppercase font-bold">FRAME Studio Editorial</span>
            </div>
            <Magnetic strength={0.2}>
              <Link
                href="/journal"
                className="hover:text-[#c8ff00] transition-colors py-1"
              >
                ← Back to Archive
              </Link>
            </Magnetic>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="pt-20 border-t border-neutral-900 mt-20">
              <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-2">
                {"//"} MORE IDEAS
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase mb-8">
                RELATED ESSAYS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/journal/${rel.slug}`}
                    className="p-6 border border-neutral-900 bg-[#0a0a0a] rounded-xs hover:border-[#c8ff00]/50 transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <span className="text-[#c8ff00] font-mono text-[10px] uppercase block mb-1">
                      {rel.categorySlug}
                    </span>
                    <h4 className="text-white font-bold text-lg group-hover:text-[#c8ff00] transition-colors uppercase">
                      {rel.title}
                    </h4>
                    <p className="text-neutral-400 text-xs mt-2 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
