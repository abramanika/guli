/**
 * Compute Big Five scores from a set of answers and their questions.
 * @param {Array<{questionId: number, value: number}>} answers
 * @param {Array<{id: number, trait: string, polarity: number, weight: number}>} questions
 * @returns {{ E: number, A: number, C: number, N: number, O: number }}
 */
export function computeScores(answers, questions) {
  const traits = ['E', 'A', 'C', 'N', 'O'];
  const result = {};

  for (const trait of traits) {
    const traitQuestions = questions.filter((q) => q.trait === trait);
    const traitAnswers = answers.filter((a) =>
      traitQuestions.some((q) => q.id === a.questionId)
    );

    if (traitAnswers.length === 0) {
      result[trait] = null;
      continue;
    }

    let weightedSum = 0;
    let weightSum = 0;

    for (const answer of traitAnswers) {
      const question = traitQuestions.find((q) => q.id === answer.questionId);
      if (!question) continue;

      const adjusted =
        question.polarity === 1 ? answer.value : 100 - answer.value;
      const weight = question.weight ?? 1.0;

      weightedSum += adjusted * weight;
      weightSum += weight;
    }

    result[trait] = weightSum > 0 ? Math.round(weightedSum / weightSum) : null;
  }

  return result;
}

/**
 * Compute score for a single chapter's answers (all questions share one trait).
 * @param {Array<{questionId: number, value: number}>} answers
 * @param {Array<{id: number, trait: string, polarity: number, weight: number}>} questions
 * @returns {{ trait: string, value: number } | null}
 */
export function computeChapterScore(answers, questions) {
  if (!questions.length || !answers.length) return null;

  // All questions in a chapter share the same trait
  const trait = questions[0].trait;

  let weightedSum = 0;
  let weightSum = 0;

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const adjusted =
      question.polarity === 1 ? answer.value : 100 - answer.value;
    const weight = question.weight ?? 1.0;

    weightedSum += adjusted * weight;
    weightSum += weight;
  }

  if (weightSum === 0) return null;

  return {
    trait,
    value: Math.round(weightedSum / weightSum),
  };
}
