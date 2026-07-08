import { useNavigate, useParams } from 'react-router-dom';
import {
  ColorForm, HeartMap, TraitBar, InsightCard, Icon, Button,
} from '../../design-system/index.js';
import { useFriends } from '../../hooks/useFriends.js';
import useResultsStore, { FALLBACK } from '../../stores/resultsStore.js';
import useAuthStore from '../../stores/authStore.js';
import { useEffect } from 'react';

// Conversation starters keyed by the most different trait
const CONVERSATION_STARTERS = {
  E: { text: 'სად გიჩნდება ენერგია — ხალხთან ყოფნით თუ მარტოობით?', icon: 'sparkles' },
  A: { text: 'როდის გრძნობ, რომ სხვისი მოვლა შენი ენერგიის ხარჯზე ხდება?', icon: 'heart' },
  C: { text: 'გეგმა მოქნილობაა თუ პირობა? სად გავს და სად განსხვავდება?', icon: 'armchair' },
  N: { text: 'ღელვა შენთვის სტუმარია თუ მობინადრე?', icon: 'compass' },
  O: { text: 'ახალი გამოცდილება — ბუნებრივი ჩვევაა თუ გაცნობიერებული არჩევანი?', icon: 'map' },
};

// Similarity threshold: |diff| < 15 → similar, else different
const SIMILAR_THRESHOLD = 15;

function computeSimilarDifferent(myScores, friendScores) {
  const traits = ['E', 'A', 'C', 'N', 'O'];
  const similar = [];
  const different = [];

  for (const trait of traits) {
    const diff = Math.abs((myScores[trait] ?? 50) - (friendScores[trait] ?? 50));
    if (diff < SIMILAR_THRESHOLD) {
      similar.push(trait);
    } else {
      different.push(trait);
    }
  }

  return { similar, different };
}

export default function PairPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useAuthStore();
  const { scores: myScores, traits: myTraits, name: myName, loadResults } = useResultsStore();
  const { friends, loading } = useFriends();

  useEffect(() => {
    loadResults(user?.id ?? null);
  }, [user?.id, loadResults]);

  // Find friend by userId param
  const friend = friends.find((f) => f.id === userId) ?? friends[0] ?? null;

  const displayMyScores = myScores ?? FALLBACK.scores;
  const displayMyTraits = myTraits ?? FALLBACK.traits;
  const displayMyName = myName ?? FALLBACK.name;

  if (loading && !friend) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--line-hairline)', flex: 'none' }}>
          <span onClick={() => navigate('/circle')} style={{ cursor: 'pointer', display: 'inline-flex', marginRight: 12 }}>
            <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
          </span>
          <span className="type-h3" style={{ flex: 1 }}>თანხვედრა</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="type-body-sm" style={{ color: 'var(--text-muted)' }}>იტვირთება…</span>
        </div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--line-hairline)', flex: 'none' }}>
          <span onClick={() => navigate('/circle')} style={{ cursor: 'pointer', display: 'inline-flex', marginRight: 12 }}>
            <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
          </span>
          <span className="type-h3" style={{ flex: 1 }}>თანხვედრა</span>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="type-body-sm" style={{ color: 'var(--text-muted)' }}>მეგობარი ვერ მოიძებნა</span>
        </div>
      </div>
    );
  }

  const friendScores = friend.scores;
  const { similar, different } = computeSimilarDifferent(displayMyScores, friendScores);

  // Most different trait for conversation starter
  const mostDiff = [...['E', 'A', 'C', 'N', 'O']].sort(
    (a, b) =>
      Math.abs((displayMyScores[b] ?? 50) - (friendScores[b] ?? 50)) -
      Math.abs((displayMyScores[a] ?? 50) - (friendScores[a] ?? 50))
  )[0] ?? 'C';

  const starter = CONVERSATION_STARTERS[mostDiff];

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `${displayMyName} + ${friend.name} — ${friend.matchScore}% თანხვედრა`,
        url: window.location.href,
      }).catch(() => {});
    }
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
        <span className="type-h3" style={{ flex: 1 }}>თანხვედრა</span>
        <span
          onClick={handleShare}
          style={{ cursor: 'pointer', display: 'inline-flex' }}
        >
          <Icon name="share" size={20} color="var(--text-secondary)" />
        </span>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* Overlapping ColorForms */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px 0 0' }}>
          <ColorForm
            traits={displayMyTraits}
            size={72}
            seed={0}
            style={{ marginRight: -18, mixBlendMode: 'screen' }}
          />
          <ColorForm
            traits={friend.traits}
            size={72}
            seed={friend.seed}
            style={{ mixBlendMode: 'screen' }}
          />
        </div>

        {/* Match % */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span className="type-display type-numeral" style={{ fontSize: 48, fontWeight: 700, color: 'var(--saperavi-tint)' }}>
            {friend.matchScore}%
          </span>
          <span className="type-body-sm" style={{ color: 'var(--text-secondary)' }}>
            {displayMyName} + {friend.name}
          </span>
        </div>

        {/* HeartMap with secondScores overlay */}
        <HeartMap
          scores={displayMyScores}
          secondScores={friendScores}
          size={250}
          showLabels={false}
          style={{ alignSelf: 'center', margin: '-10px 0' }}
        />

        {/* Similar traits */}
        {similar.length > 0 && (
          <>
            <span className="type-h3">სად ჰგავხართ</span>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              padding: 16,
              background: 'var(--bg-1)', borderRadius: 16,
              border: '1px solid var(--line-hairline)',
            }}>
              {similar.map((trait) => (
                <TraitBar
                  key={trait}
                  trait={trait}
                  value={displayMyScores[trait] ?? 50}
                  secondValue={friendScores[trait] ?? 50}
                />
              ))}
            </div>
          </>
        )}

        {/* Different traits */}
        {different.length > 0 && (
          <>
            <span className="type-h3">სად განსხვავდებით</span>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 8,
              padding: 16,
              background: 'var(--bg-1)', borderRadius: 16,
              border: '1px solid var(--line-hairline)',
            }}>
              {different.map((trait) => (
                <TraitBar
                  key={trait}
                  trait={trait}
                  value={displayMyScores[trait] ?? 50}
                  secondValue={friendScores[trait] ?? 50}
                />
              ))}
            </div>
          </>
        )}

        {/* Conversation starter InsightCard */}
        <InsightCard
          title="კითხვა საღამოსთვის"
          trait={mostDiff}
          label={null}
          icon={<Icon name={starter.icon} size={18} color={`var(--trait-${mostDiff.toLowerCase()})`} />}
        >
          {starter.text.replace('{friend}', friend.name)}
        </InsightCard>
      </div>
    </div>
  );
}
