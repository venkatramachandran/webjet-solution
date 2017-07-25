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
  r.get("/api/cinemaworld/movies")
  .then(function(body){
    callback(null, body.Movies);
  })
  .catch(function(err){
    callback(err, null);
  });
}

var getCineWorldMovieCb = function(movie_id, callback) {
  r.get("/api/cinemaworld/movie/"+movie_id)
  .then(function(body){
    callback(null, body);
  })
  .catch(function(err){
    callback(err, null);
  });
}

var getFilmWorldMoviesCb = function(callback) {
  r.get("/api/filmworld/movies")
  .then(function(body){
    callback(null, body.Movies);
  })
  .catch(function(err){
    callback(err, null);
  });
}

var getFilmWorldMovieCb = function(movie_id, callback) {
  r.get("/api/filmworld/movie/"+movie_id)
  .then(function(body){
    callback(null, body);
  })
  .catch(function(err){
    callback(err, null);
  });
}

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
