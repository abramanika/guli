import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../design-system/index.js';
import useOnboardingStore from '../../stores/onboardingStore.js';

function isOldEnough(value) {
  // Parse dd.mm.yyyy or dd / mm / yyyy style entries
  const digits = value.replace(/\D/g, '');
  if (digits.length < 8) return false;
  const day = parseInt(digits.slice(0, 2), 10);
  const month = parseInt(digits.slice(2, 4), 10) - 1;
  const year = parseInt(digits.slice(4, 8), 10);
  const dob = new Date(year, month, day);
  if (isNaN(dob.getTime())) return false;
  const now = new Date();
  const age = now.getFullYear() - dob.getFullYear() -
    (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate()) ? 1 : 0);
  return age >= 16;
}

export default function BirthdayPage() {
  const navigate = useNavigate();
  const setBirthday = useOnboardingStore((s) => s.setBirthday);
  const storedBirthday = useOnboardingStore((s) => s.birthday);
  const [v, setV] = useState(storedBirthday);
  const [error, setError] = useState('');

  const canContinue = v.trim().length >= 6;

  const handleContinue = () => {
    if (!isOldEnough(v)) {
      setError('გული 16 წლიდან არის ხელმისაწვდომი');
      return;
    }
    setBirthday(v.trim());
    navigate('/onboarding/language');
  };

  return (
    <div style={{ width: '100%', height: '100dvh', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '64px 20px 0', display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
        <h1 className="type-title" style={{ margin: 0 }}>როდის დაიბადე?</h1>
        <Input
          big
          placeholder="დდ . თთ . წწწწ"
          value={v}
          onChange={(e) => { setV(e.target.value); setError(''); }}
        />
        {error ? (
          <span className="type-caption" style={{ color: 'var(--saperavi)' }}>{error}</span>
        ) : (
          <span className="type-caption" style={{ color: 'var(--text-muted)' }}>გული 16 წლიდან არის ხელმისაწვდომი</span>
        )}
      </div>
      <div style={{ flex: 'none', padding: '0 20px 24px' }}>
        <Button variant="primary" disabled={!canContinue} onClick={handleContinue} style={{ width: '100%' }}>
          გაგრძელება
        </Button>
      </div>
    </div>
  );
}
