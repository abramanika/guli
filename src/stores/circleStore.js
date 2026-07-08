import { create } from 'zustand';
import { supabase } from '../lib/supabase.js';
import { computeMatchScore } from '../lib/matchScore.js';

// Fallback data when offline / unauthenticated
export const FALLBACK_FRIENDS = [
  {
    id: '1',
    name: 'გიორგი',
    archetype: 'მემატიანე',
    traits: ['C', 'N'],
    seed: 1,
    matchScore: 78,
    scores: { E: 38, A: 66, C: 82, N: 71, O: 45 },
    colorName: 'ღია მინდვრის',
  },
  {
    id: '2',
    name: 'თამარი',
    archetype: 'მაძიებელი',
    traits: ['O', 'E'],
    seed: 2,
    matchScore: 84,
    scores: { E: 70, A: 58, C: 41, N: 49, O: 88 },
    colorName: 'ოქრო-ყვავილოვანი',
  },
  {
    id: '3',
    name: 'ლუკა',
    archetype: 'მთის ტბა',
    traits: ['N', 'C'],
    seed: 3,
    matchScore: 64,
    scores: { E: 30, A: 72, C: 68, N: 85, O: 52 },
    colorName: 'ღრმა ლურჯი',
  },
];

export const FALLBACK_GROUP = {
  id: 'g1',
  name: 'ძველი უბანი',
  colorName: 'თბილი მინანქარი',
  traits: ['A', 'C'],
  mean: { E: 50, A: 69, C: 60, N: 66, O: 65 },
  memberCount: 4,
  titles: [
    { title: 'ყველაზე გულღია მაგიდასთან', who: 'თამარი', consented: true },
    { title: 'ყველაზე გულმოდგინე', who: null, consented: false },
  ],
};

const useCircleStore = create((set, get) => ({
  friends: [],
  groups: [],
  loading: false,
  error: null,

  loadFriends: async (userId) => {
    set({ loading: true, error: null });

    try {
      if (!userId) {
        set({ friends: FALLBACK_FRIENDS, loading: false });
        return;
      }

      // Fetch accepted friendships where current user is user_a or user_b
      const { data: friendships, error: friendErr } = await supabase
        .from('friendships')
        .select('id, user_a, user_b')
        .eq('status', 'accepted')
        .or(`user_a.eq.${userId},user_b.eq.${userId}`);

      if (friendErr || !friendships || friendships.length === 0) {
        set({ friends: FALLBACK_FRIENDS, loading: false });
        return;
      }

      // Get the other user's IDs
      const friendIds = friendships.map((f) =>
        f.user_a === userId ? f.user_b : f.user_a
      );

      // Fetch profiles for those IDs
      const { data: profiles, error: profileErr } = await supabase
        .from('profiles')
        .select('id, name, archetype, traits, scores, color_name')
        .in('id', friendIds);

      if (profileErr || !profiles) {
        set({ friends: FALLBACK_FRIENDS, loading: false });
        return;
      }

      // Fetch current user scores to compute match
      const { data: myProfile } = await supabase
        .from('profiles')
        .select('scores')
        .eq('id', userId)
        .single();

      const myScores = myProfile?.scores;

      const friends = profiles.map((p, i) => {
        const scores = p.scores ?? { E: 50, A: 50, C: 50, N: 50, O: 50 };
        const matchScore = myScores
          ? computeMatchScore(myScores, scores)
          : FALLBACK_FRIENDS[i % FALLBACK_FRIENDS.length]?.matchScore ?? 70;

        // Derive top-2 traits from scores if not stored
        let traits = p.traits;
        if (!traits || traits.length === 0) {
          const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
          traits = [sorted[0][0], sorted[1][0]];
        }

        return {
          id: p.id,
          name: p.name ?? 'მეგობარი',
          archetype: p.archetype ?? '',
          traits,
          seed: friendIds.indexOf(p.id),
          matchScore,
          scores,
          colorName: p.color_name ?? '',
        };
      });

      set({ friends, loading: false });
    } catch (err) {
      set({ friends: FALLBACK_FRIENDS, loading: false, error: err.message ?? 'Unknown error' });
    }
  },

  loadGroups: async (userId) => {
    set({ loading: true, error: null });

    try {
      if (!userId) {
        set({ groups: [FALLBACK_GROUP], loading: false });
        return;
      }

      // Find groups the user belongs to
      const { data: memberships, error: memberErr } = await supabase
        .from('group_members')
        .select('group_id')
        .eq('user_id', userId);

      if (memberErr || !memberships || memberships.length === 0) {
        set({ groups: [FALLBACK_GROUP], loading: false });
        return;
      }

      const groupIds = memberships.map((m) => m.group_id);

      const { data: groups, error: groupErr } = await supabase
        .from('groups')
        .select('id, name')
        .in('id', groupIds);

      if (groupErr || !groups) {
        set({ groups: [FALLBACK_GROUP], loading: false });
        return;
      }

      // For each group, fetch members and their consent
      const enriched = await Promise.all(
        groups.map(async (g) => {
          const { data: members } = await supabase
            .from('group_members')
            .select('user_id')
            .eq('group_id', g.id);

          const memberIds = (members ?? []).map((m) => m.user_id);

          // Fetch member profiles
          const { data: memberProfiles } = await supabase
            .from('profiles')
            .select('id, name, scores, traits')
            .in('id', memberIds);

          // Compute group mean scores
          const profileList = memberProfiles ?? [];
          const mean = { E: 50, A: 50, C: 50, N: 50, O: 50 };
          if (profileList.length > 0) {
            for (const trait of ['E', 'A', 'C', 'N', 'O']) {
              const vals = profileList
                .map((p) => p.scores?.[trait])
                .filter((v) => v != null);
              if (vals.length > 0) {
                mean[trait] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
              }
            }
          }

          // Derive group traits from mean
          const sorted = Object.entries(mean).sort(([, a], [, b]) => b - a);
          const traits = [sorted[0][0], sorted[1][0]];

          // Fetch consents
          const { data: consents } = await supabase
            .from('group_consents')
            .select('user_id, show_name')
            .eq('group_id', g.id);

          const consentMap = {};
          for (const c of consents ?? []) {
            consentMap[c.user_id] = c.show_name;
          }

          // Build title rows based on highest trait values
          const traitLabels = {
            E: 'ყველაზე გულღია მაგიდასთან',
            A: 'ყველაზე გულთბილი',
            C: 'ყველაზე გულმოდგინე',
            N: 'ყველაზე მგრძნობიარე',
            O: 'ყველაზე ცნობისმოყვარე',
          };

          const titles = ['E', 'A'].map((trait) => {
            const top = [...profileList].sort(
              (a, b) => (b.scores?.[trait] ?? 0) - (a.scores?.[trait] ?? 0)
            )[0];
            const consented = top ? consentMap[top.id] === true : false;
            return {
              title: traitLabels[trait],
              who: consented ? top?.name : null,
              consented,
            };
          });

          return {
            id: g.id,
            name: g.name,
            colorName: 'ჯგუფური ფერი',
            traits,
            mean,
            memberCount: memberIds.length,
            titles,
          };
        })
      );

      set({ groups: enriched, loading: false });
    } catch (err) {
      set({ groups: [FALLBACK_GROUP], loading: false, error: err.message ?? 'Unknown error' });
    }
  },
}));

export default useCircleStore;
