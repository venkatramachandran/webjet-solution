var promise = require('bluebird');
var wrapper = require('./wrappers');

var getMoviesCb = function(callback) {
    promise.join(
        wrapper.getCineWorldMovies(),
        wrapper.getFilmWorldMovies(),
        function(cineworld_movies, filmworld_movies){
            var movies = [];
            //TODO: MERGE BOTH LISTS
            //TODO: HANDLE ONE OR BOTH LISTS BEING EMPTY
            movies = movies.concat(cineworld_movies);
            movies = movies.concat(filmworld_movies);
            callback(null, movies);
        });
}

var getMovieCb = function(movie_id, callback) {
    promise.join(
        wrapper.getCineWorldMovie(movie_id),
        wrapper.getFilmWorldMovie(movie_id),
        function(cineworld_movie, filmworld_movie){
            //TODO: MERGE BOTH MOVIES
            //TODO: HANDLE ONE OR BOTH MOVIES BEING EMPTY
            var movie = {};
            movie = JSON.parse(JSON.stringify(cineworld_movie));
            movie.cineworld_id = cineworld_movie && cineworld_movie.id ? movie.id: '';
            movie.filmworld_id = filmworld_movie && filmworld_movie.id ? filmworld_movie.id : '';
            movie.cineworld_price = cineworld_movie && cineworld_movie.Price ? movie.Price: '';
            movie.filmworld_price = filmworld_movie && filmworld_movie.Price ? filmworld_movie.Price : '';
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