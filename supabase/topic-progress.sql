create table if not exists public.user_topic_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_slug text not null,
  status text not null default 'started',
  started_at timestamptz not null default now(),
  last_opened_at timestamptz not null default now(),
  primary key (user_id, topic_slug),
  constraint user_topic_progress_status_check
    check (status in ('started', 'completed'))
);

alter table public.user_topic_progress enable row level security;

drop policy if exists "Users can read their own topic progress"
  on public.user_topic_progress;

create policy "Users can read their own topic progress"
  on public.user_topic_progress
  for select
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own topic progress"
  on public.user_topic_progress;

create policy "Users can insert their own topic progress"
  on public.user_topic_progress
  for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own topic progress"
  on public.user_topic_progress;

create policy "Users can update their own topic progress"
  on public.user_topic_progress
  for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

