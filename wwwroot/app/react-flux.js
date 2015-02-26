(function (React, Reflux) {

    var movieActions = Reflux.createActions({
        loadMovies: {},
        addMovie: {asyncResult: true}
    });

    movieActions.addMovie.listen(function(movie){
        var that = this;
        movie.posters = movie.posters || {};

        $.ajax('/movies', {
            type: 'POST',
            data: JSON.stringify(movie),
            contentType: 'application/json'
        }).then(function () {
            that.completed(movie)
        }, function (err) {
            console.error(err);
        });
    });

    var movieStore = Reflux.createStore({
        init: function () {
            this.listenToMany(movieActions);
        },
        getInitialState: function () {
            this.movies = [];
            return this.movies;
        },
        onLoadMovies: function () {
            var that = this;
            $.getJSON('/movies').then(function (movies) {
                that.movies = movies;
                that.trigger(that.movies);
            });
        },
        onAddMovieCompleted: function (movie) {
            this.movies.unshift(movie);
            this.trigger(this.movies);
        }
    });

    var PageHeader = React.createClass({displayName: "PageHeader",
        render: function () {
            return React.createElement("h1", null, "Movies");
        }
    });

    var NewMovieForm = React.createClass({displayName: "NewMovieForm",
        getInitialState: function () {
            return {adding: false};
        },
        startAdding: function () {
            this.setState({adding: true, isValid: false});
        },
        addMovie: function (e) {
            e.preventDefault();

            var title = this.refs.title.getDOMNode().value;
            var criticsConsensus = this.refs.criticsConsensus.getDOMNode().value;
            var genres = this.refs.genres.getDOMNode().value.split(',');

            movieActions.addMovie({
                title: title,
                criticsConsensus: criticsConsensus,
                genres: genres
            });

            this.setState({adding: false});
        },
        onChange: function () {
            var title = this.refs.title.getDOMNode().value;

            this.setState({isValid: !!title});
        },
        render: function () {
            if (!this.state.adding) {
                return React.createElement("button", {onClick: this.startAdding, 
                    className: "btn btn-default"}, "Add movie")
            }

            return React.createElement("form", {onChange: this.onChange}, 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", null, "Title:"), 

                    React.createElement("input", {type: "text", 
                        className: "form-control", 
                        ref: "title"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", null, "Critics consensus:"), 

                    React.createElement("textarea", {type: "text", 
                        rows: "5", 
                        className: "form-control", 
                        ref: "criticsConsensus"})
                ), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("label", null, "Genres:"), 

                    React.createElement("input", {type: "text", 
                        className: "form-control", 
                        ref: "genres"})
                ), 
                React.createElement("button", {onClick: this.addMovie, 
                    disabled: !this.state.isValid, 
                    className: "btn btn-primary pull-right"}, "Save"), 
                React.createElement("div", {className: "clearfix"})
            );
        }
    });

    var MovieList = React.createClass({displayName: "MovieList",
        deleteMovie: function (movie) {
            this.props.onDeleteMovie(movie);
        },
        render: function () {
            var that = this;
            var items = this.props.movies.map(function (movie) {
                return React.createElement(MovieItem, {onDeleteMovie: that.deleteMovie, key: movie.id, movie: movie})
            });
            return React.createElement("ol", null, 
            items
            );
        }
    });

    var GenreList = React.createClass({displayName: "GenreList",
        render: function () {
            var genres = this.props.genres.map(function (genre) {
                return React.createElement("span", {key: genre}, 
                    React.createElement("button", {className: "btn btn-info btn-xs"}, 
                        React.createElement("span", {className: "glyphicon glyphicon-tag"}), 
                genre
                    )
                );
            });

            return React.createElement("span", {className: "pull-right"}, 
            genres
            )
        }
    });

    var MovieImage = React.createClass({displayName: "MovieImage",
        render: function () {
            return React.createElement("div", {className: "col-sm-2 hidden-xs"}, 
                React.createElement("img", {src: this.props.image, 
                    className: "img-responsive"})
            );
        }
    });

    var MovieItem = React.createClass({displayName: "MovieItem",
        deleteMovie: function () {
            this.props.onDeleteMovie(this.props.movie);
        },
        render: function () {
            var movie = this.props.movie;

            return React.createElement("div", {className: "row well"}, 
                React.createElement(MovieImage, {image: movie.posters.profile}), 

                React.createElement("div", {className: "col-sm-10"}, 
                    React.createElement("button", {className: "btn btn-xs pull-right", 
                        onClick: this.deleteMovie}, 
                        React.createElement("i", {className: "glyphicon glyphicon-remove"})
                    ), 
                    React.createElement("h4", {className: "Title"}, movie.title), 
                    React.createElement("p", null, 
                    movie.criticsConsensus
                    ), 

                    React.createElement("span", {className: "pull-left"}, 
                        React.createElement("a", {className: "btn btn-primary", 
                            href: '#/movies/' + movie.id}, "Read More")
                    ), 

                    React.createElement(GenreList, {genres: movie.genres})

                ), 
                React.createElement("div", {className: "clearfix"})
            );
        }
    });

    var Page = React.createClass({displayName: "Page",
        mixins: [Reflux.connect(movieStore, 'movies')],
        componentDidMount: function () {
            movieActions.loadMovies();
        },
        deleteMovie: function (movie) {
            var index = this.state.movies.indexOf(movie);
            var newMovies = this.state.movies;
            newMovies.splice(index, 1);
            this.setState({movies: newMovies});
        },
        render: function () {
            return React.createElement("div", null, 
                React.createElement(PageHeader, null), 
                React.createElement(NewMovieForm, null), 
                React.createElement(MovieList, {movies: this.state.movies, onDeleteMovie: this.deleteMovie})
            );
        }
    });

    React.render(
        React.createElement(Page, null),
        document.getElementById('content')
    );

}(window.React, window.Reflux));
