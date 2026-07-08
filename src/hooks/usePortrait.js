import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';

/**
 * Fetches the user's literary personality portrait from Supabase.
 * Falls back to calling the generate-portrait Edge Function if no portrait exists.
 *
 * Returns: { paragraphs, loading, error, regenerate }
 *   paragraphs  — array of 5 Georgian text strings, or null while loading
 *   loading     — true while fetching or generating
 *   error       — string error message or null
 *   regenerate  — call to force a new portrait generation (increments version)
 */
export function usePortrait() {
  const [paragraphs, setParagraphs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generate = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Not authenticated');
        return;
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(
        `${supabaseUrl}/functions/v1/generate-portrait`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${response.status}`);
      }

      const data = await response.json();
      setParagraphs(data.paragraphs ?? null);
    } catch (err) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrGenerate = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Not authenticated');
        return;
      }

      // Try to read an existing portrait from the database first
      const { data: existing, error: fetchError } = await supabase
        .from('portraits')
        .select('paragraphs')
        .eq('user_id', session.user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        // PGRST116 = row not found; anything else is a real error
        throw new Error(fetchError.message);
      }

      if (existing?.paragraphs && Array.isArray(existing.paragraphs) && existing.paragraphs.length === 5) {
        setParagraphs(existing.paragraphs);
        return;
      }

      // No portrait yet — generate one via the Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(
        `${supabaseUrl}/functions/v1/generate-portrait`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${response.status}`);
      }

      const data = await response.json();
      setParagraphs(data.paragraphs ?? null);
    } catch (err) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrGenerate();
  }, [fetchOrGenerate]);

  return { paragraphs, loading, error, regenerate: generate };
}
