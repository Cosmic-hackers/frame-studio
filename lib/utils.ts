import type { ArticleBlock } from "@/lib/types";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function readingMinutes(blocks: ArticleBlock[]) {
  const words = blocks
    .map((block) => block.text)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function siteUrl() {
  const value =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return value.replace(/\/$/, "");
}

export function parseBody(input: string): ArticleBlock[] {
  return input
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith("## ")) {
        return { type: "h2" as const, text: chunk.slice(3).trim() };
      }
      if (chunk.startsWith("> ")) {
        return { type: "quote" as const, text: chunk.replace(/^>\s?/gm, "").trim() };
      }
      return { type: "p" as const, text: chunk.replace(/\s*\n\s*/g, " ").trim() };
    })
    .filter((block) => block.text.length > 0);
}

export function serializeBody(blocks: ArticleBlock[]) {
  return blocks
    .map((block) => {
      if (block.type === "h2") return `## ${block.text}`;
      if (block.type === "quote") return `> ${block.text}`;
      return block.text;
    })
    .join("\n\n");
}

export function inkOn(hex: string) {
  const value = hex.replace("#", "");
  if (value.length !== 6) return "#111111";
  const num = Number.parseInt(value, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.64 ? "#111111" : "#F5F5F0";
}

export function storagePublicUrl(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return null;
  return `${base}/storage/v1/object/public/project-media/${path}`;
}
