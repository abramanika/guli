import React from 'react';
import { Button } from '../core/Button.jsx';
import { ColorForm } from '../identity/ColorForm.jsx';

/**
 * EmptyState — one-line body + faint unfilled color-form + one primary action.
 * Empty states invite, never apologize.
 */
export function EmptyState({ text, actionLabel, onAction, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '40px 20px', textAlign: 'center', ...style }}>
      <ColorForm empty size={88} seed={2} />
      <p className="type-body" style={{ color: 'var(--text-secondary)', margin: 0, maxWidth: '28ch' }}>{text}</p>
      {actionLabel && <Button variant="primary" size="md" onClick={onAction}>{actionLabel}</Button>}
    </div>
  );
}
