import { useMemo } from 'react';
import { assignArchetype } from '../lib/archetypes.js';
import { FALLBACK } from '../stores/resultsStore.js';

/**
 * Computes archetype from scores.
 * Falls back to FALLBACK archetype when scores are null.
 *
 * @param {{ E: number, A: number, C: number, N: number, O: number }|null} scores
 * @returns {{ key: string, name: string, tagline: string, chips: string[] }}
 */
export function useArchetype(scores) {
  return useMemo(() => {
    if (!scores) return FALLBACK.archetype;
    try {
      return assignArchetype(scores);
    } catch (_) {
      return FALLBACK.archetype;
    }
  }, [scores]);
}
