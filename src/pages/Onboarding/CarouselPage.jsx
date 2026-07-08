import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, HeartMap, ColorForm } from '../../design-system/index.js';

const CAROUSEL = [
  { title: 'აღმოაჩინე შენი გულის რუკა', kind: 'map' },
  { title: 'შეადარე შენს წრეს', kind: 'overlap' },
  { title: 'შენი პასუხები მხოლოდ შენია', kind: 'vessel' },
];

function Visual({ kind }) {
  if (kind === 'map') {
    return <HeartMap scores={{ E: 62, A: 81, C: 47, N: 58, O: 74 }} size={260} showLabels={false} />;
  }
  if (kind === 'overlap') {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ColorForm traits={['A', 'O']} size={120} seed={0} style={{ marginRight: -34, mixBlendMode: 'screen' }} />
        <ColorForm traits={['O', 'E']} size={120} seed={2} style={{ mixBlendMode: 'screen' }} />
      </div>
    );
  }
  return (
    <div style={{
      width: 180,
      height: 220,
      borderRadius: '42% 42% 46% 46% / 16% 16% 60% 60%',
      border: '1px solid rgba(255,255,255,0.25)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: 26,
      boxSizing: 'border-box',
    }}>
      <ColorForm traits={['N', 'A']} size={96} seed={4} />
    </div>
  );
}

export default function CarouselPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const c = CAROUSEL[page];

  const handleDone = () => navigate('/onboarding/auth');

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      background: 'var(--bg-0)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px', flex: 'none' }}>
        <span
          className="type-body-sm"
          style={{ color: 'var(--text-muted)', cursor: 'pointer' }}
          onClick={handleDone}
        >
          გამოტოვება
        </span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Visual kind={c.kind} />
      </div>

      <div style={{ flex: 'none', padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        <h1 className="type-title" style={{ margin: 0, textAlign: 'center', maxWidth: '14ch' }}>{c.title}</h1>

        <div style={{ display: 'flex', gap: 8 }}>
          {CAROUSEL.map((_, i) => (
            <span
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: i === page ? 20 : 6,
                height: 6,
                borderRadius: 999,
                background: i === page ? 'var(--saperavi-tint)' : 'var(--bg-2)',
                cursor: 'pointer',
                transition: 'width 240ms var(--ease-standard)',
              }}
            />
          ))}
        </div>

        {page < 2 ? (
          <Button variant="secondary" onClick={() => setPage(page + 1)} style={{ alignSelf: 'stretch' }}>
            შემდეგი
          </Button>
        ) : (
          <Button variant="primary" onClick={handleDone} style={{ alignSelf: 'stretch' }}>
            ᲓᲐᲘᲬᲧᲔ
          </Button>
        )}
      </div>
    </div>
  );
}
