ColorForm renders a person as an organic gradient blob (their "personal color") — Guli's replacement for profile photos.

```jsx
<ColorForm traits={['A', 'O']} size={88} seed={3} />
<ColorForm empty size={44} />  // assessment not completed
```

Traits: E honey / A peach / C teal / N violet / O sky. First trait dominates (65/35 blend). `seed` varies the blob path + rotation per user. Also exports `TRAITS` — the canonical trait metadata map (colors, Georgian names, pole labels, lucide icon names).
