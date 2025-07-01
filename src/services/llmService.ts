import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { redisClient } from '../utils/redisClient';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
export async function generateExplanation(score: number, riskLevel: string, reasons: string[]): Promise<string> {
    const cacheKey = `explanation:${score}:${riskLevel}:${reasons.join(',')}`;

    // Try to get cached value
    try {

        const cached = await redisClient.get(cacheKey);
        if (cached) return cached;
    }
    catch (err) {
        console.warn('⚠️ Redis GET failed:', err);
    }
    const prompt = `
                Explain why the following transaction is rated as ${riskLevel} risk with a score of ${score}:
                Reasons: ${reasons.join(', ')}.
                Be concise.`;
    try {
       
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Store in Redis with TTL (e.g., 1 hour)
        await redisClient.set(cacheKey, text, {
            EX: 60 * 60,
        });
        return text
    } catch (err) {
        console.log(err)
        return prompt;
    }
}

