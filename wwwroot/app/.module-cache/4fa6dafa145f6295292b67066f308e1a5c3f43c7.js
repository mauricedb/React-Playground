
var Page = React.createClass({displayName: "Page",
    render: function(){
        return React.createElement("div", null);
    }
});

React.render(
    React.createElement('h1', null, 'Hello, world!'),
    document.getElementById('content')
);
