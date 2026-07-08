import React, { useState, useEffect } from 'react';
import PageTransition from '../../components/PageTransition.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TraitBar, TRAITS } from '../../design-system/index.js';
import useAssessmentStore from '../../stores/assessmentStore.js';

export default function RevealPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { chapterScore, chapters, getTraitText } = useAssessmentStore();

  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Determine trait and score
  const chapter = chapters.find((c) => c.n === Number(chapterId));
  const trait = chapterScore?.trait || chapter?.trait || 'E';
  const score = chapterScore?.value ?? 50;
  const hex = (TRAITS[trait] || TRAITS.E).hex;
  const traitText = getTraitText(trait);

  return (
    <PageTransition>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100dvh',
      background: 'var(--bg-0)',
      gap: 24,
      padding: 28,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Wine-diffusion blob animation */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 340,
          height: 340,
          top: '6%',
          borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
          background: `radial-gradient(closest-side, ${hex}80, ${hex}14 70%, transparent)`,
          filter: shown ? 'blur(30px)' : 'blur(80px)',
          transform: shown ? 'scale(1)' : 'scale(0.1)',
          opacity: shown ? 1 : 0,
          transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        alignItems: 'center',
        opacity: shown ? 1 : 0,
        transition: 'opacity 500ms 300ms',
      }}>
        <TraitBar trait={trait} value={score} style={{ width: '100%' }} />

        <p
          className="type-portrait"
          style={{ margin: 0, textAlign: 'center', maxWidth: '26ch' }}
        >
          {traitText}
        </p>

        <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
          თავი დასრულდა
        </span>

        <Button
          variant="primary"
          onClick={() => navigate('/map')}
          style={{ alignSelf: 'stretch' }}
        >
          გაგრძელება
        </Button>

        <Button
          variant="ghost"
          size="md"
          onClick={() => navigate('/map/share')}
        >
          გაზიარება
        </Button>
      </div>
    </div>
    </PageTransition>
  );
}
