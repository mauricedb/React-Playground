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
            this.movies = movies.map(movie => Movie.fromJSON(movie));
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


class Movie {
    constructor(id, title, year, criticsConsensus, posters) {
        this.id = id;
        this.title = title;
        this.year = year;
        this.criticsConsensus = criticsConsensus;
        this.posters = posters;
        this.genres = [];
    }

    static fromJSON(json) {
        return new Movie(json.id, json.title, json.year, json.criticsConsensus, Posters.fromJSON(json.posters));
    }
}

class Posters {
    constructor(profile) {
        this.profile = profile;
    }

    static fromJSON(json) {
        return new Posters(json.profile);
    }
}