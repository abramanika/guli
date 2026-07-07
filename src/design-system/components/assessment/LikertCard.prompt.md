LikertCard is the tappable answer card; stack the exported LIKERT_LABELS set of 5 with 8px gap.

```jsx
{LIKERT_LABELS.map((l, i) => (
  <LikertCard key={l} label={l} trait="E" selected={i === sel} onClick={() => setSel(i)} />
))}
```
