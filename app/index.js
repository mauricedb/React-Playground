var PageHeader = React.createClass({
    render: function () {
        return <h1>Movies</h1>;
    }
});

var MovieList = React.createClass({
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
            return <MovieItem key={movie.id} movie={movie} />
        });
        return <ol>
            {items}
        </ol>;
    }
});

var GenreList = React.createClass({
    render: function () {
        var genres = this.props.genres.map(function (genre) {
            return <button key={genre} className="btn btn-info btn-xs">
                <span className="glyphicon glyphicon-tag"></span>
                {genre}
            </button>;
        });

        return <span>
            {genres}
        </span>
    }
});

var MovieItem = React.createClass({
    render: function () {
        var movie = this.props.movie;

        return <div className="row well">
            <div className="col-sm-2 hidden-xs">
                <img src={movie.posters.profile}
                    className="img-responsive" />
            </div>
            <div className="col-sm-10">
                <h4 className="Title">{movie.title}</h4>
                <p>
                {movie.criticsConsensus}
                </p>

                <span className="pull-left">
                    <a className="btn btn-primary"
                        href={'#/movies/' + movie.id}>Read More</a>
                </span>

                <span className="pull-right">
                    <GenreList genres={movie.genres} />
                </span>

            </div>
            <div className="clearfix"></div>
        </div>;
    }
});

var Page = React.createClass({
    render: function () {
        return <div>
            <PageHeader />
            <MovieList />
        </div>;
    }
});

React.render(
    <Page/>,
    document.getElementById('content')
);


