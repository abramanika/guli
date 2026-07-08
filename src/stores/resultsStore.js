import { create } from 'zustand';
import { supabase } from '../lib/supabase.js';
import { computeScores } from '../lib/scoring.js';
import { assignArchetype } from '../lib/archetypes.js';
import { generateColorName } from '../lib/colorName.js';

// Prototype fallback data (offline / unauthenticated)
export const FALLBACK = {
  name: 'ნინო',
  colorName: 'თბილი ცა',
  traits: ['A', 'O'],
  scores: { E: 62, A: 81, C: 47, N: 58, O: 74 },
  archetype: {
    key: 'host',
    name: 'მასპინძელი',
    tagline: 'შენ ის ხარ, ვინც სუფრას ერთი კითხვით ცვლის.',
    chips: ['გულღია', 'გულთბილი', 'მაძიებელი'],
  },
};

const useResultsStore = create((set, get) => ({
  scores: null,
  archetype: null,
  colorName: null,
  name: null,
  traits: null,
  loading: false,
  error: null,

  loadResults: async (userId) => {
    set({ loading: true, error: null });

    try {
      if (!userId) {
        // No user — use fallback data
        set({
          scores: FALLBACK.scores,
          archetype: FALLBACK.archetype,
          colorName: FALLBACK.colorName,
          name: FALLBACK.name,
          traits: FALLBACK.traits,
          loading: false,
        });
        return;
      }

      // Fetch answers + questions from Supabase
      const { data: answers, error: answersErr } = await supabase
        .from('answers')
        .select('question_id, value')
        .eq('user_id', userId);

      const { data: questions, error: questionsErr } = await supabase
        .from('questions')
        .select('id, trait, polarity, weight');

      if (answersErr || questionsErr || !answers || !questions || answers.length === 0) {
        // No data yet — use fallback
        set({
          scores: FALLBACK.scores,
          archetype: FALLBACK.archetype,
          colorName: FALLBACK.colorName,
          name: FALLBACK.name,
          traits: FALLBACK.traits,
          loading: false,
        });
        return;
      }

      const mappedAnswers = answers.map((a) => ({
        questionId: a.question_id,
        value: a.value,
      }));

      const mappedQuestions = questions.map((q) => ({
        id: q.id,
        trait: q.trait,
        polarity: q.polarity,
        weight: q.weight,
      }));

      const scores = computeScores(mappedAnswers, mappedQuestions);

      // Check if all scores are present
      const hasAllScores = ['E', 'A', 'C', 'N', 'O'].every((t) => scores[t] != null);
      if (!hasAllScores) {
        set({
          scores: { ...FALLBACK.scores, ...scores },
          archetype: assignArchetype({ ...FALLBACK.scores, ...scores }),
          colorName: generateColorName({ ...FALLBACK.scores, ...scores }),
          name: FALLBACK.name,
          traits: FALLBACK.traits,
          loading: false,
        });
        return;
      }

      const archetype = assignArchetype(scores);
      const colorName = generateColorName(scores);

      // Derive top-2 traits from scores
      const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
      const traits = [sorted[0][0], sorted[1][0]];

      // Try to fetch user's name from profile
      let name = FALLBACK.name;
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', userId)
          .single();
        if (profile?.name) name = profile.name;
      } catch (_) {
        // use default
      }

      set({ scores, archetype, colorName, name, traits, loading: false });
    } catch (err) {
      set({
        scores: FALLBACK.scores,
        archetype: FALLBACK.archetype,
        colorName: FALLBACK.colorName,
        name: FALLBACK.name,
        traits: FALLBACK.traits,
        loading: false,
        error: err.message ?? 'Unknown error',
      });
    }
  },
}));

export default useResultsStore;
