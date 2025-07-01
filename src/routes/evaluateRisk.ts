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


/**
 * @swagger
 * components:
 *   schemas:
 *     EvaluateRiskRequest:
 *       type: object
 *       required:
 *         - amount
 *         - currency
 *         - ip
 *         - deviceFingerprint
 *         - email
 *       properties:
 *         amount:
 *           type: number
 *           example: 5000
 *         currency:
 *           type: string
 *           example: USD
 *         ip:
 *           type: string
 *           example: 198.51.100.22
 *         deviceFingerprint:
 *           type: string
 *           example: abc123
 *         email:
 *           type: string
 *           example: user@fraud.net
 *     EvaluateRiskResponse:
 *       type: object
 *       properties:
 *         score:
 *           type: number
 *         riskLevel:
 *           type: string
 *         explanation:
 *           type: string
 */

/**
 * @swagger
 * /evaluate-risk:
 *   post:
 *     summary: Evaluate transaction risk
 *     tags: [Risk]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EvaluateRiskRequest'
 *     responses:
 *       200:
 *         description: Risk score with explanation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EvaluateRiskResponse'
 */

/**
 * @swagger
 * /fraud-stats:
 *   get:
 *     summary: Get fraud evaluation stats
 *     tags: [Risk]
 *     responses:
 *       200:
 *         description: Aggregated fraud statistics
 */
