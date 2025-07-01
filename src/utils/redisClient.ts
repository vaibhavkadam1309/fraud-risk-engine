import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});


export async function initRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('✅ Redis connected');
  } else {
    console.log('⚠️ Redis already connected');
  }
}