System.register(["../../lib/jquery/dist/jquery", "../../lib/reflux/dist/reflux", "./movieActions"], function (_export) {
    var $, Reflux, movieActions;
    return {
        setters: [function (_libJqueryDistJquery) {
            $ = _libJqueryDistJquery["default"];
        }, function (_libRefluxDistReflux) {
            Reflux = _libRefluxDistReflux["default"];
        }, function (_movieActions) {
            movieActions = _movieActions["default"];
        }],
        execute: function () {
            "use strict";

            _export("default", Reflux.createStore({
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