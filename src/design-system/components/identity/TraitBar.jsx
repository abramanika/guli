import React from 'react';
import { TRAITS } from './ColorForm.jsx';

/**
 * TraitBar — horizontal band showing where a person sits between two poles
 * of one dimension. Both poles are legitimate; the UI never scores a pole as better.
 */
export function TraitBar({ trait = 'E', value = 50, percentileLabel, secondValue, style }) {
  const t = TRAITS[trait] || TRAITS.E;
  const drop = (val, ring) => (
    <div
      key={ring ? 'ring' : 'drop'}
      style={{
        position: 'absolute',
        left: `${val}%`,
        top: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        width: 14,
        height: 14,
        borderRadius: '50% 50% 50% 4px',
        background: ring ? 'transparent' : t.hex,
        border: ring ? `2px solid ${t.hex}` : 'none',
        boxShadow: `0 0 12px ${t.hex}44`,
      }}
    ></div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="type-caption" style={{ color: 'var(--text-secondary)' }}>{t.poles[0]}</span>
        <span className="type-caption" style={{ color: 'var(--text-secondary)' }}>{t.poles[1]}</span>
      </div>
      <div style={{ position: 'relative', height: 14 }}>
        <div style={{ position: 'absolute', inset: '4px 0', borderRadius: 999, background: 'var(--bg-2)' }}></div>
        <div style={{ position: 'absolute', top: 4, bottom: 4, left: 0, width: `${value}%`, borderRadius: 999, background: `linear-gradient(90deg, transparent, ${t.hex}55 40%, ${t.hex})` }}></div>
        {drop(value, false)}
        {secondValue != null && drop(secondValue, true)}
      </div>
      {percentileLabel && (
        <span className="type-caption type-numeral" style={{ color: 'var(--text-muted)' }}>{percentileLabel}</span>
      )}
    </div>
  );
}
