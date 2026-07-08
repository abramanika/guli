import { useEffect } from 'react';
import useAssessmentStore from '../stores/assessmentStore.js';

/**
 * Loads questions for a specific chapter on mount (or when chapterId changes).
 * Returns { questions, loading, error } from the assessment store.
 */
export function useQuestions(chapterId) {
  const { questions, loading, error, loadQuestions } = useAssessmentStore();

  useEffect(() => {
    if (chapterId != null) {
      loadQuestions(chapterId);
    }
  }, [chapterId]);

  return { questions, loading, error };
}
