import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * POST /functions/v1/delete-account
 *
 * GDPR-compliant full account wipe.
 * Deletes all user data from every table, then removes the auth user.
 */
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // User-scoped client to verify identity
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = user.id

    // Service-role client for admin operations (delete auth user)
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Delete from all user-data tables in dependency order
    // (child tables first, then parent tables)
    const tablesToDelete: string[] = [
      'portraits',
      'trait_insights',
      'trait_summaries',
      'user_archetypes',
      'scores',
      'answers',
      'chapter_progress',
      'daily_answers',
      'group_consents',
      'group_members',
      'friendships',
      'invite_links',
      'profiles',
    ]

    for (const table of tablesToDelete) {
      const { error } = await adminClient
        .from(table)
        .delete()
        .eq('user_id', userId)

      if (error) {
        // Log but continue — the row may not exist in every table
        console.warn(`[delete-account] Failed to delete from ${table}:`, error.message)
      }
    }

    // Finally, delete the auth user itself
    const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(userId)

    if (deleteUserError) {
      return new Response(
        JSON.stringify({ error: 'Failed to delete auth user', details: deleteUserError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
