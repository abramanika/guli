import React from 'react';
import { Icon } from './Icon.jsx';

const DEFAULT_ITEMS = [
  { key: 'today', label: 'დღეს', icon: 'sun' },
  { key: 'map', label: 'რუკა', icon: 'map' },
  { key: 'circle', label: 'წრე', icon: 'users' },
  { key: 'me', label: 'მე', icon: 'circle-user' },
];

/**
 * TabBar — 4 items, 24px icons + 11px captions; active item is saperavi-tint
 * with a 6px droplet indicator above.
 */
export function TabBar({ items = DEFAULT_ITEMS, active = 'today', onChange, style }) {
  return (
    <nav
      style={{
        height: 56, display: 'flex', alignItems: 'stretch',
        background: 'var(--bg-1)', borderTop: '1px solid var(--line-hairline)',
        ...style,
      }}
    >
      {items.map((it) => {
        const on = it.key === active;
        const color = on ? 'var(--saperavi-tint)' : 'var(--text-muted)';
        return (
          <button
            key={it.key}
            onClick={() => onChange && onChange(it.key)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 2, background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: 0,
            }}
          >
            <span style={{
              position: 'absolute', top: 4, width: 6, height: 6, transform: 'rotate(45deg)',
              borderRadius: '50% 50% 50% 2px', background: on ? 'var(--saperavi-tint)' : 'transparent',
            }}></span>
            <Icon name={it.icon} size={24} color={color} />
            <span style={{ font: '500 11px/14px var(--font-ui)', color, letterSpacing: 0 }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
