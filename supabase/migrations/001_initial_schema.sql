-- Migration: 001_initial_schema
-- Description: Create profiles table linked to auth.users

-- ============================================================
-- Profiles
-- ============================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  birthday date not null,
  language text not null default 'ka' check (language in ('ka', 'en', 'ru')),
  consent_accepted_at timestamptz not null,
  visibility text not null default 'friends' check (visibility in ('private', 'friends', 'link')),
  theme text not null default 'dark' check (theme in ('dark', 'light')),
  notify_daily boolean not null default true,
  notify_time time not null default '09:00',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table profiles enable row level security;

-- Users can only read their own profile
create policy "profiles: select own"
  on profiles for select
  using (auth.uid() = id);

-- Users can only insert their own profile
create policy "profiles: insert own"
  on profiles for insert
  with check (auth.uid() = id);

-- Users can only update their own profile
create policy "profiles: update own"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ============================================================
-- Auto-update updated_at
-- ============================================================
create or replace function handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function handle_updated_at();
