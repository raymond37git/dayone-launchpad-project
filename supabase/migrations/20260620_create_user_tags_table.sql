create table if not exists public.user_tags (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  tag        text not null,
  created_at timestamptz default now(),
  unique (user_id, tag)
);

alter table public.user_tags enable row level security;

create policy "Users can view own tags"
  on public.user_tags for select
  using (auth.uid() = user_id);

create policy "Users can insert own tags"
  on public.user_tags for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own tags"
  on public.user_tags for delete
  using (auth.uid() = user_id);
