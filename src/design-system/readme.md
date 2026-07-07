# Guli (გული) Design System

Guli renders who you are as a map and a color — then lets you compare maps with the people around your table. Not a social network, not a dating app: a self-insight instrument with a social comparison layer, built natively in Georgian (Tbilisi-first, 16–45, secondary locales en/ru).

**Source:** a single brand & product specification document ("GULI — Brand System & Product Design Specification v1.0") pasted by the user. No Figma, no codebase, no binary assets were provided — everything here is authored from that spec. The spec is authoritative; where it gives exact values (hex, px, line-heights) those are copied verbatim.

**Core metaphors:** Saperavi (the Georgian grape "that colors" — the dark wine-toned base world) and მინანქარი / minankari (cloisonné enamel — the five luminous trait colors). One signature theatrical element: the **wine-diffusion reveal** (600ms color diffusing into dark). Everything else stays quiet, precise, editorial.

**Hard guardrails:** no photos of people (identity = color-form, never a face), no pure #000/#FFF, no neon, no tech gradients, no emoji, no drop shadows, no horoscope tone, no infinite scroll.

---

## CONTENT FUNDAMENTALS

- **Language:** Georgian is canonical; design with Georgian strings (they run ~15–25% longer than English). English/Russian secondary.
- **Register:** warm, precise, literary, unhurried, honest. Results read like a short literary portrait, never a lab report, never a fortune.
- **Person:** always informal singular **შენ** — never თქვენ in product UI.
- **Casing:** sentence case everywhere (Georgian is unicameral). Mtavruli (ᲓᲐᲘᲬᲧᲔ) only on ≤2-word buttons/labels.
- **Punctuation:** short sentences. No exclamation marks in results; exactly one allowed in celebrations. Georgian quotes „…".
- **Emoji:** never.
- **Honesty labeling:** every insight is marked either **კვლევითი საფუძველი** (research-based) or **სახალისო** (just for fun). Never blurred.
- **Errors/empty states:** plain statement + fix, never apologetic. Empty states invite: „შენი წრე ჯერ ცარიელია. მოიწვიე პირველი მეგობარი."
- **Register examples:**
  - Good: „ხალხთან ყოფნა გმუხტავს, მაგრამ დღეში ერთი მშვიდი საათი შენთვის აუცილებელია."
  - Never: „შენ დღეს კოსმიური ენერგია გელოდება! ✨"
  - Archetype tagline: „შენ ის ხარ, ვინც სუფრას ერთი კითხვით ცვლის."
- **Framing rule:** both poles of every trait are legitimate — გულჩათხრობილი is depth, not deficiency.

## VISUAL FOUNDATIONS

- **Color:** dark-first. Base world #120B10 → #1C1218 → #271A22 (elevation by surface step). Saperavi #A62A54 = action, always; the five trait colors = meaning, always; the two are never mixed. Text #F5EDF1 / #BCA9B4 / #8A7883. Hairlines are white @ 8%. Light theme (ეტრატი #FAF5F2) exists but is secondary.
- **Type:** FiraGO for UI (Regular/Medium/SemiBold), Noto Serif Georgian *only* for literary portrait prose. Scale 34/28/22/17/16/14/12 with generous Georgian leading (body 16/25; portrait 18/30). **Zero letter-spacing on Georgian, ever**; Latin captions may take +2%. Max ~34 Georgian chars per line. Tabular numerals for scores.
- **Spacing:** 4pt grid; screen margin 20; card padding 20; card gap 12. Radii sm 10 / md 16 / lg 24 / pill. Controls 52 (lg) and 44 (md). Tab bar 56, top bar 52.
- **Elevation & shadows:** NO drop shadows. Elevation = surface step + hairline border; active/selected elements only get an outer glow of their trait color at 12% opacity, 24px blur.
- **Backgrounds & imagery:** flat bg/0; no photography of people anywhere. Illustration = "color-forms": soft organic gradient blobs of trait colors, occasionally crossed by a 1px hairline ("cloisonné wire"). Grain 3–5% on hero surfaces only.
- **Motion:** signature wine-diffusion (600ms ease-out) reserved for reveals only — never a loader. Screen transitions 240ms ease-in-out; cards soft spring; reduced-motion → 300ms crossfades. Haptics: light tick on answer, success on chapter completion, nothing else.
- **States:** pressed = deep color + scale 0.98; disabled = 40% opacity; selected = trait hairline + glow; loading = skeleton shimmer (1.6s, 6% white) or droplet spinner in buttons.
- **Cards:** bg/1, 1px hairline, radius 16 (24 for hero/sheets), padding 20. Insight cards take a 3px trait-color left rib.
- **Transparency/blur:** scrims only (sheet backdrop); no glassmorphism.
- **Avatars:** always color-forms (28/44/88), organic blobs, never circles, never photos.

## ICONOGRAPHY

- The spec defines a **custom 24×24 set, 1.75px rounded stroke, rounded joins** (motifs: vessel, drop, layered rings, table, thread). **No icon assets were provided**, so this system substitutes **Lucide** (CDN, matching stroke/rounding) via the `Icon` component — a flagged substitution to replace when the custom set exists.
- Canonical assignments — tabs: დღეს=sun, რუკა=map, წრე=users, მე=circle-user. Trait glyphs (always paired with the trait color for accessibility): E=sun-medium, A=blend, C=layers, N=waves, O=sunrise.
- The **droplet** (a rotated rounded square, drawn in CSS) is the house glyph: progress drops, slider thumbs, markers, check-drops, active tab dot.
- No emoji, no unicode-as-icon (except ✓/✗ in internal guideline cards).
- **No logo asset exists.** The wordmark is rendered in plain type (გული / GULI). The spec's გ-vessel symbol and app icon have NOT been drawn — waiting on real logo files.

## Intentional additions

- `Icon` (Lucide wrapper) — the spec's custom icon set doesn't exist yet.
- `HeartMap` — the spec describes the radar in prose; componentized because it is the core artifact.
- `TRAITS` / `LIKERT_LABELS` exports — canonical content constants so consumers never re-type Georgian strings.

## Index

- `styles.css` → `tokens/` — `colors.css` (base, brand, trait, semantic, light theme), `typography.css` (faces, scale, Georgian rules), `spacing.css` (grid, radii, motion), `fonts.css` (FiraGO via @fontsource CDN + Noto Serif Georgian).
- `guidelines/` — specimen cards: colors (base/saperavi/traits/semantic/personal/light), type (scale/serif/Georgian law), spacing (tokens/elevation), brand (wordmark/voice/diffusion).
- `components/`
  - `core/` — **Button, Chip, Input, BottomSheet**
  - `identity/` — **ColorForm** (+ `TRAITS`), **TraitBar, HeartMap**
  - `assessment/` — **LikertCard** (+ `LIKERT_LABELS`), **ThisOrThatPair, ScenarioSlider, ProgressDrops**
  - `cards/` — **InsightCard, ArchetypeCard, DailyQuestionCard**
  - `navigation/` — **TabBar, Icon**
  - `feedback/` — **Toast, Skeleton, EmptyState**
- `ui_kits/app/` — complete interactive showcase: all 22 spec screens (onboarding chain, chapter home + 3 question formats + diffusion reveal, Heart Map, trait deep-dives, archetype, full portrait, share composer, circle/pair/group map, Today, Me, settings) with a screen navigator, dark/light + motion tweaks.
- `SKILL.md` — agent skill entry point.

## Caveats

- **FiraGO loads from CDN**, not local files — real FiraGO binaries via the OFL-licensed `@fontsource/firago` jsDelivr package (georgian + latin subsets, 400/500/600). Offline use needs the files copied locally; italic weights aren't wired.
- No logo/app icon/custom icons/illustrations were provided; see ICONOGRAPHY.
- The 5 trait scores → personal color name generation ("თბილი ცა") is represented with hand-picked samples, not an algorithm.
