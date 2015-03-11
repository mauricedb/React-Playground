System.register([], function (_export) {
    var PageHeader, NewMovieForm, MovieList, GenreList, MovieImage, MovieItem, Page;
    return {
        setters: [],
        execute: function () {
            "use strict";

            PageHeader = React.createClass({
                displayName: "PageHeader",

                render: function render() {
                    return React.createElement(
                        "h1",
                        null,
                        "Movies"
                    );
                }
            });
            NewMovieForm = React.createClass({
                displayName: "NewMovieForm",

                getInitialState: function getInitialState() {
                    return { adding: false };
                },
                startAdding: function startAdding() {
                    this.setState({ adding: true, isValid: false });
                },
                addMovie: function addMovie(e) {
                    e.preventDefault();

                    var title = this.refs.title.getDOMNode().value;
                    var criticsConsensus = this.refs.criticsConsensus.getDOMNode().value;
                    var genres = this.refs.genres.getDOMNode().value.split(",");
                    this.props.onAddMovie({
                        title: title,
                        criticsConsensus: criticsConsensus,
                        genres: genres
                    });

                    this.setState({ adding: false });
                },
                onChange: function onChange() {
                    var title = this.refs.title.getDOMNode().value;

                    this.setState({ isValid: !!title });
                },
                render: function render() {
                    if (!this.state.adding) {
                        return React.createElement(
                            "button",
                            { onClick: this.startAdding,
                                className: "btn btn-default" },
                            "Add movie"
                        );
                    }

                    return React.createElement(
                        "form",
                        { onChange: this.onChange },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                null,
                                "Title:"
                            ),
                            React.createElement("input", { type: "text",
                                className: "form-control",
                                ref: "title" })
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                null,
                                "Critics consensus:"
                            ),
                            React.createElement("textarea", { type: "text",
                                rows: "5",
                                className: "form-control",
                                ref: "criticsConsensus" })
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "label",
                                null,
                                "Genres:"
                            ),
                            React.createElement("input", { type: "text",
                                className: "form-control",
                                ref: "genres" })
                        ),
                        React.createElement(
                            "button",
                            { onClick: this.addMovie,
                                disabled: !this.state.isValid,
                                className: "btn btn-primary pull-right" },
                            "Save"
                        ),
                        React.createElement("div", { className: "clearfix" })
                    );
                }
            });
            MovieList = React.createClass({
                displayName: "MovieList",

                deleteMovie: function deleteMovie(movie) {
                    this.props.onDeleteMovie(movie);
                },
                render: function render() {
                    var that = this;
                    var items = this.props.movies.map(function (movie) {
                        return React.createElement(MovieItem, { onDeleteMovie: that.deleteMovie, key: movie.id, movie: movie });
                    });
                    return React.createElement(
                        "ol",
                        null,
                        items
                    );
                }
            });
            GenreList = React.createClass({
                displayName: "GenreList",

                render: function render() {
                    var genres = this.props.genres.map(function (genre) {
                        return React.createElement(
                            "span",
                            { key: genre },
                            React.createElement(
                                "button",
                                { className: "btn btn-info btn-xs" },
                                React.createElement("span", { className: "glyphicon glyphicon-tag" }),
                                genre
                            )
                        );
                    });

                    return React.createElement(
                        "span",
                        { className: "pull-right" },
                        genres
                    );
                }
            });
            MovieImage = React.createClass({
                displayName: "MovieImage",

                render: function render() {
                    return React.createElement(
                        "div",
                        { className: "col-sm-2 hidden-xs" },
                        React.createElement("img", { src: this.props.image,
                            className: "img-responsive" })
                    );
                }
            });
            MovieItem = React.createClass({
                displayName: "MovieItem",

                deleteMovie: function deleteMovie() {
                    this.props.onDeleteMovie(this.props.movie);
                },
                render: function render() {
                    var movie = this.props.movie;

                    return React.createElement(
                        "div",
                        { className: "row well" },
                        React.createElement(MovieImage, { image: movie.posters.profile }),
                        React.createElement(
                            "div",
                            { className: "col-sm-10" },
                            React.createElement(
                                "button",
                                { className: "btn btn-xs pull-right",
                                    onClick: this.deleteMovie },
                                React.createElement("i", { className: "glyphicon glyphicon-remove" })
                            ),
                            React.createElement(
                                "h4",
                                { className: "Title" },
                                movie.title
                            ),
                            React.createElement(
                                "p",
                                null,
                                movie.criticsConsensus
                            ),
                            React.createElement(
                                "span",
                                { className: "pull-left" },
                                React.createElement(
                                    "a",
                                    { className: "btn btn-primary",
                                        href: "#/movies/" + movie.id },
                                    "Read More"
                                )
                            ),
                            React.createElement(GenreList, { genres: movie.genres })
                        ),
                        React.createElement("div", { className: "clearfix" })
                    );
                }
            });
            Page = React.createClass({
                displayName: "Page",

                getInitialState: function getInitialState() {
                    return { movies: [] };
                },
                componentDidMount: function componentDidMount() {

                    var that = this;
                    $.getJSON("/movies").then(function (movies) {
                        that.setState({ movies: movies });
                    });
                },
                deleteMovie: function deleteMovie(movie) {
                    var index = this.state.movies.indexOf(movie);
                    var newMovies = this.state.movies;
                    newMovies.splice(index, 1);
                    this.setState({ movies: newMovies });
                },
                addMovie: function addMovie(movie) {
                    var that = this;
                    movie.posters = movie.posters || {};

                    $.ajax("/movies", {
                        type: "POST",
                        data: JSON.stringify(movie),
                        contentType: "application/json"
                    }).then(function () {
                        var newMovies = that.state.movies;
                        newMovies.unshift(movie);
                        that.setState({ movies: newMovies });
                    }, function (err) {
                        console.error(err);
                    });
                },
                render: function render() {
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(PageHeader, null),
                        React.createElement(NewMovieForm, { onAddMovie: this.addMovie }),
                        React.createElement(MovieList, { movies: this.state.movies, onDeleteMovie: this.deleteMovie })
                    );
                }
            });

            React.render(React.createElement(Page, null), document.getElementById("content"));
        }
    };
});