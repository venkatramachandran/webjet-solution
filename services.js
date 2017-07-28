var request = require('./request');
var promise = require('bluebird');
var cache = require('./cache');
var log = require('./log');
var _ = require('lodash');

var getMoviesCb = function(callback) {
	log.debug("starting getMoviesCb");
	request(_GET_MOVIES_API_URL)
	.then(function(movies){
		log.debug("API call success in getMoviesCb");
		cache.putData(_KEY_PREFIX+_MOVIES_KEY, movies.Movies);
		callback(null, movies.Movies);
	})
	.catch(function(err){
		log.debug("API call failed in getMoviesCb:"+err);
		var result = cache.getData(_KEY_PREFIX+_MOVIES_KEY);
		if (result) {
			log.debug("data exists in cache in getMoviesCb");
			callback(null, result);
		} else {
			log.debug("data not exists in cache in getMoviesCb");
			callback(null, []);
		}
	});
};

var getMovieCb = function(movie_id, callback) {
	if (_.isEmpty(movie_id)) {
		callback(null, {});
		return;
	}
	request(_GET_MOVIE_API_URL + movie_id)
	.then(function(movie){
		cache.putData(_KEY_PREFIX+movie_id, movie);
		callback(null, movie);
	})
	.catch(function(err){
		cache.getData(_KEY_PREFIX+movie_id)
		.then(function(result){
			if (result) {
				log.debug("data exists in cache in getMovieCb");
				callback(null, result);
			} else {
				log.debug("data not exists in cache in getMovieCb");
				callback(null, {});
			}
		})
		.catch(function(err){
			callback(null, {});
		});
	});
};

var init = function(provider) {
    return {
		_KEY_PREFIX : provider+":",
		_MOVIES_KEY        : "all",
		_GET_MOVIES_API_URL : "/api/"+provider+"/movies/",
		_GET_MOVIE_API_URL : "/api/"+provider+"/movie/",
		getMovie: promise.promisify(getMovieCb),
        getMovies: promise.promisify(getMoviesCb)
    };
};

module.exports = init;