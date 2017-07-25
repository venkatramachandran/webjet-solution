var express = require('express');
var log = require('./log');
var api = require('./api');

var app = express();
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  log.info("starting handler for /");
  //send index.html with api.getMovies()
  api.getMovies()
  .then(function(movies){
      log.info("Got movies. Rendering page");
      res.render("pages/index", {movies: movies});
  });
})

app.get('/movies/:movie_id', function(req, res){
    log.info("starting handler for /movieid");
    //send movie.html with api.getMovie()
    api.getMovie(req.params.movie_id)
    .then(function(movie){
        log.info("Got movie. Rendering page");
        res.render("pages/movie", {movie: movie});
    });
});

app.listen(8080, function () {
  log.info('Listening on port 8080');
});