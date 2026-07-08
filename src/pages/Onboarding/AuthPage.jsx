import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Input } from '../../design-system/index.js';
import { signInWithApple, signInWithGoogle, signInWithPhone, verifyOtp } from '../../lib/auth.js';

function Wordmark({ size = 44 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{ font: `600 ${size}px/1.1 var(--font-ui)`, color: 'var(--text-primary)' }}>გული</span>
      <span style={{ font: '600 12px/1 var(--font-ui)', letterSpacing: '0.02em', color: 'var(--text-muted)' }}>GULI</span>
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Phone OTP flow state
  const [phoneStep, setPhoneStep] = useState(null); // null | 'enter_phone' | 'enter_otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleApple = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithApple();
      // OAuth redirect handles navigation
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
      // OAuth redirect handles navigation
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPhone(phone);
      setPhoneStep('enter_otp');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await verifyOtp(phone, otp);
      navigate('/onboarding/name');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (phoneStep === 'enter_phone') {
    return (
      <div style={{ width: '100%', height: '100dvh', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '64px 20px 0' }}>
          <h1 className="type-title" style={{ margin: '0 0 24px' }}>ტელეფონის ნომერი</h1>
          <Input
            big
            placeholder="+995 5XX XXX XXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
          />
          {error && <span className="type-caption" style={{ color: 'var(--saperavi)', marginTop: 8 }}>{error}</span>}
        </div>
        <div style={{ flex: 'none', padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button variant="primary" disabled={!phone.trim() || loading} onClick={handlePhoneSubmit} style={{ width: '100%' }}>
            კოდის მიღება
          </Button>
          <Button variant="ghost" size="md" onClick={() => setPhoneStep(null)}>
            უკან
          </Button>
        </div>
      </div>
    );
  }

  if (phoneStep === 'enter_otp') {
    return (
      <div style={{ width: '100%', height: '100dvh', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '64px 20px 0' }}>
          <h1 className="type-title" style={{ margin: '0 0 24px' }}>შეიყვანე კოდი</h1>
          <Input
            big
            placeholder="______"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="number"
          />
          {error && <span className="type-caption" style={{ color: 'var(--saperavi)', marginTop: 8 }}>{error}</span>}
        </div>
        <div style={{ flex: 'none', padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button variant="primary" disabled={otp.length < 6 || loading} onClick={handleOtpSubmit} style={{ width: '100%' }}>
            გაგრძელება
          </Button>
          <Button variant="ghost" size="md" onClick={() => setPhoneStep('enter_phone')}>
            უკან
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100dvh', background: 'var(--bg-0)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Wordmark size={44} />
      </div>

      <div style={{ flex: 'none', padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {error && (
          <span className="type-caption" style={{ color: 'var(--saperavi)', textAlign: 'center' }}>{error}</span>
        )}
        <Button variant="secondary" disabled={loading} onClick={handleApple}>
          Apple-ით გაგრძელება
        </Button>
        <Button variant="secondary" disabled={loading} onClick={handleGoogle}>
          Google-ით გაგრძელება
        </Button>
        <Button variant="primary" disabled={loading} onClick={() => setPhoneStep('enter_phone')}>
          <Icon name="phone" size={18} color="#F5EDF1" /> ტელეფონის ნომრით
        </Button>
        <p className="type-caption" style={{ margin: '8px 0 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          რეგისტრაცია ნიშნავს, რომ ეთანხმები{' '}
          <a href="#" style={{ color: 'var(--text-muted)' }}>წესებს</a>{' '}
          და{' '}
          <a href="#" style={{ color: 'var(--text-muted)' }}>კონფიდენციალურობას</a>
        </p>
      </div>
    </div>
  );
}
