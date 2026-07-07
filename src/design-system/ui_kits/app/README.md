# Guli app UI kit — complete showcase

Interactive recreation of the full Guli iOS app (390×844, dark-first) covering all 22 screens from the brand spec (§5–6). No production codebase existed, so screens follow the spec verbatim.

Open `index.html`: left rail navigates every screen (or ←/→ keys); the phone itself is fully click-through — onboarding chain, chapter assessment (Likert → this-or-that → slider → wine-diffusion reveal), Heart Map → trait deep-dives / archetype / full portrait / share composer, Circle → pair comparison / group map / add-friend sheet, Me → settings & delete-data sheet. Tweaks: dark/light theme, full/reduced motion.

Files:
- `index.html` — showcase shell: navigator, routes, scaling, tweaks, localStorage position.
- `shared.jsx` — sample data (ME, FRIENDS, CHAPTERS, TRAIT_DETAILS, PORTRAIT, GROUP) + TopBar/Scroll/Row/Screen chrome.
- `Onboarding.jsx` — splash, value carousel ×3, auth, name, birthday, language, consent.
- `TodayMap.jsx` — Today + Heart Map.
- `Assessment.jsx` — chapter home (შენი წიგნი), 3 question formats, chapter reveal, Me.
- `Results.jsx` — trait deep-dive, archetype, full portrait, share composer.
- `Circle.jsx` — circle list, add-friend sheet, pair comparison (თანხვედრა), group map, first-open trust sheet.
- `MeExtra.jsx` — settings & privacy.
- `tweaks-panel.jsx` — tweaks shell (starter component).

All primitives come from `window.GuliDesignSystem_a2088d` (the compiled bundle) — nothing re-implemented.
