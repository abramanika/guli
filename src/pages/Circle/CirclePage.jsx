import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ColorForm, Icon, Button, BottomSheet, Toast,
} from '../../design-system/index.js';
import { useFriends } from '../../hooks/useFriends.js';
import { useGroupMap } from '../../hooks/useGroupMap.js';
import { generateQRSvg } from '../../lib/qr.js';
import { supabase } from '../../lib/supabase.js';
import useResultsStore, { FALLBACK } from '../../stores/resultsStore.js';
import useAuthStore from '../../stores/authStore.js';

export default function CirclePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { loadResults } = useResultsStore();

  const { friends, loading: friendsLoading } = useFriends();
  const { groups, loading: groupsLoading } = useGroupMap();

  const [introSeen, setIntroSeen] = useState(() =>
    localStorage.getItem('circle_intro_seen') === '1'
  );
  const [addOpen, setAddOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [inviteUrl, setInviteUrl] = useState(null);
  const [qrSvg, setQrSvg] = useState(null);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const loading = friendsLoading || groupsLoading;

  // Load current user's results for ColorForm seed 0
  useEffect(() => {
    loadResults(user?.id ?? null);
  }, [user?.id, loadResults]);

  function handleIntroSeen() {
    localStorage.setItem('circle_intro_seen', '1');
    setIntroSeen(true);
  }

  function openAdd(startTab = 0) {
    setTab(startTab);
    setAddOpen(true);
  }

  async function handleCreateInvite() {
    setInviteLoading(true);
    try {
      const session = (await supabase.auth.getSession()).data.session;
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-invite`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const { url } = await res.json();
      setInviteUrl(url);
      const svg = await generateQRSvg(`https://${url}`);
      setQrSvg(svg);
    } catch (_) {
      setInviteUrl('guli.ge/w/...');
    } finally {
      setInviteLoading(false);
    }
  }

  // Trigger invite URL on add sheet open (tab 0 or 1)
  useEffect(() => {
    if (addOpen && !inviteUrl && (tab === 0 || tab === 1)) {
      handleCreateInvite();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOpen]);

  function handleCopy() {
    if (inviteUrl) {
      navigator.clipboard.writeText(`https://${inviteUrl}`).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const group = groups[0] ?? null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px', gap: 8,
        borderBottom: '1px solid var(--line-hairline)',
        flex: 'none',
      }}>
        <span className="type-h3" style={{ flex: 1 }}>წრე</span>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* Invite buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <Button
            variant="secondary"
            size="md"
            style={{ flex: 1 }}
            onClick={() => openAdd(0)}
          >
            მოწვევა
          </Button>
          <Button
            variant="secondary"
            size="md"
            style={{ width: 64 }}
            onClick={() => openAdd(1)}
          >
            <Icon name="qr-code" size={20} color="var(--text-secondary)" />
          </Button>
        </div>

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                height: 72, borderRadius: 16,
                background: 'var(--bg-1)',
                border: '1px solid var(--line-hairline)',
                opacity: 0.5,
              }} />
            ))}
          </div>
        )}

        {/* Friend list */}
        {!loading && friends.map((f) => (
          <div
            key={f.id}
            onClick={() => navigate(`/circle/pair/${f.id}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              background: 'var(--bg-1)', borderRadius: 16,
              border: '1px solid var(--line-hairline)',
              cursor: 'pointer',
            }}
          >
            <ColorForm traits={f.traits} size={44} seed={f.seed} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="type-h3">{f.name}</span>
              <span className="type-caption" style={{ color: 'var(--text-muted)' }}>{f.archetype}</span>
            </div>
            <span
              className="type-numeral"
              style={{ fontSize: 17, color: 'var(--saperavi-tint)' }}
            >
              {f.matchScore}%
            </span>
          </div>
        ))}

        {/* Group row */}
        {!loading && group && (
          <div
            onClick={() => navigate(`/circle/group/${group.id}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              background: 'var(--bg-1)', borderRadius: 16,
              border: '1px solid var(--line-hairline)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex' }}>
              {friends.slice(0, 3).map((f, i) => (
                <ColorForm
                  key={f.id}
                  traits={f.traits}
                  size={30}
                  seed={f.seed}
                  style={{ marginLeft: i ? -10 : 0 }}
                />
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="type-h3">{group.name}</span>
              <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
                ჯგუფური რუკა · {group.memberCount ?? friends.length} წევრი
              </span>
            </div>
            <Icon name="chevron-right" size={18} color="var(--text-muted)" />
          </div>
        )}

        {!loading && (
          <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
            ჯგუფური ხედი მხოლოდ გაერთიანებულ მონაცემებს აჩვენებს
          </span>
        )}
      </div>

      {/* First-open trust sheet */}
      <BottomSheet
        open={!introSeen}
        title="რას ხედავენ მეგობრები"
        onClose={handleIntroSeen}
      >
        <p className="type-body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          მეგობრები ხედავენ შენს ფერს, არქეტიპს და თანხვედრას — არასდროს შენს პასუხებს ან ზუსტ ქულებს.
        </p>
        <Button variant="primary" size="md" onClick={handleIntroSeen}>
          გასაგებია
        </Button>
      </BottomSheet>

      {/* Add friend sheet */}
      <BottomSheet
        open={addOpen}
        title="მეგობრის დამატება"
        onClose={() => setAddOpen(false)}
      >
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['ბმულით', 'QR', 'კონტაქტებიდან'].map((label, i) => (
            <span
              key={label}
              onClick={() => setTab(i)}
              style={{
                padding: '6px 14px', borderRadius: 999,
                font: '500 13px/18px var(--font-ui)', cursor: 'pointer',
                background: tab === i ? 'var(--saperavi)' : 'var(--bg-2)',
                color: tab === i ? '#F5EDF1' : 'var(--text-secondary)',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {tab === 0 && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{
              flex: 1, padding: '14px 16px', borderRadius: 10,
              background: 'var(--bg-2)',
              font: '400 14px/1 monospace',
              color: 'var(--text-secondary)',
              wordBreak: 'break-all',
            }}>
              {inviteLoading ? 'იქმნება…' : (inviteUrl ?? 'guli.ge/w/...')}
            </span>
            <Button variant="secondary" size="md" onClick={handleCopy}>
              <Icon name="copy" size={18} color="var(--text-secondary)" />
            </Button>
          </div>
        )}

        {tab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '8px 0' }}>
            {inviteLoading ? (
              <div style={{ width: 150, height: 150, borderRadius: 12, background: 'var(--bg-2)' }} />
            ) : qrSvg ? (
              <div
                style={{ width: 150, height: 150, borderRadius: 12, overflow: 'hidden' }}
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            ) : (
              <div style={{
                width: 150, height: 150, borderRadius: 12,
                background: '#F5EDF1', padding: 12, boxSizing: 'border-box',
                display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 2,
              }}>
                {Array.from({ length: 81 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      background: ((i * 7) % 3 === 0 || i % 11 === 2 || i < 3 || i % 9 < 1)
                        ? '#120B10' : 'transparent',
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            )}
            <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
              გადაეცი ტელეფონი მაგიდის მეორე მხარეს
            </span>
          </div>
        )}

        {tab === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p className="type-body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
              კონტაქტები მხოლოდ შენს ტელეფონში მუშავდება — სერვერზე არ იტვირთება.
            </p>
            <Button variant="secondary" size="md">კონტაქტების ნახვა</Button>
          </div>
        )}

        {copied && (
          <Toast floating icon={<Icon name="check" size={14} color="var(--trait-c)" />}>
            ბმული დაკოპირდა
          </Toast>
        )}
      </BottomSheet>
    </div>
  );
}
