// Circle: friends list, add friend sheet, pair comparison, group map, first-open trust sheet.
const { G: G2, ME: ME2, FRIENDS: FRIENDS2, GROUP: GROUP2, TopBar: TopBar2, Scroll: Scroll2, Row: Row2, Screen: Screen2 } = window.GuliKit;
const { ColorForm, TraitBar, InsightCard, Icon, Button, HeartMap, BottomSheet, Toast, TRAITS } = G2;

function CircleScreen({ onOpenPair, onGroup, introSeen, onIntroSeen }) {
  const [add, setAdd] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  return (
    <Screen2 label="Circle list">
      <TopBar2 title="წრე" />
      <Scroll2>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" size="md" style={{ flex: 1 }} onClick={() => { setTab(0); setAdd(true); }}>მოწვევა</Button>
          <Button variant="secondary" size="md" style={{ width: 64 }} onClick={() => { setTab(1); setAdd(true); }}><Icon name="qr-code" size={20} color="var(--text-secondary)" /></Button>
        </div>
        {FRIENDS2.map((f) => (
          <Row2 key={f.name} onClick={() => onOpenPair(f)}>
            <ColorForm traits={f.traits} size={44} seed={f.seed} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="type-h3">{f.name}</span>
              <span className="type-caption" style={{ color: 'var(--text-muted)' }}>{f.archetype}</span>
            </div>
            <span className="type-numeral" style={{ fontSize: 17, color: 'var(--saperavi-tint)' }}>{f.match}%</span>
          </Row2>
        ))}
        <Row2 onClick={onGroup}>
          <div style={{ display: 'flex' }}>
            {FRIENDS2.slice(0, 3).map((f, i) => (
              <ColorForm key={f.name} traits={f.traits} size={30} seed={f.seed} style={{ marginLeft: i ? -10 : 0 }} />
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="type-h3">{GROUP2.name}</span>
            <span className="type-caption" style={{ color: 'var(--text-muted)' }}>ჯგუფური რუკა · 4 წევრი</span>
          </div>
          <Icon name="chevron-right" size={18} color="var(--text-muted)" />
        </Row2>
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>ჯგუფური ხედი მხოლოდ გაერთიანებულ მონაცემებს აჩვენებს</span>
      </Scroll2>

      <BottomSheet open={!introSeen} title="რას ხედავენ მეგობრები" onClose={onIntroSeen}>
        <p className="type-body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>მეგობრები ხედავენ შენს ფერს, არქეტიპს და თანხვედრას — არასდროს შენს პასუხებს ან ზუსტ ქულებს.</p>
        <Button variant="primary" size="md" onClick={onIntroSeen}>გასაგებია</Button>
      </BottomSheet>

      <BottomSheet open={add} title="მეგობრის დამატება" onClose={() => setAdd(false)}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['ბმულით', 'QR', 'კონტაქტებიდან'].map((l, i) => (
            <span key={l} onClick={() => setTab(i)} style={{
              padding: '6px 14px', borderRadius: 999, font: '500 13px/18px var(--font-ui)', cursor: 'pointer',
              background: tab === i ? 'var(--saperavi)' : 'var(--bg-2)', color: tab === i ? '#F5EDF1' : 'var(--text-secondary)',
            }}>{l}</span>
          ))}
        </div>
        {tab === 0 && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ flex: 1, padding: '14px 16px', borderRadius: 10, background: 'var(--bg-2)', font: '400 14px/1 monospace', color: 'var(--text-secondary)' }}>guli.ge/w/nino</span>
            <Button variant="secondary" size="md" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}><Icon name="copy" size={18} color="var(--text-secondary)" /></Button>
          </div>
        )}
        {tab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            <div style={{ width: 150, height: 150, borderRadius: 12, background: '#F5EDF1', padding: 12, boxSizing: 'border-box', display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 2 }}>
              {Array.from({ length: 81 }).map((_, i) => (
                <span key={i} style={{ background: ((i * 7) % 3 === 0 || i % 11 === 2 || i < 3 || i % 9 < 1) ? '#120B10' : 'transparent', borderRadius: 1 }}></span>
              ))}
            </div>
            <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>გადაეცი ტელეფონი მაგიდის მეორე მხარეს</span>
          </div>
        )}
        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p className="type-body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>კონტაქტები მხოლოდ შენს ტელეფონში მუშავდება — სერვერზე არ იტვირთება.</p>
            <Button variant="secondary" size="md">კონტაქტების ნახვა</Button>
          </div>
        )}
        {copied && <Toast floating icon={<Icon name="check" size={14} color="var(--trait-c)" />}>ბმული დაკოპირდა</Toast>}
      </BottomSheet>
    </Screen2>
  );
}

function PairScreen({ friend, onBack, onShare }) {
  const f = friend || FRIENDS2[0];
  return (
    <Screen2 label="Pair comparison">
      <TopBar2
        title="თანხვედრა"
        left={<span onClick={onBack} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="chevron-left" size={22} color="var(--text-secondary)" /></span>}
        right={<span onClick={onShare} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="share" size={20} color="var(--text-secondary)" /></span>}
      />
      <Scroll2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0 0' }}>
          <ColorForm traits={ME2.traits} size={72} seed={0} style={{ marginRight: -18, mixBlendMode: 'screen' }} />
          <ColorForm traits={f.traits} size={72} seed={f.seed} style={{ mixBlendMode: 'screen' }} />
        </div>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="type-display type-numeral">{f.match}%</span>
          <span className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>{ME2.name} + {f.name}</span>
        </div>
        <HeartMap scores={ME2.scores} secondScores={f.scores} size={250} showLabels={false} style={{ alignSelf: 'center', margin: '-10px 0' }} />
        <span className="type-h3">სად ჰგავხართ</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16, background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)' }}>
          <TraitBar trait="A" value={81} secondValue={66} />
          <TraitBar trait="N" value={58} secondValue={71} />
        </div>
        <span className="type-h3">სად განსხვავდებით</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 16, background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)' }}>
          <TraitBar trait="C" value={47} secondValue={82} />
          <span className="type-caption" style={{ color: 'var(--text-muted)' }}>გეგმა და იმპროვიზაცია ერთ მაგიდას სხვადასხვა გემოს აძლევს.</span>
        </div>
        <InsightCard title="კითხვა საღამოსთვის" trait="C" label={null} icon={<Icon name="armchair" size={18} color="var(--trait-c)" />}>
          ჰკითხე {f.name}ს: რატომ გირჩევნია გეგმა იმპროვიზაციას?
        </InsightCard>
      </Scroll2>
    </Screen2>
  );
}

function GroupMapScreen({ onBack }) {
  return (
    <Screen2 label="Group map">
      <TopBar2
        title={GROUP2.name}
        left={<span onClick={onBack} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="chevron-left" size={22} color="var(--text-secondary)" /></span>}
      />
      <Scroll2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '8px 0 0' }}>
          <ColorForm traits={GROUP2.traits} size={88} seed={2} />
          <span className="type-h2">თქვენი წრის ფერი: {GROUP2.colorName}</span>
          <span className="type-caption" style={{ color: 'var(--text-muted)' }}>4 წევრი · გაერთიანებული სურათი</span>
        </div>
        <HeartMap scores={GROUP2.mean} size={280} style={{ alignSelf: 'center', margin: '-4px 0' }} />
        {GROUP2.titles.map((t) => (
          <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)', opacity: t.consented ? 1 : 0.6 }}>
            <Icon name={t.consented ? 'sparkles' : 'lock'} size={18} color={t.consented ? 'var(--trait-e)' : 'var(--text-muted)'} />
            <span className="type-body-sm" style={{ flex: 1 }}>{t.title}:</span>
            <span className="type-h3" style={{ color: t.consented ? 'var(--text-primary)' : 'var(--text-muted)' }}>{t.consented ? t.who : 'დამალულია'}</span>
          </div>
        ))}
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>ჯგუფური ხედი მხოლოდ გაერთიანებულ მონაცემებს აჩვენებს. სახელობითი წარწერა ჩანს მხოლოდ წევრის თანხმობით.</span>
      </Scroll2>
    </Screen2>
  );
}

Object.assign(window, { CircleScreen, PairScreen, GroupMapScreen });
