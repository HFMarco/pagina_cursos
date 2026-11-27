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

-- Compra de prueba, separada de las matrículas reales. No procesa pagos.
create table if not exists public.demo_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null check (course_id in ('fortinet', 'ccna', 'mikrotik')),
  amount_pen numeric(6,2) not null default 0.10 check (amount_pen = 0.10),
  status text not null default 'completed' check (status = 'completed'),
  purchased_at timestamptz not null default now(),
  unique (user_id, course_id)
);

create index if not exists demo_purchases_user_id_idx on public.demo_purchases (user_id);

alter table public.enrollments enable row level security;
alter table public.certificates enable row level security;
alter table public.demo_purchases enable row level security;

revoke all on table public.enrollments from anon, authenticated;
revoke all on table public.certificates from anon, authenticated;
revoke all on table public.demo_purchases from anon, authenticated;
grant select on table public.enrollments to authenticated;
grant select on table public.certificates to authenticated;
grant select, insert on table public.demo_purchases to authenticated;

drop policy if exists "Students can read their own enrollments" on public.enrollments;
create policy "Students can read their own enrollments"
  on public.enrollments for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students can read their own certificates" on public.certificates;
create policy "Students can read their own certificates"
  on public.certificates for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students can read their own demo purchases" on public.demo_purchases;
create policy "Students can read their own demo purchases"
  on public.demo_purchases for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students can create their own demo purchases" on public.demo_purchases;
create policy "Students can create their own demo purchases"
  on public.demo_purchases for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and course_id in ('fortinet', 'ccna', 'mikrotik')
    and amount_pen = 0.10
    and status = 'completed'
  );

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

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'demo_purchases'
  ) then
    execute 'alter publication supabase_realtime add table public.demo_purchases';
  end if;
end;
$$;
