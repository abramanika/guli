HeartMap draws the five-axis radar that is Guli's core artifact — hairline pentagon grid, personal-gradient fill at low opacity, trait-colored droplet vertices, Georgian axis labels (გულღია, გულთბილი, გულმოდგინე, გულმშვიდი, მაძიებელი).

```jsx
<HeartMap scores={{ E: 62, A: 81, C: 47, N: 58, O: 74 }} size={320} />
<HeartMap scores={me} secondScores={friend} />  // comparison overlay (dashed)
```

Give it a text alternative nearby for screen readers (spec §8).
