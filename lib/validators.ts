import { z } from "zod";
import { BUDGET_RANGES, PROJECT_TYPES, TIMELINES } from "@/lib/types";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Tell us your name.").max(80),
  email: z.email("Use a valid email address."),
  company: z.string().trim().max(120).optional().default(""),
  projectType: z.enum(PROJECT_TYPES, "Choose a project type."),
  budgetRange: z.string().trim().min(2, "Choose or enter a budget range.").max(120),
  timeline: z.enum(TIMELINES, "Choose a timeline."),
  description: z
    .string()
    .trim()
    .min(30, "Describe the project in at least a few sentences.")
    .max(4000, "Keep the description under 4000 characters."),
  companyWebsite: z.string().optional().default(""),
  startedAt: z.string().optional().default(""),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export function fieldErrorsFrom(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

export const projectFormSchema = z.object({
  title: z.string().trim().min(2).max(80),
  slug: z.string().trim().min(2).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens."),
  clientName: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(80),
  year: z.coerce.number().int().min(2000).max(2100),
  summary: z.string().trim().min(20).max(280),
  overview: z.string().trim().min(40).max(4000),
  clientDescription: z.string().trim().min(40).max(4000),
  challenge: z.string().trim().min(40).max(4000),
  strategy: z.string().trim().min(40).max(4000),
  outcome: z.string().trim().min(40).max(4000),
  process: z.string().trim().min(10),
  typography: z.string().trim().min(2),
  colors: z.string().trim().min(7),
  technologies: z.string().trim().min(2),
  serviceSlugs: z.array(z.string()).min(1, "Choose at least one service."),
  featured: z.boolean(),
  published: z.boolean(),
  fictional: z.boolean(),
  sortOrder: z.coerce.number().int().min(0).max(999),
});

export const articleFormSchema = z.object({
  title: z.string().trim().min(4).max(140),
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().min(20).max(280),
  categorySlug: z.string().trim().min(2),
  body: z.string().trim().min(80),
  seoTitle: z.string().trim().min(4).max(160),
  seoDescription: z.string().trim().min(20).max(240),
  published: z.boolean(),
  publishedAt: z.string().min(8),
});
