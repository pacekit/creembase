-- Subscriptions module: public.subscriptions (Creem access + lifecycle)

create table if not exists public.subscriptions (
  user_id uuid primary key references public.users(id) on delete cascade,

  -- Controlled exclusively by Creem webhook grant/revoke events.
  is_active boolean not null default false,
  status text not null default 'unpaid',

  creem_customer_id text,
  creem_subscription_id text,
  creem_product_id text,

  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at_subscriptions()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists trg_subscriptions_set_updated_at on public.subscriptions;
create trigger trg_subscriptions_set_updated_at
before update on public.subscriptions
for each row execute procedure public.set_updated_at_subscriptions();

-- RLS: users can read their own subscription; updates are webhook-only.
alter table public.subscriptions enable row level security;

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own"
on public.subscriptions
for select
using (user_id = auth.uid());

