import React from 'react';
import { TRAITS } from '../identity/ColorForm.jsx';

/**
 * DailyQuestionCard — the Today-tab hero: lg radius, faint color-form background,
 * „დღის კითხვა" eyebrow. Children = the inline answer control.
 */
export function DailyQuestionCard({ question, children, answered = false, countdown, traits = ['N', 'O'], style }) {
  const c1 = (TRAITS[traits[0]] || TRAITS.N).hex;
  const c2 = (TRAITS[traits[1]] || TRAITS.O).hex;
  if (answered) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px',
        background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)', ...style,
      }}>
        <span aria-hidden="true" style={{
          width: 18, height: 18, transform: 'rotate(45deg)', borderRadius: '50% 50% 50% 4px',
          background: 'var(--trait-c)', flex: 'none',
        }}></span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="type-body-sm">დღის კითხვას უპასუხე</span>
          {countdown && <span className="type-caption" style={{ color: 'var(--text-muted)' }}>{countdown}</span>}
        </div>
      </div>
    );
  }
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg-1)', borderRadius: 24, border: '1px solid var(--line-hairline)',
      padding: 24, display: 'flex', flexDirection: 'column', gap: 16, ...style,
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-40%', right: '-20%', width: '80%', height: '90%',
        borderRadius: '45% 55% 60% 40% / 55% 45% 55% 45%',
        background: `radial-gradient(closest-side, ${c1}33, ${c2}14 70%, transparent)`,
        filter: 'blur(20px)', opacity: 0.9,
      }}></div>
      <span className="type-caption" style={{ position: 'relative', color: 'var(--saperavi-tint)' }}>დღის კითხვა</span>
      <h2 className="type-h2" style={{ position: 'relative', margin: 0 }}>{question}</h2>
      <div style={{ position: 'relative' }}>{children}</div>
    </div>
  );
}
