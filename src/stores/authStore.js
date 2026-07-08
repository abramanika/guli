import { create } from 'zustand';
import { supabase } from '../lib/supabase.js';
import {
  signInWithApple as _signInWithApple,
  signInWithGoogle as _signInWithGoogle,
  signInWithPhone as _signInWithPhone,
  verifyOtp as _verifyOtp,
  signOut as _signOut,
} from '../lib/auth.js';

let authListener = null;

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,

  /**
   * Initialise auth state from an existing session and subscribe to changes.
   * Call once at app startup (e.g. inside main.jsx or a top-level component).
   */
  initialize: async () => {
    // Fetch current session
    const { data: { session } } = await supabase.auth.getSession();
    set({
      session,
      user: session?.user ?? null,
      loading: false,
    });

    // Subscribe to future auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        set({
          session,
          user: session?.user ?? null,
          loading: false,
        });
      }
    );

    authListener = subscription;
  },

  /**
   * Unsubscribe from the auth listener (call on unmount if needed).
   */
  cleanup: () => {
    authListener?.unsubscribe();
    authListener = null;
  },

  signInWithApple: async () => {
    set({ loading: true });
    try {
      await _signInWithApple();
    } finally {
      set({ loading: false });
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true });
    try {
      await _signInWithGoogle();
    } finally {
      set({ loading: false });
    }
  },

  signInWithPhone: async (phone) => {
    set({ loading: true });
    try {
      await _signInWithPhone(phone);
    } finally {
      set({ loading: false });
    }
  },

  verifyOtp: async (phone, token) => {
    set({ loading: true });
    try {
      const data = await _verifyOtp(phone, token);
      return data;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true });
    try {
      await _signOut();
      set({ user: null, session: null });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
