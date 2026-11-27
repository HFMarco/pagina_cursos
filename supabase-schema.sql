-- Cyber Aula: matrículas y certificados por usuario.
-- Ejecutar completo en Supabase Dashboard > SQL Editor. Puede re-ejecutarse tras actualizar el esquema.

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

-- Avance individual por lección. La fila existe cuando el alumno la completa.
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null check (course_id in ('fortinet', 'ccna', 'mikrotik')),
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, course_id, lesson_id)
);

create index if not exists lesson_progress_user_course_idx on public.lesson_progress (user_id, course_id);

-- Comentarios asociados a una lección. Solo alumnos con acceso al curso pueden leer/escribir.
create table if not exists public.course_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null check (course_id in ('fortinet', 'ccna', 'mikrotik')),
  lesson_id text not null,
  parent_comment_id uuid references public.course_comments (id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table public.course_comments
  add column if not exists parent_comment_id uuid references public.course_comments (id) on delete cascade;

create index if not exists course_comments_course_lesson_created_idx on public.course_comments (course_id, lesson_id, created_at);
create index if not exists course_comments_parent_comment_id_idx on public.course_comments (parent_comment_id);

alter table public.enrollments enable row level security;
alter table public.certificates enable row level security;
alter table public.demo_purchases enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.course_comments enable row level security;

revoke all on table public.enrollments from anon, authenticated;
revoke all on table public.certificates from anon, authenticated;
revoke all on table public.demo_purchases from anon, authenticated;
revoke all on table public.lesson_progress from anon, authenticated;
revoke all on table public.course_comments from anon, authenticated;
grant select on table public.enrollments to authenticated;
grant select on table public.certificates to authenticated;
grant select, insert on table public.demo_purchases to authenticated;
grant select, insert, delete on table public.lesson_progress to authenticated;
grant select, insert on table public.course_comments to authenticated;

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

drop policy if exists "Students can read their own course progress" on public.lesson_progress;
create policy "Students can read their own course progress"
  on public.lesson_progress for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students can complete lessons in courses they can access" on public.lesson_progress;
create policy "Students can complete lessons in courses they can access"
  on public.lesson_progress for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and (
      exists (
        select 1 from public.enrollments e
        where e.user_id = (select auth.uid())
          and e.course_id = lesson_progress.course_id
          and e.status = 'active'
      )
      or exists (
        select 1 from public.demo_purchases d
        where d.user_id = (select auth.uid())
          and d.course_id = lesson_progress.course_id
          and d.status = 'completed'
      )
    )
  );

drop policy if exists "Students can undo their own lesson progress" on public.lesson_progress;
create policy "Students can undo their own lesson progress"
  on public.lesson_progress for delete to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Course members can read lesson comments" on public.course_comments;
create policy "Course members can read lesson comments"
  on public.course_comments for select to authenticated
  using (
    exists (
      select 1 from public.enrollments e
      where e.user_id = (select auth.uid())
        and e.course_id = course_comments.course_id
        and e.status = 'active'
    )
    or exists (
      select 1 from public.demo_purchases d
      where d.user_id = (select auth.uid())
        and d.course_id = course_comments.course_id
        and d.status = 'completed'
    )
  );

drop policy if exists "Course members can post lesson comments as themselves" on public.course_comments;
create policy "Course members can post lesson comments as themselves"
  on public.course_comments for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and (
      exists (
        select 1 from public.enrollments e
        where e.user_id = (select auth.uid())
          and e.course_id = course_comments.course_id
          and e.status = 'active'
      )
      or exists (
        select 1 from public.demo_purchases d
        where d.user_id = (select auth.uid())
          and d.course_id = course_comments.course_id
          and d.status = 'completed'
      )
    )
    and (
      parent_comment_id is null
      or exists (
        select 1 from public.course_comments parent
        where parent.id = course_comments.parent_comment_id
          and parent.course_id = course_comments.course_id
          and parent.lesson_id = course_comments.lesson_id
      )
    )
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

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'lesson_progress'
  ) then
    execute 'alter publication supabase_realtime add table public.lesson_progress';
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'course_comments'
  ) then
    execute 'alter publication supabase_realtime add table public.course_comments';
  end if;
end;
$$;
