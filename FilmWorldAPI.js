var request = require('./request');
var promise = require('bluebird');
var redis = require('./redis');
var log = require('./log');
var _ = require('lodash');

var FILM_WORLD_PREFIX = "filmWorld:";
var MOVIES_KEY        = "all";
var GET_MOVIES_API_URL = "/api/filmworld/movies/";
var GET_MOVIE_API_URL = "/api/filmworld/movie/";

var getFilmWorldMoviesCb = function(callback) {
	log.debug("starting getFilmWorldMoviesCb");
	request(GET_MOVIES_API_URL)
	.then(function(movies){
		log.debug("API call success in getFilmWorldMoviesCb");
		redis.putData(FILM_WORLD_PREFIX+MOVIES_KEY, JSON.stringify(movies.Movies));
		callback(null, movies.Movies);
	})
	.catch(function(err){
		log.debug("API call failed in getFilmWorldMoviesCb:"+err);
		redis.getData(FILM_WORLD_PREFIX+MOVIES_KEY)
		.then(function(result){
			if (result) {
				log.debug("data exists in redis in getFilmWorldMoviesCb");
				callback(null, JSON.parse(result));
			} else {
				log.debug("data not exists in redis in getFilmWorldMoviesCb");
				callback(null, []);
			}
		})
		.catch(function(err){
			log.debug("error in redis :"+err);
			callback(null, []);
		});
	});
};

var getFilmWorldMovieCb = function(movie_id, callback) {
	if (_.isEmpty(movie_id)) {
		callback(null, {});
		return;
	}
	request(GET_MOVIE_API_URL + movie_id)
	.then(function(movie){
		redis.putData(FILM_WORLD_PREFIX+movie_id, JSON.stringify(movie));
		callback(null, movie);
	})
	.catch(function(err){
		redis.getData(FILM_WORLD_PREFIX+movie_id)
		.then(function(result){
			if (result) {
				log.debug("data exists in redis in getFilmWorldMovieCb");
				callback(null, JSON.parse(result));
			} else {
				log.debug("data not exists in redis in getFilmWorldMovieCb");
				callback(null, {});
			}
		})
		.catch(function(err){
			callback(null, {});
		});
	});
};


var getFilmWorldMovies = promise.promisify(getFilmWorldMoviesCb);
var getFilmWorldMovie = promise.promisify(getFilmWorldMovieCb);

module.exports = {
  getMovies : getFilmWorldMovies,
  getMovie : getFilmWorldMovie,
};