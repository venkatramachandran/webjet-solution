var request = require('./request');
var promise = require('bluebird');
var redis = require('./redis');
var log = require('./log');

var CINE_WORLD_PREFIX = "cineWorld:";
var FILM_WORLD_PREFIX = "filmWorld:";
var MOVIES_KEY        = "all";

var getCineWorldMoviesCb = function(callback) {
	log.debug("starting getCineWorldMoviesCb");
	request.getCineWorldMovies()
	.then(function(movies){
		log.debug("API call success in getCineWorldMoviesCb");
		redis.putData(CINE_WORLD_PREFIX+MOVIES_KEY, JSON.stringify(movies));
		callback(null, movies);
	})
	.catch(function(err){
		log.debug("API call failed in getCineWorldMoviesCb:"+err);
		redis.getData(CINE_WORLD_PREFIX+MOVIES_KEY)
		.then(function(result){
			if (result) {
				log.debug("data exists in redis in getCineWorldMoviesCb");
				callback(null, JSON.parse(result));
			} else {
				log.debug("data not exists in redis in getCineWorldMoviesCb");
				callback(null, []);
			}
		})
		.catch(function(err){
			log.debug("error in redis :"+err);
			callback(null, []);
		});
	});
};

var getCineWorldMovieCb = function(movie_id, callback) {
	if (!movie_id) callback(null, {});
	request.getCineWorldMovie(movie_id)
	.then(function(movie){
		redis.putData(CINE_WORLD_PREFIX+movie_id, JSON.stringify(movie));
		callback(null, movie);
	})
	.catch(function(err){
		redis.getData(CINE_WORLD_PREFIX+movie_id)
		.then(function(result){
			if (result) {
				log.debug("data exists in redis in getCineWorldMovieCb");
				callback(null, JSON.parse(result));
			} else {
				log.debug("data not exists in redis in getCineWorldMovieCb");
				callback(null, {});
			}
		})
		.catch(function(err){
			callback(null, {});
		});
	});
};

var getFilmWorldMoviesCb = function(callback) {
	log.debug("starting getFilmWorldMoviesCb");
	request.getFilmWorldMovies()
	.then(function(movies){
		log.debug("API call success in getFilmWorldMoviesCb");
		redis.putData(FILM_WORLD_PREFIX+MOVIES_KEY, JSON.stringify(movies));
		callback(null, movies);
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
	if (!movie_id) callback(null, {});
	request.getFilmWorldMovie(movie_id)
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