var promise = require('bluebird');
var wrapper = require('./wrapper');

var getMoviesCb = function(callback) {
    promise.join(
        wrapper.getCineWorldMovies(),
        wrapper.getFilmWorldMovies(),
        function(cineworld_movies, filmworld_movies){
            var movies = [];
            callback(null, movies);
        });
}

var getMovieCb = function(movie_id, callback) {
    promise.join(
        wrapper.getCineWorldMovie(movie_id),
        wrapper.getFilmWorldMovie(movie_id),
        function(cineworld_movie, filmworld_movie){
            var movie = {};
            callback(null, movie);
        });
}

var getMovies = promise.promisify(getMoviesCb);
var getMovie = promise.promisify(getMovieCb);

module.exports = {
    getMovies: getMovies,
    getMovie: getMovie
};