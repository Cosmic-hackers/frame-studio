"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { ActionState } from "@/lib/action-state";
import { requireAdmin } from "@/lib/auth";
import { parseColors, parseProcess, splitList } from "@/lib/forms";
import { INQUIRY_STATUSES } from "@/lib/types";
import { parseBody, readingMinutes, slugify } from "@/lib/utils";
import { articleFormSchema, fieldErrorsFrom, projectFormSchema } from "@/lib/validators";

function fail(message: string, fieldErrors: Record<string, string> = {}): ActionState {
  return { ok: false, message, fieldErrors };
}

function bust(tag: string, paths: string[]) {
  updateTag(tag);
  for (const path of paths) revalidatePath(path);
}

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

async function uploadImages(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  projectId: string,
  files: File[],
  startOrder: number,
) {
  let order = startOrder;
  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) continue;
    if (!imageTypes.has(file.type)) {
      throw new Error("Use JPG, PNG, WEBP, or GIF images.");
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Each image must be 5 MB or smaller.");
    }
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${projectId}/${crypto.randomUUID()}.${ext}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("project-media")
      .upload(path, bytes, { contentType: file.type, upsert: false });
    if (uploadError) throw new Error(uploadError.message);

    const alt = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim() || "Project image";
    const { error: rowError } = await supabase.from("project_gallery").insert({
      project_id: projectId,
      storage_path: path,
      alt,
      caption: "",
      sort_order: order,
    });
    if (rowError) throw new Error(rowError.message);
    order += 1;
  }
}

function projectPayload(formData: FormData) {
  const parsed = projectFormSchema.safeParse({
    title: formData.get("title"),
    slug: String(formData.get("slug") || slugify(String(formData.get("title") ?? ""))),
    clientName: formData.get("clientName"),
    category: formData.get("category"),
    year: formData.get("year"),
    summary: formData.get("summary"),
    overview: formData.get("overview"),
    clientDescription: formData.get("clientDescription"),
    challenge: formData.get("challenge"),
    strategy: formData.get("strategy"),
    outcome: formData.get("outcome"),
    process: formData.get("process"),
    typography: formData.get("typography"),
    colors: formData.get("colors"),
    technologies: formData.get("technologies"),
    serviceSlugs: formData.getAll("serviceSlugs").map(String),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    fictional: true,
    sortOrder: formData.get("sortOrder") || 0,
  });

  if (!parsed.success) {
    return { error: fail("Check the project fields.", fieldErrorsFrom(parsed.error)) };
  }

  const process = parseProcess(parsed.data.process);
  const colors = parseColors(parsed.data.colors);
  if (!process) {
    return {
      error: fail("Write each process step as a title, an em dash, and the description.", {
        process: "Use “Title — description”, with a blank line between steps.",
      }),
    };
  }
  if (!colors) {
    return {
      error: fail("Write each color as a name and a hex value.", {
        colors: "Example: Signal #C8FF00",
      }),
    };
  }

  return {
    data: parsed.data,
    row: {
      slug: parsed.data.slug,
      title: parsed.data.title,
      client_name: parsed.data.clientName,
      category: parsed.data.category,
      year: parsed.data.year,
      summary: parsed.data.summary,
      overview: parsed.data.overview,
      client_description: parsed.data.clientDescription,
      challenge: parsed.data.challenge,
      strategy: parsed.data.strategy,
      process,
      outcome: parsed.data.outcome,
      typography: splitList(parsed.data.typography),
      colors,
      technologies: splitList(parsed.data.technologies),
      featured: parsed.data.featured,
      published: parsed.data.published,
      fictional: true,
      sort_order: parsed.data.sortOrder,
      updated_at: new Date().toISOString(),
    },
  };
}

async function linkServices(
  supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"],
  projectId: string,
  slugs: string[],
) {
  const { data: services, error } = await supabase.from("services").select("id, slug");
  if (error) throw new Error(error.message);
  const ids = slugs
    .map((slug) => services?.find((service) => service.slug === slug)?.id)
    .filter((id): id is string => Boolean(id));
  if (ids.length !== slugs.length) throw new Error("One of the selected services no longer exists.");
  const { error: deleteError } = await supabase
    .from("project_services")
    .delete()
    .eq("project_id", projectId);
  if (deleteError) throw new Error(deleteError.message);
  const { error: insertError } = await supabase
    .from("project_services")
    .insert(ids.map((service_id) => ({ project_id: projectId, service_id })));
  if (insertError) throw new Error(insertError.message);
}

export async function saveProject(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const parsed = projectPayload(formData);
  if ("error" in parsed && parsed.error) return parsed.error;
  if (!("row" in parsed) || !parsed.row || !parsed.data) return fail("The project could not be read.");

  const id = String(formData.get("id") ?? "");
  try {
    if (!id) {
      const { data, error } = await supabase
        .from("projects")
        .insert(parsed.row)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      await linkServices(supabase, data.id, parsed.data.serviceSlugs);
      await uploadImages(supabase, data.id, formData.getAll("images") as File[], 0);
      bust("projects", ["/", "/work", `/work/${parsed.data.slug}`]);
      redirect(`/admin/projects/${data.id}/edit`);
    }

    const { error } = await supabase.from("projects").update(parsed.row).eq("id", id);
    if (error) throw new Error(error.message);
    await linkServices(supabase, id, parsed.data.serviceSlugs);

    const galleryIds = formData.getAll("galleryId").map(String);
    for (const galleryId of galleryIds) {
      if (formData.get(`remove:${galleryId}`) === "on") {
        const { data: existing } = await supabase
          .from("project_gallery")
          .select("storage_path")
          .eq("id", galleryId)
          .single();
        if (existing?.storage_path) {
          await supabase.storage.from("project-media").remove([existing.storage_path]);
        }
        await supabase.from("project_gallery").delete().eq("id", galleryId);
      } else {
        await supabase
          .from("project_gallery")
          .update({
            alt: String(formData.get(`alt:${galleryId}`) ?? "").trim() || "Project image",
            caption: String(formData.get(`caption:${galleryId}`) ?? "").trim(),
          })
          .eq("id", galleryId);
      }
    }

    const { count } = await supabase
      .from("project_gallery")
      .select("id", { count: "exact", head: true })
      .eq("project_id", id);
    await uploadImages(supabase, id, formData.getAll("images") as File[], count ?? 0);
    bust("projects", ["/", "/work", `/work/${parsed.data.slug}`]);
    return { ok: true, message: "Project saved.", fieldErrors: {} };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      String((error as { digest: unknown }).digest).startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    return fail(error instanceof Error ? error.message : "The project could not be saved.");
  }
}

export async function deleteProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const { data: gallery } = await supabase
    .from("project_gallery")
    .select("storage_path")
    .eq("project_id", id);
  const paths = (gallery ?? []).map((item) => item.storage_path).filter(Boolean) as string[];
  if (paths.length) await supabase.storage.from("project-media").remove(paths);
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  bust("projects", ["/", "/work"]);
  redirect("/admin/projects");
}

function articlePayload(formData: FormData) {
  const parsed = articleFormSchema.safeParse({
    title: formData.get("title"),
    slug: String(formData.get("slug") || slugify(String(formData.get("title") ?? ""))),
    excerpt: formData.get("excerpt"),
    categorySlug: formData.get("categorySlug"),
    body: formData.get("body"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    published: formData.get("published") === "on",
    publishedAt: formData.get("publishedAt"),
  });
  if (!parsed.success) {
    return { error: fail("Check the article fields.", fieldErrorsFrom(parsed.error)) };
  }
  const blocks = parseBody(parsed.data.body);
  if (blocks.length === 0) return { error: fail("The article needs a body.", { body: "Write the article." }) };
  return { data: parsed.data, blocks };
}

export async function saveArticle(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const { supabase } = await requireAdmin();
  const parsed = articlePayload(formData);
  if ("error" in parsed && parsed.error) return parsed.error;
  if (!parsed.data || !parsed.blocks) return fail("The article could not be read.");

  const { data: category, error: categoryError } = await supabase
    .from("article_categories")
    .select("id")
    .eq("slug", parsed.data.categorySlug)
    .single();
  if (categoryError || !category) return fail("Choose a category that exists.", { categorySlug: "Unknown category." });

  const row = {
    slug: parsed.data.slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.blocks,
    category_id: category.id,
    reading_minutes: readingMinutes(parsed.blocks),
    published: parsed.data.published,
    published_at: new Date(parsed.data.publishedAt).toISOString(),
    seo_title: parsed.data.seoTitle,
    seo_description: parsed.data.seoDescription,
    updated_at: new Date().toISOString(),
  };

  const id = String(formData.get("id") ?? "");
  if (!id) {
    const { data, error } = await supabase.from("articles").insert(row).select("id").single();
    if (error) return fail(error.message);
    bust("articles", ["/", "/journal", `/journal/${parsed.data.slug}`]);
    redirect(`/admin/journal/${data.id}/edit`);
  }

  const { error } = await supabase.from("articles").update(row).eq("id", id);
  if (error) return fail(error.message);
  bust("articles", ["/", "/journal", `/journal/${parsed.data.slug}`]);
  return { ok: true, message: "Article saved.", fieldErrors: {} };
}

export async function deleteArticle(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  bust("articles", ["/", "/journal"]);
  redirect("/admin/journal");
}

export async function updateInquiryStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!INQUIRY_STATUSES.includes(status as (typeof INQUIRY_STATUSES)[number])) {
    throw new Error("Unknown status.");
  }
  const { error } = await supabase
    .from("inquiries")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin/dashboard");
}
