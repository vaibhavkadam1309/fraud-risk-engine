type RiskLevel = 'low' | 'moderate' | 'high';

let totalEvaluations = 0;
let totalScore = 0;
const riskLevelCounts: Record<RiskLevel, number> = {
  low: 0,
  moderate: 0,
  high: 0,
};

export function updateStats(score: number, riskLevel: RiskLevel) {
  totalEvaluations++;
  totalScore += score;
  riskLevelCounts[riskLevel]++;
}

export function getStats() {
  return {
    totalEvaluations,
    averageScore: totalEvaluations > 0 ? +(totalScore / totalEvaluations).toFixed(2) : 0,
    riskLevelCounts,
  };
}
