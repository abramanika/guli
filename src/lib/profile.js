import { supabase } from './supabase.js';

/**
 * Create a user profile in the Supabase profiles table.
 * The user must already be authenticated.
 *
 * @param {{ name: string, birthday: string, language: string }} profile
 */
export async function createProfile({ name, birthday, language }) {
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) throw new Error('No authenticated user');

  const { data, error } = await supabase
    .from('profiles')
    .insert({ user_id: userId, name, birthday, language });

  if (error) throw error;
  return data;
}
