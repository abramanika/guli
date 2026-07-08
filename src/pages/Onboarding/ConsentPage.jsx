import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../../design-system/index.js';
import useOnboardingStore from '../../stores/onboardingStore.js';

const CONSENT_ROWS = [
  { icon: 'eye-off', text: 'შენს პასუხებს მხოლოდ შენ ხედავ' },
  { icon: 'users', text: 'ჯგუფურ სურათებში მხოლოდ გაერთიანებული, უსახელო მონაცემები ჩანს' },
  { icon: 'trash-2', text: 'წაშლა ერთი ღილაკით, ნებისმიერ დროს' },
];

export default function ConsentPage() {
  const navigate = useNavigate();
  const createProfile = useOnboardingStore((s) => s.createProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAgree = async () => {
    setError('');
    setLoading(true);
    try {
      await createProfile();
      navigate('/today');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', height: '100dvh', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '64px 20px 0', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>
        <h1 className="type-title" style={{ margin: '0 0 8px' }}>სანამ დავიწყებთ</h1>
        {CONSENT_ROWS.map((r) => (
          <div
            key={r.icon}
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'flex-start',
              padding: 16,
              background: 'var(--bg-1)',
              borderRadius: 16,
              border: '1px solid var(--line-hairline)',
            }}
          >
            <Icon name={r.icon} size={22} color="var(--saperavi-tint)" />
            <span className="type-body" style={{ flex: 1 }}>{r.text}</span>
          </div>
        ))}
        {error && (
          <span className="type-caption" style={{ color: 'var(--saperavi)' }}>{error}</span>
        )}
      </div>
      <div style={{ flex: 'none', padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button variant="primary" disabled={loading} onClick={handleAgree}>
          ვეთანხმები
        </Button>
        <Button variant="ghost" size="md">
          წესების სრულად ნახვა
        </Button>
      </div>
    </div>
  );
}
