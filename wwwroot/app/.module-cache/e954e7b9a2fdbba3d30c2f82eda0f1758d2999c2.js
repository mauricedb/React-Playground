var PageHeader = React.createClass({displayName: "PageHeader",
    render: function(){
        return React.createElement("h1", null, "Movies");
    }
});

var MovieList = React.createClass({displayName: "MovieList",});

var Page = React.createClass({displayName: "Page",
    render: function(){
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
