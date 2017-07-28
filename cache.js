var nodeCache = require('node-cache');
var config = require("./config");
var log = require("./log");

module.exports = {};

var cache = new nodeCache({stdTTL: 120, checkperiod: 100});

var putData = function(key, value){
  log.debug("trying to put key "+key + " into cache.");
  var status = cache.set(key, value, config.DATA_TIMEOUT)
  if (status) {
    log.debug("successfully put data into cache");
    return true;
  } else {
    log.debug("error while putting data into cache");
    return false;
  }
};

var getData = function(key){
  log.debug("trying to get key "+key + " from cache.");
  var value = cache.get(key);
  if (value) {
    log.debug("successfully got data from cache");
    return value;    
  } else {
      log.debug("error while getting data from cache");
      return value;
  }
};

module.exports = {
                   getData: getData,
                   putData: putData
                 };
