import React from 'react';
import { TRAITS } from '../identity/ColorForm.jsx';
import { Chip } from '../core/Chip.jsx';

/**
 * InsightCard — bg-1 card with a 3px trait-color left rib, h3 title + body-sm.
 * Every insight is honesty-labeled: კვლევითი საფუძველი or სახალისო.
 */
export function InsightCard({ title, children, trait = 'O', label = 'კვლევითი საფუძველი', icon, style }) {
  const hex = (TRAITS[trait] || TRAITS.O).hex;
  return (
    <div
      style={{
        background: 'var(--bg-1)', borderRadius: 16,
        border: '1px solid var(--line-hairline)',
        borderLeft: `3px solid ${hex}`,
        padding: 20, display: 'flex', flexDirection: 'column', gap: 8,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h3 className="type-h3" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>{icon}{title}</h3>
      </div>
      <p className="type-body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>{children}</p>
      {label && <Chip style={{ alignSelf: 'flex-start', marginTop: 4 }}>{label}</Chip>}
    </div>
  );
}
