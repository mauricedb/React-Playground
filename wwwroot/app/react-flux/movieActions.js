System.register(["../../lib/jquery/dist/jquery"], function (_export) {
    var $, movieActions;
    return {
        setters: [function (_libJqueryDistJquery) {
            $ = _libJqueryDistJquery["default"];
        }],
        execute: function () {
            "use strict";

            movieActions = _export("movieActions", Reflux.createActions({
                loadMovies: {},
                addMovie: { asyncResult: true },
                deleteMovie: { asyncResult: true }
            }));

            movieActions.addMovie.listen(function (movie) {
                var _this = this;

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
                var _this = this;

                $.ajax("/movies/" + movie.id, {
                    type: "DELETE"
                }).then(function (_) {
                    return _this.completed(movie);
                }, function (err) {
                    return console.error(err);
                });
            });
        }
    };
});
/**
 * Created by Maurice on 2/26/2015.
 */