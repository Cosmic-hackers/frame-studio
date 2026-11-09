import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { getServices } from "@/lib/data/public";

export const metadata = {
  title: "Services — FRAME Studio",
  description: "Brand Identity, Website Development, UI/UX Design, and Creative Direction.",
};

export default async function ServicesPage() {
  const services = await getServices();

  const iconMap: Record<string, string> = {
    branding: "⚡",
    development: "</>",
    "ui-ux": "⬘",
    creative: "✱",
    motion: "✦",
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-24 sm:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Header */}
          <div className="mb-12 sm:mb-16">
            <Reveal direction="up">
              <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-2">
                {"//"} SERVICES
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase">
                WHAT WE DO<span className="text-[#c8ff00]">.</span>
              </h1>
            </Reveal>
          </div>

          {/* 4 Core Service Cards with Staggered Entrance */}
          <StaggerContainer
            stagger={0.1}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service) => {
              const icon = iconMap[service.slug] || "⚡";
              const isFeatured = service.slug === "development";

              return (
                <StaggerItem key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className={`p-6 sm:p-8 bg-[#0a0a0a] border rounded-xs transition-all duration-300 flex flex-col justify-between group min-h-[320px] h-full hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8ff00] ${
                      isFeatured
                        ? "border-neutral-700/80 hover:border-[#c8ff00]"
                        : "border-neutral-900 hover:border-neutral-700 hover:border-[#c8ff00]/60"
                    }`}
                  >
                    <div>
                      <div className="text-3xl text-[#c8ff00] mb-8 font-mono transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-1 origin-left flex items-center">
                        {service.slug === "branding" ? (
                          <svg
                            className="w-8 h-8 text-[#c8ff00] fill-current"
                            viewBox="0 0 24 24"
                            aria-label="Brand Identity Icon"
                          >
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                          </svg>
                        ) : (
                          icon
                        )}
                      </div>
                      <h2 className="text-white font-bold text-xl tracking-tight group-hover:text-[#c8ff00] transition-colors duration-200">
                        {service.title}
                      </h2>
                      <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                        {service.summary}
                      </p>
                    </div>

                    <div className="pt-6 mt-8 border-t border-neutral-900/60 flex items-center justify-between text-xs text-neutral-500 group-hover:text-[#c8ff00] transition-colors font-mono">
                      <span>View Specifications</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        ↗
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Bottom Commission Callout */}
          <div className="mt-24">
            <Reveal direction="up" delay={0.15}>
              <div className="p-8 sm:p-14 border border-neutral-800 bg-[#0d0d0d] rounded-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
                <div>
                  <span className="text-[#c8ff00] font-mono text-xs uppercase tracking-wider block mb-1">
                    {"//"} COMMISSION
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black text-white uppercase leading-tight">
                    Ready to scope a project?
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-lg">
                    We design and build complete digital products and brand identities tailored to stand out.
                  </p>
                </div>
                <Magnetic strength={0.25}>
                  <Link
                    href="/inquire"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-[#c8ff00] text-black text-xs font-bold uppercase rounded-xs hover:bg-white active:scale-[0.98] transition-all duration-200 whitespace-nowrap shadow-[0_0_20px_rgba(200,255,0,0.25)] hover:shadow-[0_0_30px_rgba(200,255,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
      </main>

      <Footer />
    </div>
  );
}
