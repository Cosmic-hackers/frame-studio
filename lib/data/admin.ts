import { requireAdmin } from "@/lib/auth";
import { mapArticle, mapInquiry, mapProject } from "@/lib/data/mappers";
import { storagePublicUrl } from "@/lib/utils";

const projectSelect =
  "*, project_gallery(id, alt, caption, storage_path, sort_order), project_services(services(slug))";

export async function getAdminContext() {
  return requireAdmin();
}

export async function getDashboardData() {
  const { supabase, profile } = await requireAdmin();
  const [projects, articles, inquiries] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }),
  ]);

  if (projects.error) throw new Error(projects.error.message);
  if (articles.error) throw new Error(articles.error.message);
  if (inquiries.error) throw new Error(inquiries.error.message);

  const rows = (inquiries.data ?? []).map((row) => mapInquiry(row));
  return {
    email: profile.email as string,
    projectCount: projects.count ?? 0,
    articleCount: articles.count ?? 0,
    inquiryCount: rows.length,
    newCount: rows.filter((row) => row.status === "new").length,
    recent: rows.slice(0, 5),
  };
}

export async function getAdminProjects() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("projects")
    .select(projectSelect)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    ...mapProject(row),
    gallery: [...(row.project_gallery ?? [])]
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
      .map((item: { id: string; alt: string; caption: string | null; storage_path: string | null }) => ({
        id: item.id,
        alt: item.alt,
        caption: item.caption ?? "",
        imageUrl: storagePublicUrl(item.storage_path),
      })),
  }));
}

export async function getAdminProject(id: string) {
  const projects = await getAdminProjects();
  return projects.find((project) => project.id === id) ?? null;
}

export async function getAdminArticles() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("articles")
    .select("*, article_categories(slug)")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => mapArticle(row));
}

export async function getAdminArticle(id: string) {
  const articles = await getAdminArticles();
  return articles.find((article) => article.id === id) ?? null;
}

export async function getAdminInquiries() {
  const { supabase } = await requireAdmin();
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => mapInquiry(row));
}
