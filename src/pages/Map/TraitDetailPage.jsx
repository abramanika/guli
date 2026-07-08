import React from 'react';
import PageTransition from '../../components/PageTransition.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Icon, TraitBar, InsightCard, TRAITS,
} from '../../design-system/index.js';
import { useTraitInsights } from '../../hooks/useTraitInsights.js';
import useResultsStore, { FALLBACK } from '../../stores/resultsStore.js';

export default function TraitDetailPage() {
  const navigate = useNavigate();
  const { traitId } = useParams();
  const trait = traitId && ['E', 'A', 'C', 'N', 'O'].includes(traitId.toUpperCase())
    ? traitId.toUpperCase()
    : 'E';

  const { scores } = useResultsStore();
  const displayScores = scores ?? FALLBACK.scores;

  const { intro, notes, circleText, loading } = useTraitInsights(trait);

  const t = TRAITS[trait];
  const value = displayScores[trait] ?? 50;

  return (
    <PageTransition>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
      {/* Gradient header */}
      <div style={{
        flex: 'none',
        padding: '0 0 16px',
        background: `linear-gradient(180deg, ${t.hex}2E, transparent)`,
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          padding: '12px 16px', gap: 8,
        }}>
          <span
            onClick={() => navigate('/map')}
            style={{ cursor: 'pointer', display: 'inline-flex', flex: 'none' }}
          >
            <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
          </span>
          <span className="type-h3" style={{ flex: 1, textAlign: 'center' }}>{t.poles[1]}</span>
          <span style={{ width: 22 }} />
        </div>

        {/* Trait bar */}
        <div style={{ padding: '4px 20px 0' }}>
          <TraitBar trait={trait} value={value} percentileLabel={`${value}%`} />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {loading ? (
          <>
            <div style={{ height: 80, borderRadius: 12, background: 'var(--bg-2)', animation: 'guli-pulse 1.6s ease-in-out infinite' }} />
            <div style={{ height: 120, borderRadius: 12, background: 'var(--bg-2)', animation: 'guli-pulse 1.6s ease-in-out infinite' }} />
            <div style={{ height: 120, borderRadius: 12, background: 'var(--bg-2)', animation: 'guli-pulse 1.6s ease-in-out infinite' }} />
          </>
        ) : (
          <>
            {/* Intro */}
            {intro && (
              <p className="type-body" style={{ margin: 0, color: 'var(--text-secondary)' }}>
                {intro}
              </p>
            )}

            {/* Insight cards */}
            {notes && notes.map((n) => (
              <InsightCard key={n.title} title={n.title} trait={trait} label={n.label}>
                {n.text}
              </InsightCard>
            ))}

            {/* Circle insight card */}
            {circleText && (
              <InsightCard
                title="ეს რას ნიშნავს შენს წრეში"
                trait={trait}
                label={null}
                icon={<Icon name="users" size={18} color={t.hex} />}
              >
                {circleText}
              </InsightCard>
            )}
          </>
        )}

        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          კვლევითი საფუძველი: ვალიდირებული ქართული პიროვნების კითხვარი
        </span>
      </div>
    </div>
    </PageTransition>
  );
}
