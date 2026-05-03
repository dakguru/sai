create table if not exists products (
  id text primary key,
  slug text unique not null,
  data jsonb not null,
  archived boolean default false,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists orders (
  id text primary key,
  customer jsonb not null,
  items jsonb not null,
  total numeric not null,
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists site_settings (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz default now()
);

create table if not exists audit_log (
  id bigint generated always as identity primary key,
  email text,
  action text,
  entity text,
  delta text,
  created_at timestamptz default now()
);

create table if not exists authorized_users (
  email text primary key,
  role text not null check (role in ('admin', 'developer'))
);

insert into authorized_users (email, role)
values
  ('admin@saiagrofoods.com', 'admin'),
  ('developer@saiagrofoods.com', 'developer')
on conflict (email) do update set role = excluded.role;

create table if not exists user_profiles (
  id uuid primary key references auth.users on delete cascade,
  email text not null unique,
  full_name text,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  pincode text,
  role text not null default 'customer' check (role in ('admin', 'developer', 'customer')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table user_profiles add column if not exists phone text;
alter table user_profiles add column if not exists address_line1 text;
alter table user_profiles add column if not exists address_line2 text;
alter table user_profiles add column if not exists city text;
alter table user_profiles add column if not exists state text;
alter table user_profiles add column if not exists pincode text;

alter table products enable row level security;
alter table orders enable row level security;
alter table site_settings enable row level security;
alter table audit_log enable row level security;
alter table authorized_users enable row level security;
alter table user_profiles enable row level security;

create schema if not exists app_private;

create or replace function app_private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  assigned_role text;
begin
  select role
    into assigned_role
    from public.authorized_users
    where lower(email) = lower(new.email);

  insert into public.user_profiles (id, email, full_name, role)
  values (
    new.id,
    lower(new.email),
    new.raw_user_meta_data ->> 'full_name',
    coalesce(assigned_role, 'customer')
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        role = excluded.role,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure app_private.handle_new_user();

create or replace function app_private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.user_profiles
    where id = auth.uid()
      and role in ('admin', 'developer')
  );
$$;

create or replace function app_private.sync_authorized_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op in ('INSERT', 'UPDATE') then
    update public.user_profiles
      set role = new.role,
          updated_at = now()
      where lower(email) = lower(new.email)
        and role is distinct from new.role;
  end if;

  if tg_op in ('UPDATE', 'DELETE') then
    update public.user_profiles
      set role = 'customer',
          updated_at = now()
      where lower(email) = lower(old.email)
        and not exists (
          select 1
          from public.authorized_users
          where lower(email) = lower(old.email)
        )
        and role in ('admin', 'developer');
  end if;

  return coalesce(new, old);
end;
$$;

drop trigger if exists on_authorized_user_changed on public.authorized_users;

create trigger on_authorized_user_changed
after insert or update or delete on public.authorized_users
for each row execute procedure app_private.sync_authorized_user_profile();

update public.user_profiles
  set role = authorized_users.role,
      updated_at = now()
from public.authorized_users
where lower(user_profiles.email) = lower(authorized_users.email)
  and user_profiles.role is distinct from authorized_users.role;

drop function if exists public.is_staff();

drop policy if exists "Public can read products" on products;
drop policy if exists "Staff can manage products" on products;
drop policy if exists "Public can read site settings" on site_settings;
drop policy if exists "Staff can manage site settings" on site_settings;
drop policy if exists "Staff can manage orders" on orders;
drop policy if exists "Staff can manage audit log" on audit_log;
drop policy if exists "Users can read own profile" on user_profiles;
drop policy if exists "Staff can read authorized IDs" on authorized_users;

create policy "Public can read products"
on products for select
using (true);

create policy "Staff can manage products"
on products for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Public can read site settings"
on site_settings for select
using (true);

create policy "Staff can manage site settings"
on site_settings for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Staff can manage orders"
on orders for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Staff can manage audit log"
on audit_log for all
to authenticated
using (app_private.is_staff())
with check (app_private.is_staff());

create policy "Users can read own profile"
on user_profiles for select
to authenticated
using (id = auth.uid() or app_private.is_staff());

create policy "Users can update own profile"
on user_profiles for update
to authenticated
using (id = auth.uid() or app_private.is_staff())
with check (
  app_private.is_staff()
  or (id = auth.uid() and role = 'customer')
);

create policy "Users can insert own profile"
on user_profiles for insert
to authenticated
with check (
  app_private.is_staff()
  or (id = auth.uid() and role = 'customer')
);

create policy "Staff can read authorized IDs"
on authorized_users for select
to authenticated
using (app_private.is_staff());

grant usage on schema public to anon, authenticated;
grant usage on schema app_private to authenticated;
grant execute on function app_private.is_staff() to authenticated;
grant select on products, site_settings to anon, authenticated;
grant select on user_profiles, authorized_users to authenticated;
grant insert, update on user_profiles to authenticated;
grant select, insert, update, delete on products, orders, site_settings, audit_log to authenticated;
grant usage, select on all sequences in schema public to authenticated;
