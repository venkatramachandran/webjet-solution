var redis = require("redis");
var promise = require("bluebird");
var config = require("./config");
var log = require("./log");

module.exports = {};

var client = redis.createClient(config.redis.port, config.redis.host, config.redis.options || {});

var putDataCb = function(key, value, callback){
  log.debug("trying to put key "+key + " into redis.");
  var redisKey = key;
  client.multi()
  .set(redisKey, value)
  .expire(redisKey, config.PASSWORD_CHANGE_TIMEOUT)
  .exec(function(err, replies){
    if(err){
      log.debug("error while putting data from redis");
      callback(err, null);
    }
    else{
      log.debug("successfully put data into redis");
      callback(null, true);
    }
  });
}
var putData = promise.promisify(putDataCb);

var getDataCb = function(key, callback){
  log.debug("trying to get key "+key + " into redis.");
  client.get(key, function(err, value){
    if (err) {
      log.debug("error while getting data from redis");
      callback(err, null);
    }
    else {
      log.debug("successfully got data into redis");
      callback(null, value);
    }
  });
}
var getData = promise.promisify(getDataCb);

module.exports = {
                   getData: getData,
                   putData: putData
                 };
