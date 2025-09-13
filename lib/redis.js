import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL;

let redis;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to prevent multiple connections
  if (!global.redis) {
    global.redis = new Redis(REDIS_URL);
  }
  redis = global.redis;
} else {
  // In production, create a new connection
  redis = new Redis(REDIS_URL);
}

// Handle connection errors
redis.on('error', (error) => {
  console.error('Redis connection error:', error);
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

export default redis;

// Helper functions for common Redis operations
export const redisHelpers = {
  // Set a key with expiration
  async setex(key, seconds, value) {
    try {
      await redis.setex(key, seconds, JSON.stringify(value));
    } catch (error) {
      console.error('Redis SETEX error:', error);
      throw error;
    }
  },

  // Get a key
  async get(key) {
    try {
      const value = await redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Redis GET error:', error);
      throw error;
    }
  },

  // Delete a key
  async del(key) {
    try {
      await redis.del(key);
    } catch (error) {
      console.error('Redis DEL error:', error);
      throw error;
    }
  },

  // Set multiple keys
  async mset(data) {
    try {
      const args = [];
      Object.entries(data).forEach(([key, value]) => {
        args.push(key, JSON.stringify(value));
      });
      await redis.mset(...args);
    } catch (error) {
      console.error('Redis MSET error:', error);
      throw error;
    }
  },

  // Get multiple keys
  async mget(keys) {
    try {
      const values = await redis.mget(keys);
      return values.map(value => value ? JSON.parse(value) : null);
    } catch (error) {
      console.error('Redis MGET error:', error);
      throw error;
    }
  },

  // Check if key exists
  async exists(key) {
    try {
      return await redis.exists(key);
    } catch (error) {
      console.error('Redis EXISTS error:', error);
      throw error;
    }
  },

  // Set expiration on existing key
  async expire(key, seconds) {
    try {
      await redis.expire(key, seconds);
    } catch (error) {
      console.error('Redis EXPIRE error:', error);
      throw error;
    }
  },
};
