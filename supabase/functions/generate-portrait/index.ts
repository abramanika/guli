import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type Scores = Record<'E' | 'A' | 'C' | 'N' | 'O', number>

// ============================================================
// Trait label helpers
// ============================================================

function traitLabel(trait: 'E' | 'A' | 'C' | 'N' | 'O', score: number): string {
  const labels: Record<string, [string, string, string]> = {
    // [low, mid, high]
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

function buildScoreSummary(scores: Scores): string {
  const traits: Array<keyof Scores> = ['E', 'A', 'C', 'N', 'O']
  const traitNames: Record<string, string> = {
    E: 'ექსტრავერსია (E)',
    A: 'კეთილგანწყობა (A)',
    C: 'გულდასმილობა (C)',
    N: 'ნეიროტიზმი (N)',
    O: 'გამოცდილებისთვის ღიაობა (O)',
  }

  return traits
    .map((t) => `${traitNames[t]}: ${scores[t]}% — ${traitLabel(t, scores[t])}`)
    .join('\n')
}

// ============================================================
// Prompt builder
// ============================================================

function buildPrompt(
  name: string,
  scores: Scores,
  archetypeName: string,
  archetypeTagline: string,
  colorName: string
): string {
  const scoreSummary = buildScoreSummary(scores)

  // Sort traits to find dominant and second
  const traits: Array<keyof Scores> = ['E', 'A', 'C', 'N', 'O']
  const sorted = [...traits].sort((a, b) => scores[b] - scores[a])
  const [dominant, second, third] = sorted

  const traitFullNames: Record<string, string> = {
    E: 'ექსტრავერსია',
    A: 'კეთილგანწყობა',
    C: 'გულდასმილობა',
    N: 'ნეიროტიზმი / ემოციური მგრძნობელობა',
    O: 'გამოცდილებისთვის ღიაობა',
  }

  return `შენ წერ ქართულ ლიტერატურულ პორტრეტს ადამიანისთვის სახელად ${name}.

პიროვნების ფსიქოლოგიური პროფილი (Big Five შეფასება):
${scoreSummary}

არქეტიპი: ${archetypeName}
არქეტიპის ტეგლაინი: „${archetypeTagline}"
ფერის სახელი: ${colorName}

დომინანტური თვისება: ${traitFullNames[dominant]} (${scores[dominant]}%)
მეორე თვისება: ${traitFullNames[second]} (${scores[second]}%)
საინტერესო კონტრასტი: ${traitFullNames[third]} (${scores[third]}%)

დაწერე ზუსტად 5 აბზაცი ქართულ ენაზე. თითოეული აბზაცი — 3-5 წინადადება.

სტრუქტურა:
1. პირველი აბზაცი: დომინანტური თვისება — როგორ ჩანს ის ყოველდღიურ ცხოვრებაში, ადამიანებთან ურთიერთობაში, სუფრასთან, სახლში.
2. მეორე აბზაცი: მეორე მნიშვნელოვანი თვისება — კონკრეტული, ცოცხალი სცენა ან სიტუაცია.
3. მესამე აბზაცი: ორი ბოლო თვისების საინტერესო კონტრასტი ან მოულოდნელი კომბინაცია — ის, რაც ამ ადამიანს გამოარჩევს.
4. მეოთხე აბზაცი: ემოციური ლანდშაფტი — როგორ განიცდის ადამიანი სტრესს, სიხარულს, ღელვას; ძლიერი მხარეები.
5. მეხუთე აბზაცი: არქეტიპის ანარეკლი — გააშალე ტეგლაინი „${archetypeTagline}" და დაასრულე პორტრეტი ღრმა, გულწრფელი დახასიათებით.

მნიშვნელოვანი წესები:
- წერე მხოლოდ ქართულად
- მიმართე პირდაპირ — „შენ", „შენი", „შენთვის" (არაფორმალური მხოლობითი)
- ტონი: თბილი, ლიტერატურული, ზუსტი, გაუჩქარებელი, გულწრფელი
- არ წერო ჰოროსკოპის ენით, ნუ გახდი ზოგადი
- ციფრები (62%, 78% და ა.შ.) გამოიყენე ენის კალიბრაციისთვის, მაგრამ ტექსტში ნუ ჩართავ — არ მოიხსენიო „62 პროცენტი" ან „მაღალი ქულა"
- ორივე პოლუსი ლეგიტიმურია — დაბალი E სიღრმეა, არა ნაკლი; დაბალი C სპონტანურობაა, არა ზარმაცობა
- ნუ გამოიყენებ ძახილის ნიშნებს
- ქართული ბრჭყალები: „…"
- ნუ გამოიყენებ ემოჯებს
- ნუ დაამატებ სათაურს ან ნომრებს
- დაბრუნე მხოლოდ 5 აბზაცი, გამოყოფილი ცარიელი ხაზით`
}

// ============================================================
// Claude API call
// ============================================================

async function callClaude(prompt: string): Promise<string[]> {
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
      max_tokens: 1500,
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

  // Split on blank lines, filter empty strings, take exactly 5
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0)

  if (paragraphs.length < 5) {
    throw new Error(`Expected 5 paragraphs, got ${paragraphs.length}`)
  }

  return paragraphs.slice(0, 5)
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

    // Check existing portrait version (for upsert increment)
    const { data: existingPortrait } = await supabaseAdmin
      .from('portraits')
      .select('version')
      .eq('user_id', user.id)
      .single()

    const nextVersion = (existingPortrait?.version ?? 0) + 1

    // Build prompt and call Claude
    const prompt = buildPrompt(
      profile.name,
      scores,
      archetypeRow.name_ka,
      archetypeRow.tagline_ka,
      profile.color_name ?? ''
    )

    const paragraphs = await callClaude(prompt)

    // Upsert into portraits table (service role bypasses RLS)
    const { error: upsertError } = await supabaseAdmin
      .from('portraits')
      .upsert(
        {
          user_id: user.id,
          paragraphs,
          version: nextVersion,
          generated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: 'Failed to save portrait', details: upsertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ paragraphs, version: nextVersion }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
