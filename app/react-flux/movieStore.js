/**
 * Created by Maurice on 2/26/2015.
 */

import $ from 'jquery';
import Reflux from 'reflux';
import movieActions from './movieActions';

export default Reflux.createStore({
    init() {
        this.listenToMany(movieActions);
    },
    getInitialState() {
        this.movies = [];
        return this.movies;
    },
    onLoadMovies() {
        $.getJSON('/movies').then(movies => {
            this.movies = movies;
            this.trigger(this.movies);
        });
    },
    onAddMovieCompleted(movie) {
        this.movies.unshift(movie);
        this.trigger(this.movies);
    },
    onDeleteMovieCompleted(movie) {
        var index = this.movies.indexOf(movie);
        this.movies.splice(index, 1);
        this.trigger(this.movies);
    }
});