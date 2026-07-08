-- Migration: 005_portraits
-- Description: Create portraits table to store AI-generated literary personality portraits

create table portraits (
  user_id uuid primary key references profiles(id) on delete cascade,
  paragraphs jsonb not null,
  version int not null default 1,
  generated_at timestamptz not null default now()
);

alter table portraits enable row level security;

create policy "Users can read own portrait" on portraits
  for select using (auth.uid() = user_id);
