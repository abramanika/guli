import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design-system/index.js';
import useAuthStore from '../../stores/authStore.js';
import { supabase } from '../../lib/supabase.js';

const THEMES = [
  { key: 'dark', label: 'მუქი' },
  { key: 'light', label: 'ღია' },
];

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [theme, setTheme] = useState('dark');
  const [notif, setNotif] = useState(true);

  // Load saved theme from profile on mount
  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from('profiles')
      .select('theme')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.theme) {
          applyTheme(data.theme, false);
          setTheme(data.theme);
        }
      });
  }, [user?.id]);

  function applyTheme(key, save = true) {
    if (key === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (save && user?.id) {
      supabase
        .from('profiles')
        .update({ theme: key })
        .eq('id', user.id)
        .then(() => {});
    }
  }

  function handleTheme(key) {
    setTheme(key);
    applyTheme(key, true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px', gap: 8,
        borderBottom: '1px solid var(--line-hairline)',
        flex: 'none',
      }}>
        <span
          onClick={() => navigate('/me')}
          style={{ cursor: 'pointer', display: 'inline-flex', marginRight: 4 }}
        >
          <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
        </span>
        <span className="type-h3" style={{ flex: 1 }}>პარამეტრები</span>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>

        {/* Language row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16,
          border: '1px solid var(--line-hairline)',
        }}>
          <Icon name="globe" size={20} color="var(--text-secondary)" />
          <span className="type-body" style={{ flex: 1 }}>ენა</span>
          <span className="type-body-sm" style={{ color: 'var(--text-muted)' }}>ქართული</span>
          <Icon name="chevron-right" size={16} color="var(--text-muted)" />
        </div>

        {/* Theme toggle */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16,
          border: '1px solid var(--line-hairline)',
        }}>
          <Icon name="moon" size={20} color="var(--text-secondary)" />
          <span className="type-body" style={{ flex: 1 }}>თემა</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {THEMES.map((t) => (
              <span
                key={t.key}
                onClick={() => handleTheme(t.key)}
                style={{
                  padding: '5px 12px', borderRadius: 999,
                  font: '500 12px/18px var(--font-ui)',
                  cursor: 'pointer',
                  background: theme === t.key ? 'var(--saperavi)' : 'var(--bg-2)',
                  color: theme === t.key ? '#F5EDF1' : 'var(--text-secondary)',
                }}
              >
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Daily question notification */}
        <div
          onClick={() => setNotif(!notif)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16,
            border: '1px solid var(--line-hairline)', cursor: 'pointer',
          }}
        >
          <Icon name="bell" size={20} color="var(--text-secondary)" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="type-body">დღის კითხვა</span>
            <span className="type-caption" style={{ color: 'var(--text-muted)' }}>ყოველდღე, 09:00</span>
          </div>
          {/* Toggle switch */}
          <span style={{
            width: 44, height: 26, borderRadius: 999,
            position: 'relative', flex: 'none',
            background: notif ? 'var(--saperavi)' : 'var(--bg-2)',
            border: '1px solid ' + (notif ? 'var(--saperavi)' : 'var(--line-hairline)'),
            transition: 'background 160ms',
          }}>
            <span style={{
              position: 'absolute', top: 2,
              left: notif ? 20 : 2,
              width: 20, height: 20, borderRadius: '50%',
              background: '#F5EDF1',
              transition: 'left 160ms ease',
            }}></span>
          </span>
        </div>

        {/* About section */}
        <span className="type-caption" style={{ color: 'var(--text-muted)', marginTop: 4 }}>შესახებ</span>

        {/* Terms & privacy */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16,
          border: '1px solid var(--line-hairline)', cursor: 'pointer',
        }}>
          <Icon name="file-text" size={20} color="var(--text-secondary)" />
          <span className="type-body" style={{ flex: 1 }}>წესები და კონფიდენციალურობა</span>
          <Icon name="chevron-right" size={16} color="var(--text-muted)" />
        </div>

        {/* About Guli */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16,
          border: '1px solid var(--line-hairline)',
        }}>
          <Icon name="info" size={20} color="var(--text-secondary)" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span className="type-body">გულის შესახებ</span>
            <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
              გული არ ყიდის შენს ყურადღებას.
            </span>
          </div>
        </div>

        {/* Version */}
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
          ვერსია 1.0 · აწყობილია თბილისში
        </span>
      </div>
    </div>
  );
}
