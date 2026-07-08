/**
 * Georgian archetype definitions and assignment logic.
 * Each archetype is defined by trait conditions (min/max thresholds)
 * and a set of descriptive chips in Georgian.
 *
 * Scores: { E, A, C, N, O } each 0–100
 */

export const ARCHETYPES = {
  host: {
    key: 'host',
    name: 'მასპინძელი',
    tagline: 'შენ ის ხარ, ვინც სუფრას ერთი კითხვით ცვლის.',
    chips: ['თბილი', 'გულღია', 'დამაკავშირებელი'],
    /**
     * Conditions: array of { trait, min?, max?, threshold }
     * threshold is used for fit-score calculation (how far above/below threshold).
     */
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
};

/**
 * Check whether a single condition is satisfied by the given scores.
 * @param {{ trait: string, min?: number, max?: number }} condition
 * @param {{ E: number, A: number, C: number, N: number, O: number }} scores
 * @returns {boolean}
 */
function conditionMet(condition, scores) {
  const value = scores[condition.trait];
  if (value == null) return false;
  if (condition.min != null && value < condition.min) return false;
  if (condition.max != null && value > condition.max) return false;
  return true;
}

/**
 * Compute how well an archetype matches the scores.
 * For "min" conditions: surplus = score - threshold (positive = better)
 * For "max" conditions: surplus = threshold - score (positive = better)
 * Returns sum of surpluses across all conditions that are met.
 *
 * @param {object} archetype
 * @param {{ E: number, A: number, C: number, N: number, O: number }} scores
 * @returns {{ matches: boolean, fitScore: number, gap: number }}
 */
function evaluateArchetype(archetype, scores) {
  let fitScore = 0;
  let gap = 0;
  let allMet = true;

  for (const cond of archetype.conditions) {
    const value = scores[cond.trait] ?? 0;
    const met = conditionMet(cond, scores);

    if (met) {
      // How far above/inside the threshold
      if (cond.min != null) fitScore += value - cond.threshold;
      else if (cond.max != null) fitScore += cond.threshold - value;
    } else {
      allMet = false;
      // How far outside the threshold (gap to closest boundary)
      if (cond.min != null) gap += cond.min - value;
      else if (cond.max != null) gap += value - cond.max;
    }
  }

  return { matches: allMet, fitScore, gap };
}

/**
 * Assign the best-matching archetype for a given set of Big Five scores.
 *
 * Algorithm:
 * 1. Find all archetypes whose conditions are fully met.
 * 2. If multiple match, return the one with the highest fitScore.
 * 3. If none match, return the one with the smallest gap (closest miss).
 *
 * @param {{ E: number, A: number, C: number, N: number, O: number }} scores
 * @returns {{ key: string, name: string, tagline: string, chips: string[] }}
 */
export function assignArchetype(scores) {
  const archetypeList = Object.values(ARCHETYPES);

  const evaluated = archetypeList.map((arch) => ({
    archetype: arch,
    ...evaluateArchetype(arch, scores),
  }));

  const matching = evaluated.filter((e) => e.matches);

  let chosen;
  if (matching.length > 0) {
    // Pick the one with the highest fit score
    chosen = matching.reduce((best, curr) =>
      curr.fitScore > best.fitScore ? curr : best
    );
  } else {
    // Fall back to closest miss (smallest gap)
    chosen = evaluated.reduce((best, curr) =>
      curr.gap < best.gap ? curr : best
    );
  }

  const { key, name, tagline, chips } = chosen.archetype;
  return { key, name, tagline, chips };
}
