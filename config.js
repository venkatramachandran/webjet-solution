var config = {};

config.log = {};
config.log.level = process.env.LOG_LEVEL || "info";

config.redis = {};
config.redis.host = process.env.REDIS_HOST || "localhost";
config.redis.port = process.env.REDIS_PORT || 6379;
config.redis.options = {};

config.DATA_TIMEOUT = process.env.DATA_CACHE_TIME || 120;

config.request = {};
config.request.baseUrl = "http://webjetapitest.azurewebsites.net";
config.request.headers = {"x-access-token": "sjd1HfkjU83ksdsm3802k"};
config.request.timeout = process.env.API_TIMEOUT || 1500;


module.exports = config;
