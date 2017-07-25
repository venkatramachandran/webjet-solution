var promise = require('bluebird');
var wrapper = require('./wrapper');

var getMoviesCb = function(callback) {
    promise.join(
        wrapper.getCineWorldMovies(),
        wrapper.getFilmWorldMovies(),
        function(cineworld_movies, filmworld_movies){
            var movies = [];
            movies = movies.concat(cineworld_movies);
            movies = moves.concat(filmworld_movies);
            callback(null, movies);
        });
}

var getMovieCb = function(movie_id, callback) {
    promise.join(
        wrapper.getCineWorldMovie(movie_id),
        wrapper.getFilmWorldMovie(movie_id),
        function(cineworld_movie, filmworld_movie){
            var movie = {};
            movie = JSON.parse(JSON.stringify(cineworld_movie));
            movie.cineworld_id = movie.id;
            movie.filmworld_id = filmworld_movie.id;
            delete movie.id;
            callback(null, movie);
        });
}

var getMovies = promise.promisify(getMoviesCb);
var getMovie = promise.promisify(getMovieCb);

module.exports = {
    getMovies: getMovies,
    getMovie: getMovie
};