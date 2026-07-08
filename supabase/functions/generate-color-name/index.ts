import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ============================================================
// Color name algorithm (mirrored from src/lib/colorName.js)
// ============================================================

// Base color nouns indexed by trait, ordered by score range:
// index 0 → 0-25, index 1 → 26-50, index 2 → 51-75, index 3 → 76-100
const BASE_NOUNS: Record<string, string[]> = {
  E: ['მზე', 'ცეცხლი', 'ალი', 'ნაპერწკალი'],       // sun, fire, flame, spark
  A: ['თიხა', 'ხავერდი', 'ამბარი', 'ზამბახი'],      // clay, velvet, amber, lily
  C: ['მარილი', 'ქვა', 'რკინა', 'ბროლი'],           // salt, stone, iron, crystal
  N: ['ზღვა', 'ტბა', 'ნისლი', 'წვიმა'],             // sea, lake, mist, rain
  O: ['ცა', 'ქარი', 'ჰორიზონტი', 'ვარსკვლავი'],    // sky, wind, horizon, star
}

// Modifier adjectives indexed by trait, ordered by score range:
// index 0 → 0-25, index 1 → 26-50, index 2 → 51-75, index 3 → 76-100
const MODIFIERS: Record<string, string[]> = {
  E: ['თბილი', 'ხმამაღალი', 'მხურვალე', 'ნათელი'],          // warm, loud, ardent, bright
  A: ['რბილი', 'მშვიდი', 'ბალახოვანი', 'ტკბილი'],           // soft, calm, verdant, sweet
  C: ['მყარი', 'მკვეთრი', 'წმინდა', 'ზუსტი'],               // firm, sharp, pure, precise
  N: ['ღრმა', 'ფარული', 'ცვალებადი', 'მღელვარე'],           // deep, hidden, changeable, turbulent
  O: ['ფართო', 'უცხო', 'ფერადი', 'თავისუფალი'],             // wide, foreign/exotic, colorful, free
}

type Scores = Record<'E' | 'A' | 'C' | 'N' | 'O', number>

function scoreToIndex(score: number): 0 | 1 | 2 | 3 {
  if (score <= 25) return 0
  if (score <= 50) return 1
  if (score <= 75) return 2
  return 3
}

function generateColorName(scores: Scores): string {
  const traits: Array<keyof Scores> = ['E', 'A', 'C', 'N', 'O']

  // Step 1: Find the top 2 traits by score value
  const sorted = [...traits].sort((a, b) => scores[b] - scores[a])
  const [trait1, trait2] = sorted

  // Step 2: Map trait #1 to a base color noun
  const nounIndex = scoreToIndex(scores[trait1])
  const noun = BASE_NOUNS[trait1][nounIndex]

  // Step 3: Map trait #2 to a modifier adjective
  const adjIndex = scoreToIndex(scores[trait2])
  const adjective = MODIFIERS[trait2][adjIndex]

  // Step 4: Combine adjective + noun
  return `${adjective} ${noun}`
}

// ============================================================
// Edge Function handler
// ============================================================

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
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

    // User client (respects RLS for reads)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    )

    // Admin client for writes that bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Authenticate user
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

    // Fetch all 5 trait scores for this user
    const { data: scoreRows, error: scoresError } = await supabase
      .from('scores')
      .select('trait, value')
      .eq('user_id', user.id)

    if (scoresError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch scores', details: scoresError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!scoreRows || scoreRows.length < 5) {
      return new Response(
        JSON.stringify({
          error: 'Incomplete scores',
          detail: `Found ${scoreRows?.length ?? 0} of 5 required trait scores`,
        }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Build scores object
    const scores = scoreRows.reduce(
      (acc: Record<string, number>, row: { trait: string; value: number }) => {
        acc[row.trait] = row.value
        return acc
      },
      {}
    ) as Scores

    // Generate color name
    const colorName = generateColorName(scores)

    // Update profiles with color_name (service role bypasses RLS)
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ color_name: colorName })
      .eq('id', user.id)

    if (updateError) {
      return new Response(
        JSON.stringify({ error: 'Failed to save color name', details: updateError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ color_name: colorName }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
