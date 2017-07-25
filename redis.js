var redis = require("redis");
var promise = require("bluebird");
var config = require("./config");
var log = require("./log");

module.exports = {};

promise.promisifyAll(redis.RedisClient.prototype);
promise.promisifyAll(redis.Multi.prototype);
var client = redis.createClient(config.redis.port, config.redis.host, config.redis.options || {});

var putDataCb = function(key, value, callback){
  log.debug("trying to put key "+key + " into redis.");
  var redisKey = key;
  client.setAsync(redisKey, value, 'EX', config.DATA_TIMEOUT)
  .then(function(data){
    log.debug("successfully put data into redis");
    callback(null, true);
  })
  .catch(function(err){
    log.debug("error while putting data from redis");
    callback(err, null);
  });
}
var putData = promise.promisify(putDataCb);

var getDataCb = function(key, callback){
  log.debug("trying to get key "+key + " into redis.");
  client.getAsync(key)
  .then(function(value){
    log.debug("successfully got data into redis");
    callback(null, value);    
  })
  .catch(function(err){
      log.debug("error while getting data from redis");
      callback(err, null);
  });
}
var getData = promise.promisify(getDataCb);

module.exports = {
                   getData: getData,
                   putData: putData
                 };
