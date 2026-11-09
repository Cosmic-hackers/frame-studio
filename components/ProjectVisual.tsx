import type { Project } from "@/lib/types";

export function ProjectVisual({ project, className = "" }: { project: Project; className?: string }) {
  const primaryColor = project.colors[0]?.hex ?? "#111111";
  const accentColor = project.colors.find((c) => c.name.toLowerCase().includes("signal") || c.name.toLowerCase().includes("lime"))?.hex ?? "#c8ff00";

  switch (project.slug) {
    case "novara":
      return (
        <div className={`relative w-full aspect-[16/10] bg-[#0c0c0c] border border-white/10 flex items-center justify-center overflow-hidden p-8 ${className}`}>
          {/* Technical grid */}
          <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-[85%] h-[85%] border border-dashed border-white/40" />
            <div className="absolute w-full h-[1px] bg-white/20" />
            <div className="absolute h-full w-[1px] bg-white/20" />
          </div>
          {/* Signal ring */}
          <div className="relative flex flex-col items-center justify-center text-center z-10">
            <div className="relative w-28 h-28 flex items-center justify-center mb-6">
              <svg className="w-full h-full -rotate-45" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="#333333"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke={accentColor}
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="210 50"
                />
              </svg>
              <span className="absolute font-mono text-[10px] text-lime tracking-widest uppercase">
                CAL.26
              </span>
            </div>
            <h3 className="display text-4xl sm:text-6xl tracking-tight text-paper">
              NOVARA
            </h3>
            <span className="font-mono text-xs uppercase tracking-widest text-mute mt-2">
              PRECISION SENSING TOOLS • SPEC 0.4
            </span>
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-mute uppercase">
            REF // 01-SYS
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-lime uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            SIGNAL CONFIRMED
          </div>
        </div>
      );

    case "velora":
      return (
        <div className={`relative w-full aspect-[16/10] bg-[#161514] border border-white/10 flex flex-col justify-between p-8 overflow-hidden ${className}`}>
          <div className="flex justify-between items-start font-mono text-[11px] text-mute uppercase tracking-widest">
            <span>ISSUE NO. 04 / WINTER</span>
            <span className="text-paper">GARMENT ARCHIVE</span>
          </div>
          <div className="my-auto text-center">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-mute mb-2 block">
              EDITORIAL STOREFRONT
            </span>
            <h3 className="display text-5xl sm:text-7xl text-paper tracking-wider">
              VELORA
            </h3>
            <p className="font-sans text-sm text-[#a8a8a0] max-w-sm mx-auto mt-3 italic font-light">
              “Fewer pieces, described with precision.”
            </p>
          </div>
          <div className="flex justify-between items-end border-t border-white/10 pt-4 font-mono text-[10px] text-mute">
            <span>MATERIALS: 100% RAW SILK / WOOL</span>
            <span className="text-paper uppercase">LIMITED RUN</span>
          </div>
        </div>
      );

    case "aether":
      return (
        <div className={`relative w-full aspect-[16/10] bg-[#0d0f12] border border-white/10 flex items-center justify-center p-8 overflow-hidden ${className}`}>
          {/* Spatial audio waves */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute rounded-full border border-lime"
                style={{
                  width: `${i * 24}%`,
                  height: `${i * 24}%`,
                  opacity: 1 - i * 0.2,
                }}
              />
            ))}
          </div>
          <div className="relative text-center z-10">
            <span className="font-mono text-xs text-lime uppercase tracking-widest mb-3 block">
              SPATIAL ACOUSTIC INTERACTION
            </span>
            <h3 className="display text-5xl sm:text-7xl text-paper">
              AETHER
            </h3>
            <span className="font-mono text-xs text-mute uppercase tracking-widest mt-3 block">
              DIGITAL LISTENING ROOM
            </span>
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-mute">
            48kHz / 24-BIT LOSSLESS
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-lime">
            FREQUENCY: 432 Hz
          </div>
        </div>
      );

    case "pulse":
      return (
        <div className={`relative w-full aspect-[16/10] bg-[#1a0f18] border border-white/10 flex flex-col justify-between p-8 overflow-hidden ${className}`}>
          <div className="flex justify-between font-mono text-[11px] text-[#f286c4] uppercase">
            <span>MANUSCRIPT TELEMETRY</span>
            <span>LEAVE-POINT ANALYSIS</span>
          </div>
          <div className="my-auto">
            <div className="border-l-2 border-[#ff3b88] pl-5">
              <h3 className="display text-4xl sm:text-6xl text-paper">
                PULSE
              </h3>
              <p className="font-sans text-sm text-[#e0b0d0] mt-2 max-w-md">
                An editorial writing interface where metrics live quietly in the margins, leaving the prose untouched.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px] text-mute border-t border-white/10 pt-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff3b88]" />
            <span>ATTENTION RETENTION: 94.2%</span>
          </div>
        </div>
      );

    case "mono":
      return (
        <div className={`relative w-full aspect-[16/10] bg-[#0f0f0f] border border-white/10 flex items-center justify-center p-8 overflow-hidden ${className}`}>
          <div className="absolute inset-0 flex divide-x divide-white/5">
            <div className="flex-1" />
            <div className="flex-1" />
            <div className="flex-1" />
            <div className="flex-1" />
          </div>
          <div className="relative text-center z-10 border border-white/20 p-8 sm:p-12 bg-black/60 backdrop-blur-sm">
            <h3 className="display text-5xl sm:text-7xl text-paper tracking-wider">
              MONO
            </h3>
            <p className="font-mono text-xs text-mute tracking-widest uppercase mt-3">
              LIFESTYLE IDENTITY // SYSTEMS FIRST
            </p>
          </div>
        </div>
      );

    case "orbit":
      return (
        <div className={`relative w-full aspect-[16/10] bg-[#0a0c10] border border-white/10 flex items-center justify-center p-8 overflow-hidden ${className}`}>
          <div className="absolute w-72 h-72 rounded-full border border-white/20 rotate-45 scale-y-50" />
          <div className="absolute w-48 h-48 rounded-full border border-lime/40 rotate-12 scale-y-50" />
          <div className="relative text-center z-10">
            <span className="font-mono text-xs text-lime uppercase tracking-widest mb-2 block">
              LAUNCH CAMPAIGN
            </span>
            <h3 className="display text-5xl sm:text-7xl text-paper">
              ORBIT
            </h3>
            <span className="font-mono text-xs text-mute uppercase tracking-widest mt-2 block">
              TRAJECTORY &amp; MOTION
            </span>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={`relative w-full aspect-[16/10] border border-white/10 flex items-center justify-center p-8 ${className}`}
          style={{ backgroundColor: primaryColor }}
        >
          <div className="text-center">
            <h3 className="display text-4xl sm:text-6xl text-paper">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-mute uppercase tracking-widest mt-2">
              {project.category}
            </p>
          </div>
        </div>
      );
  }
}

