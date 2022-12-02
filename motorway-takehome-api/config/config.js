const cacheTime = parseInt(process.env.CACHE_TTL || '')
const CACHE_TTL = Number.isInteger(cacheTime) ? cacheTime : 60;

module.exports = {
    PORT: 3000,
    DB_HOST: process.env.DB_HOST || 'db',
    DB_USER: process.env.DB_USER || 'user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    DB_NAME: process.env.DB_NAME || 'motorway',
    REDIS_HOST: process.env.REDIS_HOST || 'redis',
    CACHE_TTL
  };