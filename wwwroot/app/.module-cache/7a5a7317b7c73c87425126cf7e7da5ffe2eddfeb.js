var PageHeader = React.createClass({displayName: "PageHeader",
    render: function () {
        return React.createElement("h1", null, "Movies");
    }
});

var MovieList = React.createClass({displayName: "MovieList",
    getInitialState: function () {
        return {movies: [{}, {}]}
    },
    render: function () {
        var items = this.state.movies.map(function(m){return React.createElement(MovieItem, null)});
        return React.createElement("ol", null, 
        items, 

            React.createElement(MovieItem, null)
        );
    }
});

var MovieItem = React.createClass({displayName: "MovieItem",
    render: function () {
        return React.createElement("li", null, "Movie Item");
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
