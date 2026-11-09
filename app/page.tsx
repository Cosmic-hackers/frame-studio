import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { HeroContent } from "@/components/HeroContent";
import { HeroVisualCollage } from "@/components/HeroVisualCollage";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ImageParallax } from "@/components/ImageParallax";
import { getProjects } from "@/lib/data/public";

export default async function HomePage() {
  const projects = await getProjects();
  const selectedProjects = projects.slice(0, 3);

  const services = [
    {
      slug: "branding",
      title: "Brand Identity",
      desc: "Visual systems that build recognition.",
    },
    {
      slug: "development",
      icon: "</>",
      title: "Website Development",
      desc: "Fast, modern and scalable websites.",
      featured: true,
    },
    {
      slug: "ui-ux",
      icon: "⬘",
      title: "UI/UX Design",
      desc: "Simple, intuitive and impactful experiences.",
    },
    {
      slug: "creative",
      icon: "✱",
      title: "Creative Direction",
      desc: "Concepts, campaigns and digital storytelling.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-20">
        {/* HERO SECTION — Laptop ratio aligned, Pinterest-style layout without statue */}
        <section className="relative bg-[#050505] min-h-[calc(100vh-80px)] flex flex-col justify-center border-b border-neutral-900/80 overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Headline & Action CTAs */}
              <div className="lg:col-span-6 xl:col-span-6">
                <HeroContent />
              </div>

              {/* Right Column: Floating Creative Portfolio Collage */}
              <div className="lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center">
                <HeroVisualCollage />
              </div>
            </div>
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 border-b border-neutral-900">
          <div className="flex items-end justify-between mb-12 sm:mb-16">
            <Reveal direction="up">
              <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-2">
                {"//"} WORK
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
                SELECTED WORK<span className="text-[#c8ff00]">.</span>
              </h2>
            </Reveal>

            <Magnetic strength={0.2}>
              <Link
                href="/work"
                className="group text-neutral-400 hover:text-white text-xs font-medium uppercase tracking-wider flex items-center gap-1 transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00]"
              >
                <span>View All</span>
                <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </Magnetic>
          </div>

          {/* 3 Project Stagger Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
            {selectedProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                priority={idx === 0}
                index={idx}
              />
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 border-b border-neutral-900">
          <Reveal direction="up" className="mb-12 sm:mb-16">
            <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-2">
              {"//"} SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
              WHAT WE DO<span className="text-[#c8ff00]">.</span>
            </h2>
          </Reveal>

          <StaggerContainer
            stagger={0.1}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className={`p-6 sm:p-8 bg-[#0a0a0a] border rounded-xs transition-all duration-300 flex flex-col justify-between group h-full hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] ${
                    service.featured
                      ? "border-neutral-700/80 hover:border-[#c8ff00]"
                      : "border-neutral-900 hover:border-neutral-700 hover:border-[#c8ff00]/60"
                  }`}
                >
                  <div>
                    {/* Brand Identity icon rendered as pure green SVG instead of orange emoji */}
                    <div className="text-2xl text-[#c8ff00] mb-8 font-mono transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1 origin-left flex items-center">
                      {service.slug === "branding" ? (
                        <svg
                          className="w-7 h-7 text-[#c8ff00] fill-current"
                          viewBox="0 0 24 24"
                          aria-label="Brand Identity Icon"
                        >
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      ) : (
                        service.icon
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg sm:text-xl tracking-tight group-hover:text-[#c8ff00] transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-2 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-8 border-t border-neutral-900/60 flex items-center justify-between text-xs text-neutral-500 group-hover:text-[#c8ff00] transition-colors font-mono">
                    <span>Learn More</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* ABOUT SECTION WITH IMAGE PARALLAX */}
        <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 border-b border-neutral-900">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Architecture Image with Lime Square Accent and Smooth Parallax */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -top-4 -left-4 w-36 sm:w-48 h-36 sm:h-48 bg-[#c8ff00] -z-10 shadow-[0_0_35px_rgba(200,255,0,0.25)] rounded-xs" />

              <div className="relative aspect-[4/3] w-full bg-[#111111] overflow-hidden border border-neutral-900 rounded-xs shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
                <ImageParallax speed={0.12} className="w-full h-full">
                  <Image
                    src="/images/about-brutalist.png"
                    alt="FRAME Studio architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center grayscale contrast-125 hover:contrast-130 transition-all duration-700"
                  />
                </ImageParallax>
              </div>
            </div>

            {/* Content with Scroll-Triggered Reveal */}
            <div className="lg:col-span-6 lg:pl-6">
              <Reveal direction="up" delay={0.1}>
                <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-2">
                  {"//"} ABOUT
                </span>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[0.95]">
                  SMALL DETAILS<span className="text-[#c8ff00]">.</span> <br />
                  BIG IMPRESSIONS<span className="text-[#c8ff00]">.</span>
                </h2>

                <p className="text-neutral-400 text-sm sm:text-base mt-6 leading-relaxed">
                  A creative studio that blends design, technology and storytelling to create memorable digital experiences.
                </p>

                {/* Decorative Lime Line Accent */}
                <div className="w-16 h-1 bg-[#c8ff00] mt-8 shadow-[0_0_12px_#c8ff00]" />

                <div className="mt-8">
                  <Magnetic strength={0.2}>
                    <Link
                      href="/studio"
                      className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[#c8ff00] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8ff00]"
                    >
                      <span>Explore Our Philosophy &amp; Team</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONTACT / CTA BANNER SECTION */}
        <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Heading with Glowing Lime Border */}
            <div className="lg:col-span-7">
              <Reveal direction="up">
                <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-2">
                  {"//"} CONTACT
                </span>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[0.95]">
                  HAVE A{" "}
                  <span className="inline-block border-2 border-[#c8ff00] text-[#c8ff00] px-2.5 sm:px-4 py-0.5 sm:py-1 my-1 shadow-[0_0_20px_rgba(200,255,0,0.2)] rounded-xs">
                    PROJECT
                  </span>{" "}
                  <br />
                  IN MIND?
                </h2>
              </Reveal>
            </div>

            {/* Right: Info & Magnetic CTA Button */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <Reveal direction="up" delay={0.15}>
                <p className="text-neutral-400 text-sm sm:text-base">
                  Let&apos;s build something that stands out.
                </p>

                <div className="flex items-center gap-2 text-neutral-300 font-mono text-xs sm:text-sm mt-3">
                  <span className="text-[#c8ff00]">✉</span>
                  <a
                    href="mailto:hello@framestudio.in"
                    className="hover:text-[#c8ff00] transition-colors underline-offset-4 hover:underline"
                  >
                    hello@framestudio.in
                  </a>
                </div>

                <div className="pt-4">
                  <Magnetic strength={0.3}>
                    <Link
                      href="/inquire"
                      className="group inline-flex items-center gap-2 px-7 py-4 bg-[#c8ff00] text-black text-xs font-bold uppercase rounded-full hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-[0_0_25px_rgba(200,255,0,0.3)] hover:shadow-[0_0_35px_rgba(200,255,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>Start a Project</span>
                      <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
