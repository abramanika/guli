-- Migration: 009_daily_questions
-- Description: Create tables for daily personality questions and user answers

create table daily_questions (
  id serial primary key,
  trait char(1) not null check (trait in ('E', 'A', 'C', 'N', 'O')),
  text_ka text not null,
  pole_left_ka text not null,
  pole_right_ka text not null,
  scheduled_date date unique
);

create table daily_answers (
  user_id uuid not null references profiles(id) on delete cascade,
  question_id int not null references daily_questions(id),
  value int not null check (value between 0 and 100),
  answered_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

alter table daily_questions enable row level security;
alter table daily_answers enable row level security;

create policy "Authenticated read daily_questions" on daily_questions
  for select to authenticated using (true);
create policy "Users manage own daily_answers" on daily_answers
  for all using (auth.uid() = user_id);
