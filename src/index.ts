import express from 'express';
import dotenv from 'dotenv';
import evaluateRiskRoute from './routes/evaluateRisk';
import { redisClient, initRedis  } from './utils/redisClient';

dotenv.config();
const app = express();
app.use(express.json());
app.use('/', evaluateRiskRoute);

const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// (async () => {
//   await redisClient.connect();

//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// })();
async function startServer() {
  await initRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
}

startServer();
process.on('SIGINT', async () => {
  console.log('🔻 Shutting down...');

  if (redisClient.isOpen) {
    await redisClient.quit();
    console.log('✅ Redis connection closed');
  }

  process.exit(0);
});