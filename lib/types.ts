export type GalleryItem = {
  alt: string;
  caption: string;
  imageUrl?: string | null;
};

export type ColorSwatch = {
  name: string;
  hex: string;
};

export type ProcessStep = {
  title: string;
  text: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  category: string;
  year: number;
  summary: string;
  overview: string;
  clientDescription: string;
  challenge: string;
  strategy: string;
  process: ProcessStep[];
  outcome: string;
  typography: string[];
  colors: ColorSwatch[];
  technologies: string[];
  serviceSlugs: string[];
  gallery: GalleryItem[];
  featured: boolean;
  published: boolean;
  sortOrder: number;
  fictional: boolean;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  overview: string;
  capabilities: string[];
  process: ProcessStep[];
  deliverables: string[];
};

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string };

export type ArticleCategory = {
  id: string;
  slug: string;
  name: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  blocks: ArticleBlock[];
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  isDemo: boolean;
  sortOrder: number;
};

export type InquiryStatus = "new" | "reviewing" | "replied" | "archived";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  projectType: string;
  budgetRange: string;
  timeline: string;
  description: string;
  status: InquiryStatus;
  createdAt: string;
};

export const PROJECT_TYPES = [
  "Branding",
  "UI/UX",
  "Development",
  "Motion",
  "Creative direction",
  "Not sure yet",
] as const;

export const BUDGET_RANGES = [
  "₹50,000 – ₹1,50,000 ($600 – $1,800)",
  "₹1,50,000 – ₹3,50,000 ($1,800 – $4,200)",
  "₹3,50,000 – ₹8,00,000 ($4,200 – $10,000)",
  "₹8,00,000+ ($10,000+)",
  "Custom / Flexible Budget",
] as const;

export const TIMELINES = [
  "About 4 weeks",
  "1–2 months",
  "3–6 months",
  "Flexible",
] as const;

export const INQUIRY_STATUSES: InquiryStatus[] = [
  "new",
  "reviewing",
  "replied",
  "archived",
];
