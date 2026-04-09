import Redis from 'ioredis';
import envVars from './env';
import logger from '../utils/logger';

const { host, port, username, password } = envVars.REDIS;

const redis = new Redis({
  host,
  port,
  username,
  password,
  maxRetriesPerRequest: null, // Recommended for some use cases like BullMQ
});

redis.on('error', (err: unknown) => {
  logger.error('Redis  Error:', err);
});

redis.on('connect', () => {
  logger.log('✅ Redis Connected');
});

export const connectRedis = async () => {
  // ioredis connects automatically, but we can verify status if needed
  if (redis.status === 'ready') {
    logger.log('✅ Redis Ready');
  }
};

export { redis };
