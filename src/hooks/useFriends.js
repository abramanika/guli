import { useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import useCircleStore from '../stores/circleStore.js';

/**
 * Loads friends list on mount for the current authenticated user.
 * Falls back to prototype FRIENDS data when offline or unauthenticated.
 *
 * @returns {{ friends: Array, loading: boolean, error: string|null }}
 */
export function useFriends() {
  const { friends, loading, error, loadFriends } = useCircleStore();

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!cancelled) {
        loadFriends(session?.user?.id ?? null);
      }
    }

    init();
    return () => { cancelled = true; };
  }, [loadFriends]);

  return { friends, loading, error };
}
