var PageHeader = React.createClass({displayName: "PageHeader",
    render: function () {
        return React.createElement("h1", null, "Movies");
    }
});

var NewMovieForm = React.createClass({displayName: "NewMovieForm",
    addMovie: function (e) {
        e.preventDefault();

        var title = this.refs.title.getDOMNode().value;
        this.props.onAddMovie({title: title});

        this.refs.title.getDOMNode().value = '';
    },
    render: function () {
        return React.createElement("form", null, 
            React.createElement("div", null, 
                "Title:", 
                React.createElement("input", {type: "text", ref: "title"})
            ), 
            React.createElement("button", {onClick: this.addMovie}, "Add")
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
    getInitialState: function () {
        return {movies: []}
    },
    componentDidMount: function () {
        var that = this;
        $.getJSON('/movies').then(function (movies) {
            that.setState({movies: movies});
        });
    },
    deleteMovie: function (movie) {
        var index = this.state.movies.indexOf(movie);
        var newMovies = this.state.movies;
        newMovies.splice(index, 1);
        this.setState({movies: newMovies});
    },
    addMovie: function (movie) {
        //alert('Adding ' + movie.title);
        movie.posters = movie.posters || {};
        movie.genres = movie.genres || [];
        var newMovies = this.state.movies;
        newMovies.unshift(movie);
        this.setState({movies: newMovies});
    },
    render: function () {
        return React.createElement("div", null, 
            React.createElement(PageHeader, null), 
            React.createElement(NewMovieForm, {onAddMovie: this.addMovie}), 
            React.createElement(MovieList, {movies: this.state.movies, onDeleteMovie: this.deleteMovie})
        );
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('content')
);


