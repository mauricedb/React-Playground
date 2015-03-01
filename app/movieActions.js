/**
 * Created by Maurice on 2/26/2015.
 */


(function (Reflux) {
    'use strict';

    var movieActions = window.movieActions = Reflux.createActions({
        loadMovies: {},
        addMovie: {asyncResult: true},
        deleteMovie: {asyncResult: true}
    });

    movieActions.addMovie.listen(function(movie) {
        movie.posters = movie.posters || {};

        $.ajax('/movies', {
            type: 'POST',
            data: JSON.stringify(movie),
            contentType: 'application/json'
        }).then(
            _ => this.completed(movie),
            err => console.error(err)
        );
    });

    movieActions.deleteMovie.listen(function(movie)  {

        $.ajax('/movies/' + movie.id, {
            type: 'DELETE'
        }).then(
            _ => this.completed(movie),
            err => console.error(err)
        );
    });
}(window.Reflux));
