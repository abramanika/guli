import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type TraitKey = 'E' | 'A' | 'C' | 'N' | 'O'
type Scores = Record<TraitKey, number>

interface InsightNote {
  title: string
  text: string
  label: 'კვლევითი საფუძველი' | 'სახალისო'
}

interface TraitInsightResult {
  intro: string
  notes: InsightNote[]
  circle: string
}

// ============================================================
// Trait label helpers
// ============================================================

function traitLabel(trait: TraitKey, score: number): string {
  const labels: Record<TraitKey, [string, string, string]> = {
    E: ['ინტროვერტული', 'ზომიერად ექსტრავერტული', 'ძლიერ ექსტრავერტული'],
    A: ['დამოუკიდებელი', 'ზომიერად კეთილგანწყობილი', 'ძალიან კეთილგანწყობილი'],
    C: ['სპონტანური', 'ზომიერად გულდასმილი', 'ძალიან გულდასმილი'],
    N: ['ემოციურად სტაბილური', 'ზომიერად მგრძნობიარე', 'ძლიერ მგრძნობიარე'],
    O: ['კონვენციური', 'ზომიერად ღია', 'ძალიან ღია გამოცდილებისთვის'],
  }
  const [low, mid, high] = labels[trait]
  if (score <= 40) return low
  if (score <= 65) return mid
  return high
}

const TRAIT_FULL_NAMES: Record<TraitKey, string> = {
  E: 'ექსტრავერსია',
  A: 'კეთილგანწყობა',
  C: 'გულდასმილობა',
  N: 'ნეიროტიზმი / ემოციური მგრძნობელობა',
  O: 'გამოცდილებისთვის ღიაობა',
}

const TRAIT_POLES: Record<TraitKey, { low: string; high: string }> = {
  E: { low: 'გულჩათხრობილობა (ინტროვერსია)', high: 'გულღიაობა (ექსტრავერსია)' },
  A: { low: 'გულცივობა / დამოუკიდებლობა', high: 'გულთბილობა / კეთილგანწყობა' },
  C: { low: 'უდარდელობა / სპონტანურობა', high: 'გულმოდგინება / დისციპლინა' },
  N: { low: 'გულმშვიდობა (ემოციური სტაბილურობა)', high: 'გულფიცხობა / ემოციური მგრძნობელობა' },
  O: { low: 'ჩვეულის ერთგულება', high: 'მაძიებლობა / ღიაობა' },
}

// ============================================================
// Prompt builder
// ============================================================

function buildTraitPrompt(
  name: string,
  trait: TraitKey,
  score: number,
  scores: Scores,
  archetypeName: string,
  colorName: string
): string {
  const poles = TRAIT_POLES[trait]
  const label = traitLabel(trait, score)
  const fullName = TRAIT_FULL_NAMES[trait]

  // Describe where the user falls on this trait
  let positionDescription: string
  if (score <= 40) {
    positionDescription = `${name}-ს ეს ნიშანი დაბალია (${score}%) — ის ${poles.low} მხარეს დგას.`
  } else if (score <= 65) {
    positionDescription = `${name}-ს ეს ნიშანი საშუალოა (${score}%) — ის ორ პოლუსს შორის დგას, ${poles.high}-ისკენ მცირე გადახრით.`
  } else {
    positionDescription = `${name}-ს ეს ნიშანი მაღალია (${score}%) — ის ${poles.high} მხარეს დგას.`
  }

  // Build all-trait context for circle sentence
  const allTraits: TraitKey[] = ['E', 'A', 'C', 'N', 'O']
  const scoresContext = allTraits
    .map((t) => `${TRAIT_FULL_NAMES[t]} (${t}): ${scores[t]}% — ${traitLabel(t, scores[t])}`)
    .join('\n')

  return `შენ წერ ქართულ ინსაიტ-ბარათებს ადამიანისთვის სახელად ${name}.

ახლა ვმუშაობთ ერთ კონკრეტულ ნიშანზე: ${fullName} (${trait}).

პოლუსები:
- დაბალი: ${poles.low}
- მაღალი: ${poles.high}

${positionDescription}
კლასიფიკაცია: ${label}

პიროვნების სრული პროფილი (კონტექსტისთვის):
${scoresContext}
არქეტიპი: ${archetypeName}
ფერის სახელი: ${colorName}

დაბრუნე JSON ზუსტად ამ ფორმატში (სხვა არაფერი):
{
  "intro": "...",
  "notes": [
    { "title": "...", "text": "...", "label": "კვლევითი საფუძველი" },
    { "title": "...", "text": "...", "label": "კვლევითი საფუძველი" },
    { "title": "...", "text": "...", "label": "სახალისო" }
  ],
  "circle": "..."
}

წესები:
- "intro": 2-3 წინადადება. განმარტე ორივე პოლუსი მოკლედ (რა ნიშნავს დაბალი და რა მაღალი), შემდეგ აღწერე სად დგას ${name}. ტონი: ლიტერატურული, თბილი, ზუსტი.
- "notes": სამი ბარათი. პირველი ორი — "კვლევითი საფუძველი" (ფსიქოლოგიური კვლევაზე დამყარებული, კონკრეტული, ყოველდღიური; არა ჰოროსკოპი). მესამე — "სახალისო" (მსუბუქი, მხიარული, მაგრამ არა სულელური ან ფორტუნა-ტელერული).
- "circle": ერთი წინადადება. როგორ ჩანს ეს ნიშანი მეგობრების წრეში — კონკრეტული, ადამიანური.
- "title" თითოეულ ბარათში: მოკლე (2-4 სიტყვა), ქართული.
- "text" თითოეულ ბარათში: 1-2 წინადადება. პირდაპირი, „შენ", „შენი"-ს გამოყენებით.
- ციფრები ტექსტში არ შევიდეს. ძახილის ნიშნები — არა. ემოჯები — არა. ბრჭყალები „…"-ის ფორმატით.
- წერე მხოლოდ ქართულად.`
}

// ============================================================
// Claude API call
// ============================================================

async function callClaudeForTrait(prompt: string): Promise<TraitInsightResult> {
  const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Claude API error ${response.status}: ${errorText}`)
  }

  const data = await response.json()
  const text: string = data.content?.[0]?.text ?? ''

  if (!text) throw new Error('Empty response from Claude API')

  // Extract JSON from the response
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found in Claude response')

  let parsed: TraitInsightResult
  try {
    parsed = JSON.parse(jsonMatch[0])
  } catch {
    throw new Error(`Failed to parse Claude JSON response: ${jsonMatch[0].slice(0, 200)}`)
  }

  // Validate shape
  if (!parsed.intro || !Array.isArray(parsed.notes) || parsed.notes.length !== 3 || !parsed.circle) {
    throw new Error('Claude response missing required fields: intro, notes (3), circle')
  }

  for (const note of parsed.notes) {
    if (!note.title || !note.text || !note.label) {
      throw new Error('Each note must have title, text, and label')
    }
    if (note.label !== 'კვლევითი საფუძველი' && note.label !== 'სახალისო') {
      throw new Error(`Invalid note label: ${note.label}`)
    }
  }

  return parsed
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

    // Fetch profile (name, color_name)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('name, color_name')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch profile', details: profileError?.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch all 5 trait scores
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

    // Fetch archetype
    const { data: archetypeRow, error: archetypeError } = await supabase
      .from('user_archetypes')
      .select('name_ka, tagline_ka')
      .eq('user_id', user.id)
      .single()

    if (archetypeError || !archetypeRow) {
      return new Response(
        JSON.stringify({ error: 'Archetype not assigned yet', details: archetypeError?.message }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate insights for all 5 traits
    const traits: TraitKey[] = ['E', 'A', 'C', 'N', 'O']
    const results: Record<TraitKey, TraitInsightResult> = {} as Record<TraitKey, TraitInsightResult>

    for (const trait of traits) {
      const prompt = buildTraitPrompt(
        profile.name,
        trait,
        scores[trait],
        scores,
        archetypeRow.name_ka,
        profile.color_name ?? ''
      )
      results[trait] = await callClaudeForTrait(prompt)
    }

    const now = new Date().toISOString()

    // Delete old insights and insert fresh ones (per user)
    await supabaseAdmin
      .from('trait_insights')
      .delete()
      .eq('user_id', user.id)

    // Build rows for trait_insights
    const insightRows: {
      user_id: string
      trait: string
      title: string
      body: string
      label: string
      sort_order: number
      generated_at: string
    }[] = []

    const summaryRows: {
      user_id: string
      trait: string
      intro: string
      circle_text: string
      generated_at: string
    }[] = []

    for (const trait of traits) {
      const result = results[trait]

      // Insert 3 notes per trait
      result.notes.forEach((note, idx) => {
        insightRows.push({
          user_id: user.id,
          trait,
          title: note.title,
          body: note.text,
          label: note.label === 'კვლევითი საფუძველი' ? 'research' : 'fun',
          sort_order: idx,
          generated_at: now,
        })
      })

      summaryRows.push({
        user_id: user.id,
        trait,
        intro: result.intro,
        circle_text: result.circle,
        generated_at: now,
      })
    }

    const { error: insightInsertError } = await supabaseAdmin
      .from('trait_insights')
      .insert(insightRows)

    if (insightInsertError) {
      return new Response(
        JSON.stringify({ error: 'Failed to save insights', details: insightInsertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { error: summaryUpsertError } = await supabaseAdmin
      .from('trait_summaries')
      .upsert(summaryRows, { onConflict: 'user_id,trait' })

    if (summaryUpsertError) {
      return new Response(
        JSON.stringify({ error: 'Failed to save summaries', details: summaryUpsertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Return all generated content
    const responsePayload: Record<string, {
      intro: string
      notes: { title: string; text: string; label: string }[]
      circle: string
    }> = {}

    for (const trait of traits) {
      const result = results[trait]
      responsePayload[trait] = {
        intro: result.intro,
        notes: result.notes.map((n) => ({
          title: n.title,
          text: n.text,
          label: n.label,
        })),
        circle: result.circle,
      }
    }

    return new Response(
      JSON.stringify({ traits: responsePayload, generated_at: now }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
