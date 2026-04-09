/* eslint-disable @typescript-eslint/no-explicit-any */
import { redis } from '@config/redis.config';
import logger from './logger';

class CacheService {
  /**
   * Set a value in the cache
   * @param key Cache key
   * @param value Data to cache
   * @param ttl Time to live in seconds (default: 3600)
   */
  public async set(key: string, value: any, ttl = 3600): Promise<void> {
    try {
      if (redis.status !== 'ready') return;

      const stringifiedValue = JSON.stringify(value);
      if (ttl > 0) {
        await redis.set(key, stringifiedValue, 'EX', ttl);
      } else {
        await redis.set(key, stringifiedValue);
      }
    } catch (error) {
      logger.error(`[CacheService] Failed to set cache for ${key}:`, error);
    }
  }

  /**
   * Get a value from the cache
   * @param key Cache key
   */
  public async get<T>(key: string): Promise<T | null> {
    try {
      if (redis.status !== 'ready') return null;

      const cachedData = await redis.get(key);
      if (cachedData) {
        logger.info(`[CacheService] Cache Hit: ${key}`);
        return JSON.parse(cachedData);
      }
      logger.info(`[CacheService] Cache Miss: ${key}`);
      return null;
    } catch (error) {
      logger.error(`[CacheService] Failed to get cache for ${key}:`, error);
      return null;
    }
  }

  /**
   * Delete a specific key
   * @param key Cache key
   */
  public async delete(key: string): Promise<void> {
    try {
      if (redis.status !== 'ready') return;
      await redis.del(key);
      logger.log(`[CacheService] Deleted cache key: ${key}`);
    } catch (error) {
      logger.error(`[CacheService] Failed to delete cache key ${key}:`, error);
    }
  }

  /**
   * Clear all keys with a specific prefix
   * @param prefix Prefix (e.g., 'users')
   */
  public async deleteByPrefix(prefix: string): Promise<void> {
    try {
      if (redis.status !== 'ready') return;

      const keys = await redis.keys(`cache:${prefix}:*`);
      if (keys.length > 0) {
        await redis.del(keys);
        logger.log(
          `[CacheService] Cleared ${keys.length} cache keys for prefix: ${prefix}`,
        );
      }
    } catch (error) {
      logger.error(
        `[CacheService] Failed to clear cache for prefix ${prefix}:`,
        error,
      );
    }
  }
}

export const cacheService = new CacheService();
