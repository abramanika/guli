import { create } from 'zustand';
import { supabase } from '../lib/supabase.js';

const useOnboardingStore = create((set, get) => ({
  name: '',
  birthday: '',
  language: 'ka',

  setName: (name) => set({ name }),
  setBirthday: (birthday) => set({ birthday }),
  setLanguage: (language) => set({ language }),

  reset: () => set({ name: '', birthday: '', language: 'ka' }),

  createProfile: async () => {
    const { name, birthday, language } = get();
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('profiles')
      .insert({ user_id: userId, name, birthday, language });

    if (error) throw error;
    set({ name: '', birthday: '', language: 'ka' });
  },
}));

export default useOnboardingStore;
