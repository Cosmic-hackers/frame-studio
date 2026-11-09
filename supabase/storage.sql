-- Run after 001_init.sql, in the Supabase SQL editor.
-- Creates the public gallery bucket and restricts writes to admins.

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do update set public = true;

drop policy if exists "public read project media" on storage.objects;
create policy "public read project media" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'project-media');

drop policy if exists "admin insert project media" on storage.objects;
create policy "admin insert project media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'project-media' and public.is_admin());

drop policy if exists "admin update project media" on storage.objects;
create policy "admin update project media" on storage.objects
  for update to authenticated
  using (bucket_id = 'project-media' and public.is_admin())
  with check (bucket_id = 'project-media' and public.is_admin());

drop policy if exists "admin delete project media" on storage.objects;
create policy "admin delete project media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'project-media' and public.is_admin());
