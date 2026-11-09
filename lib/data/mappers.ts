import type {
  Article,
  ArticleBlock,
  GalleryItem,
  Inquiry,
  ProcessStep,
  Project,
  Service,
  TeamMember,
} from "@/lib/types";
import { storagePublicUrl } from "@/lib/utils";

type GalleryRow = {
  alt: string;
  caption: string | null;
  storage_path: string | null;
  sort_order: number;
};

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  category: string;
  year: number;
  summary: string;
  overview: string;
  client_description: string;
  challenge: string;
  strategy: string;
  process: ProcessStep[];
  outcome: string;
  typography: string[];
  colors: Project["colors"];
  technologies: string[];
  featured: boolean;
  published: boolean;
  sort_order: number;
  fictional: boolean;
  project_gallery?: GalleryRow[] | null;
  project_services?: { services: { slug: string } | { slug: string }[] | null }[] | null;
};

export function mapProject(row: ProjectRow): Project {
  const gallery: GalleryItem[] = [...(row.project_gallery ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({
      alt: item.alt,
      caption: item.caption ?? "",
      imageUrl: storagePublicUrl(item.storage_path),
    }));

  const serviceSlugs = (row.project_services ?? []).flatMap((link) => {
    if (!link.services) return [];
    return Array.isArray(link.services)
      ? link.services.map((service) => service.slug)
      : [link.services.slug];
  });

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    clientName: row.client_name,
    category: row.category,
    year: row.year,
    summary: row.summary,
    overview: row.overview,
    clientDescription: row.client_description,
    challenge: row.challenge,
    strategy: row.strategy,
    process: row.process ?? [],
    outcome: row.outcome,
    typography: row.typography ?? [],
    colors: row.colors ?? [],
    technologies: row.technologies ?? [],
    serviceSlugs,
    gallery,
    featured: row.featured,
    published: row.published,
    sortOrder: row.sort_order,
    fictional: row.fictional,
  };
}

type ServiceRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  overview: string;
  capabilities: string[];
  process: ProcessStep[];
  deliverables: string[];
};

export function mapService(row: ServiceRow): Service {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    overview: row.overview,
    capabilities: row.capabilities ?? [],
    process: row.process ?? [],
    deliverables: row.deliverables ?? [],
  };
}

type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: ArticleBlock[];
  published_at: string;
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
  article_categories?: { slug: string } | { slug: string }[] | null;
};

export function mapArticle(row: ArticleRow): Article {
  const category = row.article_categories;
  const categorySlug = Array.isArray(category)
    ? category[0]?.slug
    : category?.slug;

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    categorySlug: categorySlug ?? "perspective",
    blocks: row.content ?? [],
    publishedAt: row.published_at,
    seoTitle: row.seo_title ?? row.title,
    seoDescription: row.seo_description ?? row.excerpt,
    published: row.published,
  };
}

type TeamRow = {
  id: string;
  name: string;
  role: string;
  bio: string;
  is_demo: boolean;
  sort_order: number;
};

export function mapTeam(row: TeamRow): TeamMember {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    bio: row.bio,
    isDemo: row.is_demo,
    sortOrder: row.sort_order,
  };
}

type InquiryRow = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  budget_range: string;
  timeline: string;
  description: string;
  status: Inquiry["status"];
  created_at: string;
};

export function mapInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    projectType: row.project_type,
    budgetRange: row.budget_range,
    timeline: row.timeline,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
  };
}
