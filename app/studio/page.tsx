import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ImageParallax } from "@/components/ImageParallax";
import { getTeam } from "@/lib/data/public";
import { studio } from "@/lib/content";

export const metadata = {
  title: "About — FRAME Studio",
  description: "A creative studio that blends design, technology and storytelling to create memorable digital experiences.",
};

export default async function StudioPage() {
  const team = await getTeam();

  const stats = [
    { num: "06", label: "Projects" },
    { num: "04", label: "Services" },
    { num: "05", label: "Team" },
    { num: "100%", label: "Focus" },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-24 sm:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-neutral-900">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <Reveal direction="up">
                <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-3">
                  {"//"} STUDIO
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.92]">
                  SMALL TEAM<span className="text-[#c8ff00]">.</span> <br />
                  <span className="inline-block border-2 border-[#c8ff00] text-[#c8ff00] px-3 sm:px-4 py-0.5 sm:py-1 my-1 shadow-[0_0_20px_rgba(200,255,0,0.2)] rounded-xs">
                    BIG WORK.
                  </span>
                </h1>

                <p className="text-neutral-400 text-base sm:text-lg mt-8 max-w-xl leading-relaxed">
                  {studio.intro}
                </p>
              </Reveal>
            </div>

            {/* Right: Architecture Visual with Lime Accent Square & Parallax */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-4 -left-4 w-36 sm:w-48 h-36 sm:h-48 bg-[#c8ff00] -z-10 shadow-[0_0_35px_rgba(200,255,0,0.25)] rounded-xs" />
              <div className="relative aspect-[4/3] w-full bg-[#111111] overflow-hidden border border-neutral-900 rounded-xs shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
                <ImageParallax speed={0.12} className="w-full h-full">
                  <Image
                    src="/images/about-brutalist.png"
                    alt="FRAME Studio architecture"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center grayscale contrast-125"
                  />
                </ImageParallax>
              </div>
            </div>
          </div>

          {/* 4 Stat Boxes with Staggered Entrance */}
          <StaggerContainer
            stagger={0.08}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-16 border-b border-neutral-900"
          >
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="p-6 sm:p-8 border border-neutral-900 bg-[#0a0a0a] rounded-xs hover:border-[#c8ff00]/50 transition-all duration-300 hover:-translate-y-1 group">
                  <span className="text-3xl sm:text-5xl font-black text-white block group-hover:text-[#c8ff00] transition-colors">
                    {stat.num}
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider font-mono mt-1 block">
                    {stat.label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Core Philosophy Statements */}
          <div className="py-20 border-b border-neutral-900">
            <Reveal direction="up">
              <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-4">
                {"//"} PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase mb-12">
                HOW WE OPERATE<span className="text-[#c8ff00]">.</span>
              </h2>
            </Reveal>

            <StaggerContainer
              stagger={0.12}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {studio.philosophy.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-8 border border-neutral-900 bg-[#0a0a0a] rounded-xs flex flex-col justify-between h-full hover:border-neutral-700 hover:border-[#c8ff00]/40 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div>
                      <span className="text-[#c8ff00] font-mono text-xs block mb-4">
                        PRINCIPLE 0{idx + 1}
                      </span>
                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                        “{item}”
                      </p>
                    </div>
                    <div className="w-8 h-0.5 bg-[#c8ff00] mt-8 shadow-[0_0_8px_#c8ff00]" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Team Roster */}
          <div className="py-20 border-b border-neutral-900">
            <Reveal direction="up">
              <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-2">
                {"//"} ROSTER
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase mb-12">
                THE TEAM<span className="text-[#c8ff00]">.</span>
              </h2>
            </Reveal>

            <StaggerContainer
              stagger={0.1}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {team.map((member) => (
                <StaggerItem key={member.id}>
                  <article className="p-6 border border-neutral-900 bg-[#0a0a0a] rounded-xs flex flex-col justify-between h-full group hover:border-[#c8ff00]/60 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <div>
                      <div className="w-12 h-12 rounded-full border border-neutral-800 bg-[#141414] text-[#c8ff00] flex items-center justify-center font-mono text-xs font-bold mb-6 group-hover:border-[#c8ff00] group-hover:scale-105 transition-all">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <h3 className="text-white font-bold text-base uppercase group-hover:text-[#c8ff00] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[#c8ff00] text-xs font-mono mt-1 mb-4">
                        {member.role}
                      </p>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-neutral-900/60 font-mono text-[11px] text-neutral-500 flex justify-between items-center">
                      <span>FRAME Studio Core</span>
                      <span className="text-[#c8ff00] opacity-0 group-hover:opacity-100 transition-opacity">●</span>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* CTA Banner */}
          <div className="pt-20">
            <Reveal direction="up">
              <div className="p-8 sm:p-14 border border-neutral-800 bg-[#0d0d0d] rounded-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
                <div>
                  <h3 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
                    Want to work together?
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-lg">
                    We take on a small number of commissions per quarter to ensure focused creative direction.
                  </p>
                </div>
                <Magnetic strength={0.25}>
                  <Link
                    href="/inquire"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-[#c8ff00] text-black text-xs font-bold uppercase rounded-xs hover:bg-white active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(200,255,0,0.25)] hover:shadow-[0_0_30px_rgba(200,255,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
      </main>

      <Footer />
    </div>
  );
}
