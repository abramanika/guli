import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../design-system/index.js';
import useOnboardingStore from '../../stores/onboardingStore.js';

export default function NamePage() {
  const navigate = useNavigate();
  const setName = useOnboardingStore((s) => s.setName);
  const storedName = useOnboardingStore((s) => s.name);
  const [v, setV] = useState(storedName);

  const handleContinue = () => {
    setName(v.trim());
    navigate('/onboarding/birthday');
  };

  return (
    <div style={{ width: '100%', height: '100dvh', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '64px 20px 0', display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
        <h1 className="type-title" style={{ margin: 0 }}>რა გქვია?</h1>
        <Input
          big
          placeholder="შენი სახელი"
          value={v}
          onChange={(e) => setV(e.target.value)}
        />
      </div>
      <div style={{ flex: 'none', padding: '0 20px 24px' }}>
        <Button variant="primary" disabled={!v.trim()} onClick={handleContinue} style={{ width: '100%' }}>
          გაგრძელება
        </Button>
      </div>
    </div>
  );
}
