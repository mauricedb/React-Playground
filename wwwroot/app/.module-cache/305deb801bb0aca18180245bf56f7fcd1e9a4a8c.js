var PageHeader = React.createClass({displayName: "PageHeader",
    render: function () {
        return React.createElement("h1", null, "Movies");
    }
});

var MovieList = React.createClass({displayName: "MovieList",
    getInitialState: function () {
        return {movies: []}
    },
    componentDidMount: function () {
        var that = this;
        $.getJSON('/movies').then(function (movies) {
            that.setState({movies: movies});
        });
    },
    render: function () {
        var items = this.state.movies.map(function (movie) {
            return React.createElement(MovieItem, {key: movie.id, movie: movie})
        });
        return React.createElement("ol", null, 
            items
        );
    }
});

var GenreList = React.createClass({displayName: "GenreList",
    render: function () {
        var genres = this.props.genres.map(function (genre) {
            return React.createElement("button", {key: genre, className: "btn btn-info btn-xs"}, 
                React.createElement("span", {className: "glyphicon glyphicon-tag"}), 
                genre
            );
        });

        return React.createElement("span", null, 
            genres
        )
    }
});

var MovieItem = React.createClass({displayName: "MovieItem",
    render: function () {
        var movie = this.props.movie;

        return React.createElement("div", {className: "row well"}, 
            React.createElement("div", {className: "col-sm-2 hidden-xs"}, 
                React.createElement("img", {src: movie.posters.profile, 
                    className: "img-responsive"})
            ), 
            React.createElement("div", {className: "col-sm-10"}, 
                React.createElement("h4", {className: "Title"}, movie.title), 
                React.createElement("p", null, 
                movie.criticsConsensus
                ), 

                React.createElement("span", {className: "pull-left"}, 
                    React.createElement("a", {className: "btn btn-primary", 
                        href: '#/movies/' + movie.id}, "Read More")
                ), 

                React.createElement("span", {className: "pull-right"}, 
                    React.createElement(GenreList, {genres: movie.genres})
                )

            ), 
            React.createElement("div", {className: "clearfix"})
        );
    }
});

var Page = React.createClass({displayName: "Page",
    render: function () {
        return React.createElement("div", null, 
            React.createElement(PageHeader, null), 
            React.createElement(MovieList, null)
        );
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('content')
);


