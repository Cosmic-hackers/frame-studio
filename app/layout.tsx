import type { Metadata } from "next";
import { Anton, IBM_Plex_Mono, Manrope } from "next/font/google";
import { siteUrl } from "@/lib/utils";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const plex = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "FRAME Studio",
    template: "%s — FRAME Studio",
  },
  description:
    "FRAME Studio is a fictional creative studio for branding, digital experiences, and creative development. We make ideas impossible to ignore.",
  openGraph: {
    title: "FRAME Studio",
    description: "We make ideas impossible to ignore.",
    siteName: "FRAME Studio",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable} ${plex.variable}`}>
      <body className="min-h-screen antialiased bg-[#0a0a0a] text-paper">
        <a className="skip" href="#content">
          Skip to content
        </a>
        <SmoothScroll>
          <Preloader />
          <div id="content">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
