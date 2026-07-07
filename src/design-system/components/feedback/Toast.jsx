import React from 'react';

/**
 * Toast — bottom-floating pill, bg-2, caption text, icon left. Auto-dismiss 2.4s (caller-managed).
 */
export function Toast({ children, icon, floating = false, style }) {
  return (
    <div
      role="status"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 16px', borderRadius: 999,
        background: 'var(--bg-2)',
        border: '1px solid var(--line-hairline)',
        font: '500 12px/18px var(--font-ui)',
        color: 'var(--text-primary)',
        ...(floating ? { position: 'fixed', bottom: 76, left: '50%', transform: 'translateX(-50%)', zIndex: 60 } : {}),
        ...style,
      }}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}

/**
 * Skeleton — bg-2 shape with slow 1.6s shimmer at 6% white. Never used for reveals.
 */
export function Skeleton({ width = '100%', height = 16, radius = 10, style }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width, height, borderRadius: radius,
        background: 'var(--bg-2)',
        position: 'relative', overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
        animation: 'guli-shimmer 1.6s ease-in-out infinite',
      }}></div>
      <style>{'@keyframes guli-shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }'}</style>
    </div>
  );
}
