import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ============================================================
// Archetype definitions (mirrored from src/lib/archetypes.js)
// ============================================================

interface Condition {
  trait: 'E' | 'A' | 'C' | 'N' | 'O'
  min?: number
  max?: number
  threshold: number
}

interface Archetype {
  key: string
  name: string
  tagline: string
  chips: string[]
  conditions: Condition[]
}

const ARCHETYPES: Record<string, Archetype> = {
  host: {
    key: 'host',
    name: 'მასპინძელი',
    tagline: 'შენ ის ხარ, ვინც სუფრას ერთი კითხვით ცვლის.',
    chips: ['თბილი', 'გულღია', 'დამაკავშირებელი'],
    conditions: [
      { trait: 'E', min: 65, threshold: 65 },
      { trait: 'A', min: 65, threshold: 65 },
    ],
  },
  chronicler: {
    key: 'chronicler',
    name: 'მემატიანე',
    tagline: 'შენ ყოველ დეტალს ინახავ — რადგან დეტალებში სიცოცხლეა.',
    chips: ['ყურადღებიანი', 'ზუსტი', 'მეხსიერების მცველი'],
    conditions: [
      { trait: 'C', min: 70, threshold: 70 },
      { trait: 'N', min: 55, threshold: 55 },
    ],
  },
  seeker: {
    key: 'seeker',
    name: 'მაძიებელი',
    tagline: 'შენთვის ყოველი შემთხვევითი ქუჩა ახალი ამბავია.',
    chips: ['ცნობისმოყვარე', 'თავგამოდებული', 'ღია'],
    conditions: [
      { trait: 'O', min: 70, threshold: 70 },
      { trait: 'E', min: 55, threshold: 55 },
    ],
  },
  mountain_lake: {
    key: 'mountain_lake',
    name: 'მთის ტბა',
    tagline: 'შენი სიღრმე მშვიდ ზედაპირს ქვეშ იმალება.',
    chips: ['ღრმა', 'მგრძნობიარე', 'ინტროსპექტული'],
    conditions: [
      { trait: 'N', min: 65, threshold: 65 },
      { trait: 'C', min: 55, threshold: 55 },
    ],
  },
  bridge: {
    key: 'bridge',
    name: 'ხიდი',
    tagline: 'შენ ის ხარ, ვინც ხალხს ერთმანეთს აკავშირებს.',
    chips: ['მშვიდობისმყოფელი', 'ემპათიური', 'შუამავალი'],
    conditions: [
      { trait: 'E', min: 60, threshold: 60 },
      { trait: 'A', min: 55, threshold: 55 },
      { trait: 'O', min: 55, threshold: 55 },
    ],
  },
  guardian: {
    key: 'guardian',
    name: 'მცველი',
    tagline: 'შენი სიყვარული საქმეში ჩანს, არა სიტყვებში.',
    chips: ['სანდო', 'მზრუნველი', 'პასუხისმგებელი'],
    conditions: [
      { trait: 'A', min: 65, threshold: 65 },
      { trait: 'C', min: 60, threshold: 60 },
    ],
  },
  flame: {
    key: 'flame',
    name: 'ალი',
    tagline: 'შენი ენერგია ოთახს ავსებს — და ყველას ეყოფა.',
    chips: ['ენერგიული', 'სპონტანური', 'გამათბობელი'],
    conditions: [
      { trait: 'E', min: 70, threshold: 70 },
      { trait: 'N', max: 40, threshold: 40 },
    ],
  },
  weaver: {
    key: 'weaver',
    name: 'მქსოველი',
    tagline: 'შენ იდეებს ხალხთან ერთად ქსოვ.',
    chips: ['შემოქმედებითი', 'თანამშრომელი', 'ინტუიციური'],
    conditions: [
      { trait: 'O', min: 65, threshold: 65 },
      { trait: 'A', min: 60, threshold: 60 },
    ],
  },
  anchor: {
    key: 'anchor',
    name: 'ღუზა',
    tagline: 'შენს სიმშვიდეს სხვები ეყრდნობიან.',
    chips: ['სტაბილური', 'მდგრადი', 'საყრდენი'],
    conditions: [
      { trait: 'C', min: 70, threshold: 70 },
      { trait: 'N', max: 45, threshold: 45 },
    ],
  },
  wanderer: {
    key: 'wanderer',
    name: 'მოხეტიალე',
    tagline: 'შენი სამყარო შიგნითაა — და უსაზღვროა.',
    chips: ['ინტროვერტი', 'ფილოსოფოსი', 'მოჩვენებითი'],
    conditions: [
      { trait: 'O', min: 70, threshold: 70 },
      { trait: 'E', max: 45, threshold: 45 },
    ],
  },
  healer: {
    key: 'healer',
    name: 'მკურნალი',
    tagline: 'სხვისი ტკივილი შენი საზრუნავია — მაგრამ ვინ გიზრუნავს შენ?',
    chips: ['თანაგრძნობიანი', 'გამგებიანი', 'დამხმარე'],
    conditions: [
      { trait: 'A', min: 70, threshold: 70 },
      { trait: 'N', min: 60, threshold: 60 },
    ],
  },
  craftsman: {
    key: 'craftsman',
    name: 'ხელოსანი',
    tagline: 'შენთვის ხარისხი ცხოვრების წესია.',
    chips: ['პერფექციონისტი', 'თანმიმდევრული', 'ოსტატი'],
    conditions: [
      { trait: 'C', min: 65, threshold: 65 },
      { trait: 'O', min: 55, threshold: 55 },
    ],
  },
}

type Scores = Record<'E' | 'A' | 'C' | 'N' | 'O', number>

function conditionMet(condition: Condition, scores: Scores): boolean {
  const value = scores[condition.trait]
  if (value == null) return false
  if (condition.min != null && value < condition.min) return false
  if (condition.max != null && value > condition.max) return false
  return true
}

function evaluateArchetype(
  archetype: Archetype,
  scores: Scores
): { matches: boolean; fitScore: number; gap: number } {
  let fitScore = 0
  let gap = 0
  let allMet = true

  for (const cond of archetype.conditions) {
    const value = scores[cond.trait] ?? 0
    const met = conditionMet(cond, scores)

    if (met) {
      if (cond.min != null) fitScore += value - cond.threshold
      else if (cond.max != null) fitScore += cond.threshold - value
    } else {
      allMet = false
      if (cond.min != null) gap += cond.min - value
      else if (cond.max != null) gap += value - cond.max
    }
  }

  return { matches: allMet, fitScore, gap }
}

function assignArchetype(scores: Scores): {
  key: string
  name: string
  tagline: string
  chips: string[]
} {
  const archetypeList = Object.values(ARCHETYPES)

  const evaluated = archetypeList.map((arch) => ({
    archetype: arch,
    ...evaluateArchetype(arch, scores),
  }))

  const matching = evaluated.filter((e) => e.matches)

  let chosen: (typeof evaluated)[0]
  if (matching.length > 0) {
    chosen = matching.reduce((best, curr) =>
      curr.fitScore > best.fitScore ? curr : best
    )
  } else {
    chosen = evaluated.reduce((best, curr) =>
      curr.gap < best.gap ? curr : best
    )
  }

  const { key, name, tagline, chips } = chosen.archetype
  return { key, name, tagline, chips }
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

    // Assign archetype
    const result = assignArchetype(scores)

    // Upsert into user_archetypes (service role bypasses RLS)
    const { error: upsertError } = await supabaseAdmin
      .from('user_archetypes')
      .upsert(
        {
          user_id: user.id,
          archetype_key: result.key,
          name_ka: result.name,
          tagline_ka: result.tagline,
          chips: result.chips,
          assigned_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: 'Failed to save archetype', details: upsertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ archetype: result }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
