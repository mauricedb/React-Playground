"use strict";

/**
 * Created by Maurice on 2/26/2015.
 */

(function (Reflux) {
    "use strict";

    var movieActions = window.movieActions = Reflux.createActions({
        loadMovies: {},
        addMovie: { asyncResult: true },
        deleteMovie: { asyncResult: true }
    });

    movieActions.addMovie.listen(function (movie) {
        var that = this;
        movie.posters = movie.posters || {};

        $.ajax("/movies", {
            type: "POST",
            data: JSON.stringify(movie),
            contentType: "application/json"
        }).then(function () {
            that.completed(movie);
        }, function (err) {
            console.error(err);
        });
    });

    movieActions.deleteMovie.listen(function (movie) {
        var that = this;

        $.ajax("/movies/" + movie.id, {
            type: "DELETE"
        }).then(function () {
            that.completed(movie);
        }, function (err) {
            console.error(err);
        });
    });
})(window.Reflux);