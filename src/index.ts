import express from 'express';
import dotenv from 'dotenv';
import evaluateRiskRoute from './routes/evaluateRisk';
import { redisClient, initRedis  } from './utils/redisClient';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';


dotenv.config();
const app = express();
app.use(express.json());
app.use('/', evaluateRiskRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 3000;

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