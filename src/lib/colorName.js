/**
 * Generate a poetic Georgian color name from Big Five scores.
 * @param {{ E: number, A: number, C: number, N: number, O: number }} scores
 * @returns {string} e.g., "თბილი ცა"
 */

// Base color nouns indexed by trait, ordered by score range:
// index 0 → 0-25, index 1 → 26-50, index 2 → 51-75, index 3 → 76-100
const BASE_NOUNS = {
  E: ['მზე', 'ცეცხლი', 'ალი', 'ნაპერწკალი'],       // sun, fire, flame, spark
  A: ['თიხა', 'ხავერდი', 'ამბარი', 'ზამბახი'],      // clay, velvet, amber, lily
  C: ['მარილი', 'ქვა', 'რკინა', 'ბროლი'],           // salt, stone, iron, crystal
  N: ['ზღვა', 'ტბა', 'ნისლი', 'წვიმა'],             // sea, lake, mist, rain
  O: ['ცა', 'ქარი', 'ჰორიზონტი', 'ვარსკვლავი'],    // sky, wind, horizon, star
}

// Modifier adjectives indexed by trait, ordered by score range:
// index 0 → 0-25, index 1 → 26-50, index 2 → 51-75, index 3 → 76-100
const MODIFIERS = {
  E: ['თბილი', 'ხმამაღალი', 'მხურვალე', 'ნათელი'],          // warm, loud, ardent, bright
  A: ['რბილი', 'მშვიდი', 'ბალახოვანი', 'ტკბილი'],           // soft, calm, verdant, sweet
  C: ['მყარი', 'მკვეთრი', 'წმინდა', 'ზუსტი'],               // firm, sharp, pure, precise
  N: ['ღრმა', 'ფარული', 'ცვალებადი', 'მღელვარე'],           // deep, hidden, changeable, turbulent
  O: ['ფართო', 'უცხო', 'ფერადი', 'თავისუფალი'],             // wide, foreign/exotic, colorful, free
}

/**
 * Map a score value (0-100) to an array index (0-3) based on 4 equal ranges.
 * 0-25 → 0, 26-50 → 1, 51-75 → 2, 76-100 → 3
 * @param {number} score
 * @returns {0|1|2|3}
 */
function scoreToIndex(score) {
  if (score <= 25) return 0
  if (score <= 50) return 1
  if (score <= 75) return 2
  return 3
}

export function generateColorName(scores) {
  const traits = ['E', 'A', 'C', 'N', 'O']

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
