import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, LikertCard } from '../../design-system/index.js';
import useOnboardingStore from '../../stores/onboardingStore.js';

const LANGS = [
  { label: 'ქართული', code: 'ka' },
  { label: 'English', code: 'en' },
  { label: 'Русский', code: 'ru' },
];

export default function LanguagePage() {
  const navigate = useNavigate();
  const setLanguage = useOnboardingStore((s) => s.setLanguage);
  const storedLanguage = useOnboardingStore((s) => s.language);
  const [sel, setSel] = useState(LANGS.findIndex((l) => l.code === storedLanguage) ?? 0);

  const handleContinue = () => {
    setLanguage(LANGS[sel].code);
    navigate('/onboarding/consent');
  };

  return (
    <div style={{ width: '100%', height: '100dvh', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '64px 20px 0', display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
        <h1 className="type-title" style={{ margin: '0 0 16px' }}>ენა</h1>
        {LANGS.map((lang, i) => (
          <LikertCard
            key={lang.code}
            label={lang.label}
            trait="O"
            selected={sel === i}
            onClick={() => setSel(i)}
          />
        ))}
      </div>
      <div style={{ flex: 'none', padding: '0 20px 24px' }}>
        <Button variant="primary" onClick={handleContinue} style={{ width: '100%' }}>
          გაგრძელება
        </Button>
      </div>
    </div>
  );
}
