import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type TraitKey = 'E' | 'A' | 'C' | 'N' | 'O'
type Scores = Record<TraitKey, number>

function computeMatchScore(scoresA: Scores, scoresB: Scores): number {
  const traits: TraitKey[] = ['E', 'A', 'C', 'N', 'O']

  let weightedSum = 0
  let totalWeight = 0

  for (const trait of traits) {
    const a = scoresA[trait]
    const b = scoresB[trait]

    // Similarity: 1 when identical, 0 when max apart (100 points difference)
    const similarity = 1 - Math.abs(a - b) / 100

    // Weight by how "opinionated" both users are (far from neutral 50)
    const weight = (Math.abs(a - 50) + Math.abs(b - 50)) / 100 + 0.5

    weightedSum += similarity * weight
    totalWeight += weight
  }

  const weightedAverage = totalWeight > 0 ? weightedSum / totalWeight : 0
  return Math.round(weightedAverage * 100)
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
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

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()
    const { friendId } = body

    if (!friendId) {
      return new Response(
        JSON.stringify({ error: 'friendId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch current user's scores
    const { data: myScoreRows, error: myScoresError } = await supabase
      .from('scores')
      .select('trait, value')
      .eq('user_id', user.id)

    if (myScoresError || !myScoreRows || myScoreRows.length < 5) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch your scores', details: myScoresError?.message }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch friend's scores — use service role to read other user's data
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: friendScoreRows, error: friendScoresError } = await supabaseAdmin
      .from('scores')
      .select('trait, value')
      .eq('user_id', friendId)

    if (friendScoresError || !friendScoreRows || friendScoreRows.length < 5) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch friend scores', details: friendScoresError?.message }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const toScoresMap = (rows: { trait: string; value: number }[]): Scores =>
      rows.reduce((acc, row) => {
        acc[row.trait as TraitKey] = row.value
        return acc
      }, {} as Scores)

    const scoresA = toScoresMap(myScoreRows)
    const scoresB = toScoresMap(friendScoreRows)

    const matchScore = computeMatchScore(scoresA, scoresB)

    return new Response(
      JSON.stringify({ matchScore }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
