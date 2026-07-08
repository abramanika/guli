-- Migration: 003_archetypes_schema
-- Description: Create user_archetypes table to store assigned Georgian archetypes

create table user_archetypes (
  user_id uuid primary key references profiles(id) on delete cascade,
  archetype_key text not null,
  name_ka text not null,
  tagline_ka text not null,
  chips jsonb not null default '[]',
  assigned_at timestamptz not null default now()
);

alter table user_archetypes enable row level security;

-- Users can read their own archetype
create policy "Users can read own archetype"
  on user_archetypes
  for select
  using (auth.uid() = user_id);
