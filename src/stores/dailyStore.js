import { create } from 'zustand';
import { supabase } from '../lib/supabase.js';

// Hardcoded fallback question for offline/no-backend mode
const FALLBACK_QUESTION = {
  id: 1,
  trait: 'N',
  text_ka: 'გადაუდებელი ცვლილება გეგმებში:',
  pole_left_ka: 'მაღიზიანებს',
  pole_right_ka: 'მახალისებს',
  scheduled_date: null,
};

/**
 * Compute countdown string to next day at 09:00
 */
function getCountdownText() {
  return 'შემდეგი კითხვა ხვალ, 09:00';
}

/**
 * Get today's date as YYYY-MM-DD string
 */
function todayISO() {
  return new Date().toISOString().split('T')[0];
}

const useDailyStore = create((set, get) => ({
  // State
  todayQuestion: null,
  answered: false,
  countdown: getCountdownText(),
  loading: false,
  error: null,

  /**
   * loadToday — fetches today's question by scheduled_date = today.
   * Also checks if the current user has already answered it.
   * Falls back to hardcoded question if backend is unavailable.
   */
  loadToday: async () => {
    set({ loading: true, error: null });

    try {
      const today = todayISO();

      // Fetch today's question
      const { data: questionData, error: questionError } = await supabase
        .from('daily_questions')
        .select('*')
        .eq('scheduled_date', today)
        .maybeSingle();

      if (questionError) throw new Error(questionError.message);

      const question = questionData ?? FALLBACK_QUESTION;
      set({ todayQuestion: question });

      // Check if user already answered
      const { data: { session } } = await supabase.auth.getSession();
      if (session && question.id) {
        const { data: answerData, error: answerError } = await supabase
          .from('daily_answers')
          .select('value')
          .eq('user_id', session.user.id)
          .eq('question_id', question.id)
          .maybeSingle();

        if (!answerError && answerData) {
          set({ answered: true });
        }
      }
    } catch (err) {
      // Offline or no data — use fallback
      set({
        todayQuestion: FALLBACK_QUESTION,
        error: err.message ?? 'Unknown error',
      });
    } finally {
      set({ loading: false });
    }
  },

  /**
   * submitAnswer(value) — saves the answer to daily_answers.
   * Works in offline mode (just marks as answered locally).
   */
  submitAnswer: async (value) => {
    const { todayQuestion } = get();
    if (!todayQuestion) return;

    // Optimistically mark as answered
    set({ answered: true });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return; // offline — local state only

      await supabase.from('daily_answers').upsert(
        {
          user_id: session.user.id,
          question_id: todayQuestion.id,
          value,
          answered_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,question_id' }
      );
    } catch (_) {
      // Swallow — answered flag remains true for good UX
    }
  },

  /**
   * Reset store (e.g. on logout)
   */
  reset: () => set({ todayQuestion: null, answered: false, loading: false, error: null }),
}));

export default useDailyStore;
