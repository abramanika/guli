import React from 'react';
import { ColorForm } from '../identity/ColorForm.jsx';

/**
 * ThisOrThatPair — two large cards, each carrying a mini color-form. Tap = select.
 */
export function ThisOrThatPair({ optionA, optionB, traitsA = ['E', 'A'], traitsB = ['N', 'O'], selected = null, onSelect, stacked = false, style }) {
  const card = (label, traits, key) => {
    const sel = selected === key;
    return (
      <button
        key={key}
        onClick={() => onSelect && onSelect(key)}
        style={{
          flex: 1, minHeight: 156, boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between',
          padding: 20, textAlign: 'left',
          background: 'var(--bg-1)', borderRadius: 24,
          border: '1px solid ' + (sel ? 'var(--saperavi)' : 'var(--line-hairline)'),
          boxShadow: sel ? 'var(--glow-saperavi)' : 'none',
          color: 'var(--text-primary)',
          font: '500 17px/24px var(--font-ui)', letterSpacing: 0,
          cursor: 'pointer', transition: 'border-color 160ms, box-shadow 160ms',
        }}
      >
        <ColorForm traits={traits} size={36} seed={key === 'a' ? 1 : 4} style={{ opacity: sel ? 1 : 0.7 }} />
        <span>{label}</span>
      </button>
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: stacked ? 'column' : 'row', gap: 12, ...style }}>
      {card(optionA, traitsA, 'a')}
      {card(optionB, traitsB, 'b')}
    </div>
  );
}
