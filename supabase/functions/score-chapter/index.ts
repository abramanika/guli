import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request body
    const { chapterId } = await req.json() as { chapterId: number }

    if (!chapterId || typeof chapterId !== 'number') {
      return new Response(
        JSON.stringify({ error: 'chapterId is required and must be a number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Build Supabase client with the user's JWT for auth context
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

    // Service-role client for writes that bypass RLS (scores table: writes via service role)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch all questions for the chapter
    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, trait, polarity, weight')
      .eq('chapter', chapterId)

    if (questionsError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch questions', details: questionsError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!questions || questions.length === 0) {
      return new Response(
        JSON.stringify({ error: `No questions found for chapter ${chapterId}` }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch user's answers for those questions
    const questionIds = questions.map((q: { id: number }) => q.id)
    const { data: answers, error: answersError } = await supabase
      .from('answers')
      .select('question_id, value')
      .eq('user_id', user.id)
      .in('question_id', questionIds)

    if (answersError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch answers', details: answersError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!answers || answers.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No answers found for this chapter' }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Compute chapter score
    const trait = questions[0].trait as string
    let weightedSum = 0
    let weightSum = 0

    for (const answer of answers) {
      const question = questions.find((q: { id: number }) => q.id === answer.question_id)
      if (!question) continue

      const adjusted = question.polarity === 1 ? answer.value : 100 - answer.value
      const weight = question.weight ?? 1.0

      weightedSum += adjusted * weight
      weightSum += weight
    }

    if (weightSum === 0) {
      return new Response(
        JSON.stringify({ error: 'Cannot compute score: zero total weight' }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const scoreValue = Math.round(weightedSum / weightSum)

    // Upsert into scores table (service role bypasses RLS)
    const { error: upsertError } = await supabaseAdmin
      .from('scores')
      .upsert(
        { user_id: user.id, trait, value: scoreValue, updated_at: new Date().toISOString() },
        { onConflict: 'user_id,trait' }
      )

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: 'Failed to save score', details: upsertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Mark chapter as done
    const { error: doneError } = await supabaseAdmin
      .from('chapter_progress')
      .upsert(
        { user_id: user.id, chapter: chapterId, state: 'done', completed_at: new Date().toISOString() },
        { onConflict: 'user_id,chapter' }
      )

    if (doneError) {
      return new Response(
        JSON.stringify({ error: 'Failed to mark chapter as done', details: doneError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Unlock the next chapter if it exists (chapters 1-7)
    const nextChapter = chapterId + 1
    if (nextChapter <= 7) {
      // Only unlock if the next chapter is currently locked (don't overwrite 'current' or 'done')
      const { data: nextProgress } = await supabaseAdmin
        .from('chapter_progress')
        .select('state')
        .eq('user_id', user.id)
        .eq('chapter', nextChapter)
        .single()

      if (!nextProgress || nextProgress.state === 'locked') {
        await supabaseAdmin
          .from('chapter_progress')
          .upsert(
            { user_id: user.id, chapter: nextChapter, state: 'current' },
            { onConflict: 'user_id,chapter' }
          )
      }
    }

    return new Response(
      JSON.stringify({ trait, value: scoreValue }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
