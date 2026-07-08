import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DailyQuestionCard,
  InsightCard,
  ScenarioSlider,
  ProgressDrops,
  ColorForm,
  Icon,
} from '../../design-system/index.js';
import useDailyStore from '../../stores/dailyStore.js';
import useAuthStore from '../../stores/authStore.js';
import useAssessmentStore from '../../stores/assessmentStore.js';
import { useTraitInsights } from '../../hooks/useTraitInsights.js';
import { FALLBACK } from '../../stores/resultsStore.js';

const ALL_TRAITS = ['E', 'A', 'C', 'N', 'O'];

/**
 * Pick 2 random distinct traits deterministically (based on today's date).
 */
function pickTwoTraits() {
  const dayOfYear = Math.floor(Date.now() / 86400000);
  const i1 = dayOfYear % 5;
  const i2 = (dayOfYear + 2) % 5;
  return [ALL_TRAITS[i1], ALL_TRAITS[i2]];
}

/**
 * Inner component so we can call useTraitInsights per chosen trait.
 */
function InsightPair({ traits }) {
  const ins1 = useTraitInsights(traits[0]);
  const ins2 = useTraitInsights(traits[1]);

  const note1 = ins1.notes?.[0];
  const note2 = ins2.notes?.[1] ?? ins2.notes?.[0];

  return (
    <>
      {note1 && (
        <InsightCard
          title={note1.title}
          trait={traits[0]}
          label={note1.label}
        >
          {note1.text}
        </InsightCard>
      )}
      {note2 && (
        <InsightCard
          title={note2.title}
          trait={traits[1]}
          label={note2.label}
        >
          {note2.text}
        </InsightCard>
      )}
    </>
  );
}

export default function TodayPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { chapters, loadChapters } = useAssessmentStore();
  const { todayQuestion, answered, countdown, loading, loadToday, submitAnswer } = useDailyStore();

  const [sliderValue, setSliderValue] = useState(50);

  // Load daily question on mount / user change
  useEffect(() => {
    loadToday();
  }, [user?.id, loadToday]);

  // Load chapters for ProgressDrops
  useEffect(() => {
    loadChapters(user?.id ?? null);
  }, [user?.id, loadChapters]);

  // Count completed chapters
  const doneCount = useMemo(
    () => chapters.filter((c) => c.state === 'done').length,
    [chapters]
  );

  // Pick 2 insight traits
  const insightTraits = useMemo(() => pickTwoTraits(), []);

  // Use fallback traits for portrait ColorForm
  const portraitTraits = FALLBACK.traits;

  function handleSubmit() {
    submitAnswer(sliderValue);
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
        <span className="type-h3" style={{ flex: 1 }}>დღეს</span>
        <ProgressDrops total={5} done={doneCount} size={8} />
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* Daily Question Card */}
        {answered ? (
          <DailyQuestionCard answered countdown={countdown} />
        ) : (
          <DailyQuestionCard
            question={todayQuestion?.text_ka ?? 'იტვირთება...'}
            traits={[todayQuestion?.trait ?? 'N', 'O']}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ScenarioSlider
                poleLeft={todayQuestion?.pole_left_ka ?? ''}
                poleRight={todayQuestion?.pole_right_ka ?? ''}
                value={sliderValue}
                onChange={setSliderValue}
                trait={todayQuestion?.trait ?? 'N'}
              />
              <button
                onClick={handleSubmit}
                disabled={loading || !todayQuestion}
                style={{
                  height: 44,
                  border: 'none',
                  borderRadius: 999,
                  background: 'var(--saperavi)',
                  color: '#F5EDF1',
                  font: '500 15px/1 var(--font-ui)',
                  cursor: loading || !todayQuestion ? 'not-allowed' : 'pointer',
                  opacity: loading || !todayQuestion ? 0.6 : 1,
                }}
              >
                პასუხი
              </button>
            </div>
          </DailyQuestionCard>
        )}

        {/* 2 Rotating insight cards */}
        <InsightPair traits={insightTraits} />

        {/* Portrait update row */}
        <div
          onClick={() => navigate('/map/portrait')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            background: 'var(--bg-1)',
            borderRadius: 16,
            border: '1px solid var(--line-hairline)',
            cursor: 'pointer',
          }}
        >
          <ColorForm traits={portraitTraits} size={28} seed={0} />
          <span className="type-body-sm" style={{ flex: 1 }}>შენი პორტრეტი განახლდა</span>
          <Icon name="chevron-right" size={18} color="var(--text-muted)" />
        </div>
      </div>
    </div>
  );
}
