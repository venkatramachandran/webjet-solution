var config = {};

config.log = {};
config.log.level = process.env.LOG_LEVEL || "info";

config.redis = {};
config.redis.host = process.env.REDIS_HOST || "localhost";
config.redis.port = process.env.REDIS_PORT|| 6379;
config.redis.options = {};

config.DATA_TIMEOUT = process.env.DATA_TIMEOUT || 120;
