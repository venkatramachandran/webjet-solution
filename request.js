var rp = require('request-promise');
var promise = require('bluebird');
var config = require('./config');
var log = require('./log');

var r = rp.defaults({
  baseUrl: config.request.baseUrl,
  headers: config.request.headers,
  json : true,
  timeout: config.request.timeout
});

var getCb = function(url,callback) {
  log.info("starting request for url:"+url);
  r.get(url)
  .then(function(body){
    log.info("ending request for url "+url+" with success");
    callback(null, body);
  })
  .catch(function(err){
    log.info("ending request for url "+url+"with error:"+err);
    callback(err, null);
  });
};


var get = promise.promisify(getCb);

module.exports = get;
