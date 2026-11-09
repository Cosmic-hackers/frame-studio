import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WorkFilterableGrid } from "@/components/WorkFilterableGrid";
import { Reveal } from "@/components/Reveal";
import { getProjects } from "@/lib/data/public";

export const metadata = {
  title: "All Projects — FRAME Studio",
  description: "Complete archive of brand identity, web development, and digital experience case studies.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-24 sm:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="mb-8">
            <Reveal direction="up">
              <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-2">
                {"//"} WORK
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase">
                ALL PROJECTS<span className="text-[#c8ff00]">.</span>
              </h1>
            </Reveal>
          </div>

          {/* Filterable Projects Grid */}
          <WorkFilterableGrid projects={projects} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
