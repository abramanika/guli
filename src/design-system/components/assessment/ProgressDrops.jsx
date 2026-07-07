import React from 'react';
import { TRAITS } from '../identity/ColorForm.jsx';

const CHAPTER_TRAITS = ['E', 'A', 'C', 'N', 'O', 'E', 'A'];

/**
 * ProgressDrops — chapters as a row of drops; filled drops take their chapter's
 * trait color, the current drop pulses gently.
 */
export function ProgressDrops({ total = 7, done = 0, current = null, traits, size = 12, style }) {
  const ts = traits || CHAPTER_TRAITS;
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', ...style }}>
      {Array.from({ length: total }).map((_, i) => {
        const hex = (TRAITS[ts[i % ts.length]] || TRAITS.E).hex;
        const filled = i < done;
        const isCurrent = current != null ? i === current : i === done;
        return (
          <span
            key={i}
            style={{
              width: size, height: size, transform: 'rotate(45deg)',
              borderRadius: '50% 50% 50% 3px',
              background: filled ? hex : isCurrent ? `${hex}66` : 'var(--bg-2)',
              border: filled || isCurrent ? 'none' : '1px solid var(--line-hairline)',
              boxShadow: filled ? `0 0 8px ${hex}44` : 'none',
              animation: isCurrent ? 'guli-pulse 1.8s ease-in-out infinite' : 'none',
            }}
          ></span>
        );
      })}
      <style>{'@keyframes guli-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }'}</style>
    </div>
  );
}
