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
        });
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
        var movie = this.props.movie;

        return React.createElement("div", {class: "row well"}, 
            React.createElement("div", {class: "col-sm-2 hidden-xs"}, 
                React.createElement("img", {src: movie.posters.profile, 
                    class: "img-responsive"})
            ), 
            React.createElement("div", {class: "col-sm-10"}, 
                React.createElement("h4", {class: "Title"}, movie.title), 
                React.createElement("p", null, 
                movie.criticsConsensus
                ), 

                React.createElement("span", {class: "pull-left"}, 
                    React.createElement("a", {class: "btn btn-primary", 
                        href: '#/movies/' + movie.id}, "Read More")
                )


            ), 
            React.createElement("div", {class: "clearfix"})
        );

        //<span class="pull-right">
        //    <span ng-repeat="genre in movie.genres">
        //        <button class="btn btn-info  btn-xs"
        //            ng-click="filterByGenre(genre)">
        //            <span class="glyphicon glyphicon-tag"></span>
        //                {genre}
        //        </button>
        //    </span>
        //</span>


        //return <li>
        //<h2>{this.props.movie.title}</h2>
        //    <img src={this.props.movie.posters.thumbnail}/>
        //</li>;
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


