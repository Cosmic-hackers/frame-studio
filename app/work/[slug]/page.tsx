import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ImageParallax } from "@/components/ImageParallax";
import { getProject, getProjects } from "@/lib/data/public";

export const instant = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  // Primary image matching the reference
  const imageMap: Record<string, string> = {
    novara: "/images/novara-laptop.png",
    velora: "/images/velora-tote.png",
    aether: "/images/aether-cube.png",
    mono: "/images/mono-box.png",
    orbit: "/images/orbit-arc.png",
    pulse: "/images/nexus-phone.png",
  };

  const heroImg = imageMap[project.slug] || "/images/novara-laptop.png";

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-24 sm:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Back link */}
          <Magnetic strength={0.2}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 hover:text-[#c8ff00] transition-colors mb-8 py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00]"
            >
              <span>←</span>
              <span>Back to Work</span>
            </Link>
          </Magnetic>

          {/* Title & Specs Row */}
          <Reveal direction="up">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-neutral-900">
              <div>
                <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-2">
                  {"//"} CASE STUDY
                </span>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase">
                  {project.title}
                </h1>
              </div>

              {/* Right Meta Table */}
              <div className="w-full lg:w-72 border-t lg:border-t-0 border-neutral-900 pt-4 lg:pt-0 font-mono text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-neutral-900/60">
                  <span className="text-neutral-500 uppercase">Category</span>
                  <span className="text-white">{project.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-900/60">
                  <span className="text-neutral-500 uppercase">Year</span>
                  <span className="text-white">{project.year}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500 uppercase">Scope</span>
                  <span className="text-[#c8ff00]">Brand + Web</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Large Hero Mockup Image with Image Parallax */}
          <div className="my-10 sm:my-14 relative aspect-[16/9] w-full bg-[#111111] border border-neutral-900 overflow-hidden rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <ImageParallax speed={0.08} className="w-full h-full">
              <Image
                src={heroImg}
                alt={project.title}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
              />
            </ImageParallax>
          </div>

          {/* 3-Column Sub Gallery */}
          <StaggerContainer
            stagger={0.12}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-10 sm:my-14"
          >
            <StaggerItem>
              <div className="relative aspect-[4/3] bg-[#111111] border border-neutral-900 overflow-hidden rounded-xs group">
                <Image
                  src={heroImg}
                  alt={`${project.title} angle detail`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center scale-110 group-hover:scale-115 transition-transform duration-700 ease-out"
                />
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="relative aspect-[4/3] bg-[#0c0c0c] border border-neutral-900 flex flex-col justify-between p-6 rounded-xs hover:border-neutral-700 transition-colors">
                <span className="text-[10px] font-mono text-[#c8ff00] uppercase tracking-wider">
                  DESIGN TOKENS
                </span>
                <div>
                  <span className="text-xs text-neutral-400 block mb-2 font-mono">Palette</span>
                  <div className="flex gap-2">
                    {project.colors.map((c) => (
                      <span
                        key={c.name}
                        title={c.name}
                        className="w-5 h-5 rounded-full border border-neutral-700 inline-block hover:scale-110 transition-transform"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  {project.typography.join(" / ")}
                </span>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="relative aspect-[4/3] bg-[#111111] border border-neutral-900 overflow-hidden rounded-xs group">
                <Image
                  src={heroImg}
                  alt={`${project.title} close-up`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-bottom scale-125 group-hover:scale-130 transition-transform duration-700 ease-out"
                />
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Project Narrative: Overview, Challenge, Strategy, Process */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 border-t border-b border-neutral-900">
            <div className="lg:col-span-8 space-y-10">
              <Reveal direction="up">
                <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-2">
                  {"//"} THE CHALLENGE
                </span>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                  {project.challenge}
                </p>
              </Reveal>

              <Reveal direction="up" delay={0.1}>
                <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-2">
                  {"//"} THE STRATEGY
                </span>
                <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                  {project.strategy}
                </p>
              </Reveal>

              {/* Process Stages */}
              <Reveal direction="up" delay={0.15}>
                <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-4">
                  {"//"} THE PROCESS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.process.map((step, idx) => (
                    <div
                      key={step.title}
                      className="p-5 border border-neutral-900 bg-[#0a0a0a] rounded-xs hover:border-neutral-700 hover:border-[#c8ff00]/40 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <span className="text-[10px] font-mono text-[#c8ff00] uppercase block mb-1">
                        STAGE 0{idx + 1}
                      </span>
                      <h4 className="text-xs uppercase font-bold text-white mb-2">
                        {step.title}
                      </h4>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Outcome */}
              <Reveal direction="up" delay={0.2}>
                <div className="border-l-2 border-[#c8ff00] pl-6 py-3 bg-[#c8ff00]/[0.03] shadow-[0_0_20px_rgba(200,255,0,0.05)] rounded-r-xs">
                  <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-1 font-semibold">
                    {"//"} OUTCOME
                  </span>
                  <p className="text-white text-base leading-relaxed">
                    {project.outcome}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4 space-y-6">
              <Reveal direction="left" delay={0.2}>
                <div className="p-8 border border-neutral-800 bg-[#0d0d0d] rounded-xs shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <h3 className="text-xl font-bold uppercase text-white mb-3 leading-tight">
                    Need a similar brand or digital experience?
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-6">
                    We design and build complete digital products and brand identities tailored to stand out.
                  </p>
                  <Magnetic strength={0.2}>
                    <Link
                      href="/inquire"
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#c8ff00] text-black text-xs font-bold uppercase rounded-xs hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(200,255,0,0.25)] hover:shadow-[0_0_30px_rgba(200,255,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>Start Inquiry</span>
                      <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="pt-12 flex justify-between items-center text-xs font-mono uppercase text-neutral-400">
            <Magnetic strength={0.2}>
              <Link href="/work" className="hover:text-[#c8ff00] transition-colors py-1">
                ← All Projects
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/inquire" className="hover:text-[#c8ff00] transition-colors py-1">
                Start Project ↗
              </Link>
            </Magnetic>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
