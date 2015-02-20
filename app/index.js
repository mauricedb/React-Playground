var PageHeader = React.createClass({
    render: function () {
        return <h1>Movies</h1>;
    }
});

var NewMovieForm = React.createClass({
    getInitialState: function () {
        return {adding: false};
    },
    startAdding: function () {
        this.setState({adding: true, isValid: false});
    },
    addMovie: function (e) {
        e.preventDefault();

        var title = this.refs.title.getDOMNode().value;
        var criticsConsensus = this.refs.criticsConsensus.getDOMNode().value;
        var genres = this.refs.genres.getDOMNode().value.split(',');
        this.props.onAddMovie({
            title: title,
            criticsConsensus: criticsConsensus,
            genres: genres
        });

        this.setState({adding: false});
    },
    onChange: function () {
        var title = this.refs.title.getDOMNode().value;

        this.setState({isValid: !!title});
    },
    render: function () {
        if (!this.state.adding) {
            return <button onClick={this.startAdding}
                className='btn btn-default'>Add movie</button>
        }

        return <form onChange={this.onChange}>
            <div className='form-group'>
                <label>Title:</label>

                <input type="text"
                    className="form-control"
                    ref="title"/>
            </div>
            <div className='form-group'>
                <label>Critics consensus:</label>

                <textarea type="text"
                    rows="5"
                    className="form-control"
                    ref="criticsConsensus"/>
            </div>
            <div className='form-group'>
                <label>Genres:</label>

                <input type="text"
                    className="form-control"
                    ref="genres"/>
            </div>
            <button onClick={this.addMovie}
                disabled={!this.state.isValid}
                className='btn btn-primary pull-right'>Save</button>
            <div className="clearfix" />
        </form>;
    }
});

var MovieList = React.createClass({
    deleteMovie: function (movie) {
        this.props.onDeleteMovie(movie);
    },
    render: function () {
        var that = this;
        var items = this.props.movies.map(function (movie) {
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
        movie.posters = movie.posters || {};
        movie.genres = movie.genres || [];
        var newMovies = this.state.movies;
        newMovies.unshift(movie);
        this.setState({movies: newMovies});
    },
    render: function () {
        return <div>
            <PageHeader />
            <NewMovieForm onAddMovie={this.addMovie}/>
            <MovieList movies={this.state.movies} onDeleteMovie={this.deleteMovie}/>
        </div>;
    }
});

React.render(
    <Page/>,
    document.getElementById('content')
);


