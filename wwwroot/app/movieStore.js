"use strict";

/**
 * Created by Maurice on 2/26/2015.
 */

(function (movieActions, Reflux) {
    "use strict";

    var movieStore = window.movieStore = Reflux.createStore({
        init: function init() {
            this.listenToMany(movieActions);
        },
        getInitialState: function getInitialState() {
            this.movies = [];
            return this.movies;
        },
        onLoadMovies: function onLoadMovies() {
            var that = this;
            $.getJSON("/movies").then(function (movies) {
                that.movies = movies;
                that.trigger(that.movies);
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
    });
})(window.movieActions, window.Reflux);