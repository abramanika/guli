import React from 'react';
import { TRAITS } from '../identity/ColorForm.jsx';

/**
 * Chip — pill tag. Active state takes its trait's color at 16% fill + colored text.
 */
export function Chip({ children, active = false, trait, onClick, style }) {
  const hex = trait ? (TRAITS[trait] || {}).hex : '#A62A54';
  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '5px 12px', borderRadius: 999,
        font: '500 12px/18px var(--font-ui)',
        background: active ? `${hex}29` : 'var(--bg-2)',
        color: active ? hex : 'var(--text-secondary)',
        border: '1px solid ' + (active ? `${hex}55` : 'var(--line-hairline)'),
        cursor: onClick ? 'pointer' : 'default',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
