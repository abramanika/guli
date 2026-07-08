import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Icon, ColorForm, HeartMap, TraitBar, ArchetypeCard,
} from '../../design-system/index.js';
import useResultsStore, { FALLBACK } from '../../stores/resultsStore.js';
import useAuthStore from '../../stores/authStore.js';
import { generateColorName } from '../../lib/colorName.js';

export default function MapPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { scores, archetype, colorName, name, traits, loading, loadResults } = useResultsStore();

  useEffect(() => {
    loadResults(user?.id ?? null);
  }, [user?.id, loadResults]);

  // Resolved display values (fall back to FALLBACK while loading)
  const displayScores = scores ?? FALLBACK.scores;
  const displayArchetype = archetype ?? FALLBACK.archetype;
  const displayColorName = colorName ?? FALLBACK.colorName;
  const displayName = name ?? FALLBACK.name;
  const displayTraits = traits ?? FALLBACK.traits;

  // Derive top-2 traits from scores for ColorForm
  const topTraits = (() => {
    if (!displayScores) return displayTraits;
    const sorted = Object.entries(displayScores).sort(([, a], [, b]) => b - a);
    return [sorted[0][0], sorted[1][0]];
  })();

  // Count remaining chapters (chapters that are 'current' or 'locked')
  // We'll use a rough count based on the 7-chapter structure
  const remainingChapters = 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px', gap: 8,
        borderBottom: '1px solid var(--line-hairline)',
        flex: 'none',
      }}>
        <span className="type-h3" style={{ flex: 1 }}>რუკა</span>
        <span
          onClick={() => navigate('/map/share')}
          style={{ cursor: 'pointer', display: 'inline-flex' }}
        >
          <Icon name="share" size={20} color="var(--text-secondary)" />
        </span>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* Color blob + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '4px 0 0' }}>
          <ColorForm traits={topTraits} size={88} seed={0} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="type-title">{displayColorName}</span>
            <span className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>
              შენი ფერი · {displayName}
            </span>
          </div>
        </div>

        {/* Heart Map radar */}
        <HeartMap scores={displayScores} size={330} style={{ alignSelf: 'center', margin: '-6px 0' }} />

        {/* Trait bars card */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 16,
          padding: '16px 16px 20px',
          background: 'var(--bg-1)', borderRadius: 16,
          border: '1px solid var(--line-hairline)',
        }}>
          {['E', 'A', 'C', 'N', 'O'].map((k) => (
            <div
              key={k}
              onClick={() => navigate(`/map/trait/${k}`)}
              style={{ cursor: 'pointer' }}
            >
              <TraitBar trait={k} value={displayScores[k] ?? 50} />
            </div>
          ))}
        </div>

        {/* Archetype card (compact, clickable) */}
        <div onClick={() => navigate('/map/archetype')} style={{ cursor: 'pointer' }}>
          <ArchetypeCard
            compact
            name={displayArchetype.name}
            tagline={displayArchetype.tagline}
            traits={topTraits}
            chips={displayArchetype.chips}
          />
        </div>

        {/* Full portrait row */}
        <div
          onClick={() => navigate('/map/portrait')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            background: 'var(--bg-1)', borderRadius: 16,
            border: '1px solid var(--line-hairline)',
            cursor: 'pointer',
          }}
        >
          <span className="type-h3">სრული პორტრეტი</span>
          <Icon name="chevron-right" size={18} color="var(--text-muted)" />
        </div>

        {/* Chapters CTA */}
        <div
          onClick={() => navigate('/assessment/1')}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px',
            background: 'var(--bg-1)', borderRadius: 16,
            border: '1px solid var(--saperavi)',
            boxShadow: 'var(--glow-saperavi)',
            cursor: 'pointer',
          }}
        >
          <Icon name="book-open" size={20} color="var(--saperavi-tint)" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="type-h3">დარჩა {remainingChapters} თავი</span>
            <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
              რუკა ღრმავდება ყოველ თავთან
            </span>
          </div>
          <Icon name="chevron-right" size={18} color="var(--text-muted)" />
        </div>

        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          საფუძველი: ვალიდირებული ქართული პიროვნების კითხვარი
        </span>
      </div>
    </div>
  );
}
