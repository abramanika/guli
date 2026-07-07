// Today + Map screens
const { G: G1, ME: ME1, TopBar: TopBar1, Scroll: Scroll1, Screen: Screen1 } = window.GuliKit;
const { DailyQuestionCard, InsightCard, ScenarioSlider, ProgressDrops, ColorForm, HeartMap, TraitBar, ArchetypeCard, Icon } = G1;

function TodayScreen() {
  const [v, setV] = React.useState(50);
  const [answered, setAnswered] = React.useState(false);
  return (
    <Screen1 label="Today">
      <TopBar1 title="დღეს" right={<ProgressDrops total={5} done={3} size={8} />} />
      <Scroll1>
        {answered ? (
          <DailyQuestionCard answered countdown="შემდეგი კითხვა ხვალ, 09:00" />
        ) : (
          <DailyQuestionCard question="გადაუდებელი ცვლილება გეგმებში:" traits={['N', 'O']}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ScenarioSlider poleLeft="მაღიზიანებს" poleRight="მახალისებს" value={v} onChange={setV} trait="N" />
              <button
                onClick={() => setAnswered(true)}
                style={{ height: 44, border: 'none', borderRadius: 999, background: 'var(--saperavi)', color: '#F5EDF1', font: '500 15px/1 var(--font-ui)', cursor: 'pointer' }}
              >პასუხი</button>
            </div>
          </DailyQuestionCard>
        )}
        <InsightCard title="დღის დაკვირვება" trait="A" label="კვლევითი საფუძველი">
          როცა მეგობარი ნაწყენია, პირველი შენ ურეკავ — შენს წრეში ეს იშვიათი თვისებაა.
        </InsightCard>
        <InsightCard title="სახალისო შტრიხი" trait="E" label="სახალისო">
          სადღეგრძელოს დაწყების ალბათობა: მაღალი. განსაკუთრებით მესამე საათზე.
        </InsightCard>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)' }}>
          <ColorForm traits={ME1.traits} size={28} seed={0} />
          <span className="type-body-sm" style={{ flex: 1 }}>შენი პორტრეტი განახლდა</span>
          <Icon name="chevron-right" size={18} color="var(--text-muted)" />
        </div>
      </Scroll1>
    </Screen1>
  );
}

function MapScreen({ onArchetype, onTrait, onPortrait, onShare, onChapters }) {
  return (
    <Screen1 label="Heart Map">
      <TopBar1 title="რუკა" right={
        <span onClick={onShare} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="share" size={20} color="var(--text-secondary)" /></span>
      } />
      <Scroll1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '4px 0 0' }}>
          <ColorForm traits={ME1.traits} size={88} seed={0} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="type-title">{ME1.colorName}</span>
            <span className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>შენი ფერი · {ME1.name}</span>
          </div>
        </div>
        <HeartMap scores={ME1.scores} size={330} style={{ alignSelf: 'center', margin: '-6px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '16px 16px 20px', background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)' }}>
          {['E', 'A', 'C', 'N', 'O'].map((k) => (
            <div key={k} onClick={() => onTrait(k)} style={{ cursor: 'pointer' }}>
              <TraitBar trait={k} value={ME1.scores[k]} />
            </div>
          ))}
        </div>
        <div onClick={onArchetype} style={{ cursor: 'pointer' }}>
          <ArchetypeCard compact name={ME1.archetype} tagline={ME1.tagline} traits={['E', 'A', 'O']} />
        </div>
        <div onClick={onPortrait} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)', cursor: 'pointer' }}>
          <span className="type-h3">სრული პორტრეტი</span>
          <Icon name="chevron-right" size={18} color="var(--text-muted)" />
        </div>
        <div onClick={onChapters} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--saperavi)', boxShadow: 'var(--glow-saperavi)', cursor: 'pointer' }}>
          <Icon name="book-open" size={20} color="var(--saperavi-tint)" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="type-h3">დარჩა 5 თავი</span>
            <span className="type-caption" style={{ color: 'var(--text-muted)' }}>რუკა ღრმავდება ყოველ თავთან</span>
          </div>
          <Icon name="chevron-right" size={18} color="var(--text-muted)" />
        </div>
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>საფუძველი: ვალიდირებული ქართული პიროვნების კითხვარი</span>
      </Scroll1>
    </Screen1>
  );
}

Object.assign(window, { TodayScreen, MapScreen });
