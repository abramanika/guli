-- Migration: 008_group_consents
-- Description: Groups, group members, and consent management for Circle feature

-- Groups
create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_by uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table groups enable row level security;

-- Users see groups they belong to (via group_members)
create policy "Users see own groups" on groups
  for select using (
    exists (
      select 1 from group_members
      where group_members.group_id = groups.id
        and group_members.user_id = auth.uid()
    )
  );

-- Group creators can insert groups
create policy "Users create groups" on groups
  for insert with check (auth.uid() = created_by);

-- Group creators can update their groups
create policy "Creators update groups" on groups
  for update using (auth.uid() = created_by);

-- Group creators can delete their groups
create policy "Creators delete groups" on groups
  for delete using (auth.uid() = created_by);

-- Group members
create table group_members (
  group_id uuid not null references groups(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  primary key (group_id, user_id)
);

alter table group_members enable row level security;

-- Users see memberships for groups they belong to
create policy "Users see group memberships" on group_members
  for select using (
    user_id = auth.uid()
    or exists (
      select 1 from group_members gm2
      where gm2.group_id = group_members.group_id
        and gm2.user_id = auth.uid()
    )
  );

-- Group creators can add members (checked via groups table)
create policy "Group creators add members" on group_members
  for insert with check (
    exists (
      select 1 from groups
      where groups.id = group_id
        and groups.created_by = auth.uid()
    )
  );

-- Group creators can remove members
create policy "Group creators remove members" on group_members
  for delete using (
    user_id = auth.uid()
    or exists (
      select 1 from groups
      where groups.id = group_id
        and groups.created_by = auth.uid()
    )
  );

-- Group consents: per-user visibility settings within a group
create table group_consents (
  user_id uuid not null references profiles(id) on delete cascade,
  group_id uuid not null references groups(id) on delete cascade,
  show_name boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, group_id)
);

alter table group_consents enable row level security;

-- Users see consents for groups they belong to
create policy "Users see group consents" on group_consents
  for select using (
    exists (
      select 1 from group_members
      where group_members.group_id = group_consents.group_id
        and group_members.user_id = auth.uid()
    )
  );

-- Users manage their own consent
create policy "Users manage own consent" on group_consents
  for insert with check (auth.uid() = user_id);

create policy "Users update own consent" on group_consents
  for update using (auth.uid() = user_id);

create policy "Users delete own consent" on group_consents
  for delete using (auth.uid() = user_id);

-- Indexes
create index idx_group_members_group on group_members(group_id);
create index idx_group_members_user on group_members(user_id);
create index idx_group_consents_group on group_consents(group_id);
create index idx_group_consents_user on group_consents(user_id);
