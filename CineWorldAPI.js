var request = require('./request');
var promise = require('bluebird');
var redis = require('./redis');
var log = require('./log');
var _ = require('lodash');

var CINE_WORLD_PREFIX = "cineWorld:";
var MOVIES_KEY        = "all";
var GET_MOVIES_API_URL = "/api/cineworld/movies/";
var GET_MOVIE_API_URL = "/api/cineworld/movie/";

var getCineWorldMoviesCb = function(callback) {
	log.debug("starting getCineWorldMoviesCb");
	request(GET_MOVIES_API_URL)
	.then(function(movies){
		log.debug("API call success in getCineWorldMoviesCb");
		redis.putData(CINE_WORLD_PREFIX+MOVIES_KEY, JSON.stringify(movies.Movies));
		callback(null, movies.Movies);
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
	if (_.isEmpty(movie_id)) {
		callback(null, {});
		return;
	}
	request(GET_MOVIE_API_URL + movie_id)
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

var getCineWorldMovies = promise.promisify(getCineWorldMoviesCb);
var getCineWorldMovie = promise.promisify(getCineWorldMovieCb);

module.exports = {
  getMovies : getCineWorldMovies,
  getMovie : getCineWorldMovie
};