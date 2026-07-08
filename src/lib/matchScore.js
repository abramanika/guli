/**
 * Compute compatibility percentage between two users' Big Five scores.
 * Uses weighted cosine similarity, emphasizing traits where both users
 * have strong opinions (far from 50).
 *
 * @param {{ E: number, A: number, C: number, N: number, O: number }} scoresA
 * @param {{ E: number, A: number, C: number, N: number, O: number }} scoresB
 * @returns {number} 0-100 match percentage (integer)
 */
export function computeMatchScore(scoresA, scoresB) {
  const traits = ['E', 'A', 'C', 'N', 'O']

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
