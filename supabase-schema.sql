-- Cyber Aula: matrículas y certificados por usuario.
-- Ejecutar una vez en Supabase Dashboard > SQL Editor.

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  status text not null default 'active' check (status in ('active', 'revoked')),
  purchased_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists enrollments_user_id_idx on public.enrollments (user_id);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null,
  certificate_url text,
  issued_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists certificates_user_id_idx on public.certificates (user_id);

alter table public.enrollments enable row level security;
alter table public.certificates enable row level security;

revoke all on table public.enrollments from anon, authenticated;
revoke all on table public.certificates from anon, authenticated;
grant select on table public.enrollments to authenticated;
grant select on table public.certificates to authenticated;

drop policy if exists "Students can read their own enrollments" on public.enrollments;
create policy "Students can read their own enrollments"
  on public.enrollments for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students can read their own certificates" on public.certificates;
create policy "Students can read their own certificates"
  on public.certificates for select to authenticated
  using ((select auth.uid()) = user_id);

-- Add the tables to Realtime only if they are not already published.
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'enrollments'
  ) then
    execute 'alter publication supabase_realtime add table public.enrollments';
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'certificates'
  ) then
    execute 'alter publication supabase_realtime add table public.certificates';
  end if;
end;
$$;
