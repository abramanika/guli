# Guli (გული) — Master Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready personality assessment app for Georgian users (40+, outside Tbilisi), turning the existing design-system prototype into a full-stack application with authentication, assessment engine, AI-generated insights, social comparison, and a mobile-ready web app.

**Architecture:** React SPA (Vite + Bun) frontend consuming a Supabase backend (auth, Postgres DB, Edge Functions, Realtime). The design system's 17 JSX components are already built — screens need to be converted from the prototype's `window.GuliKit` globals into proper React components with real data. AI content (portraits, insights, color names) generated via Claude API in Supabase Edge Functions.

**Tech Stack:**
- Frontend: React 19, Vite 8, React Router 7, Zustand (state), Bun
- Backend: Supabase (Auth, PostgreSQL, Edge Functions, Storage, Realtime)
- AI: Claude API (portrait generation, insight personalization, color naming)
- Mobile: Capacitor (iOS/Android wrapper when web app is stable)
- Testing: Vitest + Testing Library
- Deployment: Vercel (frontend) + Supabase (backend)

## Global Constraints

- Georgian (ქართული) is the canonical language; all UI strings in Georgian first
- Sentence case everywhere; Mtavruli (ᲓᲐᲘᲬᲧᲔ) only on ≤2-word buttons/labels
- Zero letter-spacing on Georgian text, ever
- No photos of people (identity = color-form blobs)
- No pure #000 or #FFF; no neon; no tech gradients; no emoji; no drop shadows
- No infinite scroll
- Dark theme is primary; light theme (ეტრატი) is secondary
- Saperavi (#A62A54) = action only; trait colors = meaning only; never mixed
- Informal singular შენ — never თქვენ in product UI
- Every insight labeled either კვლევითი საფუძველი (research-based) or სახალისო (just for fun)
- FiraGO for UI; Noto Serif Georgian only for literary portrait prose
- Minimum age: 16

---

## Phase Overview

| Phase | What it builds | Depends on |
|-------|---------------|------------|
| **1. Foundation** | Project structure, routing, Supabase setup, auth | — |
| **2. Assessment Engine** | Question bank, scoring algorithm, chapter flow | Phase 1 |
| **3. Results & AI** | Trait details, archetypes, portraits, color names | Phase 2 |
| **4. Social / Circle** | Friends, pair comparison, group maps, invitations | Phase 1 |
| **5. Daily & Settings** | Today screen, daily questions, settings, privacy | Phase 2 |
| **6. Polish & Deploy** | Motion, transitions, PWA, Capacitor, analytics | All |

Each phase has its own detailed plan document. Below is the breakdown.

---

## Phase 1: Foundation & Auth

**Plan file:** `docs/plans/phase-1-foundation.md`

### Task 1.1: Convert Design System Components to ES Modules

The 17 components currently live as standalone JSX files that register on `window.GuliDesignSystem_a2088d`. Convert each to a proper ES module with named exports.

**Files:**
- Modify: `src/design-system/components/core/Button.jsx`
- Modify: `src/design-system/components/core/Input.jsx`
- Modify: `src/design-system/components/core/Chip.jsx`
- Modify: `src/design-system/components/core/BottomSheet.jsx`
- Modify: `src/design-system/components/identity/ColorForm.jsx` (exports TRAITS + ColorForm)
- Modify: `src/design-system/components/identity/HeartMap.jsx`
- Modify: `src/design-system/components/identity/TraitBar.jsx`
- Modify: `src/design-system/components/assessment/LikertCard.jsx` (exports LIKERT_LABELS + LikertCard)
- Modify: `src/design-system/components/assessment/ProgressDrops.jsx`
- Modify: `src/design-system/components/assessment/ScenarioSlider.jsx`
- Modify: `src/design-system/components/assessment/ThisOrThatPair.jsx`
- Modify: `src/design-system/components/cards/ArchetypeCard.jsx`
- Modify: `src/design-system/components/cards/DailyQuestionCard.jsx`
- Modify: `src/design-system/components/cards/InsightCard.jsx`
- Modify: `src/design-system/components/navigation/Icon.jsx`
- Modify: `src/design-system/components/navigation/TabBar.jsx`
- Modify: `src/design-system/components/feedback/Toast.jsx` (exports Toast + Skeleton)
- Modify: `src/design-system/components/feedback/EmptyState.jsx`
- Create: `src/design-system/index.js` (barrel export)

### Task 1.2: App Shell & Routing

Set up React Router with the app's navigation structure: 4 main tabs (today/map/circle/me) + nested routes for onboarding, assessment, results, settings.

**Files:**
- Rewrite: `src/App.jsx`
- Create: `src/layouts/AppShell.jsx` — TabBar + safe area + route outlet
- Create: `src/layouts/OnboardingShell.jsx` — no tab bar, back navigation
- Create: `src/pages/Onboarding/SplashPage.jsx`
- Create: `src/pages/Onboarding/CarouselPage.jsx`
- Create: `src/pages/Onboarding/AuthPage.jsx`
- Create: `src/pages/Onboarding/NamePage.jsx`
- Create: `src/pages/Onboarding/BirthdayPage.jsx`
- Create: `src/pages/Onboarding/LanguagePage.jsx`
- Create: `src/pages/Onboarding/ConsentPage.jsx`
- Create: `src/pages/Today/TodayPage.jsx`
- Create: `src/pages/Map/MapPage.jsx`
- Create: `src/pages/Map/TraitDetailPage.jsx`
- Create: `src/pages/Map/ArchetypePage.jsx`
- Create: `src/pages/Map/PortraitPage.jsx`
- Create: `src/pages/Map/SharePage.jsx`
- Create: `src/pages/Assessment/ChapterHomePage.jsx`
- Create: `src/pages/Assessment/QuestionFlowPage.jsx`
- Create: `src/pages/Assessment/RevealPage.jsx`
- Create: `src/pages/Circle/CirclePage.jsx`
- Create: `src/pages/Circle/PairPage.jsx`
- Create: `src/pages/Circle/GroupPage.jsx`
- Create: `src/pages/Me/MePage.jsx`
- Create: `src/pages/Me/SettingsPage.jsx`

### Task 1.3: Supabase Setup & Auth

**Files:**
- Create: `supabase/config.toml`
- Create: `supabase/migrations/001_initial_schema.sql`
- Create: `src/lib/supabase.js` — Supabase client singleton
- Create: `src/lib/auth.js` — auth helpers (signInWithApple, signInWithGoogle, signInWithPhone, signOut)
- Create: `src/stores/authStore.js` — Zustand store for auth state
- Create: `src/hooks/useRequireAuth.js` — redirect to onboarding if not logged in

**Database schema (initial):**

```sql
-- Users
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

-- RLS: users can only read/update their own profile
```

### Task 1.4: Onboarding Flow with Real Auth

Wire up the 7 onboarding screens with real Supabase auth and profile creation. Flow: Splash → Carousel → Auth (Apple/Google/Phone) → Name → Birthday → Language → Consent → redirect to Assessment.

**Files:**
- Modify: all `src/pages/Onboarding/*.jsx`
- Create: `src/stores/onboardingStore.js` — temporary state for name/birthday/language before profile creation

---

## Phase 2: Assessment Engine

**Plan file:** `docs/plans/phase-2-assessment.md`

### Task 2.1: Question Bank Data Model

**Database tables:**

```sql
-- Questions
create table questions (
  id serial primary key,
  chapter int not null check (chapter between 1 and 7),
  trait char(1) not null check (trait in ('E', 'A', 'C', 'N', 'O')),
  kind text not null check (kind in ('likert', 'this_or_that', 'slider')),
  text_ka text not null,
  text_en text,
  text_ru text,
  -- For this_or_that
  option_a_ka text,
  option_b_ka text,
  -- For slider
  pole_left_ka text,
  pole_right_ka text,
  -- Scoring
  polarity int not null default 1 check (polarity in (1, -1)),
  weight numeric not null default 1.0,
  label text not null default 'research' check (label in ('research', 'fun')),
  sort_order int not null
);

-- Answers
create table answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  question_id int not null references questions(id),
  value int not null check (value between 0 and 100),
  answered_at timestamptz not null default now(),
  unique(user_id, question_id)
);

-- Chapter progress
create table chapter_progress (
  user_id uuid not null references profiles(id) on delete cascade,
  chapter int not null check (chapter between 1 and 7),
  state text not null default 'locked' check (state in ('locked', 'current', 'done')),
  completed_at timestamptz,
  primary key (user_id, chapter)
);
```

### Task 2.2: Seed Question Bank

Create ~60 Georgian-language Big Five questions across 7 chapters. Chapters 1-5 map to E/A/C/N/O respectively (research-based). Chapters 6-7 are fun/social.

**Files:**
- Create: `supabase/seed/questions.sql` — all ~60 questions with Georgian text

### Task 2.3: Scoring Algorithm

Big Five scoring: normalize answers per trait, compute percentile within Georgian population norms.

**Files:**
- Create: `supabase/functions/score-chapter/index.ts` — Edge Function
- Create: `src/lib/scoring.js` — client-side score computation for immediate display

**Database:**

```sql
-- Scores (updated after each chapter)
create table scores (
  user_id uuid not null references profiles(id) on delete cascade,
  trait char(1) not null check (trait in ('E', 'A', 'C', 'N', 'O')),
  value int not null check (value between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, trait)
);
```

### Task 2.4: Chapter Flow UI

Wire ChapterHomePage → QuestionFlowPage → RevealPage with real data.

**Files:**
- Modify: `src/pages/Assessment/ChapterHomePage.jsx`
- Modify: `src/pages/Assessment/QuestionFlowPage.jsx`
- Modify: `src/pages/Assessment/RevealPage.jsx`
- Create: `src/stores/assessmentStore.js` — Zustand store for chapter/question state
- Create: `src/hooks/useChapterProgress.js`
- Create: `src/hooks/useQuestions.js`

---

## Phase 3: Results & AI Content

**Plan file:** `docs/plans/phase-3-results.md`

### Task 3.1: Archetype Assignment

Map score patterns to one of ~12 Georgian archetypes. Pure algorithmic — no AI needed.

**Files:**
- Create: `src/lib/archetypes.js` — archetype definitions + assignment logic
- Create: `supabase/functions/assign-archetype/index.ts`

**Database:**

```sql
create table user_archetypes (
  user_id uuid primary key references profiles(id) on delete cascade,
  archetype_key text not null,
  name_ka text not null,
  tagline_ka text not null,
  chips jsonb not null default '[]',
  assigned_at timestamptz not null default now()
);
```

### Task 3.2: Color Name Algorithm

Map 5 trait scores → a poetic Georgian color name ("თბილი ცა", "ცეცხლის მარილი", etc.).

**Files:**
- Create: `src/lib/colorName.js` — deterministic algorithm: top-2 traits → base color noun + modifier adjective from curated Georgian word lists
- Create: `supabase/functions/generate-color-name/index.ts`

### Task 3.3: AI Portrait Generation

Generate the 5-paragraph literary personality portrait using Claude API.

**Files:**
- Create: `supabase/functions/generate-portrait/index.ts` — calls Claude with scores + archetype + Georgian literary prompt
- Create: `src/hooks/usePortrait.js`

**Database:**

```sql
create table portraits (
  user_id uuid primary key references profiles(id) on delete cascade,
  paragraphs jsonb not null,
  version int not null default 1,
  generated_at timestamptz not null default now()
);
```

### Task 3.4: Trait Insights Generation

Generate personalized insight cards per trait using Claude.

**Files:**
- Create: `supabase/functions/generate-insights/index.ts`

**Database:**

```sql
create table trait_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  trait char(1) not null,
  title text not null,
  body text not null,
  label text not null check (label in ('research', 'fun')),
  sort_order int not null,
  generated_at timestamptz not null default now()
);
```

### Task 3.5: Results Pages with Real Data

Wire MapPage, TraitDetailPage, ArchetypePage, PortraitPage, SharePage with live data.

**Files:**
- Modify: all `src/pages/Map/*.jsx`
- Create: `src/stores/resultsStore.js`
- Create: `src/hooks/useScores.js`
- Create: `src/hooks/useArchetype.js`

---

## Phase 4: Social / Circle

**Plan file:** `docs/plans/phase-4-circle.md`

### Task 4.1: Friend System

**Database:**

```sql
create table friendships (
  id uuid primary key default gen_random_uuid(),
  user_a uuid not null references profiles(id) on delete cascade,
  user_b uuid not null references profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'blocked')),
  created_at timestamptz not null default now(),
  unique(user_a, user_b)
);

create table invite_links (
  code text primary key,
  user_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz
);
```

### Task 4.2: Match % Algorithm

Compute pair compatibility: weighted cosine similarity of 5-trait score vectors, mapped to 0-100%.

**Files:**
- Create: `src/lib/matchScore.js`
- Create: `supabase/functions/compute-match/index.ts`

### Task 4.3: Invite Links & QR

Generate unique invite links (`guli.ge/w/<code>`) and QR codes.

**Files:**
- Create: `supabase/functions/create-invite/index.ts`
- Create: `src/lib/qr.js` — lightweight QR code generation (no fake CSS grid)
- Modify: `src/pages/Circle/CirclePage.jsx`

### Task 4.4: Pair & Group Comparison

Wire PairPage and GroupPage with live friend data.

**Files:**
- Modify: `src/pages/Circle/PairPage.jsx`
- Modify: `src/pages/Circle/GroupPage.jsx`
- Create: `src/stores/circleStore.js`
- Create: `src/hooks/useFriends.js`
- Create: `src/hooks/useGroupMap.js`

### Task 4.5: Consent Management

Circle visibility and group consent per the spec's privacy model.

**Files:**
- Create: `supabase/functions/update-visibility/index.ts`

**Database:**

```sql
create table group_consents (
  user_id uuid not null references profiles(id) on delete cascade,
  group_id uuid not null,
  show_name boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, group_id)
);
```

---

## Phase 5: Daily & Settings

**Plan file:** `docs/plans/phase-5-daily.md`

### Task 5.1: Daily Question System

Rotating daily question — one per day, user answers once.

**Database:**

```sql
create table daily_questions (
  id serial primary key,
  trait char(1) not null,
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
```

### Task 5.2: Today Page with Live Data

Wire TodayPage: daily question, rotating insights, portrait update notification.

### Task 5.3: Settings & Privacy

Wire SettingsPage: theme persistence, language change, notification toggle, terms, account deletion.

**Files:**
- Modify: `src/pages/Me/SettingsPage.jsx`
- Create: `supabase/functions/delete-account/index.ts` — GDPR-compliant full wipe
- Create: `supabase/functions/export-data/index.ts` — JSON export of all user data

### Task 5.4: Me Page with Live Data

Wire MePage: real profile data, visibility controls, data export/deletion.

---

## Phase 6: Polish & Deploy

**Plan file:** `docs/plans/phase-6-polish.md`

### Task 6.1: Motion & Transitions

- Screen transitions (240ms ease-in-out via React Router + CSS)
- Wine-diffusion reveal animation (600ms, reserved for chapter reveals only)
- Card spring physics (CSS spring via `transition-timing-function`)
- Skeleton loading states on all data-dependent screens
- `prefers-reduced-motion` → 300ms crossfades
- Haptics via Capacitor Haptics plugin (light tick on answer, success on chapter completion)

### Task 6.2: Share Image Generation

Real image export for share composer.

**Files:**
- Create: `src/lib/shareImage.js` — html2canvas to render share cards
- Create: `supabase/functions/generate-share-image/index.ts` — server-side fallback

### Task 6.3: PWA Setup

- Service worker for offline support
- App manifest
- Cache fonts locally (FiraGO + Noto Serif Georgian)
- Offline fallback page

### Task 6.4: Capacitor Wrapper

Wrap the web app for iOS/Android distribution.

**Files:**
- Create: `capacitor.config.ts`
- iOS/Android project scaffolding
- Native plugins: Haptics, Share, Push Notifications, Status Bar

### Task 6.5: i18n

Add English and Russian translations.

**Files:**
- Create: `src/i18n/ka.json` — Georgian strings (extract from hardcoded)
- Create: `src/i18n/en.json`
- Create: `src/i18n/ru.json`
- Create: `src/i18n/index.js` — simple `t()` function using Zustand locale

### Task 6.6: Analytics & Error Tracking

- PostHog or Plausible for privacy-first analytics
- Sentry for error tracking
- Key funnels: onboarding completion, chapter completion, circle invite acceptance

### Task 6.7: Legal Documents

- Terms of Service (Georgian)
- Privacy Policy (Georgian + English for EU compliance)
- Data processing agreement

---

## Execution Order

```
Phase 1 (Foundation) ──→ Phase 2 (Assessment) ──→ Phase 3 (Results/AI)
       │                                                     │
       └──→ Phase 4 (Circle) ─────────────────────→ Phase 5 (Daily)
                                                             │
                                                    Phase 6 (Polish)
```

**Recommended start:** Phase 1, then Phase 2 and Phase 4 can run in parallel since they share only the auth/profile foundation. Phase 3 depends on Phase 2 (needs scores). Phase 5 depends on Phase 2. Phase 6 is last.

---

## What's NOT in this plan (future roadmap)

- Custom icon set (replacing Lucide) — needs a graphic designer
- Logo / app icon design — needs a brand designer
- Color-form illustration assets — needs an illustrator
- Georgian population norm calibration — needs psychometric research data
- App Store submission — needs Apple Developer account + review
- Push notification infrastructure — needs APNs/FCM setup after Capacitor
- Admin dashboard for content management
- A/B testing framework
- Monetization strategy
