import { useMemo, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import useCircleStore from '../stores/circleStore.js';

/**
 * Computes group mean scores from member scores and loads group data.
 *
 * @param {string|null} groupId - The group ID to load (null to load all groups)
 * @returns {{ group: object|null, groups: Array, loading: boolean, error: string|null }}
 */
export function useGroupMap(groupId = null) {
  const { groups, loading, error, loadGroups } = useCircleStore();

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!cancelled) {
        loadGroups(session?.user?.id ?? null);
      }
    }

    init();
    return () => { cancelled = true; };
  }, [loadGroups]);

  const group = useMemo(() => {
    if (!groupId) return groups[0] ?? null;
    return groups.find((g) => g.id === groupId) ?? null;
  }, [groups, groupId]);

  return { group, groups, loading, error };
}

/**
 * Computes the mean scores from an array of score objects.
 *
 * @param {Array<{E:number,A:number,C:number,N:number,O:number}>} scoresList
 * @returns {{E:number,A:number,C:number,N:number,O:number}}
 */
export function computeGroupMean(scoresList) {
  if (!scoresList || scoresList.length === 0) {
    return { E: 50, A: 50, C: 50, N: 50, O: 50 };
  }

  const mean = {};
  for (const trait of ['E', 'A', 'C', 'N', 'O']) {
    const vals = scoresList.map((s) => s[trait]).filter((v) => v != null);
    mean[trait] = vals.length > 0
      ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
      : 50;
  }
  return mean;
}
