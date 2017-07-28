var config = {};

config.log = {};
config.log.level = process.env.LOG_LEVEL || "info";

config.DATA_TIMEOUT = process.env.DATA_CACHE_TIME || 120;

config.request = {};
config.request.baseUrl = "http://webjetapitest.azurewebsites.net";
config.request.headers = {"x-access-token": "sjd1HfkjU83ksdsm3802k"};
config.request.timeout = process.env.API_TIMEOUT || 15000;


module.exports = config;
