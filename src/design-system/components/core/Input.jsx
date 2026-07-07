import React, { useState } from 'react';

/**
 * Input — bg-2 fill, no border until focus (saperavi hairline), floating caption label.
 */
export function Input({ label, value, onChange, placeholder, error, big = false, type = 'text', style }) {
  const [focus, setFocus] = useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <span className="type-caption" style={{ color: error ? 'var(--error)' : focus ? 'var(--saperavi-tint)' : 'var(--text-muted)' }}>
          {label}
        </span>
      )}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          height: big ? 64 : 52,
          padding: '0 16px',
          borderRadius: 10,
          background: 'var(--bg-2)',
          color: 'var(--text-primary)',
          border: '1px solid ' + (error ? 'var(--error)' : focus ? 'var(--saperavi)' : 'transparent'),
          outline: 'none',
          font: big ? '600 28px/1 var(--font-ui)' : '400 16px/1 var(--font-ui)',
          letterSpacing: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
      ></input>
      {error && <span className="type-caption" style={{ color: 'var(--error)' }}>{error}</span>}
    </label>
  );
}
