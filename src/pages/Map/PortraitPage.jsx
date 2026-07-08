import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, ColorForm, Skeleton } from '../../design-system/index.js';
import { usePortrait } from '../../hooks/usePortrait.js';
import useResultsStore, { FALLBACK } from '../../stores/resultsStore.js';

export default function PortraitPage() {
  const navigate = useNavigate();
  const { colorName, name, traits, scores } = useResultsStore();
  const { paragraphs, loading } = usePortrait();

  const displayColorName = colorName ?? FALLBACK.colorName;
  const displayName = name ?? FALLBACK.name;

  // Derive top-2 traits from scores for ColorForm
  const topTraits = (() => {
    if (!scores) return traits ?? FALLBACK.traits;
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return [sorted[0][0], sorted[1][0]];
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px', gap: 8,
        borderBottom: '1px solid var(--line-hairline)',
        flex: 'none',
      }}>
        <span
          onClick={() => navigate('/map')}
          style={{ cursor: 'pointer', display: 'inline-flex', flex: 'none' }}
        >
          <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
        </span>
        <span style={{ flex: 1 }} />
        <span style={{ width: 22 }} />
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '0 28px 32px',
        display: 'flex', flexDirection: 'column', gap: 0,
      }}>
        {/* Color blob centered */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 24px', opacity: 0.85 }}>
          <ColorForm traits={topTraits} size={72} seed={0} />
        </div>

        {/* Color name */}
        <h1 className="type-title" style={{ margin: '0 0 4px', textAlign: 'center' }}>
          {displayColorName}
        </h1>

        {/* Portrait label */}
        <span className="type-caption" style={{
          color: 'var(--text-muted)', textAlign: 'center',
          display: 'block', marginBottom: 28,
        }}>
          {displayName}ს პორტრეტი
        </span>

        {/* Portrait paragraphs or skeleton */}
        {loading ? (
          <>
            <Skeleton height={18} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton height={18} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton height={18} radius={6} width="85%" style={{ marginBottom: 22 }} />
            <Skeleton height={18} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton height={18} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton height={18} radius={6} width="70%" style={{ marginBottom: 22 }} />
            <Skeleton height={18} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton height={18} radius={6} width="90%" style={{ marginBottom: 22 }} />
          </>
        ) : paragraphs ? (
          paragraphs.map((para, i) => (
            <p
              key={i}
              className="type-portrait"
              style={{ margin: '0 0 22px', color: 'var(--text-primary)' }}
            >
              {para}
            </p>
          ))
        ) : (
          <p className="type-body" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
            პორტრეტი ჯერ მზად არ არის. დაასრულე კიდევ რამდენიმე თავი!
          </p>
        )}

        <span className="type-caption" style={{ color: 'var(--text-muted)', margin: '8px 0 20px' }}>
          კვლევითი საფუძველი · განახლდება ყოველ თავთან
        </span>

        <Button variant="ghost" size="md" onClick={() => navigate('/map/share')}>
          გაზიარება
        </Button>
      </div>
    </div>
  );
}
