var PageHeader = React.createClass({displayName: "PageHeader",
    render: function(){
        return React.createElement("h1", null, "Movies");
    }
});

var Page = React.createClass({displayName: "Page",
    render: function(){
        return React.createElement("div", null, 
            React.createElement(PageHeader, null)
        );
    }
});

React.render(
    React.createElement(Page, null),
    document.getElementById('content')
);
