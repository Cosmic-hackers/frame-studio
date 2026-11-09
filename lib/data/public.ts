import { cacheLife, cacheTag } from "next/cache";
import {
  articleReadingTime,
  articles as seedArticles,
  categories as seedCategories,
  projects as seedProjects,
  services as seedServices,
  team as seedTeam,
} from "@/lib/content";
import { mapArticle, mapProject, mapService, mapTeam } from "@/lib/data/mappers";
import { createPublicClient } from "@/lib/supabase/public";
import type { Article, Project, Service, TeamMember } from "@/lib/types";

const projectSelect =
  "*, project_gallery(alt, caption, storage_path, sort_order), project_services(services(slug))";

function publishedSeedArticles() {
  return [...seedArticles]
    .filter((article) => article.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("projects");

  const supabase = createPublicClient();
  if (!supabase) return seedProjects.filter((project) => project.published);

  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) return seedProjects.filter((project) => project.published);
  return (data ?? []).map((row) => mapProject(row));
}

export async function getProject(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug) ?? null;
}

export async function getServices(): Promise<Service[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("services");

  const supabase = createPublicClient();
  if (!supabase) return seedServices;
  const { data, error } = await supabase.from("services").select("*").order("title");
  if (error) return seedServices;
  return (data ?? []).map((row) => mapService(row));
}

export async function getService(slug: string) {
  const list = await getServices();
  return list.find((service) => service.slug === slug) ?? null;
}

export async function getArticles(): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  const supabase = createPublicClient();
  if (!supabase) return publishedSeedArticles();

  const { data, error } = await supabase
    .from("articles")
    .select("*, article_categories(slug)")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (error) return publishedSeedArticles();
  return (data ?? []).map((row) => mapArticle(row));
}

export async function getArticle(slug: string) {
  const list = await getArticles();
  return list.find((article) => article.slug === slug) ?? null;
}

export async function searchArticles(query: string, category: string) {
  const list = await getArticles();
  const needle = query.trim().toLowerCase();
  return list.filter((article) => {
    const categoryMatch = !category || article.categorySlug === category;
    if (!categoryMatch) return false;
    if (!needle) return true;
    const haystack = [
      article.title,
      article.excerpt,
      ...article.blocks.map((block) => block.text),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export async function getCategories() {
  "use cache";
  cacheLife("days");
  cacheTag("articles");
  const supabase = createPublicClient();
  if (!supabase) return seedCategories;
  const { data, error } = await supabase
    .from("article_categories")
    .select("*")
    .order("name");
  if (error) return seedCategories;
  return (data ?? []).map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
  }));
}

export async function getTeam(): Promise<TeamMember[]> {
  "use cache";
  cacheLife("days");
  cacheTag("studio");
  const supabase = createPublicClient();
  if (!supabase) return seedTeam;
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order");
  if (error) return seedTeam;
  return (data ?? []).map((row) => mapTeam(row));
}

export async function getRelatedProjects(serviceSlug: string) {
  const projects = await getProjects();
  return projects.filter((project) => project.serviceSlugs.includes(serviceSlug));
}

export async function getRelatedArticles(article: Article) {
  const list = await getArticles();
  const same = list.filter(
    (item) => item.slug !== article.slug && item.categorySlug === article.categorySlug,
  );
  if (same.length >= 2) return same.slice(0, 2);
  return list.filter((item) => item.slug !== article.slug).slice(0, 2);
}

export { articleReadingTime };
