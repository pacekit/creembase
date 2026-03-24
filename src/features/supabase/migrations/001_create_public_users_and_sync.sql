-- Auth module: public.users (sync from auth.users)

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep `updated_at` fresh for user-facing profile fields.
create or replace function public.set_updated_at_users()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_users_set_updated_at on public.users;
create trigger trg_users_set_updated_at
before update on public.users
for each row execute procedure public.set_updated_at_users();

-- Sync auth.users -> public.users automatically.
create or replace function public.sync_auth_user_to_public_users()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_full_name text;
begin
  v_full_name := new.raw_user_meta_data ->> 'full_name';

  insert into public.users (id, email, full_name)
  values (new.id, new.email, v_full_name)
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created_public_users on auth.users;
create trigger on_auth_user_created_public_users
after insert or update on auth.users
for each row execute procedure public.sync_auth_user_to_public_users();

-- RLS: users can read/update only their own profile row.
alter table public.users enable row level security;

drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
on public.users
for select
using (id = auth.uid());

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
on public.users
for update
using (id = auth.uid())
with check (id = auth.uid());

