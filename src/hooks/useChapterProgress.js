import { useEffect } from 'react';
import useAssessmentStore from '../stores/assessmentStore.js';
import { supabase } from '../lib/supabase.js';

/**
 * Loads chapter progress on mount.
 * Returns { chapters, loading, error } from the assessment store.
 */
export function useChapterProgress() {
  const { chapters, loading, error, loadChapters } = useAssessmentStore();

  useEffect(() => {
    let userId = null;
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        userId = session?.user?.id ?? null;
      })
      .catch(() => {})
      .finally(() => {
        loadChapters(userId);
      });
  }, []);

  return { chapters, loading, error };
}
