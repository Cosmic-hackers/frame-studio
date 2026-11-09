import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { Reveal } from "@/components/Reveal";

export const metadata = {
  title: "Contact — FRAME Studio",
  description: "Start a project with FRAME Studio. Let's create something that stands out.",
};

export default function InquirePage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#c8ff00] selection:text-black">
      <Header />

      <main className="pt-24 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            {/* Left Column: Heading & Contact Info */}
            <div className="lg:col-span-6 space-y-8">
              <Reveal direction="up">
                <div>
                  <span className="text-[#c8ff00] font-mono text-xs sm:text-sm font-semibold tracking-wider block mb-3">
                    {"//"} CONTACT
                  </span>

                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-[0.92]">
                    HAVE A <br />
                    <span className="inline-block border-2 border-[#c8ff00] text-[#c8ff00] px-3 sm:px-4 py-0.5 sm:py-1 my-1 shadow-[0_0_20px_rgba(200,255,0,0.2)] rounded-xs">
                      PROJECT
                    </span>{" "}
                    <br />
                    IN MIND?
                  </h1>
                </div>

                <div className="space-y-3 pt-6">
                  <p className="text-neutral-400 text-sm sm:text-base">
                    Let&apos;s create something that stands out.
                  </p>

                  <div className="flex items-center gap-2.5 text-neutral-300 font-mono text-sm sm:text-base pt-2">
                    <span className="text-[#c8ff00]">✉</span>
                    <a
                      href="mailto:hello@framestudio.in"
                      className="hover:text-[#c8ff00] transition-colors font-medium underline-offset-4 hover:underline"
                    >
                      hello@framestudio.in
                    </a>
                  </div>
                </div>

                <div className="border-t border-neutral-900 pt-8 mt-12 font-mono text-xs text-neutral-500 space-y-2">
                  <p>Distributed Studio Practice</p>
                  <p>New York • Berlin • Zurich</p>
                  <p className="text-[#c8ff00]">Responses within 48 hours</p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Clean Form with Card Shadow and Reveal */}
            <div className="lg:col-span-6">
              <Reveal direction="up" delay={0.15}>
                <div className="bg-[#0a0a0a] border border-neutral-800 p-6 sm:p-10 rounded-xs shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                  <Suspense
                    fallback={
                      <div className="h-72 flex items-center justify-center font-mono text-xs text-neutral-500">
                        Loading inquiry desk...
                      </div>
                    }
                  >
                    <InquiryForm />
                  </Suspense>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
