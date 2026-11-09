import articlesJson from "@/lib/content/articles.json";
import categoriesJson from "@/lib/content/categories.json";
import projectsJson from "@/lib/content/projects.json";
import servicesJson from "@/lib/content/services.json";
import studioJson from "@/lib/content/studio.json";
import teamJson from "@/lib/content/team.json";
import type {
  Article,
  ArticleCategory,
  Project,
  Service,
  TeamMember,
} from "@/lib/types";
import { readingMinutes } from "@/lib/utils";

export const services = servicesJson as Service[];
export const categories = categoriesJson as ArticleCategory[];
export const projects = projectsJson as Project[];
export const articles = articlesJson as Article[];
export const team = teamJson as TeamMember[];
export const studio = studioJson;

export function categoryName(slug: string) {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

export function articleReadingTime(article: Article) {
  return readingMinutes(article.blocks);
}

export function serviceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
