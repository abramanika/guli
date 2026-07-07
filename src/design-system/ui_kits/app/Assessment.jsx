// Assessment: chapter home (შენი წიგნი), question flow (3 formats), chapter reveal. Plus Me screen.
const { G: G3, ME: ME3, CHAPTERS: CH3, TopBar: TopBar3, Scroll: Scroll3, Row: Row3, Screen: Screen3 } = window.GuliKit;
const { LikertCard, LIKERT_LABELS, ThisOrThatPair, ScenarioSlider, ProgressDrops, Button, ColorForm, TraitBar, Icon, Chip, BottomSheet, TRAITS } = G3;

function ChapterHome({ onStart, onBack }) {
  return (
    <Screen3 label="Chapter home">
      <TopBar3
        title="შენი წიგნი"
        left={<span onClick={onBack} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="chevron-left" size={22} color="var(--text-secondary)" /></span>}
      />
      <Scroll3 style={{ gap: 8 }}>
        <ProgressDrops total={7} done={2} current={2} style={{ margin: '4px 0 12px' }} />
        {CH3.map((c) => {
          const hex = TRAITS[c.trait].hex;
          const locked = c.state === 'locked';
          const current = c.state === 'current';
          return (
            <div
              key={c.n}
              onClick={current ? onStart : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px',
                background: 'var(--bg-1)', borderRadius: 16,
                border: '1px solid ' + (current ? hex : 'var(--line-hairline)'),
                boxShadow: current ? `0 0 24px ${hex}1F` : 'none',
                opacity: locked ? 0.4 : 1,
                cursor: current ? 'pointer' : 'default',
              }}
            >
              <span style={{
                width: 16, height: 16, transform: 'rotate(45deg)', borderRadius: '50% 50% 50% 4px', flex: 'none',
                background: c.state === 'done' ? hex : current ? `${hex}66` : 'var(--bg-2)',
                border: c.state === 'done' ? 'none' : `1px solid ${current ? hex : 'var(--line-hairline)'}`,
                animation: current ? 'guli-pulse 1.8s ease-in-out infinite' : 'none',
              }}></span>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="type-h3">თავი {c.n} · {c.title}</span>
                <span className="type-caption" style={{ color: 'var(--text-muted)' }}>{c.count} კითხვა{c.fun ? ' · სახალისო' : ''}</span>
              </div>
              {c.state === 'done' && <Icon name="check" size={18} color={hex} />}
              {current && <span className="type-caption" style={{ color: hex }}>გაგრძელება</span>}
              {locked && <Icon name="lock" size={16} color="var(--text-muted)" />}
            </div>
          );
        })}
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>საფუძველი: ვალიდირებული ქართული პიროვნების კითხვარი</span>
      </Scroll3>
    </Screen3>
  );
}

const QUESTIONS = [
  { kind: 'likert', trait: 'C', text: 'გეგმა მირჩევნია იმპროვიზაციას.' },
  { kind: 'tt', trait: 'E', text: 'შაბათი საღამო:', a: 'დიდი ხმაურიანი სუფრა', b: 'ორი ძველი მეგობარი' },
  { kind: 'slider', trait: 'O', text: 'უცხო ქალაქში გზის დაკარგვა…', poles: ['მაღიზიანებს', 'მსიამოვნებს'] },
];

function AssessmentFlow({ startAt = 0, onDone, onExit }) {
  const [i, setI] = React.useState(startAt);
  const [likert, setLikert] = React.useState(null);
  const [tt, setTt] = React.useState(null);
  const [v, setV] = React.useState(50);
  React.useEffect(() => setI(startAt), [startAt]);
  const q = QUESTIONS[i];
  const answered = q.kind === 'likert' ? likert != null : q.kind === 'tt' ? tt != null : true;
  const next = () => (i < QUESTIONS.length - 1 ? setI(i + 1) : onDone());
  const labels = { likert: 'Question likert', tt: 'Question this-or-that', slider: 'Question slider' };
  return (
    <Screen3 label={labels[q.kind]}>
      <TopBar3
        title={<ProgressDrops total={7} done={2} current={2} size={10} />}
        left={<span onClick={onExit} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="x" size={20} color="var(--text-muted)" /></span>}
      />
      <Scroll3 style={{ gap: 20, paddingTop: 12 }}>
        <span className="type-caption" style={{ color: 'var(--text-muted)' }}>კითხვა {i + 4} / 10</span>
        <h2 className="type-h2" style={{ margin: 0, maxWidth: '30ch' }}>{q.text}</h2>
        {q.kind === 'likert' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LIKERT_LABELS.map((l, k) => (
              <LikertCard key={l} label={l} trait={q.trait} selected={likert === k} onClick={() => setLikert(k)} />
            ))}
          </div>
        )}
        {q.kind === 'tt' && <ThisOrThatPair optionA={q.a} optionB={q.b} selected={tt} onSelect={setTt} stacked />}
        {q.kind === 'slider' && <ScenarioSlider poleLeft={q.poles[0]} poleRight={q.poles[1]} value={v} onChange={setV} trait={q.trait} style={{ marginTop: 20 }} />}
        <div style={{ flex: 1 }}></div>
        <Button variant="primary" disabled={!answered} onClick={next}>გაგრძელება</Button>
      </Scroll3>
    </Screen3>
  );
}

function ChapterReveal({ onDone, onShare }) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setShown(true), 150); return () => clearTimeout(t); }, []);
  const hex = TRAITS.C.hex;
  return (
    <Screen3 label="Chapter reveal" style={{ alignItems: 'center', justifyContent: 'center', gap: 24, padding: 28, position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', width: 340, height: 340, top: '6%',
        borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
        background: `radial-gradient(closest-side, ${hex}80, ${hex}14 70%, transparent)`,
        filter: shown ? 'blur(30px)' : 'blur(80px)',
        transform: shown ? 'scale(1)' : 'scale(0.1)',
        opacity: shown ? 1 : 0,
        transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}></div>
      <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', opacity: shown ? 1 : 0, transition: 'opacity 500ms 300ms' }}>
        <TraitBar trait="C" value={47} style={{ width: '100%' }} />
        <p className="type-portrait" style={{ margin: 0, textAlign: 'center', maxWidth: '26ch' }}>გეგმა შენთვის მონახაზია — და სწორედ ეს გხდის კარგ თანამგზავრად.</p>
        <span className="type-caption" style={{ color: 'var(--text-muted)' }}>თავი დასრულდა</span>
        <Button variant="primary" onClick={onDone} style={{ alignSelf: 'stretch' }}>გაგრძელება</Button>
        <Button variant="ghost" size="md" onClick={onShare}>გაზიარება</Button>
      </div>
    </Screen3>
  );
}

function MeScreen({ onSettings }) {
  const [preview, setPreview] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [vis, setVis] = React.useState(1);
  return (
    <Screen3 label="Me">
      <TopBar3 title="მე" right={
        <span onClick={onSettings} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="settings" size={20} color="var(--text-secondary)" /></span>
      } />
      <Scroll3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '8px 0 4px' }}>
          <ColorForm traits={ME3.traits} size={88} seed={0} />
          <span className="type-title">{ME3.name}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip trait="A" active>{ME3.archetype}</Chip>
            <Chip trait="O" active>{ME3.colorName}</Chip>
          </div>
        </div>
        <Row3 onClick={() => setPreview(!preview)}>
          <Icon name="eye" size={20} color={preview ? 'var(--saperavi-tint)' : 'var(--text-secondary)'} />
          <span className="type-body" style={{ flex: 1 }}>ასე გხედავენ სხვები</span>
          <span className="type-caption" style={{ color: preview ? 'var(--saperavi-tint)' : 'var(--text-muted)' }}>{preview ? 'ჩართულია' : 'ნახვა'}</span>
        </Row3>
        {preview && (
          <div style={{ padding: '14px 16px', background: 'var(--bg-0)', borderRadius: 16, border: '1px dashed var(--line-hairline)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <ColorForm traits={ME3.traits} size={44} seed={0} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="type-h3">{ME3.name}</span>
              <span className="type-caption" style={{ color: 'var(--text-muted)' }}>{ME3.archetype} · {ME3.colorName} — ქულები არ ჩანს</span>
            </div>
          </div>
        )}
        <span className="type-caption" style={{ color: 'var(--text-muted)', marginTop: 4 }}>ვინ ხედავს შენს რუკას</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {['მხოლოდ მე', 'მეგობრები', 'ბმულით'].map((l, i) => (
            <div key={l} onClick={() => setVis(i)} style={{
              flex: 1, textAlign: 'center', padding: '12px 4px', borderRadius: 12,
              background: 'var(--bg-1)', font: '500 13px/18px var(--font-ui)',
              border: '1px solid ' + (i === vis ? 'var(--saperavi)' : 'var(--line-hairline)'),
              boxShadow: i === vis ? 'var(--glow-saperavi)' : 'none',
              color: i === vis ? 'var(--text-primary)' : 'var(--text-secondary)', cursor: 'pointer',
            }}>{l}</div>
          ))}
        </div>
        <span className="type-caption" style={{ color: 'var(--text-muted)', marginTop: 4 }}>მონაცემები</span>
        <Row3 onClick={() => {}}><Icon name="download" size={20} color="var(--text-secondary)" /><span className="type-body" style={{ flex: 1 }}>მონაცემების გადმოწერა</span></Row3>
        <Row3 onClick={() => setConfirm(true)}><Icon name="trash-2" size={20} color="var(--error)" /><span className="type-body" style={{ flex: 1, color: 'var(--error)' }}>წაშალე ჩემი მონაცემები</span></Row3>
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>გული არ ყიდის შენს ყურადღებას.</span>
      </Scroll3>
      <BottomSheet open={confirm} title="წაიშალოს ყველაფერი?" onClose={() => setConfirm(false)}>
        <p className="type-body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>რუკა, პასუხები, კავშირები — ყველაფერი წაიშლება სრულად და დაუბრუნებლად. ეს ერთი შეხებით სრულდება.</p>
        <Button variant="destructive" onClick={() => setConfirm(false)}>დიახ, წაშალე</Button>
        <Button variant="ghost" size="md" onClick={() => setConfirm(false)}>გადავიფიქრე</Button>
      </BottomSheet>
    </Screen3>
  );
}

Object.assign(window, { ChapterHome, AssessmentFlow, ChapterReveal, MeScreen });
