const Redis = require("ioredis");

const config = require('../config/config')

const redisBuilder = () => {
  if(config.CACHE_TTL === 0){
    return {
      getCache: () => null,
      setCache: () => null
    }
  }

  const redis = new Redis({
    host: config.REDIS_HOST,
    maxRetriesPerRequest: 3,
  });

  const getCache = (key) => {
    if (redis.status !== 'ready') {
      return null;
    }
    return redis.get(key);
  }

  const setCache = (key, value, TTL = config.CACHE_TTL) => {
    if (redis.status !== 'ready') {
      return null;
    }
    return redis.set(key, value, "EX", TTL);
  }

  return {
    getCache,
    setCache
  }
}
module.exports = redisBuilder();