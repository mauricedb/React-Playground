var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');

gulp.task('jsx', function () {
    return gulp.src('app/react-flux/react-flux.jsx')
        .pipe(plugins.webpack({
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
                    { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"}
                ]
            },
            output: {
                filename: 'react-flux.jsx.js'
            }
        }))
        .pipe(gulp.dest('wwwroot/app/react-flux'));
});

gulp.task('mainBowerFiles', function () {
    return gulp.src(mainBowerFiles(), {
        base: './bower_components'
    }).pipe(gulp.dest('wwwroot/lib/'))
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.js*', ['jsx']);
});

gulp.task('default', ['mainBowerFiles', 'jsx', 'watch']);
