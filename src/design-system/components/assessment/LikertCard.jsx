import React from 'react';
import { TRAITS } from '../identity/ColorForm.jsx';

/**
 * LikertCard — the core input of the product. Full-width tappable answer card.
 * Selected: hairline takes the chapter's trait color + 12% glow + check-drop.
 */
export function LikertCard({ label, selected = false, trait = 'E', onClick, style }) {
  const hex = (TRAITS[trait] || TRAITS.E).hex;
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', minHeight: 64, boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        padding: '0 20px', textAlign: 'left',
        background: 'var(--bg-1)', borderRadius: 16,
        border: '1px solid ' + (selected ? hex : 'var(--line-hairline)'),
        boxShadow: selected ? `0 0 24px ${hex}1F` : 'none',
        color: 'var(--text-primary)',
        font: '400 16px/25px var(--font-ui)', letterSpacing: 0,
        cursor: 'pointer',
        transition: 'border-color 160ms, box-shadow 160ms',
        ...style,
      }}
    >
      <span>{label}</span>
      {selected && (
        <span aria-hidden="true" style={{
          width: 18, height: 18, flex: 'none', transform: 'rotate(45deg)',
          borderRadius: '50% 50% 50% 4px', background: hex,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" style={{ transform: 'rotate(-45deg)' }}>
            <path d="M2 5.2 4.2 7.4 8 3" fill="none" stroke="#120B10" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
      )}
    </button>
  );
}

/** The canonical 5-point Likert answer set. */
export const LIKERT_LABELS = ['სრულიად არა', 'უფრო არა', 'შუაში', 'უფრო კი', 'სრულიად კი'];
