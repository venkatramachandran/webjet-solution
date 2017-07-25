var bunyan = require('bunyan');
var config = require('./config');

var log = bunyan.createLogger({
  name: 'movies',
  level: config.log.level,
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
});

module.exports = log;