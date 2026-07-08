import { create } from 'zustand';
import { supabase } from '../lib/supabase.js';

export const CHAPTER_META = [
  { n: 1, trait: 'E', title: 'კარი', count: 9 },
  { n: 2, trait: 'A', title: 'სითბო', count: 8 },
  { n: 3, trait: 'C', title: 'წესრიგი', count: 10 },
  { n: 4, trait: 'N', title: 'ზღვა', count: 9 },
  { n: 5, trait: 'O', title: 'ჰორიზონტი', count: 8 },
  { n: 6, trait: 'E', title: 'სუფრა', count: 8, fun: true },
  { n: 7, trait: 'A', title: 'გემო', count: 10, fun: true },
];

// Local fallback questions per chapter (3 of each type for demo)
const LOCAL_QUESTIONS = {
  1: [
    { id: 101, kind: 'likert', trait: 'E', text: 'სხვა ადამიანებთან ყოფნა ენერგიას მატებს.', polarity: 1, weight: 1.0 },
    { id: 102, kind: 'tt', trait: 'E', text: 'გაქვს არჩევანი:', a: 'პარტიაზე გასვლა', b: 'სახლში კარგი წიგნი', polarity: 1, weight: 1.0 },
    { id: 103, kind: 'slider', trait: 'E', text: 'ახალ ადამიანებთან საუბრის დაწყება…', poles: ['ძნელია ჩემთვის', 'ბუნებრივია ჩემთვის'], polarity: 1, weight: 1.0 },
    { id: 104, kind: 'likert', trait: 'E', text: 'მომწონს ყურადღების ცენტრში ყოფნა.', polarity: 1, weight: 1.0 },
    { id: 105, kind: 'likert', trait: 'E', text: 'ყველთან ადვილად ვებმები.', polarity: 1, weight: 1.0 },
    { id: 106, kind: 'tt', trait: 'E', text: 'ზამთრის საღამო:', a: 'ხმაურიანი გასართობი', b: 'მშვიდი ოჯახური სადილი', polarity: 1, weight: 1.0 },
    { id: 107, kind: 'likert', trait: 'E', text: 'ხალხმრავალ ადგილებს ვეძებ.', polarity: 1, weight: 1.0 },
    { id: 108, kind: 'slider', trait: 'E', text: 'მარტოობა…', poles: ['მჭირდება', 'მღლის'], polarity: -1, weight: 1.0 },
    { id: 109, kind: 'likert', trait: 'E', text: 'ვსაუბრობ, სანამ ვფიქრობ.', polarity: 1, weight: 0.8 },
  ],
  2: [
    { id: 201, kind: 'likert', trait: 'A', text: 'სხვისი კომფორტი ჩემთვის მნიშვნელოვანია.', polarity: 1, weight: 1.0 },
    { id: 202, kind: 'tt', trait: 'A', text: 'კონფლიქტში:', a: 'ვრჩები ჩემს პოზიციაზე', b: 'ვეძებ კომპრომისს', polarity: 1, weight: 1.0 },
    { id: 203, kind: 'slider', trait: 'A', text: 'სხვის პრობლემების მოსმენა…', poles: ['მაღლათებს', 'ბუნებრივია'], polarity: 1, weight: 1.0 },
    { id: 204, kind: 'likert', trait: 'A', text: 'ადვილად ვაპატიებ.', polarity: 1, weight: 1.0 },
    { id: 205, kind: 'likert', trait: 'A', text: 'ვენდობი ადამიანებს.', polarity: 1, weight: 1.0 },
    { id: 206, kind: 'tt', trait: 'A', text: 'გუნდური სამუშაო:', a: 'ყველა ბედნიერია', b: 'შედეგი მაქსიმალურია', polarity: 1, weight: 1.0 },
    { id: 207, kind: 'likert', trait: 'A', text: 'სიტყვებს ვირჩევ, რომ არ ვაწყენინო.', polarity: 1, weight: 0.9 },
    { id: 208, kind: 'slider', trait: 'A', text: 'კრიტიკა…', poles: ['ვამბობ პირდაპირ', 'ვარბილებ'], polarity: 1, weight: 1.0 },
  ],
  3: [
    { id: 301, kind: 'likert', trait: 'C', text: 'გეგმა მირჩევნია იმპროვიზაციას.', polarity: 1, weight: 1.0 },
    { id: 302, kind: 'tt', trait: 'C', text: 'შაბათი:', a: 'ყველაფერი დაგეგმილი', b: 'ვნახოთ, როგორ გამოვა', polarity: 1, weight: 1.0 },
    { id: 303, kind: 'slider', trait: 'C', text: 'სამუშაო მაგიდა…', poles: ['ქაოსური', 'მოწესრიგებული'], polarity: 1, weight: 1.0 },
    { id: 304, kind: 'likert', trait: 'C', text: 'ვასრულებ დაწყებულს.', polarity: 1, weight: 1.0 },
    { id: 305, kind: 'likert', trait: 'C', text: 'ვადების დაცვა ჩემთვის ბუნებრივია.', polarity: 1, weight: 1.0 },
    { id: 306, kind: 'tt', trait: 'C', text: 'პროექტი:', a: 'დაწყებამდე სრული გეგმა', b: 'გზაში ვმოქმედებ', polarity: 1, weight: 1.0 },
    { id: 307, kind: 'slider', trait: 'C', text: 'სპონტანური გადაწყვეტილება…', poles: ['მომწონს', 'მღელვარებს'], polarity: -1, weight: 0.9 },
    { id: 308, kind: 'likert', trait: 'C', text: 'ვასუფთავებ მას შემდეგ, რაც ვამბობ.', polarity: 1, weight: 1.0 },
    { id: 309, kind: 'likert', trait: 'C', text: 'სიებს ვაწყობ და ვაკეთებ.', polarity: 1, weight: 1.0 },
    { id: 310, kind: 'likert', trait: 'C', text: 'ვუყურებ დეტალებს.', polarity: 1, weight: 1.0 },
  ],
  4: [
    { id: 401, kind: 'likert', trait: 'N', text: 'ადვილად ვნერვიულობ.', polarity: 1, weight: 1.0 },
    { id: 402, kind: 'tt', trait: 'N', text: 'შეცდომის შემდეგ:', a: 'დიდხანს ვფიქრობ', b: 'ვიმეორებ და ვაგრძელებ', polarity: 1, weight: 1.0 },
    { id: 403, kind: 'slider', trait: 'N', text: 'სტრესული სიტუაცია…', poles: ['ვრჩები მშვიდი', 'ძლიერ მოქმედებს ჩემზე'], polarity: 1, weight: 1.0 },
    { id: 404, kind: 'likert', trait: 'N', text: 'განწყობა ხშირად იცვლება.', polarity: 1, weight: 1.0 },
    { id: 405, kind: 'likert', trait: 'N', text: 'ვშფოთავ, სანამ პრობლემა გამოჩნდება.', polarity: 1, weight: 1.0 },
    { id: 406, kind: 'tt', trait: 'N', text: 'კრიტიკა:', a: 'მაღელვებს', b: 'ინფორმაციაა ჩემთვის', polarity: 1, weight: 1.0 },
    { id: 407, kind: 'slider', trait: 'N', text: 'ემოციური სიტუაცია…', poles: ['ვართ სწრაფად', 'ვართ ნელა'], polarity: 1, weight: 0.9 },
    { id: 408, kind: 'likert', trait: 'N', text: 'ვგრძნობ, რომ სხვები ჩემზე ცუდად ფიქრობენ.', polarity: 1, weight: 1.0 },
    { id: 409, kind: 'likert', trait: 'N', text: 'ადვილად ვბრაზდები.', polarity: 1, weight: 1.0 },
  ],
  5: [
    { id: 501, kind: 'likert', trait: 'O', text: 'ახალი იდეები მაღელვებს.', polarity: 1, weight: 1.0 },
    { id: 502, kind: 'tt', trait: 'O', text: 'შვებულება:', a: 'იგივე საყვარელი ადგილი', b: 'სრულიად ახალი ქვეყანა', polarity: 1, weight: 1.0 },
    { id: 503, kind: 'slider', trait: 'O', text: 'უცხო ქალაქში გზის დაკარგვა…', poles: ['მაღიზიანებს', 'მსიამოვნებს'], polarity: 1, weight: 1.0 },
    { id: 504, kind: 'likert', trait: 'O', text: 'ფილოსოფიური კამათი მომწონს.', polarity: 1, weight: 1.0 },
    { id: 505, kind: 'likert', trait: 'O', text: 'ხელოვნება ღრმად მოქმედებს ჩემზე.', polarity: 1, weight: 1.0 },
    { id: 506, kind: 'tt', trait: 'O', text: 'ფილმი:', a: 'ნაცნობი ჟანრი, კარგი ისტორია', b: 'ექსპერიმენტული კინო', polarity: 1, weight: 1.0 },
    { id: 507, kind: 'slider', trait: 'O', text: 'ყოველდღიური რუტინა…', poles: ['ხელს მიმართავს', 'მქრობს'], polarity: -1, weight: 0.9 },
    { id: 508, kind: 'likert', trait: 'O', text: 'ვამჩნევ სილამაზეს ჩვეულ ადგილებში.', polarity: 1, weight: 1.0 },
  ],
  6: [
    { id: 601, kind: 'likert', trait: 'E', text: 'სუფრა ენერგიას მატებს.', polarity: 1, weight: 1.0 },
    { id: 602, kind: 'tt', trait: 'E', text: 'სუფრაზე:', a: 'ვლაპარაკობ ბევრს', b: 'ვუსმენ სხვებს', polarity: 1, weight: 1.0 },
    { id: 603, kind: 'slider', trait: 'E', text: 'ახალ სტუმრებთან…', poles: ['მეწყინება', 'სიხარულია'], polarity: 1, weight: 1.0 },
    { id: 604, kind: 'likert', trait: 'E', text: 'გვიანამდე ვრჩები, თუ კარგი კომპანიაა.', polarity: 1, weight: 1.0 },
    { id: 605, kind: 'likert', trait: 'E', text: 'ტოსტს სიამოვნებით ვამბობ.', polarity: 1, weight: 1.0 },
    { id: 606, kind: 'tt', trait: 'E', text: 'ზეიმი:', a: 'ვიწვევ ყველას', b: 'მხოლოდ ახლობლები', polarity: 1, weight: 1.0 },
    { id: 607, kind: 'slider', trait: 'E', text: 'ახალ სუფრაზე…', poles: ['ვჩუმდები', 'ვდომინირებ'], polarity: 1, weight: 0.8 },
    { id: 608, kind: 'likert', trait: 'E', text: 'სუფრის შემდეგ სულ ნაყოფიერება.', polarity: 1, weight: 1.0 },
  ],
  7: [
    { id: 701, kind: 'likert', trait: 'A', text: 'სხვა ადამიანების გემო მნიშვნელოვანია ჩემთვის.', polarity: 1, weight: 1.0 },
    { id: 702, kind: 'tt', trait: 'A', text: 'რესტორანში:', a: 'ვიკამათებ მენიუზე', b: 'ყველას ვეკითხები', polarity: 1, weight: 1.0 },
    { id: 703, kind: 'slider', trait: 'A', text: 'სხვისი კმაყოფილება…', poles: ['ჩემი პრიორიტეტია', 'ნაკლებ მნიშვნელოვანია'], polarity: 1, weight: 1.0 },
    { id: 704, kind: 'likert', trait: 'A', text: 'ვამოწმებ, სხვებს მოეწონათ თუ არა.', polarity: 1, weight: 1.0 },
    { id: 705, kind: 'likert', trait: 'A', text: 'ვამზადებ სხვებისთვის, ვა ჩემთვის.', polarity: 1, weight: 1.0 },
    { id: 706, kind: 'tt', trait: 'A', text: 'საჩუქარი:', a: 'სასარგებლო', b: 'ემოციური', polarity: 1, weight: 1.0 },
    { id: 707, kind: 'slider', trait: 'A', text: 'კომპრომისი…', poles: ['ძნელია', 'სიამოვნებაა'], polarity: 1, weight: 0.9 },
    { id: 708, kind: 'likert', trait: 'A', text: 'ვთვლი, რომ ადამიანები ძირითადად კეთილი არიან.', polarity: 1, weight: 1.0 },
    { id: 709, kind: 'likert', trait: 'A', text: 'ვეხმარები, თუ ვხედავ, რომ ვინმე ჭირვება.', polarity: 1, weight: 1.0 },
    { id: 710, kind: 'likert', trait: 'A', text: 'კრიტიკას ვახვევ რბილი სიტყვებით.', polarity: 1, weight: 1.0 },
  ],
};

const TRAIT_TEXT = {
  E: 'შენ ენერგიას ადამიანებისგან იღებ — სუფრა, საუბარი, სიახლე. ეს ძალა ბუნებრივია შენთვის.',
  A: 'სხვებზე ზრუნვა შენი ბუნებრივი ენაა. ამ სითბოს ადამიანები გრძნობენ.',
  C: 'წესრიგი შენთვის თავისუფლებაა. გეგმა ნიშნავს, რომ ყველაფერი ადგილზეა.',
  N: 'შენ ღრმად გრძნობ — სიხარულს და ტკივილს. ეს სიღრმე შენი ძალაა.',
  O: 'სამყარო შენთვის კითხვის ნიშნებით სავსეა — და ეს ნიშნავს, რომ ყოველთვის ხარ ცოცხალი.',
};

const useAssessmentStore = create((set, get) => ({
  chapters: [],
  currentAnswers: new Map(),
  questions: [],
  chapterScore: null,
  loading: false,
  error: null,

  loadChapters: async (userId) => {
    set({ loading: true, error: null });
    try {
      let completedIds = new Set();
      if (userId) {
        const { data, error } = await supabase
          .from('chapter_progress')
          .select('chapter_id, completed_at')
          .eq('user_id', userId)
          .not('completed_at', 'is', null);
        if (!error && data) {
          completedIds = new Set(data.map((r) => r.chapter_id));
        }
      }

      // Determine state for each chapter
      let foundCurrent = false;
      const chapters = CHAPTER_META.map((meta) => {
        let state;
        if (completedIds.has(meta.n)) {
          state = 'done';
        } else if (!foundCurrent) {
          state = 'current';
          foundCurrent = true;
        } else {
          state = 'locked';
        }
        return { ...meta, state };
      });

      set({ chapters, loading: false });
    } catch (err) {
      // Fallback: first chapter is current, rest locked
      const chapters = CHAPTER_META.map((meta, i) => ({
        ...meta,
        state: i === 0 ? 'current' : 'locked',
      }));
      set({ chapters, loading: false });
    }
  },

  loadQuestions: async (chapterId) => {
    const id = Number(chapterId);
    set({ loading: true, questions: [], currentAnswers: new Map(), chapterScore: null });
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('chapter_id', id)
        .order('position');
      if (!error && data && data.length > 0) {
        set({ questions: data, loading: false });
        return;
      }
    } catch (_) {
      // fall through to local
    }
    // Use local fallback
    const local = LOCAL_QUESTIONS[id] || [];
    set({ questions: local, loading: false });
  },

  setAnswer: (questionId, value) => {
    const map = new Map(get().currentAnswers);
    map.set(questionId, value);
    set({ currentAnswers: map });
  },

  submitChapter: async (chapterId) => {
    const { questions, currentAnswers } = get();
    const answers = Array.from(currentAnswers.entries()).map(([questionId, value]) => ({
      questionId,
      value,
    }));

    // Compute score locally
    const { computeChapterScore } = await import('../lib/scoring.js');
    const score = computeChapterScore(answers, questions);
    set({ chapterScore: score });

    // Try to persist to Supabase
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (userId) {
        // Save answers
        const rows = answers.map(({ questionId, value }) => ({
          user_id: userId,
          question_id: questionId,
          value,
        }));
        await supabase.from('answers').upsert(rows, { onConflict: 'user_id,question_id' });

        // Mark chapter complete
        await supabase.from('chapter_progress').upsert({
          user_id: userId,
          chapter_id: Number(chapterId),
          score: score?.value ?? null,
          trait: score?.trait ?? null,
          completed_at: new Date().toISOString(),
        }, { onConflict: 'user_id,chapter_id' });
      }
    } catch (_) {
      // Offline mode — score is still computed locally
    }

    return score;
  },

  reset: () => set({ currentAnswers: new Map(), questions: [], chapterScore: null }),

  getTraitText: (trait) => TRAIT_TEXT[trait] || '',
}));

export default useAssessmentStore;
