var PageHeader = React.createClass({displayName: "PageHeader",
    render: function () {
        return React.createElement("h1", null, "Movies");
    }
});

var MovieList = React.createClass({displayName: "MovieList",
    getInitialState: function () {
        return {movies: []}
    },
    componentDidMount:function(){
        var that = this;
        $.getJSON('/movies').then(function(movies){
            that.setState({movies: movies});
        })
    },
    render: function () {
        var items = this.state.movies.map(function (movie) {
            return React.createElement(MovieItem, {movie: movie})
        });
        return React.createElement("ol", null, 
            items
        );
    }
});

var MovieItem = React.createClass({displayName: "MovieItem",
    render: function () {
        return React.createElement("li", null, this.props.movie.title);
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
