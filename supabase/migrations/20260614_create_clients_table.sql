-- Creates a clients table linked to Supabase Auth (which handles email + password securely)
-- client_id references auth.users so it is auto-generated on every sign-up

create table if not exists public.clients (
  client_id  uuid primary key references auth.users (id) on delete cascade,
  full_name  text not null,
  email      text not null unique
);

-- Enable Row Level Security
alter table public.clients enable row level security;

-- Users can only read and update their own row
create policy "Clients can view own profile"
  on public.clients for select
  using (auth.uid() = client_id);

create policy "Clients can update own profile"
  on public.clients for update
  using (auth.uid() = client_id);

-- Auto-insert a row into clients when a new user signs up via Supabase Auth
create or replace function public.handle_new_client()
returns trigger as $$
begin
  insert into public.clients (client_id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_client();
