-- Migration: 002_assessment_schema
-- Description: Create assessment engine tables (questions, answers, chapter_progress, scores)

-- ============================================================
-- Questions
-- ============================================================
create table questions (
  id serial primary key,
  chapter int not null check (chapter between 1 and 7),
  trait char(1) not null check (trait in ('E', 'A', 'C', 'N', 'O')),
  kind text not null check (kind in ('likert', 'this_or_that', 'slider')),
  text_ka text not null,
  text_en text,
  text_ru text,
  option_a_ka text,  -- for this_or_that
  option_b_ka text,  -- for this_or_that
  pole_left_ka text,  -- for slider
  pole_right_ka text, -- for slider
  polarity int not null default 1 check (polarity in (1, -1)),
  weight numeric not null default 1.0,
  label text not null default 'research' check (label in ('research', 'fun')),
  sort_order int not null
);

-- ============================================================
-- Answers
-- ============================================================
create table answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  question_id int not null references questions(id),
  value int not null check (value between 0 and 100),
  answered_at timestamptz not null default now(),
  unique(user_id, question_id)
);

-- ============================================================
-- Chapter Progress
-- ============================================================
create table chapter_progress (
  user_id uuid not null references profiles(id) on delete cascade,
  chapter int not null check (chapter between 1 and 7),
  state text not null default 'locked' check (state in ('locked', 'current', 'done')),
  completed_at timestamptz,
  primary key (user_id, chapter)
);

-- ============================================================
-- Scores
-- ============================================================
create table scores (
  user_id uuid not null references profiles(id) on delete cascade,
  trait char(1) not null check (trait in ('E', 'A', 'C', 'N', 'O')),
  value int not null check (value between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, trait)
);

-- ============================================================
-- Indexes
-- ============================================================
create index answers_user_id_idx on answers(user_id);
create index chapter_progress_user_id_idx on chapter_progress(user_id);
create index questions_chapter_idx on questions(chapter);

-- ============================================================
-- Row Level Security
-- ============================================================

-- questions: all authenticated users can read
alter table questions enable row level security;

create policy "questions: select authenticated"
  on questions for select
  to authenticated
  using (true);

-- answers: users can only access their own
alter table answers enable row level security;

create policy "answers: select own"
  on answers for select
  using (auth.uid() = user_id);

create policy "answers: insert own"
  on answers for insert
  with check (auth.uid() = user_id);

create policy "answers: update own"
  on answers for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- chapter_progress: users can only access their own
alter table chapter_progress enable row level security;

create policy "chapter_progress: select own"
  on chapter_progress for select
  using (auth.uid() = user_id);

create policy "chapter_progress: insert own"
  on chapter_progress for insert
  with check (auth.uid() = user_id);

create policy "chapter_progress: update own"
  on chapter_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- scores: users can only read their own; writes via service role
alter table scores enable row level security;

create policy "scores: select own"
  on scores for select
  using (auth.uid() = user_id);
