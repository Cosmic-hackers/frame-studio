import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const content = join(root, "lib", "content");
const read = (name) => JSON.parse(readFileSync(join(content, name), "utf8"));

const services = read("services.json");
const categories = read("categories.json");
const projects = read("projects.json");
const articles = read("articles.json");
const team = read("team.json");

const dollar = (value) => `$frame$${value}$frame$`;
const textArray = (items) =>
  items.length ? `array[${items.map((item) => dollar(item)).join(", ")}]::text[]` : "'{}'::text[]";
const jsonb = (value) => `${dollar(JSON.stringify(value))}::jsonb`;
const readingMinutes = (blocks) => {
  const words = blocks
    .map((block) => block.text)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

const lines = [];
lines.push("-- Generated from lib/content. Re-run: node scripts/emit-seed.mjs");
lines.push("-- Run after supabase/migrations/001_init.sql.");
lines.push("begin;");

for (const service of services) {
  lines.push(`insert into public.services (id, slug, title, summary, overview, capabilities, process, deliverables)
values (
  '${service.id}',
  ${dollar(service.slug)},
  ${dollar(service.title)},
  ${dollar(service.summary)},
  ${dollar(service.overview)},
  ${textArray(service.capabilities)},
  ${jsonb(service.process)},
  ${textArray(service.deliverables)}
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  summary = excluded.summary,
  overview = excluded.overview,
  capabilities = excluded.capabilities,
  process = excluded.process,
  deliverables = excluded.deliverables;`);
}

for (const category of categories) {
  lines.push(`insert into public.article_categories (id, slug, name)
values ('${category.id}', ${dollar(category.slug)}, ${dollar(category.name)})
on conflict (id) do update set slug = excluded.slug, name = excluded.name;`);
}

for (const member of team) {
  lines.push(`insert into public.team_members (id, name, role, bio, is_demo, sort_order)
values (
  '${member.id}',
  ${dollar(member.name)},
  ${dollar(member.role)},
  ${dollar(member.bio)},
  ${member.isDemo},
  ${member.sortOrder}
) on conflict (id) do update set
  name = excluded.name,
  role = excluded.role,
  bio = excluded.bio,
  is_demo = excluded.is_demo,
  sort_order = excluded.sort_order;`);
}

for (const project of projects) {
  lines.push(`insert into public.projects (
  id, slug, title, client_name, category, year, summary, overview, client_description,
  challenge, strategy, process, outcome, typography, colors, technologies,
  featured, published, sort_order, fictional
) values (
  '${project.id}',
  ${dollar(project.slug)},
  ${dollar(project.title)},
  ${dollar(project.clientName)},
  ${dollar(project.category)},
  ${project.year},
  ${dollar(project.summary)},
  ${dollar(project.overview)},
  ${dollar(project.clientDescription)},
  ${dollar(project.challenge)},
  ${dollar(project.strategy)},
  ${jsonb(project.process)},
  ${dollar(project.outcome)},
  ${textArray(project.typography)},
  ${jsonb(project.colors)},
  ${textArray(project.technologies)},
  ${project.featured},
  ${project.published},
  ${project.sortOrder},
  ${project.fictional}
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  client_name = excluded.client_name,
  category = excluded.category,
  year = excluded.year,
  summary = excluded.summary,
  overview = excluded.overview,
  client_description = excluded.client_description,
  challenge = excluded.challenge,
  strategy = excluded.strategy,
  process = excluded.process,
  outcome = excluded.outcome,
  typography = excluded.typography,
  colors = excluded.colors,
  technologies = excluded.technologies,
  featured = excluded.featured,
  published = excluded.published,
  sort_order = excluded.sort_order,
  fictional = excluded.fictional;`);

  lines.push(`delete from public.project_gallery where project_id = '${project.id}' and storage_path is null;`);
  project.gallery.forEach((item, index) => {
    lines.push(`insert into public.project_gallery (project_id, storage_path, alt, caption, sort_order)
select '${project.id}', null, ${dollar(item.alt)}, ${dollar(item.caption)}, ${index}
where not exists (
  select 1 from public.project_gallery
  where project_id = '${project.id}' and alt = ${dollar(item.alt)}
);`);
  });

  for (const slug of project.serviceSlugs) {
    const service = services.find((item) => item.slug === slug);
    lines.push(`insert into public.project_services (project_id, service_id)
values ('${project.id}', '${service.id}')
on conflict do nothing;`);
  }
}

for (const article of articles) {
  const category = categories.find((item) => item.slug === article.categorySlug);
  lines.push(`insert into public.articles (
  id, slug, title, excerpt, content, category_id, reading_minutes, published, published_at, seo_title, seo_description
) values (
  '${article.id}',
  ${dollar(article.slug)},
  ${dollar(article.title)},
  ${dollar(article.excerpt)},
  ${jsonb(article.blocks)},
  '${category.id}',
  ${readingMinutes(article.blocks)},
  ${article.published},
  ${dollar(article.publishedAt)},
  ${dollar(article.seoTitle)},
  ${dollar(article.seoDescription)}
) on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category_id = excluded.category_id,
  reading_minutes = excluded.reading_minutes,
  published = excluded.published,
  published_at = excluded.published_at,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;`);
}

lines.push("commit;");
writeFileSync(join(root, "supabase", "seed.sql"), `${lines.join("\n\n")}\n`);
console.log("Wrote supabase/seed.sql");
