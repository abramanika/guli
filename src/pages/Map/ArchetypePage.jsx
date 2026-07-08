import React from 'react';
import PageTransition from '../../components/PageTransition.jsx';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, ArchetypeCard } from '../../design-system/index.js';
import useResultsStore, { FALLBACK } from '../../stores/resultsStore.js';

export default function ArchetypePage() {
  const navigate = useNavigate();
  const { scores, archetype, traits } = useResultsStore();

  const displayArchetype = archetype ?? FALLBACK.archetype;
  const displayTraits = traits ?? FALLBACK.traits;

  // Derive top-2 traits from scores for gradient
  const topTraits = (() => {
    if (!scores) return displayTraits;
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return [sorted[0][0], sorted[1][0]];
  })();

  return (
    <PageTransition>
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%', padding: 20, gap: 16,
      background: 'var(--bg-0)',
    }}>
      {/* Back button */}
      <span
        onClick={() => navigate('/map')}
        style={{ cursor: 'pointer', display: 'inline-flex', flex: 'none' }}
      >
        <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
      </span>

      {/* Full archetype card */}
      <ArchetypeCard
        name={displayArchetype.name}
        tagline={displayArchetype.tagline}
        traits={topTraits}
        chips={displayArchetype.chips}
        style={{ flex: 1 }}
      />

      {/* Share button */}
      <Button variant="ghost" size="md" onClick={() => navigate('/map/share')}>
        გაზიარება
      </Button>
    </div>
    </PageTransition>
  );
}
