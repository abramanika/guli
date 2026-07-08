import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';

/**
 * Fallback data from the prototype's TRAIT_DETAILS (hardcoded Georgian text).
 * Used when no backend data is available (offline / no-auth / not yet generated).
 */
const FALLBACK_TRAIT_DETAILS = {
  E: {
    intro:
      'გულჩათხრობილობა სიღრმეა: ენერგია შიგნით გროვდება და რჩეულ ხალხს ხმარდება. გულღიაობა კი კარია: ენერგია ხალხში იბადება და ხალხშივე ბრუნდება. შენ კარისკენ იხრები — მაგრამ ზღურბლს არ კარგავ.',
    notes: [
      { title: 'შენი ენერგია', text: 'ხალხთან ყოფნა გმუხტავს, მაგრამ დღეში ერთი მშვიდი საათი შენთვის აუცილებელია.', label: 'კვლევითი საფუძველი' },
      { title: 'სუფრასთან', text: 'სადღეგრძელოს დაწყება შენთვის ბუნებრივია — განსაკუთრებით, როცა მაგიდას ახალი სახე უზის.', label: 'კვლევითი საფუძველი' },
      { title: 'სახალისო შტრიხი', text: 'ალბათობა, რომ წვეულებიდან ბოლო წახვალ: საგრძნობი.', label: 'სახალისო' },
    ],
    circle: 'შენს წრეში შენ ხშირად ხიდი ხარ — გულჩათხრობილ მეგობრებს შენით ეხსნებათ კარი.',
  },
  A: {
    intro:
      'გულცივობა დისტანციაა, რომელიც აზრს იცავს; გულთბილობა — სიახლოვე, რომელიც ადამიანებს იცავს. შენ მკვეთრად თბილი მხარეს დგახარ.',
    notes: [
      { title: 'პირველი ზარი', text: 'როცა მეგობარი ნაწყენია, პირველი შენ ურეკავ — შენს წრეში ეს იშვიათი თვისებაა.', label: 'კვლევითი საფუძველი' },
      { title: 'საზღვრები', text: 'სითბო ზოგჯერ საკუთარი საზღვრების ხარჯზე გაქვს — ეს დასაფიქრებელია, არა გამოსასწორებელი.', label: 'კვლევითი საფუძველი' },
      { title: 'სახალისო შტრიხი', text: 'შენთან ნასადილევს არავინ მიდის მშიერი. არც ნაწყენი.', label: 'სახალისო' },
    ],
    circle: 'კონფლიქტისას შენ ხშირად შუამავალი ხდები — ფრთხილად, ორივე მხარეს ნუ აიღებ საკუთარ თავზე.',
  },
  C: {
    intro:
      'უდარდელობა მოქნილობაა — გეგმა მონახაზია და არა კანონი. გულმოდგინება კი რწმენაა, რომ დეტალები პატივისცემაა. შენ შუაში დგახარ, მცირე გადახრით იმპროვიზაციისკენ.',
    notes: [
      { title: 'გეგმები', text: 'დაწყება გიადვილდება, დასრულება — ხასიათზეა დამოკიდებული. მოკლე ვადები შენი მოკავშირეა.', label: 'კვლევითი საფუძველი' },
      { title: 'დეტალები', text: 'დიდი სურათი გხიბლავს, წვრილმანები გღლის — კარგ დუეტს ქმნი გულმოდგინე ადამიანებთან.', label: 'კვლევითი საფუძველი' },
      { title: 'სახალისო შტრიხი', text: 'ჩამონათვალს წერ. ჩამონათვალს კარგავ. ახალს წერ — უკეთესს.', label: 'სახალისო' },
    ],
    circle: 'გიორგისთან ეს შენი მთავარი განსხვავებაა — და ალბათ ყველაზე საინტერესო სასაუბრო.',
  },
  N: {
    intro:
      'გულფიცხობა ცეცხლია — რეაქცია სწრაფად მოდის და სწრაფად მიდის. გულმშვიდობა კი ტბაა. შენ ტბისკენ იხრები, თუმცა ღელვა სტუმრად გეწვევა ხოლმე.',
    notes: [
      { title: 'ღელვის რიტმი', text: 'ღელვა მოდის, როცა საქმე ბევრია, და მიდის, როცა საყვარელ ხალხთან ზიხარ.', label: 'კვლევითი საფუძველი' },
      { title: 'აღდგენა', text: 'ცუდი დღის შემდეგ შენი აღდგენა სწრაფია — ძილი და ერთი კარგი საუბარი ყოფნის.', label: 'კვლევითი საფუძველი' },
      { title: 'სახალისო შტრიხი', text: 'შენი „კარგად ვარ" 90%-ში მართალია. დანარჩენ 10%-ს ჩაი სჭირდება.', label: 'სახალისო' },
    ],
    circle: 'ლუკასთან ამ ღერძზე ახლოს ხართ — ამიტომაა თქვენი დუმილიც კომფორტული.',
  },
  O: {
    intro:
      'ჩვეულის ერთგულება ფესვია — გამოცდილი გზები სიმშვიდეს იძლევა. მაძიებლობა კი ჰორიზონტია. შენ ჰორიზონტისკენ იყურები: ყოველი შემთხვევითი ქუჩა ახალი ამბავია.',
    notes: [
      { title: 'ახალი კარები', text: 'უცხო ქალაქში გზის დაკარგვა უფრო გახალისებს, ვიდრე გაღიზიანებს.', label: 'კვლევითი საფუძველი' },
      { title: 'იდეები', text: 'საუბარში ხშირად შენ შემოგაქვს მოულოდნელი კუთხე — წრე ამას შენგან ელის.', label: 'კვლევითი საფუძველი' },
      { title: 'სახალისო შტრიხი', text: 'მენიუდან ყოველთვის იმას უკვეთავ, რაც ჯერ არ გისინჯავს. თითქმის ყოველთვის.', label: 'სახალისო' },
    ],
    circle: 'თამართან ეს საერთო ენაა — ორივე მაძიებელი ხართ, უბრალოდ სხვადასხვა რუკით.',
  },
};

/**
 * Hook: useTraitInsights(trait)
 *
 * Returns { intro, notes, circleText, loading, error }
 *
 * Fetches from trait_summaries + trait_insights tables.
 * Falls back to hardcoded prototype data when unauthenticated or data is not yet generated.
 *
 * @param {string} trait - One of 'E', 'A', 'C', 'N', 'O'
 * @returns {{ intro: string|null, notes: Array<{title: string, text: string, label: string}>|null, circleText: string|null, loading: boolean, error: string|null }}
 */
export function useTraitInsights(trait) {
  const [intro, setIntro] = useState(null);
  const [notes, setNotes] = useState(null);
  const [circleText, setCircleText] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInsights = useCallback(async () => {
    if (!trait || !['E', 'A', 'C', 'N', 'O'].includes(trait)) {
      setError(`Invalid trait: ${trait}`);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Not authenticated — use fallback data
        const fallback = FALLBACK_TRAIT_DETAILS[trait];
        setIntro(fallback.intro);
        setNotes(fallback.notes);
        setCircleText(fallback.circle);
        return;
      }

      const userId = session.user.id;

      // Fetch summary (intro + circle_text)
      const { data: summaryData, error: summaryError } = await supabase
        .from('trait_summaries')
        .select('intro, circle_text')
        .eq('user_id', userId)
        .eq('trait', trait)
        .single();

      if (summaryError && summaryError.code !== 'PGRST116') {
        throw new Error(summaryError.message);
      }

      // Fetch insight cards for this trait
      const { data: insightRows, error: insightsError } = await supabase
        .from('trait_insights')
        .select('title, body, label, sort_order')
        .eq('user_id', userId)
        .eq('trait', trait)
        .order('sort_order', { ascending: true });

      if (insightsError) {
        throw new Error(insightsError.message);
      }

      // If nothing stored yet, fall back to prototype data
      if (!summaryData || !insightRows || insightRows.length === 0) {
        const fallback = FALLBACK_TRAIT_DETAILS[trait];
        setIntro(fallback.intro);
        setNotes(fallback.notes);
        setCircleText(fallback.circle);
        return;
      }

      // Map DB label values back to Georgian display strings
      const labelDisplay = {
        research: 'კვლევითი საფუძველი',
        fun: 'სახალისო',
      };

      const mappedNotes = insightRows.map((row) => ({
        title: row.title,
        text: row.body,
        label: labelDisplay[row.label] ?? row.label,
      }));

      setIntro(summaryData.intro);
      setNotes(mappedNotes);
      setCircleText(summaryData.circle_text);
    } catch (err) {
      setError(err.message ?? 'Unknown error');

      // On error, still provide fallback data so the UI is not empty
      const fallback = FALLBACK_TRAIT_DETAILS[trait];
      if (fallback) {
        setIntro(fallback.intro);
        setNotes(fallback.notes);
        setCircleText(fallback.circle);
      }
    } finally {
      setLoading(false);
    }
  }, [trait]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  return { intro, notes, circleText, loading, error };
}
