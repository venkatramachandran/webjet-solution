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

var getCineWorldMoviesCb = function(callback) {
  log.info("starting request for cine world movies");
  r.get("/api/cinemaworld/movies")
  .then(function(body){
    log.info("ending request for cine world movies with success");
    callback(null, body.Movies);
  })
  .catch(function(err){
    log.info("ending request for cine world movies with error:"+err);
    callback(err, null);
  });
};

var getCineWorldMovieCb = function(movie_id, callback) {
  log.info("starting request for cine world movie");
  r.get("/api/cinemaworld/movie/"+movie_id)
  .then(function(body){
    log.info("ending request for cine world movie with success");
    callback(null, body);
  })
  .catch(function(err){
    log.info("ending request for cine world movie with error:"+err);
    callback(err, null);
  });
};

var getFilmWorldMoviesCb = function(callback) {
  log.info("starting request for film world movies");
  r.get("/api/filmworld/movies")
  .then(function(body){
    log.info("ending request for film world movies with success");
    callback(null, body.Movies);
  })
  .catch(function(err){
    log.info("ending request for film world movies with error:"+err);
    callback(err, null);
  });
};

var getFilmWorldMovieCb = function(movie_id, callback) {
  log.info("starting request for film world movie");
  r.get("/api/filmworld/movie/"+movie_id)
  .then(function(body){
    log.info("ending request for film world movie with success");
    callback(null, body);
  })
  .catch(function(err){
    log.info("ending request for film world movie with error:"+err);
    callback(err, null);
  });
};

var getCineWorldMovies = promise.promisify(getCineWorldMoviesCb);
var getCineWorldMovie = promise.promisify(getCineWorldMovieCb);
var getFilmWorldMovies = promise.promisify(getFilmWorldMoviesCb);
var getFilmWorldMovie = promise.promisify(getFilmWorldMovieCb);

module.exports = {
  getCineWorldMovies : getCineWorldMovies,
  getCineWorldMovie : getCineWorldMovie,
  getFilmWorldMovies : getFilmWorldMovies,
  getFilmWorldMovie : getFilmWorldMovie,
};
