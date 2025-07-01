import express from 'express';
import { evaluateRisk } from '../services/riskScorer';
import { generateExplanation } from '../services/llmService';
import { isRepeatDevice, isRepeatIp } from '../utils/dataStore';
import { updateStats } from '../utils/statsStore';
import { getStats } from '../utils/statsStore';

const router = express.Router();

router.post('/evaluate-risk', async (req, res) => {
  const { amount, currency, ip, deviceFingerprint, email } = req.body;

  const input = {
    amount,
    currency,
    ip,
    deviceFingerprint,
    email,
    repeatIp: isRepeatIp(ip),
    repeatDevice: isRepeatDevice(deviceFingerprint),
  };

    const { score, riskLevel, reasons } = evaluateRisk(input);
    updateStats(score, riskLevel as 'low' | 'moderate' | 'high');
    const explanation = await generateExplanation(score, riskLevel, reasons);

    res.json({ score, riskLevel, explanation });
});

router.get('/fraud-stats', (req, res) => {
  res.json(getStats());
});

export default router;
