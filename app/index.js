var PageHeader = React.createClass({
    render: function () {
        return <h1>Movies</h1>;
    }
});

var NewMovieForm = React.createClass({
    addMovie: function () {
        var title = this.refs.title.getDOMNode().value;
        //alert('Adding ' + title)
        this.props.onAddMovie({title: title});
    },
    render: function () {
        return <form>
            <div>
                Title:
                <input type="text"  ref="title"/>
            </div>
            <button onClick={this.addMovie}>Add</button>
        </form>;
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
    deleteMovie: function (movie) {
        var index = this.state.movies.indexOf(movie);
        var newMovies = this.state.movies;
        newMovies.splice(index, 1);
        this.setState({movies: newMovies});
    },
    render: function () {
        var that = this;
        var items = this.state.movies.map(function (movie) {
            return <MovieItem onDeleteMovie={that.deleteMovie} key={movie.id} movie={movie} />
        });
        return <ol>
            {items}
        </ol>;
    }
});

var GenreList = React.createClass({
    render: function () {
        var genres = this.props.genres.map(function (genre) {
            return <span key={genre}>
                <button className="btn btn-info btn-xs">
                    <span className="glyphicon glyphicon-tag"></span>
                {genre}
                </button>
            </span>;
        });

        return <span className="pull-right">
            {genres}
        </span>
    }
});

var MovieImage = React.createClass({
    render: function () {
        return <div className="col-sm-2 hidden-xs">
            <img src={this.props.image}
                className="img-responsive" />
        </div>;
    }
});

var MovieItem = React.createClass({
    deleteMovie: function () {
        this.props.onDeleteMovie(this.props.movie);
    },
    render: function () {
        var movie = this.props.movie;

        return <div className="row well">
            <MovieImage image={movie.posters.profile} />

            <div className="col-sm-10">
                <button className="btn btn-xs pull-right"
                    onClick={this.deleteMovie}>
                    <i className="glyphicon glyphicon-remove"/>
                </button>
                <h4 className="Title">{movie.title}</h4>
                <p>
                    {movie.criticsConsensus}
                </p>

                <span className="pull-left">
                    <a className="btn btn-primary"
                        href={'#/movies/' + movie.id}>Read More</a>
                </span>

                <GenreList genres={movie.genres} />

            </div>
            <div className="clearfix"></div>
        </div>;
    }
});

var Page = React.createClass({
    onAddMovie:function(movie){
        alert('Adding ' + movie.title);
    },
    render: function () {
        return <div>
            <PageHeader />
            <NewMovieForm onAddMovie={this.onAddMovie}/>
            <MovieList />
        </div>;
    }
});

React.render(
    <Page/>,
    document.getElementById('content')
);


