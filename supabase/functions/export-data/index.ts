import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

/**
 * GET /functions/v1/export-data
 *
 * Returns a JSON export of all user data organised by category.
 * The response can be downloaded as a .json file by the client.
 */
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'GET') {
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

    const userId = user.id

    // Fetch from all user tables
    const [
      profiles,
      answers,
      scores,
      chapter_progress,
      daily_answers,
      portraits,
      trait_insights,
      trait_summaries,
      user_archetypes,
      group_consents,
      group_members,
      friendships,
      invite_links,
    ] = await Promise.all([
      supabase.from('profiles').select('*').eq('user_id', userId),
      supabase.from('answers').select('*').eq('user_id', userId),
      supabase.from('scores').select('*').eq('user_id', userId),
      supabase.from('chapter_progress').select('*').eq('user_id', userId),
      supabase.from('daily_answers').select('*').eq('user_id', userId),
      supabase.from('portraits').select('*').eq('user_id', userId),
      supabase.from('trait_insights').select('*').eq('user_id', userId),
      supabase.from('trait_summaries').select('*').eq('user_id', userId),
      supabase.from('user_archetypes').select('*').eq('user_id', userId),
      supabase.from('group_consents').select('*').eq('user_id', userId),
      supabase.from('group_members').select('*').eq('user_id', userId),
      supabase.from('friendships').select('*').eq('user_id', userId),
      supabase.from('invite_links').select('*').eq('user_id', userId),
    ])

    const exportData = {
      exported_at: new Date().toISOString(),
      user_id: userId,
      profile: profiles.data ?? [],
      assessment: {
        answers: answers.data ?? [],
        scores: scores.data ?? [],
        chapter_progress: chapter_progress.data ?? [],
        portraits: portraits.data ?? [],
        trait_insights: trait_insights.data ?? [],
        trait_summaries: trait_summaries.data ?? [],
        user_archetypes: user_archetypes.data ?? [],
      },
      daily: {
        daily_answers: daily_answers.data ?? [],
      },
      social: {
        group_consents: group_consents.data ?? [],
        group_members: group_members.data ?? [],
        friendships: friendships.data ?? [],
        invite_links: invite_links.data ?? [],
      },
    }

    return new Response(
      JSON.stringify(exportData, null, 2),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="guli-data-export.json"',
        },
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
