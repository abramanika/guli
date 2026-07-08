import { useNavigate, useParams } from 'react-router-dom';
import { ColorForm, HeartMap, Icon } from '../../design-system/index.js';
import { useGroupMap } from '../../hooks/useGroupMap.js';

export default function GroupPage() {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { group, loading } = useGroupMap(groupId ?? null);

  if (loading && !group) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--line-hairline)', flex: 'none' }}>
          <span onClick={() => navigate('/circle')} style={{ cursor: 'pointer', display: 'inline-flex', marginRight: 12 }}>
            <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
          </span>
          <span className="type-h3" style={{ flex: 1 }}>ჯგუფური რუკა</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="type-body-sm" style={{ color: 'var(--text-muted)' }}>იტვირთება…</span>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--line-hairline)', flex: 'none' }}>
          <span onClick={() => navigate('/circle')} style={{ cursor: 'pointer', display: 'inline-flex', marginRight: 12 }}>
            <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
          </span>
          <span className="type-h3" style={{ flex: 1 }}>ჯგუფური რუკა</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="type-body-sm" style={{ color: 'var(--text-muted)' }}>ჯგუფი ვერ მოიძებნა</span>
        </div>
      </div>
    );
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
          onClick={() => navigate('/circle')}
          style={{ cursor: 'pointer', display: 'inline-flex' }}
        >
          <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
        </span>
        <span className="type-h3" style={{ flex: 1 }}>{group.name}</span>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* Group identity */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 8, padding: '8px 0 0',
        }}>
          <ColorForm traits={group.traits} size={88} seed={2} />
          <span className="type-h2">
            თქვენი წრის ფერი: {group.colorName}
          </span>
          <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
            {group.memberCount ?? '?'} წევრი · გაერთიანებული სურათი
          </span>
        </div>

        {/* Group HeartMap */}
        <HeartMap
          scores={group.mean}
          size={280}
          style={{ alignSelf: 'center', margin: '-4px 0' }}
        />

        {/* Title rows (consent-aware) */}
        {(group.titles ?? []).map((t) => (
          <div
            key={t.title}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px',
              background: 'var(--bg-1)', borderRadius: 16,
              border: '1px solid var(--line-hairline)',
              opacity: t.consented ? 1 : 0.6,
            }}
          >
            <Icon
              name={t.consented ? 'sparkles' : 'lock'}
              size={18}
              color={t.consented ? 'var(--trait-e)' : 'var(--text-muted)'}
            />
            <span className="type-body-sm" style={{ flex: 1 }}>{t.title}:</span>
            <span
              className="type-h3"
              style={{ color: t.consented ? 'var(--text-primary)' : 'var(--text-muted)' }}
            >
              {t.consented ? t.who : 'დამალულია'}
            </span>
          </div>
        ))}

        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          ჯგუფური ხედი მხოლოდ გაერთიანებულ მონაცემებს აჩვენებს. სახელობითი წარწერა ჩანს მხოლოდ წევრის თანხმობით.
        </span>
      </div>
    </div>
  );
}
