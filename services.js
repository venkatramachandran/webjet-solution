var request = require('./request');
var promise = require('bluebird');
var cache = require('./cache');
var log = require('./log');
var _ = require('lodash');

var getMoviesCb = function(callback) {
	log.debug("starting getMoviesCb");
	var cacheKey = this._KEY_PREFIX+this._MOVIES_KEY;
	request(this._GET_MOVIES_API_URL)
	.then(function(movies){
		log.debug("API call success in getMoviesCb");
		cache.putData(cacheKey, movies.Movies);
		callback(null, movies.Movies);
	})
	.catch(function(err){
		log.debug("API call failed in getMoviesCb:"+err);
		var result = cache.getData(cacheKey);
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
	var cacheKey = this._KEY_PREFIX+movie_id;
	request(this._GET_MOVIE_API_URL + movie_id)
	.then(function(movie){
		cache.putData(cacheKey, movie);
		callback(null, movie);
	})
	.catch(function(err){
		var result = cache.getData(cacheKey);
		if (result) {
			log.debug("data exists in cache in getMovieCb");
			callback(null, result);
		} else {
			log.debug("data not exists in cache in getMovieCb");
			callback(null, {});
		}
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