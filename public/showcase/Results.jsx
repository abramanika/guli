// Results: trait deep-dive, archetype, full portrait, share composer.
const { G: G4, ME: ME4, TRAIT_DETAILS: TD4, PORTRAIT: P4, TopBar: TopBar4, Scroll: Scroll4, Screen: Screen4 } = window.GuliKit;
const { TraitBar, InsightCard, ArchetypeCard, Button, ColorForm, Chip, Icon, TRAITS, Toast } = G4;

function BackBtn({ onBack }) {
  return <span onClick={onBack} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="chevron-left" size={22} color="var(--text-secondary)" /></span>;
}

function TraitDetail({ trait = 'E', onBack }) {
  const t = TRAITS[trait];
  const d = TD4[trait];
  return (
    <Screen4 label="Trait deep-dive">
      <div style={{ flex: 'none', padding: '0 0 16px', background: `linear-gradient(180deg, ${t.hex}2E, transparent)` }}>
        <TopBar4 title={t.poles[1]} left={<BackBtn onBack={onBack} />} />
        <div style={{ padding: '4px 20px 0' }}>
          <TraitBar trait={trait} value={d.value} percentileLabel={`${d.value}%`} />
        </div>
      </div>
      <Scroll4>
        <p className="type-body" style={{ margin: 0, color: 'var(--text-secondary)' }}>{d.intro}</p>
        {d.notes.map((n) => (
          <InsightCard key={n.title} title={n.title} trait={trait} label={n.label}>{n.text}</InsightCard>
        ))}
        <InsightCard title="ეს რას ნიშნავს შენს წრეში" trait={trait} label={null} icon={<Icon name="users" size={18} color={t.hex} />}>
          {d.circle}
        </InsightCard>
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>კვლევითი საფუძველი: ვალიდირებული ქართული პიროვნების კითხვარი</span>
      </Scroll4>
    </Screen4>
  );
}

function ArchetypeScreen({ onBack, onShare }) {
  return (
    <Screen4 label="Archetype" style={{ padding: 20, gap: 16 }}>
      <BackBtn onBack={onBack} />
      <ArchetypeCard name={ME4.archetype} tagline={ME4.tagline} traits={['E', 'A', 'O']} chips={['გულღია', 'გულთბილი', 'მაძიებელი']} style={{ flex: 1 }} />
      <Button variant="ghost" size="md" onClick={onShare}>გაზიარება</Button>
    </Screen4>
  );
}

function FullPortrait({ onBack, onShare }) {
  return (
    <Screen4 label="Full portrait">
      <TopBar4 title="" left={<BackBtn onBack={onBack} />} />
      <Scroll4 style={{ padding: '0 28px 32px', gap: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 24px', opacity: 0.85 }}>
          <ColorForm traits={ME4.traits} size={72} seed={0} />
        </div>
        <h1 className="type-title" style={{ margin: '0 0 4px', textAlign: 'center' }}>{ME4.colorName}</h1>
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center', display: 'block', marginBottom: 28 }}>{ME4.name}ს პორტრეტი</span>
        {P4.map((para, i) => (
          <p key={i} className="type-portrait" style={{ margin: '0 0 22px', color: 'var(--text-primary)' }}>{para}</p>
        ))}
        <span className="type-caption" style={{ color: 'var(--text-muted)', margin: '8px 0 20px' }}>კვლევითი საფუძველი · განახლდება ყოველ თავთან</span>
        <Button variant="ghost" size="md" onClick={onShare}>გაზიარება</Button>
      </Scroll4>
    </Screen4>
  );
}

const SHARE_FORMATS = ['Story', 'კვადრატი', 'სტიკერი'];

function ShareCardPreview({ format, showArchetype, showTraits }) {
  const [t1, t2] = ME4.traits;
  const c1 = TRAITS[t1].hex, c2 = TRAITS[t2].hex;
  const story = format === 0, sticker = format === 2;
  return (
    <div style={{
      width: story ? 148 : 178, height: story ? 262 : 178, flex: 'none', margin: '0 auto',
      borderRadius: 16, position: 'relative', overflow: 'hidden',
      background: sticker ? 'transparent' : 'var(--bg-0)',
      border: sticker ? '1px dashed var(--line-hairline)' : '1px solid var(--line-hairline)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {!sticker && <div aria-hidden="true" style={{
        position: 'absolute', width: '120%', height: '70%', top: '-20%',
        borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
        background: `radial-gradient(closest-side, ${c1}59, ${c2}1F 70%, transparent)`, filter: 'blur(18px)',
      }}></div>}
      <ColorForm traits={ME4.traits} size={sticker ? 84 : 64} seed={0} style={{ position: 'relative' }} />
      {showArchetype && <span style={{ position: 'relative', font: `600 ${story ? 17 : 15}px/1.2 var(--font-ui)`, color: 'var(--text-primary)' }}>{ME4.archetype}</span>}
      {story && showArchetype && <span className="type-portrait" style={{ position: 'relative', fontSize: 10, lineHeight: '15px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '80%' }}>„{ME4.tagline}"</span>}
      {showTraits && !sticker && (
        <div style={{ position: 'relative', display: 'flex', gap: 4 }}>
          {['გულღია', 'გულთბილი', 'მაძიებელი'].map((c, i) => (
            <span key={c} style={{ font: '500 8px/1 var(--font-ui)', padding: '3px 6px', borderRadius: 999, background: `${TRAITS[['E', 'A', 'O'][i]].hex}29`, color: TRAITS[['E', 'A', 'O'][i]].hex }}>{c}</span>
          ))}
        </div>
      )}
      {!sticker && <span style={{ position: 'absolute', bottom: 8, font: '600 9px/1 var(--font-ui)', color: 'var(--text-muted)' }}>გული</span>}
      {sticker && <span style={{ position: 'relative', font: '400 8px/1 monospace', color: 'var(--text-muted)' }}>guli.ge/nino</span>}
    </div>
  );
}

function ShareComposer({ onBack }) {
  const [format, setFormat] = React.useState(0);
  const [showArchetype, setShowArchetype] = React.useState(true);
  const [showTraits, setShowTraits] = React.useState(true);
  const [lang, setLang] = React.useState('ka');
  const [sent, setSent] = React.useState(false);
  const toggle = (on, label, fn) => (
    <span onClick={fn} style={{
      padding: '6px 12px', borderRadius: 999, font: '500 12px/18px var(--font-ui)', cursor: 'pointer',
      background: on ? 'rgba(232,139,171,0.16)' : 'var(--bg-2)',
      color: on ? 'var(--saperavi-tint)' : 'var(--text-muted)',
      border: '1px solid ' + (on ? 'rgba(232,139,171,0.4)' : 'var(--line-hairline)'),
    }}>{label}</span>
  );
  return (
    <Screen4 label="Share composer">
      <TopBar4 title="გაზიარება" left={<BackBtn onBack={onBack} />} />
      <Scroll4 style={{ gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {SHARE_FORMATS.map((f, i) => (
            <span key={f} onClick={() => setFormat(i)} style={{
              padding: '6px 14px', borderRadius: 999, font: '500 13px/18px var(--font-ui)', cursor: 'pointer',
              background: format === i ? 'var(--saperavi)' : 'var(--bg-2)',
              color: format === i ? '#F5EDF1' : 'var(--text-secondary)',
            }}>{f}</span>
          ))}
        </div>
        <ShareCardPreview format={format} showArchetype={showArchetype} showTraits={showTraits} />
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {toggle(showArchetype, 'არქეტიპი', () => setShowArchetype(!showArchetype))}
          {toggle(showTraits, 'თვისებები', () => setShowTraits(!showTraits))}
          {toggle(lang === 'en', 'EN', () => setLang(lang === 'ka' ? 'en' : 'ka'))}
        </div>
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          {format === 2 ? 'სტიკერს ბმული აქვს — მთავარ ბარათს არასდროს' : '1080×1920 · ბარათი ლამაზია აპლიკაციის კონტექსტის გარეშეც'}
        </span>
        <div style={{ flex: 1 }}></div>
        <Button variant="primary" onClick={() => { setSent(true); setTimeout(() => setSent(false), 2400); }}>გაზიარება</Button>
      </Scroll4>
      {sent && <Toast floating icon={<Icon name="check" size={14} color="var(--trait-c)" />}>ბარათი მზადაა — Stories გაიხსნება</Toast>}
    </Screen4>
  );
}

Object.assign(window, { TraitDetail, ArchetypeScreen, FullPortrait, ShareComposer });
