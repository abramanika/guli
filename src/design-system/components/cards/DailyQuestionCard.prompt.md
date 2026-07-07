DailyQuestionCard is the retention hero on the Today tab — eyebrow „დღის კითხვა", question in h2, answer control inline; `answered` collapses it to a check row.

```jsx
<DailyQuestionCard question="გეგმა მირჩევნია იმპროვიზაციას.">
  <ScenarioSlider poleLeft="სრულიად არა" poleRight="სრულიად კი" value={v} onChange={setV} trait="C" />
</DailyQuestionCard>
```
