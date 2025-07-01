const HIGH_RISK_DOMAINS = ['fraud.net', '.ru'];
const HIGH_AMOUNT_THRESHOLD = 1000;

type Input = {
  amount: number;
  currency: string;
  ip: string;
  deviceFingerprint: string;
  email: string;
  repeatIp: boolean;
  repeatDevice: boolean;
};

export function evaluateRisk(input: Input): { score: number; riskLevel: string; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  if (HIGH_RISK_DOMAINS.some(domain => input.email.endsWith(domain))) {
    score += 0.3;
    reasons.push('high-risk email domain');
  }

  if (input.amount > HIGH_AMOUNT_THRESHOLD) {
    score += 0.3;
    reasons.push('large transaction amount');
  }

  if (input.repeatIp) {
    score += 0.2;
    reasons.push('repeated IP address');
  }

  if (input.repeatDevice) {
    score += 0.2;
    reasons.push('repeated device fingerprint');
  }

  const riskLevel =
    score > 0.7 ? 'high' : score > 0.4 ? 'moderate' : 'low';

  return { score: parseFloat(score.toFixed(2)), riskLevel, reasons };
}
