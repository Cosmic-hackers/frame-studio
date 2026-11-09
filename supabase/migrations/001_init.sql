-- FRAME Studio schema, indexes, and row level security.
-- Run this in the Supabase SQL editor before seed.sql.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text not null default '',
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  overview text not null,
  capabilities text[] not null default '{}',
  process jsonb not null default '[]'::jsonb,
  deliverables text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text not null,
  category text not null,
  year integer not null,
  summary text not null,
  overview text not null,
  client_description text not null,
  challenge text not null,
  strategy text not null,
  process jsonb not null default '[]'::jsonb,
  outcome text not null,
  typography text[] not null default '{}',
  colors jsonb not null default '[]'::jsonb,
  technologies text[] not null default '{}',
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  fictional boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  storage_path text,
  alt text not null,
  caption text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.project_services (
  project_id uuid not null references public.projects (id) on delete cascade,
  service_id uuid not null references public.services (id) on delete cascade,
  primary key (project_id, service_id)
);

create table if not exists public.article_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content jsonb not null default '[]'::jsonb,
  category_id uuid not null references public.article_categories (id),
  reading_minutes integer not null default 1,
  published boolean not null default false,
  published_at timestamptz not null default now(),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company text check (company is null or char_length(company) <= 120),
  project_type text not null,
  budget_range text not null,
  timeline text not null,
  description text not null check (char_length(description) between 30 and 4000),
  status text not null default 'new' check (status in ('new', 'reviewing', 'replied', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  is_demo boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists projects_published_sort_idx on public.projects (published, sort_order);
create index if not exists projects_slug_idx on public.projects (slug);
create index if not exists project_gallery_project_idx on public.project_gallery (project_id, sort_order);
create index if not exists articles_published_date_idx on public.articles (published, published_at desc);
create index if not exists articles_slug_idx on public.articles (slug);
create index if not exists articles_category_idx on public.articles (category_id);
create index if not exists inquiries_status_created_idx on public.inquiries (status, created_at desc);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists services_updated_at on public.services;
create trigger services_updated_at before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists articles_updated_at on public.articles;
create trigger articles_updated_at before update on public.articles
for each row execute function public.set_updated_at();

drop trigger if exists inquiries_updated_at on public.inquiries;
create trigger inquiries_updated_at before update on public.inquiries
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'editor'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.project_gallery enable row level security;
alter table public.project_services enable row level security;
alter table public.article_categories enable row level security;
alter table public.articles enable row level security;
alter table public.inquiries enable row level security;
alter table public.team_members enable row level security;

drop policy if exists "read own or admin profile" on public.profiles;
create policy "read own or admin profile" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services
  for select to anon, authenticated
  using (true);

drop policy if exists "admin write services" on public.services;
create policy "admin write services" on public.services
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects
  for select to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write projects" on public.projects;
create policy "admin write projects" on public.projects
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read gallery" on public.project_gallery;
create policy "public read gallery" on public.project_gallery
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and (p.published = true or public.is_admin())
    )
  );

drop policy if exists "admin write gallery" on public.project_gallery;
create policy "admin write gallery" on public.project_gallery
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read project services" on public.project_services;
create policy "public read project services" on public.project_services
  for select to anon, authenticated
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and (p.published = true or public.is_admin())
    )
  );

drop policy if exists "admin write project services" on public.project_services;
create policy "admin write project services" on public.project_services
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read categories" on public.article_categories;
create policy "public read categories" on public.article_categories
  for select to anon, authenticated
  using (true);

drop policy if exists "admin write categories" on public.article_categories;
create policy "admin write categories" on public.article_categories
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read articles" on public.articles;
create policy "public read articles" on public.articles
  for select to anon, authenticated
  using (published = true or public.is_admin());

drop policy if exists "admin write articles" on public.articles;
create policy "admin write articles" on public.articles
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "insert inquiry" on public.inquiries;
create policy "insert inquiry" on public.inquiries
  for insert to anon, authenticated
  with check (status = 'new');

drop policy if exists "admin read inquiries" on public.inquiries;
create policy "admin read inquiries" on public.inquiries
  for select to authenticated
  using (public.is_admin());

drop policy if exists "admin update inquiries" on public.inquiries;
create policy "admin update inquiries" on public.inquiries
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "public read team" on public.team_members;
create policy "public read team" on public.team_members
  for select to anon, authenticated
  using (true);

drop policy if exists "admin write team" on public.team_members;
create policy "admin write team" on public.team_members
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant usage on schema public to anon, authenticated;
grant select on public.services, public.projects, public.project_gallery, public.project_services,
  public.article_categories, public.articles, public.team_members to anon, authenticated;
grant insert on public.inquiries to anon, authenticated;
grant select, update on public.inquiries to authenticated;
grant select on public.profiles to authenticated;
grant insert, update, delete on public.services, public.projects, public.project_gallery,
  public.project_services, public.article_categories, public.articles, public.team_members to authenticated;
