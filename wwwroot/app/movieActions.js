"use strict";

/**
 * Created by Maurice on 2/26/2015.
 */

(function (Reflux) {
    var _this = this;

    "use strict";

    var movieActions = window.movieActions = Reflux.createActions({
        loadMovies: {},
        addMovie: { asyncResult: true },
        deleteMovie: { asyncResult: true }
    });

    movieActions.addMovie.listen(function (movie) {
        movie.posters = movie.posters || {};

        $.ajax("/movies", {
            type: "POST",
            data: JSON.stringify(movie),
            contentType: "application/json"
        }).then(function (_) {
            return _this.completed(movie);
        }, function (err) {
            return console.error(err);
        });
    });

    movieActions.deleteMovie.listen(function (movie) {

        $.ajax("/movies/" + movie.id, {
            type: "DELETE"
        }).then(function (_) {
            return _this.completed(movie);
        }, function (err) {
            return console.error(err);
        });
    });
})(window.Reflux);