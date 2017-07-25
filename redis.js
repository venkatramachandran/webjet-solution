var redis = require("redis");
var promise = require("bluebird");
var config = require("./config");
var log = require("./log");

module.exports = {};

var client = redis.createClient(config.redis.port, config.redis.host, config.redis.options || {});

var putDataCb = function(key, value, callback){
  var redisKey = key;
  client.multi()
  .set(redisKey, value)
  .expire(redisKey, config.PASSWORD_CHANGE_TIMEOUT)
  .exec(function(err, replies){
    if(err){
      callback(new exceptions.SlamdunQTokenError(), null);
    }
    else{
      callback(null, true);
    }
  });
}
var putData = promise.promisify(putDataCb);

var getDataCb = function(key, callback){
  client.get(key, function(err, value){
    if (value)
      callback(null, value);
    else
      callback(null, null);
  });
}
var getData = promise.promisify(getDataCb);