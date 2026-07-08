import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import { computeScores } from '../lib/scoring.js';
import { FALLBACK } from '../stores/resultsStore.js';

/**
 * Fetches scores from Supabase for the current user.
 * Falls back to FALLBACK scores when unauthenticated or data is missing.
 *
 * @returns {{ scores: object|null, loading: boolean, error: string|null }}
 */
export function useScores() {
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchScores() {
      setLoading(true);
      setError(null);

      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          if (!cancelled) {
            setScores(FALLBACK.scores);
            setLoading(false);
          }
          return;
        }

        const userId = session.user.id;

        const [{ data: answers, error: answersErr }, { data: questions, error: questionsErr }] =
          await Promise.all([
            supabase.from('answers').select('question_id, value').eq('user_id', userId),
            supabase.from('questions').select('id, trait, polarity, weight'),
          ]);

        if (answersErr || questionsErr || !answers || !questions || answers.length === 0) {
          if (!cancelled) {
            setScores(FALLBACK.scores);
            setLoading(false);
          }
          return;
        }

        const mappedAnswers = answers.map((a) => ({ questionId: a.question_id, value: a.value }));
        const mappedQuestions = questions.map((q) => ({
          id: q.id,
          trait: q.trait,
          polarity: q.polarity,
          weight: q.weight,
        }));

        const computed = computeScores(mappedAnswers, mappedQuestions);
        // Fill missing traits from fallback
        const merged = { ...FALLBACK.scores, ...computed };

        if (!cancelled) {
          setScores(merged);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setScores(FALLBACK.scores);
          setError(err.message ?? 'Unknown error');
          setLoading(false);
        }
      }
    }

    fetchScores();
    return () => { cancelled = true; };
  }, []);

  return { scores, loading, error };
}
