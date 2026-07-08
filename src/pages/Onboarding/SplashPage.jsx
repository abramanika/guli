import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Wordmark({ size = 56 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{ font: `600 ${size}px/1.1 var(--font-ui)`, color: 'var(--text-primary)' }}>გული</span>
      <span style={{ font: '600 12px/1 var(--font-ui)', letterSpacing: '0.02em', color: 'var(--text-muted)' }}>GULI</span>
    </div>
  );
}

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/onboarding/carousel'), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      background: 'var(--bg-0)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
        background: 'radial-gradient(closest-side, rgba(166,42,84,0.4), rgba(110,27,56,0.1) 70%, transparent)',
        filter: 'blur(30px)',
      }} />
      <div style={{ position: 'relative' }}>
        <Wordmark />
      </div>
      <span className="type-caption" style={{ position: 'absolute', bottom: 48, color: 'var(--text-muted)' }}>
        გაიცანი შენი გული
      </span>
    </div>
  );
}
