import React from 'react';
import PageTransition from '../../components/PageTransition.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Icon, ProgressDrops, TRAITS,
} from '../../design-system/index.js';
import { useChapterProgress } from '../../hooks/useChapterProgress.js';

export default function ChapterHomePage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { chapters, loading } = useChapterProgress();

  const doneCount = chapters.filter((c) => c.state === 'done').length;
  const currentIndex = chapters.findIndex((c) => c.state === 'current');

  return (
    <PageTransition>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100dvh',
      background: 'var(--bg-0)',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        gap: 8,
        borderBottom: '1px solid var(--line-hairline)',
      }}>
        <span
          onClick={() => navigate('/map')}
          style={{ cursor: 'pointer', display: 'inline-flex', flex: 'none' }}
        >
          <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
        </span>
        <span className="type-h3" style={{ flex: 1, textAlign: 'center' }}>შენი წიგნი</span>
        <span style={{ width: 22 }} />
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        <ProgressDrops
          total={7}
          done={doneCount}
          current={currentIndex >= 0 ? currentIndex : 0}
          style={{ margin: '4px 0 12px' }}
        />

        {loading && chapters.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
            <span className="type-body">იტვირთება…</span>
          </div>
        ) : (
          chapters.map((c) => {
            const hex = (TRAITS[c.trait] || TRAITS.E).hex;
            const locked = c.state === 'locked';
            const current = c.state === 'current';
            const done = c.state === 'done';

            return (
              <div
                key={c.n}
                className={current ? 'pressable' : undefined}
                onClick={current ? () => navigate(`/assessment/${c.n}/questions`) : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '16px',
                  background: 'var(--bg-1)',
                  borderRadius: 16,
                  border: '1px solid ' + (current ? hex : 'var(--line-hairline)'),
                  boxShadow: current ? `0 0 24px ${hex}1F` : 'none',
                  opacity: locked ? 0.4 : 1,
                  cursor: current ? 'pointer' : 'default',
                }}
              >
                {/* Droplet indicator */}
                <span style={{
                  width: 16,
                  height: 16,
                  transform: 'rotate(45deg)',
                  borderRadius: '50% 50% 50% 4px',
                  flex: 'none',
                  background: done ? hex : current ? `${hex}66` : 'var(--bg-2)',
                  border: done ? 'none' : `1px solid ${current ? hex : 'var(--line-hairline)'}`,
                  animation: current ? 'guli-pulse 1.8s ease-in-out infinite' : 'none',
                }} />

                {/* Text */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span className="type-h3">თავი {c.n} · {c.title}</span>
                  <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
                    {c.count} კითხვა{c.fun ? ' · სახალისო' : ''}
                  </span>
                </div>

                {/* State indicator */}
                {done && <Icon name="check" size={18} color={hex} />}
                {current && (
                  <span className="type-caption" style={{ color: hex }}>გაგრძელება</span>
                )}
                {locked && <Icon name="lock" size={16} color="var(--text-muted)" />}
              </div>
            );
          })
        )}

        <span
          className="type-caption"
          style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}
        >
          საფუძველი: ვალიდირებული ქართული პიროვნების კითხვარი
        </span>
      </div>
    </div>
    </PageTransition>
  );
}
