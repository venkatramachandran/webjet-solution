var request = require('./request');
var promise = require('bluebird');
var redis = require('./redis');

var CINE_WORLD_PREFIX = "cineWorld:";
var FILM_WORLD_PREFIX = "filmWorld:";
var MOVIES_KEY        = "all";

var getCineWorldMovies = function(callback) {
	request.getCineWorldMovies()
	.then(function(movies){
		redis.putData(CINE_WORLD_PREFIX+MOVIES_KEY, JSON.stringify(movies));
		callback(null, movies);
	})
	.catch(function(err){
		redis.getData(CINE_WORLD_PREFIX+MOVIES_KEY)
		.then(function(result){
			callback(null, JSON.parse(result));
		})
		.catch(function(err){
			callback(null, []);
		});
	});
}

var getCineWorldMovie = function(movie_id, callback) {
	request.getCineWorldMovie(movie_id)
	.then(function(movie){
		redis.putData(CINE_WORLD_PREFIX+movie_id, JSON.stringify(movie));
		callback(null, movie);
	})
	.catch(function(err){
		redis.getData(CINE_WORLD_PREFIX+movie_id)
		.then(function(result){
			callback(null, JSON.parse(result));
		})
		.catch(function(err){
			callback(null, {});
		});
	});
}

var getFilmWorldMovies = function(callback) {
	request.getFilmWorldMovies()
	.then(function(movies){
		redis.putData(FILM_WORLD_PREFIX+MOVIES_KEY);
		callback(null, movies);
	})
	.catch(function(err){
		redis.getData(FILM_WORLD_PREFIX+MOVIES_KEY, JSON.stringify(movies))
		.then(function(result){
			callback(null, JSON.parse(result));
		})
		.catch(function(err){
			callback(null, []);
		});
	});
}

var getFilmWorldMovie = function(movie_id, callback) {
	request.getFilmWorldMovie(movie_id)
	.then(function(movie){
		redis.putData(FILM_WORLD_PREFIX+movie_id, JSON.stringify(movie));
		callback(null, movie);
	})
	.catch(function(err){
		redis.getData(FILM_WORLD_PREFIX+movie_id)
		.then(function(result){
			callback(null, JSON.parse(result));
		})
		.catch(function(err){
			callback(null, {});
		});
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