// Settings & privacy screen.
const { G: G5, TopBar: TopBar5, Scroll: Scroll5, Row: Row5, Screen: Screen5 } = window.GuliKit;
const { Icon, Chip } = G5;

function SettingsScreen({ onBack, theme, onTheme }) {
  const [notif, setNotif] = React.useState(true);
  const themes = [
    { key: 'dark', label: 'მუქი' },
    { key: 'light', label: 'ღია' },
  ];
  return (
    <Screen5 label="Settings">
      <TopBar5
        title="პარამეტრები"
        left={<span onClick={onBack} style={{ cursor: 'pointer', display: 'inline-flex' }}><Icon name="chevron-left" size={22} color="var(--text-secondary)" /></span>}
      />
      <Scroll5>
        <Row5>
          <Icon name="globe" size={20} color="var(--text-secondary)" />
          <span className="type-body" style={{ flex: 1 }}>ენა</span>
          <span className="type-body-sm" style={{ color: 'var(--text-muted)' }}>ქართული</span>
          <Icon name="chevron-right" size={16} color="var(--text-muted)" />
        </Row5>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)' }}>
          <Icon name="moon" size={20} color="var(--text-secondary)" />
          <span className="type-body" style={{ flex: 1 }}>თემა</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {themes.map((t) => (
              <span key={t.key} onClick={() => onTheme(t.key)} style={{
                padding: '5px 12px', borderRadius: 999, font: '500 12px/18px var(--font-ui)', cursor: 'pointer',
                background: theme === t.key ? 'var(--saperavi)' : 'var(--bg-2)',
                color: theme === t.key ? '#F5EDF1' : 'var(--text-secondary)',
              }}>{t.label}</span>
            ))}
          </div>
        </div>
        <div onClick={() => setNotif(!notif)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16, border: '1px solid var(--line-hairline)', cursor: 'pointer' }}>
          <Icon name="bell" size={20} color="var(--text-secondary)" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="type-body">დღის კითხვა</span>
            <span className="type-caption" style={{ color: 'var(--text-muted)' }}>ყოველდღე, 09:00</span>
          </div>
          <span style={{
            width: 44, height: 26, borderRadius: 999, position: 'relative', flex: 'none',
            background: notif ? 'var(--saperavi)' : 'var(--bg-2)',
            border: '1px solid ' + (notif ? 'var(--saperavi)' : 'var(--line-hairline)'),
            transition: 'background 160ms',
          }}>
            <span style={{ position: 'absolute', top: 2, left: notif ? 20 : 2, width: 20, height: 20, borderRadius: '50%', background: '#F5EDF1', transition: 'left 160ms var(--ease-standard)' }}></span>
          </span>
        </div>
        <span className="type-caption" style={{ color: 'var(--text-muted)', marginTop: 4 }}>შესახებ</span>
        <Row5>
          <Icon name="file-text" size={20} color="var(--text-secondary)" />
          <span className="type-body" style={{ flex: 1 }}>წესები და კონფიდენციალურობა</span>
          <Icon name="chevron-right" size={16} color="var(--text-muted)" />
        </Row5>
        <Row5>
          <Icon name="info" size={20} color="var(--text-secondary)" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="type-body">გულის შესახებ</span>
            <span className="type-caption" style={{ color: 'var(--text-muted)' }}>გული არ ყიდის შენს ყურადღებას.</span>
          </div>
        </Row5>
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>ვერსია 1.0 · აწყობილია თბილისში</span>
      </Scroll5>
    </Screen5>
  );
}

Object.assign(window, { SettingsScreen });
