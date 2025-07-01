import { createClient } from 'redis';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// // redisClient.on('error', (err) => console.error('Redis Client Error', err));

// // await redisClient.connect();


// (async () => {
//   try {
//     if (!redisClient.isOpen) {
//     await redisClient.connect();
//     console.log('✅ Redis connected');
//     }
//   } catch (error) {
//     console.error('❌ Redis connection error:', error);
//   }
// })();

export async function initRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log('✅ Redis connected');
  } else {
    console.log('⚠️ Redis already connected');
  }
}