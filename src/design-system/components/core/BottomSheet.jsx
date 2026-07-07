import React from 'react';

/**
 * BottomSheet — bg-1, lg radius top corners, 36×4 grabber. Rendered inline
 * (absolutely positioned within the app frame) for prototyping.
 */
export function BottomSheet({ open = true, title, children, onClose, style }) {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(18,11,16,0.6)', backdropFilter: 'blur(2px)' }}></div>
      <div
        style={{
          position: 'relative',
          background: 'var(--bg-1)',
          borderRadius: '24px 24px 0 0',
          border: '1px solid var(--line-hairline)',
          borderBottom: 'none',
          padding: '8px 20px 32px',
          display: 'flex', flexDirection: 'column', gap: 16,
          ...style,
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 999, background: 'var(--grabber)', margin: '4px auto 0' }}></div>
        {title && <h3 className="type-h2" style={{ margin: '8px 0 0' }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}
