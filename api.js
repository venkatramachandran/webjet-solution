var promise = require('bluebird');
var CineWorldAPI = require('./CineWorldAPI');
var FilmWorldAPI = require('./FilmWorldAPI');
var _ = require('lodash');
var log = require('./log');

var getMoviesCb = function(callback) {
    promise.join(
        CineWorldAPI.getMovies(),
        FilmWorldAPI.getMovies(),
        function(cineworld_movies, filmworld_movies){
            var movies = [];
            var cineworld_titles = _.map(cineworld_movies, "Title");
            var filmworld_titles = _.map(filmworld_movies, "Title");
            var movieTitles = [];
            movieTitles = movieTitles.concat(cineworld_titles);
            movieTitles = movieTitles.concat(filmworld_titles);
            movieTitles = _.uniq(movieTitles);
            for (var i = 0; i < movieTitles.length; i++) {
                var title = movieTitles[i];
                movies.push(merge(
                    _.find(cineworld_movies, {Title: title}),
                    _.find(filmworld_movies, {Title: title})
                ));
            }
            log.info("got movies as:");
            log.info(movies);
            callback(null, movies);
        });
};

var getMovieCb = function(cineworld_movie_id, filmworld_movie_id, callback) {
    promise.join(
        CineWorldAPI.getMovie(cineworld_movie_id),
        FilmWorldAPI.getMovie(filmworld_movie_id),
        function(cineworld_movie, filmworld_movie){
            callback(null, merge(cineworld_movie, filmworld_movie));
        });
};

var merge = function(movie1 , movie2) {
    var mergedMovie = {};
    _.merge(mergedMovie, movie1, movie2);
    mergedMovie = _.omit(mergedMovie, ['ID','Price']);
    mergedMovie.ID =
        {cineWorld: movie1 && movie1.ID ? movie1.ID : '',
        filmWorld: movie2 && movie2.ID ? movie2.ID : ''};
    mergedMovie.Price =
        {cineWorld: movie1 && movie1.Price ? movie1.Price : '',
        filmWorld: movie2 && movie2.Price ? movie2.Price : ''};
        return mergedMovie;
};

var getMovies = promise.promisify(getMoviesCb);
var getMovie = promise.promisify(getMovieCb);

module.exports = {
    getMovies: getMovies,
    getMovie: getMovie
};