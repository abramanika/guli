import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * POST /functions/v1/update-visibility
 * Body: { group_id: string, show_name: boolean }
 *
 * Updates or inserts a group_consents row for the authenticated user.
 * Controls whether the user's name is shown in group title rows.
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

    const body = await req.json()
    const { group_id, show_name } = body

    if (!group_id || typeof show_name !== 'boolean') {
      return new Response(
        JSON.stringify({ error: 'Invalid request body. Required: group_id (string), show_name (boolean)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the user is a member of this group
    const { data: membership, error: memberErr } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('group_id', group_id)
      .eq('user_id', user.id)
      .single()

    if (memberErr || !membership) {
      return new Response(
        JSON.stringify({ error: 'User is not a member of this group' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Upsert consent row
    const { error: upsertError } = await supabase
      .from('group_consents')
      .upsert(
        {
          user_id: user.id,
          group_id,
          show_name,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,group_id' }
      )

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: 'Failed to update consent', details: upsertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, group_id, show_name }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
