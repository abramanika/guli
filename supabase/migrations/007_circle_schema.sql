-- Migration: 007_circle_schema
-- Description: Friend system and invite links for Circle feature

-- Friendships
create table friendships (
  id uuid primary key default gen_random_uuid(),
  user_a uuid not null references profiles(id) on delete cascade,
  user_b uuid not null references profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'blocked')),
  created_at timestamptz not null default now(),
  unique(user_a, user_b)
);

alter table friendships enable row level security;
-- Users can see friendships they're part of
create policy "Users see own friendships" on friendships
  for select using (auth.uid() = user_a or auth.uid() = user_b);
-- Users can insert friendships they initiate
create policy "Users create friendships" on friendships
  for insert with check (auth.uid() = user_a);
-- Users can update friendships they're part of (accept/block)
create policy "Users update own friendships" on friendships
  for update using (auth.uid() = user_a or auth.uid() = user_b);

create index idx_friendships_a on friendships(user_a);
create index idx_friendships_b on friendships(user_b);

-- Invite links
create table invite_links (
  code text primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);

alter table invite_links enable row level security;
create policy "Users read own invites" on invite_links
  for select using (auth.uid() = user_id);
create policy "Users create invites" on invite_links
  for insert with check (auth.uid() = user_id);
-- Anyone can read an invite by code (for accepting)
create policy "Anyone can look up invite" on invite_links
  for select using (true);
