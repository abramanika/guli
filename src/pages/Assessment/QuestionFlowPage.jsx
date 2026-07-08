import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Icon, ProgressDrops,
  LikertCard, LIKERT_LABELS, ThisOrThatPair, ScenarioSlider,
} from '../../design-system/index.js';
import { useQuestions } from '../../hooks/useQuestions.js';
import useAssessmentStore from '../../stores/assessmentStore.js';

// Convert answers map to scored value for a question
function getAnswerValue(q, localAnswer) {
  if (q.kind === 'likert') {
    // likert: 0-4 → map to 0-100
    if (localAnswer == null) return null;
    return Math.round((localAnswer / 4) * 100);
  }
  if (q.kind === 'tt') {
    if (localAnswer == null) return null;
    // 'a' = 0, 'b' = 100
    return localAnswer === 'a' ? 0 : 100;
  }
  if (q.kind === 'slider') {
    return localAnswer ?? 50;
  }
  return null;
}

export default function QuestionFlowPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { questions, loading } = useQuestions(chapterId);
  const { setAnswer, submitChapter, chapters } = useAssessmentStore();

  const [questionIndex, setQuestionIndex] = useState(0);
  // Per-question local answer state
  const [likertValue, setLikertValue] = useState(null);
  const [ttValue, setTtValue] = useState(null);
  const [sliderValue, setSliderValue] = useState(50);
  const [submitting, setSubmitting] = useState(false);

  // Reset local answer when question changes
  useEffect(() => {
    setLikertValue(null);
    setTtValue(null);
    setSliderValue(50);
  }, [questionIndex]);

  const chapter = chapters.find((c) => c.n === Number(chapterId));
  const doneCount = chapters.filter((c) => c.state === 'done').length;
  const currentIndex = chapters.findIndex((c) => c.state === 'current');

  if (loading && questions.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: 'var(--bg-0)',
      }}>
        <span className="type-body" style={{ color: 'var(--text-muted)' }}>იტვირთება…</span>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
        minHeight: '100dvh',
        background: 'var(--bg-0)',
        padding: 24,
      }}>
        <span className="type-body" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          კითხვები ვერ მოიძებნა.
        </span>
        <Button variant="ghost" size="md" onClick={() => navigate(`/assessment/${chapterId}`)}>
          უკან
        </Button>
      </div>
    );
  }

  const q = questions[questionIndex];
  const total = questions.length;
  const isLast = questionIndex === total - 1;

  // Determine if current question has been answered
  const answered =
    q.kind === 'likert' ? likertValue != null :
    q.kind === 'tt' ? ttValue != null :
    true; // slider always has a value

  const handleNext = async () => {
    // Record the answer
    const val = getAnswerValue(q, q.kind === 'likert' ? likertValue : q.kind === 'tt' ? ttValue : sliderValue);
    if (val !== null) {
      setAnswer(q.id, val);
    }

    if (isLast) {
      setSubmitting(true);
      try {
        await submitChapter(chapterId);
      } catch (err) {
        console.error('Submit failed:', err);
      } finally {
        setSubmitting(false);
        navigate(`/assessment/${chapterId}/reveal`);
      }
    } else {
      setQuestionIndex((i) => i + 1);
    }
  };

  const trait = q.trait || chapter?.trait || 'E';

  return (
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
          onClick={() => navigate(`/assessment/${chapterId}`)}
          style={{ cursor: 'pointer', display: 'inline-flex', flex: 'none' }}
        >
          <Icon name="x" size={20} color="var(--text-muted)" />
        </span>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <ProgressDrops
            total={7}
            done={doneCount}
            current={currentIndex >= 0 ? currentIndex : 0}
            size={10}
          />
        </div>
        <span style={{ width: 20 }} />
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
          კითხვა {questionIndex + 1} / {total}
        </span>

        <h2 className="type-h2" style={{ margin: 0, maxWidth: '30ch' }}>
          {q.text}
        </h2>

        {/* Likert */}
        {q.kind === 'likert' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LIKERT_LABELS.map((label, k) => (
              <LikertCard
                key={label}
                label={label}
                trait={trait}
                selected={likertValue === k}
                onClick={() => setLikertValue(k)}
              />
            ))}
          </div>
        )}

        {/* This or That */}
        {q.kind === 'tt' && (
          <ThisOrThatPair
            optionA={q.a}
            optionB={q.b}
            selected={ttValue}
            onSelect={setTtValue}
            stacked
          />
        )}

        {/* Slider */}
        {q.kind === 'slider' && (
          <ScenarioSlider
            poleLeft={q.poles?.[0] || ''}
            poleRight={q.poles?.[1] || ''}
            value={sliderValue}
            onChange={setSliderValue}
            trait={trait}
            style={{ marginTop: 20 }}
          />
        )}

        <div style={{ flex: 1 }} />

        <Button
          variant="primary"
          disabled={!answered || submitting}
          onClick={handleNext}
        >
          {submitting ? 'იტვირთება…' : 'გაგრძელება'}
        </Button>
      </div>
    </div>
  );
}
