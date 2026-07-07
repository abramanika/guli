// Onboarding: splash, value carousel, auth, name, birthday, language, consent.
const { G: Gob, TopBar: TopBarOb, Scroll: ScrollOb, Screen: ScreenOb } = window.GuliKit;
const { Button, Input, LikertCard, Icon, HeartMap, ColorForm } = Gob;

function Wordmark({ size = 56 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <span style={{ font: `600 ${size}px/1.1 var(--font-ui)`, color: 'var(--text-primary)' }}>გული</span>
      <span style={{ font: '600 12px/1 var(--font-ui)', letterSpacing: '0.02em', color: 'var(--text-muted)' }}>GULI</span>
    </div>
  );
}

function SplashScreen({ onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <ScreenOb label="Splash" style={{ alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" className="guli-splash-blob" style={{
        position: 'absolute', width: 300, height: 300,
        borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
        background: 'radial-gradient(closest-side, rgba(166,42,84,0.4), rgba(110,27,56,0.1) 70%, transparent)',
        filter: 'blur(30px)',
      }}></div>
      <div style={{ position: 'relative' }}><Wordmark /></div>
      <span className="type-caption" style={{ position: 'absolute', bottom: 48, color: 'var(--text-muted)' }}>გაიცანი შენი გული</span>
    </ScreenOb>
  );
}

const CAROUSEL = [
  { title: 'აღმოაჩინე შენი გულის რუკა', kind: 'map' },
  { title: 'შეადარე შენს წრეს', kind: 'overlap' },
  { title: 'შენი პასუხები მხოლოდ შენია', kind: 'vessel' },
];

function CarouselScreen({ page = 0, onPage, onDone }) {
  const c = CAROUSEL[page];
  const visual = () => {
    if (c.kind === 'map') return <HeartMap scores={{ E: 62, A: 81, C: 47, N: 58, O: 74 }} size={260} showLabels={false} />;
    if (c.kind === 'overlap') return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ColorForm traits={['A', 'O']} size={120} seed={0} style={{ marginRight: -34, mixBlendMode: 'screen' }} />
        <ColorForm traits={['O', 'E']} size={120} seed={2} style={{ mixBlendMode: 'screen' }} />
      </div>
    );
    return (
      <div style={{ width: 180, height: 220, borderRadius: '42% 42% 46% 46% / 16% 16% 60% 60%', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 26, boxSizing: 'border-box' }}>
        <ColorForm traits={['N', 'A']} size={96} seed={4} />
      </div>
    );
  };
  return (
    <ScreenOb label={`Onboarding ${page + 1}`}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px', flex: 'none' }}>
        <span className="type-body-sm" style={{ color: 'var(--text-muted)', cursor: 'pointer' }} onClick={onDone}>გამოტოვება</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{visual()}</div>
      <div style={{ flex: 'none', padding: '0 28px 28px', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
        <h1 className="type-title" style={{ margin: 0, textAlign: 'center', maxWidth: '14ch' }}>{c.title}</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          {CAROUSEL.map((_, i) => (
            <span key={i} onClick={() => onPage(i)} style={{ width: i === page ? 20 : 6, height: 6, borderRadius: 999, background: i === page ? 'var(--saperavi-tint)' : 'var(--bg-2)', cursor: 'pointer', transition: 'width 240ms var(--ease-standard)' }}></span>
          ))}
        </div>
        {page < 2 ? (
          <Button variant="secondary" onClick={() => onPage(page + 1)} style={{ alignSelf: 'stretch' }}>შემდეგი</Button>
        ) : (
          <Button variant="primary" onClick={onDone} style={{ alignSelf: 'stretch' }}>ᲓᲐᲘᲬᲧᲔ</Button>
        )}
      </div>
    </ScreenOb>
  );
}

function AuthScreen({ onDone }) {
  return (
    <ScreenOb label="Auth">
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Wordmark size={44} /></div>
      <div style={{ flex: 'none', padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Button variant="secondary" onClick={onDone}>Apple-ით გაგრძელება</Button>
        <Button variant="secondary" onClick={onDone}>Google-ით გაგრძელება</Button>
        <Button variant="primary" onClick={onDone}><Icon name="phone" size={18} color="#F5EDF1" /> ტელეფონის ნომრით</Button>
        <p className="type-caption" style={{ margin: '8px 0 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          რეგისტრაცია ნიშნავს, რომ ეთანხმები <a href="#">წესებს</a> და <a href="#">კონფიდენციალურობას</a>
        </p>
      </div>
    </ScreenOb>
  );
}

function NameScreen({ onDone }) {
  const [v, setV] = React.useState('');
  return (
    <ScreenOb label="Name">
      <ScrollOb style={{ paddingTop: 64, gap: 24 }}>
        <h1 className="type-title" style={{ margin: 0 }}>რა გქვია?</h1>
        <Input big placeholder="შენი სახელი" value={v} onChange={(e) => setV(e.target.value)} />
      </ScrollOb>
      <div style={{ flex: 'none', padding: '0 20px 24px' }}>
        <Button variant="primary" disabled={!v.trim()} onClick={onDone} style={{ width: '100%' }}>გაგრძელება</Button>
      </div>
    </ScreenOb>
  );
}

function BirthdayScreen({ onDone }) {
  const [v, setV] = React.useState('');
  return (
    <ScreenOb label="Birthday">
      <ScrollOb style={{ paddingTop: 64, gap: 24 }}>
        <h1 className="type-title" style={{ margin: 0 }}>როდის დაიბადე?</h1>
        <Input big placeholder="დდ . თთ . წწწწ" value={v} onChange={(e) => setV(e.target.value)} />
        <span className="type-caption" style={{ color: 'var(--text-muted)' }}>გული 16 წლიდან არის ხელმისაწვდომი</span>
      </ScrollOb>
      <div style={{ flex: 'none', padding: '0 20px 24px' }}>
        <Button variant="primary" disabled={v.trim().length < 6} onClick={onDone} style={{ width: '100%' }}>გაგრძელება</Button>
      </div>
    </ScreenOb>
  );
}

function LanguageScreen({ onDone }) {
  const [sel, setSel] = React.useState(0);
  const langs = ['ქართული', 'English', 'Русский'];
  return (
    <ScreenOb label="Language">
      <ScrollOb style={{ paddingTop: 64, gap: 8 }}>
        <h1 className="type-title" style={{ margin: '0 0 16px' }}>ენა</h1>
        {langs.map((l, i) => (
          <LikertCard key={l} label={l} trait="O" selected={sel === i} onClick={() => setSel(i)} />
        ))}
      </ScrollOb>
      <div style={{ flex: 'none', padding: '0 20px 24px' }}>
        <Button variant="primary" onClick={onDone} style={{ width: '100%' }}>გაგრძელება</Button>
      </div>
    </ScreenOb>
  );
}

const CONSENT_ROWS = [
  { icon: 'eye-off', text: 'შენს პასუხებს მხოლოდ შენ ხედავ' },
  { icon: 'users', text: 'ჯგუფურ სურათებში მხოლოდ გაერთიანებული, უსახელო მონაცემები ჩანს' },
  { icon: 'trash-2', text: 'წაშლა ერთი ღილაკით, ნებისმიერ დროს' },
];

function ConsentScreen({ onDone }) {
  return (
    <ScreenOb label="Consent">
      <ScrollOb style={{ paddingTop: 64, gap: 16 }}>
        <h1 className="type-title" style={{ margin: '0 0 8px' }}>სანამ დავიწყებთ</h1>
        {CONSENT_ROWS.map((r) => (
          <div key={r.icon} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '16px', background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)' }}>
            <Icon name={r.icon} size={22} color="var(--saperavi-tint)" />
            <span className="type-body" style={{ flex: 1 }}>{r.text}</span>
          </div>
        ))}
      </ScrollOb>
      <div style={{ flex: 'none', padding: '0 20px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Button variant="primary" onClick={onDone}>ვეთანხმები</Button>
        <Button variant="ghost" size="md">წესების სრულად ნახვა</Button>
      </div>
    </ScreenOb>
  );
}

Object.assign(window, { SplashScreen, CarouselScreen, AuthScreen, NameScreen, BirthdayScreen, LanguageScreen, ConsentScreen });
