System.register(["./movieActions", "../../lib/jquery/dist/jquery"], function (_export) {
    var movieActions, $, movieStore;
    return {
        setters: [function (_movieActions) {
            movieActions = _movieActions.movieActions;
        }, function (_libJqueryDistJquery) {
            $ = _libJqueryDistJquery["default"];
        }],
        execute: function () {
            "use strict";

            movieStore = _export("movieStore", Reflux.createStore({
                init: function init() {
                    this.listenToMany(movieActions);
                },
                getInitialState: function getInitialState() {
                    this.movies = [];
                    return this.movies;
                },
                onLoadMovies: function onLoadMovies() {
                    var _this = this;

                    $.getJSON("/movies").then(function (movies) {
                        _this.movies = movies;
                        _this.trigger(_this.movies);
                    });
                },
                onAddMovieCompleted: function onAddMovieCompleted(movie) {
                    this.movies.unshift(movie);
                    this.trigger(this.movies);
                },
                onDeleteMovieCompleted: function onDeleteMovieCompleted(movie) {
                    var index = this.movies.indexOf(movie);
                    this.movies.splice(index, 1);
                    this.trigger(this.movies);
                }
            }));
        }
    };
});
/**
 * Created by Maurice on 2/26/2015.
 */