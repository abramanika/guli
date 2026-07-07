import React from 'react';
import { TRAITS } from '../identity/ColorForm.jsx';
import { Chip } from '../core/Chip.jsx';

/**
 * ArchetypeCard — portrait-format card: personal gradient background,
 * serif tagline, poetic Georgian archetype name, 3 trait chips.
 */
export function ArchetypeCard({ name, tagline, traits = ['E', 'A', 'O'], chips, compact = false, style }) {
  const [t1, t2] = traits;
  const c1 = (TRAITS[t1] || TRAITS.E).hex;
  const c2 = (TRAITS[t2] || TRAITS.A).hex;
  return (
    <div
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: 24, border: '1px solid var(--line-hairline)',
        background: 'var(--bg-1)',
        padding: compact ? 20 : '48px 24px 24px',
        display: 'flex', flexDirection: 'column',
        gap: compact ? 6 : 14,
        minHeight: compact ? 0 : 320,
        justifyContent: 'flex-end',
        ...style,
      }}
    >
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-30%', left: '-10%', width: '90%', height: '80%',
        borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
        background: `radial-gradient(closest-side at 40% 40%, ${c1}66, ${c2}22 70%, transparent)`,
        filter: 'blur(24px)',
      }}></div>
      <span className="type-caption" style={{ position: 'relative', color: 'var(--text-muted)' }}>შენი არქეტიპი</span>
      <h2 className={compact ? 'type-h3' : 'type-title'} style={{ position: 'relative', margin: 0 }}>{name}</h2>
      {tagline && (
        <p className="type-portrait" style={{ position: 'relative', margin: 0, color: 'var(--text-secondary)', fontSize: compact ? 15 : 18 }}>
          „{tagline}"
        </p>
      )}
      {chips && (
        <div style={{ position: 'relative', display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
          {chips.map((c, i) => <Chip key={c} trait={traits[i % traits.length]} active>{c}</Chip>)}
        </div>
      )}
    </div>
  );
}
