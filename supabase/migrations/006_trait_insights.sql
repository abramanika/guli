-- Migration: 006_trait_insights
-- Description: Create tables for AI-generated per-trait insight cards and summaries

create table trait_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  trait char(1) not null check (trait in ('E', 'A', 'C', 'N', 'O')),
  title text not null,
  body text not null,
  label text not null check (label in ('research', 'fun')),
  sort_order int not null,
  generated_at timestamptz not null default now()
);

alter table trait_insights enable row level security;
create policy "Users can read own insights" on trait_insights
  for select using (auth.uid() = user_id);

create index idx_trait_insights_user on trait_insights(user_id, trait);

create table trait_summaries (
  user_id uuid not null references profiles(id) on delete cascade,
  trait char(1) not null check (trait in ('E', 'A', 'C', 'N', 'O')),
  intro text not null,
  circle_text text not null,
  generated_at timestamptz not null default now(),
  primary key (user_id, trait)
);

alter table trait_summaries enable row level security;
create policy "Users can read own summaries" on trait_summaries
  for select using (auth.uid() = user_id);
