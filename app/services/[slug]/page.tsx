import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getService, getServices, getRelatedProjects } from "@/lib/data/public";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ImageParallax } from "@/components/ImageParallax";

export const instant = false;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export default async function SingleServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) notFound();

  const related = await getRelatedProjects(service.slug);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-24 sm:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Back link */}
          <Magnetic strength={0.2}>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 hover:text-[#c8ff00] transition-colors mb-8 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00]"
            >
              <span>←</span>
              <span>All Services</span>
            </Link>
          </Magnetic>

          {/* Title & 3-Step Process Row */}
          <Reveal direction="up">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-neutral-900">
              <div>
                <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-2">
                  {"//"} DISCIPLINE
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase">
                  {service.title}<span className="text-[#c8ff00]">.</span>
                </h1>
                <p className="text-neutral-400 text-sm sm:text-base mt-4 max-w-xl">
                  {service.summary}
                </p>
              </div>

              {/* Right Column: 3 Steps */}
              <div className="w-full lg:w-80 border-t lg:border-t-0 border-neutral-900 pt-4 lg:pt-0 font-mono text-xs space-y-3">
                {service.process.slice(0, 3).map((step, idx) => (
                  <div key={step.title} className="flex items-baseline gap-3 py-1.5 border-b border-neutral-900/60">
                    <span className="text-[#c8ff00] font-bold">0{idx + 1}</span>
                    <span className="text-neutral-200 uppercase font-medium">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Large Hero Mockup Image with Image Parallax */}
          <div className="my-10 sm:my-14 relative aspect-[16/8] w-full bg-[#111111] border border-neutral-900 overflow-hidden rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <ImageParallax speed={0.08} className="w-full h-full">
              <Image
                src="/images/novara-laptop.png"
                alt={service.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </ImageParallax>
          </div>

          {/* Capabilities & Deliverables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-t border-b border-neutral-900">
            <div className="lg:col-span-7 space-y-8">
              <Reveal direction="up">
                <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-2">
                  {"//"} DISCIPLINE OVERVIEW
                </span>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                  {service.overview}
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-4">
                  {"//"} CAPABILITIES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="p-3.5 border border-neutral-900 bg-[#0a0a0a] text-xs text-neutral-300 flex items-center gap-2 rounded-xs hover:border-[#c8ff00]/40 transition-colors"
                    >
                      <span className="text-[#c8ff00] font-bold">›</span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <Reveal direction="left" delay={0.15}>
                <div className="p-8 border border-neutral-800 bg-[#0d0d0d] rounded-xs shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <h3 className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider mb-4">
                    {"//"} DELIVERABLES
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.deliverables.map((del) => (
                      <span
                        key={del}
                        className="px-3 py-1.5 border border-neutral-800 bg-[#111111] text-xs text-white rounded-xs hover:border-[#c8ff00]/30 transition-colors"
                      >
                        {del}
                      </span>
                    ))}
                  </div>

                  <Magnetic strength={0.25}>
                    <Link
                      href="/inquire"
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#c8ff00] text-black text-xs font-bold uppercase rounded-xs hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(200,255,0,0.25)] hover:shadow-[0_0_30px_rgba(200,255,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>Book {service.title}</span>
                      <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="pt-16">
              <Reveal direction="up">
                <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-2">
                  {"//"} APPLIED WORK
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white uppercase mb-8">
                  RELATED CASE STUDIES
                </h3>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map((project, idx) => (
                  <ProjectCard key={project.id} project={project} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
