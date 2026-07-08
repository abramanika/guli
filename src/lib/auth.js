import { supabase } from './supabase.js';

/**
 * Sign in with Apple via Supabase OAuth.
 */
export async function signInWithApple() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
    options: {
      redirectTo: `${window.location.origin}/today`,
    },
  });
  if (error) throw error;
  return data;
}

/**
 * Sign in with Google via Supabase OAuth.
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/today`,
    },
  });
  if (error) throw error;
  return data;
}

/**
 * Send an OTP to the given phone number.
 * @param {string} phone — E.164 format, e.g. "+995599123456"
 */
export async function signInWithPhone(phone) {
  const { data, error } = await supabase.auth.signInWithOtp({ phone });
  if (error) throw error;
  return data;
}

/**
 * Verify the OTP token received via SMS.
 * @param {string} phone — E.164 format
 * @param {string} token — 6-digit OTP
 */
export async function verifyOtp(phone, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  });
  if (error) throw error;
  return data;
}

/**
 * Sign the current user out.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
