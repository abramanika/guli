import React, { useState } from 'react';

const VARIANTS = {
  primary: { background: 'var(--saperavi)', color: '#F5EDF1', border: 'none' },
  secondary: { background: 'var(--bg-2)', color: 'var(--text-primary)', border: '1px solid var(--line-hairline)' },
  ghost: { background: 'transparent', color: 'var(--saperavi-tint)', border: 'none' },
  destructive: { background: '#FF5470', color: '#F5EDF1', border: 'none' },
};

/**
 * Button — pill radius, flexible width (Georgian strings never truncate).
 * Pressed = deep color + scale 0.98. Loading = droplet spinner replaces label.
 */
export function Button({ variant = 'primary', size = 'lg', disabled = false, loading = false, children, onClick, style }) {
  const [pressed, setPressed] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const pressedBg = variant === 'primary' ? 'var(--saperavi-deep)' : variant === 'secondary' ? 'var(--bg-1)' : v.background;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        height: size === 'lg' ? 52 : 44,
        padding: '0 24px',
        borderRadius: 999,
        font: '500 16px/1 var(--font-ui)',
        letterSpacing: 0,
        whiteSpace: 'nowrap',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
        transition: 'transform 120ms var(--ease-standard), background 120ms',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        ...v,
        background: pressed && !disabled ? pressedBg : v.background,
        ...style,
      }}
    >
      {loading ? (
        <span
          aria-label="იტვირთება"
          style={{
            width: 16, height: 16, borderRadius: '50% 50% 50% 4px',
            border: '2px solid currentColor', borderTopColor: 'transparent',
            transform: 'rotate(45deg)', animation: 'guli-spin 0.9s linear infinite', display: 'inline-block',
          }}
        ></span>
      ) : (
        children
      )}
      <style>{'@keyframes guli-spin { to { transform: rotate(405deg); } }'}</style>
    </button>
  );
}
